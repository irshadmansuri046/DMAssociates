import React from 'react';
import {
  formatGuDate,
  getPropertySnapshot,
  getSaleAmounts,
  toGuDigits,
} from '../../utils/aalekhDocumentUtils';
import { amountInWords } from '../../utils/documentStyles';
import DocumentFormNo1 from '../../components/DocumentFormNo1';
import PhotoSlotBox, { PASSPORT_PHOTO, STAMP_PHOTO } from '../../components/PhotoSlotBox';
import { GOVT, govPageShell, cellStyle, tableStyle, idLineStyle, DEED } from '../government-sale-deed/styles';
import { APP_NAME, WATERMARK_TEXT } from '../../constants/version';

/** Shared finalized government typography (Farm Land reference PDF). */
const FARM = DEED;

/** html2canvas-safe cell — avoid overflow-wrap:anywhere crushing Gujarati to a vertical strip */
const fCell = (extra = {}) => ({
  border: GOVT.cellBorder,
  padding: '5px 7px',
  verticalAlign: 'middle',
  textAlign: 'center',
  fontSize: FARM.fontSizeFooter,
  lineHeight: 1.4,
  fontFamily: FARM.fontFamily,
  boxSizing: 'border-box',
  wordBreak: 'normal',
  overflowWrap: 'normal',
  whiteSpace: 'normal',
  height: 'auto',
  ...extra,
});

function formatAvej(amount) {
  const n = parseFloat(amount) || 0;
  const formatted = n.toLocaleString('en-IN', { maximumFractionDigits: 0 });
  return `રૂા.${toGuDigits(formatted)}/-`;
}

function guArea(value) {
  const raw = String(value || '').trim();
  if (!raw) return '____';
  return toGuDigits(raw);
}

function farmFields(property = {}) {
  const rev = property.revenueRecords || {};
  const survey = property.survey || {};
  return {
    khata: property.khataNo || rev.khata8ANo || property.govRecords?.form8A?.khataNo || '',
    block: property.blockSurveyNo || survey.blockSurveyNo || '',
    old: property.oldSurveyNo || survey.oldSurveyNo || '',
    totalArea: property.totalAreaHeAreSqm || '',
    soldArea: property.soldAreaHeAreSqm || '',
    soldDirection: property.soldDirection || '',
    aakar: property.aakar || '',
    subDistrict: property.subDistrict || property.taluka || '',
  };
}

function surveyLabel(f) {
  const neu = f.block ? toGuDigits(f.block) : '____';
  if (f.old) return `${neu} (જુનો : ${toGuDigits(f.old)})`;
  return neu;
}

function soldAreaPhrase(f) {
  const area = `${guArea(f.soldArea)} હે.આરે.ચો.મી.`;
  if (f.soldDirection) return `${f.soldDirection} દિશાની ${area}`;
  return area;
}

function sharedAddress(parties) {
  const addrs = (parties || []).map((p) => String(p.address || '').trim()).filter(Boolean);
  if (!addrs.length) return '_______________';
  const unique = [...new Set(addrs)];
  return unique.length === 1 ? unique[0] : unique.join(' / ');
}

/**
 * Recurring footer — always 3 columns (colSpan on row 1).
 * Broken 2+3 column layouts made html2canvas collapse the 3rd column into vertical glyphs.
 */
function FarmSummaryFooter({ data }) {
  const snap = getPropertySnapshot(data);
  const { total } = getSaleAmounts(data);
  const f = farmFields(data.property || {});
  const villageLine = `${snap.moje || snap.village}, તા. ${snap.taluka}`;

  return (
    <table
      className="deed-pdf-table farm-summary-footer"
      style={{
        width: '100%',
        borderCollapse: 'collapse',
        borderSpacing: 0,
        border: GOVT.tableBorder,
        marginTop: '0',
        marginBottom: 0,
        tableLayout: 'fixed',
        fontFamily: FARM.fontFamily,
        height: 'auto',
        lineHeight: 1.4,
      }}
    >
      <colgroup>
        <col style={{ width: '34%' }} />
        <col style={{ width: '28%' }} />
        <col style={{ width: '38%' }} />
      </colgroup>
      <tbody>
        <tr>
          <td colSpan={2} style={fCell({ textAlign: 'left', fontSize: FARM.fontSizeFooter })}>
            દસ્તાવેજનો પ્રકાર : <strong>વેચાણ દસ્તાવેજ</strong>
          </td>
          <td style={fCell({ textAlign: 'right', fontSize: FARM.fontSizeFooter })}>
            અવેજ : <strong>{formatAvej(total)}</strong>
          </td>
        </tr>
        <tr>
          <td style={fCell({ fontWeight: 700 })}>ગામનું નામ</td>
          <td style={fCell({ fontWeight: 700 })}>સર્વે નંબર</td>
          <td style={fCell({ fontWeight: 700 })}>વેચાણ આપેલ જમીનનું ક્ષેત્રફળ</td>
        </tr>
        <tr>
          <td style={fCell()}>{villageLine}</td>
          <td style={fCell({ fontWeight: 700 })}>{surveyLabel(f)}</td>
          <td style={fCell({ fontSize: '12pt', lineHeight: 1.35, padding: '4px 6px' })}>
            {f.soldDirection ? <div>{f.soldDirection} દિશાની</div> : null}
            <div>
              {guArea(f.soldArea)} હે.આરે.ચો.મી.
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

function FarmBrandFooter() {
  return (
    <div
      style={{
        marginTop: '6px',
        paddingTop: '5px',
        textAlign: 'center',
        fontSize: FARM.fontSizeBrand,
        color: '#6b7280',
        borderTop: '0.5px solid #e5e7eb',
        lineHeight: 1.25,
      }}
    >
      Created by : {APP_NAME}
    </div>
  );
}

/**
 * A4 farm page — fixed height so PDF capture is not vertically squashed.
 * Content at top; summary footer pinned to bottom (blank space between).
 */
function FarmPage({ pageNum, data, children, stampTop = false, showFooter = true }) {
  return (
    <div
      style={{
        ...govPageShell({
          fontFamily: FARM.fontFamily,
          fontSize: FARM.fontSize,
          lineHeight: FARM.lineHeight,
          padding: stampTop ? '12mm 18mm 12mm 18mm' : '14mm 18mm 12mm 18mm',
        }),
        display: 'flex',
        flexDirection: 'column',
        height: GOVT.pageHeight,
        minHeight: GOVT.pageHeight,
        maxHeight: GOVT.pageHeight,
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
      className="gov-doc-page govt-sale-deed-page farm-land-deed-page"
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 0,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            transform: 'rotate(-32deg)',
            opacity: 0.035,
            fontSize: '20pt',
            fontWeight: 700,
            letterSpacing: '1.5px',
            color: '#111827',
            whiteSpace: 'nowrap',
            userSelect: 'none',
          }}
        >
          {String(WATERMARK_TEXT).toUpperCase()}
        </div>
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          height: '100%',
        }}
      >
        {pageNum != null ? (
          <div
            style={{
              textAlign: 'center',
              fontSize: FARM.fontSizePageNum,
              fontWeight: 700,
              marginBottom: '6px',
              lineHeight: 1.3,
              flexShrink: 0,
            }}
          >
            {toGuDigits(pageNum)}
          </div>
        ) : null}

        {/* Original deed leaves ~half page blank for stamp paper on opening page */}
        {stampTop ? (
          <div style={{ height: '380px', width: '100%', flexShrink: 0 }} aria-hidden />
        ) : null}

        <div
          style={{
            fontFamily: FARM.fontFamily,
            fontSize: FARM.fontSize,
            lineHeight: FARM.lineHeight,
            flexShrink: 1,
            overflow: 'hidden',
            minHeight: 0,
          }}
        >
          {children}
        </div>

        <div style={{ marginTop: 'auto', flexShrink: 0, paddingTop: '8px' }}>
          {showFooter ? <FarmSummaryFooter data={data} /> : null}
          <FarmBrandFooter />
        </div>
      </div>
    </div>
  );
}

const farmCell = (extra = {}) =>
  cellStyle({
    fontFamily: FARM.fontFamily,
    fontSize: FARM.fontSizeSmall,
    lineHeight: 1.45,
    ...extra,
  });

/** Justified prose — only for multi-line paragraphs */
const farmP = {
  margin: `0 0 ${FARM.paragraphGap} 0`,
  textAlign: 'justify',
  fontFamily: FARM.fontFamily,
  fontSize: FARM.fontSize,
  lineHeight: FARM.lineHeight,
  textIndent: '1.25em',
  letterSpacing: 'normal',
  wordSpacing: 'normal',
};

/** Left-aligned lines (labels, parties, signatures) — never justify (avoids word stretch) */
const farmPlain = {
  margin: `0 0 ${FARM.paragraphGap} 0`,
  textAlign: 'left',
  fontFamily: FARM.fontFamily,
  fontSize: FARM.fontSize,
  lineHeight: FARM.lineHeight,
  textIndent: 0,
  letterSpacing: 'normal',
  wordSpacing: 'normal',
};

const farmH = {
  margin: `0 0 ${FARM.paragraphGap} 0`,
  fontWeight: 700,
  fontFamily: FARM.fontFamily,
  fontSize: FARM.fontSizeHeading,
  lineHeight: FARM.lineHeight,
  textDecoration: 'underline',
  textAlign: 'left',
  textIndent: 0,
};

const farmIdLine = {
  ...idLineStyle,
  fontFamily: FARM.fontFamily,
  fontSize: FARM.fontSizeSmall,
  lineHeight: 1.5,
  textAlign: 'left',
};

function FarmSignLine({ label }) {
  return (
    <div style={{ marginTop: '10px', marginBottom: '6px' }}>
      <div style={{ ...farmPlain, marginBottom: '2px' }}>{label}</div>
      <div
        style={{
          borderBottom: '1px dotted #000',
          width: '100%',
          height: '12px',
        }}
      />
    </div>
  );
}

/** Farm property blurb for Form No.1 (avoids flat/NA parishishta wording). */
function buildFarmParishishtaText(data) {
  const snap = getPropertySnapshot(data);
  const f = farmFields(data.property || {});
  const dir = f.soldDirection ? `${f.soldDirection} દિશાની ` : '';
  return (
    `જિલ્લા-${snap.district}, તાલુકા-${snap.taluka}, મોજે-${snap.moje} ની સર્વે / બ્લોક નં. ${surveyLabel(f)} ` +
    `(ખાતા નં. ${toGuDigits(f.khata || '____')}) ની ખેતીલાયક જમીનમાંથી ${dir}${guArea(f.soldArea)} હે.આરે.ચો.મી. ` +
    `ક્ષેત્રફળ (કુલ ક્ષેત્રફળ ${guArea(f.totalArea)} હે.આરે.ચો.મી.), તેના તમામ હક્ક, હિત અને હિસ્સા સહિત, ` +
    `સ્પષ્ટ, નિ:શંક અને વિવાદરહિત માલિકી હક્ક સહિત વેચાણ આપવામાં આવે છે.`
  );
}

function StampPartyPhoto({ party }) {
  return (
    <PhotoSlotBox
      src={party?.photo || null}
      label="ફોટો"
      width={STAMP_PHOTO.width}
      height={STAMP_PHOTO.height}
      portrait
      compact
    />
  );
}

/** Party block — farm deed wording + govt spacing / optional photo */
function FarmPartyEntry({ party, index, showPhoto = false }) {
  const n = toGuDigits(index + 1);
  const age = party.age ? toGuDigits(party.age) : '____';
  const religion = party.religion || party.caste || '________';
  const occ = party.occupation || party.business || '________';
  const name = party.name || '_______________';

  const text = (
    <div style={{ flex: 1, minWidth: 0 }}>
      {party.isCorporate ? (
        <>
            <p style={{ ...farmP, marginBottom: '4px', fontWeight: 700, textIndent: 0 }}>
            {n}. {name}
            {party.authorisedSignatory ? ` (અધિકૃત : ${party.authorisedSignatory})` : ''}
          </p>
          {(party.pan || party.cin) && (
            <p style={{ ...farmIdLine, marginLeft: '18px' }}>
              {[party.pan ? `PAN No. ${party.pan}` : null, party.cin ? `CIN No. ${party.cin}` : null]
                .filter(Boolean)
                .join('   ')}
            </p>
          )}
          <p style={{ ...farmPlain, marginLeft: '18px', marginBottom: 0 }}>
            સરનામું : {party.address || '_______________'}
          </p>
        </>
      ) : (
        <>
          <p style={{ ...farmPlain, marginBottom: '2px', fontWeight: 700 }}>
            {n}. {name}
          </p>
          <p style={{ ...farmPlain, marginBottom: '2px', marginLeft: '18px' }}>
            ઉ.વ.આ. {age}, ધર્મ : {religion}, ધંધો : {occ},
          </p>
          {(party.aadhaar || party.pan || party.mobile) && (
            <p style={{ ...farmIdLine, marginLeft: '18px' }}>
              {[
                party.aadhaar ? `Aadhar Card no. ${party.aadhaar}` : null,
                party.pan ? `PAN No. ${party.pan}` : null,
                party.mobile ? `Mobile No. ${toGuDigits(party.mobile)}` : null,
              ]
                .filter(Boolean)
                .join('   ')}
            </p>
          )}
        </>
      )}
    </div>
  );

  if (!showPhoto) {
    return <div style={{ marginBottom: '8px' }}>{text}</div>;
  }

  return (
    <div
      style={{
        marginBottom: '8px',
        display: 'flex',
        gap: '10px',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
      }}
    >
      {text}
      <StampPartyPhoto party={party} />
    </div>
  );
}

/**
 * Sale Deed — Farm Land · Government Style
 * Dense packing: merge sparse sections; page count is not fixed.
 */
export default function FarmLandSaleDeedBundle({ data, containerId = 'deed-document-root' }) {
  const sellers = data.parties?.sellers || [];
  const buyers = data.parties?.buyers || [];
  const confirmers = data.parties?.confirmers || [];
  const witnesses = (data.witnesses || []).filter((w) => w && (w.name || w.address || w.photo));
  const witnessList = witnesses.length ? witnesses : [{}, {}];
  const history = (data.titleHistory || []).filter(
    (h) => String(h?.entryNo || '').trim() || String(h?.date || '').trim() || String(h?.description || '').trim()
  );
  const historyRows = history.length ? history : [{ entryNo: '', date: '', description: '' }];
  const snap = getPropertySnapshot(data);
  const { total, totalWords } = getSaleAmounts(data);
  const ex = data.execution || {};
  const b = snap.boundaries || {};
  const f = farmFields(data.property || {});
  const subDist = f.subDistrict || snap.taluka;
  const words = totalWords || amountInWords(total, 'gu');

  let page = 0;
  const nextPage = () => ++page;

  return (
    <div id={containerId} className="deed-govt-sale-root farm-land-sale-root">
      {/* —— 1. Stamp + title —— */}
      <FarmPage pageNum={nextPage()} data={data} stampTop>
        <div
          style={{
            textAlign: 'center',
            margin: '0 auto 10px',
            padding: '6px 14px',
            border: '3px double #000',
            borderRadius: '4px',
            maxWidth: '92%',
            fontWeight: 700,
            fontSize: FARM.fontSizeTitle,
            lineHeight: 1.4,
          }}
        >
          ખેતીલાયક જમીનનો વેચાણ દસ્તાવેજ
        </div>
        <p style={{ ...farmPlain, fontWeight: 700 }}>
          {formatAvej(total)} અંકે {words} માટેનો વેચાણ દસ્તાવેજ..
        </p>
        <p style={farmP}>
          ડીસ્ટ્રીક્ટ : {snap.district} સબ ડીસ્ટ્રીક્ટ : {subDist} મોજે : {snap.moje} ખાતા નંબર :{' '}
          <strong>{toGuDigits(f.khata || '____')}</strong> માં નોંધાયેલ નવીન સર્વે / બ્લોક નં.{' '}
          <strong>{surveyLabel(f)}</strong> ની કુલ ક્ષેત્રફળ <strong>{guArea(f.totalArea)} હે.આરે.ચો.મી.</strong>
          {f.aakar ? (
            <>
              {' '}
              આકાર રૂા. <strong>{toGuDigits(f.aakar)}</strong>
            </>
          ) : null}{' '}
          માંથી {f.soldDirection ? `${f.soldDirection} દિશાની ` : ''}વેચાણ આપેલ ક્ષેત્રફળ{' '}
          <strong>{guArea(f.soldArea)} હે.આરે.ચો.મી.</strong> ની ખેતીલાયક જમીનનો વેચાણ દસ્તાવેજ...
        </p>
      </FarmPage>

      {/* —— 2. Buyers + જોગ + Sellers + Confirmers —— */}
      <FarmPage pageNum={nextPage()} data={data}>
        <div style={farmH}>લખાવી લેનાર : વેચાણ રાખનાર :</div>
        {(buyers.length ? buyers : [{}]).map((p, i) => (
          <FarmPartyEntry key={`b-${i}`} party={p} index={i} />
        ))}
        <p style={farmP}>
          {buyers.length > 1 ? 'બંને' : ''} રહેવાસી : {sharedAddress(buyers)}.
        </p>
        <p style={{ ...farmP, fontSize: FARM.fontSizeSmall }}>
          (ખાતા નં. {toGuDigits(f.khata || '____')} સર્વે / બ્લોક નં. {surveyLabel(f)} મોજે : {snap.moje}, તા.{' '}
          {snap.taluka})
        </p>
        <p style={farmP}>
          (જેને આગળ &quot;વેચાણ રાખનાર / પરચેઝર / બાયર&quot; કહેવામાં આવશે, જેમાં તેમના વારસદારો, કાયદેસર
          પ્રતિનિધિઓ અને અસાઈનીઓ સામેલ છે.)
        </p>

        <p
          style={{
            ...farmP,
            textAlign: 'center',
            fontWeight: 700,
            textDecoration: 'underline',
            margin: '10px 0 8px',
          }}
        >
          જોગ
        </p>

        <div style={farmH}>લખી આપનારા : વેચાણ આપનારા :</div>
        {(sellers.length ? sellers : [{}]).map((p, i) => (
          <FarmPartyEntry key={`s-${i}`} party={p} index={i} />
        ))}
        <p style={farmP}>
          {sellers.length > 1 ? 'તમામ' : ''} રહે. {sharedAddress(sellers)}.
        </p>
        <p style={farmP}>
          (જેને આગળ &quot;વેચાણ આપનારા / સેલર્સ / ટ્રાન્સફરર્સ&quot; કહેવામાં આવશે, જેમાં તેમના વારસદારો,
          કાયદેસર પ્રતિનિધિઓ અને અસાઈનીઓ સામેલ છે.)
        </p>

        <div
          style={{
            ...farmH,
            textAlign: 'center',
            fontSize: FARM.fontSizeHeading,
            marginTop: '12px',
            marginBottom: '8px',
          }}
        >
          સંમતી આપનાર યાને (કન્ફર્મિંગ પાર્ટી)
        </div>
        {(confirmers.length ? confirmers : []).map((p, i) => (
          <FarmPartyEntry key={`c-${i}`} party={p} index={i} />
        ))}
        {!confirmers.length && (
          <p style={{ ...farmP, fontStyle: 'italic' }}>(કોઈ સંમતી આપનાર ઉમેરેલ નથી.)</p>
        )}
        <p style={farmP}>
          જત આજરોજ આ વેચાણ દસ્તાવેજથી અમો લખી આપનારા તમો લખાવી લેનારાઓને લખી આપી બંધાઈએ છીએ કે,
        </p>
      </FarmPage>

      {/* —— 3. Title chain + consideration + parishishta + boundaries —— */}
      <FarmPage pageNum={nextPage()} data={data}>
        <p style={farmP}>
          ડીસ્ટ્રીક્ટ : {snap.district} સબ ડીસ્ટ્રીક્ટ : {subDist} મોજે : {snap.moje} ની સર્વે / બ્લોક નં.{' '}
          {surveyLabel(f)} ની ખેતીલાયક જમીન અંગે ગામ નમુના નં. ૬ / મ્યુટેશન નોંધ મુજબ માલિકી હક્ક સાંકળ
          નીચે મુજબ છે :-
        </p>
        {historyRows.map((h, idx) => (
          <div key={idx} style={{ marginBottom: '8px' }}>
            <p style={{ ...farmP, fontWeight: 700, marginBottom: '3px' }}>
              નોંધ નંબર : {toGuDigits(h.entryNo || '________')}
              {'  '}તારીખ : {formatGuDate(h.date)}
            </p>
            <p style={{ ...farmP, marginBottom: 0, textIndent: '1.25em' }}>
              {h.description || 'ગામ નમુના નં. ૬ મુજબની મ્યુટેશન / હક્ક સાંકળની વિગત અહીં લખવી.'}
            </p>
          </div>
        ))}

        <p style={{ ...farmP, marginTop: '8px' }}>
          નવીન સર્વે / બ્લોક નં. <strong>{surveyLabel(f)}</strong> ની કુલ ક્ષેત્રફળ{' '}
          <strong>{guArea(f.totalArea)} હે.આરે.ચો.મી.</strong> માંથી અમો વેચાણ આપનારાના હિસ્સામાંથી{' '}
          {f.soldDirection ? `${f.soldDirection} દિશાની ` : ''}
          <strong>{guArea(f.soldArea)} હે.આરે.ચો.મી.</strong> જમીનનો વેચાણ અવેજ{' '}
          <strong>{formatAvej(total)}</strong> ({words}) નક્કી કરી વેચાણ આપીએ છીએ.
        </p>

        {confirmers.length > 0 && (
          <>
            <div style={farmH}>સંમતિ આપનાર (કન્ફર્મિંગ પાર્ટી)</div>
            <p style={farmP}>
              ઉપરોક્ત સંમતિ આપનારાઓ / કન્ફર્મિંગ પાર્ટી જણાવે છે કે સર્વે / બ્લોક નં. {surveyLabel(f)} ની
              ઉપરોક્ત વેચાણ આપેલ ક્ષેત્રફળ અંગે તેમને કોઈ વાંધો, વિરોધ કે વિવાદ નથી અને તેમના વારસદારો પણ
              ભવિષ્યમાં કોઈ વાંધો ઉઠાવશે નહીં.
            </p>
          </>
        )}

        <p style={farmP}>સદરહું તમોને વેચાણ આપેલ જમીનનું માપ યાને પરિશિષ્ટ નીચે મુજબ છે.</p>
        <div
          style={{
            textAlign: 'center',
            fontWeight: 700,
            fontSize: FARM.fontSizeHeading,
            letterSpacing: '2px',
            margin: '6px 0 8px',
            textDecoration: 'underline',
            lineHeight: 1.4,
          }}
        >
          :: પ રિ શિ ષ્ટ ::
        </div>
        <p style={{ ...farmP, fontWeight: 700, marginBottom: '6px' }}>
          મોજે : {snap.moje}, તાલુકો : {snap.taluka}.
        </p>
        <table
          className="deed-pdf-table"
          style={{
            ...tableStyle({ marginTop: '2px', marginBottom: '6px' }),
            tableLayout: 'fixed',
            height: 'auto',
          }}
        >
          <thead>
            <tr>
              <th style={farmCell({ width: '12%', fontWeight: 700, textAlign: 'center', overflowWrap: 'normal', padding: '5px' })}>
                ખાતા નંબર
              </th>
              <th style={farmCell({ width: '22%', fontWeight: 700, textAlign: 'center', overflowWrap: 'normal', padding: '5px' })}>
                સર્વે / બ્લોક નંબર
              </th>
              <th style={farmCell({ width: '22%', fontWeight: 700, textAlign: 'center', overflowWrap: 'normal', padding: '5px' })}>
                કુલ ક્ષેત્રફળ હે.આરે.ચો.મી.
              </th>
              <th style={farmCell({ width: '28%', fontWeight: 700, textAlign: 'center', overflowWrap: 'normal', padding: '5px' })}>
                વેચાણ આપેલ ક્ષેત્રફળ હે.આરે.ચો.મી.
              </th>
              <th style={farmCell({ width: '16%', fontWeight: 700, textAlign: 'center', overflowWrap: 'normal', padding: '5px' })}>
                આકાર રૂા. પૈસા
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={farmCell({ textAlign: 'center', overflowWrap: 'normal', padding: '5px' })}>
                {toGuDigits(f.khata || '____')}
              </td>
              <td style={farmCell({ textAlign: 'center', overflowWrap: 'normal', padding: '5px' })}>
                {surveyLabel(f)}
              </td>
              <td style={farmCell({ textAlign: 'center', overflowWrap: 'normal', padding: '5px' })}>
                {guArea(f.totalArea)}
              </td>
              <td style={farmCell({ textAlign: 'center', overflowWrap: 'normal', padding: '5px' })}>
                {f.soldDirection ? `${f.soldDirection} દિશાની ` : ''}
                {guArea(f.soldArea)}
              </td>
              <td style={farmCell({ textAlign: 'center', overflowWrap: 'normal', padding: '5px' })}>
                {f.aakar ? `${toGuDigits(f.aakar)} વરાડે પડતો` : '____'}
              </td>
            </tr>
          </tbody>
        </table>
        <p style={{ ...farmP, textAlign: 'right', fontSize: FARM.fontSizeSmall, marginBottom: '8px', textIndent: 0 }}>
          જુની શરતની ખેતીલાયક જમીન...
        </p>

        <p style={{ ...farmPlain, fontWeight: 700 }}>વેચાણ આપેલ જમીનની ચતુર્દિશા નીચે મુજબ છે :-</p>
        {[
          ['પૂર્વે', b.east],
          ['પશ્ચિમે', b.west],
          ['ઉત્તરે', b.north],
          ['દક્ષિણે', b.south],
        ].map(([dir, val]) => (
          <p key={dir} style={{ ...farmPlain, fontWeight: 700, marginBottom: '4px' }}>
            {dir} :- {val || '_______________'}
          </p>
        ))}
        <p style={farmP}>
          સદર જમીન તેના તમામ વૃક્ષો, ઘાસ, પાંદડા, વાડ, કિનારા તથા તમામ હક્ક, હિત અને હિસ્સા સહિત વેચાણ
          આપવામાં આવે છે. વેચાણનો સંપૂર્ણ અવેજ {formatAvej(total)} અમો વેચાણ આપનારાઓને રોકડે / ચુકવણીથી મળી
          ગયો છે.
        </p>
        <p style={farmP}>
          આજરોજ સદર જમીનનો પ્રત્યક્ષ કબજો વેચાણ લેનારને સોંપવામાં આવ્યો છે. હવે અમો વેચાણ આપનારા કે અમારા
          વારસદારોને સદર જમીન પર કોઈ હક્ક, દાવો કે હિત રહેતું નથી. વેચાણ લેનાર હવે સંપૂર્ણ માલિક છે અને
          જમીનનો ઉપયોગ, વેચાણ, ગીરો, ભેટ કે દાન પોતાની ઇચ્છા મુજબ કરી શકે છે.
        </p>
      </FarmPage>

      {/* —— 4. Closing clauses + signatures —— */}
      <FarmPage pageNum={nextPage()} data={data}>
        <p style={farmP}>
          વેચાણની તારીખ સુધીના તમામ પંચાયત / મહેસૂલ / સરકારી વેરા અમો વેચાણ આપનારાઓએ ભરી દીધા છે. ભૂતકાળની
          બાકી જવાબદારી અમારી રહેશે અને ભવિષ્યની જવાબદારી વેચાણ લેનારની રહેશે.
        </p>
        <p style={farmP}>
          વેચાણ લેનાર હવે પંચાયત / મહેસૂલ રેકોર્ડમાં પોતાના નામે ફેરફાર કરાવવા અધિકૃત છે અને તે માટે જરૂરી
          અરજી / સહી અમો વેચાણ આપનારા આપીશું.
        </p>
        <p style={farmP}>
          આ દસ્તાવેજ અમોએ સ્વેચ્છાએ, સંપૂર્ણ સમજીને, કોઈ દબાણ વગર, સંપૂર્ણ અવેજ મળ્યા બાદ લખી આપ્યો છે અને તે
          અમારા વારસદારોને પણ બંધનકર્તા છે.
        </p>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '14px',
            marginBottom: '16px',
            fontSize: FARM.fontSize,
            lineHeight: 1.5,
          }}
        >
          <div>મું. {ex.executionPlace || snap.taluka || '_______________'}</div>
          <div>તા. {formatGuDate(ex.executionDate)}</div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '24px' }}>
          <div style={{ flex: 1 }}>
            <div style={{ ...farmH, marginBottom: '12px' }}>વેચાણ આપનારાઓની સહી</div>
            {(sellers.length ? sellers : [{}, {}]).slice(0, 4).map((p, i) => (
              <div key={i} style={{ marginBottom: '14px' }}>
                <div
                  style={{
                    borderBottom: '1px dotted #000',
                    width: '90%',
                    minHeight: '14px',
                    marginBottom: '3px',
                  }}
                />
                <div style={{ fontSize: FARM.fontSizeSmall, lineHeight: 1.4 }}>
                  ({toGuDigits(i + 1)}) ({p.name || '_______________'})
                  {i === 0 ? ' મતુ' : ''}
                </div>
              </div>
            ))}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ ...farmH, marginBottom: '12px' }}>સાક્ષીની સહી</div>
            {witnessList.slice(0, 2).map((w, i) => (
              <div key={i} style={{ marginBottom: '14px' }}>
                <div
                  style={{
                    borderBottom: '1px dotted #000',
                    width: '90%',
                    minHeight: '14px',
                    marginBottom: '3px',
                  }}
                />
                <div style={{ fontSize: FARM.fontSizeSmall, lineHeight: 1.4 }}>
                  ({toGuDigits(i + 1)}) ({w.name || '_______________'})
                  {i === 0 ? ' શાખ' : ''}
                </div>
              </div>
            ))}
          </div>
        </div>
      </FarmPage>

      {/* —— 5. Combined schedule (sellers + buyers) —— */}
      <FarmPage pageNum={nextPage()} data={data}>
        <div style={{ ...farmH, textAlign: 'center', textDecoration: 'underline', marginBottom: '8px' }}>
          શીડ્યુલ — વેચાણ આપનાર
        </div>
        <SchedulePartyTable parties={sellers.length ? sellers : [{}]} compact />
        <div
          style={{
            ...farmH,
            textAlign: 'center',
            textDecoration: 'underline',
            marginTop: '14px',
            marginBottom: '8px',
          }}
        >
          શીડ્યુલ — વેચાણ લેનાર
        </div>
        <SchedulePartyTable parties={buyers.length ? buyers : [{}]} compact />
      </FarmPage>

      {/* —— 6. Property photographs —— */}
      <FarmPropertyPhotoPages data={data} startPageNum={nextPage()} nextPage={nextPage} />

      <DocumentFormNo1
        data={data}
        governmentStyle
        farmStyle
        descriptionText={buildFarmParishishtaText(data)}
      />
    </div>
  );
}

/** Annexure pages for uploaded property photos (site / boundary / structure). */
function FarmPropertyPhotoPages({ data, startPageNum, nextPage }) {
  const photos = data.property?.photos || {};
  const snap = getPropertySnapshot(data);
  const sellers = data.parties?.sellers || [];
  const buyers = data.parties?.buyers || [];
  const witnesses = (data.witnesses || []).filter((w) => w && (w.name || w.address));
  const witnessList = witnesses.length ? witnesses : [{}, {}];

  const slots = [
    { src: photos.sitePhoto, label: 'મિલકતનો ફોટો (સાઈટ)' },
    { src: photos.boundaryPhoto, label: 'મિલકતનો ફોટો (સીમા)' },
    { src: photos.structurePhoto, label: 'મિલકતનો ફોટો (રચના)' },
  ].filter((s) => s.src);

  // Always render at least one annexure page (empty slot if no photos uploaded)
  const pages = slots.length
    ? chunk(slots, 2)
    : [[{ src: null, label: 'મિલકતનો ફોટો' }]];

  return (
    <>
      {pages.map((pageSlots, idx) => {
        const pageNum = idx === 0 ? startPageNum : nextPage();
        return (
          <FarmPage key={`prop-photo-${idx}`} pageNum={pageNum} data={data}>
            <div
              style={{
                ...farmH,
                textAlign: 'center',
                textDecoration: 'underline',
                fontSize: FARM.fontSizeSmall,
                marginBottom: '8px',
              }}
            >
              એનેક્ષર — મિલકતની ઓળખ / ફોટો
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '16px',
                flexWrap: 'wrap',
                marginBottom: '10px',
              }}
            >
              {pageSlots.map((slot) => (
                <PhotoSlotBox
                  key={slot.label}
                  src={slot.src || null}
                  label={slot.label}
                  width={pageSlots.length === 1 ? '420px' : '280px'}
                  height={pageSlots.length === 1 ? '280px' : '340px'}
                  portrait={pageSlots.length > 1}
                />
              ))}
            </div>
            <p style={{ ...farmPlain, fontWeight: 700, marginBottom: '4px' }}>મિલકતનું પોસ્ટલ સરનામું :</p>
            <p style={{ ...farmPlain, marginBottom: '8px' }}>{snap.postalAddress}</p>
            <FarmSignLine
              label={`વેચાણ લેનારની સહી (${buyers[0]?.name || '_______________'})`}
            />
            <FarmSignLine
              label={`વેચાણ આપનારની સહી (${sellers[0]?.name || '_______________'})`}
            />
            {witnessList.slice(0, 2).map((w, i) => (
              <FarmSignLine
                key={i}
                label={`સાક્ષી ${toGuDigits(i + 1)} (${w.name || '_______________'})`}
              />
            ))}
          </FarmPage>
        );
      })}
    </>
  );
}

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out.length ? out : [[]];
}

function SchedulePartyTable({ parties, compact = false }) {
  const rowH = compact ? '110px' : '150px';
  const thumbH = compact ? '70px' : '90px';
  const thumbW = compact ? '55px' : '70px';
  return (
    <table
      className="deed-pdf-table"
      style={tableStyle({ marginTop: compact ? '4px' : '10px', marginBottom: compact ? '4px' : undefined, height: 'auto' })}
    >
      <thead>
        <tr>
          <th style={farmCell({ width: '34%', fontWeight: 700, textAlign: 'center', overflowWrap: 'normal', padding: '4px' })}>
            નામ-સહી
          </th>
          <th style={farmCell({ width: '33%', fontWeight: 700, textAlign: 'center', overflowWrap: 'normal', padding: '4px' })}>
            ફોટો
          </th>
          <th style={farmCell({ width: '33%', fontWeight: 700, textAlign: 'center', overflowWrap: 'normal', padding: '4px' })}>
            ડાબા હાથના અંગૂઠાનું નિશાન
          </th>
        </tr>
      </thead>
      <tbody>
        {parties.map((p, i) => (
          <tr key={i}>
            <td
              style={farmCell({
                textAlign: 'center',
                height: rowH,
                verticalAlign: 'bottom',
                overflowWrap: 'normal',
                padding: '6px',
              })}
            >
              <div style={{ borderBottom: '1px dotted #000', width: '80%', margin: '0 auto 6px' }} />
              <div style={{ fontWeight: 700, fontSize: FARM.fontSizeSmall }}>{p.name || '_______________'}</div>
            </td>
            <td style={farmCell({ textAlign: 'center', padding: '6px', overflowWrap: 'normal' })}>
              <PhotoSlotBox
                src={p.photo || null}
                label="ફોટો"
                width={compact ? '70px' : PASSPORT_PHOTO.width}
                height={compact ? '90px' : PASSPORT_PHOTO.height}
                portrait
              />
            </td>
            <td style={farmCell({ textAlign: 'center', padding: '6px', overflowWrap: 'normal' })}>
              <div
                style={{
                  width: thumbW,
                  height: thumbH,
                  border: '1px dashed #666',
                  margin: '0 auto',
                }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
