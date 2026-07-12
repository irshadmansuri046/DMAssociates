import { sumPayments } from '../../constants/paymentModes';

function err(field, message) {
  return { field, message };
}

export function validateSaleDeed(doc) {
  const errors = [];
  const sellers = doc.parties?.sellers || [];
  const buyers = doc.parties?.buyers || [];
  const p = doc.property || {};
  const t = doc.transaction || {};
  const witnesses = doc.witnesses || [];

  if (!sellers.some((s) => s.name?.trim())) errors.push(err('sellers', 'Seller name is required'));
  if (!buyers.some((b) => b.name?.trim())) errors.push(err('buyers', 'Buyer name is required'));
  if (!(p.blockSurveyNo || p.survey?.blockSurveyNo)?.toString().trim()) {
    errors.push(err('survey', 'Survey / Block number is required'));
  }
  if (!p.village?.trim()) errors.push(err('village', 'Village is required'));
  if (!t.totalSaleAmount || !(parseFloat(t.totalSaleAmount) > 0)) {
    errors.push(err('totalSaleAmount', 'Sale amount is required'));
  }
  if (!t.stampDutyAmount && t.stampDutyAmount !== 0) {
    errors.push(err('stampDutyAmount', 'Stamp duty amount is required'));
  }
  const area = p.carpetArea || p.totalPlotArea || p.areas?.carpetArea || p.areas?.totalPlotArea;
  if (!area) errors.push(err('area', 'Property area is required'));

  const namedWitnesses = witnesses.filter((w) => w.name?.trim());
  if (namedWitnesses.length < 2) errors.push(err('witnesses', 'Two witnesses are required'));

  sellers.forEach((s, i) => {
    if (s.name && !s.pan?.trim()) errors.push(err(`sellers.${i}.pan`, `Seller ${i + 1} PAN is required`));
  });
  buyers.forEach((b, i) => {
    if (b.name && !b.pan?.trim()) errors.push(err(`buyers.${i}.pan`, `Buyer ${i + 1} PAN is required`));
  });

  const isBuiltUp = p.isBuiltUp || p.permissions?.isBuiltUp || p.unitNumber || p.complexName;
  if (isBuiltUp && !(p.unitCardNo || p.revenueRecords?.propertyCardNo || p.govRecords?.propertyCard?.cardNo)) {
    errors.push(err('propertyCard', 'Property / Unit card number is required for built-up property'));
  }

  if (p.tenureType === 'new_tenure' || p.permissions?.tenureType === 'new_tenure') {
    if (!(p.naOrderNo || p.permissions?.naOrderNo)) {
      errors.push(err('naOrderNo', 'NA permission is required for new tenure'));
    }
  }

  const paid = sumPayments(t.payments || []);
  const total = parseFloat(t.totalSaleAmount) || 0;
  if (total > 0 && Math.abs(paid - total) > 0.99) {
    errors.push(err('payments', `Total payments (₹${paid.toLocaleString('en-IN')}) must equal sale consideration (₹${total.toLocaleString('en-IN')})`));
  }

  return errors;
}

export function validateGiftDeed(doc) {
  const errors = [];
  if (!doc.parties?.sellers?.some((s) => s.name?.trim())) errors.push(err('sellers', 'Donor is required'));
  if (!doc.parties?.buyers?.some((b) => b.name?.trim())) errors.push(err('buyers', 'Donee is required'));
  const p = doc.property || {};
  if (!(p.blockSurveyNo || p.survey?.blockSurveyNo)?.toString().trim()) {
    errors.push(err('survey', 'Survey / Block number is required'));
  }
  if (!p.village?.trim()) errors.push(err('village', 'Village is required'));
  const witnesses = (doc.witnesses || []).filter((w) => w.name?.trim());
  if (witnesses.length < 2) errors.push(err('witnesses', 'Two witnesses are required for gift deed'));
  if (!doc.instrument?.giftRelationship?.trim()) {
    errors.push(err('giftRelationship', 'Donor–Donee relationship is required'));
  }
  return errors;
}

export function validateGenericTransfer(doc, labels = { a: 'Party A', b: 'Party B' }) {
  const errors = [];
  if (!doc.parties?.sellers?.some((s) => s.name?.trim())) errors.push(err('sellers', `${labels.a} is required`));
  if (!doc.parties?.buyers?.some((b) => b.name?.trim())) errors.push(err('buyers', `${labels.b} is required`));
  if (!(doc.property?.blockSurveyNo || doc.property?.survey?.blockSurveyNo || doc.property?.village)) {
    errors.push(err('property', 'Property identification is required'));
  }
  const witnesses = (doc.witnesses || []).filter((w) => w.name?.trim());
  if (witnesses.length < 2) errors.push(err('witnesses', 'Two witnesses are required'));
  return errors;
}
