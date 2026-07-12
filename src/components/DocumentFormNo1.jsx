import React from 'react';
import {
  AALEKH,
  aalekhPageStyle,
  BoundaryCrossBlock,
  buildParishishtaText,
  cell,
  formatGuCurrency,
  formatGuIndianNumber,
  getPropertySnapshot,
  getSaleAmounts,
  toGuDigits,
  Watermark,
} from '../utils/aalekhDocumentUtils';
import PhotoSlotBox, { ThumbSlotBox, SignatureSlotBox, PASSPORT_PHOTO } from './PhotoSlotBox';
import { getPartyRoles } from '../constants/partyRoles';

/**
 * Registration Act 1908 Section 32-A Appendix — AALEKH page 17–18
 */
export default function DocumentFormNo1({ data, governmentStyle = false }) {
  const s = data.property || {};
  const sellers = data.parties?.sellers || [{}];
  const buyers = data.parties?.buyers || [{}];
  const witnesses = data.witnesses?.length ? data.witnesses : [{}, {}];
  const snap = getPropertySnapshot(data);
  const { total } = getSaleAmounts(data);
  const b = snap.boundaries;
  const roles = getPartyRoles(data.documentType);
  const locale = data.locale || 'gu';
  const firstLabel = roles.first[locale] || roles.first.en;
  const secondLabel = roles.second[locale] || roles.second.en;

  const pageExtra = governmentStyle
    ? { padding: '22mm 24mm 20mm 24mm', lineHeight: '1.7', fontSize: '11pt' }
    : {};

  const SignatoryBlock = ({ title, party }) => {
    const displayName = party.isCorporate
      ? `${party.name}${party.authorisedSignatory ? ` (${party.authorisedSignatory})` : ''}`
      : (party.name || '_______________');

    return (
      <div style={{ marginTop: '10px' }}>
        <div style={{ fontWeight: 'bold', fontSize: AALEKH.fontSizeSmall, marginBottom: '4px' }}>{title}</div>
        <table
          className="deed-pdf-table"
          style={{ width: '100%', borderCollapse: 'collapse', borderSpacing: 0, border: '1px solid #000000', lineHeight: 1.25 }}
        >
          <thead>
            <tr>
              {['', 'નામ', 'ફોટોગ્રાફ', 'અંગૂઠાની છાપ', 'સહી'].map((h, i) => (
                <th
                  key={i}
                  style={cell({
                    fontWeight: 'bold',
                    textAlign: 'center',
                    width: i === 0 ? '5%' : i === 1 ? '28%' : i === 2 ? '22%' : '22.5%',
                    fontSize: AALEKH.fontSizeTiny,
                    padding: '6px 4px',
                  })}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={cell({ textAlign: 'center' })}>૧</td>
              <td style={cell({ fontSize: AALEKH.fontSizeTiny })}>{displayName}</td>
              <td style={cell({ textAlign: 'center', padding: '8px 6px' })}>
                <PhotoSlotBox src={party.photo || null} label="ફોટો" portrait />
              </td>
              <td style={cell({ padding: '8px 6px', textAlign: 'center' })}>
                <ThumbSlotBox />
              </td>
              <td style={cell({ padding: '8px 6px', textAlign: 'center' })}>
                <SignatureSlotBox width={PASSPORT_PHOTO.width} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div style={{ ...aalekhPageStyle({ pageBreakAfter: 'auto', ...pageExtra }), display: 'flex', flexDirection: 'column' }} className={`gov-doc-page aalekh-s32a${governmentStyle ? ' govt-sale-deed-page' : ''}`}>
      <Watermark />
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', fontSize: AALEKH.fontSizeTiny }}>
        <div style={{ textAlign: 'center', marginBottom: '8px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '11pt', textDecoration: 'underline' }}>
            નોંધણી અધિનિયમ ૧૯૦૮ની કલમ ૩૨-એ મુજબનું પરિશિષ્ટ
          </div>
          <div style={{ fontSize: AALEKH.fontSizeTiny, marginTop: '4px' }}>
            દસ્તાવેજમાં જણાવેલ મિલકતનું સંક્ષિપ્ત વર્ણન અને નીચે મુજબ કરીએ છીએ.
          </div>
        </div>

        <table
          style={{ width: '100%', borderCollapse: 'collapse', borderSpacing: 0, border: '1px solid #000000', marginBottom: '8px', lineHeight: 1.25 }}
          className="deed-pdf-table"
        >
          <tbody>
            <tr>
              <td style={cell({ width: '5%' })}>૧</td>
              <td style={cell({ width: '35%' })}>ગુજરાત સ્ટેમ્પ અધિ. અંતર્ગત દસ્તાવેજનો પ્રકાર</td>
              <td style={cell()}>Conveyance / Sale</td>
            </tr>
            <tr>
              <td style={cell()}>૨</td>
              <td style={cell()}>અવેજ</td>
              <td style={cell()}>{formatGuIndianNumber(total)}</td>
            </tr>
            <tr>
              <td style={cell()}>૩</td>
              <td style={cell()}>બજાર કિંમત</td>
              <td style={cell()}>{formatGuIndianNumber(s.jantriValue, 2)}</td>
            </tr>
            <tr>
              <td style={cell()}>૪</td>
              <td style={cell()}>મિલકતનું વર્ણન</td>
              <td style={cell({ textAlign: 'left' })}>
                <p style={{ margin: '0 0 6px 0', fontSize: AALEKH.fontSizeMicro, textAlign: 'justify', lineHeight: 1.45 }}>
                  {buildParishishtaText(data)}
                </p>
                <div style={{ fontWeight: 'bold', fontSize: AALEKH.fontSizeMicro, marginBottom: '2px' }}>
                  સ્થાવર મિલકતની ચતુર્દિશાનું વર્ણન
                </div>
                <BoundaryCrossBlock boundaries={b} />
                {snap.latitude && (
                  <div style={{ fontSize: AALEKH.fontSizeMicro, marginTop: '6px' }}>
                    અક્ષાંશ: {toGuDigits(snap.latitude)} | રેખાંશ: {toGuDigits(snap.longitude)}
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <td style={cell()}>૫</td>
              <td style={cell({ textAlign: 'left' })} colSpan={2}>
                અમે ખાતરી આપીએ છીએ કે ગુજરાત સ્ટેમ્પ અધિનિયમ ૧૯૫૮ મુજબ stamp duty ગણતરી કરવામાં આવી છે.
                અવેજ: {formatGuCurrency(total)}.
              </td>
            </tr>
            <tr>
              <td style={cell()}>૬</td>
              <td style={cell({ textAlign: 'left' })} colSpan={2}>
                અમે ખાતરી આપીએ છીએ કે અમને વેચાણ કરવાનો કાયદેસર હક્ક છે અને આ દસ્તાવેજમાં આપેલી માહિતી સાચી છે.
              </td>
            </tr>
            <tr>
              <td style={cell()}>૭</td>
              <td style={cell({ textAlign: 'left' })} colSpan={2}>
                નોંધણી અધિનિયમ ૧૯૦૮ની કલમ ૮૨ અને ૮૩ મુજબ ખોટું statement આપવું/છુપાવવું દંડનીય છે (અધિકતમ ૭ વર્ષની સજા અથવા દંડ).
              </td>
            </tr>
          </tbody>
        </table>

        <SignatoryBlock title={firstLabel} party={sellers[0]} />
        <SignatoryBlock title={secondLabel} party={buyers[0]} />
        {witnesses.slice(0, 2).map((w, i) => (
          <SignatoryBlock
            key={`witness-${i}`}
            title={`સાક્ષી ${i + 1} / Witness ${i + 1}`}
            party={w || {}}
          />
        ))}
      </div>
    </div>
  );
}
