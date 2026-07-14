import React from 'react';
import { getTemplateTheme, pageShellStyle, tableStyle, PdfTableCell, APP_NAME, SOFTWARE_VERSION } from './styles';
import { DiagonalWatermark } from './PageChrome';
import { getDocumentTypeLabel } from '../../constants/documentTypes';
import { getPartyRoles } from '../../constants/partyRoles';
import { formatGuCurrency, formatGuDate, toGuDigits } from '../../utils/aalekhDocumentUtils';

/**
 * Cover page — titles and party labels follow document type; chrome follows template skin.
 */
export default function EngineCoverPage({ doc, qrDataUrl, locale = 'gu' }) {
  const theme = getTemplateTheme(doc.templateId);
  const roles = getPartyRoles(doc.documentType);
  const p = doc.property || {};
  const t = doc.transaction || {};
  const sellers = doc.parties?.sellers || [];
  const buyers = doc.parties?.buyers || [];
  const id = doc.identifier || {};
  const branding = doc.branding || {};
  const propertyName = p.complexName || p.siteName || p.village || '—';
  const genDate = (doc.generatedAt || new Date().toISOString()).slice(0, 10);
  const preparedBy = id.preparedBy || id.name || branding.orgName || APP_NAME;
  const typeLabel = getDocumentTypeLabel(doc.documentType, locale);
  const coverFirst = roles.coverFirst[locale] || roles.coverFirst.en;
  const coverSecond = roles.coverSecond[locale] || roles.coverSecond.en;
  const amountLabel = roles.amountLabel[locale] || roles.amountLabel.en;

  const row = (label, value, valueAlign = 'left') => (
    <tr key={label}>
      <PdfTableCell theme={theme} style={{ width: '32%', fontWeight: 700 }}>{label}</PdfTableCell>
      <PdfTableCell theme={theme} style={{ textAlign: valueAlign }}>{value || '—'}</PdfTableCell>
    </tr>
  );

  return (
    <div
      style={{
        ...pageShellStyle(theme),
        border: theme.coverBorder && theme.coverBorder !== 'none' ? theme.coverBorder : undefined,
      }}
      className={`gov-doc-page deed-engine-cover template-${doc.templateId || 'government'} doctype-${doc.documentType || 'sale_deed_flat'}`}
      data-document-type={doc.documentType || 'sale_deed_flat'}
      data-template-id={doc.templateId || 'government'}
    >
      <DiagonalWatermark />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
          <div>
            <div style={{ fontSize: '11pt', fontWeight: 700 }}>{id.name || 'Advocate / Presenter'}</div>
            <div style={{ fontSize: '9pt', color: theme.colors.muted }}>Mo.: {toGuDigits(id.mobile || branding.mobile || '—')}</div>
          </div>
          <div style={{ textAlign: 'center', flex: 1 }}>
            {branding.logo ? (
              <img src={branding.logo} alt="logo" style={{ height: 48, objectFit: 'contain' }} />
            ) : (
              <div style={{ fontSize: '16pt', fontWeight: 700, letterSpacing: '1px' }}>{branding.orgName || APP_NAME}</div>
            )}
            <div style={{ fontSize: '8pt', color: theme.colors.muted, marginTop: 2 }}>
              {(branding.orgTagline || 'LEGAL DOCUMENT GENERATOR').toUpperCase()}
            </div>
          </div>
          <div style={{ width: 72 }} />
        </div>

        <div style={{ textAlign: 'center', margin: '14px 0 10px' }}>
          <div style={{ fontSize: '13pt', fontWeight: 700, textDecoration: 'underline' }}>
            {typeLabel}
          </div>
          <div style={{ fontSize: '11pt', fontWeight: 700, marginTop: 4 }}>{propertyName}</div>
          <div style={{ fontSize: '8pt', color: theme.colors.muted, marginTop: 4 }}>
            Template: {theme.label?.[locale] || theme.label?.en || doc.templateId}
          </div>
        </div>

        <table style={tableStyle({ marginBottom: '12px' })} className="deed-pdf-table">
          <tbody>
            {row('Document Number', doc.documentNumber || doc.execution?.documentSerialNo || '.....................')}
            {row('Registration / Execution Date', formatGuDate(doc.registrationDate || doc.execution?.executionDate))}
            {row('Document Type', typeLabel)}
            {row('Property Name', propertyName)}
            {row('Sub Registrar Office', p.subRegistrarOffice)}
            {row(coverFirst, sellers.map((s) => s.name).filter(Boolean).join(', '))}
            {row(coverSecond, buyers.map((b) => b.name).filter(Boolean).join(', '))}
            {row(amountLabel, formatGuCurrency(t.totalSaleAmount))}
            {row('Stamp Duty', formatGuCurrency(t.stampDutyAmount))}
            {row('Registration Fee', formatGuCurrency(t.registrationFeeAmount))}
          </tbody>
        </table>

        <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginTop: '16px' }}>
          <div style={{ textAlign: 'center' }}>
            {qrDataUrl ? (
              <img src={qrDataUrl} alt="QR" style={{ width: 110, height: 110, border: `1px solid ${theme.colors.border}`, display: 'block' }} />
            ) : (
              <div style={{ width: 110, height: 110, border: `1px dashed ${theme.colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8pt' }}>
                QR Code
              </div>
            )}
            <div style={{ fontSize: '7.5pt', marginTop: 4 }}>Verification QR</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                width: 180,
                height: 56,
                border: `1px solid ${theme.colors.border}`,
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                paddingBottom: 4,
                boxSizing: 'border-box',
                background:
                  'repeating-linear-gradient(90deg,#000 0,#000 1px,#fff 1px,#fff 3px)',
              }}
            />
            <div style={{ fontSize: '7.5pt', marginTop: 4 }}>Barcode Placeholder</div>
            <div style={{ fontSize: '7pt', color: theme.colors.muted }}>{doc.id}</div>
          </div>
        </div>

        <div
          style={{
            marginTop: '28px',
            borderTop: theme.showHeaderRule === false ? 'none' : `${theme.borderWidth || '1px'} solid ${theme.colors.border}`,
            paddingTop: '10px',
            fontSize: '8.5pt',
            color: theme.colors.muted,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '6px',
          }}
        >
          <div>Generated using {APP_NAME}</div>
          <div style={{ textAlign: 'right' }}>Version {doc.version || SOFTWARE_VERSION}</div>
          <div>Generated Date: {genDate}</div>
          <div style={{ textAlign: 'right' }}>Prepared By: {preparedBy}</div>
        </div>
      </div>
    </div>
  );
}
