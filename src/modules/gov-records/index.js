/**
 * Government record modules — model helpers + clause conditions + UI field defs.
 */

export const GOV_MODULES = [
  { id: 'revenue', path: 'govRecords.revenue', label: { en: 'Revenue Records', gu: 'રેવન્યુ રેકોર્ડ' }, fields: ['extract712No', 'extract712Date', 'remarks'] },
  { id: 'mutation', path: 'govRecords.mutation', label: { en: 'Mutation', gu: 'ફેરફાર નોંધ' }, fields: ['entryNo', 'date', 'description'] },
  { id: 'naPermission', path: 'govRecords.naPermission', label: { en: 'NA Permission', gu: 'NA પરવાનગી' }, fields: ['orderNo', 'date', 'authority'] },
  { id: 'tpScheme', path: 'govRecords.tpScheme', label: { en: 'TP Scheme', gu: 'ટીપી સ્કીમ' }, fields: ['tpNo', 'fpNo', 'remarks'] },
  { id: 'propertyCard', path: 'govRecords.propertyCard', label: { en: 'Property Card', gu: 'પ્રોપર્ટી કાર્ડ' }, fields: ['cardNo', 'date', 'issuingAuthority'] },
  { id: 'buildingPermission', path: 'govRecords.buildingPermission', label: { en: 'Building Permission', gu: 'બાંધકામ પરવાનગી' }, fields: ['permissionNo', 'date'] },
  { id: 'developmentPermission', path: 'govRecords.developmentPermission', label: { en: 'Development Permission', gu: 'વિકાસ પરવાનગી' }, fields: ['permissionNo', 'date'] },
  { id: 'rera', path: 'govRecords.rera', label: { en: 'RERA', gu: 'રેરા' }, fields: ['registrationNo', 'projectName'] },
  { id: 'plotVerification', path: 'govRecords.plotVerification', label: { en: 'Plot Verification', gu: 'પ્લોટ વેરિફિકેશન' }, fields: ['orderNo', 'date'] },
  { id: 'citySurvey', path: 'govRecords.citySurvey', label: { en: 'City Survey', gu: 'સિટી સર્વે' }, fields: ['citySurveyNo', 'sheetNo'] },
  { id: 'extract712', path: 'govRecords.extract712', label: { en: '7/12 Extract', gu: '૭/૧૨' }, fields: ['number', 'date'] },
  { id: 'form8A', path: 'govRecords.form8A', label: { en: '8A', gu: '૮એ' }, fields: ['khataNo', 'date'] },
  { id: 'encumbrance', path: 'govRecords.encumbrance', label: { en: 'Encumbrance Certificate', gu: 'ઈ.સી.' }, fields: ['certNo', 'date'] },
  { id: 'bankNoc', path: 'govRecords.bankNoc', label: { en: 'Bank NOC', gu: 'બેંક NOC' }, fields: ['bankName', 'nocNo', 'date'] },
  { id: 'societyNoc', path: 'govRecords.societyNoc', label: { en: 'Society NOC', gu: 'સોસાયટી NOC' }, fields: ['societyName', 'nocNo', 'date'] },
  { id: 'associationCertificate', path: 'govRecords.associationCertificate', label: { en: 'Association Certificate', gu: 'એસોસિએશન સર્ટિ.' }, fields: ['name', 'certNo', 'date'] },
  { id: 'possessionLetter', path: 'govRecords.possessionLetter', label: { en: 'Possession Letter', gu: 'કબજા પત્ર' }, fields: ['letterNo', 'date'] },
  { id: 'completionCertificate', path: 'govRecords.completionCertificate', label: { en: 'Completion Certificate', gu: 'કમ્પ્લીશન સર્ટિ.' }, fields: ['certNo', 'date'] },
  { id: 'occupancyCertificate', path: 'govRecords.occupancyCertificate', label: { en: 'Occupancy Certificate', gu: 'ઓ.સી.' }, fields: ['certNo', 'date'] },
];

function getByPath(obj, path) {
  return path.split('.').reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);
}

export function moduleHasData(doc, moduleDef) {
  const node = getByPath(doc.property || {}, moduleDef.path);
  if (!node || typeof node !== 'object') return false;
  return moduleDef.fields.some((f) => String(node[f] || '').trim());
}

export function listActiveGovModules(doc) {
  return GOV_MODULES.filter((m) => moduleHasData(doc, m));
}

export function validateGovModule(moduleDef, data = {}) {
  // Soft validation — empty modules are omitted; if partially filled, require primary key field
  const primary = moduleDef.fields[0];
  const any = moduleDef.fields.some((f) => String(data[f] || '').trim());
  if (!any) return [];
  if (!String(data[primary] || '').trim()) {
    return [{ field: primary, message: `${moduleDef.label.en}: ${primary} is required when module is used` }];
  }
  return [];
}

export default GOV_MODULES;
