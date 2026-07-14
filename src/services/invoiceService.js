import { INVOICE_ISSUER_NAME, PDF_DOWNLOAD_PRICE_INR } from '../constants/version';
import { getDocumentTypeLabel } from '../constants/documentTypes';
import { getSessionUser } from './authService';
import { remoteSaveInvoice } from './supabaseDocuments';

/**
 * Build and persist an invoice row for the platform unlock fee.
 */
export async function savePlatformInvoice({
  payment,
  documentType = 'sale_deed_flat',
  documentId = null,
  user = getSessionUser(),
} = {}) {
  if (!payment?.invoiceNo) {
    throw new Error('Invoice number is required');
  }

  const descriptionBase = getDocumentTypeLabel(documentType, 'en') || 'Sale Deed';
  const payload = {
    invoiceNo: payment.invoiceNo,
    invoiceDate: payment.paidAt || new Date().toISOString(),
    issuedBy: INVOICE_ISSUER_NAME,
    billToName: user?.fullName || user?.email || 'Customer',
    billToEmail: user?.email || '',
    description: `${descriptionBase} — Platform service fee`,
    documentType,
    documentId,
    amountInclusive: payment.amount ?? PDF_DOWNLOAD_PRICE_INR,
    amount: payment.amount ?? PDF_DOWNLOAD_PRICE_INR,
    taxableValue: payment.taxableValue,
    cgst: payment.cgst,
    sgst: payment.sgst,
    gstAmount: payment.gstAmount,
    gstRatePercent: payment.gstRatePercent ?? 18,
    currency: payment.currency || 'INR',
    paymentMethod: payment.method || 'upi',
    payerRef: payment.payerRef || payment.upiId || null,
    status: 'paid',
    details: {
      ...payment,
      userId: user?.id || null,
      userRole: user?.role || null,
      gstInclusive: true,
    },
  };

  return remoteSaveInvoice(payload);
}

export default { savePlatformInvoice };
