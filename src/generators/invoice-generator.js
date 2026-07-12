import { jsPDF } from 'jspdf';
import {
  APP_NAME,
  INVOICE_ISSUER_NAME,
  PDF_DOWNLOAD_PRICE_INR,
  SOFTWARE_VERSION,
} from '../constants/version';
import { createInvoiceNumber, formatInrForPdf, splitInclusiveGst } from '../utils/gst';

function fmtDate(iso) {
  try {
    const d = iso ? new Date(iso) : new Date();
    return d.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return new Date().toLocaleDateString('en-IN');
  }
}

/**
 * Generate a GST tax invoice PDF for the platform PDF unlock fee.
 * Price is GST-inclusive; breakup shows taxable + CGST/SGST.
 */
export async function generateTaxInvoicePdf({
  user,
  payment,
  documentTypeLabel = 'Legal Document PDF',
  amountInclusive = PDF_DOWNLOAD_PRICE_INR,
} = {}) {
  const paidAt = payment?.paidAt || new Date().toISOString();
  const invoiceNo = payment?.invoiceNo || createInvoiceNumber(new Date(paidAt));
  const gst = splitInclusiveGst(amountInclusive);
  const billToName = user?.fullName || user?.email || 'Customer';
  const billToEmail = user?.email || '—';
  const method = (payment?.method || 'upi').toUpperCase();
  const payerRef = payment?.payerRef || payment?.upiId || (payment?.cardLast4 ? `****${payment.cardLast4}` : '—');

  const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
  const pageW = pdf.internal.pageSize.getWidth();
  const margin = 16;
  let y = 18;

  const line = (x1, y1, x2, y2) => {
    pdf.setDrawColor(200);
    pdf.line(x1, y1, x2, y2);
  };

  // Header
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(18);
  pdf.setTextColor(6, 78, 59);
  pdf.text(INVOICE_ISSUER_NAME, margin, y);

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(9);
  pdf.setTextColor(80);
  pdf.text('Legal Document Generator · Gujarat', margin, y + 6);
  pdf.text(`Software v${SOFTWARE_VERSION}`, margin, y + 11);

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(16);
  pdf.setTextColor(15, 23, 42);
  pdf.text('TAX INVOICE', pageW - margin, y, { align: 'right' });
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(9);
  pdf.setTextColor(80);
  pdf.text('Original for Recipient', pageW - margin, y + 6, { align: 'right' });

  y += 20;
  line(margin, y, pageW - margin, y);
  y += 8;

  // Invoice meta
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(10);
  pdf.setTextColor(15, 23, 42);
  pdf.text('Invoice details', margin, y);
  pdf.text('Issued by', pageW / 2 + 4, y);
  y += 6;
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(9);
  pdf.setTextColor(40);
  pdf.text(`Invoice No: ${invoiceNo}`, margin, y);
  pdf.text(INVOICE_ISSUER_NAME, pageW / 2 + 4, y);
  y += 5;
  pdf.text(`Invoice Date: ${fmtDate(paidAt)}`, margin, y);
  pdf.text('State: Gujarat', pageW / 2 + 4, y);
  y += 5;
  pdf.text(`Payment: ${method}`, margin, y);
  pdf.text('GST inclusive pricing', pageW / 2 + 4, y);
  y += 5;
  pdf.text(`Reference: ${payerRef}`, margin, y);
  y += 10;

  // Bill to
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(10);
  pdf.setTextColor(15, 23, 42);
  pdf.text('Bill to', margin, y);
  y += 6;
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(9);
  pdf.setTextColor(40);
  pdf.text(String(billToName), margin, y);
  y += 5;
  pdf.text(String(billToEmail), margin, y);
  if (user?.role) {
    y += 5;
    pdf.text(`Account role: ${user.role}`, margin, y);
  }
  y += 10;
  line(margin, y, pageW - margin, y);
  y += 8;

  // Table header
  const colDesc = margin;
  const colTaxable = 118;
  const colGst = 148;
  const colAmount = pageW - margin;

  pdf.setFillColor(236, 253, 245);
  pdf.rect(margin, y - 4, pageW - margin * 2, 8, 'F');
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(8);
  pdf.setTextColor(6, 78, 59);
  pdf.text('Description', colDesc, y);
  pdf.text('Taxable', colTaxable, y, { align: 'right' });
  pdf.text('GST', colGst, y, { align: 'right' });
  pdf.text('Amount', colAmount, y, { align: 'right' });
  y += 8;

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(9);
  pdf.setTextColor(30);
  const descLines = pdf.splitTextToSize(`${documentTypeLabel} — Platform service fee`, 90);
  pdf.text(descLines, colDesc, y);
  pdf.text(formatInrForPdf(gst.taxableValue), colTaxable, y, { align: 'right' });
  pdf.text(formatInrForPdf(gst.gstAmount), colGst, y, { align: 'right' });
  pdf.text(formatInrForPdf(gst.totalInclusive), colAmount, y, { align: 'right' });
  y += Math.max(descLines.length * 5, 8) + 4;

  pdf.setFontSize(8);
  pdf.setTextColor(100);
  pdf.text(`HSN/SAC: 998314 · GST @ ${gst.ratePercent}% (inclusive of tax)`, colDesc, y);
  y += 10;
  line(margin, y, pageW - margin, y);
  y += 8;

  // Tax breakup
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(10);
  pdf.setTextColor(15, 23, 42);
  pdf.text('Tax breakup (GST inclusive)', margin, y);
  y += 7;
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(9);
  pdf.setTextColor(40);

  const rows = [
    ['Taxable value', formatInrForPdf(gst.taxableValue)],
    [`CGST @ ${gst.halfRatePercent}%`, formatInrForPdf(gst.cgst)],
    [`SGST @ ${gst.halfRatePercent}%`, formatInrForPdf(gst.sgst)],
    [`Total GST (${gst.ratePercent}%)`, formatInrForPdf(gst.gstAmount)],
  ];
  rows.forEach(([label, value]) => {
    pdf.text(label, margin, y);
    pdf.text(value, pageW - margin, y, { align: 'right' });
    y += 6;
  });

  y += 2;
  pdf.setFillColor(6, 78, 59);
  pdf.rect(margin, y - 5, pageW - margin * 2, 10, 'F');
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(11);
  pdf.setTextColor(255);
  pdf.text('Grand total (inclusive of GST)', margin + 3, y + 1.5);
  pdf.text(formatInrForPdf(gst.totalInclusive), pageW - margin - 3, y + 1.5, { align: 'right' });
  y += 14;

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8);
  pdf.setTextColor(90);
  const notes = [
    'Note: The service charge is inclusive of GST. Taxable value and GST have been reverse-calculated from the inclusive amount.',
    'This is a computer-generated tax invoice and does not require a physical signature.',
    `Issued by ${INVOICE_ISSUER_NAME} · ${APP_NAME}`,
  ];
  notes.forEach((n) => {
    const wrapped = pdf.splitTextToSize(n, pageW - margin * 2);
    pdf.text(wrapped, margin, y);
    y += wrapped.length * 4 + 2;
  });

  y = Math.max(y + 8, 260);
  line(margin, y, pageW - margin, y);
  y += 6;
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(9);
  pdf.setTextColor(15, 23, 42);
  pdf.text(`For ${INVOICE_ISSUER_NAME}`, pageW - margin, y, { align: 'right' });
  y += 10;
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8);
  pdf.setTextColor(100);
  pdf.text('Authorised signatory', pageW - margin, y, { align: 'right' });

  const filename = `${invoiceNo}.pdf`;
  pdf.save(filename);
  return { filename, invoiceNo, gst };
}

export default generateTaxInvoicePdf;
