/**
 * Shared Government Style layout tokens.
 *
 * GOVT  — older compact scale (used by Builder Style bundle).
 * DEED  — finalized typography matched to farm_land_sale_deed.pdf
 *         (Noto Serif Gujarati stand-in for LMG-Rupen/Arun, 15.5pt / ~1.78).
 *         Used by Farm Land + Plot (and other) Government Style sale deeds.
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
  pagePadding: '22mm 24mm 20mm 24mm',
  pageWidth: '794px',
  pageHeight: '1123px',
  cellBorder: '0.5px solid #000000',
  tableBorder: '1px solid #000000',
};

/** Finalized government sale-deed typography (Farm Land reference) */
export const DEED = {
  fontFamily: '"Noto Serif Gujarati", "Noto Sans Gujarati", "Shruti", "Nirmala UI", serif',
  fontSize: '15.5pt',
  fontSizeTitle: '18pt',
  fontSizeHeading: '15.5pt',
  fontSizeSmall: '14pt',
  fontSizeTiny: '13pt',
  fontSizeFooter: '13pt',
  fontSizeBrand: '9pt',
  fontSizePageNum: '14pt',
  lineHeight: 1.78,
  paragraphGap: '12px',
  sectionGap: '16px',
  color: '#000000',
  pagePadding: '14mm 18mm 12mm 18mm',
  pageWidth: '794px',
  pageHeight: '1123px',
  cellBorder: '0.5px solid #000000',
  tableBorder: '1px solid #000000',
};

export const govPageShell = (extra = {}, tokens = GOVT) => ({
  width: tokens.pageWidth,
  maxWidth: tokens.pageWidth,
  minHeight: tokens.pageHeight,
  boxSizing: 'border-box',
  padding: tokens.pagePadding,
  backgroundColor: '#ffffff',
  color: tokens.color,
  fontFamily: tokens.fontFamily,
  fontSize: tokens.fontSize,
  lineHeight: tokens.lineHeight,
  position: 'relative',
  pageBreakAfter: 'always',
  breakAfter: 'page',
  ...extra,
});

/** Compact styles (builder / legacy) */
export const pStyle = {
  margin: `0 0 ${GOVT.paragraphGap} 0`,
  textAlign: 'justify',
  fontSize: GOVT.fontSize,
  lineHeight: GOVT.lineHeight,
  fontFamily: GOVT.fontFamily,
};

export const headingStyle = {
  margin: `0 0 ${GOVT.paragraphGap} 0`,
  fontWeight: 700,
  fontSize: GOVT.fontSize,
  lineHeight: GOVT.lineHeight,
  textDecoration: 'underline',
  textAlign: 'left',
  fontFamily: GOVT.fontFamily,
};

export const titleStyle = {
  textAlign: 'center',
  fontWeight: 700,
  fontSize: GOVT.fontSizeTitle,
  lineHeight: 1.5,
  textDecoration: 'underline',
  margin: `0 0 ${GOVT.sectionGap} 0`,
  fontFamily: GOVT.fontFamily,
};

export const cellStyle = (extra = {}) => ({
  border: GOVT.cellBorder,
  padding: '7px 9px',
  verticalAlign: 'middle',
  fontSize: GOVT.fontSizeTiny,
  lineHeight: 1.4,
  boxSizing: 'border-box',
  wordBreak: 'break-word',
  fontFamily: GOVT.fontFamily,
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

export const idLineStyle = {
  margin: '0 0 3px 18px',
  textAlign: 'left',
  fontSize: GOVT.fontSizeSmall,
  lineHeight: 1.45,
  wordBreak: 'break-word',
  fontFamily: GOVT.fontFamily,
};

/** Deed typography helpers (farm / plot government style) */
export const deedPStyle = {
  margin: `0 0 ${DEED.paragraphGap} 0`,
  textAlign: 'justify',
  fontFamily: DEED.fontFamily,
  fontSize: DEED.fontSize,
  lineHeight: DEED.lineHeight,
  textIndent: '1.25em',
  letterSpacing: 'normal',
  wordSpacing: 'normal',
};

export const deedPlainStyle = {
  margin: `0 0 ${DEED.paragraphGap} 0`,
  textAlign: 'left',
  fontFamily: DEED.fontFamily,
  fontSize: DEED.fontSize,
  lineHeight: DEED.lineHeight,
  textIndent: 0,
  letterSpacing: 'normal',
  wordSpacing: 'normal',
};

export const deedHeadingStyle = {
  margin: `0 0 ${DEED.paragraphGap} 0`,
  fontWeight: 700,
  fontFamily: DEED.fontFamily,
  fontSize: DEED.fontSizeHeading,
  lineHeight: DEED.lineHeight,
  textDecoration: 'underline',
  textAlign: 'left',
  textIndent: 0,
};

export const deedTitleStyle = {
  textAlign: 'center',
  fontWeight: 700,
  fontFamily: DEED.fontFamily,
  fontSize: DEED.fontSizeTitle,
  lineHeight: 1.45,
  textDecoration: 'underline',
  margin: `0 0 ${DEED.sectionGap} 0`,
};

export const deedCellStyle = (extra = {}) => ({
  border: DEED.cellBorder,
  padding: '6px 8px',
  verticalAlign: 'middle',
  fontFamily: DEED.fontFamily,
  fontSize: DEED.fontSizeSmall,
  lineHeight: 1.45,
  boxSizing: 'border-box',
  wordBreak: 'normal',
  overflowWrap: 'normal',
  ...extra,
});

export const deedTableStyle = (extra = {}) => ({
  width: '100%',
  maxWidth: '100%',
  borderCollapse: 'collapse',
  borderSpacing: 0,
  border: DEED.tableBorder,
  margin: `${DEED.paragraphGap} 0 ${DEED.sectionGap}`,
  tableLayout: 'fixed',
  height: 'auto',
  ...extra,
});

export const deedIdLineStyle = {
  margin: '0 0 3px 18px',
  textAlign: 'left',
  fontFamily: DEED.fontFamily,
  fontSize: DEED.fontSizeSmall,
  lineHeight: 1.5,
  wordBreak: 'break-word',
};
