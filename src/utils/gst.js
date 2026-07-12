import { PDF_DOWNLOAD_PRICE_INR, PLATFORM_GST_RATE } from '../constants/version';

function round2(n) {
  return Math.round((Number(n) + Number.EPSILON) * 100) / 100;
}

/**
 * Split a GST-inclusive amount into taxable value + tax.
 * Example: ₹999 @ 18% → taxable ₹846.61, GST ₹152.39 (CGST/SGST ₹76.20 each).
 */
export function splitInclusiveGst(totalInclusive = PDF_DOWNLOAD_PRICE_INR, rate = PLATFORM_GST_RATE) {
  const total = round2(totalInclusive);
  const taxableValue = round2(total / (1 + rate));
  const gstAmount = round2(total - taxableValue);
  const half = round2(gstAmount / 2);
  // Adjust last paise so CGST + SGST + taxable = total
  const cgst = half;
  const sgst = round2(gstAmount - cgst);

  return {
    totalInclusive: total,
    taxableValue,
    gstAmount,
    cgst,
    sgst,
    rate,
    ratePercent: round2(rate * 100),
    halfRatePercent: round2((rate * 100) / 2),
  };
}

export function formatInr(amount) {
  return `₹${Number(amount).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/**
 * ASCII-safe currency for jsPDF Helvetica (₹ is not in the built-in font and
 * renders as a stray "1" / broken glyphs).
 */
export function formatInrForPdf(amount) {
  const n = Number(amount).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `Rs. ${n}`;
}

export function createInvoiceNumber(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `INV-DMA-${y}${m}${d}-${rand}`;
}
