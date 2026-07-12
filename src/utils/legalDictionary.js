export const legalDictionary = {
  en: {
    // UI elements
    appName: "Sale Deed (Vechan Dastavej) Generator",
    tagline: "Tailored for the legal framework of Gujarat, India",
    language: "Language",
    toggleLanguage: "ગુજરાતી",
    step: "Step",
    next: "Next",
    back: "Back",
    reset: "Reset Draft",
    loadMock: "Load Mock Data",
    downloadPdf: "Download Deed PDF",
    generatingPdf: "Generating PDF...",
    previewDeed: "Registration Ledger Preview (3D View)",
    draftStatus: "Draft Auto-Saved",
    warning: "Warning",
    error: "Error",
    previewDeedBtn: "Preview & Download Deed",
    payToUnlock: "Pay ₹999 to Unlock PDF",
    paymentSuccess: "Payment Success! PDF Unlocked.",
    mockUpi: "UPI ID",
    mockCard: "Card Number",
    authorizedPayment: "Authorize Demo Payment of ₹999",
    processingPayment: "Processing Payment...",
    unlockedDownload: "Download Official PDF",
    previewModalTitle: "Deed Draft & Service Charge Checkout",
    
    // Step Titles
    step1Title: "Party Details",
    step1Desc: "Sellers & Buyers Information",
    step2Title: "Property Coordinates",
    step2Desc: "District, Taluka & Surveys",
    step3Title: "Property Technicals",
    step3Desc: "Tenure, Areas & Boundaries",
    step4Title: "Title History",
    step4Desc: "Sequential Milestones",
    step5Title: "Transaction Details",
    step5Desc: "Sale Consideration & Payments",

    // Step 1: Parties
    sellers: "Sellers (First Party / Vendor)",
    buyers: "Buyers (Second Party / Vendee)",
    addSeller: "Add Seller",
    addBuyer: "Add Buyer",
    fullName: "Full Name",
    age: "Age",
    occupation: "Occupation",
    pan: "PAN",
    aadhaar: "Aadhaar",
    address: "Full Address",
    years: "years",

    // Step 2: Property Identification
    district: "District",
    taluka: "Taluka",
    sro: "Sub-Registrar Office Jurisdiction",
    village: "Village",
    blockNo: "Block / Survey Number",
    citySurveyNo: "New City Survey Number",
    tpFpNo: "TP/FP Number (Town Planning / Final Plot)",

    // Step 3: Technicals
    tenureType: "Land Tenure Type",
    oldTenure: "Old Tenure / જૂની શરત",
    newTenure: "New Tenure / નવી શરત",
    collectorPermission: "Collector Permission Details (Mandatory for New Tenure)",
    orderNo: "Permission Order Number",
    orderDate: "Permission Order Date",
    isBuiltUp: "Is the property built-up? (Has Construction)",
    naOrder: "Non-Agricultural (NA) Order (Gujarat Land Revenue Code)",
    naOrderNo: "NA Order Number",
    naOrderDate: "NA Order Date",
    totalPlotArea: "Total Plot Area (Sq. Mtr.)",
    constructionArea: "Construction Area (Sq. Mtr.)",
    carpetArea: "Carpet Area (Sq. Mtr.)",
    boundaries: "Directional Boundaries",
    east: "East (પૂર્વ)",
    west: "West (પશ્ચિમ)",
    north: "North (ઉત્તર)",
    south: "South (દક્ષિણ)",

    // Step 4: History
    titleHistoryTitle: "Land Title History (Chain of Deeds)",
    addMilestone: "Add Title Milestone",
    milestoneEntryNo: "Entry/Reference No.",
    milestoneDate: "Date of Entry",
    milestoneDesc: "Description / Type of Entry (e.g. Succession/વારસાઈ, NA Conversion)",
    noHistory: "No history milestones added. Click button to add.",

    // Step 5: Transaction
    transactionTitle: "Transaction & Payment Breakdown",
    totalSaleAmount: "Total Sale Amount (INR)",
    paymentMode: "Primary Payment Mode",
    paymentTableTitle: "Payment Transaction Details (Installments / Breakdown)",
    addPayment: "Add Payment Entry",
    paymentModeCol: "Mode",
    bankNameCol: "Bank Name",
    instrumentNoCol: "UTR / Instrument Number",
    paymentDateCol: "Transaction Date",
    amountCol: "Amount (INR)",
    stampDutyTitle: "Stamp Duty & Registration Fees Receipts",
    stampDutyReceipt: "Stamp Duty E-Receipt Number",
    stampDutyAmt: "Stamp Duty Amount Paid (INR)",
    regFeeReceipt: "Registration Fee E-Receipt Number",
    regFeeAmt: "Registration Fee Amount Paid (INR)",
    
    // Validation messages
    panInvalid: "PAN must match standard format: ABCDE1234F",
    aadhaarInvalid: "Aadhaar must be 12 digits (with spaces or continuous)",
    fieldRequired: "This field is required",
    numericOnly: "Must be a numeric value",
    validDate: "Must be a valid date",
    fillAllFields: "Please correct errors and fill all required fields before proceeding."
  },
  
  gu: {
    // UI elements
    appName: "વેચાણ દસ્તાવેજ (Sale Deed) જનરેટર",
    tagline: "ગુજરાત રાજ્યના કાયદાકીય માળખા અનુસાર તૈયાર કરેલ",
    language: "ભાષા",
    toggleLanguage: "English",
    step: "તબક્કો",
    next: "આગળ",
    back: "પાછળ",
    reset: "ડ્રાફ્ટ સાફ કરો",
    loadMock: "નમૂનાનો ડેટા ભરો",
    downloadPdf: "પીડીએફ ડાઉનલોડ કરો",
    generatingPdf: "પીડીએફ જનરેટ થઈ રહી છે...",
    previewDeed: "નોંધણી રજીસ્ટર પ્રિવ્યુ (3D વ્યુ)",
    draftStatus: "ડ્રાફ્ટ સેવ થયેલ છે",
    warning: "ચેતવણી",
    error: "ભૂલ",
    previewDeedBtn: "પ્રિવ્યુ અને ડાઉનલોડ કરો",
    payToUnlock: "પીડીએફ અનલોક કરવા ₹૯૯૯ ચૂકવો",
    paymentSuccess: "ચુકવણી સફળ! પીડીએફ અનલોક થયેલ છે.",
    mockUpi: "UPI ID",
    mockCard: "કાર્ડ નંબર",
    authorizedPayment: "₹૯૯૯ ની ડેમો ચુકવણી મંજૂર કરો",
    processingPayment: "ચુકવણી પ્રક્રિયા ચાલુ છે...",
    unlockedDownload: "સત્તાવાર પીડીએફ ડાઉનલોડ કરો",
    previewModalTitle: "દસ્તાવેજ મુસદ્દો અને સર્વિસ ચાર્જ ચેકઆઉટ",
    
    // Step Titles
    step1Title: "પક્ષકારોની વિગત",
    step1Desc: "વેચનાર અને ખરીદનારની માહિતી",
    step2Title: "મિલકતની ઓળખ",
    step2Desc: "જિલ્લો, તાલુકો અને સર્વે નંબર",
    step3Title: "ટેકનિકલ વિગતો",
    step3Desc: "શરતો, ક્ષેત્રફળ અને ચતુર્દિશા",
    step4Title: "માલિકીનો ઇતિહાસ",
    step4Desc: "ક્રોનોલોજીકલ ટાઇટલ ટ્રેકર",
    step5Title: "વહેવાર અને અવેજ",
    step5Desc: "કુલ કિંમત અને ચુકવણીની વિગતો",

    // Step 1: Parties
    sellers: "વેચાણ આપનાર પ્રથમ પક્ષકાર (Seller / Vendor)",
    buyers: "વેચાણ રાખનાર બીજા પક્ષકાર (Buyer / Vendee)",
    addSeller: "વેચનાર ઉમેરો",
    addBuyer: "ખરીદનાર ઉમેરો",
    fullName: "પૂરું નામ",
    age: "ઉંમર",
    occupation: "ધંધો/વ્યવસાય",
    pan: "પાન નંબર (PAN)",
    aadhaar: "આધાર નંબર",
    address: "સરનામું",
    years: "વર્ષ",

    // Step 2: Property Identification
    district: "જિલ્લો",
    taluka: "તાલુકો",
    sro: "સબ-રજીસ્ટ્રાર કચેરીનું કાર્યક્ષેત્ર",
    village: "ગામ",
    blockNo: "બ્લોક / સર્વે નંબર",
    citySurveyNo: "નવો સીટી સર્વે નંબર",
    tpFpNo: "ટી.પી. / એફ.પી. નંબર",

    // Step 3: Technicals
    tenureType: "જમીનની શરત",
    oldTenure: "જૂની શરત (Old Tenure)",
    newTenure: "નવી શરત (New Tenure)",
    collectorPermission: "કલેક્ટર પરવાનગીની વિગતો (નવી શરત માટે ફરજિયાત)",
    orderNo: "પરવાનગી હુકમ નંબર",
    orderDate: "પરવાનગી હુકમ તારીખ",
    isBuiltUp: "શું મિલકત બાંધકામ વાળી છે?",
    naOrder: "બિનખેતી (NA) હુકમની વિગતો (ગુજરાત લેન્ડ રેવન્યુ કોડ)",
    naOrderNo: "NA હુકમ નંબર",
    naOrderDate: "NA હુકમ તારીખ",
    totalPlotArea: "કુલ પ્લોટ ક્ષેત્રફળ (ચો.મી.)",
    constructionArea: "બાંધકામ ક્ષેત્રફળ (ચો.મી.)",
    carpetArea: "કાર્પેટ ક્ષેત્રફળ (ચો.મી.)",
    boundaries: "ચતુર્દિશા સીમાઓ",
    east: "પૂર્વ (East)",
    west: "પશ્ચિમ (West)",
    north: "ઉત્તર (North)",
    south: "દક્ષિણ (South)",

    // Step 4: History
    titleHistoryTitle: "મિલકત માલિકીનો ઇતિહાસ (હિસ્ટ્રી ટ્રેકર)",
    addMilestone: "માઇલસ્ટોન ઉમેરો",
    milestoneEntryNo: "નોંધણી / સંદર્ભ નંબર",
    milestoneDate: "નોંધણીની તારીખ",
    milestoneDesc: "નોંધણીનો પ્રકાર / વિગત (દા.ત. વારસાઈ/Succession, બિનખેતી)",
    noHistory: "કોઈ ઇતિહાસની વિગત ઉમેરેલ નથી. ઉમેરવા માટે બટન દબાવો.",

    // Step 5: Transaction
    transactionTitle: "વહેવાર અવેજ અને ચુકવણી વિગત",
    totalSaleAmount: "કુલ અવેજ રકમ (INR)",
    paymentMode: "ચુકવણીનો મુખ્ય પ્રકાર",
    paymentTableTitle: "ચુકવણીના હપ્તાઓની વિગતવાર કોષ્ટક",
    addPayment: "ટ્રાન્ઝેક્શન વિગત ઉમેરો",
    paymentModeCol: "પ્રકાર",
    bankNameCol: "બેંકનું નામ",
    instrumentNoCol: "UTR / ઇન્સ્ટ્રુમેન્ટ નંબર",
    paymentDateCol: "ચુકવણીની તારીખ",
    amountCol: "રકમ (INR)",
    stampDutyTitle: "સ્ટેમ્પ ડ્યુટી અને રજીસ્ટ્રેશન ફી પાવતી વિગતો",
    stampDutyReceipt: "સ્ટેમ્પ ડ્યુટી ઈ-પાવતી નંબર",
    stampDutyAmt: "ભરેલ સ્ટેમ્પ ડ્યુટી (INR)",
    regFeeReceipt: "રજીસ્ટ્રેશન ફી ઈ-પાવતી નંબર",
    regFeeAmt: "ભરેલ રજીસ્ટ્રેશન ફી (INR)",
    
    // Validation messages
    panInvalid: "પાન કાર્ડનો ફોર્મેટ ખોટો છે: ABCDE1234F",
    aadhaarInvalid: "આધાર કાર્ડ ૧૨ આંકડાનો હોવો જોઈએ (સ્પેસ સાથે અથવા સળંગ)",
    fieldRequired: "આ વિગત ભરવી ફરજિયાત છે",
    numericOnly: "ફક્ત આંકડાકીય કિંમત લખો",
    validDate: "સાચી તારીખ પસંદ કરો",
    fillAllFields: "કૃપા કરીને ભૂલો સુધારો અને આગળ વધતા પહેલા તમામ વિગતો ભરો."
  }
};

export const legalTranslationDictionary = {
  deedTitle: {
    en: "SALE DEED",
    gu: "વેચાણ દસ્તાવેજ"
  },
  partiesPreamble: {
    en: "This Deed of Sale is executed at the Sub-Registrar Office, Gujarat state, on this day as under:",
    gu: "આ વેચાણ દસ્તાવેજ આજ રોજ ગુજરાત રાજ્યના સબ-રજીસ્ટ્રાર કચેરી સમક્ષ નીચે દર્શાવેલ વિગતે કરી આપેલ છે:"
  },
  firstParty: {
    en: "First Party / Vendor (Sellers)",
    gu: "પ્રથમ પક્ષકાર / વેચનાર (વેચાણ આપનાર)"
  },
  secondParty: {
    en: "Second Party / Vendee (Buyers)",
    gu: "બીજા પક્ષકાર / ખરીદનાર (વેચાણ રાખનાર)"
  },
  propertyDescription: {
    en: "Description of the Schedule Property",
    gu: "વેચાણ આપેલ સ્થાવર મિલકતનું વર્ણન"
  },
  paymentRecital: {
    en: "Acknowledgment of Sale Consideration Payment",
    gu: "અવેજ રકમની ચુકવણી અને સ્વીકૃતિ"
  },
  tenureClauseOld: {
    en: "The scheduled property is of Old Tenure (જૂની શરત) land and holds unrestricted transfer rights.",
    gu: "સદરહું મિલકત જૂની શરતની જમીન છે અને તેના પર કોઈ પણ હસ્તાંતરણ પ્રતિબંધો નથી."
  },
  tenureClauseNew: {
    en: "The scheduled property is of New Tenure (નવી શરત) land. The Vendor declares that prior written permission of the District Collector has been obtained via Order Number: {orderNo} dated: {orderDate}, and all associated premium charges have been duly settled.",
    gu: "સદરહું મિલકત નવી શરતની જમીન છે. વેચાણ આપનાર જાહેર કરે છે કે સદરહું વેચાણ માટે સક્ષમ અધિકારીશ્રી કલેક્ટર સાહેબની પૂર્વ પરવાનગી મેળવેલ છે જેનો હુકમ નંબર: {orderNo} તારીખ: {orderDate} છે, અને તે અન્વયે સરકારશ્રીમાં પ્રીમિયમની રકમ સંપૂર્ણપણે ભરપાઈ કરેલ છે."
  },
  naClause: {
    en: "The scheduled property is a built-up non-agricultural property, conversion order of which has been granted under Section 65 of the Gujarat Land Revenue Code, 1879, bearing NA Order Number: {naOrderNo} dated: {naOrderDate}.",
    gu: "સદરહું મિલકત બિનખેતી થયેલ મિલકત છે, જેનો ગુજરાત જમીન મહેસૂલ કાયદાની કલમ-૬૫ હેઠળનો નોન-એગ્રીકલ્ચરલ (NA) હુકમ નંબર: {naOrderNo} તારીખ: {naOrderDate} અન્વયે મેળવેલ છે."
  },
  transferTitleClause: {
    en: "The Vendor hereby transfers, conveys, and sells all rights, titles, interests, easements, and claims of the schedule property to the Vendee forever.",
    gu: "આ દસ્તાવેજથી વેચાણ આપનાર સદરહું મિલકતમાં પોતાના તમામ માલિકી હક્કો, લાયકાતો, હિતો, અને સુખાધિકારના હક્કો વેચાણ રાખનારને કાયમ માટે તબદીલ અને વેચાણ કરે છે."
  },
  indemnityClause: {
    en: "The Vendor covenants that the schedule property is free from all encumbrances, charges, liens, mortgages, and litigation. If any dispute arises, the Vendor shall indemnify the Vendee from all costs and damages.",
    gu: "વેચાણ આપનાર બાહેંધરી આપે છે કે સદરહું મિલકત તમામ પ્રકારના બોજા, ગીરો, કે કોર્ટ વિવાદથી મુક્ત છે. જો ભવિષ્યમાં કોઈ વિવાદ ઊભો થશે, તો તેની જવાબદારી વેચાણ આપનાર પક્ષકારની રહેશે અને તે ખરીદનારને નુકસાન વળતર ચૂકવવા બંધાયેલ રહેશે."
  },
  executionWitnessClause: {
    en: "In witness whereof, the Vendor and Vendee have set their signatures on this Sale Deed in the presence of following witnesses.",
    gu: "જેની સાબિતી રૂપે વેચાણ આપનાર અને વેચાણ રાખનારે સાક્ષીઓની હાજરીમાં આ દસ્તાવેજ પર સહીઓ કરેલ છે."
  }
};
