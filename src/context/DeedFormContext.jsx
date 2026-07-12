import React, { createContext, useContext, useState, useEffect } from 'react';
import { defaultPartyFields, defaultWitnessFields, defaultCompliance } from '../utils/sroRequirements';
import { buildMockDocument } from '../data/mockDocuments';
import { DEFAULT_TEMPLATE_ID } from '../constants/templates';

const DeedFormContext = createContext();

const defaultState = {
  documentType: 'sale_deed',
  templateId: DEFAULT_TEMPLATE_ID,
  locale: 'gu',
  parties: {
    sellers: [defaultPartyFields()],
    buyers: [defaultPartyFields()]
  },
  property: {
    propertyType: "na_land",
    district: "",
    taluka: "",
    subRegistrarOffice: "",
    village: "",
    blockSurveyNo: "",
    oldSurveyNo: "",
    newCitySurveyNo: "",
    tpFpNo: "",
    tenureType: "old_tenure",
    collectorPermissionOrderNo: "",
    collectorPermissionDate: "",
    isBuiltUp: false,
    naOrderNo: "",
    naOrderDate: "",
    totalPlotArea: "",
    constructionArea: "",
    carpetArea: "",
    complexName: "",
    siteName: "",
    tower: "",
    floor: "",
    unitNumber: "",
    unitCardNo: "",
    verandaArea: "",
    reraNumber: "",
    latitude: "",
    longitude: "",
    postalAddress: "",
    plotValidationOrderNo: "",
    plotValidationDate: "",
    constructionPermissionNo: "",
    constructionPermissionDate: "",
    banakhatDate: "",
    gpaDetails: "",
    associationName: "",
    boundaries: { east: "", west: "", north: "", south: "" },
    jantriValue: "",
    revenueRecords: {
      extract712No: "",
      extract712Date: "",
      khata8ANo: "",
      mutationEntryNo: "",
      mutationDate: "",
      propertyCardNo: "",
      encumbranceCertNo: "",
      encumbranceCertDate: ""
    },
    photos: {
      sitePhoto: "",
      boundaryPhoto: "",
      structurePhoto: ""
    },
    govRecords: {
      revenue: { extract712No: '', extract712Date: '', remarks: '' },
      mutation: { entryNo: '', date: '', description: '' },
      naPermission: { orderNo: '', date: '', authority: '' },
      tpScheme: { tpNo: '', fpNo: '', remarks: '' },
      propertyCard: { cardNo: '', date: '', issuingAuthority: '' },
      buildingPermission: { permissionNo: '', date: '' },
      developmentPermission: { permissionNo: '', date: '' },
      rera: { registrationNo: '', projectName: '' },
      plotVerification: { orderNo: '', date: '' },
      citySurvey: { citySurveyNo: '', sheetNo: '' },
      extract712: { number: '', date: '' },
      form8A: { khataNo: '', date: '' },
      encumbrance: { certNo: '', date: '' },
      bankNoc: { bankName: '', nocNo: '', date: '' },
      societyNoc: { societyName: '', nocNo: '', date: '' },
      associationCertificate: { name: '', certNo: '', date: '' },
      possessionLetter: { letterNo: '', date: '' },
      completionCertificate: { certNo: '', date: '' },
      occupancyCertificate: { certNo: '', date: '' },
    },
  },
  titleHistory: [{ entryNo: "", date: "", description: "" }],
  transaction: {
    totalSaleAmount: "",
    paymentMode: "Cheque",
    payments: [{ mode: "RTGS", bankName: "", branchName: "", instrumentNo: "", date: "", amount: "" }],
    stampDutyReceiptNo: "",
    stampDutyAmount: "",
    registrationFeeReceiptNo: "",
    registrationFeeAmount: "",
    tdsChallanNo: "",
    tdsForm26QB: "",
    tdsPaidDate: ""
  },
  instrument: {
    giftRelationship: '', giftNaturalLove: true,
    loanAmount: '', interestRate: '', loanTenureMonths: '', lenderBank: '', mortgageType: 'with_possession',
    rentMonthly: '', securityDeposit: '', leaseStartDate: '', leaseEndDate: '', leaseTermMonths: '', leasePurpose: '',
    releaseShareDescription: '', partitionShares: '',
    willExecutor: '', willRevokesPrior: true,
    poaPowers: '', poaDuration: '', poaIrrevocable: false,
    earnestAmount: '', agreementCompletionDate: '', balancePayable: '',
    developerSharePercent: '', ownerShareUnits: '', projectName: '', fsiAllowed: '',
  },
  compliance: defaultCompliance(),
  witnesses: [defaultWitnessFields(), defaultWitnessFields()],
  identifier: { name: "", aadhaar: "", mobile: "", relation: "Advocate / Presenter" },
  branding: {
    orgName: "DM Associates",
    orgTagline: "Legal Document Generator",
    mobile: "",
  },
  execution: {
    executionDate: "",
    executionPlace: "",
    possessionDate: "",
    possessionType: "immediate",
    garviApplicationNo: "",
    documentSerialNo: "",
    garviAppointmentDate: "",
    garviAppointmentSlot: "",
    presentingPartyMobile: "",
    presentingPartyEmail: ""
  }
};

export const DeedFormProvider = ({ children }) => {
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('deed_app_draft');
    if (!saved) return defaultState;
    try {
      const parsed = JSON.parse(saved);
      return {
        ...defaultState,
        ...parsed,
        instrument: { ...defaultState.instrument, ...(parsed.instrument || {}) },
        parties: parsed.parties || defaultState.parties,
        property: { ...defaultState.property, ...(parsed.property || {}) },
        transaction: { ...defaultState.transaction, ...(parsed.transaction || {}) },
        compliance: { ...defaultState.compliance, ...(parsed.compliance || {}) },
      };
    } catch {
      return defaultState;
    }
  });

  const [step, setStep] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('deed_app_draft', JSON.stringify(formData));
      setIsSaved(true);
      const timer = setTimeout(() => setIsSaved(false), 1500);
      return () => clearTimeout(timer);
    } catch (err) {
      // Quota exceeded when photos are large — keep in-memory form; photos still used for PDF
      console.warn('Draft save skipped (storage full). Photos remain available for PDF.', err);
      return undefined;
    }
  }, [formData]);

  const updateField = (path, value) => {
    setFormData(prev => {
      const keys = path.split('.');
      const newData = JSON.parse(JSON.stringify(prev));
      let current = newData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const addListItem = (path, defaultItem) => {
    setFormData(prev => {
      const keys = path.split('.');
      const newData = JSON.parse(JSON.stringify(prev));
      let current = newData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      
      const list = current[keys[keys.length - 1]];
      if (Array.isArray(list)) {
        list.push(defaultItem);
      }
      return newData;
    });
  };

  const removeListItem = (path, index) => {
    setFormData(prev => {
      const keys = path.split('.');
      const newData = JSON.parse(JSON.stringify(prev));
      let current = newData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      
      const list = current[keys[keys.length - 1]];
      if (Array.isArray(list)) {
        list.splice(index, 1);
      }
      return newData;
    });
  };

  const resetForm = () => {
    setFormData(defaultState);
    setStep(0);
  };

  const loadMockData = (lang = 'en') => {
    setFormData((prev) =>
      buildMockDocument({
        documentType: prev.documentType || 'sale_deed',
        templateId: prev.templateId || DEFAULT_TEMPLATE_ID,
        locale: lang === 'gu' ? 'gu' : 'en',
      })
    );
    setStep(0);
  };

  return (
    <DeedFormContext.Provider value={{
      formData,
      step,
      setStep,
      updateField,
      addListItem,
      removeListItem,
      resetForm,
      loadMockData,
      isSaved
    }}>
      {children}
    </DeedFormContext.Provider>
  );
};

export const useDeedForm = () => {
  const context = useContext(DeedFormContext);
  if (!context) {
    throw new Error('useDeedForm must be used within a DeedFormProvider');
  }
  return context;
};
