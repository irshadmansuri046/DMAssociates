import React from 'react';
import { DOC, formatDocDate, formatToday, formatCurrency, amountInWords, tableCell, pageStyle } from '../utils/documentStyles';

/** India Non-Judicial e-Stamp Certificate — Government of Gujarat */
export default function DocumentStampCertificate({ data }) {
  const s = data.property || {};
  const t = data.transaction || {};
  const sellers = data.parties?.sellers || [];
  const buyers = data.parties?.buyers || [];
  const ex = data.execution || {};

  const firstPartyName = sellers.map(p => p.name).join(' AND ') || '_______________';
  const secondPartyName = buyers.map(p => p.name).join(' AND ') || '_______________';
  const certNo = t.stampDutyReceiptNo || 'IN-GJ44901621471892T';
  const districtCode = (s.district || 'GUJARAT').substring(0, 3).toUpperCase();

  return (
    <div style={pageStyle()} className="gov-doc-page">
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        <div style={{ fontSize: '12pt', fontWeight: 'bold', letterSpacing: '2px' }}>INDIA NON JUDICIAL</div>
        <div style={{ fontSize: DOC.fontSizeTiny }}>ભારત — બિન-ન્યાયિક</div>
        <div style={{ fontSize: '13pt', fontWeight: 'bold', margin: '4px 0' }}>Government of Gujarat</div>
        <div style={{ fontSize: DOC.fontSizeSmall }}>ગુજરાત સરકાર</div>
        <div style={{ border: DOC.border, display: 'inline-block', padding: '3px 16px', marginTop: '6px', fontWeight: 'bold', fontSize: '11pt' }}>
          Certificate of Stamp Duty
        </div>
        <div style={{ fontSize: DOC.fontSizeTiny }}>સ્ટેમ્પ ડ્યુટી પ્રમાણપત્ર</div>
      </div>

      <table className="deed-pdf-table" style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #000000' }}>
        <tbody>
          <tr>
            <td style={tableCell({ width: '32%', fontWeight: 'bold' })}>Certificate No. / પ્રમાણપત્ર નં.:</td>
            <td style={tableCell({ fontFamily: 'monospace', fontWeight: 'bold' })}>{certNo}</td>
          </tr>
          <tr>
            <td style={tableCell({ fontWeight: 'bold' })}>Certificate Issued Date:</td>
            <td style={tableCell()}>{formatDocDate(ex.executionDate) || formatToday()}</td>
          </tr>
          <tr>
            <td style={tableCell({ fontWeight: 'bold' })}>Account Reference:</td>
            <td style={tableCell({ fontFamily: 'monospace', fontSize: DOC.fontSizeTiny })}>
              IMPACC (AC)/ gj13240911/ {districtCode}/ GJ-{districtCode}
            </td>
          </tr>
          <tr>
            <td style={tableCell({ fontWeight: 'bold' })}>Unique Doc. Reference:</td>
            <td style={tableCell({ fontFamily: 'monospace', fontSize: DOC.fontSizeTiny })}>
              SUBIN-GJGJ13240911{certNo.replace(/[^0-9]/g, '').slice(-9) || '257101853'}
            </td>
          </tr>
          <tr>
            <td style={tableCell({ fontWeight: 'bold' })}>Purchased by / ખરીદનાર:</td>
            <td style={tableCell({ fontWeight: 'bold' })}>{buyers[0]?.name || '_______________'}</td>
          </tr>
          <tr>
            <td style={tableCell({ fontWeight: 'bold' })}>Description of Document:</td>
            <td style={tableCell({ fontWeight: 'bold' })}>Article 20(a) Conveyance — Immovable Property / સ્થાવર મિલકત વેચાણ</td>
          </tr>
          <tr>
            <td style={tableCell({ fontWeight: 'bold', verticalAlign: 'top' })}>Property Description:</td>
            <td style={tableCell({ textTransform: 'uppercase', fontSize: DOC.fontSizeTiny })}>
              {s.isBuiltUp ? 'NA LAND / BUILT-UP' : 'NA LAND'},
              BLOCK NO. {s.blockSurveyNo || '_______'},
              MOJE-{s.village || '_______'},
              TALUKA-{s.taluka || '_______'},
              DISTRICT-{s.district || '_______'}
            </td>
          </tr>
          <tr>
            <td style={tableCell({ fontWeight: 'bold' })}>Consideration Price (₹):</td>
            <td style={tableCell({ fontWeight: 'bold' })}>
              {formatCurrency(t.totalSaleAmount)}<br/>
              <span style={{ fontSize: DOC.fontSizeTiny, fontWeight: 'normal' }}>({amountInWords(t.totalSaleAmount, 'en')})</span>
            </td>
          </tr>
          <tr>
            <td style={tableCell({ fontWeight: 'bold' })}>First Party / પ્રથમ પક્ષ:</td>
            <td style={tableCell({ textTransform: 'uppercase' })}>{firstPartyName}</td>
          </tr>
          <tr>
            <td style={tableCell({ fontWeight: 'bold' })}>Second Party / બીજો પક્ષ:</td>
            <td style={tableCell({ textTransform: 'uppercase', fontWeight: 'bold' })}>{secondPartyName}</td>
          </tr>
          <tr>
            <td style={tableCell({ fontWeight: 'bold' })}>Stamp Duty Paid By:</td>
            <td style={tableCell()}>{buyers[0]?.name || '_______________'}</td>
          </tr>
          <tr>
            <td style={tableCell({ fontWeight: 'bold' })}>Stamp Duty Amount (₹):</td>
            <td style={tableCell({ fontWeight: 'bold' })}>
              {formatCurrency(t.stampDutyAmount)}<br/>
              <span style={{ fontSize: DOC.fontSizeTiny, fontWeight: 'normal' }}>({amountInWords(t.stampDutyAmount, 'en')})</span>
            </td>
          </tr>
          <tr>
            <td style={tableCell({ fontWeight: 'bold' })}>Registration Fee (₹):</td>
            <td style={tableCell()}>{formatCurrency(t.registrationFeeAmount)}</td>
          </tr>
        </tbody>
      </table>

      <table className="deed-pdf-table" style={{ width: '100%', marginTop: '12px', borderCollapse: 'collapse', border: '1px solid #000000' }}>
        <tbody>
          <tr>
            <td style={{ width: '35%', fontSize: DOC.fontSizeTiny, verticalAlign: 'bottom' }}>
              <div style={{ border: DOC.border, height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '7pt' }}>
                [ QR CODE / BARCODE ]
              </div>
            </td>
            <td style={{ width: '30%' }}></td>
            <td style={{ width: '35%', textAlign: 'center', verticalAlign: 'bottom', fontSize: DOC.fontSizeTiny }}>
              <div style={{ borderBottom: '1px dashed #000', marginBottom: '4px', height: '30px' }}></div>
              <strong>Authorized Signatory</strong><br/>
              Inspector General of Registration, Gujarat
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
