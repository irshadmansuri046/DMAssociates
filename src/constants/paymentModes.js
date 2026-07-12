export const PAYMENT_MODES = {
  Cash: { id: 'Cash', label: { en: 'Cash', gu: 'રોકડ' }, fields: ['amount', 'date', 'remarks'] },
  Cheque: { id: 'Cheque', label: { en: 'Cheque', gu: 'ચેક' }, fields: ['amount', 'bankName', 'branchName', 'chequeNumber', 'date', 'remarks'] },
  RTGS: { id: 'RTGS', label: { en: 'RTGS', gu: 'આરટીજીએસ' }, fields: ['amount', 'bankName', 'branchName', 'utrNumber', 'date', 'remarks'] },
  NEFT: { id: 'NEFT', label: { en: 'NEFT', gu: 'એનઈએફટી' }, fields: ['amount', 'bankName', 'branchName', 'utrNumber', 'date', 'remarks'] },
  IMPS: { id: 'IMPS', label: { en: 'IMPS', gu: 'આઈએમપીએસ' }, fields: ['amount', 'bankName', 'utrNumber', 'date', 'remarks'] },
  UPI: { id: 'UPI', label: { en: 'UPI', gu: 'યુપીઆઈ' }, fields: ['amount', 'utrNumber', 'date', 'remarks'] },
  DD: { id: 'DD', label: { en: 'Demand Draft', gu: 'ડિમાન્ડ ડ્રાફ્ટ' }, fields: ['amount', 'bankName', 'branchName', 'instrumentNo', 'date', 'remarks'] },
  Loan: { id: 'Loan', label: { en: 'Loan Disbursement', gu: 'લોન' }, fields: ['amount', 'bankName', 'branchName', 'transactionNumber', 'date', 'remarks'] },
};

export const PAYMENT_MODE_IDS = Object.keys(PAYMENT_MODES);

export function createEmptyPayment(mode = 'RTGS') {
  return {
    mode,
    amount: '',
    bankName: '',
    branchName: '',
    instrumentNo: '',
    chequeNumber: '',
    utrNumber: '',
    transactionNumber: '',
    date: '',
    remarks: '',
  };
}

export function sumPayments(payments = []) {
  return payments.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
}
