import React from 'react';
import { DOC, pageStyle, tableCell } from '../utils/documentStyles';
import { photoPlaceholder } from '../utils/imageUpload';
import { PASSPORT_PHOTO } from './PhotoSlotBox';

/**
 * Annexure-A: Party Identification — Passport Photos, Thumb Impressions, Witnesses
 * Per Registration Act 1908 & Garvi 2.0 biometric requirements
 */
export default function DocumentAnnexures({ data }) {
  const s = data.property || {};
  const sellers = data.parties?.sellers || [];
  const buyers = data.parties?.buyers || [];
  const witnesses = data.witnesses || [{}, {}];

  const renderPartyBlock = (party, role, index) => {
    const photoSrc = party.photo || photoPlaceholder(role);
    return (
      <div key={index} style={{ border: DOC.border, padding: '10px', marginBottom: '10px', pageBreakInside: 'avoid' }}>
        <div style={{ fontWeight: 'bold', fontSize: DOC.fontSizeSmall, borderBottom: '1px solid #ccc', paddingBottom: '4px', marginBottom: '8px' }}>
          {role} #{index + 1}: {party.name || '_______________'}
          {party.isCorporate && <span style={{ fontSize: DOC.fontSizeTiny, display: 'block' }}>Signatory: {party.authorisedSignatory}</span>}
        </div>
        <table className="deed-pdf-table" style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #000000' }}>
          <tbody>
            <tr>
              <td style={{ width: '35%', verticalAlign: 'top', paddingRight: '8px' }}>
                <div style={{ fontSize: DOC.fontSizeTiny, fontWeight: 'bold', marginBottom: '4px' }}>PASSPORT PHOTO (3.5×4.5 cm)</div>
                <img src={photoSrc} alt={`${role} photo`} style={{ width: PASSPORT_PHOTO.width, height: PASSPORT_PHOTO.height, objectFit: 'cover', border: DOC.border, display: 'block' }} />
                <div style={{ fontSize: '7pt', marginTop: '4px' }}>PAN: {party.pan || '___________'}</div>
                {!party.isCorporate && <div style={{ fontSize: '7pt' }}>Aadhaar: {party.aadhaar || '____________'}</div>}
              </td>
              <td style={{ width: '35%', verticalAlign: 'top', paddingRight: '8px' }}>
                <div style={{ fontSize: DOC.fontSizeTiny, fontWeight: 'bold', marginBottom: '4px' }}>LEFT THUMB IMPRESSION</div>
                <div style={{ width: PASSPORT_PHOTO.width, height: PASSPORT_PHOTO.height, border: '1px dashed #64748b', backgroundColor: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '7pt', color: '#94a3b8', boxSizing: 'border-box' }}>
                  [Ink Impression]
                </div>
                <div style={{ fontSize: '7pt', marginTop: '4px' }}>Mobile: {party.mobile || '__________'}</div>
              </td>
              <td style={{ width: '30%', verticalAlign: 'bottom', fontSize: DOC.fontSizeTiny }}>
                <div>Signature: _______________________</div>
                <div style={{ marginTop: '8px' }}>Date: _______________________</div>
                <div style={{ marginTop: '4px', fontStyle: 'italic' }}>To be verified at SRO with biometric capture</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  const renderWitnessBlock = (witness, index) => {
    const photoSrc = witness.photo || photoPlaceholder('WITNESS');
    return (
      <td key={index} style={{ ...tableCell(), width: '50%', verticalAlign: 'top' }}>
        <div style={{ fontWeight: 'bold', fontSize: DOC.fontSizeSmall, marginBottom: '6px' }}>Witness #{index + 1} (સાક્ષી {index + 1})</div>
        <table className="deed-pdf-table" style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #000000' }}>
          <tbody>
            <tr>
              <td style={{ width: '50%', verticalAlign: 'top' }}>
                <img src={photoSrc} alt="Witness" style={{ width: PASSPORT_PHOTO.width, height: PASSPORT_PHOTO.height, objectFit: 'cover', border: DOC.border }} />
                <div style={{ fontSize: '7pt', marginTop: '4px' }}>Name: {witness.name || '________________'}</div>
                <div style={{ fontSize: '7pt' }}>PAN: {witness.pan || '___________'}</div>
              </td>
              <td style={{ width: '50%', verticalAlign: 'top' }}>
                <div style={{ width: '60px', height: '50px', border: '1px dashed #64748b', marginBottom: '4px' }}></div>
                <div style={{ fontSize: '7pt' }}>Thumb Impression</div>
                <div style={{ fontSize: '7pt', marginTop: '6px' }}>Signature: _______________</div>
              </td>
            </tr>
          </tbody>
        </table>
        <div style={{ fontSize: '7pt', marginTop: '4px' }}>Address: {witness.address || '________________________'}</div>
      </td>
    );
  };

  return (
    <div style={pageStyle()} className="gov-doc-page">
      <div style={{ textAlign: 'center', marginBottom: '10px', pageBreakInside: 'avoid' }}>
        <div style={{ fontSize: '12pt', fontWeight: 'bold' }}>ANNEXURE — A / પરિશિષ્ટ — અ</div>
        <div style={{ fontSize: DOC.fontSizeTiny }}>
          Physical Identification of Executing Parties — Photos, Thumb Impressions & Signatures
        </div>
        <div style={{ fontSize: DOC.fontSizeTiny, fontStyle: 'italic' }}>
          (Registration Act, 1908 — Biometric verification at Sub-Registrar Office)
        </div>
      </div>

      <table className="deed-pdf-table" style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #000000', marginBottom: '10px', fontSize: DOC.fontSizeTiny }}>
        <tbody>
          <tr>
            <td style={tableCell({ fontWeight: 'bold' })}>Property:</td>
            <td style={tableCell()}>Survey {s.blockSurveyNo || '_______'}, {s.village || '_______'}, {s.taluka || '_______'}, {s.district || '_______'}</td>
          </tr>
        </tbody>
      </table>

      <div style={{ fontWeight: 'bold', fontSize: DOC.fontSizeSmall, marginBottom: '6px', color: '#064e3b' }}>
        VENDORS / SELLERS (વેચનાર):
      </div>
      {sellers.map((p, i) => renderPartyBlock(p, 'Vendor', i))}

      <div style={{ fontWeight: 'bold', fontSize: DOC.fontSizeSmall, margin: '10px 0 6px', color: '#78350f' }}>
        VENDEES / BUYERS (ખરીદનાર):
      </div>
      {buyers.map((p, i) => renderPartyBlock(p, 'Vendee', i))}

      <div style={{ fontWeight: 'bold', fontSize: DOC.fontSizeSmall, margin: '10px 0 6px' }}>
        WITNESSES (સાક્ષીઓ) — Minimum 2 required, must attend SRO in person:
      </div>
      <table className="deed-pdf-table" style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #000000' }}>
        <tbody>
          <tr>
            {renderWitnessBlock(witnesses[0] || {}, 0)}
            {renderWitnessBlock(witnesses[1] || {}, 1)}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
