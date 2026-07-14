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
import { APP_NAME } from '../constants/version';

const FARM_FORM_FONT = '"Noto Serif Gujarati", "Noto Sans Gujarati", "Shruti", "Nirmala UI", serif';

/** How many photo/signatory cards fit safely on one fixed A4 farm Form No.1 page */
const FARM_SIGNATORIES_PER_PAGE = 3;

function BrandFooter() {
  return (
    <div
      style={{
        marginTop: 'auto',
        paddingTop: '10px',
        flexShrink: 0,
        textAlign: 'center',
        fontSize: '8.5pt',
        color: '#4b5563',
        borderTop: '0.5px solid #d1d5db',
        lineHeight: 1.4,
      }}
    >
      Created by : {APP_NAME}
    </div>
  );
}

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out.length ? out : [[]];
}

/**
 * Registration Act 1908 Section 32-A Appendix — AALEKH page 17–18
 * Farm style: summary on page 1; ALL sellers/buyers/witnesses across as many
 * following pages as needed (never truncate).
 */
export default function DocumentFormNo1({
  data,
  governmentStyle = false,
  descriptionText = null,
  farmStyle = false,
}) {
  const s = data.property || {};
  const sellers = data.parties?.sellers?.length ? data.parties.sellers : [{}];
  const buyers = data.parties?.buyers?.length ? data.parties.buyers : [{}];
  const witnesses = data.witnesses?.length ? data.witnesses : [{}, {}];
  const snap = getPropertySnapshot(data);
  const { total } = getSaleAmounts(data);
  const b = snap.boundaries;
  const roles = getPartyRoles(data.documentType);
  const locale = data.locale || 'gu';
  const firstLabel = roles.first[locale] || roles.first.en;
  const secondLabel = roles.second[locale] || roles.second.en;
  const parishishta = descriptionText || buildParishishtaText(data);

  const safeCell = (extra = {}) =>
    cell({
      overflowWrap: 'normal',
      wordBreak: 'normal',
      height: 'auto',
      verticalAlign: 'top',
      ...(farmStyle
        ? {
            fontFamily: FARM_FORM_FONT,
            fontSize: '11.5pt',
            lineHeight: 1.45,
          }
        : {}),
      ...extra,
    });

  const farmPageShell = {
    padding: '14mm 16mm 12mm 16mm',
    lineHeight: 1.55,
    fontSize: '12.5pt',
    fontFamily: FARM_FORM_FONT,
    height: '1123px',
    minHeight: '1123px',
    maxHeight: '1123px',
    overflow: 'hidden',
    boxSizing: 'border-box',
    pageBreakAfter: 'always',
    breakAfter: 'page',
  };

  const pageExtra = farmStyle
    ? farmPageShell
    : governmentStyle
      ? { padding: '22mm 24mm 20mm 24mm', lineHeight: '1.8', fontSize: '13pt' }
      : {};

  const photoW = farmStyle ? '70px' : PASSPORT_PHOTO.width;
  const photoH = farmStyle ? '90px' : PASSPORT_PHOTO.height;

  const SignatoryBlock = ({ title, party, index = 0 }) => {
    const displayName = party.isCorporate
      ? `${party.name}${party.authorisedSignatory ? ` (${party.authorisedSignatory})` : ''}`
      : (party.name || '_______________');

    return (
      <div style={{ marginTop: farmStyle ? '8px' : '12px' }}>
        <div
          style={{
            fontWeight: 'bold',
            fontSize: farmStyle ? '11pt' : AALEKH.fontSizeSmall,
            marginBottom: '3px',
            lineHeight: 1.35,
          }}
        >
          {title}
        </div>
        <table
          className="deed-pdf-table"
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            borderSpacing: 0,
            border: '1px solid #000000',
            lineHeight: 1.3,
            tableLayout: 'fixed',
            height: 'auto',
          }}
        >
          <thead>
            <tr>
              {['', 'નામ', 'ફોટોગ્રાફ', 'અંગૂઠાની છાપ', 'સહી'].map((h, i) => (
                <th
                  key={i}
                  style={safeCell({
                    fontWeight: 'bold',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    width: i === 0 ? '5%' : i === 1 ? '28%' : i === 2 ? '22%' : '22.5%',
                    fontSize: farmStyle ? '9.5pt' : AALEKH.fontSizeTiny,
                    padding: farmStyle ? '3px 2px' : '6px 4px',
                  })}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={safeCell({ textAlign: 'center', verticalAlign: 'middle' })}>
                {toGuDigits(index + 1)}
              </td>
              <td
                style={safeCell({
                  fontSize: farmStyle ? '10.5pt' : AALEKH.fontSizeTiny,
                  textAlign: 'left',
                  verticalAlign: 'middle',
                })}
              >
                {displayName}
              </td>
              <td style={safeCell({ textAlign: 'center', padding: '4px 3px', verticalAlign: 'middle' })}>
                <PhotoSlotBox
                  src={party.photo || null}
                  label="ફોટો"
                  width={photoW}
                  height={photoH}
                  portrait
                  compact={farmStyle}
                />
              </td>
              <td style={safeCell({ padding: '4px 3px', textAlign: 'center', verticalAlign: 'middle' })}>
                <ThumbSlotBox width={photoW} height={photoH} />
              </td>
              <td style={safeCell({ padding: '4px 3px', textAlign: 'center', verticalAlign: 'middle' })}>
                <SignatureSlotBox width={photoW} height={photoH} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  /** Flatten every seller, buyer, and witness — no slicing */
  const allSignatories = [
    ...sellers.map((p, i) => ({
      key: `seller-${i}`,
      title: sellers.length > 1 ? `${firstLabel} (${toGuDigits(i + 1)})` : firstLabel,
      party: p || {},
      index: i,
    })),
    ...buyers.map((p, i) => ({
      key: `buyer-${i}`,
      title: buyers.length > 1 ? `${secondLabel} (${toGuDigits(i + 1)})` : secondLabel,
      party: p || {},
      index: i,
    })),
    ...witnesses.map((p, i) => ({
      key: `witness-${i}`,
      title: `સાક્ષી ${toGuDigits(i + 1)} / Witness ${i + 1}`,
      party: p || {},
      index: i,
    })),
  ];

  const pageClass = `gov-doc-page aalekh-s32a${farmStyle ? ' farm-form-no1' : ''}${
    governmentStyle || farmStyle ? ' govt-sale-deed-page' : ''
  }`;

  const headerBlock = (
    <div style={{ textAlign: 'center', marginBottom: farmStyle ? '8px' : '10px', flexShrink: 0 }}>
      <div
        style={{
          fontWeight: 'bold',
          fontSize: farmStyle || governmentStyle ? '13pt' : '11pt',
          textDecoration: 'underline',
          lineHeight: 1.5,
        }}
      >
        નોંધણી અધિનિયમ ૧૯૦૮ની કલમ ૩૨-એ મુજબનું પરિશિષ્ટ
      </div>
      <div style={{ fontSize: farmStyle ? '10.5pt' : AALEKH.fontSizeTiny, marginTop: '4px', lineHeight: 1.5 }}>
        દસ્તાવેજમાં જણાવેલ મિલકતનું સંક્ષિપ્ત વર્ણન અને નીચે મુજબ કરીએ છીએ.
      </div>
    </div>
  );

  const summaryTable = (
    <table
      style={{
        width: '100%',
        borderCollapse: 'collapse',
        borderSpacing: 0,
        border: '1px solid #000000',
        marginBottom: '8px',
        lineHeight: 1.45,
        tableLayout: 'fixed',
        height: 'auto',
        flexShrink: 0,
      }}
      className="deed-pdf-table"
    >
      <colgroup>
        <col style={{ width: '6%' }} />
        <col style={{ width: '34%' }} />
        <col style={{ width: '60%' }} />
      </colgroup>
      <tbody>
        <tr>
          <td style={safeCell()}>૧</td>
          <td style={safeCell({ textAlign: 'left' })}>ગુજરાત સ્ટેમ્પ અધિ. અંતર્ગત દસ્તાવેજનો પ્રકાર</td>
          <td style={safeCell({ textAlign: 'left' })}>Conveyance / Sale</td>
        </tr>
        <tr>
          <td style={safeCell()}>૨</td>
          <td style={safeCell({ textAlign: 'left' })}>અવેજ</td>
          <td style={safeCell({ textAlign: 'left' })}>{formatGuIndianNumber(total)}</td>
        </tr>
        <tr>
          <td style={safeCell()}>૩</td>
          <td style={safeCell({ textAlign: 'left' })}>બજાર કિંમત</td>
          <td style={safeCell({ textAlign: 'left' })}>{formatGuIndianNumber(s.jantriValue, 2)}</td>
        </tr>
        <tr>
          <td style={safeCell()}>૪</td>
          <td style={safeCell({ textAlign: 'left' })}>મિલકતનું વર્ણન</td>
          <td style={safeCell({ textAlign: 'left' })}>
            <p
              style={{
                margin: '0 0 6px 0',
                fontSize: farmStyle ? '10.5pt' : AALEKH.fontSizeMicro,
                textAlign: 'left',
                lineHeight: 1.5,
                overflowWrap: 'normal',
                wordBreak: 'normal',
                letterSpacing: 'normal',
                wordSpacing: 'normal',
              }}
            >
              {parishishta}
            </p>
            <div
              style={{
                fontWeight: 'bold',
                fontSize: farmStyle ? '10pt' : AALEKH.fontSizeMicro,
                marginBottom: '4px',
                lineHeight: 1.4,
              }}
            >
              સ્થાવર મિલકતની ચતુર્દિશાનું વર્ણન
            </div>
            <BoundaryCrossBlock boundaries={b} />
            {snap.latitude && (
              <div style={{ fontSize: AALEKH.fontSizeMicro, marginTop: '6px', lineHeight: 1.4 }}>
                અક્ષાંશ: {toGuDigits(snap.latitude)} | રેખાંશ: {toGuDigits(snap.longitude)}
              </div>
            )}
          </td>
        </tr>
        <tr>
          <td style={safeCell()}>૫</td>
          <td style={safeCell({ textAlign: 'left' })} colSpan={2}>
            અમે ખાતરી આપીએ છીએ કે ગુજરાત સ્ટેમ્પ અધિનિયમ ૧૯૫૮ મુજબ stamp duty ગણતરી કરવામાં આવી છે.
            અવેજ: {formatGuCurrency(total)}.
          </td>
        </tr>
        <tr>
          <td style={safeCell()}>૬</td>
          <td style={safeCell({ textAlign: 'left' })} colSpan={2}>
            અમે ખાતરી આપીએ છીએ કે અમને વેચાણ કરવાનો કાયદેસર હક્ક છે અને આ દસ્તાવેજમાં આપેલી માહિતી સાચી છે.
          </td>
        </tr>
        <tr>
          <td style={safeCell()}>૭</td>
          <td style={safeCell({ textAlign: 'left' })} colSpan={2}>
            નોંધણી અધિનિયમ ૧૯૦૮ની કલમ ૮૨ અને ૮૩ મુજબ ખોટું statement આપવું/છુપાવવું દંડનીય છે (અધિકતમ ૭
            વર્ષની સજા અથવા દંડ).
          </td>
        </tr>
      </tbody>
    </table>
  );

  const renderSignatoryList = (list) => (
    <div style={{ flexShrink: 0 }}>
      {list.map((item) => (
        <SignatoryBlock
          key={item.key}
          title={item.title}
          party={item.party}
          index={item.index}
        />
      ))}
    </div>
  );

  if (farmStyle) {
    const signatoryPages = chunk(allSignatories, FARM_SIGNATORIES_PER_PAGE);

    return (
      <>
        <div
          style={{
            ...aalekhPageStyle(pageExtra),
            display: 'flex',
            flexDirection: 'column',
          }}
          className={pageClass}
        >
          <Watermark />
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              minHeight: 0,
              height: '100%',
            }}
          >
            {headerBlock}
            {summaryTable}
            <BrandFooter />
          </div>
        </div>

        {signatoryPages.map((pageItems, pageIdx) => (
          <div
            key={`form1-sign-${pageIdx}`}
            style={{
              ...aalekhPageStyle(pageExtra),
              display: 'flex',
              flexDirection: 'column',
            }}
            className={pageClass}
          >
            <Watermark />
            <div
              style={{
                position: 'relative',
                zIndex: 1,
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                minHeight: 0,
                height: '100%',
              }}
            >
              <div
                style={{
                  textAlign: 'center',
                  marginBottom: '8px',
                  flexShrink: 0,
                  fontWeight: 'bold',
                  fontSize: '12pt',
                  textDecoration: 'underline',
                  lineHeight: 1.5,
                }}
              >
                કલમ ૩૨-એ — પક્ષકારોની ઓળખ / ફોટો / સહી
                {signatoryPages.length > 1
                  ? ` (${toGuDigits(pageIdx + 1)}/${toGuDigits(signatoryPages.length)})`
                  : ''}
              </div>
              {renderSignatoryList(pageItems)}
              <BrandFooter />
            </div>
          </div>
        ))}
      </>
    );
  }

  return (
    <div
      style={{
        ...aalekhPageStyle({ pageBreakAfter: 'auto', ...pageExtra }),
        display: 'flex',
        flexDirection: 'column',
        minHeight: governmentStyle ? '297mm' : undefined,
      }}
      className={pageClass}
    >
      <Watermark />
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          fontSize: AALEKH.fontSizeTiny,
          minHeight: 0,
        }}
      >
        {headerBlock}
        {summaryTable}
        {renderSignatoryList(allSignatories)}
        <BrandFooter />
      </div>
    </div>
  );
}
