/**
 * Bidirectional adapter between legacy flat formData and Document model.
 * Keeps wizard working while engines consume Document shape.
 */

import { createEmptyDocument, createEmptyProperty, createEmptyGovRecords } from './Document';
import { createEmptyParty } from '../constants/partyTypes';
import { DEFAULT_TEMPLATE_ID } from '../constants/templates';

function partyFromLegacy(p = {}) {
  const base = createEmptyParty(p.isCorporate ? 'company' : (p.partyType || 'individual'));
  return {
    ...base,
    ...p,
    partyType: p.partyType || (p.isCorporate ? 'company' : 'individual'),
    isCorporate: Boolean(p.isCorporate || (p.partyType && p.partyType !== 'individual')),
    cin: p.cin || p.companyCin || '',
    companyCin: p.companyCin || p.cin || '',
  };
}

function syncPropertyFlat(property) {
  const p = { ...createEmptyProperty(), ...property };
  const survey = { ...p.survey, ...(property.survey || {}) };
  const building = { ...p.building, ...(property.building || {}) };
  const unit = { ...p.unit, ...(property.unit || {}) };
  const areas = { ...p.areas, ...(property.areas || {}) };
  const permissions = { ...p.permissions, ...(property.permissions || {}) };
  const gov = { ...createEmptyGovRecords(), ...(p.govRecords || {}), ...(property.govRecords || {}) };
  const rev = { ...(p.revenueRecords || {}), ...(property.revenueRecords || {}) };

  // Prefer flat wizard fields when present
  survey.blockSurveyNo = p.blockSurveyNo || survey.blockSurveyNo;
  survey.oldSurveyNo = p.oldSurveyNo || survey.oldSurveyNo;
  survey.newCitySurveyNo = p.newCitySurveyNo || survey.newCitySurveyNo;
  survey.tpFpNo = p.tpFpNo || survey.tpFpNo;

  building.complexName = p.complexName || building.complexName;
  building.siteName = p.siteName || building.siteName;
  building.tower = p.tower || building.tower;
  building.associationName = p.associationName || building.associationName;

  unit.floor = p.floor || unit.floor;
  unit.unitNumber = p.unitNumber || unit.unitNumber;
  unit.unitCardNo = p.unitCardNo || unit.unitCardNo || rev.propertyCardNo;
  unit.unitType = p.unitType || unit.unitType || 'flat';

  areas.totalPlotArea = p.totalPlotArea || areas.totalPlotArea;
  areas.constructionArea = p.constructionArea || areas.constructionArea;
  areas.carpetArea = p.carpetArea || areas.carpetArea;
  areas.verandaArea = p.verandaArea || areas.verandaArea;
  areas.parkingArea = p.parkingArea || areas.parkingArea;
  areas.parkingSlots = p.parkingSlots || areas.parkingSlots;
  areas.builtUpArea = areas.builtUpArea || p.constructionArea || '';
  areas.superBuiltUpArea = areas.superBuiltUpArea || '';

  const parking = {
    ...(p.parking || {}),
    type: p.parkingType || p.parking?.type || '',
    slots: p.parkingSlots || p.parking?.slots || areas.parkingSlots || '',
    area: p.parkingArea || p.parking?.area || areas.parkingArea || '',
  };
  permissions.tenureType = p.tenureType || permissions.tenureType;
  permissions.naOrderNo = p.naOrderNo || permissions.naOrderNo;
  permissions.naOrderDate = p.naOrderDate || permissions.naOrderDate;
  permissions.isBuiltUp = p.isBuiltUp ?? permissions.isBuiltUp;
  permissions.reraNumber = p.reraNumber || permissions.reraNumber;
  permissions.gpaDetails = p.gpaDetails || permissions.gpaDetails;
  permissions.hasGpa = Boolean(permissions.gpaDetails || p.gpaDetails);
  permissions.plotValidationOrderNo = p.plotValidationOrderNo || permissions.plotValidationOrderNo;
  permissions.plotValidationDate = p.plotValidationDate || permissions.plotValidationDate;
  permissions.constructionPermissionNo = p.constructionPermissionNo || permissions.constructionPermissionNo;
  permissions.constructionPermissionDate = p.constructionPermissionDate || permissions.constructionPermissionDate;
  permissions.collectorPermissionOrderNo = p.collectorPermissionOrderNo || permissions.collectorPermissionOrderNo;
  permissions.collectorPermissionDate = p.collectorPermissionDate || permissions.collectorPermissionDate;
  permissions.banakhatDate = p.banakhatDate || permissions.banakhatDate;

  gov.naPermission.orderNo = permissions.naOrderNo || gov.naPermission.orderNo;
  gov.naPermission.date = permissions.naOrderDate || gov.naPermission.date;
  gov.rera.registrationNo = permissions.reraNumber || gov.rera.registrationNo;
  gov.propertyCard.cardNo = unit.unitCardNo || rev.propertyCardNo || gov.propertyCard.cardNo;
  gov.extract712.number = rev.extract712No || gov.extract712.number;
  gov.extract712.date = rev.extract712Date || gov.extract712.date;
  gov.form8A.khataNo = rev.khata8ANo || gov.form8A.khataNo;
  gov.mutation.entryNo = rev.mutationEntryNo || gov.mutation.entryNo;
  gov.mutation.date = rev.mutationDate || gov.mutation.date;
  gov.encumbrance.certNo = rev.encumbranceCertNo || gov.encumbrance.certNo;
  gov.encumbrance.date = rev.encumbranceCertDate || gov.encumbrance.date;
  gov.citySurvey.citySurveyNo = survey.newCitySurveyNo || gov.citySurvey.citySurveyNo;
  gov.tpScheme.tpNo = survey.tpNo || (survey.tpFpNo || '').split(',')[0] || gov.tpScheme.tpNo;
  gov.buildingPermission.permissionNo = permissions.constructionPermissionNo || gov.buildingPermission.permissionNo;
  gov.buildingPermission.date = permissions.constructionPermissionDate || gov.buildingPermission.date;
  gov.plotVerification.orderNo = permissions.plotValidationOrderNo || gov.plotVerification.orderNo;
  gov.plotVerification.date = permissions.plotValidationDate || gov.plotVerification.date;

  return {
    ...p,
    survey,
    building,
    unit,
    areas,
    parking,
    permissions,
    govRecords: gov,
    revenueRecords: rev,
    coordinates: {
      latitude: p.latitude || p.coordinates?.latitude || '',
      longitude: p.longitude || p.coordinates?.longitude || '',
    },
    // keep flat mirrors for existing UI
    blockSurveyNo: survey.blockSurveyNo,
    oldSurveyNo: survey.oldSurveyNo,
    newCitySurveyNo: survey.newCitySurveyNo,
    tpFpNo: survey.tpFpNo,
    complexName: building.complexName,
    siteName: building.siteName,
    tower: building.tower,
    floor: unit.floor,
    unitNumber: unit.unitNumber,
    unitCardNo: unit.unitCardNo,
    unitType: unit.unitType || 'flat',
    totalPlotArea: areas.totalPlotArea,
    constructionArea: areas.constructionArea,
    carpetArea: areas.carpetArea,
    verandaArea: areas.verandaArea,
    parkingType: parking.type,
    parkingSlots: parking.slots,
    parkingArea: parking.area,
    naOrderNo: permissions.naOrderNo,
    naOrderDate: permissions.naOrderDate,
    reraNumber: permissions.reraNumber,
    tenureType: permissions.tenureType,
    isBuiltUp: permissions.isBuiltUp,
    latitude: p.latitude || p.coordinates?.latitude || '',
    longitude: p.longitude || p.coordinates?.longitude || '',
    gpaDetails: permissions.gpaDetails,
    associationName: building.associationName,
    plotValidationOrderNo: permissions.plotValidationOrderNo,
    plotValidationDate: permissions.plotValidationDate,
    constructionPermissionNo: permissions.constructionPermissionNo,
    constructionPermissionDate: permissions.constructionPermissionDate,
    banakhatDate: permissions.banakhatDate,
    collectorPermissionOrderNo: permissions.collectorPermissionOrderNo,
    collectorPermissionDate: permissions.collectorPermissionDate,
    photos: {
      sitePhoto: property.photos?.sitePhoto || p.photos?.sitePhoto || '',
      boundaryPhoto: property.photos?.boundaryPhoto || p.photos?.boundaryPhoto || '',
      structurePhoto: property.photos?.structurePhoto || p.photos?.structurePhoto || '',
    },
  };
}

/** Convert legacy formData blob → Document */
export function formDataToDocument(formData = {}, meta = {}) {
  const doc = createEmptyDocument(meta);
  return {
    ...doc,
    ...meta,
    documentType: formData.documentType || meta.documentType || 'sale_deed',
    templateId: formData.templateId || meta.templateId || DEFAULT_TEMPLATE_ID,
    locale: formData.locale || meta.locale || 'gu',
    documentNumber: formData.execution?.documentSerialNo || formData.documentNumber || '',
    registrationDate: formData.execution?.executionDate || formData.registrationDate || '',
    parties: {
      sellers: (formData.parties?.sellers || []).map(partyFromLegacy),
      buyers: (formData.parties?.buyers || []).map(partyFromLegacy),
    },
    property: syncPropertyFlat(formData.property || {}),
    titleHistory: formData.titleHistory || doc.titleHistory,
    transaction: { ...doc.transaction, ...(formData.transaction || {}) },
    instrument: { ...(formData.instrument || {}) },
    compliance: { ...doc.compliance, ...(formData.compliance || {}) },
    witnesses: formData.witnesses || doc.witnesses,
    identifier: { ...doc.identifier, ...(formData.identifier || {}) },
    branding: { ...doc.branding, ...(formData.branding || {}) },
    execution: { ...doc.execution, ...(formData.execution || {}) },
    updatedAt: new Date().toISOString(),
  };
}

/** Document → legacy formData shape for existing wizard components */
export function documentToFormData(doc) {
  const property = syncPropertyFlat(doc.property || {});
  return {
    documentType: doc.documentType || 'sale_deed',
    templateId: doc.templateId || DEFAULT_TEMPLATE_ID,
    locale: doc.locale || 'gu',
    parties: {
      sellers: (doc.parties?.sellers || []).map(partyFromLegacy),
      buyers: (doc.parties?.buyers || []).map(partyFromLegacy),
    },
    property,
    titleHistory: doc.titleHistory || [],
    transaction: doc.transaction || {},
    instrument: doc.instrument || {},
    compliance: doc.compliance || {},
    witnesses: doc.witnesses || [],
    identifier: doc.identifier || {},
    branding: doc.branding || {},
    execution: doc.execution || {},
  };
}

/** Build flat placeholder context for paragraph templates */
export function buildParagraphContext(doc, helpers = {}) {
  const { toGuDigits = (v) => String(v ?? ''), formatGuDate = (v) => v || '.....................', formatCurrency = (v) => v } = helpers;
  const p = syncPropertyFlat(doc.property || {});
  const t = doc.transaction || {};
  const sellers = doc.parties?.sellers || [];
  const buyers = doc.parties?.buyers || [];
  const total = parseFloat(t.totalSaleAmount) || 0;

  return {
    DocumentNumber: doc.documentNumber || doc.execution?.documentSerialNo || '.....................',
    DocumentType: doc.documentType || 'sale_deed',
    DocumentDate: formatGuDate(doc.registrationDate || doc.execution?.executionDate),
    PropertyName: p.complexName || p.siteName || p.village || '_______________',
    Village: p.village || '_______________',
    District: p.district || '_______________',
    Taluka: p.taluka || p.district || '_______________',
    SurveyNo: p.blockSurveyNo || '_______________',
    CitySurveyNo: p.newCitySurveyNo || '_______________',
    UnitNo: p.unitNumber || '___',
    Floor: p.floor || '___',
    CarpetArea: p.carpetArea || '___',
    BuiltUpArea: p.constructionArea || p.areas?.builtUpArea || '___',
    VerandaArea: p.verandaArea || '___',
    UnitCard: p.unitCardNo || p.revenueRecords?.propertyCardNo || '_______________',
    SaleAmount: formatCurrency(total),
    SaleAmountDigits: toGuDigits(total.toLocaleString('en-IN')),
    StampDuty: formatCurrency(parseFloat(t.stampDutyAmount) || 0),
    RegistrationFee: formatCurrency(parseFloat(t.registrationFeeAmount) || 0),
    SellerNames: sellers.map((s) => s.name).filter(Boolean).join(', ') || '_______________',
    BuyerNames: buyers.map((b) => b.name).filter(Boolean).join(', ') || '_______________',
    NaOrderNo: p.naOrderNo || '',
    NaOrderDate: formatGuDate(p.naOrderDate),
    ReraNumber: p.reraNumber || '',
    GpaDetails: p.gpaDetails || '',
    MortgageDetails: p.permissions?.mortgageDetails || '',
    SroOffice: p.subRegistrarOffice || '_______________',
    Tower: p.tower || '',
    ComplexName: p.complexName || p.siteName || p.village || '_______________',
    TpFpNo: p.tpFpNo || '',
    ExecutionPlace: doc.execution?.executionPlace || p.district || '_______________',
    ExecutionDate: formatGuDate(doc.execution?.executionDate),
  };
}
