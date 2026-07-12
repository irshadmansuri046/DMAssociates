/**
 * Layout tokens measured from AALEKH/govt-sale-deed-format-in-gujarati.pdf
 * (scanned Gujarat SRO sale deed — wide margins, ~1.65–1.8 leading, narrative parties).
 */
export const GOVT = {
  fontFamily: '"Noto Sans Gujarati", "Shruti", "Nirmala UI", sans-serif',
  fontSize: '11pt',
  fontSizeTitle: '12.5pt',
  fontSizeSmall: '10.5pt',
  fontSizeTiny: '9.5pt',
  lineHeight: 1.7,
  paragraphGap: '14px',
  sectionGap: '18px',
  color: '#000000',
  /** ~25mm / 1\" margins like the scanned deed */
  pagePadding: '22mm 24mm 20mm 24mm',
  pageWidth: '794px',
  pageHeight: '1123px',
  cellBorder: '0.5px solid #000000',
  tableBorder: '1px solid #000000',
};

export const govPageShell = (extra = {}) => ({
  width: GOVT.pageWidth,
  maxWidth: GOVT.pageWidth,
  minHeight: GOVT.pageHeight,
  boxSizing: 'border-box',
  padding: GOVT.pagePadding,
  backgroundColor: '#ffffff',
  color: GOVT.color,
  fontFamily: GOVT.fontFamily,
  fontSize: GOVT.fontSize,
  lineHeight: GOVT.lineHeight,
  position: 'relative',
  pageBreakAfter: 'always',
  breakAfter: 'page',
  ...extra,
});

export const pStyle = {
  margin: `0 0 ${GOVT.paragraphGap} 0`,
  textAlign: 'justify',
  fontSize: GOVT.fontSize,
  lineHeight: GOVT.lineHeight,
};

export const headingStyle = {
  margin: `0 0 ${GOVT.paragraphGap} 0`,
  fontWeight: 700,
  fontSize: GOVT.fontSize,
  lineHeight: GOVT.lineHeight,
  textDecoration: 'underline',
  textAlign: 'left',
};

export const titleStyle = {
  textAlign: 'center',
  fontWeight: 700,
  fontSize: GOVT.fontSizeTitle,
  lineHeight: 1.5,
  textDecoration: 'underline',
  margin: `0 0 ${GOVT.sectionGap} 0`,
};

export const cellStyle = (extra = {}) => ({
  border: GOVT.cellBorder,
  padding: '7px 9px',
  verticalAlign: 'middle',
  fontSize: GOVT.fontSizeTiny,
  lineHeight: 1.4,
  boxSizing: 'border-box',
  wordBreak: 'break-word',
  ...extra,
});

export const tableStyle = (extra = {}) => ({
  width: '100%',
  maxWidth: '100%',
  borderCollapse: 'collapse',
  borderSpacing: 0,
  border: GOVT.tableBorder,
  margin: `${GOVT.paragraphGap} 0 ${GOVT.sectionGap}`,
  tableLayout: 'fixed',
  ...extra,
});

/** Shared ID-line style — wraps long Aadhaar/PAN/Mobile rows */
export const idLineStyle = {
  margin: '0 0 3px 18px',
  textAlign: 'left',
  fontSize: GOVT.fontSizeSmall,
  lineHeight: 1.45,
  wordBreak: 'break-word',
};
