export const PARTY_TYPES = {
  individual: { id: 'individual', label: { en: 'Individual', gu: 'વ્યક્તિ' } },
  company: { id: 'company', label: { en: 'Company', gu: 'કંપની' } },
  partnership: { id: 'partnership', label: { en: 'Partnership', gu: 'પાર્ટનરશિપ' } },
  llp: { id: 'llp', label: { en: 'LLP', gu: 'એલએલપી' } },
  trust: { id: 'trust', label: { en: 'Trust', gu: 'ટ્રસ્ટ' } },
  society: { id: 'society', label: { en: 'Society', gu: 'સોસાયટી' } },
  government: { id: 'government', label: { en: 'Government', gu: 'સરકાર' } },
};

export const PARTY_TYPE_IDS = Object.keys(PARTY_TYPES);

/** Fields shown per party type (optional otherwise) */
export const PARTY_FIELD_SCHEMA = {
  individual: [
    'name', 'fatherName', 'motherName', 'gender', 'age', 'religion', 'occupation',
    'nationality', 'maritalStatus', 'pan', 'aadhaar', 'passport', 'drivingLicense',
    'mobile', 'email', 'address', 'photo', 'signature', 'thumbImpression',
    'hasRepresentative', 'representativeName', 'powerOfAttorney',
  ],
  company: [
    'name', 'cin', 'gstNumber', 'pan', 'registeredOffice', 'address', 'mobile', 'email',
    'authorisedSignatory', 'signatoryAge', 'signatoryOccupation', 'signatoryReligion',
    'signatoryAddress', 'boardResolutionDate', 'photo', 'signature', 'directors',
  ],
  partnership: [
    'name', 'pan', 'gstNumber', 'registeredOffice', 'address', 'mobile', 'email',
    'authorisedSignatory', 'signatoryAge', 'signatoryOccupation', 'signatoryReligion',
    'photo', 'signature',
  ],
  llp: [
    'name', 'llpin', 'pan', 'gstNumber', 'registeredOffice', 'address', 'mobile', 'email',
    'authorisedSignatory', 'photo', 'signature',
  ],
  trust: [
    'name', 'pan', 'registrationNo', 'address', 'mobile', 'email',
    'authorisedSignatory', 'photo', 'signature',
  ],
  society: [
    'name', 'pan', 'registrationNo', 'address', 'mobile', 'email',
    'authorisedSignatory', 'photo', 'signature',
  ],
  government: [
    'name', 'department', 'address', 'mobile', 'email',
    'authorisedSignatory', 'photo', 'signature',
  ],
};

export function createEmptyParty(partyType = 'individual') {
  return {
    partyType,
    name: '',
    fatherName: '',
    motherName: '',
    gender: '',
    age: '',
    religion: '',
    occupation: '',
    nationality: 'Indian',
    maritalStatus: '',
    pan: '',
    aadhaar: '',
    passport: '',
    drivingLicense: '',
    mobile: '',
    email: '',
    address: '',
    photo: '',
    signature: '',
    thumbImpression: '',
    hasRepresentative: false,
    representativeName: '',
    powerOfAttorney: '',
    // corporate / entity
    isCorporate: partyType !== 'individual',
    cin: '',
    llpin: '',
    gstNumber: '',
    companyCin: '',
    registeredOffice: '',
    registrationNo: '',
    department: '',
    authorisedSignatory: '',
    signatoryAge: '',
    signatoryOccupation: '',
    signatoryReligion: '',
    signatoryAddress: '',
    boardResolutionDate: '',
    directors: [],
  };
}
