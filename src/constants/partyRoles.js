import { getDocumentTypeLabel } from './documentTypes';

/** Party role labels (and cover field labels) by document type */
export const DOCUMENT_PARTY_ROLES = {
  sale_deed: {
    first: { gu: 'વેચાણ આપનાર (પ્રથમ પક્ષ)', en: 'Seller (First Party)' },
    second: { gu: 'વેચાણ લેનાર (બીજા પક્ષ)', en: 'Buyer (Second Party)' },
    coverFirst: { gu: 'આપનાર / વેચનાર', en: 'Seller(s)' },
    coverSecond: { gu: 'લેનાર / ખરીદનાર', en: 'Buyer(s)' },
    amountLabel: { gu: 'વેચાણ / અવેજ રકમ', en: 'Sale / Consideration Amount' },
    preambleTitle: { gu: '-: વેચાણ દસ્તાવેજ :-', en: '-: Sale Deed :-' },
    useStampReserve: true,
    showPayment: true,
  },
  gift_deed: {
    first: { gu: 'ડોનર / ભેટ આપનાર', en: 'Donor' },
    second: { gu: 'ડોની / ભેટ લેનાર', en: 'Donee' },
    coverFirst: { gu: 'ડોનર', en: 'Donor' },
    coverSecond: { gu: 'ડોની', en: 'Donee' },
    amountLabel: { gu: 'સ્ટેમ્પ મૂલ્ય (ભેટ)', en: 'Stamp / Gift Value' },
    preambleTitle: { gu: '-: ભેટ દસ્તાવેજ :-', en: '-: Gift Deed :-' },
    useStampReserve: true,
    showPayment: false,
  },
  mortgage: {
    first: { gu: 'મોર્ગેજર', en: 'Mortgagor' },
    second: { gu: 'મોર્ગેજી', en: 'Mortgagee' },
    coverFirst: { gu: 'મોર્ગેજર', en: 'Mortgagor' },
    coverSecond: { gu: 'મોર્ગેજી', en: 'Mortgagee' },
    amountLabel: { gu: 'લોન રકમ', en: 'Loan Amount' },
    preambleTitle: { gu: '-: ગીરો દસ્તાવેજ :-', en: '-: Mortgage Deed :-' },
    useStampReserve: true,
    showPayment: true,
  },
  release_deed: {
    first: { gu: 'રિલીઝર', en: 'Releasor' },
    second: { gu: 'રિલીઝી', en: 'Releasee' },
    coverFirst: { gu: 'રિલીઝર', en: 'Releasor' },
    coverSecond: { gu: 'રિલીઝી', en: 'Releasee' },
    amountLabel: { gu: 'વિચારણા રકમ', en: 'Consideration' },
    preambleTitle: { gu: '-: રિલીઝ દસ્તાવેજ :-', en: '-: Release Deed :-' },
    useStampReserve: true,
    showPayment: false,
  },
  lease_deed: {
    first: { gu: 'લેસર', en: 'Lessor' },
    second: { gu: 'લેસી', en: 'Lessee' },
    coverFirst: { gu: 'લેસર', en: 'Lessor' },
    coverSecond: { gu: 'લેસી', en: 'Lessee' },
    amountLabel: { gu: 'ભાડું / ડિપોઝિટ', en: 'Rent / Deposit' },
    preambleTitle: { gu: '-: ભાડા દસ્તાવેજ :-', en: '-: Lease Deed :-' },
    useStampReserve: true,
    showPayment: true,
  },
  leave_and_license: {
    first: { gu: 'લાયસેન્સર', en: 'Licensor' },
    second: { gu: 'લાયસેન્સી', en: 'Licensee' },
    coverFirst: { gu: 'લાયસેન્સર', en: 'Licensor' },
    coverSecond: { gu: 'લાયસેન્સી', en: 'Licensee' },
    amountLabel: { gu: 'લાયસન્સ ફી', en: 'License Fee' },
    preambleTitle: { gu: '-: લીવ એન્ડ લાયસન્સ :-', en: '-: Leave and License :-' },
    useStampReserve: true,
    showPayment: true,
  },
  partition_deed: {
    first: { gu: 'સહમાલિક / પક્ષકાર ૧', en: 'Co-owner / Party 1' },
    second: { gu: 'સહમાલિક / પક્ષકાર ૨', en: 'Co-owner / Party 2' },
    coverFirst: { gu: 'પક્ષકાર ૧', en: 'Party 1' },
    coverSecond: { gu: 'પક્ષકાર ૨', en: 'Party 2' },
    amountLabel: { gu: 'વહેંચણી મૂલ્ય', en: 'Partition Value' },
    preambleTitle: { gu: '-: વહેંચણી દસ્તાવેજ :-', en: '-: Partition Deed :-' },
    useStampReserve: true,
    showPayment: false,
  },
  will: {
    first: { gu: 'ટેસ્ટેટર', en: 'Testator' },
    second: { gu: 'લાભાર્થી', en: 'Beneficiary' },
    coverFirst: { gu: 'ટેસ્ટેટર', en: 'Testator' },
    coverSecond: { gu: 'લાભાર્થી', en: 'Beneficiary' },
    amountLabel: { gu: 'મિલકત મૂલ્ય', en: 'Estate Value' },
    preambleTitle: { gu: '-: વસિયતનામું :-', en: '-: Will :-' },
    useStampReserve: false,
    showPayment: false,
  },
  power_of_attorney: {
    first: { gu: 'પ્રિન્સિપલ', en: 'Principal' },
    second: { gu: 'એટર્ની', en: 'Attorney' },
    coverFirst: { gu: 'પ્રિન્સિપલ', en: 'Principal' },
    coverSecond: { gu: 'એટર્ની', en: 'Attorney' },
    amountLabel: { gu: '—', en: '—' },
    preambleTitle: { gu: '-: પાવર ઓફ એટર્ની :-', en: '-: Power of Attorney :-' },
    useStampReserve: true,
    showPayment: false,
  },
  agreement_to_sell: {
    first: { gu: 'વેચનાર', en: 'Vendor' },
    second: { gu: 'ખરીદનાર', en: 'Vendee' },
    coverFirst: { gu: 'વેચનાર', en: 'Vendor' },
    coverSecond: { gu: 'ખરીદનાર', en: 'Vendee' },
    amountLabel: { gu: 'બાના / અવેજ', en: 'Earnest / Consideration' },
    preambleTitle: { gu: '-: બાનાખત / વેચાણ કરાર :-', en: '-: Agreement to Sell :-' },
    useStampReserve: true,
    showPayment: true,
  },
  development_agreement: {
    first: { gu: 'માલિક', en: 'Owner' },
    second: { gu: 'ડેવલપર', en: 'Developer' },
    coverFirst: { gu: 'માલિક', en: 'Owner' },
    coverSecond: { gu: 'ડેવલપર', en: 'Developer' },
    amountLabel: { gu: 'પ્રોજેક્ટ મૂલ્ય', en: 'Project Value' },
    preambleTitle: { gu: '-: ડેવલપમેન્ટ કરાર :-', en: '-: Development Agreement :-' },
    useStampReserve: true,
    showPayment: false,
  },
};

export function getPartyRoles(documentType) {
  return DOCUMENT_PARTY_ROLES[documentType] || DOCUMENT_PARTY_ROLES.sale_deed;
}

export function getPreambleTitle(documentType, locale = 'gu') {
  const roles = getPartyRoles(documentType);
  return roles.preambleTitle[locale] || roles.preambleTitle.en || getDocumentTypeLabel(documentType, locale);
}
