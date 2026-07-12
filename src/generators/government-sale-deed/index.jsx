import React from 'react';
import {
  buildParishishtaText,
  formatGuCurrency,
  formatGuDate,
  formatPaymentRows,
  getPropertySnapshot,
  getSaleAmounts,
  toGuDigits,
} from '../../utils/aalekhDocumentUtils';
import DocumentFormNo1 from '../../components/DocumentFormNo1';
import PhotoSlotBox, { ThumbSlotBox, PASSPORT_PHOTO, STAMP_PHOTO } from '../../components/PhotoSlotBox';
import { GOVT, pStyle, headingStyle, titleStyle, cellStyle, tableStyle, idLineStyle } from './styles';
import { GovPage, GovSignatureStrip } from './GovPage';

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

function partyIdLines(party) {
  const lines = [];
  if (party.aadhaar) lines.push(`Aadhar Card no. ${party.aadhaar}`);
  if (party.pan) lines.push(`PAN No. ${party.pan}`);
  if (party.cin) lines.push(`CIN No. ${party.cin}`);
  if (party.mobile) lines.push(`Mobile No. ${toGuDigits(party.mobile)}`);
  if (!lines.length) return null;
  // Split across two rows when 3+ IDs so Aadhaar/PAN/Mobile don't overflow one line
  const mid = Math.ceil(lines.length / 2);
  const row1 = lines.slice(0, mid).join('   ');
  const row2 = lines.slice(mid).join('   ');
  return (
    <>
      <p style={idLineStyle}>{row1}</p>
      {row2 ? <p style={idLineStyle}>{row2}</p> : null}
    </>
  );
}

function partyLines(party, index) {
  const n = toGuDigits(index + 1);
  const age = party.age ? toGuDigits(party.age) : '____';
  const occ = party.occupation || party.business || '____________';
  const caste = party.caste || party.religion || '';
  const nameLine = party.isCorporate
    ? `${party.name}`
    : `${party.name || '_______________'}, ઉંમર આશરે વર્ષ ${age}, ધંધો ${occ}${caste ? `, જાતના ${caste}` : ''}`;

  return (
    <div
      key={index}
      style={{
        marginBottom: GOVT.sectionGap,
        display: 'flex',
        gap: '12px',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ ...pStyle, marginBottom: '4px' }}>
          <strong>
            {n}. {nameLine}
          </strong>
          {party.isCorporate && party.authorisedSignatory ? (
            <span> (અધિકૃત વ્યક્તિ: {party.authorisedSignatory})</span>
          ) : null}
        </p>
        {partyIdLines(party)}
        <p style={{ ...pStyle, marginLeft: '18px', marginBottom: 0 }}>
          રહેવાસી: {party.address || '_______________'}
        </p>
      </div>
      <StampPartyPhoto party={party} />
    </div>
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

/** Ownership Chain & Title History — માલિકી હક્ક સાંકળ */
function TitleHistorySection({ history = [] }) {
  const entries = (history || []).filter(hasTitleEntry);
  const rows = entries.length ? entries : [{ entryNo: '', date: '', description: '' }];

  return (
    <div style={{ marginTop: GOVT.sectionGap, marginBottom: GOVT.sectionGap }}>
      <div style={{ ...headingStyle, textDecoration: 'underline', marginBottom: '6px' }}>
        માલિકી હક્ક સાંકળ / Ownership Chain & Title History :-
      </div>
      <p style={{ ...pStyle, fontSize: GOVT.fontSizeSmall, marginBottom: GOVT.paragraphGap }}>
        નીચે મુજબની નોંધો / માઈલસ્ટોન્સ મુજબ મિલકતનો હક્ક સાંકળ (chain of title) સ્પષ્ટ થાય છે.
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

/**
 * Complete Government Style sale deed — structure/spacing matching
 * AALEKH/govt-sale-deed-format-in-gujarati.pdf (registered Gujarat deed format).
 */
export default function GovernmentSaleDeedBundle({
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
  const payments = formatPaymentRows(data.transaction?.payments, total);
  const half = Math.ceil(Math.max(payments.length, 1) / 2) || 1;
  const payA = payments.slice(0, half);
  const payB = payments.slice(half);
  const sumA = payA.reduce((a, r) => a + (parseFloat(r.amount) || 0), 0) || total;
  const sumB = payB.reduce((a, r) => a + (parseFloat(r.amount) || 0), 0);

  const locationLine = `મોજે ${snap.village}, તા. ${snap.taluka}, જી. ${snap.district}`;
  const amountTitle = `જમીનનો વેચાણ દસ્તાવેજ રૂપિયા ${toGuDigits(Number(total).toLocaleString('en-IN'))}/- પુરાનો :-`;
  return (
    <div id={containerId} className="deed-govt-sale-root">
      {/* —— Page 1: Title + Sellers (narrative) —— */}
      <GovPage pageNum={1} footer={<GovSignatureStrip sellers={sellers} buyers={buyers} />}>
        {/* Keep top blank band (no photo/thumb boxes) for stamp-paper / pasting area */}
        <div style={{ height: '175px', marginBottom: '10px' }} aria-hidden />

        <p style={{ ...pStyle, textAlign: 'center', marginBottom: '4px', fontSize: GOVT.fontSizeSmall }}>
          {locationLine}
        </p>
        <div style={{ ...titleStyle, marginBottom: '12px' }}>{amountTitle}</div>

        <p style={pStyle}>
          આજરોજ તારીખ : {formatGuDate(ex.executionDate)} ના રોજ {ex.executionPlace || snap.district} ખાતે
          સબ-રજિસ્ટ્રાર કચેરી {s.subRegistrarOffice || '_______________'} સમક્ષ નીચે જણાવેલ પક્ષકારો વચ્ચે
          રૂપિયા {toGuDigits(Number(total).toLocaleString('en-IN'))}/- ({totalWords}) ના અવેજે આ વેચાણ દસ્તાવેજ લખી આપવામાં /
          લખી લેવામાં આવે છે.
        </p>

        <div style={headingStyle}>વેચાણ આપનાર / લખી આપનાર :-</div>
        {(sellers.length ? sellers : [{}]).map((p, i) => partyLines(p, i))}
        <p style={pStyle}>
          (જેને આગળ &quot;વેચાણ આપનાર&quot; કહેવામાં આવશે, જેમાં તેના વારસદારો, કાયદેસર પ્રતિનિધિઓ, અમલદારો,
          વહીવટકર્તાઓ અને અસાઈનીઓ સામેલ છે.)
        </p>
      </GovPage>

      {/* —— Page 2: Buyers —— */}
      <GovPage pageNum={2} footer={<GovSignatureStrip sellers={sellers} buyers={buyers} />}>
        <div style={headingStyle}>વેચાણ લેનાર / લખી લેનાર :-</div>
        {(buyers.length ? buyers : [{}]).map((p, i) => {
          if (p.isCorporate) {
            return (
              <div
                key={i}
                style={{
                  marginBottom: GOVT.sectionGap,
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ ...pStyle, marginBottom: '4px' }}>
                    <strong style={{ textTransform: 'uppercase' }}>{p.name || '_______________'}</strong>
                  </p>
                  <p style={{ ...idLineStyle, marginLeft: 0 }}>
                    {[
                      p.pan ? `PAN No. ${p.pan}` : null,
                      p.cin ? `CIN No. ${p.cin}` : null,
                    ]
                      .filter(Boolean)
                      .join('   ')}
                  </p>
                  <p style={pStyle}>
                    જે કંપની કંપનીઓ અધિનિયમ અંતર્ગત નોંધાયેલ છે અને તેનું રજિસ્ટર્ડ ઓફિસ સરનામું :
                    {p.address || '_______________'} છે.
                    {p.authorisedSignatory
                      ? ` આ દસ્તાવેજ પર સહી કરનાર અધિકૃત વ્યક્તિ / ડિરેક્ટર : ${p.authorisedSignatory}.`
                      : ''}
                  </p>
                </div>
                <StampPartyPhoto party={p} />
              </div>
            );
          }
          return partyLines(p, i);
        })}
        <p style={pStyle}>
          (જેને આગળ &quot;વેચાણ લેનાર&quot; કહેવામાં આવશે, જેમાં તેના વારસદારો, કાયદેસર પ્રતિનિધિઓ અને અસાઈનીઓ સામેલ છે.)
        </p>
        <p style={pStyle}>ની વચ્ચે નીચે મુજબ એ રીતે કરવામાં આવ્યો છે કે,</p>
      </GovPage>

      {/* —— Page 3: Property / consideration narrative —— */}
      <GovPage pageNum={3} footer={<GovSignatureStrip sellers={sellers} buyers={buyers} />}>
        <p style={pStyle}>
          વેચાણ આપનાર એ વેચાણ લેનારને ખાતરી આપે છે કે જિલ્લા-{snap.district}, તાલુકા-{snap.taluka}, મોજે-{snap.village} ની{' '}
          {snap.surveyLine} ની બિનખેતી (NA) જમીન પર આવેલ &quot;{snap.complexName}&quot; સંકુલમાં આવેલ નંબર {snap.unitNo} ની મિલકત,
          કાર્પેટ એરિયા {snap.carpet} ચો.મી., યુનીટ પ્રોપર્ટી કાર્ડ નંબર {snap.unitCard} સહિત, સ્પષ્ટ, નિ:શંક અને વેચનયોગ્ય હક્કથી
          વેચાણ આપવામાં આવે છે.
        </p>
        <p style={pStyle}>{buildParishishtaText(data)}</p>

        <div style={headingStyle}>રૂપિયા મળ્યા અંગેની વિગત :-</div>
        <p style={pStyle}>
          <strong>(A)</strong> વેચાણ લેનારે વેચાણ આપનારને મિલકતના અવેજ પેટે નીચે મુજબની રકમ ચુકવેલ છે અને વેચાણ આપનારે
          સ્વીકારી છે.
        </p>
        <PaymentDetailTable rows={payA.length ? payA : [{ amount: total, mode: 'કુલ અવેજ' }]} totalLabel="કુલ રકમ રૂપિયા (A)" totalAmount={sumA} />
      </GovPage>

      {/* —— Page 4: More payments if any + title history —— */}
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
          વેચાણ આપનારે મિલકતનો ખાલી કબજો વેચાણ લેનારને સોંપ્યો છે.
        </p>

        <TitleHistorySection history={history} />

        <p style={{ ...pStyle, fontWeight: 700 }}>૧. બ્લોક / રેવન્યુ સર્વે વિગત :-</p>
        <p style={pStyle}>
          જિલ્લા-{snap.district}, તાલુકા-{snap.taluka}, મોજે-{snap.village} ની {snap.surveyLine} ની મિલકત.
          પ્લોટ ક્ષેત્રફળ {toGuDigits(s.totalPlotArea || '_______')} ચો.મી.
        </p>
        <p style={{ ...pStyle, fontWeight: 700 }}>૨. જમીનના ક્ષેત્રફળ બાબતનું સ્પષ્ટીકરણ :-</p>
        <p style={pStyle}>
          મોજે {snap.village} ના રેકોર્ડમાં બ્લોક-સર્વે નંબર {toGuDigits(s.blockSurveyNo || '_______')} નું ક્ષેત્રફળ
          રેકોર્ડ મુજબ નક્કી કરવામાં આવેલ છે.
        </p>
        {(s.naOrderNo || s.permissions?.naOrderNo) && (
          <>
            <p style={{ ...pStyle, fontWeight: 700 }}>૩. બિનખેતીની પરવાનગી બાબત ::-</p>
            <p style={pStyle}>
              કલેક્ટરશ્રીના ઓર્ડર નંબર {s.naOrderNo || s.permissions?.naOrderNo} તારીખ{' '}
              {formatGuDate(s.naOrderDate || s.permissions?.naOrderDate)} થી સદર જમીન બિનખેતી (NA) હેતુ માટે રૂપાંતરિત થયેલ છે.
            </p>
          </>
        )}
      </GovPage>

      {/* —— Page 5: Permissions / card / banakhat —— */}
      <GovPage pageNum={5} footer={<GovSignatureStrip sellers={sellers} buyers={buyers} />}>
        {(s.plotValidationOrderNo || s.permissions?.plotValidationOrderNo) && (
          <>
            <p style={{ ...pStyle, fontWeight: 700 }}>૪. પ્લોટ વેલીડેશન સર્ટીફીકેટ :-</p>
            <p style={pStyle}>
              ઓર્ડર નંબર {s.plotValidationOrderNo || s.permissions?.plotValidationOrderNo} તારીખ{' '}
              {formatGuDate(s.plotValidationDate || s.permissions?.plotValidationDate)} મુજબ પ્લોટ વેલીડેશન મંજૂર થયેલ છે.
            </p>
          </>
        )}
        {(s.constructionPermissionNo || s.permissions?.constructionPermissionNo) && (
          <>
            <p style={{ ...pStyle, fontWeight: 700 }}>૫. બાંધકામ પરવાનગી બાબત :-</p>
            <p style={pStyle}>
              બાંધકામ પરવાનગી નંબર {s.constructionPermissionNo || s.permissions?.constructionPermissionNo} તારીખ{' '}
              {formatGuDate(s.constructionPermissionDate || s.permissions?.constructionPermissionDate)} મુજબ
              &quot;{snap.complexName}&quot; સંકુલમાં બાંધકામ મંજૂર થયેલ છે.
            </p>
          </>
        )}
        <p style={{ ...pStyle, fontWeight: 700 }}>૬. પ્રોપર્ટી કાર્ડ બાબત :-</p>
        <p style={pStyle}>
          D.I.L.R. {snap.district} દ્વારા યુનીટ પ્રોપર્ટી કાર્ડ નંબર {snap.unitCard} મંજૂર કરવામાં આવેલ છે.
          વેચાણ આપનાર ખાતરી આપે છે કે મિલકતનો હક્ક સ્પષ્ટ અને વેચનયોગ્ય છે.
        </p>
        <p style={{ ...pStyle, fontWeight: 700 }}>૧૩. બાનાખત :-</p>
        <p style={pStyle}>
          પક્ષકારો વચ્ચે તારીખ {formatGuDate(s.banakhatDate || ex.executionDate)} ના રોજ બાનાખત (Agreement for Sale)
          કરવામાં આવેલ હતું. બંને પક્ષોએ તેની શરતોનું પાલન કર્યું છે અને હવે અંતિમ વેચાણ દસ્તાવેજ નોંધાવવાનું નક્કી કર્યું છે.
        </p>
        {snap.reraNumber && (
          <>
            <p style={{ ...pStyle, fontWeight: 700 }}>૧૮. RERA :-</p>
            <p style={pStyle}>મિલકત RERA અંતર્ગત નોંધાયેલ છે. નોંધણી નંબર: {snap.reraNumber}.</p>
          </>
        )}
      </GovPage>

      {/* —— Page 6: Covenants —— */}
      <GovPage pageNum={6} footer={<GovSignatureStrip sellers={sellers} buyers={buyers} />}>
        <div style={{ ...headingStyle, textAlign: 'center' }}>શરતો અને કરારો</div>
        <p style={pStyle}>
          આથી વેચાણ લેનાર પરિશિષ્ટમાં વર્ણવેલ મિલકતનો સંપૂર્ણ, સ્વતંત્ર માલિક બને છે; રહેઠાણ / વ્યવસાય માટે ઉપયોગ, ગીરો
          અથવા પુન:વેચાણ કરવાનો હક્ક સહિત.
        </p>
        <p style={pStyle}>
          વેચાણ આપનાર ખાતરી આપે છે કે મિલકત તેના સ્પષ્ટ હક્ક અને કબજા હેઠળ છે, ત્રીજા પક્ષના કોઈ દાવા / હિત / ભાર /
          અટકાયત નથી.
        </p>
        <p style={pStyle}>
          આજે પ્રત્યક્ષ કબજો વેચાણ લેનારને સોંપવામાં આવ્યો છે. વેચાણ આપનારે તમામ લાઇટ / વોટર / સોસાયટી / મ્યુનિસિપલ ટેક્સ
          આ તારીખ સુધી ચૂકવી દીધા છે.
        </p>
        <p style={pStyle}>
          Stamp Duty, registration charges, writing fees સહિત દસ્તાવેજના તમામ ખર્ચ વેચાણ લેનારના હશે.
        </p>
        <p style={pStyle}>
          પક્ષકારો વચ્ચે વિવાદ થાય તો પહેલા સમાધાન દ્વારા ઉકેલવાનો પ્રયાસ કરવો; નહીં થાય તો Real Estate (Regulation and
          Development) Act, 2016 (RERA) અને તેના નિયમો અંતર્ગત નિવારણ.
        </p>
        <p style={pStyle}>
          બંને પક્ષોએ આ દસ્તાવેજ વાંચીને, સમજીને, દબાણ વગર સ્વીકાર્યું છે અને તે તેમના વારસદારો / successors માટે બંધનકર્તા છે.
        </p>

        <div style={headingStyle}>સાક્ષીઓની વિગત / Witnesses :-</div>
        <p style={pStyle}>
          આ દસ્તાવેજ નીચે જણાવેલ સાક્ષીઓની હાજરીમાં લખી આપવામાં / લખી લેવામાં આવ્યો છે અને સાક્ષીઓએ પોતાની સહી કરી છે.
        </p>
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
              <div style={{ fontSize: GOVT.fontSizeTiny, color: '#333' }}>સાક્ષી {toGuDigits(i + 1)} ની સહી</div>
            </div>
          );
        })}
      </GovPage>

      {/* —— Page 7: Parishishta + boundaries —— */}
      <GovPage pageNum={7} footer={<GovSignatureStrip sellers={sellers} buyers={buyers} />}>
        <div style={{ ...titleStyle, color: '#000' }}>-:: પરિશિષ્ટ ::-</div>
        <p style={pStyle}>{buildParishishtaText(data)}</p>
        <p style={pStyle}>
          સદર વેચાણ સાથે common ownership rights અને internal / external amenities ના usage rights સહિત થાય છે.
          મિલકતની ચતુર્દિશા નીચે મુજબ:
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

      {/* —— Schedule 32-A party photo tables (signature pinned to avoid sparse gap) —— */}
      <GovPage pageNum={8} footer={<GovSignatureStrip sellers={sellers} buyers={buyers} />}>
        <div style={titleStyle}>શીડ્યુલ</div>
        <p style={{ ...pStyle, textAlign: 'center', fontWeight: 700 }}>
          રજીસ્ટ્રેશન એક્ટ ૧૯૦૮ ની કલમ ૩૨-અ મુજબ શીડ્યુલ
        </p>
        <div style={{ ...headingStyle, textAlign: 'center' }}>વેચાણ આપનાર</div>
        <SchedulePartyTable parties={sellers.length ? sellers : [{}]} />
      </GovPage>

      <GovPage pageNum={9} footer={<GovSignatureStrip sellers={sellers} buyers={buyers} />}>
        <div style={{ ...headingStyle, textAlign: 'center' }}>વેચાણ લેનાર</div>
        <SchedulePartyTable parties={buyers.length ? buyers : [{}]} />
      </GovPage>

      {/* —— Schedule: Witnesses (સાક્ષીઓ) —— */}
      <GovPage pageNum={10} footer={<GovSignatureStrip sellers={sellers} buyers={buyers} />}>
        <div style={titleStyle}>શીડ્યુલ — સાક્ષીઓ</div>
        <p style={{ ...pStyle, textAlign: 'center', fontWeight: 700, marginBottom: GOVT.sectionGap }}>
          રજીસ્ટ્રેશન એક્ટ ૧૯૦૮ મુજબ સાક્ષીઓની ઓળખ / ફોટો / અંગૂઠાનું નિશાન
        </p>
        <div style={{ ...headingStyle, textAlign: 'center' }}>સાક્ષીઓ (Witnesses)</div>
        <SchedulePartyTable parties={witnessList} showWitnessMeta />
        <div style={{ marginTop: GOVT.sectionGap }}>
          <p style={pStyle}>
            અમો ઉપરોક્ત સાક્ષીઓ ખાતરી આપીએ છીએ કે વેચાણ આપનાર અને વેચાણ લેનારે આ દસ્તાવેજ અમારી હાજરીમાં સહી કર્યો છે
            અને અમોએ પણ આ દસ્તાવેજ પર સાક્ષી તરીકે સહી કરી છે.
          </p>
        </div>
      </GovPage>

      {/* —— Annexure-A property photos (govt wording) —— */}
      <GovPage pageNum={11} footer={<GovSignatureStrip sellers={sellers} buyers={buyers} />}>
        <div style={{ ...titleStyle, textDecoration: 'none' }}>એનેક્ષર- એ</div>
        <div style={{ ...headingStyle, textAlign: 'center', marginBottom: '16px' }}>મિલકતની ઓળખ</div>
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
          <p style={{ ...headingStyle, marginBottom: '28px' }}>મિલકતનું વેચાણ લેનારની સહી</p>
          <p style={headingStyle}>મિલકતનું વેચાણ આપનારની સહી</p>
        </div>
        <div style={{ marginTop: '20px' }}>
          <div style={headingStyle}>સાક્ષીઓની સહી</div>
          {witnessList.map((w, i) => (
            <p key={i} style={{ ...pStyle, marginBottom: '18px' }}>
              સાક્ષી {toGuDigits(i + 1)} ({w.name || '_______________'}) :- ........................................................
            </p>
          ))}
        </div>
      </GovPage>

      {/* Form No.1 / Sec 32-A appendix (existing component, restyled page wrapper via class) */}
      <DocumentFormNo1 data={data} governmentStyle />
    </div>
  );
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
              <PhotoSlotBox src={p.photo || null} label="ફોટો" width={PASSPORT_PHOTO.width} height={PASSPORT_PHOTO.height} portrait />
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
