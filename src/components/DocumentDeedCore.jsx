import React from 'react';
import {
  AALEKH,
  buildParishishtaText,
  DeedPage,
  formatGuCurrency,
  formatGuDate,
  formatPaymentRows,
  getPropertySnapshot,
  getSaleAmounts,
  getSellerTableRows,
  partyTableRow,
  toGuDigits,
} from '../utils/aalekhDocumentUtils';

const pStyle = { margin: '0 0 8px 0', textAlign: 'justify', fontSize: AALEKH.fontSizeSmall, lineHeight: '1.55' };
const clauseStyle = { margin: '0 0 6px 0', textAlign: 'justify', fontSize: AALEKH.fontSizeSmall, lineHeight: '1.55' };
const bullet = '▶';

const partyHeaders = ['વેચાણ આપનાર (પ્રથમ પક્ષવાલા)', 'જાતના', 'ઉ.વ.આ.', 'ધંધો', 'રહેવાસી'];
const buyerHeaders = ['વેચાણ લેનાર (બીજા પક્ષવાલા)', 'જાતના', 'ઉ.વ.આ.', 'ધંધો', 'રહેવાસી'];

function PartyTable({ parties, sellerMode = false }) {
  const rows = sellerMode ? getSellerTableRows(parties) : (parties.length ? parties.map(partyTableRow) : [partyTableRow({})]);
  const headers = sellerMode ? partyHeaders : buyerHeaders;
  return (
    <div style={{ marginBottom: '10px' }}>
      <table className="deed-pdf-table" style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #000000' }}>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={h} style={{ border: AALEKH.border, padding: '4px', fontSize: AALEKH.fontSizeTiny, fontWeight: 'bold', textAlign: 'center', width: i === 0 ? '38%' : i === 4 ? '28%' : '10%' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td style={{ border: AALEKH.border, padding: '4px', fontSize: AALEKH.fontSizeTiny }}>{r.name}</td>
              <td style={{ border: AALEKH.border, padding: '4px', fontSize: AALEKH.fontSizeTiny, textAlign: 'center' }}>{r.caste}</td>
              <td style={{ border: AALEKH.border, padding: '4px', fontSize: AALEKH.fontSizeTiny, textAlign: 'center' }}>{r.age}</td>
              <td style={{ border: AALEKH.border, padding: '4px', fontSize: AALEKH.fontSizeTiny, textAlign: 'center' }}>{r.occupation}</td>
              <td style={{ border: AALEKH.border, padding: '4px', fontSize: AALEKH.fontSizeTiny }}>{r.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BuyerTable({ parties }) {
  const rows = parties.length ? parties.map(partyTableRow) : [partyTableRow({})];
  return (
    <div style={{ marginBottom: '10px' }}>
      <div style={{ fontWeight: 'bold', marginBottom: '4px', fontSize: AALEKH.fontSizeSmall }}>વેચાણ લેનાર (બીજા પક્ષવાલા)</div>
      <table className="deed-pdf-table" style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #000000' }}>
        <thead>
          <tr>
            {buyerHeaders.map((h) => (
              <th key={h} style={{ border: AALEKH.border, padding: '4px', fontSize: AALEKH.fontSizeTiny, fontWeight: 'bold', textAlign: 'center' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td style={{ border: AALEKH.border, padding: '4px', fontSize: AALEKH.fontSizeTiny }}>{r.name}</td>
              <td style={{ border: AALEKH.border, padding: '4px', fontSize: AALEKH.fontSizeTiny, textAlign: 'center' }}>{r.caste}</td>
              <td style={{ border: AALEKH.border, padding: '4px', fontSize: AALEKH.fontSizeTiny, textAlign: 'center' }}>{r.age}</td>
              <td style={{ border: AALEKH.border, padding: '4px', fontSize: AALEKH.fontSizeTiny, textAlign: 'center' }}>{r.occupation}</td>
              <td style={{ border: AALEKH.border, padding: '4px', fontSize: AALEKH.fontSizeTiny }}>{r.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ ...pStyle, marginTop: '6px' }}>
        (જેને &quot;વેચાણ લેનાર&quot; કહેવાશે, જેમાં તેના વારસદારો, કાયદેસર પ્રતિનિધિઓ, અમલદારો, વહીવટકર્તાઓ, પ્રતિનિધિઓ અને અસાઈનીઓ સામેલ છે.)
      </p>
      <p style={pStyle}>ની વચ્ચે નીચે મુજબ એ રીતે કરવામાં આવ્યો છે કે,</p>
    </div>
  );
}

function PaymentTable({ data }) {
  const t = data.transaction || {};
  const { total, totalWords } = getSaleAmounts(data);
  const rows = formatPaymentRows(t.payments, total);

  return (
    <div style={{ margin: '10px 0' }}>
      <div style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '6px' }}>અવેજની વિગત</div>
      <table className="deed-pdf-table" style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #000000' }}>
        <thead>
          <tr>
            {['રકમ', 'ચેક નંબર', 'બેંકનું નામ', 'તારીખ'].map((h) => (
              <th key={h} style={{ border: AALEKH.border, padding: '5px', fontSize: '9pt', fontWeight: 'bold' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              <td style={{ border: AALEKH.border, padding: '5px', fontSize: '9pt' }}>{formatGuCurrency(row.amount)}</td>
              <td style={{ border: AALEKH.border, padding: '5px', fontSize: '9pt' }}>{toGuDigits(row.instrumentNo || '_______')}</td>
              <td style={{ border: AALEKH.border, padding: '5px', fontSize: '9pt' }}>{row.bankName || '_______________'}</td>
              <td style={{ border: AALEKH.border, padding: '5px', fontSize: '9pt' }}>{formatGuDate(row.date)}</td>
            </tr>
          ))}
          <tr>
            <td style={{ border: AALEKH.border, padding: '5px', fontSize: '9pt', fontWeight: 'bold' }} colSpan={2}>
              {formatGuCurrency(total)} ({totalWords})
            </td>
            <td style={{ border: AALEKH.border, padding: '5px' }} colSpan={2} />
          </tr>
        </tbody>
      </table>
    </div>
  );
}

/**
 * AALEKH-format sale deed body — content-packed pages (not fixed 14-page split).
 * Page count follows content; formatting matches AALEKH style.
 */
export default function DocumentDeedCore({ data }) {
  const s = data.property || {};
  const sellers = data.parties?.sellers || [];
  const buyers = data.parties?.buyers || [];
  const history = data.titleHistory || [];
  const snap = getPropertySnapshot(data);
  const { total, totalWords } = getSaleAmounts(data);
  const ex = data.execution || {};
  const b = snap.boundaries;

  const entry = (idx, type, desc) => {
    const h = history[idx] || {};
    return (
      <div key={idx} style={{ marginBottom: '8px' }}>
        <div style={{ fontWeight: 'bold', fontSize: AALEKH.fontSizeSmall }}>
          {bullet} નોંધ નંબર : {toGuDigits(h.entryNo || '૦૦૦૦')} તારીખ : {formatGuDate(h.date)} ({type})
        </div>
        <p style={{ ...clauseStyle, marginLeft: '14px' }}>{desc || h.description || '_______________'}</p>
      </div>
    );
  };

  return (
    <>
      {/* 1 — Revenue stamp page (blank top intentional) */}
      <DeedPage pageNum={1} data={data} variant="stamp">
        <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '12pt', marginBottom: '10px', textDecoration: 'underline' }}>
          -: વેચાણ દસ્તાવેજ :-
        </div>
        <p style={pStyle}>
          રૂા.{toGuDigits(total.toLocaleString('en-IN'))}/- (અંકે રૂપિયા {totalWords}) ના સદર અવેજે
          આજ રોજ સવંત ૨૦૮૨, સને ૨૦૨૬ તારીખ-{formatGuDate(ex.executionDate)} માહે {ex.executionPlace || snap.district} ના દિને
          જિલ્લા-{snap.district}, તાલુકા-{snap.taluka}, મોજે-{snap.village} ની {snap.surveyLine} ની
          બિનખેતી (NA) જમીન પર આવેલ &quot;{snap.complexName}&quot; સંકુલમાં
          {snap.tower ? ` "${snap.tower}" ટાવરના` : ''} {snap.floor ? `${toGuDigits(snap.floor)} ફ્લોર` : ''} પર
          આવેલ નંબર {snap.unitNo} ની મિલકત, કાર્પેટ એરિયા {snap.carpet} ચો.મી.,
          યુનીટ પ્રોપર્ટી કાર્ડ નંબર {snap.unitCard} સહિત, વેચાણ કરવામાં આવે છે.
        </p>
      </DeedPage>

      {/* 2 — Parties */}
      <DeedPage pageNum={2} data={data}>
        <PartyTable parties={sellers} sellerMode />
        <p style={pStyle}>
          (જેને &quot;વેચાણ આપનાર&quot; કહેવાશે, જેમાં તેના વારસદારો, કાયદેસર પ્રતિનિધિઓ, અમલદારો, વહીવટકર્તાઓ, પ્રતિનિધિઓ અને અસાઈનીઓ સામેલ છે.)
        </p>
        <BuyerTable parties={buyers} />
      </DeedPage>

      {/* 3 — Title, area, NA, plot validation, construction */}
      <DeedPage pageNum={3} data={data}>
        <p style={{ ...clauseStyle, fontWeight: 'bold' }}>
          ૧. બ્લોક/રેવન્યુ સર્વે નંબર : {toGuDigits(s.blockSurveyNo || '૦૦૦')} ની સંપૂર્ણ વિગત :-
        </p>
        <p style={clauseStyle}>{buildParishishtaText(data)}</p>
        <p style={clauseStyle}>
          વેચાણ આપનાર એ વેચાણ લેનારને ખાતરી આપે છે કે મિલકતનો હક્ક સ્પષ્ટ, નિ:શંક, વેચannable અને કોઈપણ અન્ય હક્ક, હિત અથવા ભાર વગરનો છે.
        </p>
        {entry(0, 'હકકમી', history[0]?.description)}
        {entry(1, 'વેચાણ પ્રમાણિત', `વેચાણ અવેજ રૂા.${toGuDigits(total.toLocaleString('en-IN'))}/- ની મિલકતનું વેચાણ સબ-રજિસ્ટ્રાર કચેરીએ નોંધાયેલ છે.`)}
        {entry(2, 'વારસાઈ પ્રમાણીત', history[2]?.description || 'વારસાઈ પ્રમાણિત નોંધ મુજબ હક્ક હસ્તાંતરિત થયેલ છે.')}

        <p style={{ ...clauseStyle, fontWeight: 'bold', marginTop: '8px' }}>૨. જમીનના ક્ષેત્રફળ બાબતનું સ્પષ્ટીકરણ :-</p>
        <p style={clauseStyle}>
          ૨.૧. મોજે {snap.village} ના રેકોર્ડમાં બ્લોક-સર્વે નંબર {toGuDigits(s.blockSurveyNo || '_______')} નું
          ક્ષેત્રફળ {toGuDigits(s.totalPlotArea || '_______')} ચો.મી. નક્કી કરવામાં આવેલ છે.
        </p>

        <p style={{ ...clauseStyle, fontWeight: 'bold' }}>૩. બિનખેતીની પરવાનગી બાબત ::-</p>
        <div style={{ fontWeight: 'bold', fontSize: AALEKH.fontSizeSmall }}>
          {bullet} નોંધ નંબર : {toGuDigits(s.naOrderNo || '૦૦૦૦')} તારીખ : {formatGuDate(s.naOrderDate)} (બિનખેતી પ્રમાણીત)
        </div>
        <p style={{ ...clauseStyle, marginLeft: '14px' }}>
          ૩.૧. જિલ્લા-{snap.district} ના કલેક્ટરશ્રીના ઓર્ડર નંબર {s.naOrderNo || '_______'} તારીખ {formatGuDate(s.naOrderDate)} થી
          સદર જમીન બિનખેતી (NA) વ્યવસાયિક અને રહેઠાણ હેતુ માટે રૂપાંતરિત કરવામાં આવેલ છે.
        </p>

        <p style={{ ...clauseStyle, fontWeight: 'bold' }}>૪. પ્લોટ વેલીડેશન સર્ટીફીકેટ :-</p>
        <p style={clauseStyle}>
          ૪.૧. {snap.district} શહેરી વિકાસ સત્તામંડળના ઓર્ડર નંબર {s.plotValidationOrderNo || '_______'} તારીખ {formatGuDate(s.plotValidationDate)} મુજબ
          પ્લોટ વેલીડેશન સર્ટીફીકેટ મંજૂર કરવામાં આવેલ છે. GDCR ૨૦૧૭ મુજબ CP/Contribution Area કપાત સહિત ક્ષેત્રફળ નક્કી થયેલ છે.
        </p>

        <p style={{ ...clauseStyle, fontWeight: 'bold' }}>૫. બાંધકામ પરવાનગી બાબત :-</p>
        <p style={clauseStyle}>
          ૫.૧. બાંધકામ પરવાનગી નંબર {s.constructionPermissionNo || '_______'} તારીખ {formatGuDate(s.constructionPermissionDate)} મુજબ
          &quot;{snap.complexName}&quot; સંકુલમાં બાંધકામ મંજૂર કરવામાં આવેલ છે. સદર દસ્તાવેજમાં વર્ણવેલ મિલકતનો હક્ક વેચાણ આપનાર પાસે છે.
        </p>
      </DeedPage>

      {/* 4 — Property card, GPA, banakhat, payment */}
      <DeedPage pageNum={4} data={data}>
        <p style={{ ...clauseStyle, fontWeight: 'bold' }}>૬. પ્રોપર્ટી કાર્ડ બાબત</p>
        <p style={clauseStyle}>
          ૬.૧. D.I.L.R. {snap.district} દ્વારા યુનીટ પ્રોપર્ટી કાર્ડ નંબર {snap.unitCard} તારીખ {formatGuDate(s.revenueRecords?.extract712Date)} મંજૂર કરવામાં આવેલ છે.
        </p>
        <p style={clauseStyle}>
          વેચાણ આપનાર એ વેચાણ લેનારને ખાતરી આપે છે કે મિલકતનો હક્ક સ્પષ્ટ, વેચannable અને કોઈપણ અન્ય દાવા/હિત/ભાર વગરનો છે.
        </p>

        <p style={{ ...clauseStyle, fontWeight: 'bold' }}>૧૨. જી. પી. એ.</p>
        <p style={clauseStyle}>
          {s.gpaDetails || `વેચાણ આપનારે ${snap.district} ખાતે રજિસ્ટર થયેલ જનરલ પાવર ઑફ એટર્ની serial no. ___________ તારીખ ___________ મુજબ અધિકૃત વ્યક્તિને અધિકાર આપેલ છે.`}
        </p>

        <p style={{ ...clauseStyle, fontWeight: 'bold' }}>૧૩. બાનાખત</p>
        <p style={clauseStyle}>
          પક્ષકારો વચ્ચે તારીખ {formatGuDate(s.banakhatDate || ex.executionDate)} ના રોજ બિન-કબજાવાલા બાનાખત (Agreement for Sale) કરવામાં આવેલ હતું.
          બંને પક્ષોએ તેની શરતોનું પાલન કર્યું છે અને હવે અંતિમ વેચાણ દસ્તાવેજ નોંધાવવાનું નક્કી કર્યું છે.
        </p>

        <p style={{ ...clauseStyle, fontWeight: 'bold' }}>૧૪.</p>
        <p style={clauseStyle}>{buildParishishtaText(data)}</p>
        <p style={clauseStyle}>
          કાર્પેટ એરિયા {snap.carpet} ચો.મી. ({toGuDigits(Math.round(parseFloat(snap.carpetRaw) * 10.7639 || 0))} ચો.ફુટ) અને
          યુનીટ પ્રોપર્ટી કાર્ડ નંબર {snap.unitCard} ની મિલકત માટે વેચાણ લેનારે નીચે મુજબ અવેજની રકમ વેચાણ આપનારને ચૂકવી છે
          અને વેચાણ આપનારે રકમ મળેલી સ્વીકારી ખાલી કબજો સોંપ્યો છે.
        </p>
        <PaymentTable data={data} />
      </DeedPage>

      {/* 5 — Clauses 15–25 */}
      <DeedPage pageNum={5} data={data}>
        <p style={{ ...clauseStyle, fontWeight: 'bold' }}>૧૫.</p>
        <p style={clauseStyle}>
          પ્રોજેક્ટની BU પરવાનગી, FSI અને કોમન એરિયા/ટેરેસના હક્કો સોસાયટી/એસોસિએશન/પ્રોમોટર પાસે રહેશે, વેચાણ લેનારને ફ્લેટ/યુનિટ સિવાય અલગ હક્ક નહીં.
        </p>
        <p style={{ ...clauseStyle, fontWeight: 'bold', textDecoration: 'underline' }}>રદ કરવા બાબત (Severability)</p>
        <p style={clauseStyle}>
          આ કરારની કોઈ જોડાણ/શરત કાયદા અંતર્ગત અમાન્ય/અપ્રવર્તનીય ઠરે તો બાકીની જોડાણો/શરતો કાયદા દ્વારા મંજૂર સીમા સુધી માન્ય અને અમલયોગ્ય રહેશે.
        </p>

        <p style={{ ...clauseStyle, fontWeight: 'bold' }}>૧૬.</p>
        <p style={clauseStyle}>
          પક્ષકારો વચ્ચે વિવાદ થાય તો પહેલા settlement દ્વારા ઉકેલવાનો પ્રયાસ કરવો. નહીં થાય તો Real Estate (Regulation and Development) Act, 2016 (RERA) અને તેના નિયમો અંતર્ગત નિવારણ.
        </p>
        <p style={{ ...clauseStyle, fontWeight: 'bold' }}>૧૭.</p>
        <p style={clauseStyle}>
          કબજો સોંપણી પછી પાંચ વર્ષની અંદર structure/workmanship/quality/service ની કોઈ ખામી પ્રોમોટરને જણાવવામાં આવે તો પ્રોમોટર પોતાના ખર્ચે સુધારો કરશે; નહીં થાય તો કાયદા મુજબ compensation.
        </p>
        <p style={{ ...clauseStyle, fontWeight: 'bold' }}>૧૮.</p>
        <p style={clauseStyle}>
          મિલકત RERA અંતર્ગત નોંધાયેલ છે. નોંધણી નંબર: {snap.reraNumber || '_______________'}.
        </p>
        <p style={{ ...clauseStyle, fontWeight: 'bold' }}>૧૯.</p>
        <p style={clauseStyle}>
          કાર્પેટ એરિયા {snap.carpet} ચો.મી. ({toGuDigits(snap.floor || '___')} ફ્લોર) નંબર {snap.unitNo} ની મિલકત.
          કોમન એરિયાના હક્કો એસોસિએશન/સોસાયટી પાસે રહેશે.
        </p>
        <p style={{ ...clauseStyle, fontWeight: 'bold' }}>૨૦.</p>
        <p style={clauseStyle}>
          આથી વેચાણ લેનાર પરિશિષ્ટમાં વર્ણવેલ મિલકતનો સંપૂર્ણ, સ્વતંત્ર માલિક બને છે; રહેઠાણ/વ્યવસાય માટે ઉપયોગ, ગીરો અથવા પુન:વેચાણ કરવાનો હક્ક સહિત.
        </p>
        <p style={{ ...clauseStyle, fontWeight: 'bold' }}>૨૧.</p>
        <p style={clauseStyle}>
          વેચાણ આપનાર ખાતરી આપે છે કે મિલકત તેના સ્પષ્ટ હક્ક અને કબજા હેઠળ છે, ત્રીજા પક્ષના કોઈ દાવા/હિત/ભાર/અટકાયત નથી.
        </p>
        <p style={{ ...clauseStyle, fontWeight: 'bold' }}>૨૨.</p>
        <p style={clauseStyle}>
          {snap.district} શહેરી વિકાસ સત્તામંડળ પાસેથી મેળવેલ બાંધકામ/વિકાસ પરવાનગીઓ વેચાણ લેનારે તપાસી લીધી છે;
          પરવાનગી/ફેરફાર અંગે વેચાણ આપનારની વધુ જવાબદારી નહીં.
        </p>
        <p style={{ ...clauseStyle, fontWeight: 'bold' }}>૨૩.</p>
        <p style={clauseStyle}>
          મિલકત &quot;{snap.complexName}&quot; સંકુલનો ભાગ છે. &quot;{s.associationName || snap.complexName}&quot; નામની એસોસિએશન રચાશે.
          વેચાણ લેનારે એસોસિએશનના સભ્ય બનવું અને નિયમો/ફી પાલન કરવું.
        </p>
        <p style={clauseStyle}>(અ) કોમન maintenance ફી અને ખર્ચમાં ભાગ લેવો.</p>
        <p style={clauseStyle}>(બ) બહારની બાંધકામમાં ફેરફાર ન કરવો જે બીજા ફ્લેટને અસર કરે.</p>
        <p style={clauseStyle}>(ક) બહાર signboard ન મૂકવું.</p>
        <p style={clauseStyle}>(ડ) જ્વલનશીલ/જોખમી સામગ્રી સ્ટોર ન કરવી.</p>
        <p style={clauseStyle}>(ઈ) બીજા માલિકો/occupants ને nuisance ન પહોંચાડવું.</p>
      </DeedPage>

      {/* 6 — Remaining clauses, parishishta, boundaries, signatures */}
      <DeedPage pageNum={6} data={data} style={{ pageBreakAfter: 'always' }}>
        <p style={{ ...clauseStyle, fontWeight: 'bold' }}>૨૪.</p>
        <p style={clauseStyle}>
          વેચાણ આપનાર વેચાણ લેનારના નામે government records માં હક્ક હસ્તાંતર માટે જરૂરી દસ્તાવેજો, સહીઓ અને declarations આપશે.
        </p>
        <p style={{ ...clauseStyle, fontWeight: 'bold' }}>૨૫.</p>
        <p style={clauseStyle}>
          આજે પ્રત્યક્ષ કબજો વેચાણ લેનારને સોંપવામાં આવ્યો છે. વેચાણ આપનારે તમામ લાઇટ/વોટર/સોસાયટી/મ્યુનિસિપલ ટેક્સ આ તારીખ સુધી ચૂકવી દીધા છે.
        </p>
        <p style={{ ...clauseStyle, fontWeight: 'bold' }}>૨૬.</p>
        <p style={clauseStyle}>Works Contract Tax અને સંકુલના construction tax સંબંધિત જવાબદારી વેચાણ આપનારની રહેશે.</p>
        <p style={{ ...clauseStyle, fontWeight: 'bold' }}>૨૭.</p>
        <p style={clauseStyle}>
          Stamp Duty, registration charges, writing fees સહિત દસ્તાવેજના તમામ ખર્ચ વેચાણ લેનારના હશે.
        </p>
        <p style={{ ...clauseStyle, fontWeight: 'bold' }}>૨૮.</p>
        <p style={clauseStyle}>GST કેન્દ્ર સરકારના budget અને કાયદા મુજબ લાગુ; સંબંધિત ચુકવણી વેચાણ લેનાર કરશે.</p>
        <p style={{ ...clauseStyle, fontWeight: 'bold' }}>૨૯.</p>
        <p style={clauseStyle}>
          mixed commercial/residential project માં parking, drainage, common amenities માટે cooperation અને maintenance ભાગ લેવો.
        </p>
        <p style={{ ...clauseStyle, fontWeight: 'bold' }}>૩૦. વિવાદનું નિવારણ</p>
        <p style={clauseStyle}>
          પક્ષકારો વચ્ચે વિવાદ settlement દ્વારા ઉકેલવો; નહીં થાય તો RERA Act 2016 અને rules અંતર્ગત.
        </p>

        <p style={clauseStyle}>વેચાણ આપવા નક્કી કરેલ મિલકતની વિગત નીચે મુજબ છે.</p>
        <div style={{ textAlign: 'center', fontWeight: 'bold', color: AALEKH.accentPink, textDecoration: 'underline', margin: '8px 0' }}>
          -:: પરિશિષ્ટ ::-
        </div>
        <p style={clauseStyle}>{buildParishishtaText(data)}</p>

        <p style={clauseStyle}>
          સદર વેચાણ સાથે common ownership rights અને internal/external amenities ના usage rights સહિત થાય છે.
          મિલકતની ચતુર્દિશા નીચે મુજબ:
        </p>
        <div style={{ textAlign: 'center', fontWeight: 'bold', margin: '8px 0' }}>ચતુર્દિશા</div>
        {[
          ['પૂર્વે', b.east || '_______________'],
          ['પશ્ચિમે', b.west || '_______________'],
          ['ઉત્તરે', b.north || '_______________'],
          ['દક્ષિણે', b.south || '_______________'],
        ].map(([dir, val]) => (
          <p key={dir} style={{ ...clauseStyle, fontWeight: 'bold' }}>{dir} :- {val}</p>
        ))}
        <p style={{ ...clauseStyle, marginTop: '10px' }}>
          બંને પક્ષોએ આ દસ્તાવેજ વાંચીને, સમજીને, pressure વગર સ્વીકાર્યું છે અને તે તેમના વારસદારો/successors માટે binding છે.
        </p>
        <div style={{ marginTop: '18px', fontSize: AALEKH.fontSizeSmall }}>
          <p style={{ margin: '6px 0' }}>અત્રે.................................................                     અત્રે.................................................     સાક્ષી</p>
          {sellers.map((seller, i) => (
            <div key={i} style={{ marginTop: '14px' }}>
              <div>{seller.name}</div>
              {seller.isCorporate && <div>પેઢીના અધિકૃત ભાગીદાર : {seller.authorisedSignatory || '_______________'}</div>}
              <div style={{ borderBottom: '1px dotted #000', marginTop: '24px', width: '70%' }} />
            </div>
          ))}
          {buyers.map((buyer, i) => (
            <div key={`b-${i}`} style={{ marginTop: '14px' }}>
              <div>વેચાણ લેનાર: {buyer.name}</div>
              <div style={{ borderBottom: '1px dotted #000', marginTop: '24px', width: '70%' }} />
            </div>
          ))}
        </div>
      </DeedPage>
    </>
  );
}
