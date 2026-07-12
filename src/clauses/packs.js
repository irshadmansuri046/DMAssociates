/** Shared property/party chrome clauses reused across document types */
const always = () => true;

export function baseTransferClauses(documentTypes, opts = {}) {
  const verb = opts.verbGu || 'હસ્તાંતર';
  return [
    {
      id: 'PREAMBLE',
      title: { gu: 'પ્રસ્તાવના', en: 'Preamble' },
      priority: 10,
      documentTypes,
      condition: always,
      renderAs: 'preamble',
      template: {
        gu: opts.preambleGu || `આ દસ્તાવેજ દ્વારા "{{ComplexName}}" / મોજે {{Village}} સર્વે નં. {{SurveyNo}} ની મિલકતનું ${verb} કરવામાં આવે છે.`,
        en: opts.preambleEn || `This deed effects transfer of property at {{Village}}, Survey {{SurveyNo}}, "{{ComplexName}}".`,
      },
    },
    {
      id: 'PARTIES',
      title: { gu: 'પક્ષકારો', en: 'Parties' },
      priority: 20,
      documentTypes,
      condition: always,
      renderAs: 'parties',
      template: { gu: '', en: '' },
    },
    {
      id: 'PROPERTY_DESC',
      title: { gu: 'મિલકતનું વર્ણન', en: 'Property' },
      priority: 30,
      documentTypes,
      condition: always,
      template: {
        gu: 'મિલકત: જિલ્લા-{{District}}, મોજે-{{Village}}, સર્વે {{SurveyNo}}, યુનિટ {{UnitNo}}, કાર્પેટ {{CarpetArea}} ચો.મી., કાર્ડ {{UnitCard}}.',
        en: 'Property at {{Village}}, Survey {{SurveyNo}}, Unit {{UnitNo}}, Carpet {{CarpetArea}} sq.m., Card {{UnitCard}}.',
      },
    },
    {
      id: 'NA_PERMISSION',
      title: { gu: 'NA પરવાનગી', en: 'NA Permission' },
      priority: 40,
      documentTypes,
      condition: (doc) => Boolean(doc.property?.naOrderNo || doc.property?.permissions?.naOrderNo),
      template: {
        gu: 'NA ઓર્ડર નં. {{NaOrderNo}} તારીખ {{NaOrderDate}} લાગુ પડે છે.',
        en: 'NA Order {{NaOrderNo}} dated {{NaOrderDate}} applies.',
      },
    },
    {
      id: 'RERA',
      title: { gu: 'RERA', en: 'RERA' },
      priority: 50,
      documentTypes,
      condition: (doc) => Boolean(doc.property?.reraNumber || doc.property?.permissions?.reraNumber),
      template: {
        gu: 'RERA નોંધણી: {{ReraNumber}}.',
        en: 'RERA registration: {{ReraNumber}}.',
      },
    },
    {
      id: 'BOUNDARIES',
      title: { gu: 'ચતુર્દિશા', en: 'Boundaries' },
      priority: 80,
      documentTypes,
      condition: always,
      renderAs: 'boundaries',
      template: {
        gu: 'મિલકતની ચતુર્દિશા નીચે મુજબ:',
        en: 'Boundaries are as under:',
      },
    },
    {
      id: 'SIGNATURES',
      title: { gu: 'સહીઓ', en: 'Signatures' },
      priority: 90,
      documentTypes,
      condition: always,
      renderAs: 'signatures',
      template: {
        gu: 'પક્ષકારોએ આ દસ્તાવેજ વાંચીને સ્વીકાર્યો છે.',
        en: 'The parties have read and accepted this deed.',
      },
    },
  ];
}

export const giftDeedClauses = [
  ...baseTransferClauses(['gift_deed'], {
    preambleGu: 'વેચાણ અવેજ વગર, પ્રેમ અને સ્નેહથી "{{ComplexName}}" / મોજે {{Village}} સર્વે {{SurveyNo}} ની મિલકત ભેટ રૂપે હસ્તાંતરિત કરવામાં આવે છે.',
    preambleEn: 'The Donor gifts absolute ownership of the scheduled property at {{Village}} without monetary consideration.',
  }),
  {
    id: 'GIFT_RECITAL',
    title: { gu: 'ભેટની ઘોષણા', en: 'Gift recital' },
    priority: 35,
    documentTypes: ['gift_deed'],
    condition: () => true,
    template: {
      gu: 'ડોનર (આપનાર) ડોની (લેનાર) ને મિલકતનો સંપૂર્ણ માલિકી હક્ક ભેટમાં આપે છે. આ ભેટ પરત લેવા યોગ્ય નથી.',
      en: 'The Donor transfers absolute ownership to the Donee by way of gift, irrevocable.',
    },
  },
];

export const mortgageClauses = [
  ...baseTransferClauses(['mortgage'], {
    preambleGu: 'લોન સુરક્ષા માટે મિલકત "{{ComplexName}}" / સર્વે {{SurveyNo}} ગીરે મૂકવામાં આવે છે.',
    preambleEn: 'The property is mortgaged as security for the loan facility.',
  }),
  {
    id: 'HYPOTHECATION',
    title: { gu: 'ગીરોની શરતો', en: 'Hypothecation' },
    priority: 35,
    documentTypes: ['mortgage'],
    condition: () => true,
    template: {
      gu: 'મોર્ગેજર મિલકતને મોર્ગેજીની તરફેણમાં પ્રથમ ચાર્જ તરીકે ગીરે મૂકે છે. લોનની સંપૂર્ણ ચુકવણી સુધી ભાર ચાલુ રહેશે.',
      en: 'The Mortgagor creates a first charge in favour of the Mortgagee until full repayment.',
    },
  },
];

export const releaseDeedClauses = baseTransferClauses(['release_deed'], {
  preambleGu: 'રિલીઝર પોતાનો હક્ક/દાવો મિલકત "{{ComplexName}}" પરથી મુક્ત કરે છે.',
  preambleEn: 'The Releasor releases all claims over the scheduled property.',
});

export const leaseDeedClauses = [
  ...baseTransferClauses(['lease_deed'], {
    preambleGu: 'લેસર લેસીને મિલકત "{{ComplexName}}" ભાડે આપે છે.',
    preambleEn: 'The Lessor demises the property to the Lessee on lease.',
  }),
  {
    id: 'LEASE_TERMS',
    title: { gu: 'ભાડાની મુદત', en: 'Lease terms' },
    priority: 35,
    documentTypes: ['lease_deed'],
    condition: () => true,
    template: {
      gu: 'ભાડાની મુદત અને ભાડું પક્ષકારો વચ્ચે નક્કી કર્યા મુજબ રહેશે. સુરક્ષા ડિપોઝિટ લેસી દ્વારા ચૂકવાશે.',
      en: 'Lease term, rent and security deposit shall be as agreed between the parties.',
    },
  },
];

export const leaveLicenseClauses = baseTransferClauses(['leave_and_license'], {
  preambleGu: 'લાયસેન્સર લાયસેન્સીને મિલકત વાપરવાની પરવાનગી આપે છે (માલિકી હસ્તાંતર વગર).',
  preambleEn: 'The Licensor grants a leave and license to use the premises without transferring ownership.',
});

export const partitionDeedClauses = baseTransferClauses(['partition_deed'], {
  preambleGu: 'સહમાલિકો વચ્ચે મિલકતની વહેંચણી આ દસ્તાવેજ દ્વારા નક્કી થાય છે.',
  preambleEn: 'Co-owners hereby partition the scheduled property as agreed.',
});

export const willClauses = [
  {
    id: 'PREAMBLE',
    title: { gu: 'વસિયત', en: 'Will' },
    priority: 10,
    documentTypes: ['will'],
    condition: always,
    renderAs: 'preamble',
    template: {
      gu: 'હું, ટેસ્ટેટર, મારી મિલકત "{{ComplexName}}" / મોજે {{Village}} અંગે આ વસિયતનામું કરું છું.',
      en: 'I, the Testator, hereby make this Will concerning property at {{Village}}.',
    },
  },
  {
    id: 'PARTIES',
    title: { gu: 'પક્ષકારો', en: 'Parties' },
    priority: 20,
    documentTypes: ['will'],
    condition: always,
    renderAs: 'parties',
    template: { gu: '', en: '' },
  },
  {
    id: 'BEQUEST',
    title: { gu: 'વારસા', en: 'Bequest' },
    priority: 30,
    documentTypes: ['will'],
    condition: always,
    template: {
      gu: 'મારા અવસાન પછી સદર મિલકત નીચે જણાવેલ લાભાર્થીને મળશે. એક્ઝિક્યુટર વસિયતનું અમલીકરણ કરશે.',
      en: 'Upon my demise the property shall vest in the named beneficiaries. The Executor shall administer this Will.',
    },
  },
  {
    id: 'SIGNATURES',
    title: { gu: 'સહીઓ', en: 'Signatures' },
    priority: 90,
    documentTypes: ['will'],
    condition: always,
    renderAs: 'signatures',
    template: {
      gu: 'ટેસ્ટેટર અને સાક્ષીઓની હાજરીમાં સહી કરવામાં આવી છે.',
      en: 'Signed by the Testator in the presence of witnesses.',
    },
  },
];

export const poaClauses = [
  {
    id: 'PREAMBLE',
    title: { gu: 'પાવર ઓફ એટર્ની', en: 'Power of Attorney' },
    priority: 10,
    documentTypes: ['power_of_attorney'],
    condition: always,
    renderAs: 'preamble',
    template: {
      gu: 'પ્રિન્સિપલ અધિકૃત વ્યક્તિ (એટર્ની) ને મિલકત "{{ComplexName}}" સંબંધિત કાર્યો કરવાની સત્તા આપે છે.',
      en: 'The Principal appoints the Attorney to act in respect of the scheduled property.',
    },
  },
  {
    id: 'PARTIES',
    title: { gu: 'પક્ષકારો', en: 'Parties' },
    priority: 20,
    documentTypes: ['power_of_attorney'],
    condition: always,
    renderAs: 'parties',
    template: { gu: '', en: '' },
  },
  {
    id: 'POWERS',
    title: { gu: 'સત્તાઓ', en: 'Powers' },
    priority: 30,
    documentTypes: ['power_of_attorney'],
    condition: always,
    template: {
      gu: 'એટર્નીને વેચાણ, અરજી, સહી, કબજો અને સરકારી કચેરીઓમાં રજૂઆત કરવાની સત્તા રહેશે, જેટલી પ્રિન્સિપલે લેખિતમાં આપી હોય.',
      en: 'The Attorney may sell, apply, sign, take possession and represent before authorities as expressly authorized.',
    },
  },
  {
    id: 'SIGNATURES',
    title: { gu: 'સહીઓ', en: 'Signatures' },
    priority: 90,
    documentTypes: ['power_of_attorney'],
    condition: always,
    renderAs: 'signatures',
    template: {
      gu: 'પ્રિન્સિપલે સ્વેચ્છાએ આ પી.ઓ.એ. અમલમાં મૂક્યું છે.',
      en: 'The Principal has executed this POA voluntarily.',
    },
  },
];

export const agreementToSellClauses = [
  ...baseTransferClauses(['agreement_to_sell'], {
    preambleGu: 'પક્ષકારો વચ્ચે મિલકત "{{ComplexName}}" ના વેચાણ માટે બાનાખત કરવામાં આવે છે. અંતિમ વેચાણ દસ્તાવેજ બાદમાં નોંધાશે.',
    preambleEn: 'The parties agree to sell/purchase the property; final Sale Deed shall follow.',
  }),
  {
    id: 'CONSIDERATION_PAYMENT',
    title: { gu: 'અવેજ', en: 'Consideration' },
    priority: 45,
    documentTypes: ['agreement_to_sell'],
    condition: () => true,
    renderAs: 'payment',
    template: {
      gu: 'બાના/અવેજની રકમ નીચે મુજબ ચૂકવાશે/ચૂકવાઈ છે.',
      en: 'Earnest money / consideration is paid or payable as below.',
    },
  },
];

export const developmentAgreementClauses = [
  ...baseTransferClauses(['development_agreement'], {
    preambleGu: 'માલિક અને ડેવલપર વચ્ચે "{{ComplexName}}" / સર્વે {{SurveyNo}} ના વિકાસ માટે કરાર થાય છે.',
    preambleEn: 'Owner and Developer agree to develop the scheduled land/project.',
  }),
  {
    id: 'FSI_DEV',
    title: { gu: 'FSI / વિકાસ', en: 'Development / FSI' },
    priority: 35,
    documentTypes: ['development_agreement'],
    condition: () => true,
    template: {
      gu: 'ડેવલપર મંજૂર પ્લાન/FSI મુજબ બાંધકામ કરશે અને માલિકને કરાર મુજબ ફાળો/યુનિટ આપશે.',
      en: 'Developer shall construct as per sanctioned plans/FSI and allot owner’s share as agreed.',
    },
  },
];
