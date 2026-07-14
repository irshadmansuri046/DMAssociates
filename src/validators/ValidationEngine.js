import { validateSaleDeed, validateGiftDeed } from './rules/saleDeed';
import { getDocumentRequirements } from '../constants/documentTypeRequirements';
import { getPartyRoles } from '../constants/partyRoles';
import { DEFAULT_DOCUMENT_TYPE, isSaleDeedType } from '../constants/documentTypes';

function validateByRequirements(doc) {
  const req = getDocumentRequirements(doc.documentType);
  const roles = getPartyRoles(doc.documentType);
  const errors = [];
  const sellers = doc.parties?.sellers || [];
  const buyers = doc.parties?.buyers || [];
  const p = doc.property || {};
  const t = doc.transaction || {};
  const inst = doc.instrument || {};
  const witnesses = (doc.witnesses || []).filter((w) => w.name?.trim());

  if (sellers.filter((s) => s.name?.trim()).length < req.minSellers) {
    errors.push({ field: 'sellers', message: `${roles.first.en} — at least ${req.minSellers} required` });
  }
  if (req.minBuyers > 0 && buyers.filter((b) => b.name?.trim()).length < req.minBuyers) {
    errors.push({ field: 'buyers', message: `${roles.second.en} is required` });
  }

  if (req.showProperty) {
    if (!(p.blockSurveyNo || p.survey?.blockSurveyNo || p.village)) {
      errors.push({ field: 'property', message: 'Property identification is required' });
    }
    if (req.requireArea) {
      const area = p.carpetArea || p.totalPlotArea || p.areas?.carpetArea || p.areas?.totalPlotArea;
      if (!area) errors.push({ field: 'area', message: 'Property area is required' });
    }
  }

  if (req.showConsideration && req.amountLabelKey !== 'none' && req.amountLabelKey !== 'rent' && req.amountLabelKey !== 'licenseFee') {
    if (!t.totalSaleAmount || !(parseFloat(t.totalSaleAmount) > 0)) {
      errors.push({ field: 'totalSaleAmount', message: 'Amount / value is required' });
    }
  }
  if ((req.amountLabelKey === 'rent' || req.amountLabelKey === 'licenseFee') && !inst.rentMonthly) {
    errors.push({ field: 'rentMonthly', message: 'Monthly rent / license fee is required' });
  }
  if (req.amountLabelKey === 'loan' && !(inst.loanAmount || t.totalSaleAmount)) {
    errors.push({ field: 'loanAmount', message: 'Loan amount is required' });
  }

  if (req.showStampDuty && t.stampDutyAmount === undefined) {
    errors.push({ field: 'stampDutyAmount', message: 'Stamp duty amount is required' });
  }

  if (req.showPaymentInstallments && req.requirePaymentsMatch) {
    const paid = (t.payments || []).reduce((s, pmt) => s + (parseFloat(pmt.amount) || 0), 0);
    const total = parseFloat(t.totalSaleAmount) || 0;
    if (total > 0 && Math.abs(paid - total) > 0.99) {
      errors.push({
        field: 'payments',
        message: `Total payments (₹${paid.toLocaleString('en-IN')}) must equal consideration (₹${total.toLocaleString('en-IN')})`,
      });
    }
  }

  if (witnesses.length < (req.minWitnesses || 0)) {
    errors.push({ field: 'witnesses', message: `${req.minWitnesses} witnesses are required` });
  }

  return errors;
}

const RULES = {
  sale_deed: validateSaleDeed,
  sale_deed_flat: validateSaleDeed,
  sale_deed_house: validateSaleDeed,
  sale_deed_farm_land: validateSaleDeed,
  sale_deed_plot: validateSaleDeed,
  gift_deed: validateGiftDeed,
  mortgage: (doc) => validateByRequirements(doc),
  release_deed: (doc) => validateByRequirements(doc),
  lease_deed: (doc) => validateByRequirements(doc),
  leave_and_license: (doc) => validateByRequirements(doc),
  partition_deed: (doc) => validateByRequirements(doc),
  will: (doc) => validateByRequirements(doc),
  power_of_attorney: (doc) => validateByRequirements(doc),
  agreement_to_sell: (doc) => {
    // Soft payment match — reuse sale rules but skip payment equality
    const errors = validateSaleDeed(doc).filter((e) => e.field !== 'payments');
    return errors;
  },
  development_agreement: (doc) => validateByRequirements(doc),
};

export const ValidationEngine = {
  validate(doc) {
    const type = doc?.documentType || DEFAULT_DOCUMENT_TYPE;
    const fn = RULES[type] || (isSaleDeedType(type) ? validateSaleDeed : validateSaleDeed);
    const errors = fn(doc) || [];
    return {
      ok: errors.length === 0,
      errors,
      messages: errors.map((e) => e.message),
    };
  },
};

export default ValidationEngine;
