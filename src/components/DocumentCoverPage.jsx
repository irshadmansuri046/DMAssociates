import React from 'react';
import {
  AALEKH,
  aalekhPageStyle,
  buildParishishtaText,
  formatGuCurrency,
  formatGuDate,
  getCoverSiteTitle,
  getSaleAmounts,
  toGuDigits,
  Watermark,
} from '../utils/aalekhDocumentUtils';

/** Cover page — matches AALEKH/demofile.pdf page 1 */
export default function DocumentCoverPage({ data }) {
  const branding = data.branding || {};
  const identifier = data.identifier || {};
  const sellers = data.parties?.sellers || [];
  const buyers = data.parties?.buyers || [];
  const ex = data.execution || {};
  const { total, stamp } = getSaleAmounts(data);

  const presenter = identifier.name || sellers[0]?.name || '_______________';
  const presenterMobile = identifier.mobile || sellers[0]?.mobile || '_______________';
  const sellerName = sellers.map((s) => s.name).join(', ') || '_______________';
  const buyerName = buyers.map((b, i) => `(${toGuDigits(i + 1)})${b.name}`).join(', ') || '_______________';
  const siteTitle = getCoverSiteTitle(data);
  const docNo = ex.documentSerialNo ? ex.documentSerialNo : '.....................';
  const docDate = ex.executionDate ? formatGuDate(ex.executionDate) : '.....................';
  const typedBy = branding.orgName || 'DM Associates';

  const summaryRows = [
    ['રજૂ કરનારનું નામ', presenter, AALEKH.accentPink],
    ['મોબાઈલ નંબર', toGuDigits(presenterMobile), AALEKH.accentPink],
    ['આપનારનું નામ', sellerName, AALEKH.accentPink],
    ['લેનારનું નામ', buyerName, '#000000'],
    ['મોબાઈલ નંબર', toGuDigits(buyers[0]?.mobile || presenterMobile), AALEKH.accentPink],
    ['વેચાણ કિંમત', formatGuCurrency(total), AALEKH.accentBlue],
    ['સ્ટેમ્પ કિંમત', formatGuCurrency(stamp), AALEKH.accentGreen],
  ];

  return (
    <div
      style={{
        ...aalekhPageStyle({ pageBreakAfter: 'always' }),
        border: '1px solid #000',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
      }}
      className="gov-doc-page aalekh-cover"
    >
      <Watermark />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span style={{ color: AALEKH.accentPink, fontWeight: 'bold', fontSize: '10pt' }}>{presenter}</span>
          <span style={{ color: AALEKH.accentPink, fontWeight: 'bold', fontSize: '10pt' }}>
            MO.: {toGuDigits(presenterMobile)}
          </span>
        </div>

        {/* Logo / branding */}
        <div style={{ textAlign: 'center', marginBottom: '10px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              border: '2px solid #2563eb',
              margin: '0 auto 6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22pt',
              color: '#2563eb',
            }}
          >
            ✒
          </div>
          <div style={{ fontSize: '20pt', fontWeight: 'bold', color: AALEKH.accentBlue, letterSpacing: '0.5px' }}>
            {branding.orgName || 'DM Associates'}
          </div>
          <div style={{ fontSize: '9pt', color: '#64748b', letterSpacing: '2px', marginTop: '2px' }}>
            {(branding.orgTagline || 'LEGAL DOCUMENT GENERATOR').toUpperCase()}
          </div>
        </div>

        {/* Doc number & date */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '10pt' }}>
          <span style={{ color: AALEKH.accentLabelBlue }}>દસ્તાવેજ નંબર:- {docNo}</span>
          <span style={{ color: AALEKH.accentLabelBlue }}>તારીખ:- {docDate}</span>
        </div>

        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '4px' }}>
          <div style={{ fontSize: '12pt', fontWeight: 'bold', color: AALEKH.accentBlue, textDecoration: 'underline' }}>
            -:: વેચાણ ખત/ વેચાણ દસ્તાવેજ ::-
          </div>
          <div style={{ fontSize: '11pt', fontWeight: 'bold', color: AALEKH.accentBlue, textDecoration: 'underline', marginTop: '4px' }}>
            -:: {siteTitle.toUpperCase()} ::-
          </div>
        </div>

        {/* Key-value summary — centered block like AALEKH */}
        <div style={{ textAlign: 'center', margin: '14px 0', fontSize: '10.5pt', lineHeight: 1.8 }}>
          {summaryRows.map(([label, value, color]) => (
            <div key={label}>
              <span>{label} :- </span>
              <span style={{ color, fontWeight: label.includes('કિંમત') || label.includes('નામ') || label.includes('મોબાઈલ') ? 'bold' : 'normal' }}>
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Parishishta */}
        <div style={{ textAlign: 'center', margin: '10px 0 6px' }}>
          <div style={{ fontSize: '11pt', fontWeight: 'bold', color: AALEKH.accentPink, textDecoration: 'underline' }}>
            -:: પરિશિષ્ટ ::-
          </div>
        </div>
        <p style={{ textAlign: 'justify', fontSize: '10pt', lineHeight: '1.65', margin: 0 }}>
          {buildParishishtaText(data)}
        </p>

        <div style={{ textAlign: 'right', marginTop: '24px', paddingTop: '8px', fontSize: '9pt', color: '#64748b', fontStyle: 'italic' }}>
          Typed by {typedBy}
        </div>
      </div>
    </div>
  );
}
