// Validation rules aligned with Gujarat SRO practice — scoped by document type

import { getDocumentRequirements } from '../constants/documentTypeRequirements';

export const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
export const AADHAAR_REGEX = /^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/;
export const AADHAAR_RAW_REGEX = /^[2-9]{1}[0-9]{11}$/;
export const CIN_REGEX = /^[LU]{1}[0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}$/;
export const MOBILE_REGEX = /^[6-9][0-9]{9}$/;

export function validatePAN(pan) {
  if (!pan) return false;
  return PAN_REGEX.test(pan.trim().toUpperCase());
}

export function validateAadhaar(aadhaar) {
  if (!aadhaar) return false;
  const cleaned = aadhaar.trim();
  return AADHAAR_REGEX.test(cleaned) || AADHAAR_RAW_REGEX.test(cleaned);
}

export function validateCIN(cin) {
  if (!cin) return false;
  return CIN_REGEX.test(cin.trim().toUpperCase());
}

export function validateMobile(mobile) {
  if (!mobile) return false;
  return MOBILE_REGEX.test(mobile.replace(/\s/g, ''));
}

function validateParty(party, requirePhoto = false) {
  const itemErrors = {};
  if (!party.name?.trim()) itemErrors.name = 'Name is required';
  if (!party.pan || !validatePAN(party.pan)) itemErrors.pan = 'Invalid PAN (e.g. ABCDE1234F)';
  if (!party.address?.trim()) itemErrors.address = 'Address is required';
  if (!party.mobile || !validateMobile(party.mobile)) itemErrors.mobile = 'Valid 10-digit mobile required (Garvi portal)';

  if (party.isCorporate) {
    if (!party.companyCin || !validateCIN(party.companyCin)) itemErrors.companyCin = 'Invalid 21-digit CIN';
    if (!party.registeredOffice?.trim()) itemErrors.registeredOffice = 'Registered office address is required';
    if (!party.authorisedSignatory?.trim()) itemErrors.authorisedSignatory = 'Authorised Signatory is required';
    if (requirePhoto && !party.photo) itemErrors.photo = 'Authorised signatory passport photo required for SRO';
  } else {
    if (!party.age || isNaN(parseInt(String(party.age).replace(/[^\d]/g, ''), 10)) || parseInt(String(party.age).replace(/[^\d]/g, ''), 10) <= 0) {
      itemErrors.age = 'Invalid age';
    }
    if (!party.occupation?.trim()) itemErrors.occupation = 'Occupation is required';
    if (!party.aadhaar || !validateAadhaar(party.aadhaar)) itemErrors.aadhaar = 'Invalid Aadhaar (12 digits)';
    if (requirePhoto && !party.photo) itemErrors.photo = 'Passport-size photo required (SRO mandatory)';
  }
  return Object.keys(itemErrors).length > 0 ? itemErrors : null;
}

/**
 * @param {number} stepIndex - index within the type-aware wizard steps list
 * @param {object} data - formData
 * @param {string[]} [stepKeys] - ordered keys e.g. ['parties','property','financial','compliance']
 */
export function validateStep(stepIndex, data, stepKeys) {
  const errors = {};
  const req = getDocumentRequirements(data.documentType || 'sale_deed_flat');
  const keys = stepKeys || ['parties', 'property', 'financial', 'compliance'].filter((k) => {
    if (k === 'financial') return req.showFinancialStep;
    return true;
  });
  const stepKey = keys[stepIndex];

  if (stepKey === 'parties') {
    const sellers = data.parties?.sellers || [];
    const buyers = data.parties?.buyers || [];

    if (sellers.filter((s) => s.name?.trim()).length < req.minSellers) {
      errors.sellers = req.minSellers > 1
        ? `At least ${req.minSellers} parties are required`
        : 'At least one first-party entry is required';
    } else if (sellers.length) {
      errors.sellers = sellers.map((s) => validateParty(s, false));
      if (errors.sellers.every((x) => x === null)) delete errors.sellers;
    }

    if (req.minBuyers > 0) {
      if (buyers.filter((b) => b.name?.trim()).length < req.minBuyers) {
        errors.buyers = 'At least one second-party entry is required';
      } else if (buyers.length) {
        errors.buyers = buyers.map((b) => validateParty(b, false));
        if (errors.buyers.every((x) => x === null)) delete errors.buyers;
      }
    }
  }

  if (stepKey === 'property') {
    const p = data.property || {};
    if (req.showProperty) {
      if (!p.propertyType) errors.propertyType = 'Property type is required';
      if (!p.district?.trim()) errors.district = 'District is required';
      if (!p.taluka?.trim()) errors.taluka = 'Taluka is required';
      if (!p.subRegistrarOffice?.trim()) errors.subRegistrarOffice = 'Sub-Registrar office is required';
      if (!p.village?.trim()) errors.village = 'Village is required';
      if (!p.blockSurveyNo?.trim()) errors.blockSurveyNo = 'Survey number is required';

      if (req.requireArea) {
        if (!p.totalPlotArea || isNaN(p.totalPlotArea) || parseFloat(p.totalPlotArea) <= 0) {
          errors.totalPlotArea = 'Invalid total land area';
        }
      }
      if (req.requireJantri) {
        if (!p.jantriValue || isNaN(p.jantriValue) || parseFloat(p.jantriValue) <= 0) {
          errors.jantriValue = 'Invalid Jantri valuation';
        }
      }
      if (req.require712) {
        const rev = p.revenueRecords || {};
        if (!rev.extract712No?.trim()) errors.extract712No = '7/12 extract number is required';
        if (!rev.extract712Date) errors.extract712Date = '7/12 extract date is required';
      }
      if (req.requireBoundaries) {
        const b = p.boundaries || {};
        if (!b.east?.trim()) errors.east = 'East boundary is required';
        if (!b.west?.trim()) errors.west = 'West boundary is required';
        if (!b.north?.trim()) errors.north = 'North boundary is required';
        if (!b.south?.trim()) errors.south = 'South boundary is required';
      }

      if (p.tenureType === 'new_tenure' && req.showGovRecords) {
        if (!p.collectorPermissionOrderNo?.trim()) errors.collectorPermissionOrderNo = 'Collector order no. required for New Tenure';
        if (!p.collectorPermissionDate) errors.collectorPermissionDate = 'Collector order date required';
      }
      if ((p.isBuiltUp || (p.constructionArea && parseFloat(p.constructionArea) > 0)) && req.showGovRecords) {
        if (!p.naOrderNo?.trim()) errors.naOrderNo = 'NA conversion order is required';
        if (!p.naOrderDate) errors.naOrderDate = 'NA conversion date is required';
      }
    }
  }

  if (stepKey === 'financial') {
    const t = data.transaction || {};
    const inst = data.instrument || {};

    if (req.showConsideration && req.amountLabelKey !== 'none') {
      if (!t.totalSaleAmount || isNaN(t.totalSaleAmount) || parseFloat(t.totalSaleAmount) <= 0) {
        // lease uses rent in instrument — skip totalSaleAmount if rent fields used
        if (!(req.amountLabelKey === 'rent' || req.amountLabelKey === 'licenseFee')) {
          errors.totalSaleAmount = 'Amount is required';
        }
      }
    }

    if ((req.amountLabelKey === 'rent' || req.amountLabelKey === 'licenseFee') && !inst.rentMonthly) {
      errors.rentMonthly = 'Monthly rent / fee is required';
    }
    if (req.amountLabelKey === 'loan' && !inst.loanAmount && !t.totalSaleAmount) {
      errors.loanAmount = 'Loan amount is required';
    }

    if (req.showStampDuty) {
      if (!t.stampDutyReceiptNo?.trim()) errors.stampDutyReceiptNo = 'Stamp duty receipt is required';
      if (!t.stampDutyAmount || isNaN(t.stampDutyAmount) || parseFloat(t.stampDutyAmount) < 0) {
        errors.stampDutyAmount = 'Invalid stamp duty amount';
      }
    }
    if (req.showRegistrationFee) {
      if (!t.registrationFeeReceiptNo?.trim()) errors.registrationFeeReceiptNo = 'Registration fee receipt is required';
      if (!t.registrationFeeAmount || isNaN(t.registrationFeeAmount) || parseFloat(t.registrationFeeAmount) < 0) {
        errors.registrationFeeAmount = 'Invalid registration fee amount';
      }
    }

    if (req.showTds && parseFloat(t.totalSaleAmount || 0) >= 5000000) {
      if (!t.tdsForm26QB?.trim()) errors.tdsForm26QB = 'Form 26QB acknowledgement required (Section 194-IA, ≥ ₹50 lakh)';
      if (!t.tdsChallanNo?.trim()) errors.tdsChallanNo = 'TDS challan number is required';
    }

    if (req.showPaymentInstallments) {
      const saleVal = parseFloat(t.totalSaleAmount) || 0;
      if (!t.payments?.length) {
        errors.paymentsSummary = 'At least one payment entry is required';
      } else {
        let totalPaid = 0;
        errors.payments = t.payments.map((p) => {
          const itemErrors = {};
          if (!p.bankName?.trim()) itemErrors.bankName = 'Required';
          if (!p.instrumentNo?.trim()) itemErrors.instrumentNo = 'Required';
          if (!p.date) itemErrors.date = 'Required';
          if (!p.amount || isNaN(p.amount) || parseFloat(p.amount) <= 0) {
            itemErrors.amount = 'Required > 0';
          } else {
            totalPaid += parseFloat(p.amount);
          }
          return Object.keys(itemErrors).length > 0 ? itemErrors : null;
        });
        if (errors.payments.every((x) => x === null)) {
          delete errors.payments;
          if (req.requirePaymentsMatch && saleVal > 0 && Math.abs(totalPaid - saleVal) > 0.01) {
            errors.paymentsSummary = `Sum of installments (₹${totalPaid.toLocaleString()}) must match total (₹${saleVal.toLocaleString()})`;
          }
        }
      }
    }

    // Soft-required instrument fields by type
    for (const field of req.instrumentFields || []) {
      if (field === 'giftNaturalLove' || field === 'willRevokesPrior' || field === 'poaIrrevocable') continue;
      const val = inst[field];
      if (val === undefined || val === null || String(val).trim() === '') {
        // only enforce a few critical ones
        if (['giftRelationship', 'loanAmount', 'poaPowers', 'partitionShares', 'willExecutor'].includes(field)) {
          errors[field] = 'This field is required for the selected document type';
        }
      }
    }
  }

  if (stepKey === 'compliance') {
    const c = data.compliance || {};
    for (const key of req.complianceKeys) {
      if (!c[key]) {
        errors.compliance = `Please confirm: ${key}`;
        break;
      }
    }

    const witnesses = data.witnesses || [];
    const needed = req.minWitnesses || 0;
    if (needed > 0) {
      while (witnesses.length < needed) witnesses.push({});
      errors.witnesses = witnesses.slice(0, Math.max(witnesses.length, needed)).map((w) => {
        const we = {};
        if (!w.name?.trim()) we.name = 'Witness name required';
        if (!w.address?.trim()) we.address = 'Witness address required';
        if (!w.pan || !validatePAN(w.pan)) we.pan = 'Valid PAN required';
        if (!w.aadhaar || !validateAadhaar(w.aadhaar)) we.aadhaar = 'Valid Aadhaar required';
        return Object.keys(we).length > 0 ? we : null;
      });
      if (errors.witnesses.every((x) => x === null)) delete errors.witnesses;
    }

    const ex = data.execution || {};
    if (!ex.executionDate) errors.executionDate = 'Execution date is required';
    if (!ex.executionPlace?.trim()) errors.executionPlace = 'Place of execution / SRO office is required';
    if (req.requireGarvi && !ex.garviApplicationNo?.trim()) {
      errors.garviApplicationNo = 'Garvi application number is required';
    }
  }

  return errors;
}
