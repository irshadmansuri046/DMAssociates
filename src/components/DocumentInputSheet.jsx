import React from 'react';
import { DOC, formatDocDate, formatToday, formatCurrency, tableCell, pageStyle } from '../utils/documentStyles';

/**
 * Garvi 2.0 / IGR Gujarat Input Sheet
 * Mandatory data-entry record presented at Sub-Registrar Office under Registration Act, 1908
 */
export default function DocumentInputSheet({ data }) {
  const s = data.property || {};
  const t = data.transaction || {};
  const sellers = data.parties?.sellers || [];
  const buyers = data.parties?.buyers || [];
  const witnesses = data.witnesses || [{}, {}];
  const ex = data.execution || {};

  const renderPartyRow = (party, role, index) => (
    <tr key={`${role}-${index}`}>
      <td style={tableCell({ width: '5%', textAlign: 'center' })}>{index + 1}</td>
      <td style={tableCell({ width: '12%' })}>{role}</td>
      <td style={tableCell({ width: '22%', fontWeight: 'bold' })}>{party.name || '_______________'}</td>
      <td style={tableCell({ width: '8%' })}>{party.isCorporate ? 'Corporate' : (party.age || '___')}</td>
      <td style={tableCell({ width: '12%', fontFamily: 'monospace' })}>{party.pan || '___________'}</td>
      <td style={tableCell({ width: '14%', fontFamily: 'monospace' })}>{party.aadhaar || '____________'}</td>
      <td style={tableCell()}>{party.address || '_______________'}</td>
    </tr>
  );

  return (
    <div style={pageStyle()} className="gov-doc-page">
      {/* Official Header */}
      <div style={{ textAlign: 'center', marginBottom: '10px', pageBreakInside: 'avoid' }}>
        <div style={{ fontSize: DOC.fontSizeTiny, fontWeight: 'bold', letterSpacing: '0.5px' }}>
          GOVERNMENT OF GUJARAT — INSPECTOR GENERAL OF REGISTRATION & CONTROLLER OF STAMPS
        </div>
        <div style={{ fontSize: '10pt', fontWeight: 'bold', marginTop: '2px' }}>
          ગુજરાત સરકાર — નોંધણી મહાનિરીક્ષક અને સ્ટેમ્પ નિયંત્રક
        </div>
        <div style={{ border: DOC.borderDouble, display: 'inline-block', padding: '4px 20px', marginTop: '8px', fontWeight: 'bold', fontSize: '12pt' }}>
          INPUT SHEET / ઇનપુટ શીટ
        </div>
        <div style={{ fontSize: DOC.fontSizeTiny, marginTop: '4px' }}>
          (For Registration of Sale Deed / વેચાણ દસ્તાવેજ નોંધણી માટે — Garvi 2.0 Portal)
        </div>
      </div>

      {/* General Details */}
      <table className="deed-pdf-table" style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #000000', marginBottom: '8px' }}>
        <tbody>
          <tr>
            <td colSpan="4" style={{ ...tableCell(), fontWeight: 'bold', backgroundColor: '#f0f0f0', textAlign: 'center' }}>
              (૧) GENERAL DETAILS / સામાન્ય વિગતો
            </td>
          </tr>
          <tr>
            <td style={tableCell({ width: '25%', fontWeight: 'bold' })}>Document Type / દસ્તાવેજ પ્રકાર:</td>
            <td style={tableCell({ width: '25%' })}>Sale Deed (Article 20) / વેચાણ દસ્તાવેજ</td>
            <td style={tableCell({ width: '25%', fontWeight: 'bold' })}>Garvi Application No:</td>
            <td style={tableCell({ width: '25%', fontFamily: 'monospace' })}>{ex.garviApplicationNo || '_______________'}</td>
          </tr>
          <tr>
            <td style={tableCell({ fontWeight: 'bold' })}>Sub-Registrar Office / સબ-રજીસ્ટ્રાર કચેરી:</td>
            <td style={tableCell()}>{s.subRegistrarOffice || '_______________'}</td>
            <td style={tableCell({ fontWeight: 'bold' })}>District / જિલ્લો:</td>
            <td style={tableCell()}>{s.district || '_______________'}</td>
          </tr>
          <tr>
            <td style={tableCell({ fontWeight: 'bold' })}>Taluka / તાલુકો:</td>
            <td style={tableCell()}>{s.taluka || '_______________'}</td>
            <td style={tableCell({ fontWeight: 'bold' })}>Presentation Date / રજૂ કરવાની તારીખ:</td>
            <td style={tableCell()}>{formatDocDate(ex.executionDate) || formatToday()}</td>
          </tr>
          <tr>
            <td style={tableCell({ fontWeight: 'bold' })}>Stamp Duty Receipt No:</td>
            <td style={tableCell({ fontFamily: 'monospace' })}>{t.stampDutyReceiptNo || '_______________'}</td>
            <td style={tableCell({ fontWeight: 'bold' })}>Registration Fee Receipt No:</td>
            <td style={tableCell({ fontFamily: 'monospace' })}>{t.registrationFeeReceiptNo || '_______________'}</td>
          </tr>
          <tr>
            <td style={tableCell({ fontWeight: 'bold' })}>Total Consideration / કુલ અવેજ:</td>
            <td style={tableCell({ fontWeight: 'bold' })}>{formatCurrency(t.totalSaleAmount)}</td>
            <td style={tableCell({ fontWeight: 'bold' })}>Jantri Value / જંત્રી કિંમત:</td>
            <td style={tableCell()}>{formatCurrency(s.jantriValue)}</td>
          </tr>
          <tr>
            <td style={tableCell({ fontWeight: 'bold' })}>Stamp Duty Paid / સ્ટેમ્પ ડ્યુટી:</td>
            <td style={tableCell()}>{formatCurrency(t.stampDutyAmount)}</td>
            <td style={tableCell({ fontWeight: 'bold' })}>Registration Fee Paid / નોંધણી ફી:</td>
            <td style={tableCell()}>{formatCurrency(t.registrationFeeAmount)}</td>
          </tr>
        </tbody>
      </table>

      {/* Party Details */}
      <table className="deed-pdf-table" style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #000000', marginBottom: '8px' }}>
        <thead>
          <tr>
            <td colSpan="7" style={{ ...tableCell(), fontWeight: 'bold', backgroundColor: '#f0f0f0', textAlign: 'center' }}>
              (૨) PARTY DETAILS / પક્ષકારોની વિગત
            </td>
          </tr>
          <tr style={{ backgroundColor: '#f8f8f8' }}>
            <th style={tableCell({ textAlign: 'center' })}>Sr.</th>
            <th style={tableCell()}>Role / ભૂમિકા</th>
            <th style={tableCell()}>Full Name / પૂરું નામ</th>
            <th style={tableCell()}>Age</th>
            <th style={tableCell()}>PAN</th>
            <th style={tableCell()}>Aadhaar</th>
            <th style={tableCell()}>Address / સરનામું</th>
          </tr>
        </thead>
        <tbody>
          {sellers.map((p, i) => renderPartyRow(p, 'Seller/Vendor', i))}
          {buyers.map((p, i) => renderPartyRow(p, 'Buyer/Vendee', i))}
          {witnesses.map((w, i) => renderPartyRow(w, 'Witness/સાક્ષી', i))}
        </tbody>
      </table>

      {/* Property Details for Market Value */}
      <table className="deed-pdf-table" style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #000000', marginBottom: '8px' }}>
        <tbody>
          <tr>
            <td colSpan="4" style={{ ...tableCell(), fontWeight: 'bold', backgroundColor: '#f0f0f0', textAlign: 'center' }}>
              (૩) PROPERTY DETAILS (FOR MARKET VALUE) / મિલકત વિગત (બajar કિંમત માટે)
            </td>
          </tr>
          <tr>
            <td style={tableCell({ width: '20%', fontWeight: 'bold' })}>Village (Moje) / ગામ:</td>
            <td style={tableCell({ width: '30%' })}>{s.village || '_______________'}</td>
            <td style={tableCell({ width: '20%', fontWeight: 'bold' })}>Block/Survey No:</td>
            <td style={tableCell({ width: '30%' })}>{s.blockSurveyNo || '_______________'}</td>
          </tr>
          <tr>
            <td style={tableCell({ fontWeight: 'bold' })}>Old Survey No:</td>
            <td style={tableCell()}>{s.oldSurveyNo || '_______________'}</td>
            <td style={tableCell({ fontWeight: 'bold' })}>City Survey No:</td>
            <td style={tableCell()}>{s.newCitySurveyNo || '_______________'}</td>
          </tr>
          <tr>
            <td style={tableCell({ fontWeight: 'bold' })}>TP/FP No:</td>
            <td style={tableCell()}>{s.tpFpNo || '_______________'}</td>
            <td style={tableCell({ fontWeight: 'bold' })}>Tenure / શરત:</td>
            <td style={tableCell()}>{s.tenureType === 'new_tenure' ? 'New Tenure / નવી શરત' : 'Old Tenure / જૂની શરત'}</td>
          </tr>
          <tr>
            <td style={tableCell({ fontWeight: 'bold' })}>Total Area (Sq.Mtr):</td>
            <td style={tableCell()}>{s.totalPlotArea || '___'} sq.m.</td>
            <td style={tableCell({ fontWeight: 'bold' })}>Built-up Area:</td>
            <td style={tableCell()}>{s.constructionArea || '___'} sq.m.</td>
          </tr>
          <tr>
            <td style={tableCell({ fontWeight: 'bold' })}>East / પૂર્વ:</td>
            <td style={tableCell()} colSpan="3">{s.boundaries?.east || '_______________'}</td>
          </tr>
          <tr>
            <td style={tableCell({ fontWeight: 'bold' })}>West / પશ્ચિમ:</td>
            <td style={tableCell()} colSpan="3">{s.boundaries?.west || '_______________'}</td>
          </tr>
          <tr>
            <td style={tableCell({ fontWeight: 'bold' })}>North / ઉત્તર:</td>
            <td style={tableCell()} colSpan="3">{s.boundaries?.north || '_______________'}</td>
          </tr>
          <tr>
            <td style={tableCell({ fontWeight: 'bold' })}>South / દક્ષિણ:</td>
            <td style={tableCell()} colSpan="3">{s.boundaries?.south || '_______________'}</td>
          </tr>
        </tbody>
      </table>

      {/* Signatures */}
      <table className="deed-pdf-table" style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #000000', marginTop: '12px' }}>
        <tbody>
          <tr>
            <td colSpan="3" style={{ ...tableCell(), fontWeight: 'bold', backgroundColor: '#f0f0f0', textAlign: 'center' }}>
              SIGNATURES OF EXECUTING PARTIES / અમલ કરનાર પક્ષકારોની સહી
            </td>
          </tr>
          <tr>
            <td style={{ ...tableCell(), width: '33%', height: '60px', textAlign: 'center', verticalAlign: 'bottom' }}>
              <div style={{ fontSize: DOC.fontSizeTiny, marginBottom: '30px' }}>Seller(s) / વેચનાર</div>
              _______________________
            </td>
            <td style={{ ...tableCell(), width: '33%', height: '60px', textAlign: 'center', verticalAlign: 'bottom' }}>
              <div style={{ fontSize: DOC.fontSizeTiny, marginBottom: '30px' }}>Buyer(s) / ખરીદનાર</div>
              _______________________
            </td>
            <td style={{ ...tableCell(), width: '34%', height: '60px', textAlign: 'center', verticalAlign: 'bottom' }}>
              <div style={{ fontSize: DOC.fontSizeTiny, marginBottom: '30px' }}>SRO Verification / સબ-રજીસ્ટ્રાર ચકાસણી</div>
              Doc. No: {ex.documentSerialNo || '___________'}
            </td>
          </tr>
        </tbody>
      </table>

      <div style={{ fontSize: DOC.fontSizeTiny, marginTop: '8px', fontStyle: 'italic', textAlign: 'justify' }}>
        Note: This Input Sheet must be signed by all executing parties and verified by the Sub-Registrar before registration under Section 34 of the Registration Act, 1908. Document number is allotted by Garvi 2.0 system upon acceptance.
      </div>
    </div>
  );
}
