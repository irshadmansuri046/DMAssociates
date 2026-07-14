import React from 'react';
import { amountInWords } from './documentStyles';

/** Gujarati numeral mapping */
const GU_DIGITS = ['૦', '૧', '૨', '૩', '૪', '૫', '૬', '૭', '૮', '૯'];

export function toGuDigits(value) {
  if (value === null || value === undefined) return '';
  return String(value).replace(/[0-9]/g, (d) => GU_DIGITS[Number(d)] ?? d);
}

export function formatGuDate(dateStr) {
  if (!dateStr) return '.....................';
  try {
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return dateStr;
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return toGuDigits(`${dd}-${mm}-${yyyy}`);
  } catch {
    return dateStr;
  }
}

export function formatGuCurrency(amount) {
  const n = parseFloat(amount) || 0;
  const formatted = n.toLocaleString('en-IN', { maximumFractionDigits: 0 });
  return `₹ ${toGuDigits(formatted)} /-`;
}

export function formatGuIndianNumber(amount, decimals = 0) {
  const n = parseFloat(amount) || 0;
  const formatted = n.toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return toGuDigits(formatted);
}

export function getCoverSiteTitle(data) {
  const s = data.property || {};
  if (s.complexName?.trim()) return s.complexName.trim();
  if (s.siteName?.trim()) return s.siteName.trim();
  return s.village || '_______________';
}

/** Layout tokens matched to AALEKH/demofile.pdf (A4 @ 96dpi) */
export const AALEKH = {
  fontFamily: '"Noto Sans Gujarati", "Shruti", "Nirmala UI", sans-serif',
  fontSize: '11pt',
  fontSizeSmall: '10pt',
  fontSizeTiny: '9pt',
  fontSizeMicro: '8pt',
  color: '#000000',
  border: '1px solid #000000',
  pagePadding: '12mm 14mm 10mm',
  pageWidth: '794px',
  pageHeight: '1123px',
  /** Top blank on revenue-stamp deed page 1 — AALEKH/2.png */
  stampReserveHeight: '480px',
  watermarkColor: 'rgba(37, 99, 235, 0.05)',
  accentBlue: '#1e40af',
  accentPink: '#be185d',
  accentGreen: '#15803d',
  accentLabelBlue: '#3b82c6',
};

export function aalekhPageStyle(extra = {}) {
  return {
    width: AALEKH.pageWidth,
    maxWidth: AALEKH.pageWidth,
    minHeight: AALEKH.pageHeight,
    boxSizing: 'border-box',
    padding: AALEKH.pagePadding,
    backgroundColor: '#ffffff',
    color: AALEKH.color,
    fontFamily: AALEKH.fontFamily,
    fontSize: AALEKH.fontSize,
    lineHeight: '1.55',
    position: 'relative',
    pageBreakAfter: 'always',
    breakAfter: 'page',
    ...extra,
  };
}

export function cell(style = {}) {
  const {
    textAlign,
    fontSize,
    fontWeight,
    width,
    background,
    backgroundColor,
    padding,
    height,
    minHeight,
    ...rest
  } = style;
  return {
    border: '0.5px solid #000000',
    padding: padding != null ? padding : '5px 7px',
    margin: 0,
    verticalAlign: 'middle',
    textAlign: textAlign || 'center',
    fontSize: fontSize || AALEKH.fontSizeSmall,
    fontWeight,
    width,
    background: background || backgroundColor,
    backgroundColor: background || backgroundColor,
    lineHeight: 1.25,
    boxSizing: 'border-box',
    wordBreak: 'break-word',
    overflowWrap: 'anywhere',
    whiteSpace: 'normal',
    ...(height != null ? { height } : {}),
    ...(minHeight != null ? { minHeight } : {}),
    ...rest,
  };
}

/**
 * Optional inner wrapper — keep as plain block (no nested tables / flex).
 * Prefer putting padding on the <td> via cell() instead.
 */
export function CellInner({ children, style = {} }) {
  return (
    <div
      style={{
        display: 'block',
        width: '100%',
        textAlign: style.textAlign || 'center',
        fontWeight: style.fontWeight,
        fontSize: style.fontSize,
        lineHeight: 1.25,
        wordBreak: 'break-word',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** Prefer explicit Moje/Mouza; otherwise Village / City (legacy drafts). */
export function resolveMoje(property = {}) {
  const moje = String(property.moje || '').trim();
  if (moje) return moje;
  return String(property.village || '').trim();
}

/** Extract normalized property snapshot from form data */
export function getPropertySnapshot(data) {
  const s = data.property || {};
  const district = s.district || '_______________';
  const taluka = s.taluka || district;
  const village = s.village || '_______________';
  const moje = resolveMoje(s) || '_______________';
  const complexName = s.complexName?.trim() || s.siteName?.trim() || village;
  const unitNo = s.unitNumber?.trim() || '___';
  const carpet = s.carpetArea || s.constructionArea || s.totalPlotArea || '___';
  const veranda = s.verandaArea?.trim() || '___';
  const unitCard = s.unitCardNo?.trim() || s.revenueRecords?.propertyCardNo || '_______________';
  const citySurvey = s.newCitySurveyNo ? toGuDigits(s.newCitySurveyNo) : '_______';
  const surveyLine = s.blockSurveyNo
    ? `રે.સર્વે નં. ${toGuDigits(s.blockSurveyNo)}, સીટી સર્વે નંબર ${citySurvey}`
    : 'રે.સર્વે નં. _______, સીટી સર્વે નંબર _______';

  return {
    district,
    taluka,
    village,
    moje,
    complexName,
    unitNo: toGuDigits(unitNo),
    carpet: toGuDigits(carpet),
    veranda: toGuDigits(veranda),
    unitCard,
    surveyLine,
    carpetRaw: carpet,
    unitNoRaw: unitNo,
    floor: s.floor || '',
    tower: s.tower || '',
    totalPlotArea: s.totalPlotArea || '',
    boundaries: s.boundaries || {},
    latitude: s.latitude || '',
    longitude: s.longitude || '',
    reraNumber: s.reraNumber || '',
    postalAddress: s.postalAddress || buildPostalAddress(s),
  };
}

export function buildPostalAddress(s) {
  const parts = [
    s.village ? `મું.પો. ${s.village}` : '',
    s.taluka || s.district ? `તા. જી. ${[s.taluka, s.district].filter(Boolean).join(', ')}` : '',
    s.complexName ? `જમીન પર આવેલ '${s.complexName}' સંકુલ` : '',
    s.floor ? `${toGuDigits(s.floor)} ફ્લોર પર આવેલ` : '',
    s.unitNumber ? `નંબર : ${toGuDigits(s.unitNumber)}` : '',
  ].filter(Boolean);
  return parts.join(', ') || '_______________';
}

export function buildParishishtaText(data) {
  const snap = getPropertySnapshot(data);
  const towerPart = snap.tower ? ` "${snap.tower}" ટાવરના ` : ' ';
  const floorPart = snap.floor ? `${toGuDigits(snap.floor)} ફ્લોર પર આવેલ ` : '';
  const unitPart = snap.unitNoRaw ? `નંબર ${toGuDigits(snap.unitNoRaw)}` : 'નંબર _______';

  return (
    `જિલ્લા-${snap.district}, તાલુકા-${snap.taluka}, મોજે-${snap.moje} ની ${snap.surveyLine} ની ` +
    `બિનખેતી (NA) જમીન પર આવેલ "${snap.complexName}" શોપિંગ કોમ્પ્લેક્ષ અને રહેઠાણ મકાનોના` +
    `${towerPart}${floorPart}${unitPart} ની મિલકત, જેનો કાર્પેટ એરિયા ${snap.carpet} ચો.મી. છે, ` +
    `યુનીટ પ્રોપર્ટી કાર્ડ નંબર ${snap.unitCard} સાથે, ` +
    `જેમાં ${snap.veranda} ચો.મી. જમીનનો અવિભાજ્ય હિસ્સો સહિત, ` +
    `સ્પષ્ટ, નિ:શંક અને વિવાદરહિત હક્ક સહિત વેચાણ આપવામાં આવે છે.`
  );
}

/** Recurring 6-column property summary table — sits directly under page content */
export function PropertySummaryTable({ data }) {
  const snap = getPropertySnapshot(data);
  const td = (children, style = {}) => <td style={cell(style)}>{children}</td>;
  return (
    <table
      style={{
        width: '100%',
        borderCollapse: 'collapse',
        borderSpacing: 0,
        border: '1px solid #000000',
        marginTop: '12px',
        flexShrink: 0,
        lineHeight: 1.25,
        tableLayout: 'fixed',
      }}
      className="deed-pdf-table"
    >
      <tbody>
        <tr>
          {td('મોજે / ગામ', { fontWeight: 'bold', width: '14%' })}
          {td('સર્વે નંબર', { fontWeight: 'bold', width: '22%' })}
          {td('કોમ્પલેક્ષનું નામ :', { fontWeight: 'bold', width: '18%' })}
          {td('નંબર :', { fontWeight: 'bold', width: '8%' })}
          {td('બાંધકામનો કાર્પેટ એરિયા:', { fontWeight: 'bold', width: '20%' })}
          {td('વરાડેનું ક્ષેત્રફળ :', { fontWeight: 'bold', width: '18%' })}
        </tr>
        <tr>
          {td(`મોજે ${snap.moje}, તા.જી. ${snap.district}.`)}
          {td(snap.surveyLine, { fontSize: AALEKH.fontSizeTiny })}
          {td(snap.complexName)}
          {td(snap.unitNo)}
          {td(`${snap.carpet} ચો.મી.`)}
          {td(snap.veranda)}
        </tr>
        <tr>
          <td colSpan={6} style={cell({ fontSize: AALEKH.fontSizeTiny })}>
            જે નંબર : {snap.unitNo} નો યુનીટ કાર્ડ નંબર : {snap.unitCard}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

/** Centered page watermark — app brand */
export function Watermark() {
  const name = 'DM ASSOCIATES';
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        opacity: 0.07,
        pointerEvents: 'none',
        zIndex: 0,
        userSelect: 'none',
        width: '70%',
      }}
    >
      <div
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          border: '3px solid #2563eb',
          margin: '0 auto 8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '28pt',
          color: '#2563eb',
        }}
      >
        ✒
      </div>
      <div style={{ fontSize: '28pt', fontWeight: 'bold', color: '#2563eb', letterSpacing: '1px', lineHeight: 1.2 }}>
        {name}
      </div>
    </div>
  );
}

export function PageNumber({ n }) {
  return (
    <div style={{ textAlign: 'center', fontSize: AALEKH.fontSize, marginBottom: '8px', fontWeight: 'bold', flexShrink: 0 }}>
      {toGuDigits(n)}
    </div>
  );
}

/**
 * Deed page — content-packed.
 * - stamp: blank top for revenue stamp paper, then title/body/table together
 * - default: page number + body + summary table with no middle gap
 */
export function DeedPage({ pageNum, data, children, style, variant = 'default', showSummary = true }) {
  const branding = data.branding || {};
  const isStampPage = variant === 'stamp';

  return (
    <div style={{ ...aalekhPageStyle(style), display: 'flex', flexDirection: 'column' }} className="gov-doc-page aalekh-page">
      <Watermark />
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column' }}>
        {pageNum != null && <PageNumber n={pageNum} />}
        {isStampPage && <div aria-hidden style={{ height: AALEKH.stampReserveHeight, flexShrink: 0 }} />}
        <div>{children}</div>
        {showSummary && <PropertySummaryTable data={data} />}
      </div>
    </div>
  );
}

/** Section 32-A boundary cross + table (AALEKH page 18) */
export function BoundaryCrossBlock({ boundaries = {} }) {
  const rows = [
    ['ઉત્તર', boundaries.north || '_______________'],
    ['પૂર્વ', boundaries.east || '_______________'],
    ['દક્ષિણ', boundaries.south || '_______________'],
    ['પશ્ચિમ', boundaries.west || '_______________'],
  ];

  return (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginTop: '6px' }}>
      <div
        style={{
          position: 'relative',
          width: '100px',
          height: '100px',
          border: AALEKH.border,
          flexShrink: 0,
          fontSize: AALEKH.fontSizeMicro,
        }}
      >
        <span style={{ position: 'absolute', top: 2, left: '50%', transform: 'translateX(-50%)' }}>ઉત્તર</span>
        <span style={{ position: 'absolute', bottom: 2, left: '50%', transform: 'translateX(-50%)' }}>દક્ષિણ</span>
        <span style={{ position: 'absolute', left: 2, top: '50%', transform: 'translateY(-50%)' }}>પશ્ચિમ</span>
        <span style={{ position: 'absolute', right: 2, top: '50%', transform: 'translateY(-50%)' }}>પૂર્વ</span>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '55%',
            height: '55%',
            border: AALEKH.border,
          }}
        />
      </div>
      <table className="deed-pdf-table" style={{ flex: 1, borderCollapse: 'collapse', borderSpacing: 0, border: '1px solid #000000', fontSize: AALEKH.fontSizeMicro, lineHeight: 1.25 }}>
        <tbody>
          {rows.map(([dir, val]) => (
            <tr key={dir}>
              <td style={cell({ width: '22%', fontWeight: 'bold', fontSize: AALEKH.fontSizeMicro })}>{dir}</td>
              <td style={cell({ fontSize: AALEKH.fontSizeMicro, textAlign: 'left' })}>{val}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function partyTableRow(party) {
  const name = party.isCorporate
    ? `${party.name} (${party.authorisedSignatory || 'અધિકૃત વ્યક્તિ'})`
    : party.name || '_______________';
  const ids = [
    party.aadhaar ? `આધાર કાર્ડ નં. (${toGuDigits(party.aadhaar.replace(/\s/g, ''))})` : '',
    party.pan ? `PAN કાર્ડ નં. (${party.pan})` : '',
    party.mobile ? `મોબાઈલ નં. (${toGuDigits(party.mobile)})` : '',
  ].filter(Boolean).join(', ');

  return {
    name: ids ? `${name}, ${ids}` : name,
    caste: party.religion || party.caste || '_______________',
    age: party.age ? toGuDigits(party.age) : '___',
    occupation: party.occupation || '_______________',
    address: party.address || '_______________',
  };
}

/** Seller rows — corporate firms get a second row for authorised signatory (AALEKH format) */
export function getSellerTableRows(parties) {
  const rows = [];
  for (const party of parties || []) {
    if (party.isCorporate) {
      rows.push({
        name: `${party.name}, PAN (${party.pan || '_______'})${party.mobile ? `, મોબાઈલ (${toGuDigits(party.mobile)})` : ''}`,
        caste: '—',
        age: '—',
        occupation: '—',
        address: party.registeredOffice || party.address || '_______________',
      });
      rows.push({
        name: party.authorisedSignatory || 'અધિકૃત ભાગીદાર',
        caste: party.signatoryReligion || party.religion || '_______________',
        age: party.signatoryAge ? toGuDigits(party.signatoryAge) : (party.age ? toGuDigits(party.age) : '___'),
        occupation: party.signatoryOccupation || party.occupation || '_______________',
        address: party.signatoryAddress || party.address || '_______________',
      });
    } else {
      rows.push(partyTableRow(party));
    }
  }
  return rows.length ? rows : [partyTableRow({})];
}

export function formatPaymentRows(payments, totalAmount) {
  const rows = (payments || []).filter((p) => p.amount);
  if (!rows.length && totalAmount) {
    return [{
      amount: totalAmount,
      mode: 'RTGS',
      instrumentNo: '_______________',
      bankName: '_______________',
      branchName: '',
      chequeNumber: '',
      utrNumber: '',
      transactionNumber: '',
      date: '_______________',
    }];
  }
  return rows;
}

export function paymentTotalWords(amount) {
  return amountInWords(parseInt(amount, 10) || 0, 'gu');
}

export function getSaleAmounts(data) {
  const t = data.transaction || {};
  const total = parseFloat(t.totalSaleAmount) || 0;
  const stamp = parseFloat(t.stampDutyAmount) || 0;
  return { total, stamp, totalWords: paymentTotalWords(total) };
}
