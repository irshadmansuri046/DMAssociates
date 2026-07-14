import { db } from '../database/indexedDb';
import { createEmptyDocument } from '../models/Document';
import { formDataToDocument, documentToFormData } from '../models/adapters';
import {
  getSessionToken,
  getSessionUser,
  userActiveDocKey,
  userDraftKey,
} from '../services/authService';
import {
  remoteFinalizePaidDocument,
  remoteGetDocument,
  remoteListDocuments,
  remoteDeleteDocument,
} from '../services/supabaseDocuments';
import { savePlatformInvoice } from '../services/invoiceService';

function hasRemoteSession() {
  return Boolean(getSessionToken() && getSessionUser()?.id);
}

function mirrorLocalDraft(doc) {
  try {
    localStorage.setItem(userDraftKey(), JSON.stringify(documentToFormData(doc)));
    localStorage.setItem(userActiveDocKey(), doc.id);
  } catch {
    // quota / private mode
  }
}

/**
 * Local drafts stay on device. Supabase is written only on paid PDF generation.
 */
export const DocumentRepository = {
  /** Local-only save (IndexedDB + localStorage). Does not touch Supabase. */
  async save(document) {
    const doc = {
      ...document,
      updatedAt: new Date().toISOString(),
    };
    try {
      await db.putDocument(doc);
    } catch (err) {
      console.warn('IndexedDB save failed, using localStorage only', err);
    }
    mirrorLocalDraft(doc);
    return doc;
  },

  /**
   * Persist full filled form + unlock payment to Supabase.
   * Called only after successful payment when generating PDF. No PDF file is uploaded.
   */
  async saveOnPaidPdfGeneration(document, paymentDetails) {
    const doc = {
      ...document,
      status: 'generated',
      updatedAt: new Date().toISOString(),
      generatedAt: document.generatedAt || new Date().toISOString(),
    };

    if (!hasRemoteSession()) {
      throw new Error('Please log in again before generating the PDF.');
    }

    const result = await remoteFinalizePaidDocument(doc, paymentDetails);
    const savedDoc =
      result?.document && typeof result.document === 'object'
        ? { ...doc, ...result.document }
        : doc;

    // Attach document id to invoice row if invoice was already created on payment
    if (paymentDetails?.invoiceNo) {
      try {
        await savePlatformInvoice({
          payment: paymentDetails,
          documentType: doc.documentType || 'sale_deed_flat',
          documentId: savedDoc.id,
        });
      } catch (err) {
        console.warn('Invoice link after PDF save failed', err);
      }
    }

    try {
      await db.putDocument(savedDoc);
    } catch {
      // cache optional
    }
    mirrorLocalDraft(savedDoc);
    return { document: savedDoc, payment: result?.payment || null, savedAt: result?.savedAt || null };
  },

  async saveInvoice(paymentDetails, meta = {}) {
    if (!hasRemoteSession()) {
      throw new Error('Please log in again before saving the invoice.');
    }
    return savePlatformInvoice({
      payment: paymentDetails,
      documentType: meta.documentType || 'sale_deed_flat',
      documentId: meta.documentId || null,
    });
  },

  async get(id) {
    try {
      const fromDb = await db.getDocument(id);
      if (fromDb) return fromDb;
    } catch {
      // fall through
    }

    if (hasRemoteSession()) {
      try {
        return await remoteGetDocument(id);
      } catch (err) {
        console.warn('Supabase get failed', err);
      }
    }
    return null;
  },

  async list() {
    if (hasRemoteSession()) {
      try {
        return await remoteListDocuments();
      } catch (err) {
        console.warn('Supabase list failed, trying local cache', err);
      }
    }
    try {
      return await db.listDocuments();
    } catch {
      return [];
    }
  },

  async remove(id) {
    if (hasRemoteSession()) {
      try {
        await remoteDeleteDocument(id);
      } catch (err) {
        console.warn('Supabase delete failed', err);
      }
    }
    try {
      await db.deleteDocument(id);
    } catch {
      // ignore
    }
  },

  async loadActiveDraft() {
    const activeId = localStorage.getItem(userActiveDocKey());
    if (activeId) {
      const doc = await this.get(activeId);
      if (doc) return doc;
    }

    try {
      const raw = localStorage.getItem(userDraftKey());
      if (raw) {
        const formData = JSON.parse(raw);
        return formDataToDocument(formData, { id: activeId || undefined });
      }
    } catch {
      // ignore
    }
    return createEmptyDocument();
  },

  saveFormDataDraft(formData, meta = {}) {
    const doc = formDataToDocument(formData, {
      id: localStorage.getItem(userActiveDocKey()) || undefined,
      ...meta,
    });
    return this.save(doc);
  },
};

export default DocumentRepository;
