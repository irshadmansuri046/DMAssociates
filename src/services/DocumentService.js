import { DocumentRepository } from '../repositories/DocumentRepository';
import { ValidationEngine } from '../validators/ValidationEngine';
import { formDataToDocument } from '../models/adapters';
import { getClausePack } from '../clauses/registry';
import { renderClauses } from '../generators/clause-generator';
import { SOFTWARE_VERSION } from '../constants/version';

/**
 * High-level document orchestration service.
 */
export const DocumentService = {
  async saveDraft(formData) {
    return DocumentRepository.saveFormDataDraft(formData);
  },

  validate(formDataOrDoc) {
    const doc = formDataOrDoc.parties
      ? formDataToDocument(formDataOrDoc)
      : formDataOrDoc;
    return ValidationEngine.validate(doc);
  },

  previewClauses(formDataOrDoc, locale = 'gu') {
    const doc = formDataOrDoc.parties
      ? formDataToDocument(formDataOrDoc)
      : formDataOrDoc;
    const pack = getClausePack(doc.documentType || 'sale_deed');
    return renderClauses(pack, doc, locale);
  },

  async markGenerated(doc) {
    return DocumentRepository.save({
      ...doc,
      status: 'generated',
      version: SOFTWARE_VERSION,
      generatedAt: new Date().toISOString(),
    });
  },
};

export default DocumentService;
