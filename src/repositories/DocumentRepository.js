import { db } from '../database/indexedDb';
import { STORAGE_KEYS } from '../constants/version';
import { createEmptyDocument } from '../models/Document';
import { formDataToDocument, documentToFormData } from '../models/adapters';

/**
 * DocumentRepository — IndexedDB primary + localStorage draft mirror.
 * Swap implementation later for Supabase without changing callers.
 */
export const DocumentRepository = {
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
    try {
      localStorage.setItem(STORAGE_KEYS.draft, JSON.stringify(documentToFormData(doc)));
      localStorage.setItem(STORAGE_KEYS.activeDocId, doc.id);
    } catch {
      // quota / private mode
    }
    return doc;
  },

  async get(id) {
    try {
      const fromDb = await db.getDocument(id);
      if (fromDb) return fromDb;
    } catch {
      // fall through
    }
    return null;
  },

  async list() {
    try {
      return await db.listDocuments();
    } catch {
      return [];
    }
  },

  async remove(id) {
    try {
      await db.deleteDocument(id);
    } catch {
      // ignore
    }
  },

  /** Load active draft: IndexedDB by id, else localStorage formData */
  async loadActiveDraft() {
    const activeId = localStorage.getItem(STORAGE_KEYS.activeDocId);
    if (activeId) {
      const doc = await this.get(activeId);
      if (doc) return doc;
    }
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.draft);
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
      id: localStorage.getItem(STORAGE_KEYS.activeDocId) || undefined,
      ...meta,
    });
    return this.save(doc);
  },
};

export default DocumentRepository;
