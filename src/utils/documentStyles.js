import { numberToWords } from './numberToWords';

/** Official IGR Gujarat / Garvi 2.0 document styling constants */
export const DOC = {
  fontFamily: '"Times New Roman", Times, serif',
  fontSize: '11pt',
  fontSizeSmall: '9pt',
  fontSizeTiny: '8pt',
  lineHeight: '1.55',
  color: '#000000',
  bg: '#ffffff',
  border: '1px solid #000000',
  borderDouble: '3px double #000000',
  pagePadding: '18mm 15mm',
  maxWidth: '794px',
};

export function formatDocDate(dateStr) {
  if (!dateStr) return '_______________';
  try {
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-GB');
  } catch {
    return dateStr;
  }
}

export function formatToday() {
  return new Date().toLocaleDateString('en-GB');
}

export function amountInWords(amount, lang = 'en') {
  if (!amount || isNaN(amount)) return lang === 'gu' ? 'રૂપિયા શૂન્ય પુરા' : 'Zero Rupees Only';
  return numberToWords(parseInt(amount, 10), lang);
}

export function formatCurrency(amount) {
  const n = parseFloat(amount) || 0;
  return `₹${n.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

export function calcStampDuty(saleAmount, jantriValue) {
  const base = Math.max(parseFloat(saleAmount) || 0, parseFloat(jantriValue) || 0);
  return Math.round(base * 0.049);
}

export function calcRegistrationFee(saleAmount, jantriValue) {
  const base = Math.max(parseFloat(saleAmount) || 0, parseFloat(jantriValue) || 0);
  return Math.round(base * 0.01);
}

/** Standard A4 page wrapper for each document section in PDF */
export function pageStyle(extra = {}) {
  return {
    width: '100%',
    maxWidth: DOC.maxWidth,
    boxSizing: 'border-box',
    padding: DOC.pagePadding,
    backgroundColor: DOC.bg,
    color: DOC.color,
    fontFamily: DOC.fontFamily,
    fontSize: DOC.fontSize,
    lineHeight: DOC.lineHeight,
    pageBreakAfter: 'always',
    breakAfter: 'page',
    ...extra,
  };
}

export function tableCell(style = {}) {
  return {
    border: '0.5px solid #000000',
    padding: '3px 6px',
    verticalAlign: 'middle',
    textAlign: 'center',
    fontSize: DOC.fontSizeSmall,
    lineHeight: 1.15,
    boxSizing: 'border-box',
    ...style,
  };
}

/** Outer frame for PDF data tables — pair with tableCell() 0.5px inner borders */
export function tableOuterStyle(extra = {}) {
  return {
    width: '100%',
    borderCollapse: 'collapse',
    borderSpacing: 0,
    border: '1px solid #000000',
    ...extra,
  };
}

export function sectionTitle(text, guText) {
  return { text, guText };
}
