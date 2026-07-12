import { SOFTWARE_VERSION, VERIFICATION_BASE_URL } from '../constants/version';

export function createDocumentId() {
  return `doc_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function createPropertyId(doc) {
  const p = doc?.property || {};
  const parts = [
    p.district,
    p.village,
    p.blockSurveyNo || p.survey?.blockSurveyNo,
    p.unitNumber || p.unit?.unitNumber,
  ].filter(Boolean);
  return parts.length ? parts.join('_').replace(/\s+/g, '-') : `prop_${doc?.id || 'unknown'}`;
}

export function buildQrPayload(doc) {
  return {
    documentId: doc.id,
    propertyId: createPropertyId(doc),
    documentNumber: doc.documentNumber || doc.execution?.documentSerialNo || '',
    generatedDate: doc.generatedAt || new Date().toISOString().slice(0, 10),
    version: doc.version || SOFTWARE_VERSION,
    verificationUrl: `${VERIFICATION_BASE_URL}/${doc.id}`,
  };
}
