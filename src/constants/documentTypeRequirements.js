/**
 * Gujarat deed / instrument field requirements by document type.
 * Based on Registration Act 1908 §17, TPA 1882, and Gujarat SRO practice:
 * - Sale / Agreement to Sell: consideration + payment trail + TDS (≥₹50L) + full property chain
 * - Gift: no consideration payments; stamp on market/jantri value; donor–donee + 2 witnesses
 * - Mortgage: loan / charge particulars; no sale consideration matrix
 * - Lease (>1 yr) / Leave & License: rent, deposit, term — not sale consideration
 * - Release / Partition: co-owner parties; stamp often fixed/share-based; no sale payments
 * - Will: testator + beneficiaries; registration optional; no stamp on will itself typically
 * - POA: principal + attorney + powers; property ID if property POA
 * - Development agreement: owner + developer + project commercial terms
 */

export const DOCUMENT_TYPE_REQUIREMENTS = {
  sale_deed: {
    id: 'sale_deed',
    showProperty: true,
    showGovRecords: true,
    showTitleHistory: true,
    showFinancialStep: true,
    showConsideration: true,
    showPaymentInstallments: true,
    showTds: true,
    showStampDuty: true,
    showRegistrationFee: true,
    requirePaymentsMatch: true,
    requireJantri: true,
    require712: true,
    requireBoundaries: true,
    requireArea: true,
    minSellers: 1,
    minBuyers: 1,
    minWitnesses: 2,
    requireGarvi: true,
    amountLabelKey: 'consideration',
    instrumentFields: [],
    complianceKeys: [
      'hasOriginalTitleDeeds', 'has712Extract', 'hasPropertyCard', 'hasJantriCertificate',
      'hasPassportPhotos', 'hasGrasPayment', 'hasOnlineRegFee', 'hasBiometricConsent',
    ],
    wizard: {
      partiesDesc: { en: 'Seller & Buyer details', gu: 'વેચનાર અને ખરીદનાર' },
      propertyDesc: { en: 'Survey, areas, boundaries & gov records', gu: 'સર્વે, વિસ્તાર, સીમા અને સરકારી રેકોર્ડ' },
      financialDesc: { en: 'Sale consideration, installments & TDS', gu: 'અવેજ, હપ્તા અને TDS' },
      complianceDesc: { en: 'SRO checklist, witnesses & title chain', gu: 'SRO ચેકલિસ્ટ, સાક્ષી અને માલિકી સાંકળ' },
    },
  },

  gift_deed: {
    id: 'gift_deed',
    showProperty: true,
    showGovRecords: true,
    showTitleHistory: true,
    showFinancialStep: true,
    showConsideration: true, // stamp / market value only — not sale price
    showPaymentInstallments: false,
    showTds: false,
    showStampDuty: true,
    showRegistrationFee: true,
    requirePaymentsMatch: false,
    requireJantri: true,
    require712: true,
    requireBoundaries: true,
    requireArea: true,
    minSellers: 1,
    minBuyers: 1,
    minWitnesses: 2,
    requireGarvi: true,
    amountLabelKey: 'giftValue',
    instrumentFields: ['giftRelationship', 'giftNaturalLove'],
    complianceKeys: [
      'hasOriginalTitleDeeds', 'has712Extract', 'hasPropertyCard', 'hasJantriCertificate',
      'hasPassportPhotos', 'hasGrasPayment', 'hasOnlineRegFee', 'hasBiometricConsent',
    ],
    wizard: {
      partiesDesc: { en: 'Donor & Donee details', gu: 'ડોનર અને ડોની' },
      propertyDesc: { en: 'Gifted property identification', gu: 'ભેટની મિલકત વિગત' },
      financialDesc: { en: 'Stamp value, duty & registration fee', gu: 'સ્ટેમ્પ મૂલ્ય, ડ્યુટી અને નોંધણી ફી' },
      complianceDesc: { en: 'Witnesses & SRO checklist', gu: 'સાક્ષી અને SRO ચેકલિસ્ટ' },
    },
  },

  mortgage: {
    id: 'mortgage',
    showProperty: true,
    showGovRecords: true,
    showTitleHistory: false,
    showFinancialStep: true,
    showConsideration: true,
    showPaymentInstallments: false,
    showTds: false,
    showStampDuty: true,
    showRegistrationFee: true,
    requirePaymentsMatch: false,
    requireJantri: false,
    require712: true,
    requireBoundaries: true,
    requireArea: true,
    minSellers: 1,
    minBuyers: 1,
    minWitnesses: 2,
    requireGarvi: true,
    amountLabelKey: 'loan',
    instrumentFields: ['loanAmount', 'interestRate', 'loanTenureMonths', 'lenderBank', 'mortgageType'],
    complianceKeys: [
      'hasOriginalTitleDeeds', 'has712Extract', 'hasPassportPhotos',
      'hasGrasPayment', 'hasOnlineRegFee', 'hasBiometricConsent',
    ],
    wizard: {
      partiesDesc: { en: 'Mortgagor & Mortgagee', gu: 'મોર્ગેજર અને મોર્ગેજી' },
      propertyDesc: { en: 'Charged / hypothecated property', gu: 'ગીરે મૂકેલી મિલકત' },
      financialDesc: { en: 'Loan amount, interest & stamp', gu: 'લોન રકમ, વ્યાજ અને સ્ટેમ્પ' },
      complianceDesc: { en: 'Witnesses & registration checklist', gu: 'સાક્ષી અને નોંધણી ચેકલિસ્ટ' },
    },
  },

  release_deed: {
    id: 'release_deed',
    showProperty: true,
    showGovRecords: true,
    showTitleHistory: true,
    showFinancialStep: true,
    showConsideration: true,
    showPaymentInstallments: false,
    showTds: false,
    showStampDuty: true,
    showRegistrationFee: true,
    requirePaymentsMatch: false,
    requireJantri: true,
    require712: true,
    requireBoundaries: true,
    requireArea: true,
    minSellers: 1,
    minBuyers: 1,
    minWitnesses: 2,
    requireGarvi: true,
    amountLabelKey: 'releaseConsideration',
    instrumentFields: ['releaseShareDescription'],
    complianceKeys: [
      'hasOriginalTitleDeeds', 'has712Extract', 'hasPropertyCard',
      'hasPassportPhotos', 'hasGrasPayment', 'hasOnlineRegFee', 'hasBiometricConsent',
    ],
    wizard: {
      partiesDesc: { en: 'Releasor & Releasee', gu: 'રિલીઝર અને રિલીઝી' },
      propertyDesc: { en: 'Property being released', gu: 'રિલીઝ થતી મિલકત' },
      financialDesc: { en: 'Consideration (if any) & stamp', gu: 'વિચારણા (જો હોય) અને સ્ટેમ્પ' },
      complianceDesc: { en: 'Witnesses & checklist', gu: 'સાક્ષી અને ચેકલિસ્ટ' },
    },
  },

  lease_deed: {
    id: 'lease_deed',
    showProperty: true,
    showGovRecords: false,
    showTitleHistory: false,
    showFinancialStep: true,
    showConsideration: false,
    showPaymentInstallments: false,
    showTds: false,
    showStampDuty: true,
    showRegistrationFee: true,
    requirePaymentsMatch: false,
    requireJantri: false,
    require712: false,
    requireBoundaries: true,
    requireArea: true,
    minSellers: 1,
    minBuyers: 1,
    minWitnesses: 2,
    requireGarvi: true,
    amountLabelKey: 'rent',
    instrumentFields: [
      'rentMonthly', 'securityDeposit', 'leaseStartDate', 'leaseEndDate', 'leaseTermMonths', 'leasePurpose',
    ],
    complianceKeys: [
      'hasPassportPhotos', 'hasGrasPayment', 'hasOnlineRegFee', 'hasBiometricConsent',
    ],
    wizard: {
      partiesDesc: { en: 'Lessor & Lessee', gu: 'લેસર અને લેસી' },
      propertyDesc: { en: 'Leased premises', gu: 'ભાડે આપેલી મિલકત' },
      financialDesc: { en: 'Rent, deposit, term & stamp', gu: 'ભાડું, ડિપોઝિટ, મુદત અને સ્ટેમ્પ' },
      complianceDesc: { en: 'Witnesses & registration', gu: 'સાક્ષી અને નોંધણી' },
    },
  },

  leave_and_license: {
    id: 'leave_and_license',
    showProperty: true,
    showGovRecords: false,
    showTitleHistory: false,
    showFinancialStep: true,
    showConsideration: false,
    showPaymentInstallments: false,
    showTds: false,
    showStampDuty: true,
    showRegistrationFee: false,
    requirePaymentsMatch: false,
    requireJantri: false,
    require712: false,
    requireBoundaries: true,
    requireArea: true,
    minSellers: 1,
    minBuyers: 1,
    minWitnesses: 2,
    requireGarvi: false,
    amountLabelKey: 'licenseFee',
    instrumentFields: [
      'rentMonthly', 'securityDeposit', 'leaseStartDate', 'leaseEndDate', 'leaseTermMonths', 'leasePurpose',
    ],
    complianceKeys: [
      'hasPassportPhotos', 'hasGrasPayment', 'hasBiometricConsent',
    ],
    wizard: {
      partiesDesc: { en: 'Licensor & Licensee', gu: 'લાયસેન્સર અને લાયસેન્સી' },
      propertyDesc: { en: 'Licensed premises', gu: 'લાયસન્સ પરિસર' },
      financialDesc: { en: 'License fee, deposit & term', gu: 'લાયસન્સ ફી, ડિપોઝિટ અને મુદત' },
      complianceDesc: { en: 'Witnesses & checklist', gu: 'સાક્ષી અને ચેકલિસ્ટ' },
    },
  },

  partition_deed: {
    id: 'partition_deed',
    showProperty: true,
    showGovRecords: true,
    showTitleHistory: true,
    showFinancialStep: true,
    showConsideration: true,
    showPaymentInstallments: false,
    showTds: false,
    showStampDuty: true,
    showRegistrationFee: true,
    requirePaymentsMatch: false,
    requireJantri: true,
    require712: true,
    requireBoundaries: true,
    requireArea: true,
    minSellers: 2,
    minBuyers: 0, // co-owners listed as sellers; second party optional allottee
    minWitnesses: 2,
    requireGarvi: true,
    amountLabelKey: 'partitionValue',
    instrumentFields: ['partitionShares'],
    complianceKeys: [
      'hasOriginalTitleDeeds', 'has712Extract', 'hasPropertyCard', 'hasJantriCertificate',
      'hasPassportPhotos', 'hasGrasPayment', 'hasOnlineRegFee', 'hasBiometricConsent',
    ],
    wizard: {
      partiesDesc: { en: 'Co-owners (min. 2)', gu: 'સહમાલિકો (ઓછામાં ઓછા ૨)' },
      propertyDesc: { en: 'Joint property being partitioned', gu: 'વહેંચણીની સંયુક્ત મિલકત' },
      financialDesc: { en: 'Share value & stamp', gu: 'હિસ્સા મૂલ્ય અને સ્ટેમ્પ' },
      complianceDesc: { en: 'Witnesses & title chain', gu: 'સાક્ષી અને માલિકી સાંકળ' },
    },
  },

  will: {
    id: 'will',
    showProperty: true,
    showGovRecords: false,
    showTitleHistory: false,
    showFinancialStep: false,
    showConsideration: false,
    showPaymentInstallments: false,
    showTds: false,
    showStampDuty: false,
    showRegistrationFee: false,
    requirePaymentsMatch: false,
    requireJantri: false,
    require712: false,
    requireBoundaries: false,
    requireArea: false,
    minSellers: 1,
    minBuyers: 1,
    minWitnesses: 2,
    requireGarvi: false,
    amountLabelKey: 'none',
    instrumentFields: ['willExecutor', 'willRevokesPrior'],
    complianceKeys: [
      'hasPassportPhotos', 'hasBiometricConsent',
    ],
    wizard: {
      partiesDesc: { en: 'Testator & Beneficiaries', gu: 'ટેસ્ટેટર અને લાભાર્થીઓ' },
      propertyDesc: { en: 'Estate / bequeathed property (optional detail)', gu: 'વસિયત મિલકત (વૈકલ્પિક વિગત)' },
      financialDesc: { en: '', gu: '' },
      complianceDesc: { en: 'Attesting witnesses & executor', gu: 'સાક્ષી અને એક્ઝિક્યુટર' },
    },
  },

  power_of_attorney: {
    id: 'power_of_attorney',
    showProperty: true,
    showGovRecords: false,
    showTitleHistory: false,
    showFinancialStep: true,
    showConsideration: false,
    showPaymentInstallments: false,
    showTds: false,
    showStampDuty: true,
    showRegistrationFee: true,
    requirePaymentsMatch: false,
    requireJantri: false,
    require712: false,
    requireBoundaries: false,
    requireArea: false,
    minSellers: 1,
    minBuyers: 1,
    minWitnesses: 2,
    requireGarvi: true,
    amountLabelKey: 'none',
    instrumentFields: ['poaPowers', 'poaDuration', 'poaIrrevocable'],
    complianceKeys: [
      'hasPassportPhotos', 'hasGrasPayment', 'hasOnlineRegFee', 'hasBiometricConsent',
    ],
    wizard: {
      partiesDesc: { en: 'Principal & Attorney', gu: 'પ્રિન્સિપલ અને એટર્ની' },
      propertyDesc: { en: 'Property covered by POA (if any)', gu: 'POA હેઠળની મિલકત (જો હોય)' },
      financialDesc: { en: 'Stamp & registration fee', gu: 'સ્ટેમ્પ અને નોંધણી ફી' },
      complianceDesc: { en: 'Powers, witnesses & checklist', gu: 'અધિકારો, સાક્ષી અને ચેકલિસ્ટ' },
    },
  },

  agreement_to_sell: {
    id: 'agreement_to_sell',
    showProperty: true,
    showGovRecords: true,
    showTitleHistory: false,
    showFinancialStep: true,
    showConsideration: true,
    showPaymentInstallments: true,
    showTds: false,
    showStampDuty: true,
    showRegistrationFee: true,
    requirePaymentsMatch: false, // earnest may be partial
    requireJantri: true,
    require712: true,
    requireBoundaries: true,
    requireArea: true,
    minSellers: 1,
    minBuyers: 1,
    minWitnesses: 2,
    requireGarvi: true,
    amountLabelKey: 'earnest',
    instrumentFields: ['earnestAmount', 'agreementCompletionDate', 'balancePayable'],
    complianceKeys: [
      'hasOriginalTitleDeeds', 'has712Extract', 'hasJantriCertificate',
      'hasPassportPhotos', 'hasGrasPayment', 'hasOnlineRegFee', 'hasBiometricConsent',
    ],
    wizard: {
      partiesDesc: { en: 'Vendor & Vendee', gu: 'વેચનાર અને ખરીદનાર' },
      propertyDesc: { en: 'Property under agreement', gu: 'કરાર હેઠળની મિલકત' },
      financialDesc: { en: 'Earnest, schedule & stamp', gu: 'બાના, સમયપત્રક અને સ્ટેમ્પ' },
      complianceDesc: { en: 'Witnesses & checklist', gu: 'સાક્ષી અને ચેકલિસ્ટ' },
    },
  },

  development_agreement: {
    id: 'development_agreement',
    showProperty: true,
    showGovRecords: true,
    showTitleHistory: true,
    showFinancialStep: true,
    showConsideration: true,
    showPaymentInstallments: false,
    showTds: false,
    showStampDuty: true,
    showRegistrationFee: true,
    requirePaymentsMatch: false,
    requireJantri: true,
    require712: true,
    requireBoundaries: true,
    requireArea: true,
    minSellers: 1,
    minBuyers: 1,
    minWitnesses: 2,
    requireGarvi: true,
    amountLabelKey: 'projectValue',
    instrumentFields: ['developerSharePercent', 'ownerShareUnits', 'projectName', 'fsiAllowed'],
    complianceKeys: [
      'hasOriginalTitleDeeds', 'has712Extract', 'hasPropertyCard', 'hasJantriCertificate',
      'hasPassportPhotos', 'hasGrasPayment', 'hasOnlineRegFee', 'hasBiometricConsent',
    ],
    wizard: {
      partiesDesc: { en: 'Owner & Developer', gu: 'માલિક અને ડેવલપર' },
      propertyDesc: { en: 'Land / project site', gu: 'જમીન / પ્રોજેક્ટ સાઇટ' },
      financialDesc: { en: 'Project value, share & stamp', gu: 'પ્રોજેક્ટ મૂલ્ય, હિસ્સો અને સ્ટેમ્પ' },
      complianceDesc: { en: 'Witnesses & title chain', gu: 'સાક્ષી અને માલિકી સાંકળ' },
    },
  },
};

export function getDocumentRequirements(documentType) {
  return DOCUMENT_TYPE_REQUIREMENTS[documentType] || DOCUMENT_TYPE_REQUIREMENTS.sale_deed;
}

export function getWizardStepsForType(documentType, locale = 'en') {
  const req = getDocumentRequirements(documentType);
  const steps = [
    {
      key: 'parties',
      label: locale === 'gu' ? 'પક્ષકારો' : 'Party Details',
      desc: req.wizard.partiesDesc[locale] || req.wizard.partiesDesc.en,
    },
    {
      key: 'property',
      label: locale === 'gu' ? 'મિલકત વિગત' : 'Property Specs',
      desc: req.wizard.propertyDesc[locale] || req.wizard.propertyDesc.en,
    },
  ];
  if (req.showFinancialStep) {
    steps.push({
      key: 'financial',
      label: locale === 'gu' ? 'નાણાકીય વિગત' : 'Financials',
      desc: req.wizard.financialDesc[locale] || req.wizard.financialDesc.en,
    });
  }
  steps.push({
    key: 'compliance',
    label: locale === 'gu' ? 'અનુપાલન' : 'Compliance',
    desc: req.wizard.complianceDesc[locale] || req.wizard.complianceDesc.en,
  });
  return steps;
}

export function getAmountFieldLabel(documentType, locale = 'en') {
  const key = getDocumentRequirements(documentType).amountLabelKey;
  const labels = {
    consideration: { en: 'Total Sale Consideration (₹)', gu: 'કુલ અવેજ રકમ (₹)' },
    giftValue: { en: 'Stamp / Market Value for Gift (₹)', gu: 'ભેટ માટે સ્ટેમ્પ / બજાર મૂલ્ય (₹)' },
    loan: { en: 'Loan / Mortgage Amount (₹)', gu: 'લોન / ગીરો રકમ (₹)' },
    rent: { en: 'Monthly Rent (₹)', gu: 'માસિક ભાડું (₹)' },
    licenseFee: { en: 'Monthly License Fee (₹)', gu: 'માસિક લાયસન્સ ફી (₹)' },
    releaseConsideration: { en: 'Release Consideration (₹, if any)', gu: 'રિલીઝ વિચારણા (₹, જો હોય)' },
    partitionValue: { en: 'Partition / Share Value (₹)', gu: 'વહેંચણી / હિસ્સા મૂલ્ય (₹)' },
    earnest: { en: 'Total Agreed Consideration (₹)', gu: 'કુલ કરારિત અવેજ (₹)' },
    projectValue: { en: 'Project / Development Value (₹)', gu: 'પ્રોજેક્ટ / ડેવલપમેન્ટ મૂલ્ય (₹)' },
    none: { en: 'Amount (N/A)', gu: 'રકમ (લાગુ નથી)' },
  };
  const L = labels[key] || labels.consideration;
  return L[locale] || L.en;
}

export function createEmptyInstrument() {
  return {
    giftRelationship: '',
    giftNaturalLove: true,
    loanAmount: '',
    interestRate: '',
    loanTenureMonths: '',
    lenderBank: '',
    mortgageType: 'with_possession',
    rentMonthly: '',
    securityDeposit: '',
    leaseStartDate: '',
    leaseEndDate: '',
    leaseTermMonths: '',
    leasePurpose: '',
    releaseShareDescription: '',
    partitionShares: '',
    willExecutor: '',
    willRevokesPrior: true,
    poaPowers: '',
    poaDuration: '',
    poaIrrevocable: false,
    earnestAmount: '',
    agreementCompletionDate: '',
    balancePayable: '',
    developerSharePercent: '',
    ownerShareUnits: '',
    projectName: '',
    fsiAllowed: '',
  };
}

/** Instrument field metadata for form UI */
export const INSTRUMENT_FIELD_META = {
  giftRelationship: {
    label: { en: 'Relationship (Donor → Donee)', gu: 'સંબંધ (ડોનર → ડોની)' },
    type: 'text',
    placeholder: { en: 'e.g. Father to Son', gu: 'દા.ત. પિતા થી પુત્ર' },
  },
  giftNaturalLove: {
    label: { en: 'Out of natural love & affection', gu: 'પ્રેમ અને સ્નેહથી' },
    type: 'checkbox',
  },
  loanAmount: {
    label: { en: 'Loan Amount (₹)', gu: 'લોન રકમ (₹)' },
    type: 'number',
  },
  interestRate: {
    label: { en: 'Interest Rate (% p.a.)', gu: 'વ્યાજ દર (% વાર્ષિક)' },
    type: 'text',
  },
  loanTenureMonths: {
    label: { en: 'Tenure (months)', gu: 'મુદત (મહિના)' },
    type: 'number',
  },
  lenderBank: {
    label: { en: 'Lender / Bank', gu: 'ધિરાણકર્તા / બેંક' },
    type: 'text',
  },
  mortgageType: {
    label: { en: 'Mortgage Type', gu: 'ગીરો પ્રકાર' },
    type: 'select',
    options: [
      { value: 'with_possession', label: { en: 'With possession', gu: 'કબજા સાથે' } },
      { value: 'without_possession', label: { en: 'Without possession', gu: 'કબજા વગર' } },
      { value: 'equitable', label: { en: 'Equitable (title deposit)', gu: 'ઇક્વિટેબલ (ટાઇટલ ડિપોઝિટ)' } },
    ],
  },
  rentMonthly: {
    label: { en: 'Monthly Rent / Fee (₹)', gu: 'માસિક ભાડું / ફી (₹)' },
    type: 'number',
  },
  securityDeposit: {
    label: { en: 'Security Deposit (₹)', gu: 'સિક્યોરિટી ડિપોઝિટ (₹)' },
    type: 'number',
  },
  leaseStartDate: {
    label: { en: 'Start Date', gu: 'શરૂઆત તારીખ' },
    type: 'date',
  },
  leaseEndDate: {
    label: { en: 'End Date', gu: 'અંત તારીખ' },
    type: 'date',
  },
  leaseTermMonths: {
    label: { en: 'Term (months)', gu: 'મુદત (મહિના)' },
    type: 'number',
  },
  leasePurpose: {
    label: { en: 'Purpose of use', gu: 'ઉપયોગનો હેતુ' },
    type: 'text',
    placeholder: { en: 'Residential / Commercial', gu: 'રહેણાંક / વ્યવસાયિક' },
  },
  releaseShareDescription: {
    label: { en: 'Share / Right being released', gu: 'રિલીઝ થતો હિસ્સો / હક્ક' },
    type: 'textarea',
  },
  partitionShares: {
    label: { en: 'Allotment of shares', gu: 'હિસ્સાની ફાળવણી' },
    type: 'textarea',
    placeholder: { en: 'Party A: East half; Party B: West half…', gu: 'પક્ષકાર અ: પૂર્વ અર્ધ; પક્ષકાર બ: પશ્ચિમ અર્ધ…' },
  },
  willExecutor: {
    label: { en: 'Executor name', gu: 'એક્ઝિક્યુટરનું નામ' },
    type: 'text',
  },
  willRevokesPrior: {
    label: { en: 'Revokes all prior wills', gu: 'પહેલાની બધી વસિયતો રદ' },
    type: 'checkbox',
  },
  poaPowers: {
    label: { en: 'Powers conferred', gu: 'આપેલા અધિકારો' },
    type: 'textarea',
    placeholder: { en: 'Sell, mortgage, execute documents, appear before SRO…', gu: 'વેચવું, ગીરે મૂકવું, દસ્તાવેજ કરવા, SRO સમક્ષ હાજર થવું…' },
  },
  poaDuration: {
    label: { en: 'Duration / Validity', gu: 'મુદત / માન્યતા' },
    type: 'text',
    placeholder: { en: 'Until revoked / 3 years', gu: 'રદ ન થાય ત્યાં સુધી / ૩ વર્ષ' },
  },
  poaIrrevocable: {
    label: { en: 'Irrevocable POA', gu: 'અપરિવર્તનીય POA' },
    type: 'checkbox',
  },
  earnestAmount: {
    label: { en: 'Earnest / Token (₹)', gu: 'બાના / ટોકન (₹)' },
    type: 'number',
  },
  agreementCompletionDate: {
    label: { en: 'Sale deed completion by', gu: 'વેચાણ દસ્તાવેજ પૂર્ણ તારીખ' },
    type: 'date',
  },
  balancePayable: {
    label: { en: 'Balance payable at deed (₹)', gu: 'દસ્તાવેજ વખતે બાકી (₹)' },
    type: 'number',
  },
  developerSharePercent: {
    label: { en: 'Developer share (%)', gu: 'ડેવલપર હિસ્સો (%)' },
    type: 'number',
  },
  ownerShareUnits: {
    label: { en: 'Owner allotment (units / area)', gu: 'માલિક ફાળવણી (યુનિટ / વિસ્તાર)' },
    type: 'text',
  },
  projectName: {
    label: { en: 'Proposed project name', gu: 'પ્રસ્તાવિત પ્રોજેક્ટ નામ' },
    type: 'text',
  },
  fsiAllowed: {
    label: { en: 'Permissible FSI / Height', gu: 'માન્ય FSI / ઊંચાઈ' },
    type: 'text',
  },
};
