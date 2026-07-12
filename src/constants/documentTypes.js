export const DOCUMENT_TYPES = {
  sale_deed: {
    id: 'sale_deed',
    label: { en: 'Sale Deed', gu: 'વેચાણ દસ્તાવેજ' },
    shortLabel: { en: 'Sale Deed', gu: 'વેચાણ દસ્તાવેજ' },
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

export const DOCUMENT_TYPE_IDS = Object.keys(DOCUMENT_TYPES);

export function getDocumentTypeLabel(typeId, locale = 'gu') {
  const t = DOCUMENT_TYPES[typeId] || DOCUMENT_TYPES.sale_deed;
  return t.label[locale] || t.label.en;
}
