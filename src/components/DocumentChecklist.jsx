import React from 'react';
import { DOC, formatToday, pageStyle, tableCell } from '../utils/documentStyles';
import { SRO_DOCUMENT_CHECKLIST, PROPERTY_TYPES } from '../utils/sroRequirements';

export default function DocumentChecklist({ data }) {
  const c = data.compliance || {};
  const s = data.property || {};
  const t = data.transaction || {};
  const ex = data.execution || {};
  const id = data.identifier || {};

  const isNewTenure = s.tenureType === 'new_tenure';
  const isBuiltUp = s.isBuiltUp || false;
  const isFlat = s.propertyType === 'flat';
  const tdsActive = parseFloat(t.totalSaleAmount || 0) >= 5000000;

  const visibleItems = SRO_DOCUMENT_CHECKLIST.filter((item) => {
    if (item.conditional === 'new_tenure') return isNewTenure;
    if (item.conditional === 'built_up') return isBuiltUp;
    if (item.conditional === 'flat') return isFlat;
    if (item.conditional === 'tds') return tdsActive;
    return true;
  });

  const propType = PROPERTY_TYPES.find(p => p.id === s.propertyType)?.label || s.propertyType;

  return (
    <div style={pageStyle()} className="gov-doc-page">
      <div style={{ border: DOC.borderDouble, padding: '10px', textAlign: 'center', marginBottom: '10px' }}>
        <div style={{ fontSize: DOC.fontSizeTiny, fontWeight: 'bold' }}>GOVERNMENT OF GUJARAT — OFFICE OF SUB-REGISTRAR</div>
        <div style={{ fontSize: '12pt', fontWeight: 'bold', margin: '4px 0' }}>SECTION 34 COMPLIANCE CHECKLIST</div>
        <div style={{ fontSize: DOC.fontSizeTiny }}>કલમ-૩૪ ચકાસણી પત્રક — Registration Act, 1908</div>
      </div>

      <table className="deed-pdf-table" style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #000000', marginBottom: '8px', fontSize: DOC.fontSizeTiny }}>
        <tbody>
          <tr>
            <td style={tableCell({ fontWeight: 'bold', width: '22%' })}>SRO Office:</td>
            <td style={tableCell()}>{s.subRegistrarOffice || '_______'}</td>
            <td style={tableCell({ fontWeight: 'bold', width: '22%' })}>Garvi App No:</td>
            <td style={tableCell({ fontFamily: 'monospace' })}>{ex.garviApplicationNo || '_______'}</td>
          </tr>
          <tr>
            <td style={tableCell({ fontWeight: 'bold' })}>Property Type:</td>
            <td style={tableCell()}>{propType || '_______'}</td>
            <td style={tableCell({ fontWeight: 'bold' })}>Appointment:</td>
            <td style={tableCell()}>{ex.garviAppointmentDate || '_______'} {ex.garviAppointmentSlot || ''}</td>
          </tr>
          <tr>
            <td style={tableCell({ fontWeight: 'bold' })}>Survey No:</td>
            <td style={tableCell()}>{s.blockSurveyNo || '_______'}</td>
            <td style={tableCell({ fontWeight: 'bold' })}>Village:</td>
            <td style={tableCell()}>{s.village || '_______'}</td>
          </tr>
          <tr>
            <td style={tableCell({ fontWeight: 'bold' })}>Stamp Duty Ref:</td>
            <td style={tableCell()}>{t.stampDutyReceiptNo || '_______'}</td>
            <td style={tableCell({ fontWeight: 'bold' })}>Checklist Date:</td>
            <td style={tableCell()}>{formatToday()}</td>
          </tr>
          <tr>
            <td style={tableCell({ fontWeight: 'bold' })}>Presenter:</td>
            <td style={tableCell()} colSpan="3">{id.name || '_______'} ({id.relation || 'Presenter'}) — Mob: {id.mobile || '_______'}</td>
          </tr>
        </tbody>
      </table>

      <table className="deed-pdf-table" style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #000000' }}>
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th style={tableCell({ textAlign: 'left' })}>Sr.</th>
            <th style={tableCell({ textAlign: 'left' })}>Required Document / Verification</th>
            <th style={tableCell({ textAlign: 'center', width: '60px' })}>Yes</th>
            <th style={tableCell({ textAlign: 'center', width: '60px' })}>No</th>
          </tr>
        </thead>
        <tbody>
          {visibleItems.map((item, idx) => {
            const checked = c[item.key] || false;
            return (
              <tr key={item.key}>
                <td style={tableCell({ textAlign: 'center' })}>{idx + 1}</td>
                <td style={tableCell()}>
                  <strong>{item.gu}</strong><br/>
                  <span style={{ fontSize: '7pt', color: '#475569' }}>{item.en}</span>
                </td>
                <td style={tableCell({ textAlign: 'center', fontWeight: 'bold' })}>{checked ? '☑ હા' : '—'}</td>
                <td style={tableCell({ textAlign: 'center' })}>{!checked ? '☐ ના' : '—'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div style={{ marginTop: '12px', fontSize: DOC.fontSizeTiny, border: DOC.border, padding: '8px' }}>
        <strong>SRO Verification Notes (Section 34):</strong> Sub-Registrar shall verify documents, conduct oral verification of transaction,
        check Garvi data entry, examine stamp duty e-Challan, capture photographs and biometrics of buyer, seller, witnesses and identifier,
        and record thumb impressions on Annexure-A before registering the deed.
      </div>

      <table className="deed-pdf-table" style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #000000', marginTop: '16px' }}>
        <tbody>
          <tr>
            <td style={{ ...tableCell(), width: '33%', height: '55px', verticalAlign: 'bottom', textAlign: 'center' }}>
              Presenter Signature<br/>(રજૂ કરનાર)
            </td>
            <td style={{ ...tableCell(), width: '33%', height: '55px', verticalAlign: 'bottom', textAlign: 'center' }}>
              Registry Officer<br/>(કચેરી સ્ટાફ)
            </td>
            <td style={{ ...tableCell(), width: '34%', height: '55px', verticalAlign: 'bottom', textAlign: 'center' }}>
              Sub-Registrar Seal & Sign<br/>(સબ-રજીસ્ટ્રાર)
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
