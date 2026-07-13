/**
 * Gujarat Sub-Registrar Office (SRO) registration requirements
 * Based on Registration Act 1908, Garvi 2.0 portal, IGR Gujarat guidelines
 */

export const PROPERTY_TYPES = [
  { id: 'agricultural', label: { en: 'Agricultural Land', gu: 'ખેતીની જમીન' } },
  { id: 'na_land', label: { en: 'NA Land (Non-Agricultural)', gu: 'બિનખેતી જમીન' } },
  { id: 'residential', label: { en: 'Residential Plot / House', gu: 'રહેણાંક પ્લોટ / મકાન' } },
  { id: 'commercial', label: { en: 'Commercial Property', gu: 'વ્યવસાયિક મિલકત' } },
  { id: 'industrial', label: { en: 'Industrial / GIDC Plot', gu: 'ઔદ્યોગિક / GIDC પ્લોટ' } },
  { id: 'flat', label: { en: 'Flat / Apartment', gu: 'ફ્લેટ / એપાર્ટમેન્ટ' } },
];

export const SRO_DOCUMENT_CHECKLIST = [
  { key: 'hasOriginalTitleDeeds', gu: 'અસલ માલિકી દસ્તાવેજોની સાંકળ', en: 'Original chain of title deeds' },
  { key: 'has712Extract', gu: '૭/૧૨ ઉતારો (૩૦ દિવસની અંદર)', en: '7/12 revenue extract (within 30 days)' },
  { key: 'has8AExtract', gu: '૮-એ ખતા ઉતારો', en: '8-A Khata extract' },
  { key: 'hasMutationEntry', gu: 'મહેસૂલી રેકોર્ડમાં ફેરફાર નોંધ', en: 'Mutation entry in revenue records' },
  { key: 'hasPropertyCard', gu: 'પ્રોપર્ટી કાર્ડ / સીટી સર્વે રેકોર્ડ', en: 'Property card / city survey record' },
  { key: 'hasJantriCertificate', gu: 'જંત્રી દર પ્રમાણપત્ર', en: 'Jantri rate valuation certificate' },
  { key: 'hasTaxReceipts', gu: 'મ્યુનિસિપલ/ગ્રામ પંચાયત વેરા પાવતી', en: 'Property tax clearance receipts' },
  { key: 'hasPassportPhotos', gu: 'પક્ષકારોના પાસપોર્ટ સાઈઝ ફોટા', en: 'Passport-size photos of all parties' },
  { key: 'hasPanForm60', gu: 'તમામ પક્ષકારોનું પાન / ફોર્મ-૬૦', en: 'PAN card or Form-60 for all parties' },
  { key: 'hasGrasPayment', gu: 'GRAS ઈ-ચલાન — સ્ટેમ્પ ડ્યુટી ભરેલ', en: 'GRAS e-Challan stamp duty proof' },
  { key: 'hasOnlineRegFee', gu: 'નોંધણી ફી ચુકવણી પાવતી', en: 'Registration fee payment receipt' },
  { key: 'hasEncumbranceCertificate', gu: 'બોજા પ્રમાણપત્ર (૧૨ વર્ષ)', en: 'Encumbrance certificate (12 years)' },
  { key: 'hasChainDocuments', gu: 'પાછળના વેચાણ દસ્તાવેજોની નકલ', en: 'Copies of previous sale deeds (chain)' },
  { key: 'hasCollectorPermission', gu: 'કલેક્ટર પરવાનગી (નવી શરત)', en: 'Collector permission (new tenure land)', conditional: 'new_tenure' },
  { key: 'hasNaPermission', gu: 'NA હુકમ / કલમ ૬૩-AA મંજૂરી', en: 'NA conversion order / Section 63-AA', conditional: 'built_up' },
  { key: 'hasSocietyNOC', gu: 'સોસાયટી / એપાર્ટમેન્ટ NOC', en: 'Society / apartment NOC (if applicable)', conditional: 'flat' },
  { key: 'hasTdsCertificate', gu: 'TDS ફોર્મ ૨૬QB (₹૫૦ લાખ+)', en: 'TDS challan Form 26QB (if ≥ ₹50 lakh)', conditional: 'tds' },
  { key: 'hasBiometricConsent', gu: 'બાયોમેટ્રિક/ફોટો કેપ્ચર માટે હાજરી', en: 'Parties present for biometric & photo capture' },
];

export const defaultPartyFields = () => ({
  name: '', age: '', occupation: '', pan: '', aadhaar: '', address: '',
  mobile: '', email: '', photo: '', religion: '', caste: '',
  isCorporate: false, companyCin: '', registeredOffice: '',
  authorisedSignatory: '', boardResolutionDate: '',
  signatoryAge: '', signatoryOccupation: '', signatoryReligion: '', signatoryAddress: '',
});

export const defaultWitnessFields = () => ({
  name: '', address: '', aadhaar: '', pan: '', mobile: '', photo: '',
});

export const defaultCompliance = () => ({
  hasOriginalTitleDeeds: false,
  has712Extract: false,
  has8AExtract: false,
  hasMutationEntry: false,
  hasPropertyCard: false,
  hasJantriCertificate: false,
  hasTaxReceipts: false,
  hasPassportPhotos: false,
  hasPanForm60: false,
  hasGrasPayment: false,
  hasOnlineRegFee: false,
  hasEncumbranceCertificate: false,
  hasChainDocuments: false,
  hasCollectorPermission: false,
  hasNaPermission: false,
  hasSocietyNOC: false,
  hasTdsCertificate: false,
  hasBiometricConsent: false,
});
