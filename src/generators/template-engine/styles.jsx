import React from 'react';
import { TEMPLATES, DEFAULT_TEMPLATE_ID } from '../../constants/templates';
import { SOFTWARE_VERSION, APP_NAME } from '../../constants/version';

export function getTemplateTheme(templateId = DEFAULT_TEMPLATE_ID) {
  return TEMPLATES[templateId] || TEMPLATES[DEFAULT_TEMPLATE_ID] || TEMPLATES.government;
}

export function pageShellStyle(theme, extra = {}) {
  const localeFont = theme.fonts?.gu || '"Noto Sans Gujarati", sans-serif';
  return {
    width: '794px',
    maxWidth: '794px',
    minHeight: '1123px',
    boxSizing: 'border-box',
    padding: theme.pagePadding,
    backgroundColor: '#ffffff',
    color: theme.colors.text,
    fontFamily: localeFont,
    fontSize: theme.fontSize || '10.5pt',
    lineHeight: theme.lineHeight,
    position: 'relative',
    pageBreakAfter: 'always',
    breakAfter: 'page',
    ...extra,
  };
}

/** Inner grid lines — 0.5px so adjacent cells don't look double-thick */
export const PDF_CELL_BORDER = '0.5px solid #000000';
/** Outer frame of the whole table */
export const PDF_TABLE_BORDER = '1px solid #000000';

/**
 * PDF table cell chrome.
 * html2canvas: no nested tables, no fixed heights, no flex — equal padding +
 * verticalAlign middle + tight lineHeight keeps text visually centered and
 * lets multi-line cells grow instead of clipping.
 */
export function tableCell(theme, extra = {}) {
  const {
    background,
    backgroundColor,
    width,
    fontWeight,
    fontSize,
    textAlign,
    padding,
    height,
    minHeight,
    ...rest
  } = extra;
  return {
    border: PDF_CELL_BORDER,
    padding: padding != null ? padding : '5px 7px',
    margin: 0,
    verticalAlign: 'middle',
    textAlign: textAlign || 'center',
    background: background || backgroundColor || undefined,
    backgroundColor: background || backgroundColor || undefined,
    width,
    fontWeight,
    fontSize: fontSize || (theme?.density === 'compact' ? '8pt' : '9pt'),
    lineHeight: 1.25,
    boxSizing: 'border-box',
    wordBreak: 'break-word',
    overflowWrap: 'anywhere',
    whiteSpace: 'normal',
    // only apply height when caller explicitly wants it (e.g. photo cells)
    ...(height != null ? { height } : {}),
    ...(minHeight != null ? { minHeight } : {}),
    ...rest,
  };
}

export function tableStyle(extra = {}) {
  return {
    width: '100%',
    borderCollapse: 'collapse',
    borderSpacing: 0,
    border: PDF_TABLE_BORDER,
    tableLayout: 'fixed',
    lineHeight: 1.25,
    ...extra,
  };
}

/**
 * PDF-safe table cell — 0.5px inner borders, padded, vertically middle.
 * Pair with tableStyle() (1px outer) to avoid a double-thick frame.
 */
export function PdfTableCell({
  theme,
  as: Tag = 'td',
  children,
  style = {},
  ...rest
}) {
  return (
    <Tag style={tableCell(theme || {}, style)} {...rest}>
      {children}
    </Tag>
  );
}

export { SOFTWARE_VERSION, APP_NAME };
