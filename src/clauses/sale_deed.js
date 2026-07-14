/**
 * Sale Deed clause pack — dynamic legal clauses (no hardcoded JSX paragraphs).
 */

const SALE = ['sale_deed', 'sale_deed_flat', 'sale_deed_house', 'sale_deed_farm_land', 'sale_deed_plot'];

export const saleDeedClauses = [
  {
    id: 'PREAMBLE',
    title: { gu: 'પ્રસ્તાવના', en: 'Preamble' },
    priority: 10,
    documentTypes: SALE,
    condition: () => true,
    renderAs: 'preamble',
    template: {
      gu: 'રૂા.{{SaleAmountDigits}}/- (અંકે રૂપિયા {{SaleAmountWords}}) ના સદર અવેજે આજ રોજ તારીખ-{{ExecutionDate}} માહે {{ExecutionPlace}} ના દિને જિલ્લા-{{District}}, તાલુકા-{{Taluka}}, મોજે-{{Moje}} ની રે.સર્વે નં. {{SurveyNo}}, સીટી સર્વે નંબર {{CitySurveyNo}} ની બિનખેતી (NA) જમીન પર આવેલ "{{ComplexName}}" સંકુલમાં આવેલ નંબર {{UnitNo}} ની મિલકત, કાર્પેટ એરિયા {{CarpetArea}} ચો.મી., યુનીટ પ્રોપર્ટી કાર્ડ નંબર {{UnitCard}} સહિત, વેચાણ કરવામાં આવે છે.',
      en: 'For consideration of {{SaleAmount}} (Rupees {{SaleAmountWords}} only), the property being Unit {{UnitNo}} in "{{ComplexName}}" at Village {{Village}}, Survey No. {{SurveyNo}}, Carpet Area {{CarpetArea}} sq.m., Property Card {{UnitCard}}, is hereby sold.',
    },
  },
  {
    id: 'PARTIES',
    title: { gu: 'પક્ષકારો', en: 'Parties' },
    priority: 20,
    documentTypes: SALE,
    condition: () => true,
    renderAs: 'parties',
    template: { gu: '', en: '' },
  },
  {
    id: 'TITLE_SURVEY',
    title: { gu: '૧. બ્લોક/રેવન્યુ સર્વે વિગત', en: '1. Survey details' },
    priority: 30,
    documentTypes: SALE,
    condition: () => true,
    template: {
      gu: '૧. બ્લોક/રેવન્યુ સર્વે નંબર : {{SurveyNo}} ની સંપૂર્ણ વિગત :- જિલ્લા-{{District}}, તાલુકા-{{Taluka}}, મોજે-{{Moje}} ની રે.સર્વે નં. {{SurveyNo}}, સીટી સર્વે નંબર {{CitySurveyNo}} ની બિનખેતી (NA) જમીન પર આવેલ "{{ComplexName}}" માં નંબર {{UnitNo}} ની મિલકત, કાર્પેટ એરિયા {{CarpetArea}} ચો.મી., યુનીટ કાર્ડ {{UnitCard}} સહિત વેચાણ આપવામાં આવે છે. વેચાણ આપનાર ખાતરી આપે છે કે મિલકતનો હક્ક સ્પષ્ટ, નિ:શંક અને વેચનયોગ્ય છે.',
      en: '1. Full particulars of Survey No. {{SurveyNo}} at {{Village}}, {{District}}: Unit {{UnitNo}} in "{{ComplexName}}" with carpet area {{CarpetArea}} sq.m. The Seller warrants clear and marketable title.',
    },
  },
  {
    id: 'AREA_CLARIFICATION',
    title: { gu: '૨. જમીનના ક્ષેત્રફળ', en: '2. Area' },
    priority: 40,
    documentTypes: SALE,
    condition: (doc) => Boolean(doc.property?.totalPlotArea || doc.property?.areas?.totalPlotArea),
    template: {
      gu: '૨. જમીનના ક્ષેત્રફળ બાબતનું સ્પષ્ટીકરણ :- મોજે {{Moje}} ના રેકોર્ડમાં બ્લોક-સર્વે નંબર {{SurveyNo}} નું ક્ષેત્રફળ રેકોર્ડ મુજબ નક્કી કરવામાં આવેલ છે.',
      en: '2. The recorded area of Survey No. {{SurveyNo}} at Moje {{Moje}} is as per revenue records.',
    },
  },
  {
    id: 'NA_PERMISSION',
    title: { gu: '૩. બિનખેતીની પરવાનગી', en: '3. NA Permission' },
    priority: 50,
    documentTypes: SALE,
    condition: (doc) => Boolean(doc.property?.naOrderNo || doc.property?.permissions?.naOrderNo || doc.property?.govRecords?.naPermission?.orderNo),
    template: {
      gu: '૩. બિનખેતીની પરવાનગી બાબત ::- જિલ્લા-{{District}} ના કલેક્ટરશ્રીના ઓર્ડર નંબર {{NaOrderNo}} તારીખ {{NaOrderDate}} થી સદર જમીન બિનખેતી (NA) હેતુ માટે રૂપાંતરિત કરવામાં આવેલ છે.',
      en: '3. NA Permission Order No. {{NaOrderNo}} dated {{NaOrderDate}} converts the land to non-agricultural use.',
    },
  },
  {
    id: 'PLOT_VALIDATION',
    title: { gu: '૪. પ્લોટ વેલીડેશન', en: '4. Plot Validation' },
    priority: 55,
    documentTypes: SALE,
    condition: (doc) => Boolean(doc.property?.plotValidationOrderNo || doc.property?.permissions?.plotValidationOrderNo),
    template: {
      gu: '૪. પ્લોટ વેલીડેશન સર્ટીફીકેટ :- {{District}} શહેરી વિકાસ સત્તામંડળના ઓર્ડર મુજબ પ્લોટ વેલીડેશન મંજૂર કરવામાં આવેલ છે.',
      en: '4. Plot validation has been granted by the competent urban authority of {{District}}.',
    },
  },
  {
    id: 'BUILDING_PERMISSION',
    title: { gu: '૫. બાંધકામ પરવાનગી', en: '5. Building Permission' },
    priority: 60,
    documentTypes: SALE,
    condition: (doc) => Boolean(doc.property?.constructionPermissionNo || doc.property?.permissions?.constructionPermissionNo),
    template: {
      gu: '૫. બાંધકામ પરવાનગી બાબત :- "{{ComplexName}}" સંકુલમાં બાંધકામ મંજૂર કરવામાં આવેલ છે. સદર દસ્તાવેજમાં વર્ણવેલ મિલકતનો હક્ક વેચાણ આપનાર પાસે છે.',
      en: '5. Building permission for "{{ComplexName}}" has been granted and title vests with the Seller.',
    },
  },
  {
    id: 'PROPERTY_CARD',
    title: { gu: '૬. પ્રોપર્ટી કાર્ડ', en: '6. Property Card' },
    priority: 65,
    documentTypes: SALE,
    condition: (doc) => Boolean(doc.property?.unitCardNo || doc.property?.revenueRecords?.propertyCardNo || doc.property?.govRecords?.propertyCard?.cardNo),
    template: {
      gu: '૬. પ્રોપર્ટી કાર્ડ બાબત :- D.I.L.R. {{District}} દ્વારા યુનીટ પ્રોપર્ટી કાર્ડ નંબર {{UnitCard}} મંજૂર કરવામાં આવેલ છે. વેચાણ આપનાર ખાતરી આપે છે કે મિલકતનો હક્ક સ્પષ્ટ અને વેચનયોગ્ય છે.',
      en: '6. Unit Property Card No. {{UnitCard}} has been issued. Seller warrants clear title.',
    },
  },
  {
    id: 'GPA',
    title: { gu: '૧૨. જી. પી. એ.', en: '12. Power of Attorney' },
    priority: 70,
    documentTypes: SALE,
    condition: (doc) => Boolean(doc.property?.gpaDetails || doc.property?.permissions?.hasGpa || doc.property?.permissions?.gpaDetails),
    template: {
      gu: '૧૨. જી. પી. એ. :- {{GpaDetails}}',
      en: '12. Power of Attorney: {{GpaDetails}}',
    },
  },
  {
    id: 'MORTGAGE',
    title: { gu: 'ગીરો / અન્ય ભાર', en: 'Mortgage' },
    priority: 72,
    documentTypes: SALE,
    condition: (doc) => Boolean(doc.property?.permissions?.hasMortgage || doc.property?.permissions?.mortgageDetails || doc.property?.govRecords?.bankNoc?.nocNo),
    template: {
      gu: 'મિલકત સંબંધિત ગીરો/ભારની વિગત: {{MortgageDetails}} સંબંધિત NOC/રિલીઝ મેળવી લેવામાં આવેલ છે અથવા વેચાણ સમયે નિકાલ કરવામાં આવશે.',
      en: 'Mortgage/encumbrance particulars: {{MortgageDetails}}. Necessary NOC/release has been or shall be obtained.',
    },
  },
  {
    id: 'BANAKHAT',
    title: { gu: '૧૩. બાનાખત', en: '13. Agreement to Sell' },
    priority: 75,
    documentTypes: SALE,
    condition: () => true,
    template: {
      gu: '૧૩. બાનાખત :- પક્ષકારો વચ્ચે અગાઉ બિન-કબજાવાલા બાનાખત (Agreement for Sale) કરવામાં આવેલ હતું. બંને પક્ષોએ તેની શરતોનું પાલન કર્યું છે અને હવે અંતિમ વેચાણ દસ્તાવેજ નોંધાવવાનું નક્કી કર્યું છે.',
      en: '13. The parties previously executed an Agreement for Sale and now proceed to register the final Sale Deed.',
    },
  },
  {
    id: 'CONSIDERATION_PAYMENT',
    title: { gu: 'અવેજની વિગત', en: 'Consideration & Payment' },
    priority: 80,
    documentTypes: SALE,
    condition: () => true,
    renderAs: 'payment',
    template: {
      gu: 'કાર્પેટ એરિયા {{CarpetArea}} ચો.મી. અને યુનીટ પ્રોપર્ટી કાર્ડ નંબર {{UnitCard}} ની મિલકત માટે વેચાણ લેનારે નીચે મુજબ અવેજની રકમ વેચાણ આપનારને ચૂકવી છે અને વેચાણ આપનારે રકમ મળેલી સ્વીકારી કબજો સોંપ્યો છે.',
      en: 'The Buyer has paid the consideration for Unit Card {{UnitCard}} (Carpet {{CarpetArea}} sq.m.) as detailed below, and the Seller acknowledges receipt and delivers possession.',
    },
  },
  {
    id: 'RERA',
    title: { gu: '૧૮. RERA', en: '18. RERA' },
    priority: 90,
    documentTypes: SALE,
    condition: (doc) => Boolean(doc.property?.reraNumber || doc.property?.permissions?.reraNumber || doc.property?.govRecords?.rera?.registrationNo),
    template: {
      gu: '૧૮. મિલકત RERA અંતર્ગત નોંધાયેલ છે. નોંધણી નંબર: {{ReraNumber}}. પક્ષકારો વચ્ચે વિવાદ થાય તો પહેલા સમાધાન; નહીં થાય તો RERA Act, 2016 અંતર્ગત નિવારણ.',
      en: '18. The project is RERA registered under No. {{ReraNumber}}. Disputes shall first attempt settlement, else under RERA Act, 2016.',
    },
  },
  {
    id: 'COVENANTS',
    title: { gu: 'શરતો અને કરારો', en: 'Covenants' },
    priority: 100,
    documentTypes: SALE,
    condition: () => true,
    template: {
      gu: 'વેચાણ લેનાર પરિશિષ્ટમાં વર્ણવેલ મિલકતનો સંપૂર્ણ, સ્વતંત્ર માલિક બને છે. વેચાણ આપનાર ખાતરી આપે છે કે મિલકત તેના સ્પષ્ટ હક્ક અને કબજા હેઠળ છે. કોમન એરિયા/ટેરેસના હક્કો એસોસિએશન/સોસાયટી પાસે રહેશે. Stamp Duty, registration charges અને writing fees વેચાણ લેનારના ખર્ચે રહેશે. આજે પ્રત્યક્ષ કબજો વેચાણ લેનારને સોંપવામાં આવ્યો છે.',
      en: 'The Buyer becomes absolute owner of the scheduled property. Seller warrants clear title and possession. Common areas vest with the association. Stamp duty and registration charges are borne by the Buyer. Vacant possession is delivered today.',
    },
  },
  {
    id: 'PARISHISHTA',
    title: { gu: 'પરિશિષ્ટ', en: 'Schedule' },
    priority: 110,
    documentTypes: SALE,
    condition: () => true,
    template: {
      gu: 'વેચાણ આપવા નક્કી કરેલ મિલકતની વિગત :- જિલ્લા-{{District}}, તાલુકા-{{Taluka}}, મોજે-{{Moje}} ની રે.સર્વે નં. {{SurveyNo}}, સીટી સર્વે નંબર {{CitySurveyNo}} પર આવેલ "{{ComplexName}}" માં નંબર {{UnitNo}} ની મિલકત, કાર્પેટ એરિયા {{CarpetArea}} ચો.મી., યુનીટ કાર્ડ {{UnitCard}}, વરાડા {{VerandaArea}} ચો.મી. સહિત.',
      en: 'Schedule: Unit {{UnitNo}} in "{{ComplexName}}" at {{Village}}, Survey {{SurveyNo}}, Carpet {{CarpetArea}} sq.m., Card {{UnitCard}}.',
    },
  },
  {
    id: 'BOUNDARIES',
    title: { gu: 'ચતુર્દિશા', en: 'Boundaries' },
    priority: 120,
    documentTypes: SALE,
    condition: () => true,
    renderAs: 'boundaries',
    template: {
      gu: 'સદર વેચાણ સાથે common ownership rights અને amenities ના usage rights સહિત થાય છે. મિલકતની ચતુર્દિશા નીચે મુજબ:',
      en: 'The sale includes proportionate common rights. Boundaries are as under:',
    },
  },
  {
    id: 'SIGNATURES',
    title: { gu: 'સહીઓ', en: 'Signatures' },
    priority: 130,
    documentTypes: SALE,
    condition: () => true,
    renderAs: 'signatures',
    template: {
      gu: 'બંને પક્ષોએ આ દસ્તાવેજ વાંચીને, સમજીને, દબાણ વગર સ્વીકાર્યું છે અને તે તેમના વારસદારો માટે બંધનકર્તા છે.',
      en: 'Both parties have read, understood and accepted this deed freely; it binds their heirs and successors.',
    },
  },
];

export default saleDeedClauses;
