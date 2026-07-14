import { createEmptyInstrument, getDocumentRequirements } from '../constants/documentTypeRequirements';
import { defaultCompliance } from '../utils/sroRequirements';

/** Shared commercial NA plot used across mocks (Jetpur / Rajkot). */
function propertyBase(locale) {
  if (locale === 'gu') {
    return {
      propertyType: 'commercial',
      district: 'રાજકોટ',
      taluka: 'જેતપુર',
      subRegistrarOffice: 'જેતપુર-૧ (રાજકોટ)',
      village: 'જેતપુર',
      moje: 'જેતપુર',
      blockSurveyNo: '૩૦૫/પૈકી ૨',
      oldSurveyNo: 'જુનો રેવન્યુ સર્વે ૧૨૪',
      newCitySurveyNo: 'સીએસ-૪૮૨૯',
      tpFpNo: 'ટી.પી. નં. ૩, એફ.પી.-૨૪',
      tenureType: 'new_tenure',
      collectorPermissionOrderNo: 'REV/COL/PERM/8274/2026',
      collectorPermissionDate: '2026-03-15',
      isBuiltUp: true,
      naOrderNo: 'NA/LAND/ORDER/4910/2026',
      naOrderDate: '2026-04-20',
      totalPlotArea: '250',
      constructionArea: '180',
      carpetArea: '155',
      complexName: 'શ્રીનાથ કોમર્શિયલ કોમ્પ્લેક્સ',
      siteName: 'શ્રીનાથ કોમર્શિયલ કોમ્પ્લેક્સ',
      tower: 'ટાવર અ',
      floor: '૨',
      unitNumber: '૨૦૨',
      unitCardNo: 'A/01/02/202',
      unitType: 'flat',
      verandaArea: '135.00',
      reraNumber: 'PR/GJ/RAJKOT/JETPUR/Others/MAA11966/190623',
      parkingType: 'કવર્ડ',
      parkingSlots: '૧૨',
      parkingArea: '12.50',
      latitude: '22.3039',
      longitude: '70.8022',
      associationName: 'શ્રીનાથ કોમર્શિયલ કોમ્પ્લેક્સ',
      boundaries: {
        east: '૭.૫ મીટર પહોળાઈનો સામાન્ય સોસાયટી રોડ',
        west: 'રમેશભાઈ પટેલની માલિકીનો પ્લોટ નં. ૪૫',
        south: 'શાંતિ નિવાસ સબ-પ્લોટ ૪૬/બી',
        north: 'સર્વે બ્લોક ૩૦૬ ખેતીવાડી સીમા',
      },
      jantriValue: '4200000',
      revenueRecords: {
        extract712No: '712/JTP/305-P2/2026',
        extract712Date: '2026-06-15',
        khata8ANo: '8A/KH/4829/2026',
        mutationEntryNo: 'MUT/1845/2026',
        mutationDate: '2026-04-25',
        propertyCardNo: 'PC/JTP/305/2026',
        encumbranceCertNo: 'EC/JTP/305/2026',
        encumbranceCertDate: '2026-06-01',
      },
      photos: { sitePhoto: '', boundaryPhoto: '', structurePhoto: '' },
    };
  }
  return {
    propertyType: 'commercial',
    district: 'Rajkot',
    taluka: 'Jetpur',
    subRegistrarOffice: 'Jetpur-1 (Rajkot)',
    village: 'Jetpur',
    moje: 'Jetpur',
    blockSurveyNo: '305/p2',
    oldSurveyNo: 'Old Revenue Survey 124',
    newCitySurveyNo: 'CS-4829',
    tpFpNo: 'TP No. 3, FP-24',
    tenureType: 'new_tenure',
    collectorPermissionOrderNo: 'REV/COL/PERM/8274/2026',
    collectorPermissionDate: '2026-03-15',
    isBuiltUp: true,
    naOrderNo: 'NA/LAND/ORDER/4910/2026',
    naOrderDate: '2026-04-20',
    totalPlotArea: '250',
    constructionArea: '180',
    carpetArea: '155',
    complexName: 'Shrinath Commercial Complex',
    siteName: 'Shrinath Commercial Complex',
    tower: 'Tower A',
    floor: '2',
    unitNumber: '202',
    unitCardNo: 'A/01/02/202',
    unitType: 'flat',
    verandaArea: '135.00',
    reraNumber: 'PR/GJ/RAJKOT/JETPUR/Others/MAA11966/190623',
    parkingType: 'Covered',
    parkingSlots: '12',
    parkingArea: '12.50',
    latitude: '22.3039',
    longitude: '70.8022',
    associationName: 'Shrinath Commercial Complex',
    boundaries: {
      east: 'Common internal society road of 7.5 meters width',
      west: 'Adjoining Plot Number 45 owned by Rameshbhai Patel',
      south: 'Sub-plot 46/B and boundary wall of Shanti Niwas',
      north: 'Adjoining Survey Block Number 306 agricultural zone boundary',
    },
    jantriValue: '4200000',
    revenueRecords: {
      extract712No: '712/JTP/305-P2/2026',
      extract712Date: '2026-06-15',
      khata8ANo: '8A/KH/4829/2026',
      mutationEntryNo: 'MUT/1845/2026',
      mutationDate: '2026-04-25',
      propertyCardNo: 'PC/JTP/305/2026',
      encumbranceCertNo: 'EC/JTP/305/2026',
      encumbranceCertDate: '2026-06-01',
    },
    photos: { sitePhoto: '', boundaryPhoto: '', structurePhoto: '' },
  };
}

function party(locale, kind) {
  const en = {
    corpSeller: {
      name: 'GIDC Infrastructure Developers Private Limited',
      age: '', occupation: '', pan: 'AAACG4810M', aadhaar: '',
      address: 'Plot 42, GIDC Industrial Estate, Sector-11, Gandhinagar, Gujarat - 382011',
      isCorporate: true, partyType: 'company', companyCin: 'U45203GJ2018PTC104829',
      registeredOffice: 'Plot 42, GIDC Industrial Estate, Sector-11, Gandhinagar, Gujarat - 382011',
      authorisedSignatory: 'Kiritbhai Dahyabhai Patel (Managing Director)',
      signatoryAge: '52', signatoryOccupation: 'Business', signatoryReligion: 'Hindu',
      boardResolutionDate: '2026-06-10', mobile: '9876543210', email: 'accounts@gidcinfra.com', photo: '',
    },
    individualSeller: {
      name: 'Kiritbhai Dahyabhai Patel', age: '52', occupation: 'Business', religion: 'Hindu',
      pan: 'ABCKP4521H', aadhaar: '4821 7390 5610',
      address: '12, Station Road, Near Bus Stand, Jetpur, Rajkot, Gujarat - 360370',
      isCorporate: false, partyType: 'individual', companyCin: '', registeredOffice: '',
      authorisedSignatory: '', boardResolutionDate: '', mobile: '9876543210', email: 'kirit.patel@email.com', photo: '',
    },
    individualBuyer: {
      name: 'Arvindbhai Kanjibhai Shah', age: '45', occupation: 'Business', religion: 'Hindu',
      pan: 'VWXYZ9876G', aadhaar: '7462 8193 9012',
      address: 'B-402, Shrinath Apartments, Near Swaminarayan Temple, Kalawad Road, Rajkot, Gujarat - 360005',
      isCorporate: false, partyType: 'individual', companyCin: '', registeredOffice: '',
      authorisedSignatory: '', boardResolutionDate: '', mobile: '9825123456', email: 'arvind.shah@gmail.com', photo: '',
    },
    donor: {
      name: 'Rameshbhai Somabhai Patel', age: '68', occupation: 'Retired', religion: 'Hindu',
      pan: 'ABCRP1234D', aadhaar: '4123 5678 9012',
      address: '12, Station Road, Jetpur, Rajkot - 360370',
      isCorporate: false, partyType: 'individual', mobile: '9876011111', email: 'ramesh.patel@email.com', photo: '',
    },
    donee: {
      name: 'Jayeshbhai Rameshbhai Patel', age: '36', occupation: 'Engineer', religion: 'Hindu',
      pan: 'BCDJP5678E', aadhaar: '5234 6789 0123',
      address: '12, Station Road, Jetpur, Rajkot - 360370',
      isCorporate: false, partyType: 'individual', mobile: '9876022222', email: 'jayesh.patel@email.com', photo: '',
    },
    mortgagor: {
      name: 'Arvindbhai Kanjibhai Shah', age: '45', occupation: 'Business', religion: 'Hindu',
      pan: 'VWXYZ9876G', aadhaar: '7462 8193 9012',
      address: 'B-402, Shrinath Apartments, Kalawad Road, Rajkot - 360005',
      isCorporate: false, partyType: 'individual', mobile: '9825123456', email: 'arvind.shah@gmail.com', photo: '',
    },
    mortgagee: {
      name: 'State Bank of India', age: '', occupation: '', pan: 'AAACS8577K', aadhaar: '',
      address: 'Local Head Office, Ahmedabad, Gujarat',
      isCorporate: true, partyType: 'company', companyCin: 'U99999MH1955GOI000794',
      registeredOffice: 'State Bank Bhavan, Madame Cama Road, Mumbai',
      authorisedSignatory: 'Branch Manager, Jetpur Branch',
      boardResolutionDate: '2026-05-01', mobile: '9876500001', email: 'sbi.jetpur@sbi.co.in', photo: '',
    },
    lessor: {
      name: 'Nitaben Jayeshbhai Shah', age: '42', occupation: 'Homemaker', religion: 'Hindu',
      pan: 'XYZNS5678F', aadhaar: '5932 8410 6732',
      address: '45, Gandhi Chowk, Rajkot - 360001',
      isCorporate: false, partyType: 'individual', mobile: '9825098765', email: 'nita.shah@email.com', photo: '',
    },
    lessee: {
      name: 'Mehulbhai Dineshbhai Joshi', age: '38', occupation: 'Advocate', religion: 'Hindu',
      pan: 'ABCMJ9012G', aadhaar: '6123 4567 8901',
      address: '18, Court Road, Rajkot - 360001',
      isCorporate: false, partyType: 'individual', mobile: '9898012345', email: 'mehul.joshi@email.com', photo: '',
    },
    coOwner1: {
      name: 'Prakashbhai Manilal Desai', age: '55', occupation: 'Business', religion: 'Hindu',
      pan: 'ABCPD1234E', aadhaar: '4821 7390 5621',
      address: '12, Station Road, Jetpur - 360370',
      isCorporate: false, partyType: 'individual', mobile: '9876012345', email: 'prakash.desai@email.com', photo: '',
    },
    coOwner2: {
      name: 'Sureshbhai Manilal Desai', age: '52', occupation: 'Farmer', religion: 'Hindu',
      pan: 'BCGSD2345F', aadhaar: '4821 7390 5622',
      address: '14, Station Road, Jetpur - 360370',
      isCorporate: false, partyType: 'individual', mobile: '9876012346', email: 'suresh.desai@email.com', photo: '',
    },
    testator: {
      name: 'Rameshbhai Somabhai Patel', age: '68', occupation: 'Retired', religion: 'Hindu',
      pan: 'ABCRP1234D', aadhaar: '4123 5678 9012',
      address: '12, Station Road, Jetpur, Rajkot - 360370',
      isCorporate: false, partyType: 'individual', mobile: '9876011111', email: 'ramesh.patel@email.com', photo: '',
    },
    beneficiary: {
      name: 'Jayeshbhai Rameshbhai Patel', age: '36', occupation: 'Engineer', religion: 'Hindu',
      pan: 'BCDJP5678E', aadhaar: '5234 6789 0123',
      address: '12, Station Road, Jetpur, Rajkot - 360370',
      isCorporate: false, partyType: 'individual', mobile: '9876022222', email: 'jayesh.patel@email.com', photo: '',
    },
    principal: {
      name: 'Arvindbhai Kanjibhai Shah', age: '45', occupation: 'Business', religion: 'Hindu',
      pan: 'VWXYZ9876G', aadhaar: '7462 8193 9012',
      address: 'B-402, Shrinath Apartments, Rajkot - 360005',
      isCorporate: false, partyType: 'individual', mobile: '9825123456', email: 'arvind.shah@gmail.com', photo: '',
    },
    attorney: {
      name: 'Adv. Mehulbhai Joshi', age: '48', occupation: 'Advocate', religion: 'Hindu',
      pan: 'ABCMJ9012G', aadhaar: '6123 4567 8901',
      address: '18, Court Road, Rajkot - 360001',
      isCorporate: false, partyType: 'individual', mobile: '9898012345', email: 'mehul.joshi@email.com', photo: '',
    },
    developer: {
      name: 'Shrinath Buildcon Private Limited', age: '', occupation: '', pan: 'AABCS1234A', aadhaar: '',
      address: 'Office 5, Kalawad Road, Rajkot - 360005',
      isCorporate: true, partyType: 'company', companyCin: 'U45200GJ2015PTC084521',
      registeredOffice: 'Office 5, Kalawad Road, Rajkot - 360005',
      authorisedSignatory: 'Hiteshbhai Patel (Director)',
      boardResolutionDate: '2026-04-01', mobile: '9876555555', email: 'info@shrinathbuild.com', photo: '',
    },
  };

  const gu = {
    corpSeller: {
      ...en.corpSeller,
      name: 'જી.આઈ.ડી.સી. ઇન્ફ્રાસ્ટ્રક્ચર ડેવલોપર્સ પ્રાઇવેટ લિમિટેડ',
      address: 'પ્લોટ ૪૨, જી.આઈ.ડી.સી. ઇન્ડસ્ટ્રીયલ એસ્ટેટ, સેક્ટર-૧૧, ગાંધીનગર, ગુજરાત - ૩૮૨૦૧૧',
      registeredOffice: 'પ્લોટ ૪૨, જી.આઈ.ડી.સી. ઇન્ડસ્ટ્રીયલ એસ્ટેટ, સેક્ટર-૧૧, ગાંધીનગર, ગુજરાત - ૩૮૨૦૧૧',
      authorisedSignatory: 'કિરીટભાઈ ડાહ્યાભાઈ પટેલ (મેનેજિંગ ડિરેક્ટર)',
      signatoryOccupation: 'વ્યવસાય', signatoryReligion: 'હિન્દુ',
    },
    individualSeller: {
      ...en.individualSeller,
      name: 'કિરીટભાઈ ડાહ્યાભાઈ પટેલ', age: '52', occupation: 'વ્યવસાય', religion: 'હિન્દુ',
      address: '૧૨, સ્ટેશન રોડ, બસ સ્ટેન્ડ પાસે, જેતપુર, રાજકોટ, ગુજરાત - ૩૬૦૩૭૦',
    },
    individualBuyer: {
      ...en.individualBuyer,
      name: 'અરવિંદભાઈ કાનજીભાઈ શાહ', age: '45', occupation: 'વ્યવસાય', religion: 'હિન્દુ',
      address: 'બી-૪૦૨, શ્રીનાથ એપાર્ટમેન્ટ્સ, સ્વામિનારાયણ મંદિર પાસે, કાલાવડ રોડ, રાજકોટ, ગુજરાત - ૩૬૦૦૦૫',
    },
    donor: {
      ...en.donor,
      name: 'રમેશભાઈ સોમાભાઈ પટેલ', age: '68', occupation: 'નિવૃત્ત', religion: 'હિન્દુ',
      address: '૧૨, સ્ટેશન રોડ, જેતપુર, રાજકોટ - ૩૬૦૩૭૦',
    },
    donee: {
      ...en.donee,
      name: 'જયેશભાઈ રમેશભાઈ પટેલ', age: '36', occupation: 'ઈજનેર', religion: 'હિન્દુ',
      address: '૧૨, સ્ટેશન રોડ, જેતપુર, રાજકોટ - ૩૬૦૩૭૦',
    },
    mortgagor: {
      ...en.mortgagor,
      name: 'અરવિંદભાઈ કાનજીભાઈ શાહ', age: '45', occupation: 'વ્યવસાય',
      address: 'બી-૪૦૨, શ્રીનાથ એપાર્ટમેન્ટ્સ, કાલાવડ રોડ, રાજકોટ - ૩૬૦૦૦૫',
    },
    mortgagee: {
      ...en.mortgagee,
      name: 'સ્ટેટ બેંક ઓફ ઈન્ડિયા',
      address: 'લોકલ હેડ ઓફિસ, અમદાવાદ, ગુજરાત',
      authorisedSignatory: 'બ્રાન્ચ મેનેજર, જેતપુર શાખા',
    },
    lessor: {
      ...en.lessor,
      name: 'નીતાબેન જયેશભાઈ શાહ', age: '42', occupation: 'ગૃહિણી',
      address: '૪૫, ગાંધી ચોક, રાજકોટ - ૩૬૦૦૦૧',
    },
    lessee: {
      ...en.lessee,
      name: 'મેહુલભાઈ દિનેશભાઈ જોશી', age: '38', occupation: 'વકીલ',
      address: '૧૮, કોર્ટ રોડ, રાજકોટ - ૩૬૦૦૦૧',
    },
    coOwner1: {
      ...en.coOwner1,
      name: 'પ્રકાશભાઈ મણિલાલ દેસાઈ', age: '55', occupation: 'વ્યવસાય',
      address: '૧૨, સ્ટેશન રોડ, જેતપુર - ૩૬૦૩૭૦',
    },
    coOwner2: {
      ...en.coOwner2,
      name: 'સુરેશભાઈ મણિલાલ દેસાઈ', age: '52', occupation: 'ખેડૂત',
      address: '૧૪, સ્ટેશન રોડ, જેતપુર - ૩૬૦૩૭૦',
    },
    testator: {
      ...en.testator,
      name: 'રમેશભાઈ સોમાભાઈ પટેલ', age: '68', occupation: 'નિવૃત્ત',
      address: '૧૨, સ્ટેશન રોડ, જેતપુર, રાજકોટ - ૩૬૦૩૭૦',
    },
    beneficiary: {
      ...en.beneficiary,
      name: 'જયેશભાઈ રમેશભાઈ પટેલ', age: '36', occupation: 'ઈજનેર',
      address: '૧૨, સ્ટેશન રોડ, જેતપુર, રાજકોટ - ૩૬૦૩૭૦',
    },
    principal: {
      ...en.principal,
      name: 'અરવિંદભાઈ કાનજીભાઈ શાહ', age: '45', occupation: 'વ્યવસાય',
      address: 'બી-૪૦૨, શ્રીનાથ એપાર્ટમેન્ટ્સ, રાજકોટ - ૩૬૦૦૦૫',
    },
    attorney: {
      ...en.attorney,
      name: 'એડવો. મેહુલભાઈ જોશી', age: '48', occupation: 'વકીલ',
      address: '૧૮, કોર્ટ રોડ, રાજકોટ - ૩૬૦૦૦૧',
    },
    developer: {
      ...en.developer,
      name: 'શ્રીનાથ બિલ્ડકોન પ્રાઇવેટ લિમિટેડ',
      address: 'ઓફિસ ૫, કાલાવડ રોડ, રાજકોટ - ૩૬૦૦૦૫',
      registeredOffice: 'ઓફિસ ૫, કાલાવડ રોડ, રાજકોટ - ૩૬૦૦૦૫',
      authorisedSignatory: 'હિતેશભાઈ પટેલ (ડિરેક્ટર)',
    },
  };

  const bag = locale === 'gu' ? gu : en;
  return { ...bag[kind] };
}

function witnesses(locale) {
  if (locale === 'gu') {
    return [
      { name: 'પ્રકાશભાઈ મણિલાલ દેસાઈ', address: '૧૨, સ્ટેશન રોડ, જેતપુર, રાજકોટ - ૩૬૦૩૭૦', aadhaar: '4821 7390 5621', pan: 'ABCPD1234E', mobile: '9876012345', photo: '' },
      { name: 'નીતાબેન જયેશભાઈ શાહ', address: '૪૫, ગાંધી ચોક, રાજકોટ - ૩૬૦૦૦૧', aadhaar: '5932 8410 6732', pan: 'XYZNS5678F', mobile: '9825098765', photo: '' },
    ];
  }
  return [
    { name: 'Prakashbhai Manilal Desai', address: '12, Station Road, Jetpur, Rajkot - 360370', aadhaar: '4821 7390 5621', pan: 'ABCPD1234E', mobile: '9876012345', photo: '' },
    { name: 'Nitaben Jayeshbhai Shah', address: '45, Gandhi Chowk, Rajkot - 360001', aadhaar: '5932 8410 6732', pan: 'XYZNS5678F', mobile: '9825098765', photo: '' },
  ];
}

function identifier(locale) {
  if (locale === 'gu') {
    return { name: 'એડવો. મેહુલભાઈ જોશી', aadhaar: '6123 4567 8901', mobile: '9898012345', relation: 'વકીલ / રજૂ કરનાર' };
  }
  return { name: 'Adv. Mehulbhai Joshi', aadhaar: '6123 4567 8901', mobile: '9898012345', relation: 'Advocate / Document Presenter' };
}

function execution(locale, requireGarvi) {
  const place = locale === 'gu' ? 'સબ-રજિસ્ટ્રાર ઓફિસ, જેતપુર-૧ (રાજકોટ)' : 'Sub-Registrar Office, Jetpur-1 (Rajkot)';
  return {
    executionDate: '2026-07-10',
    executionPlace: place,
    possessionDate: '2026-07-10',
    possessionType: 'immediate',
    garviApplicationNo: requireGarvi ? 'GARVI-2026-JTP-482910' : '',
    documentSerialNo: '',
    garviAppointmentDate: requireGarvi ? '2026-07-10' : '',
    garviAppointmentSlot: requireGarvi ? '11:00 AM - 11:15 AM' : '',
    presentingPartyMobile: '9825123456',
    presentingPartyEmail: 'arvind.shah@gmail.com',
  };
}

function titleHistory(locale) {
  if (locale === 'gu') {
    return [
      { entryNo: '૧૪૦૨', date: '2015-08-10', description: 'સ્વર્ગસ્થ સોમાભાઈ દેવજીભાઈ પટેલના અવસાન બાદ વારસાઈ હક્ક નોંધ.' },
      { entryNo: '૧૮૪૫', date: '2026-04-20', description: 'જિલ્લા કલેક્ટર રાજકોટ દ્વારા NA વ્યવસાયિક રૂપાંતરણ હુકમ.' },
    ];
  }
  return [
    { entryNo: '1402', date: '2015-08-10', description: 'Succession entry after demise of late Somabhai Devjibhai Patel.' },
    { entryNo: '1845', date: '2026-04-20', description: 'NA conversion order by District Collector, Rajkot for commercial use.' },
  ];
}

/** Farm land mock — aligned with Original/farm_land_sale_deed.pdf sample */
function farmPropertyBase(locale) {
  if (locale === 'gu') {
    return {
      propertyType: 'agricultural',
      district: 'સાબરકાંઠા',
      taluka: 'હિંમતનગર',
      subDistrict: 'હિંમતનગર',
      subRegistrarOffice: 'હિંમતનગર',
      village: 'લોલાસણ',
      moje: 'લોલાસણ',
      khataNo: '621',
      blockSurveyNo: '504',
      oldSurveyNo: '328',
      totalAreaHeAreSqm: '1-86-73',
      soldAreaHeAreSqm: '0-37-73',
      soldDirection: 'પશ્ચિમ',
      aakar: '7.85',
      tenureType: 'old_tenure',
      totalPlotArea: '3773',
      unitType: '',
      isBuiltUp: false,
      complexName: '',
      siteName: '',
      tower: '',
      floor: '',
      unitNumber: '',
      unitCardNo: '',
      boundaries: {
        east: 'સર્વે નં. ૫૦૪ ની બાકી ખેતીલાયક જમીન',
        west: 'સર્વે નં. ૫૭ ની ખેતીલાયક જમીન',
        north: 'સર્વે નં. ૫૦૩ ની ખેતીલાયક જમીન',
        south: 'સર્વે નં. ૫૧૩ અને ૫૧૨ ની ખેતીલાયક જમીન',
      },
      jantriValue: '100000',
      revenueRecords: {
        extract712No: '712/LOL/504/2026',
        extract712Date: '2026-06-01',
        khata8ANo: '621',
        mutationEntryNo: '1845',
        mutationDate: '2026-04-25',
        propertyCardNo: '',
        encumbranceCertNo: 'EC/LOL/504/2026',
        encumbranceCertDate: '2026-06-15',
      },
      photos: { sitePhoto: '', boundaryPhoto: '', structurePhoto: '' },
    };
  }
  return {
    propertyType: 'agricultural',
    district: 'Sabarkantha',
    taluka: 'Himatnagar',
    subDistrict: 'Himatnagar',
    subRegistrarOffice: 'Himatnagar',
    village: 'Lolasna',
    moje: 'Lolasna',
    khataNo: '621',
    blockSurveyNo: '504',
    oldSurveyNo: '328',
    totalAreaHeAreSqm: '1-86-73',
    soldAreaHeAreSqm: '0-37-73',
    soldDirection: 'West',
    aakar: '7.85',
    tenureType: 'old_tenure',
    totalPlotArea: '3773',
    unitType: '',
    isBuiltUp: false,
    complexName: '',
    siteName: '',
    tower: '',
    floor: '',
    unitNumber: '',
    unitCardNo: '',
    boundaries: {
      east: 'Remaining agricultural land of Survey No. 504',
      west: 'Agricultural land of Survey No. 57',
      north: 'Agricultural land of Survey No. 503',
      south: 'Agricultural land of Survey Nos. 513 and 512',
    },
    jantriValue: '100000',
    revenueRecords: {
      extract712No: '712/LOL/504/2026',
      extract712Date: '2026-06-01',
      khata8ANo: '621',
      mutationEntryNo: '1845',
      mutationDate: '2026-04-25',
      propertyCardNo: '',
      encumbranceCertNo: 'EC/LOL/504/2026',
      encumbranceCertDate: '2026-06-15',
    },
    photos: { sitePhoto: '', boundaryPhoto: '', structurePhoto: '' },
  };
}

function farmTitleHistory(locale) {
  if (locale === 'gu') {
    return [
      {
        entryNo: '૧૨૦૧',
        date: '1998-05-12',
        description:
          'ગામ નમુના નં. ૬ મુજબ સર્વે નં. ૩૨૮ ની જમીન પટેલ પુંજીરામ પરશોત્તમભાઈના નામે નોંધાયેલ.',
      },
      {
        entryNo: '૧૫૬૦',
        date: '2010-09-18',
        description:
          'વારસાઈ / વહેંચણી નોંધથી પટેલ મુકેશભાઈ પુંજાભાઈ અને અન્યના નામે હક્ક નોંધાયો.',
      },
      {
        entryNo: '૧૮૪૫',
        date: '2026-04-25',
        description:
          'નવીન સર્વે / બ્લોક નં. ૫૦૪ (જુનો : ૩૨૮) મુજબ ખાતા નં. ૬૨૧ માં હક્ક સ્પષ્ટ થયેલ.',
      },
    ];
  }
  return [
    {
      entryNo: '1201',
      date: '1998-05-12',
      description: 'Village Form 6: Survey No. 328 recorded in name of Patel Punjiram Parshotambhai.',
    },
    {
      entryNo: '1560',
      date: '2010-09-18',
      description: 'Succession/partition mutation in favour of Patel Mukeshbhai Punjabhai and others.',
    },
    {
      entryNo: '1845',
      date: '2026-04-25',
      description: 'New Survey/Block No. 504 (Old: 328) clarified under Khata No. 621.',
    },
  ];
}

function complianceFor(req) {
  const c = defaultCompliance();
  for (const key of req.complianceKeys) {
    c[key] = true;
  }
  // Extra common flags when relevant
  if (req.require712) c.has712Extract = true;
  if (req.showTds) c.hasTdsCertificate = true;
  c.hasPanForm60 = true;
  c.hasEncumbranceCertificate = req.showGovRecords;
  c.hasChainDocuments = req.showTitleHistory;
  c.has8AExtract = req.require712;
  c.hasMutationEntry = req.require712;
  c.hasCollectorPermission = true;
  c.hasNaPermission = true;
  return c;
}

function emptyTxn() {
  return {
    totalSaleAmount: '',
    paymentMode: '',
    payments: [],
    stampDutyReceiptNo: '',
    stampDutyAmount: '',
    registrationFeeReceiptNo: '',
    registrationFeeAmount: '',
    tdsChallanNo: '',
    tdsForm26QB: '',
    tdsPaidDate: '',
  };
}

/** Type-specific parties, instrument, and financials */
function typeOverlay(documentType, locale, templateId = 'builder') {
  const instrument = createEmptyInstrument();
  const p = (k) => party(locale, k);

  switch (documentType) {
    case 'gift_deed':
      instrument.giftRelationship = locale === 'gu' ? 'પિતા થી પુત્ર' : 'Father to Son';
      instrument.giftNaturalLove = true;
      return {
        parties: { sellers: [p('donor')], buyers: [p('donee')] },
        instrument,
        transaction: {
          ...emptyTxn(),
          totalSaleAmount: '4200000',
          stampDutyReceiptNo: 'GRAS-SD-GIFT-2026-01',
          stampDutyAmount: '42000',
          registrationFeeReceiptNo: 'GRAS-RF-GIFT-2026-01',
          registrationFeeAmount: '42000',
          payments: [],
        },
      };

    case 'mortgage':
      instrument.loanAmount = '2500000';
      instrument.interestRate = '8.5';
      instrument.loanTenureMonths = '180';
      instrument.lenderBank = locale === 'gu' ? 'સ્ટેટ બેંક ઓફ ઈન્ડિયા, જેતપુર' : 'State Bank of India, Jetpur';
      instrument.mortgageType = 'without_possession';
      return {
        parties: { sellers: [p('mortgagor')], buyers: [p('mortgagee')] },
        instrument,
        transaction: {
          ...emptyTxn(),
          totalSaleAmount: '2500000',
          stampDutyReceiptNo: 'GRAS-SD-MTG-2026-01',
          stampDutyAmount: '12500',
          registrationFeeReceiptNo: 'GRAS-RF-MTG-2026-01',
          registrationFeeAmount: '5000',
        },
      };

    case 'release_deed':
      instrument.releaseShareDescription = locale === 'gu'
        ? 'સહમાલિકીના ૫૦% હિસ્સાનો સંપૂર્ણ રિલીઝ'
        : 'Full release of 50% undivided share in the property';
      return {
        parties: { sellers: [p('coOwner1')], buyers: [p('coOwner2')] },
        instrument,
        transaction: {
          ...emptyTxn(),
          totalSaleAmount: '100000',
          stampDutyReceiptNo: 'GRAS-SD-REL-2026-01',
          stampDutyAmount: '500',
          registrationFeeReceiptNo: 'GRAS-RF-REL-2026-01',
          registrationFeeAmount: '1000',
        },
      };

    case 'lease_deed':
      instrument.rentMonthly = '25000';
      instrument.securityDeposit = '75000';
      instrument.leaseStartDate = '2026-08-01';
      instrument.leaseEndDate = '2029-07-31';
      instrument.leaseTermMonths = '36';
      instrument.leasePurpose = locale === 'gu' ? 'વ્યવસાયિક ઓફિસ' : 'Commercial office';
      return {
        parties: { sellers: [p('lessor')], buyers: [p('lessee')] },
        instrument,
        transaction: {
          ...emptyTxn(),
          totalSaleAmount: '',
          stampDutyReceiptNo: 'GRAS-SD-LEASE-2026-01',
          stampDutyAmount: '9000',
          registrationFeeReceiptNo: 'GRAS-RF-LEASE-2026-01',
          registrationFeeAmount: '2000',
        },
      };

    case 'leave_and_license':
      instrument.rentMonthly = '18000';
      instrument.securityDeposit = '36000';
      instrument.leaseStartDate = '2026-08-01';
      instrument.leaseEndDate = '2027-06-30';
      instrument.leaseTermMonths = '11';
      instrument.leasePurpose = locale === 'gu' ? 'રહેણાંક' : 'Residential';
      return {
        parties: { sellers: [p('lessor')], buyers: [p('lessee')] },
        instrument,
        transaction: {
          ...emptyTxn(),
          stampDutyReceiptNo: 'GRAS-SD-LL-2026-01',
          stampDutyAmount: '300',
        },
      };

    case 'partition_deed':
      instrument.partitionShares = locale === 'gu'
        ? 'પ્રકાશભાઈ: પૂર્વ અર્ધ યુનિટ ૨૦૨; સુરેશભાઈ: પશ્ચિમ અર્ધ યુનિટ ૨૦૩'
        : 'Prakashbhai: East half Unit 202; Sureshbhai: West half Unit 203';
      return {
        parties: { sellers: [p('coOwner1'), p('coOwner2')], buyers: [] },
        instrument,
        transaction: {
          ...emptyTxn(),
          totalSaleAmount: '4200000',
          stampDutyReceiptNo: 'GRAS-SD-PART-2026-01',
          stampDutyAmount: '1000',
          registrationFeeReceiptNo: 'GRAS-RF-PART-2026-01',
          registrationFeeAmount: '2000',
        },
      };

    case 'will':
      instrument.willExecutor = locale === 'gu' ? 'એડવો. મેહુલભાઈ જોશી' : 'Adv. Mehulbhai Joshi';
      instrument.willRevokesPrior = true;
      return {
        parties: { sellers: [p('testator')], buyers: [p('beneficiary')] },
        instrument,
        transaction: emptyTxn(),
      };

    case 'power_of_attorney':
      instrument.poaPowers = locale === 'gu'
        ? 'મિલકત વેચવી, ગીરે મૂકવી, દસ્તાવેજ અમલ કરવા, SRO સમક્ષ હાજર થવું'
        : 'Sell, mortgage, execute deeds, appear before SRO on behalf of principal';
      instrument.poaDuration = locale === 'gu' ? 'રદ ન થાય ત્યાં સુધી' : 'Until revoked';
      instrument.poaIrrevocable = false;
      return {
        parties: { sellers: [p('principal')], buyers: [p('attorney')] },
        instrument,
        transaction: {
          ...emptyTxn(),
          stampDutyReceiptNo: 'GRAS-SD-POA-2026-01',
          stampDutyAmount: '500',
          registrationFeeReceiptNo: 'GRAS-RF-POA-2026-01',
          registrationFeeAmount: '1000',
        },
      };

    case 'agreement_to_sell':
      instrument.earnestAmount = '500000';
      instrument.agreementCompletionDate = '2026-12-31';
      instrument.balancePayable = '5000000';
      return {
        parties: { sellers: [p('individualSeller')], buyers: [p('individualBuyer')] },
        instrument,
        transaction: {
          ...emptyTxn(),
          totalSaleAmount: '5500000',
          paymentMode: 'RTGS',
          payments: [
            {
              mode: 'RTGS', bankName: locale === 'gu' ? 'સ્ટેટ બેંક ઓફ ઈન્ડિયા' : 'State Bank of India',
              branchName: locale === 'gu' ? 'જેતપુર શાખા' : 'Jetpur Branch',
              instrumentNo: 'SBIN82649104829', date: '2026-07-01', amount: '500000',
            },
          ],
          stampDutyReceiptNo: 'GRAS-SD-ATS-2026-01',
          stampDutyAmount: '55000',
          registrationFeeReceiptNo: 'GRAS-RF-ATS-2026-01',
          registrationFeeAmount: '10000',
        },
      };

    case 'development_agreement':
      instrument.developerSharePercent = '60';
      instrument.ownerShareUnits = locale === 'gu' ? '૪ ફ્લેટ + ૨ દુકાન' : '4 flats + 2 shops';
      instrument.projectName = locale === 'gu' ? 'શ્રીનાથ રેઝિડેન્સી' : 'Shrinath Residency';
      instrument.fsiAllowed = '2.4';
      return {
        parties: { sellers: [p('donor')], buyers: [p('developer')] },
        instrument,
        transaction: {
          ...emptyTxn(),
          totalSaleAmount: '15000000',
          stampDutyReceiptNo: 'GRAS-SD-DA-2026-01',
          stampDutyAmount: '150000',
          registrationFeeReceiptNo: 'GRAS-RF-DA-2026-01',
          registrationFeeAmount: '50000',
        },
      };

    case 'sale_deed_farm_land':
      return {
        parties: {
          sellers: [
            {
              ...p('individualSeller'),
              name: locale === 'gu' ? 'પટેલ મુકેશભાઈ પુંજાભાઈ' : 'Patel Mukeshbhai Punjabhai',
              age: '48',
              occupation: locale === 'gu' ? 'ખેતી' : 'Agriculture',
              religion: locale === 'gu' ? 'હિન્દુ' : 'Hindu',
              address: locale === 'gu' ? 'મુ.પો. લોલાસણ, તા. હિંમતનગર, જિ. સાબરકાંઠા' : 'At & Po. Lolasna, Tal. Himatnagar, Dist. Sabarkantha',
            },
            {
              ...p('individualSeller'),
              name: locale === 'gu' ? 'પટેલ સુરેશભાઈ પુંજાભાઈ' : 'Patel Sureshbhai Punjabhai',
              age: '45',
              occupation: locale === 'gu' ? 'ખેતી' : 'Agriculture',
              religion: locale === 'gu' ? 'હિન્દુ' : 'Hindu',
              address: locale === 'gu' ? 'મુ.પો. લોલાસણ, તા. હિંમતનગર, જિ. સાબરકાંઠા' : 'At & Po. Lolasna, Tal. Himatnagar, Dist. Sabarkantha',
            },
          ],
          buyers: [
            {
              ...p('individualBuyer'),
              name: locale === 'gu' ? 'પટેલ અમિતભાઈ કાંતિભાઈ' : 'Patel Amitbhai Kantibhai',
              age: '35',
              occupation: locale === 'gu' ? 'ખેતી' : 'Agriculture',
              religion: locale === 'gu' ? 'હિન્દુ' : 'Hindu',
              address: locale === 'gu' ? 'મુ.પો. લોલાસણ, તા. હિંમતનગર, જિ. સાબરકાંઠા' : 'At & Po. Lolasna, Tal. Himatnagar, Dist. Sabarkantha',
            },
            {
              ...p('individualBuyer'),
              name: locale === 'gu' ? 'પટેલ કિરણભાઈ કાંતિભાઈ' : 'Patel Kiranbhai Kantibhai',
              age: '32',
              occupation: locale === 'gu' ? 'ખેતી' : 'Agriculture',
              religion: locale === 'gu' ? 'હિન્દુ' : 'Hindu',
              address: locale === 'gu' ? 'મુ.પો. લોલાસણ, તા. હિંમતનગર, જિ. સાબરકાંઠા' : 'At & Po. Lolasna, Tal. Himatnagar, Dist. Sabarkantha',
            },
          ],
          confirmers: [
            {
              ...p('coOwner1'),
              name: locale === 'gu' ? 'પટેલ કાંતિભાઈ ખેમાભાઈ' : 'Patel Kantibhai Khemabhai',
              age: '42',
              occupation: locale === 'gu' ? 'ખેતી' : 'Agriculture',
              religion: locale === 'gu' ? 'હિન્દુ' : 'Hindu',
              address: locale === 'gu' ? 'મુ.પો. લોલાસણ, તા. હિંમતનગર' : 'At & Po. Lolasna, Tal. Himatnagar',
            },
          ],
        },
        instrument,
        transaction: {
          totalSaleAmount: '100000',
          paymentMode: 'Cash',
          payments: [
            {
              mode: 'Cash',
              bankName: '',
              branchName: '',
              instrumentNo: '',
              date: '2026-07-13',
              amount: '100000',
            },
          ],
          stampDutyReceiptNo: 'GRAS-SD-FARM-2026-01',
          stampDutyAmount: '4900',
          registrationFeeReceiptNo: 'GRAS-RF-FARM-2026-01',
          registrationFeeAmount: '1000',
          tdsChallanNo: '',
          tdsForm26QB: '',
          tdsPaidDate: '',
        },
      };

    case 'sale_deed':
    case 'sale_deed_flat':
    case 'sale_deed_house':
    case 'sale_deed_plot':
    default:
      return {
        parties: {
          sellers: [p(templateId === 'builder' ? 'developer' : 'individualSeller')],
          buyers: [p('individualBuyer')],
        },
        instrument,
        transaction: {
          totalSaleAmount: '5500000',
          paymentMode: 'RTGS',
          payments: [
            {
              mode: 'RTGS',
              bankName: locale === 'gu' ? 'સ્ટેટ બેંક ઓફ ઈન્ડિયા' : 'State Bank of India',
              branchName: locale === 'gu' ? 'જેતપુર શાખા' : 'Jetpur Branch',
              instrumentNo: 'SBIN82649104829',
              date: '2026-07-01',
              amount: '1500000',
            },
            {
              mode: 'NEFT',
              bankName: locale === 'gu' ? 'એચ.ડી.એફ.સી. બેંક' : 'HDFC Bank',
              branchName: locale === 'gu' ? 'રાજકોટ શાખા' : 'Rajkot Branch',
              instrumentNo: '58291048201',
              date: '2026-07-08',
              amount: '4000000',
            },
          ],
          stampDutyReceiptNo: 'GRAS-SD-984620183',
          stampDutyAmount: '269500',
          registrationFeeReceiptNo: 'GRAS-RF-481920384',
          registrationFeeAmount: '55000',
          tdsChallanNo: 'TDS/194IA/8274910/2026',
          tdsForm26QB: '26QB-202607-827491048',
          tdsPaidDate: '2026-07-05',
        },
      };
  }
}

/**
 * Build mock form data for the currently selected document type + template + UI language.
 */
export function buildMockDocument({ documentType = 'sale_deed_flat', templateId = 'builder', locale = 'en' } = {}) {
  const lang = locale === 'gu' ? 'gu' : 'en';
  const req = getDocumentRequirements(documentType);
  const overlay = typeOverlay(documentType, lang, templateId);
  const isFarm = documentType === 'sale_deed_farm_land';

  return {
    documentType,
    templateId: isFarm && templateId === 'builder' ? 'government' : templateId,
    locale: lang,
    parties: overlay.parties,
    property: isFarm ? farmPropertyBase(lang) : propertyBase(lang),
    titleHistory: req.showTitleHistory
      ? (isFarm ? farmTitleHistory(lang) : titleHistory(lang))
      : [],
    transaction: overlay.transaction,
    instrument: overlay.instrument,
    compliance: complianceFor(req),
    witnesses: witnesses(lang),
    identifier: identifier(lang),
    execution: {
      ...execution(lang, req.requireGarvi),
      executionPlace: isFarm
        ? (lang === 'gu' ? 'હિંમતનગર' : 'Himatnagar')
        : execution(lang, req.requireGarvi).executionPlace,
      executionDate: isFarm ? '2026-07-13' : execution(lang, req.requireGarvi).executionDate,
    },
  };
}

export default buildMockDocument;
