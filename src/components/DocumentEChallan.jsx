import React from 'react';
import { DOC, formatDocDate, formatToday, formatCurrency, amountInWords, tableCell, pageStyle } from '../utils/documentStyles';

/** GRAS / Garvi 2.0 e-Challan — Stamp Duty & Registration Fee Payment Receipt */
export default function DocumentEChallan({ data }) {
  const s = data.property || {};
  const t = data.transaction || {};
  const buyers = data.parties?.buyers || [];
  const primaryBuyer = buyers[0] || {};
  const ex = data.execution || {};

  const stampAmt = parseInt(t.stampDutyAmount, 10) || 0;
  const regAmt = parseInt(t.registrationFeeAmount, 10) || 0;
  const totalAmt = stampAmt + regAmt;

  return (
    <div style={pageStyle()} className="gov-doc-page">
      <div style={{ textAlign: 'center', marginBottom: '8px' }}>
        <div style={{ fontSize: '13pt', fontWeight: 'bold', textDecoration: 'underline' }}>e-Challan</div>
        <div style={{ fontSize: DOC.fontSizeTiny, marginTop: '2px' }}>
          GRAS — Government Receipt Accounting System / Garvi 2.0 Portal
        </div>
      </div>

      <table className="deed-pdf-table" style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #000000', marginBottom: '6px', fontSize: DOC.fontSizeTiny }}>
        <tbody>
          <tr>
            <td style={tableCell({ width: '25%' })}>Login ID:<br/><strong>GRAS-{ex.garviApplicationNo || 'USER-2026'}</strong></td>
            <td style={tableCell({ width: '35%', textAlign: 'center' })}>
              BARCODE / QR CODE<br/>
              <div style={{ border: DOC.border, height: '24px', marginTop: '2px', fontSize: '7pt', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                [ ||||| | ||||| | ||| | |||| ]
              </div>
            </td>
            <td style={tableCell({ width: '40%' })}>Printed On: {formatToday()}<br/>Challan Valid: 6 months (Stamp) / 4 months (Reg.)</td>
          </tr>
        </tbody>
      </table>

      <table className="deed-pdf-table" style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #000000', marginBottom: '6px' }}>
        <tbody>
          <tr>
            <td style={tableCell({ fontWeight: 'bold', width: '20%' })}>Department</td>
            <td style={tableCell({ width: '45%' })}>Superintendent of Stamps & Inspector General of Registration, Gujarat</td>
            <td style={tableCell({ fontWeight: 'bold', width: '35%' })}>Payer Details</td>
          </tr>
          <tr>
            <td rowSpan="3" style={tableCell({ fontWeight: 'bold', verticalAlign: 'top' })}>Property Details</td>
            <td rowSpan="3" style={tableCell({ verticalAlign: 'top' })}>
              Non-Agricultural Land, Block/Survey No: {s.blockSurveyNo || '_______'},
              Moje: {s.village || '_______'}, Ta: {s.taluka || '_______'}, Di: {s.district || '_______'}
            </td>
            <td style={tableCell()}><strong>PAN:</strong> {primaryBuyer.pan || '___________'}</td>
          </tr>
          <tr>
            <td style={tableCell()}><strong>Full Name:</strong><br/>{primaryBuyer.name || '_______________'}</td>
          </tr>
          <tr>
            <td style={tableCell({ verticalAlign: 'top' })}><strong>Address:</strong><br/>{primaryBuyer.address || '_______________'}</td>
          </tr>
          <tr>
            <td style={tableCell({ fontWeight: 'bold' })}>Office Name</td>
            <td style={tableCell()}>S.R.O. — {s.subRegistrarOffice || '_______________'}</td>
            <td style={tableCell()}><strong>Aadhaar:</strong> {primaryBuyer.aadhaar || '____________'}</td>
          </tr>
          <tr>
            <td style={tableCell({ fontWeight: 'bold' })}>Location</td>
            <td style={tableCell()}>{s.district || '_______________'}</td>
            <td style={tableCell()}><strong>Garvi App No:</strong> {ex.garviApplicationNo || '_______________'}</td>
          </tr>
        </tbody>
      </table>

      <table className="deed-pdf-table" style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #000000', fontSize: DOC.fontSizeTiny, marginBottom: '6px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th style={tableCell()}>Transaction No</th>
            <th style={tableCell()}>Account Head Details</th>
            <th style={tableCell({ textAlign: 'right' })}>Amount (₹)</th>
            <th style={tableCell()}>Bank CIN</th>
            <th style={tableCell()}>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tableCell({ fontFamily: 'monospace' })}>{t.registrationFeeReceiptNo || 'GRAS-RF-XXXXXXX'}</td>
            <td style={tableCell()}>Registration Fee (0030-03-104-00)</td>
            <td style={tableCell({ textAlign: 'right', fontWeight: 'bold' })}>{formatCurrency(regAmt)}</td>
            <td style={tableCell({ fontFamily: 'monospace' })}>5700001355100</td>
            <td style={tableCell()}>{formatDocDate(ex.executionDate) || formatToday()}</td>
          </tr>
          <tr>
            <td style={tableCell({ fontFamily: 'monospace' })}>{t.stampDutyReceiptNo || 'GRAS-SD-XXXXXXX'}</td>
            <td style={tableCell()}>Stamp Duty Receipt (0030-02-103-00)</td>
            <td style={tableCell({ textAlign: 'right', fontWeight: 'bold' })}>{formatCurrency(stampAmt)}</td>
            <td style={tableCell({ fontFamily: 'monospace' })}>5700001355200</td>
            <td style={tableCell()}>{formatDocDate(ex.executionDate) || formatToday()}</td>
          </tr>
          <tr style={{ fontWeight: 'bold' }}>
            <td style={tableCell()} colSpan="2" >Total Amount / કુલ રકમ:</td>
            <td style={tableCell({ textAlign: 'right' })}>{formatCurrency(totalAmt)}</td>
            <td style={tableCell()} colSpan="2"></td>
          </tr>
        </tbody>
      </table>

      <div style={{ border: DOC.border, padding: '6px', fontSize: DOC.fontSizeSmall, marginBottom: '8px' }}>
        <strong>Total Amount in Words / કુલ રકમ શબ્દોમાં:</strong> {amountInWords(totalAmt, 'en')}
      </div>

      <table className="deed-pdf-table" style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #000000' }}>
        <tbody>
          <tr>
            <td style={{ ...tableCell(), width: '45%', height: '50px', textAlign: 'center', verticalAlign: 'middle', fontSize: DOC.fontSizeTiny }}>
              [ REGISTRATION OFFICE SEAL & SIGN ]
            </td>
            <td style={{ width: '10%' }}></td>
            <td style={{ ...tableCell(), width: '45%', height: '50px', textAlign: 'center', verticalAlign: 'middle', fontSize: DOC.fontSizeTiny }}>
              [ PAYER SIGNATURE & RECEIPT BARCODE ]
            </td>
          </tr>
        </tbody>
      </table>

      <div style={{ fontSize: '7pt', marginTop: '8px', textAlign: 'justify', lineHeight: '1.4' }}>
        <strong>Note:</strong> (1) Stamp duty paid by e-Challan is valid up to 6 months from date of generation (Sec. 52(c), Gujarat Stamp Act, 1958).<br/>
        (2) Registration fee paid by e-Challan is valid up to 4 months from date of execution (Sec. 23, Registration Act, 1908).<br/>
        <strong>Disclaimer:</strong> This is a system-generated e-Challan from Garvi 2.0 portal. Physical signature is not required.
      </div>
    </div>
  );
}
