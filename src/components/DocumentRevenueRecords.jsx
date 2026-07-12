import React from 'react';
import { DOC, formatDocDate, pageStyle, tableCell } from '../utils/documentStyles';
import { PROPERTY_TYPES } from '../utils/sroRequirements';

/** Revenue Records Annexure — 7/12, 8-A, Mutation, Encumbrance (SRO mandatory) */
export default function DocumentRevenueRecords({ data }) {
  const s = data.property || {};
  const rev = s.revenueRecords || {};
  const propType = PROPERTY_TYPES.find(p => p.id === s.propertyType)?.label || s.propertyType || '_______________';

  return (
    <div style={pageStyle()} className="gov-doc-page">
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        <div style={{ fontSize: DOC.fontSizeTiny, fontWeight: 'bold' }}>GOVERNMENT OF GUJARAT — REVENUE RECORDS ANNEXURE</div>
        <div style={{ border: DOC.border, display: 'inline-block', padding: '4px 16px', marginTop: '6px', fontWeight: 'bold' }}>
          REVENUE EXTRACTS / મહેસૂલી રેકોર્ડ પરિશિષ્ટ
        </div>
        <div style={{ fontSize: DOC.fontSizeTiny, marginTop: '4px' }}>
          (To be verified by Sub-Registrar under Section 34, Registration Act, 1908)
        </div>
      </div>

      <table className="deed-pdf-table" style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #000000', marginBottom: '8px' }}>
        <tbody>
          <tr>
            <td style={tableCell({ width: '30%', fontWeight: 'bold' })}>Property Type:</td>
            <td style={tableCell()} colSpan="3">{propType}</td>
          </tr>
          <tr>
            <td style={tableCell({ fontWeight: 'bold' })}>Village (Moje):</td>
            <td style={tableCell()}>{s.village || '_______'}</td>
            <td style={tableCell({ fontWeight: 'bold' })}>Survey/Block No:</td>
            <td style={tableCell()}>{s.blockSurveyNo || '_______'}</td>
          </tr>
        </tbody>
      </table>

      <table className="deed-pdf-table" style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #000000' }}>
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th style={tableCell()}>Document / દસ્તાવેજ</th>
            <th style={tableCell()}>Reference No.</th>
            <th style={tableCell()}>Date</th>
            <th style={tableCell({ textAlign: 'center', width: '80px' })}>Verified</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tableCell({ fontWeight: 'bold' })}>7/12 Extract (Utara) / સાત-બાર ઉતારો</td>
            <td style={tableCell({ fontFamily: 'monospace' })}>{rev.extract712No || '_______________'}</td>
            <td style={tableCell()}>{formatDocDate(rev.extract712Date)}</td>
            <td style={tableCell({ textAlign: 'center' })}>{rev.extract712No ? '☑' : '☐'}</td>
          </tr>
          <tr>
            <td style={tableCell({ fontWeight: 'bold' })}>8-A Khata Extract / ખતા ઉતારો</td>
            <td style={tableCell({ fontFamily: 'monospace' })}>{rev.khata8ANo || '_______________'}</td>
            <td style={tableCell()}>—</td>
            <td style={tableCell({ textAlign: 'center' })}>{rev.khata8ANo ? '☑' : '☐'}</td>
          </tr>
          <tr>
            <td style={tableCell({ fontWeight: 'bold' })}>Mutation Entry / ફેરફાર નોંધ</td>
            <td style={tableCell({ fontFamily: 'monospace' })}>{rev.mutationEntryNo || '_______________'}</td>
            <td style={tableCell()}>{formatDocDate(rev.mutationDate)}</td>
            <td style={tableCell({ textAlign: 'center' })}>{rev.mutationEntryNo ? '☑' : '☐'}</td>
          </tr>
          <tr>
            <td style={tableCell({ fontWeight: 'bold' })}>Property Card / City Survey</td>
            <td style={tableCell({ fontFamily: 'monospace' })}>{rev.propertyCardNo || '_______________'}</td>
            <td style={tableCell()}>—</td>
            <td style={tableCell({ textAlign: 'center' })}>{rev.propertyCardNo ? '☑' : '☐'}</td>
          </tr>
          <tr>
            <td style={tableCell({ fontWeight: 'bold' })}>Encumbrance Certificate (12 yrs)</td>
            <td style={tableCell({ fontFamily: 'monospace' })}>{rev.encumbranceCertNo || '_______________'}</td>
            <td style={tableCell()}>{formatDocDate(rev.encumbranceCertDate)}</td>
            <td style={tableCell({ textAlign: 'center' })}>{rev.encumbranceCertNo ? '☑' : '☐'}</td>
          </tr>
        </tbody>
      </table>

      <p style={{ fontSize: DOC.fontSizeTiny, marginTop: '10px', textAlign: 'justify' }}>
        Declaration: The above revenue records are true copies of the original records maintained by the Mamlatdar / Talati office
        and are submitted for verification at the Sub-Registrar Office. 7/12 extract must not be older than 30 days from presentation date.
      </p>

      <table className="deed-pdf-table" style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #000000', marginTop: '16px' }}>
        <tbody>
          <tr>
            <td style={{ ...tableCell(), width: '50%', height: '60px', verticalAlign: 'bottom', textAlign: 'center' }}>
              Presenter Signature / રજૂ કરનાર સહી<br/>_______________________
            </td>
            <td style={{ ...tableCell(), width: '50%', height: '60px', verticalAlign: 'bottom', textAlign: 'center' }}>
              SRO Verification / સબ-રજીસ્ટ્રાર ચકાસણી<br/>_______________________
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
