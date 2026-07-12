import React from 'react';
import { getTemplateTheme, tableStyle, PdfTableCell } from './styles';
import {
  formatGuCurrency,
  formatGuDate,
  getSellerTableRows,
  partyTableRow,
  toGuDigits,
} from '../../utils/aalekhDocumentUtils';
import { formatPaymentRows } from '../../utils/aalekhDocumentUtils';
import PhotoSlotBox, { ThumbSlotBox, SignatureSlotBox } from '../../components/PhotoSlotBox';
import { getPartyRoles } from '../../constants/partyRoles';

const pStyle = { margin: '0 0 8px 0', textAlign: 'justify', fontSize: '10pt' };

export function PartiesBlock({ doc }) {
  const theme = getTemplateTheme(doc.templateId);
  const roles = getPartyRoles(doc.documentType);
  const locale = doc.locale || 'gu';
  const sellers = doc.parties?.sellers || [];
  const buyers = doc.parties?.buyers || [];
  const sellerRows = getSellerTableRows(sellers);
  const buyerRows = buyers.length ? buyers.map(partyTableRow) : [partyTableRow({})];
  const firstLabel = roles.first[locale] || roles.first.en;
  const secondLabel = roles.second[locale] || roles.second.en;

  const headers = [
    { label: 'નામ', width: '30%' },
    { label: 'જાતના', width: '10%' },
    { label: 'ઉ.વ.આ.', width: '8%' },
    { label: 'ધંધો', width: '12%' },
    { label: 'રહેવાસી', width: '40%' },
  ];

  const renderRows = (rows) =>
    rows.map((r, i) => (
      <tr key={i}>
        <PdfTableCell theme={theme} style={{ width: '30%', textAlign: 'left', fontSize: '8pt' }}>
          {r.name}
        </PdfTableCell>
        <PdfTableCell theme={theme} style={{ width: '10%', fontSize: '8pt' }}>{r.caste}</PdfTableCell>
        <PdfTableCell theme={theme} style={{ width: '8%', fontSize: '8pt' }}>{r.age}</PdfTableCell>
        <PdfTableCell theme={theme} style={{ width: '12%', fontSize: '8pt' }}>{r.occupation}</PdfTableCell>
        <PdfTableCell theme={theme} style={{ width: '40%', textAlign: 'left', fontSize: '8pt' }}>
          {r.address}
        </PdfTableCell>
      </tr>
    ));

  const PartyTable = ({ rows }) => (
    <table style={tableStyle({ marginBottom: 8 })} className="deed-pdf-table">
      <thead>
        <tr>
          {headers.map((h) => (
            <PdfTableCell
              key={h.label}
              as="th"
              theme={theme}
              style={{ fontWeight: theme.tableHeaderWeight || 700, width: h.width, fontSize: '8pt' }}
            >
              {h.label}
            </PdfTableCell>
          ))}
        </tr>
      </thead>
      <tbody>{renderRows(rows)}</tbody>
    </table>
  );

  return (
    <div className="deed-keep">
      <div style={{ fontWeight: 700, marginBottom: 4, fontSize: '10pt' }}>{firstLabel}</div>
      <PartyTable rows={sellerRows} />
      <div style={{ fontWeight: 700, marginBottom: 4, fontSize: '10pt' }}>{secondLabel}</div>
      <PartyTable rows={buyerRows} />
    </div>
  );
}

export function PaymentBlock({ doc, intro }) {
  const roles = getPartyRoles(doc.documentType);
  if (roles.showPayment === false) return null;

  const theme = getTemplateTheme(doc.templateId);
  const t = doc.transaction || {};
  const total = parseFloat(t.totalSaleAmount) || 0;
  const rows = formatPaymentRows(t.payments, total);
  return (
    <div className="deed-keep">
      {intro && <p style={pStyle}>{intro}</p>}
      <div style={{ textAlign: 'center', fontWeight: 700, marginBottom: 6 }}>અવેજ / ચુકવણી વિગત</div>
      <table style={tableStyle()} className="deed-pdf-table">
        <thead>
          <tr>
            {['રકમ', 'પ્રકાર', 'બેંક / શાખા', 'સંદર્ભ નં.', 'તારીખ'].map((h, hi) => (
              <PdfTableCell
                key={h}
                as="th"
                theme={theme}
                style={{
                  fontWeight: 700,
                  width: ['16%', '12%', '28%', '26%', '18%'][hi],
                  fontSize: '8pt',
                }}
              >
                {h}
              </PdfTableCell>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              <PdfTableCell theme={theme} style={{ background: i % 2 ? '#fafafa' : '#fff', fontSize: '8pt' }}>
                {formatGuCurrency(row.amount)}
              </PdfTableCell>
              <PdfTableCell theme={theme} style={{ background: i % 2 ? '#fafafa' : '#fff', fontSize: '8pt' }}>
                {row.mode || '—'}
              </PdfTableCell>
              <PdfTableCell
                theme={theme}
                style={{ background: i % 2 ? '#fafafa' : '#fff', fontSize: '8pt', textAlign: 'left' }}
              >
                {[row.bankName, row.branchName].filter(Boolean).join(' / ') || '—'}
              </PdfTableCell>
              <PdfTableCell theme={theme} style={{ background: i % 2 ? '#fafafa' : '#fff', fontSize: '8pt' }}>
                {toGuDigits(row.utrNumber || row.chequeNumber || row.instrumentNo || row.transactionNumber || '—')}
              </PdfTableCell>
              <PdfTableCell theme={theme} style={{ background: i % 2 ? '#fafafa' : '#fff', fontSize: '8pt' }}>
                {formatGuDate(row.date)}
              </PdfTableCell>
            </tr>
          ))}
          <tr>
            <PdfTableCell theme={theme} style={{ fontWeight: 700, fontSize: '8pt' }} colSpan={5}>
              કુલ: {formatGuCurrency(total)}
            </PdfTableCell>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export function BoundariesBlock({ doc, intro }) {
  const b = doc.property?.boundaries || {};
  return (
    <div className="deed-keep">
      {intro && <p style={pStyle}>{intro}</p>}
      <div style={{ textAlign: 'center', fontWeight: 700, margin: '8px 0' }}>ચતુર્દિશા</div>
      {[
        ['પૂર્વે', b.east],
        ['પશ્ચિમે', b.west],
        ['ઉત્તરે', b.north],
        ['દક્ષિણે', b.south],
      ].map(([dir, val]) => (
        <p key={dir} style={{ ...pStyle, fontWeight: 700 }}>
          {dir} :- {val || '_______________'}
        </p>
      ))}
    </div>
  );
}

export function SignaturesBlock({ doc, intro }) {
  const roles = getPartyRoles(doc.documentType);
  const locale = doc.locale || 'gu';
  const firstLabel = roles.first[locale] || roles.first.en;
  const secondLabel = roles.second[locale] || roles.second.en;
  const sellers = doc.parties?.sellers || [];
  const buyers = doc.parties?.buyers || [];
  const witnesses = doc.witnesses || [];
  const line = { borderBottom: '1px dotted #000', marginTop: 28, width: '70%' };

  const photoRow = (parties, roleLabel) =>
    parties.filter((p) => p?.name || p?.photo).map((party, i) => (
      <div key={`${roleLabel}-${i}`} style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '8pt', marginBottom: 4, fontWeight: 600 }}>
          {roleLabel}{parties.length > 1 ? ` #${i + 1}` : ''}
        </div>
        <PhotoSlotBox src={party.photo || null} label="ફોટો" />
        <div style={{ fontSize: '7.5pt', marginTop: 4, maxWidth: 140 }}>{party.name || '—'}</div>
      </div>
    ));

  return (
    <div className="deed-keep">
      {intro && <p style={pStyle}>{intro}</p>}
      <div style={{ marginTop: 12, fontSize: '10pt' }}>
        <p style={{ margin: '6px 0' }}>
          સાક્ષી ૧: ........................................ &nbsp;&nbsp; સાક્ષી ૨: ........................................
        </p>
        {witnesses.filter((w) => w.name).map((w, i) => (
          <div key={i} style={{ marginTop: 8 }}>
            <div>સાક્ષી {i + 1}: {w.name}</div>
            {w.address && <div style={{ fontSize: '9pt' }}>રહેવાસી: {w.address}</div>}
            {(w.pan || w.aadhaar) && (
              <div style={{ fontSize: '9pt' }}>
                {[w.pan ? `PAN: ${w.pan}` : null, w.aadhaar ? `Aadhaar: ${w.aadhaar}` : null].filter(Boolean).join(' | ')}
              </div>
            )}
          </div>
        ))}
        {sellers.map((s, i) => (
          <div key={`s-${i}`} style={{ marginTop: 14 }}>
            <div>{firstLabel}: {s.name}</div>
            {s.authorisedSignatory && <div>અધિકૃત: {s.authorisedSignatory}</div>}
            <div style={line} />
          </div>
        ))}
        {buyers.map((b, i) => (
          <div key={`b-${i}`} style={{ marginTop: 14 }}>
            <div>{secondLabel}: {b.name}</div>
            <div style={line} />
          </div>
        ))}
        <div style={{ marginTop: 16 }}>વકીલ / રજૂ કરનાર: {doc.identifier?.name || '........................'}</div>
        <div style={line} />
        <div style={{ marginTop: 16 }}>સબ-રજિસ્ટ્રાર: ........................</div>
        <div style={line} />
      </div>

      <div style={{ display: 'flex', gap: 20, marginTop: 20, flexWrap: 'wrap', alignItems: 'flex-end' }}>
        {photoRow(sellers, firstLabel)}
        {photoRow(buyers, secondLabel)}
        {witnesses.filter((w) => w.photo || w.name).map((w, i) => (
          <div key={`w-photo-${i}`} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '8pt', marginBottom: 4, fontWeight: 600 }}>સાક્ષી {i + 1}</div>
            <PhotoSlotBox src={w.photo || null} label="ફોટો" />
            <div style={{ fontSize: '7.5pt', marginTop: 4, maxWidth: 140 }}>{w.name || '—'}</div>
          </div>
        ))}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '8pt', marginBottom: 4 }}>અંગૂઠો</div>
          <ThumbSlotBox />
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '8pt', marginBottom: 4 }}>સહી</div>
          <SignatureSlotBox />
        </div>
      </div>
    </div>
  );
}

export function ClauseBlock({ clause }) {
  if (!clause) return null;
  if (clause.renderAs === 'parties' || clause.renderAs === 'payment' || clause.renderAs === 'boundaries' || clause.renderAs === 'signatures') {
    return null;
  }
  return (
    <div className="deed-keep" style={{ marginBottom: 10 }}>
      {clause.title && (
        <div style={{ fontWeight: 700, fontSize: '10pt', marginBottom: 4 }}>{clause.title}</div>
      )}
      {clause.body && <p style={pStyle}>{clause.body}</p>}
    </div>
  );
}
