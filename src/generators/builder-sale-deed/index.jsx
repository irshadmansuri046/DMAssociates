/**
 * Builder Style Sale Deed — Promoter / Builder → Allottee / Customer conveyance.
 *
 * Drafting aid aligned to common Gujarat registration practice under the Registration Act, 1908,
 * RERA Act, 2016 (s.17 conveyance) and Gujarat Ownership Flats Act, 1973.
 * Not a substitute for advocate review or Gujarat RERA Annexure-A Agreement for Sale.
 */
import React from 'react';
import {
  formatGuCurrency,
  formatGuDate,
  formatPaymentRows,
  getPropertySnapshot,
  getSaleAmounts,
  toGuDigits,
  PropertySummaryTable,
  partyTableRow,
  AALEKH,
} from '../../utils/aalekhDocumentUtils';
import DocumentFormNo1 from '../../components/DocumentFormNo1';
import PhotoSlotBox, { ThumbSlotBox, PASSPORT_PHOTO } from '../../components/PhotoSlotBox';
import { GOVT, pStyle, headingStyle, titleStyle, cellStyle, tableStyle, idLineStyle } from '../government-sale-deed/styles';
import { GovPage, GovSignatureStrip } from '../government-sale-deed/GovPage';

const UNIT_TYPE_LABELS = {
  flat: { gu: 'ફ્લેટ / એપાર્ટમેન્ટ', en: 'Flat / Apartment' },
  row_house: { gu: 'રો-હાઉસ', en: 'Row House' },
  house: { gu: 'સ્વતંત્ર મકાન / બંગલો', en: 'Independent House / Bungalow' },
};

export function getUnitTypeLabel(unitType = 'flat') {
  return UNIT_TYPE_LABELS[unitType] || UNIT_TYPE_LABELS.flat;
}

const sellerHeaders = ['વેચાણ આપનાર (પ્રથમ પક્ષવાલા)', 'જાતના', 'ઉ.વ.આ.', 'ધંધો', 'રહેવાસી'];
const buyerHeaders = ['વેચાણ લેનાર (બીજા પક્ષવાલા)', 'જાતના', 'ઉ.વ.આ.', 'ધંધો', 'રહેવાસી'];

/** Extra leading for opening pages (1–2) — Gujarati body needs more air between lines */
const OPEN_LINE_HEIGHT = 2.05;
const pStyleOpen = {
  ...pStyle,
  lineHeight: OPEN_LINE_HEIGHT,
  marginBottom: '18px',
};

const thStyle = (i) => ({
  border: AALEKH.border,
  padding: '6px 4px',
  fontSize: AALEKH.fontSizeTiny,
  fontWeight: 700,
  textAlign: 'center',
  width: i === 0 ? '38%' : i === 4 ? '28%' : '11%',
  lineHeight: 1.55,
});

const tdStyle = (extra = {}) => ({
  border: AALEKH.border,
  padding: '7px 5px',
  fontSize: AALEKH.fontSizeTiny,
  verticalAlign: 'top',
  lineHeight: OPEN_LINE_HEIGHT,
  ...extra,
});

/** Corporate promoter row matches scanned builder deed (firm block + PAN, then signatory). */
function getBuilderSellerRows(parties) {
  const rows = [];
  for (const party of parties || []) {
    if (party.isCorporate) {
      const office = party.registeredOffice || party.address || '_______________';
      const entity =
        party.partyType === 'partnership' || /ભાગીદારી|partnership/i.test(party.name || '')
          ? 'ભાગીદારી પેઢી'
          : 'કંપની / ફર્મ';
      rows.push({
        name: `${party.name || '_______________'} નામની ${entity} જે લાગુ કાયદા અનુસાર નોંધાયેલી છે, જેની રજીસ્ટર્ડ ઓફિસ ${office} ખાતે આવેલ છે, તેના તરફે તેના અધિકૃત ભાગીદાર / ડિરેક્ટર :`,
        caste: '—',
        age: '—',
        occupation: '—',
        address: party.pan ? `PAN : ${party.pan}` : 'PAN : _______________',
      });
      rows.push({
        name: party.authorisedSignatory || 'અધિકૃત ભાગીદાર',
        caste: party.signatoryReligion || party.religion || '_______________',
        age: party.signatoryAge
          ? toGuDigits(party.signatoryAge)
          : party.age
            ? toGuDigits(party.age)
            : '___',
        occupation: party.signatoryOccupation || party.occupation || '_______________',
        address: party.signatoryAddress || party.address || '_______________',
      });
    } else {
      rows.push(partyTableRow(party));
    }
  }
  return rows.length ? rows : [partyTableRow({})];
}

function BuilderPartyTable({ parties, sellerMode = false }) {
  const rows = sellerMode
    ? getBuilderSellerRows(parties)
    : parties.length
      ? parties.map(partyTableRow)
      : [partyTableRow({})];
  const headers = sellerMode ? sellerHeaders : buyerHeaders;
  return (
    <table
      className="deed-pdf-table"
      style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #000', marginBottom: '8px' }}
    >
      <thead>
        <tr>
          {headers.map((h, i) => (
            <th key={h} style={thStyle(i)}>
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            <td style={tdStyle()}>{r.name}</td>
            <td style={tdStyle({ textAlign: 'center' })}>{r.caste}</td>
            <td style={tdStyle({ textAlign: 'center' })}>{r.age}</td>
            <td style={tdStyle({ textAlign: 'center' })}>{r.occupation}</td>
            <td style={tdStyle()}>{r.address}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function PaymentDetailTable({ rows, totalLabel, totalAmount }) {
  return (
    <table className="deed-pdf-table" style={tableStyle({ width: '100%' })}>
      <thead>
        <tr>
          <th style={cellStyle({ width: '12%', fontWeight: 700, textAlign: 'center' })}>અનુક્રમ નંબર</th>
          <th style={cellStyle({ width: '22%', fontWeight: 700, textAlign: 'center' })}>રકમ રૂ.</th>
          <th style={cellStyle({ width: '66%', fontWeight: 700, textAlign: 'center' })}>વિગત</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => {
          const detailLines = [
            row.mode,
            row.bankName && row.branchName
              ? `${row.bankName} / ${row.branchName}`
              : row.bankName || null,
            row.utrNumber || row.chequeNumber || row.instrumentNo || row.transactionNumber
              ? `સંદર્ભ/ચેક નં. ${toGuDigits(row.utrNumber || row.chequeNumber || row.instrumentNo || row.transactionNumber)}`
              : null,
            row.date ? `તારીખ ${formatGuDate(row.date)}` : null,
          ].filter(Boolean);
          return (
            <tr key={i}>
              <td style={cellStyle({ textAlign: 'center', verticalAlign: 'top' })}>{toGuDigits(i + 1)}</td>
              <td style={cellStyle({ textAlign: 'center', verticalAlign: 'top' })}>
                {formatGuCurrency(row.amount)}
              </td>
              <td style={cellStyle({ textAlign: 'left', verticalAlign: 'top' })}>
                {detailLines.length
                  ? detailLines.map((line, li) => (
                      <div key={li} style={{ marginBottom: li < detailLines.length - 1 ? '2px' : 0 }}>
                        {line}
                      </div>
                    ))
                  : '—'}
              </td>
            </tr>
          );
        })}
        <tr>
          <td style={cellStyle({ textAlign: 'center', fontWeight: 700 })} colSpan={2}>
            {formatGuCurrency(totalAmount)}
          </td>
          <td style={cellStyle({ textAlign: 'left', fontWeight: 700 })}>{totalLabel}</td>
        </tr>
      </tbody>
    </table>
  );
}

function hasTitleEntry(h) {
  return Boolean(
    String(h?.entryNo || '').trim() ||
      String(h?.date || '').trim() ||
      String(h?.description || '').trim()
  );
}

function TitleHistorySection({ history = [] }) {
  const entries = (history || []).filter(hasTitleEntry);
  const rows = entries.length ? entries : [{ entryNo: '', date: '', description: '' }];

  return (
    <div style={{ marginTop: GOVT.sectionGap, marginBottom: GOVT.sectionGap }}>
      <div style={{ ...headingStyle, textDecoration: 'underline', marginBottom: '6px' }}>
        માલિકી હક્ક સાંકળ / Ownership Chain & Title History :-
      </div>
      <p style={{ ...pStyle, fontSize: GOVT.fontSizeSmall, marginBottom: GOVT.paragraphGap }}>
        પ્રોજેક્ટ જમીન / યુનિટ માટેની નીચે મુજબની નોંધો મુજબ હક્ક સાંકળ સ્પષ્ટ થાય છે.
      </p>
      {rows.map((h, idx) => (
        <div key={idx} style={{ marginBottom: GOVT.paragraphGap }}>
          <p style={{ ...pStyle, fontWeight: 700, marginBottom: '4px' }}>
            {toGuDigits(idx + 1)}. નોંધ નંબર : {toGuDigits(h.entryNo || '________')}
            {'  '}તારીખ : {formatGuDate(h.date)}
          </p>
          <p style={{ ...pStyle, marginLeft: '18px', marginBottom: 0 }}>
            વિગત : {h.description || '_______________'}
          </p>
        </div>
      ))}
    </div>
  );
}

function buildUnitDescription(s, snap, unitLabel) {
  const parts = [
    `પ્રોજેક્ટ / સંકુલ "${snap.complexName}" માં આવેલ ${unitLabel}`,
    snap.tower ? `ટાવર / બ્લોક "${snap.tower}"` : null,
    snap.floor ? `${toGuDigits(snap.floor)} ફ્લોર` : null,
    `યુનિટ / નંબર ${snap.unitNo}`,
    `RERA કાર્પેટ એરિયા ${snap.carpet} ચો.મી.`,
    s.verandaArea || snap.veranda
      ? `વેરાન્ડા / બાલ્કની ${toGuDigits(s.verandaArea || snap.veranda)} ચો.મી.`
      : null,
    `યુનીટ પ્રોપર્ટી કાર્ડ નંબર ${snap.unitCard}`,
  ].filter(Boolean);
  return parts.join(', ');
}

function parkingLine(s) {
  const slots = s.parkingSlots || s.parking?.slots || '';
  const area = s.parkingArea || s.parking?.area || '';
  const type = s.parkingType || s.parking?.type || '';
  if (!slots && !area && !type) {
    return 'પાર્કિંગ : પ્રોજેક્ટ નિયમો મુજબ ફાળવેલ / ફાળવવાનું પાર્કિંગ સ્પેસ (વિગત પરિશિષ્ટ મુજબ).';
  }
  return `પાર્કિંગ : ${type || 'કવર્ડ / ઓપન'} ${slots ? `સ્લોટ નં. ${toGuDigits(slots)}` : ''} ${
    area ? `(ક્ષેત્રફળ ${toGuDigits(area)} ચો.મી.)` : ''
  }`.trim();
}

function SchedulePartyTable({ parties, showWitnessMeta = false }) {
  return (
    <table className="deed-pdf-table" style={tableStyle({ marginTop: '10px' })}>
      <thead>
        <tr>
          <th style={cellStyle({ width: '34%', fontWeight: 700, textAlign: 'center' })}>નામ-સહી</th>
          <th style={cellStyle({ width: '33%', fontWeight: 700, textAlign: 'center' })}>ફોટો</th>
          <th style={cellStyle({ width: '33%', fontWeight: 700, textAlign: 'center' })}>
            ડાબા હાથના અંગૂઠાનું નિશાન
          </th>
        </tr>
      </thead>
      <tbody>
        {parties.map((p, i) => (
          <tr key={i}>
            <td style={cellStyle({ textAlign: 'center', height: '160px', verticalAlign: 'bottom' })}>
              <div style={{ borderBottom: '1px dotted #000', width: '80%', margin: '0 auto 8px' }} />
              <div style={{ fontWeight: 700 }}>{p.name || '_______________'}</div>
              {p.isCorporate && p.authorisedSignatory ? (
                <div style={{ fontSize: GOVT.fontSizeTiny }}>({p.authorisedSignatory})</div>
              ) : null}
              {showWitnessMeta && (
                <div style={{ fontSize: GOVT.fontSizeTiny, marginTop: '6px', lineHeight: 1.35 }}>
                  {p.pan ? <div>PAN: {p.pan}</div> : null}
                  {p.aadhaar ? <div>Aadhaar: {p.aadhaar}</div> : null}
                  {p.address ? <div style={{ marginTop: '4px' }}>{p.address}</div> : null}
                </div>
              )}
            </td>
            <td style={cellStyle({ textAlign: 'center', padding: '10px' })}>
              <PhotoSlotBox
                src={p.photo || null}
                label="ફોટો"
                width={PASSPORT_PHOTO.width}
                height={PASSPORT_PHOTO.height}
                portrait
              />
            </td>
            <td style={cellStyle({ textAlign: 'center', padding: '10px' })}>
              <ThumbSlotBox />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function BuilderSaleDeedBundle({
  data,
  containerId = 'deed-document-root',
}) {
  const s = data.property || {};
  const sellers = data.parties?.sellers || [];
  const buyers = data.parties?.buyers || [];
  const witnesses = (data.witnesses || []).filter((w) => w && (w.name || w.photo || w.address));
  const witnessList = witnesses.length ? witnesses : [{}, {}];
  const history = data.titleHistory || [];
  const snap = getPropertySnapshot(data);
  const { total, totalWords } = getSaleAmounts(data);
  const ex = data.execution || {};
  const b = snap.boundaries || {};
  const gov = s.govRecords || data.govRecords || {};
  const oc = gov.occupancyCertificate || {};
  const cc = gov.completionCertificate || {};
  const possession = gov.possessionLetter || {};

  const payments = formatPaymentRows(data.transaction?.payments, total);
  const half = Math.ceil(Math.max(payments.length, 1) / 2) || 1;
  const payA = payments.slice(0, half);
  const payB = payments.slice(half);
  const sumA = payA.reduce((a, r) => a + (parseFloat(r.amount) || 0), 0) || total;
  const sumB = payB.reduce((a, r) => a + (parseFloat(r.amount) || 0), 0);

  const unitType = s.unitType || 'flat';
  const unitLabel = getUnitTypeLabel(unitType).gu;
  const unitDesc = buildUnitDescription(s, snap, unitLabel);
  const societyName = s.associationName || snap.complexName || '_______________';
  const reraNo = snap.reraNumber || gov.rera?.registrationNo || '_______________';
  const amountGu = toGuDigits(Number(total).toLocaleString('en-IN'));
  const carpetSqm = snap.carpetRaw || snap.carpet || s.carpetArea || '0';
  const carpetSqft = toGuDigits(
    (Math.round((parseFloat(String(carpetSqm).replace(/,/g, '')) || 0) * 10.7639 * 10) / 10).toFixed(1)
  );
  const plotArea = toGuDigits(s.totalPlotArea || '_______');
  const citySurvey = s.newCitySurveyNo ? toGuDigits(s.newCitySurveyNo) : '_______';
  const blockSurvey = s.blockSurveyNo ? toGuDigits(s.blockSurveyNo) : '_______';
  const execYear = (() => {
    try {
      const d = ex.executionDate ? new Date(ex.executionDate) : new Date();
      return Number.isNaN(d.getTime()) ? new Date().getFullYear() : d.getFullYear();
    } catch {
      return new Date().getFullYear();
    }
  })();
  const samvat = toGuDigits(execYear + 56);
  const sane = toGuDigits(execYear);
  const datePart = ex.executionDate ? formatGuDate(ex.executionDate) : '.........';
  const monthPart = (() => {
    if (!ex.executionDate) return '..........';
    try {
      const d = new Date(ex.executionDate);
      if (Number.isNaN(d.getTime())) return '..........';
      return toGuDigits(String(d.getMonth() + 1).padStart(2, '0'));
    } catch {
      return '..........';
    }
  })();
  const towerPart = snap.tower ? `"${snap.tower}" ટાવરના` : '';
  const floorPart = snap.floor ? `${toGuDigits(snap.floor)} ફ્લોર પર` : '';
  const unitPart = `નંબર : ${snap.unitNo}`;

  return (
    <div id={containerId} className="deed-govt-sale-root deed-builder-sale-root">
      {/* —— Page 1: Stamp intro (matches builder sale-deed opening page) —— */}
      <GovPage pageNum={1}>
        {/* Blank band for revenue stamp paper */}
        <div style={{ height: '200px', marginBottom: '8px' }} aria-hidden />

        <div style={{ lineHeight: OPEN_LINE_HEIGHT }}>
          <div
            style={{
              textAlign: 'center',
              fontWeight: 700,
              fontSize: '12.5pt',
              marginBottom: '18px',
              textDecoration: 'underline',
              lineHeight: OPEN_LINE_HEIGHT,
            }}
          >
            -: વેચાણ દસ્તાવેજ :-
          </div>

          <p style={{ ...pStyleOpen, marginBottom: '16px' }}>
            વેચાણ દસ્તાવેજ રૂા. {amountGu}/-, અંકે રૂપિયા {totalWords} પુરાનો
          </p>

          <p style={pStyleOpen}>
            આજ રોજ સંવંત {samvat}, સને {sane} તારીખ-{datePart} માહે {monthPart} ના દિને આ વેચાણ દસ્તાવેજ લખી આપીએ છીએ
            કે, ડિસ્ટ્રીક્ટ-{snap.district}, સબ-ડિસ્ટ્રીક્ટ-{snap.taluka || snap.district}, મોજે- {snap.moje} ના નવો
            રે.સ.નં. {blockSurvey} ની સીટી સર્વે નં. {citySurvey} ની કુલ {plotArea} ચો.મીટર જમીનની બિનખેતીની
            બહુહેતુસરની જમીન ઉપર &quot;{snap.complexName}&quot; ના નામે વ્યવસાય હેતુસરના શોપીંગ કોમ્પલેક્ષ અને રહેણાંક
            હેતુસરના મકાનોના {towerPart} {floorPart} આવેલ {unitPart} જેનો કાર્પેટ એરીયા {toGuDigits(carpetSqm)} ચો.
            મીટર ({carpetSqft} ચો.ફુટ) છે, જેનો યુનીટ પ્રોપર્ટી કાર્ડ નંબર : {snap.unitCard} છે તેની મિલકત રૂા.
            {amountGu}/- ના અવેજે વેચાણ કરીએ છીએ.
          </p>

          <div style={{ marginTop: '72px', paddingTop: '24px', lineHeight: 1.65 }}>
            <PropertySummaryTable data={data} />
          </div>
        </div>
      </GovPage>

      {/* —— Page 2: Both parties in AALEKH-style tables —— */}
      <GovPage pageNum={2}>
        <div style={{ lineHeight: OPEN_LINE_HEIGHT }}>
          <BuilderPartyTable parties={sellers.length ? sellers : [{}]} sellerMode />
          <p style={{ ...pStyleOpen, marginBottom: '16px' }}>
            (જેને &quot;વેચાણ આપનાર&quot; કહેવાશે, જેમાં તેના વારસદારો, કાયદેસર પ્રતિનિધિઓ, અમલદારો, વહીવટકર્તાઓ, પ્રતિનિધિઓ અને
            અસાઈનીઓ સામેલ છે.)
          </p>

          <div
            style={{
              fontWeight: 700,
              marginBottom: '8px',
              fontSize: GOVT.fontSizeSmall,
              lineHeight: OPEN_LINE_HEIGHT,
            }}
          >
            વેચાણ લેનાર (બીજા પક્ષવાલા)
          </div>
          <BuilderPartyTable parties={buyers.length ? buyers : [{}]} />
          <p style={{ ...pStyleOpen, marginTop: '10px' }}>
            (જેને &quot;વેચાણ લેનાર&quot; કહેવાશે, જેમાં તેના વારસદારો, કાયદેસર પ્રતિનિધિઓ, અમલદારો, વહીવટકર્તાઓ, પ્રતિનિધિઓ અને
            અસાઈનીઓ સામેલ છે.)
          </p>
          <p style={pStyleOpen}>ની વચ્ચે નીચે મુજબ એ રીતે કરવામાં આવ્યો છે કે,</p>

          <div style={{ marginTop: '8px', lineHeight: 1.65 }}>
            <PropertySummaryTable data={data} />
          </div>
        </div>
      </GovPage>

      {/* —— Page 3: Project / unit recitals —— */}
      <GovPage pageNum={3} footer={<GovSignatureStrip sellers={sellers} buyers={buyers} />}>
        <div style={headingStyle}>પ્રોજેક્ટ અને યુનિટની વિગત :-</div>
        <p style={pStyle}>
          વેચાણ આપનાર / પ્રમોટર એ Real Estate (Regulation and Development) Act, 2016 (RERA) અંતર્ગત પ્રોજેક્ટ
          નોંધાવીને &quot;{snap.complexName}&quot; પ્રોજેક્ટ વિકસાવેલ / બાંધેલ છે. RERA નોંધણી નંબર : {reraNo}.
        </p>
        <p style={pStyle}>
          જિલ્લા-{snap.district}, તાલુકા-{snap.taluka}, મોજે-{snap.moje} ની {snap.surveyLine} ની બિનખેતી (NA)
          જમીન પર આવેલ પ્રોજેક્ટમાંથી પ્રમોટરે એલોટીને નીચે વર્ણવેલ {unitLabel} વેચવાનું / હસ્તાંતર કરવાનું સ્વીકાર્યું
          છે.
        </p>
        <p style={pStyle}>
          <strong>વેચાણ યુનિટ :</strong> {unitDesc}. સદર યુનિટ સાથે common areas અને facilities માં અવિભાજ્ય
          પ્રમાણસર (undivided proportionate) હક્ક / ઉપયોગનો અધિકાર સહિત વેચાણ થાય છે. {parkingLine(s)}
        </p>
        <p style={pStyle}>
          વેચાણ આપનાર ખાતરી આપે છે કે સદર {unitLabel} સ્પષ્ટ, નિ:શંક, વેચનયોગ્ય હક્કથી અને કોઈ ત્રીજા પક્ષના ભાર /
          અટકાયત વગર વેચાણ આપવામાં આવે છે.
        </p>

        <div style={headingStyle}>રૂપિયા મળ્યા અંગેની વિગત :-</div>
        <p style={pStyle}>
          <strong>(A)</strong> એલોટીએ પ્રમોટરને યુનિટના અવેજ પેટે નીચે મુજબની રકમ ચુકવેલ છે અને પ્રમોટરે સ્વીકારી છે.
        </p>
        <PaymentDetailTable
          rows={payA.length ? payA : [{ amount: total, mode: 'કુલ અવેજ' }]}
          totalLabel="કુલ રકમ રૂપિયા (A)"
          totalAmount={sumA}
        />
      </GovPage>

      {/* —— Page 4: Payments + title history —— */}
      <GovPage pageNum={4} footer={<GovSignatureStrip sellers={sellers} buyers={buyers} />}>
        {payB.length > 0 && (
          <>
            <p style={pStyle}>
              <strong>(B)</strong> વધુમાં નીચે મુજબની રકમ પણ ચુકવવામાં આવેલ છે.
            </p>
            <PaymentDetailTable rows={payB} totalLabel="કુલ રકમ રૂપિયા (B)" totalAmount={sumB || total} />
          </>
        )}
        <p style={pStyle}>
          આમ કુલ અવેજ રૂપિયા {toGuDigits(Number(total).toLocaleString('en-IN'))}/- ({totalWords}) સંપૂર્ણ મળી ગયા છે.
          પ્રમોટરે યુનિટનો ખાલી કબજો એલોટીને સોંપ્યો છે / સોંપવાનું સ્વીકાર્યું છે.
        </p>

        <TitleHistorySection history={history} />

        <p style={{ ...pStyle, fontWeight: 700 }}>૧. પ્રોજેક્ટ જમીન / સર્વે વિગત :-</p>
        <p style={pStyle}>
          જિલ્લા-{snap.district}, તાલુકા-{snap.taluka}, મોજે-{snap.moje} ની {snap.surveyLine}. પ્લોટ ક્ષેત્રફળ{' '}
          {toGuDigits(s.totalPlotArea || '_______')} ચો.મી.
        </p>
      </GovPage>

      {/* —— Page 5: Permissions / AFS / OC —— */}
      <GovPage pageNum={5} footer={<GovSignatureStrip sellers={sellers} buyers={buyers} />}>
        {(s.naOrderNo || s.permissions?.naOrderNo) && (
          <>
            <p style={{ ...pStyle, fontWeight: 700 }}>૨. બિનખેતી (NA) પરવાનગી :-</p>
            <p style={pStyle}>
              કલેક્ટરશ્રીના ઓર્ડર નંબર {s.naOrderNo || s.permissions?.naOrderNo} તારીખ{' '}
              {formatGuDate(s.naOrderDate || s.permissions?.naOrderDate)} થી સદર જમીન બિનખેતી હેતુ માટે રૂપાંતરિત
              થયેલ છે.
            </p>
          </>
        )}
        {(s.constructionPermissionNo || s.permissions?.constructionPermissionNo) && (
          <>
            <p style={{ ...pStyle, fontWeight: 700 }}>૩. બાંધકામ પરવાનગી :-</p>
            <p style={pStyle}>
              બાંધકામ પરવાનગી નંબર {s.constructionPermissionNo || s.permissions?.constructionPermissionNo} તારીખ{' '}
              {formatGuDate(s.constructionPermissionDate || s.permissions?.constructionPermissionDate)} મુજબ
              &quot;{snap.complexName}&quot; પ્રોજેક્ટમાં બાંધકામ મંજૂર થયેલ છે.
            </p>
          </>
        )}
        {(oc.certNo || cc.certNo) && (
          <>
            <p style={{ ...pStyle, fontWeight: 700 }}>૪. Occupancy / Completion Certificate :-</p>
            <p style={pStyle}>
              {oc.certNo
                ? `Occupancy Certificate નંબર ${oc.certNo} તારીખ ${formatGuDate(oc.date)}.`
                : null}{' '}
              {cc.certNo
                ? `Completion Certificate નંબર ${cc.certNo} તારીખ ${formatGuDate(cc.date)}.`
                : null}
            </p>
          </>
        )}
        <p style={{ ...pStyle, fontWeight: 700 }}>૫. પ્રોપર્ટી કાર્ડ / યુનિટ કાર્ડ :-</p>
        <p style={pStyle}>
          યુનીટ પ્રોપર્ટી કાર્ડ નંબર {snap.unitCard} મુજબ યુનિટની ઓળખ નક્કી થયેલ છે. પ્રમોટર ખાતરી આપે છે કે યુનિટનો
          હક્ક સ્પષ્ટ અને વેચનયોગ્ય છે.
        </p>
        <p style={{ ...pStyle, fontWeight: 700 }}>૬. Agreement for Sale / બાનાખત :-</p>
        <p style={pStyle}>
          RERA / Gujarat Ownership Flats Act મુજબ પક્ષકારો વચ્ચે તારીખ{' '}
          {formatGuDate(s.banakhatDate || ex.executionDate)} ના રોજ Agreement for Sale (બાનાખત) કરવામાં આવેલ હતું.
          હવે RERA કલમ ૧૭ મુજબ અંતિમ વેચાણ / કન્વેયન્સ દસ્તાવેજ નોંધાવવામાં આવે છે.
        </p>
        {possession.letterNo && (
          <>
            <p style={{ ...pStyle, fontWeight: 700 }}>૭. કબજા પત્ર :-</p>
            <p style={pStyle}>
              Possession Letter નંબર {possession.letterNo} તારીખ {formatGuDate(possession.date)} મુજબ કબજો સોંપાયેલ
              છે.
            </p>
          </>
        )}
        <p style={{ ...pStyle, fontWeight: 700 }}>૮. RERA :-</p>
        <p style={pStyle}>પ્રોજેક્ટ Gujarat RERA અંતર્ગત નોંધાયેલ છે. નોંધણી નંબર: {reraNo}.</p>
      </GovPage>

      {/* —— Page 6: Covenants —— */}
      <GovPage pageNum={6} footer={<GovSignatureStrip sellers={sellers} buyers={buyers} />}>
        <div style={{ ...headingStyle, textAlign: 'center' }}>શરતો અને કરારો (પ્રમોટર ↔ એલોટી)</div>
        <p style={pStyle}>
          <strong>૧.</strong> આથી એલોટી પરિશિષ્ટમાં વર્ણવેલ {unitLabel} નો સંપૂર્ણ, સ્વતંત્ર માલિક બને છે; રહેઠાણ માટે
          ઉપયોગ, ગીરો અથવા પુન:વેચાણ કરવાનો હક્ક સહિત — common areas માં અવિભાજ્ય પ્રમાણસર હક્ક / ઉપયોગ સહિત.
        </p>
        <p style={pStyle}>
          <strong>૨.</strong> પ્રમોટર ખાતરી આપે છે કે યુનિટ તેના સ્પષ્ટ હક્ક અને કબજા હેઠળ છે; ત્રીજા પક્ષના કોઈ દાવા /
          હિત / ભાર / અટકાયત નથી.
        </p>
        <p style={pStyle}>
          <strong>૩. RERA ખામી જવાબદારી :</strong> પ્રમોટર RERA મુજબ માળખાકીય ખામી (structural defect) માટે કબજા /
          વેચાણ તારીખથી પાંચ (૫) વર્ષ સુધી જવાબદાર રહેશે અને સૂચના મળ્યા બાદ વાજબી સમયમાં સુધારો કરશે.
        </p>
        <p style={pStyle}>
          <strong>૪. સોસાયટી / એસોસિએશન :</strong> એલોટી &quot;{societyName}&quot; સોસાયટી / Association of Allottees નો
          સભ્ય બનશે અને maintenance, common expenses અને બાયલોનું પાલન કરશે. Common areas અવિભાજ્ય રહેશે.
        </p>
        <p style={pStyle}>
          <strong>૫.</strong> એલોટી માળખાકીય ફેરફાર, common passage અવરોધ કે છત / સામાન્ય વિસ્તાર પર અનધિકૃત કબજો
          કરશે નહીં. પાર્કિંગ ફાળવણી મુજબ જ વાપરશે.
        </p>
        <p style={pStyle}>
          <strong>૬.</strong> કબજા / આ દસ્તાવેજની તારીખ સુધીના ટેક્સ / લાઇટ / વોટર / સોસાયટી ચાર્જીસ પ્રમોટરના; ત્યારબાદ
          એલોટીના.
        </p>
        <p style={pStyle}>
          <strong>૭.</strong> Stamp Duty, registration charges, writing fees સહિત દસ્તાવેજના તમામ ખર્ચ એલોટીના હશે —
          સિવાય કે પક્ષકારોએ અન્યથા સંમત થયા હોય.
        </p>
        <p style={pStyle}>
          <strong>૮.</strong> વિવાદ થાય તો પહેલા સમાધાન; નહીં થાય તો RERA Act, 2016 અને Gujarat RERA નિયમો અંતર્ગત
          નિવારણ.
        </p>
        <p style={pStyle}>
          બંને પક્ષોએ આ દસ્તાવેજ વાંચીને, સમજીને, દબાણ વગર સ્વીકાર્યું છે અને તે તેમના વારસદારો / successors માટે
          બંધનકર્તા છે.
        </p>

        <div style={headingStyle}>સાક્ષીઓની વિગત / Witnesses :-</div>
        {witnessList.map((w, i) => {
          const wIds = [
            w.aadhaar ? `Aadhar Card no. ${w.aadhaar}` : null,
            w.pan ? `PAN No. ${w.pan}` : null,
            w.mobile ? `Mobile No. ${toGuDigits(w.mobile)}` : null,
          ].filter(Boolean);
          const mid = Math.ceil(Math.max(wIds.length, 1) / 2);
          return (
            <div key={i} style={{ marginBottom: GOVT.sectionGap }}>
              <p style={{ ...pStyle, marginBottom: '4px' }}>
                <strong>
                  સાક્ષી {toGuDigits(i + 1)}. {w.name || '_______________'}
                </strong>
              </p>
              {wIds.length ? (
                <>
                  <p style={idLineStyle}>{wIds.slice(0, mid).join('   ')}</p>
                  {wIds.length > mid ? <p style={idLineStyle}>{wIds.slice(mid).join('   ')}</p> : null}
                </>
              ) : (
                <p style={idLineStyle}>Aadhar / PAN : _______________</p>
              )}
              <p style={{ ...pStyle, marginLeft: '18px', marginBottom: 0 }}>
                રહેવાસી: {w.address || '_______________'}
              </p>
              <div
                style={{
                  borderBottom: '1px dotted #000',
                  width: '55%',
                  marginTop: '20px',
                  marginBottom: '4px',
                  minHeight: '16px',
                }}
              />
              <div style={{ fontSize: GOVT.fontSizeTiny, color: '#333' }}>
                સાક્ષી {toGuDigits(i + 1)} ની સહી
              </div>
            </div>
          );
        })}
      </GovPage>

      {/* —— Page 7: Schedule / parishishta —— */}
      <GovPage pageNum={7} footer={<GovSignatureStrip sellers={sellers} buyers={buyers} />}>
        <div style={{ ...titleStyle, color: '#000' }}>-:: પરિશિષ્ટ — યુનિટ શીડ્યુલ ::-</div>
        <p style={pStyle}>
          <strong>એ. વેચાણ યુનિટ :</strong> {unitDesc}.
        </p>
        <p style={pStyle}>
          <strong>બી. Common Areas / Amenities :</strong> સ્ટેરકેસ, લિફ્ટ (જો હોય), કોરિડોર, કોમન પેસેજ, વોટર ટેન્ક,
          ડ્રેનેજ, ઇલેક્ટ્રિક મીટર રૂમ, સોસાયટી ઓપન સ્પેસ અને પ્રોજેક્ટમાં જાહેર કરેલ અન્ય સામાન્ય સુવિધાઓ — અવિભાજ્ય
          પ્રમાણસર ઉપયોગ અધિકાર સહિત.
        </p>
        <p style={pStyle}>
          <strong>સી.</strong> {parkingLine(s)}
        </p>
        <div style={{ ...headingStyle, textAlign: 'center', textDecoration: 'underline' }}>ચતુર્દિશા</div>
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
      </GovPage>

      <GovPage pageNum={8} footer={<GovSignatureStrip sellers={sellers} buyers={buyers} />}>
        <div style={titleStyle}>શીડ્યુલ</div>
        <p style={{ ...pStyle, textAlign: 'center', fontWeight: 700 }}>
          રજીસ્ટ્રેશન એક્ટ ૧૯૦૮ ની કલમ ૩૨-અ મુજબ શીડ્યુલ
        </p>
        <div style={{ ...headingStyle, textAlign: 'center' }}>વેચાણ આપનાર / પ્રમોટર</div>
        <SchedulePartyTable parties={sellers.length ? sellers : [{}]} />
      </GovPage>

      <GovPage pageNum={9} footer={<GovSignatureStrip sellers={sellers} buyers={buyers} />}>
        <div style={{ ...headingStyle, textAlign: 'center' }}>વેચાણ લેનાર / એલોટી</div>
        <SchedulePartyTable parties={buyers.length ? buyers : [{}]} />
      </GovPage>

      <GovPage pageNum={10} footer={<GovSignatureStrip sellers={sellers} buyers={buyers} />}>
        <div style={titleStyle}>શીડ્યુલ — સાક્ષીઓ</div>
        <SchedulePartyTable parties={witnessList} showWitnessMeta />
        <div style={{ marginTop: GOVT.sectionGap }}>
          <p style={pStyle}>
            અમો ઉપરોક્ત સાક્ષીઓ ખાતરી આપીએ છીએ કે પ્રમોટર અને એલોટીએ આ દસ્તાવેજ અમારી હાજરીમાં સહી કર્યો છે અને અમોએ
            પણ સાક્ષી તરીકે સહી કરી છે.
          </p>
        </div>
      </GovPage>

      <GovPage pageNum={11} footer={<GovSignatureStrip sellers={sellers} buyers={buyers} />}>
        <div style={{ ...titleStyle, textDecoration: 'none' }}>એનેક્ષર- એ</div>
        <div style={{ ...headingStyle, textAlign: 'center', marginBottom: '16px' }}>મિલકત / યુનિટની ઓળખ</div>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
          <PhotoSlotBox
            src={s.photos?.sitePhoto || null}
            label="મિલકતનો ફોટો"
            width="420px"
            height="280px"
            portrait={false}
          />
        </div>
        <p style={{ ...pStyle, fontWeight: 700, marginBottom: '6px' }}>મિલકતનું પોસ્ટલ સરનામું :</p>
        <p style={pStyle}>{snap.postalAddress}</p>
        <div style={{ marginTop: '28px' }}>
          <p style={{ ...headingStyle, marginBottom: '28px' }}>એલોટી / વેચાણ લેનારની સહી</p>
          <p style={headingStyle}>પ્રમોટર / વેચાણ આપનારની સહી</p>
        </div>
        <div style={{ marginTop: '20px' }}>
          <div style={headingStyle}>સાક્ષીઓની સહી</div>
          {witnessList.map((w, i) => (
            <p key={i} style={{ ...pStyle, marginBottom: '18px' }}>
              સાક્ષી {toGuDigits(i + 1)} ({w.name || '_______________'}) :-
              ........................................................
            </p>
          ))}
        </div>
      </GovPage>

      <DocumentFormNo1 data={data} governmentStyle />
    </div>
  );
}
