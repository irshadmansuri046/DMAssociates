/**
 * Document type catalog (Gujarat registration instruments).
 * Sale Deed is split by property class for clearer forms and PDF titles.
 */

export const SALE_DEED_TYPE_IDS = [
  'sale_deed_flat',
  'sale_deed_house',
  'sale_deed_farm_land',
  'sale_deed_plot',
];

/** Default for new drafts */
export const DEFAULT_DOCUMENT_TYPE = 'sale_deed_flat';

export const DOCUMENT_TYPES = {
  // Legacy alias — kept for older saved drafts; not shown in the picker
  sale_deed: {
    id: 'sale_deed',
    label: { en: 'Sale Deed', gu: 'વેચાણ દસ્તાવેજ' },
    shortLabel: { en: 'Sale Deed', gu: 'વેચાણ દસ્તાવેજ' },
    category: 'sale_deed',
    hidden: true,
  },
  sale_deed_flat: {
    id: 'sale_deed_flat',
    label: { en: 'Sale Deed — Flat / Apartment', gu: 'વેચાણ દસ્તાવેજ — ફ્લેટ / એપાર્ટમેન્ટ' },
    shortLabel: { en: 'Flat Sale Deed', gu: 'ફ્લેટ વેચાણ દસ્તાવેજ' },
    category: 'sale_deed',
    defaultPropertyType: 'flat',
    defaultUnitType: 'flat',
  },
  sale_deed_house: {
    id: 'sale_deed_house',
    label: { en: 'Sale Deed — House / Bungalow', gu: 'વેચાણ દસ્તાવેજ — મકાન / બંગલો' },
    shortLabel: { en: 'House Sale Deed', gu: 'મકાન વેચાણ દસ્તાવેજ' },
    category: 'sale_deed',
    defaultPropertyType: 'residential',
    defaultUnitType: 'house',
  },
  sale_deed_farm_land: {
    id: 'sale_deed_farm_land',
    label: { en: 'Sale Deed — Farm Land', gu: 'વેચાણ દસ્તાવેજ — ખેતીની જમીન' },
    shortLabel: { en: 'Farm Land Sale Deed', gu: 'ખેતી જમીન વેચાણ દસ્તાવેજ' },
    category: 'sale_deed',
    defaultPropertyType: 'agricultural',
    defaultUnitType: '',
  },
  sale_deed_plot: {
    id: 'sale_deed_plot',
    label: { en: 'Sale Deed — Plot', gu: 'વેચાણ દસ્તાવેજ — પ્લોટ' },
    shortLabel: { en: 'Plot Sale Deed', gu: 'પ્લોટ વેચાણ દસ્તાવેજ' },
    category: 'sale_deed',
    defaultPropertyType: 'residential',
    defaultUnitType: '',
  },
  gift_deed: {
    id: 'gift_deed',
    label: { en: 'Gift Deed', gu: 'ભેટ દસ્તાવેજ' },
    shortLabel: { en: 'Gift Deed', gu: 'ભેટ દસ્તાવેજ' },
  },
  mortgage: {
    id: 'mortgage',
    label: { en: 'Mortgage Deed', gu: 'ગીરો દસ્તાવેજ' },
    shortLabel: { en: 'Mortgage', gu: 'ગીરો' },
  },
  release_deed: {
    id: 'release_deed',
    label: { en: 'Release Deed', gu: 'રિલીઝ દસ્તાવેજ' },
    shortLabel: { en: 'Release', gu: 'રિલીઝ' },
  },
  lease_deed: {
    id: 'lease_deed',
    label: { en: 'Lease Deed', gu: 'ભાડા દસ્તાવેજ' },
    shortLabel: { en: 'Lease', gu: 'ભાડા' },
  },
  leave_and_license: {
    id: 'leave_and_license',
    label: { en: 'Leave and License', gu: 'લીવ એન્ડ લાયસન્સ' },
    shortLabel: { en: 'L&L', gu: 'લીવ એન્ડ લાયસન્સ' },
  },
  partition_deed: {
    id: 'partition_deed',
    label: { en: 'Partition Deed', gu: 'વહેંચણી દસ્તાવેજ' },
    shortLabel: { en: 'Partition', gu: 'વહેંચણી' },
  },
  will: {
    id: 'will',
    label: { en: 'Will', gu: 'વસિયતનામું' },
    shortLabel: { en: 'Will', gu: 'વસિયત' },
  },
  power_of_attorney: {
    id: 'power_of_attorney',
    label: { en: 'Power of Attorney', gu: 'પાવર ઓફ એટર્ની' },
    shortLabel: { en: 'POA', gu: 'પી.ઓ.એ.' },
  },
  agreement_to_sell: {
    id: 'agreement_to_sell',
    label: { en: 'Agreement to Sell', gu: 'બાનાખત' },
    shortLabel: { en: 'Agreement to Sell', gu: 'બાનાખત' },
  },
  development_agreement: {
    id: 'development_agreement',
    label: { en: 'Development Agreement', gu: 'ડેવલપમેન્ટ કરાર' },
    shortLabel: { en: 'Development Agmt', gu: 'ડેવલપમેન્ટ' },
  },
};

/** IDs shown in the Document Type dropdown (hides legacy `sale_deed`) */
export const DOCUMENT_TYPE_IDS = Object.keys(DOCUMENT_TYPES).filter(
  (id) => !DOCUMENT_TYPES[id].hidden
);

export function isSaleDeedType(typeId) {
  const id = typeId || DEFAULT_DOCUMENT_TYPE;
  if (id === 'sale_deed') return true;
  return SALE_DEED_TYPE_IDS.includes(id);
}

/** Flat / house sale deeds commonly use Builder (promoter → allottee) layout */
export function isBuilderSaleDeedType(typeId) {
  return typeId === 'sale_deed_flat' || typeId === 'sale_deed_house' || typeId === 'sale_deed';
}

export function getDocumentTypeLabel(typeId, locale = 'gu') {
  const t = DOCUMENT_TYPES[typeId] || DOCUMENT_TYPES[DEFAULT_DOCUMENT_TYPE];
  return t.label[locale] || t.label.en;
}

export function getSaleDeedPropertyDefaults(typeId) {
  const t = DOCUMENT_TYPES[typeId];
  if (!t || t.category !== 'sale_deed') return null;
  return {
    propertyType: t.defaultPropertyType || '',
    unitType: t.defaultUnitType || '',
  };
}

/**
 * Which property / gov-record form sections to show for a document type (+ optional template).
 * Keeps wizard fields aligned with the deed subtype (e.g. no Project/Unit for farm land).
 */
export function getPropertyFormVisibility(documentType, templateId = '') {
  const type = documentType || DEFAULT_DOCUMENT_TYPE;
  const builder = templateId === 'builder' && isBuilderSaleDeedType(type);

  const FARM_GOV = [
    'revenue', 'mutation', 'extract712', 'form8A', 'encumbrance', 'bankNoc',
  ];
  const PLOT_GOV = [
    'revenue', 'mutation', 'naPermission', 'tpScheme', 'plotVerification',
    'citySurvey', 'extract712', 'form8A', 'encumbrance', 'bankNoc', 'developmentPermission',
  ];
  const HOUSE_GOV = [
    'revenue', 'mutation', 'naPermission', 'tpScheme', 'propertyCard', 'buildingPermission',
    'citySurvey', 'extract712', 'form8A', 'encumbrance', 'bankNoc', 'completionCertificate',
    'occupancyCertificate',
  ];
  const FLAT_GOV = [
    'revenue', 'mutation', 'naPermission', 'tpScheme', 'propertyCard', 'buildingPermission',
    'rera', 'citySurvey', 'extract712', 'form8A', 'encumbrance', 'bankNoc', 'societyNoc',
    'associationCertificate', 'possessionLetter', 'completionCertificate', 'occupancyCertificate',
  ];

  const base = {
    showFarmLandDetails: false,
    showProjectUnitDetails: false,
    showCitySurveyTpFp: true,
    showSqmLandArea: true,
    showBuiltUpNa: true,
    showPropertyTypeSelect: true,
    propertyTypeOptions: null, // null = all PROPERTY_TYPES
    lockPropertyType: null,
    showReraParking: false,
    showCarpetConstruction: false,
    govModuleIds: null, // null = all modules
  };

  switch (type) {
    case 'sale_deed_farm_land':
      return {
        ...base,
        showFarmLandDetails: true,
        showProjectUnitDetails: false,
        showCitySurveyTpFp: false,
        showSqmLandArea: false,
        showBuiltUpNa: false,
        showPropertyTypeSelect: false,
        lockPropertyType: 'agricultural',
        showReraParking: false,
        showCarpetConstruction: false,
        govModuleIds: FARM_GOV,
      };
    case 'sale_deed_plot':
      return {
        ...base,
        showProjectUnitDetails: false,
        showCitySurveyTpFp: true,
        showSqmLandArea: true,
        showBuiltUpNa: true,
        showPropertyTypeSelect: true,
        propertyTypeOptions: ['na_land', 'residential', 'commercial', 'industrial'],
        showReraParking: false,
        showCarpetConstruction: false,
        govModuleIds: PLOT_GOV,
      };
    case 'sale_deed_house':
      return {
        ...base,
        showProjectUnitDetails: true,
        showCitySurveyTpFp: true,
        showSqmLandArea: true,
        showBuiltUpNa: true,
        showPropertyTypeSelect: true,
        propertyTypeOptions: ['residential', 'na_land', 'commercial'],
        showReraParking: Boolean(builder),
        showCarpetConstruction: true,
        houseUnitOptions: true,
        govModuleIds: HOUSE_GOV,
      };
    case 'sale_deed_flat':
    case 'sale_deed':
    default:
      return {
        ...base,
        showProjectUnitDetails: true,
        showCitySurveyTpFp: true,
        showSqmLandArea: true,
        showBuiltUpNa: true,
        showPropertyTypeSelect: true,
        propertyTypeOptions: type === 'sale_deed_flat' ? ['flat', 'residential', 'commercial'] : null,
        showReraParking: true,
        showCarpetConstruction: true,
        govModuleIds: type.startsWith('sale_deed') || type === 'sale_deed' ? FLAT_GOV : null,
      };
  }
}
