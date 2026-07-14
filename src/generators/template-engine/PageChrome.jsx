import React from 'react';
import { getTemplateTheme, pageShellStyle } from './styles';
import { APP_NAME, SOFTWARE_VERSION, WATERMARK_TEXT } from '../../constants/version';
import { getDocumentTypeLabel } from '../../constants/documentTypes';
import { formatGuDate, toGuDigits } from '../../utils/aalekhDocumentUtils';

/** Diagonal low-opacity watermark — app brand */
export function DiagonalWatermark({ text = WATERMARK_TEXT }) {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          transform: 'rotate(-32deg)',
          opacity: 0.1,
          fontSize: '42pt',
          fontWeight: 700,
          letterSpacing: '4px',
          color: '#111827',
          whiteSpace: 'nowrap',
          userSelect: 'none',
        }}
      >
        {String(text || WATERMARK_TEXT).toUpperCase()}
      </div>
    </div>
  );
}

export function DocumentHeader({ doc, pageNum, totalPages, locale = 'gu' }) {
  const theme = getTemplateTheme(doc.templateId);
  const p = doc.property || {};
  const propertyName = p.complexName || p.siteName || p.village || '—';
  const docNo = doc.documentNumber || doc.execution?.documentSerialNo || '—';
  const docDate = formatGuDate(doc.registrationDate || doc.execution?.executionDate);
  const typeLabel = getDocumentTypeLabel(doc.documentType, locale);

  return (
    <div
      className="deed-keep"
      style={{
        borderBottom: theme.showHeaderRule === false ? 'none' : (theme.headerBorder || `1px solid ${theme.colors.border}`),
        background: theme.colors.headerBg || 'transparent',
        padding: theme.colors.headerBg && theme.colors.headerBg !== 'transparent' ? '8px 10px' : '0 0 6px',
        marginBottom: '10px',
        fontSize: theme.density === 'compact' ? '7.5pt' : '8pt',
        color: theme.colors.headerText || theme.colors.muted,
        position: 'relative',
        zIndex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '4px 8px',
      }}
    >
      <div>Doc No: {docNo}</div>
      <div style={{ textAlign: 'center', fontWeight: 700, color: theme.colors.text }}>{typeLabel}</div>
      <div style={{ textAlign: 'right' }}>
        Page {toGuDigits(pageNum)} / {toGuDigits(totalPages)}
      </div>
      <div>Property: {propertyName}</div>
      <div style={{ textAlign: 'center' }}>SRO: {p.subRegistrarOffice || '—'}</div>
      <div style={{ textAlign: 'right' }}>Date: {docDate}</div>
      <div style={{ gridColumn: '1 / -1', fontSize: '7pt', opacity: 0.85 }}>
        Template: {doc.templateId || 'government'} · Type: {doc.documentType || 'sale_deed_flat'}
      </div>
    </div>
  );
}

export function DocumentFooter({ doc }) {
  const theme = getTemplateTheme(doc.templateId);
  const genDate = (doc.generatedAt || new Date().toISOString()).slice(0, 10);
  return (
    <div
      className="deed-keep"
      style={{
        borderTop: theme.showHeaderRule === false ? 'none' : `1px solid ${theme.colors.border}`,
        marginTop: '12px',
        paddingTop: '6px',
        fontSize: '7.5pt',
        color: theme.colors.muted,
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        justifyContent: 'space-between',
        gap: '8px',
        flexWrap: 'wrap',
      }}
    >
      <span>Created by : {APP_NAME}</span>
      <span>Document ID: {doc.id}</span>
      <span>Generated: {genDate}</span>
      <span>v{doc.version || SOFTWARE_VERSION}</span>
      <span>Confidential</span>
    </div>
  );
}

export function DocumentPage({
  doc,
  pageNum,
  totalPages,
  children,
  locale = 'gu',
  showHeader = true,
  /** Blank band at top for printing on government stamp paper (first dastavej page) */
  stampReserve = false,
  stampReserveHeight = '480px',
}) {
  const theme = getTemplateTheme(doc.templateId);
  const shell = pageShellStyle(theme, stampReserve ? { paddingTop: '8mm' } : {});

  return (
    <div
      style={shell}
      className={`gov-doc-page deed-engine-page template-${doc.templateId || 'government'} doctype-${doc.documentType || 'sale_deed_flat'}${stampReserve ? ' deed-stamp-page' : ''}`}
      data-document-type={doc.documentType || 'sale_deed_flat'}
      data-template-id={doc.templateId || 'government'}
      data-stamp-reserve={stampReserve ? 'true' : 'false'}
    >
      <DiagonalWatermark />
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
        {stampReserve && (
          <div
            aria-hidden
            className="deed-stamp-reserve"
            style={{
              height: stampReserveHeight,
              flexShrink: 0,
              width: '100%',
              boxSizing: 'border-box',
              /* Keep completely empty — physical govt stamp sits here when printing page 2 */
            }}
          />
        )}
        {showHeader && <DocumentHeader doc={doc} pageNum={pageNum} totalPages={totalPages} locale={locale} />}
        <div style={{ flex: '0 0 auto' }}>{children}</div>
        <div style={{ flex: 1, minHeight: 8 }} aria-hidden />
        <DocumentFooter doc={doc} />
      </div>
    </div>
  );
}
