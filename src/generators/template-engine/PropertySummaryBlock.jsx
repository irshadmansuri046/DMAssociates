import React from 'react';
import { getTemplateTheme, tableStyle, PdfTableCell } from './styles';
import { toGuDigits } from '../../utils/aalekhDocumentUtils';

/**
 * Adaptive property summary — only non-empty fields.
 * Odd last field spans half-width so empty cells are not drawn.
 */
export function PropertySummaryBlock({ doc }) {
  const theme = getTemplateTheme(doc.templateId);
  const p = doc.property || {};
  const survey = p.survey || {};
  const building = p.building || {};
  const unit = p.unit || {};
  const areas = p.areas || {};
  const gov = p.govRecords || {};

  const fields = [
    ['District', p.district],
    ['Taluka', p.taluka || p.district],
    ['Village', p.village],
    ['Moje / Mouza', p.moje || p.village],
    ['Survey No', p.blockSurveyNo || survey.blockSurveyNo],
    ['Block No', survey.blockSurveyNo || p.blockSurveyNo],
    ['City Survey', p.newCitySurveyNo || survey.newCitySurveyNo || gov.citySurvey?.citySurveyNo],
    ['TP Scheme', gov.tpScheme?.tpNo || (p.tpFpNo || '').split(/[,/]/)[0]],
    ['FP Number', gov.tpScheme?.fpNo || (p.tpFpNo || '').split(/[,/]/)[1]],
    ['Property Card', p.unitCardNo || p.revenueRecords?.propertyCardNo || gov.propertyCard?.cardNo],
    ['Building', p.complexName || building.complexName || p.siteName],
    ['Wing / Tower', p.tower || building.tower || building.wing],
    ['Floor', p.floor || unit.floor],
    ['Unit No', p.unitNumber || unit.unitNumber],
    ['Plot Area', p.totalPlotArea || areas.totalPlotArea],
    ['Carpet Area', p.carpetArea || areas.carpetArea],
    ['Built-up Area', areas.builtUpArea || p.constructionArea || areas.constructionArea],
    ['Super Built-up', areas.superBuiltUpArea],
    ['Parking', areas.parkingSlots || p.parking?.slots || areas.parkingArea],
    ['Terrace', areas.terraceArea || p.verandaArea || areas.verandaArea],
    ['Property UID', unit.propertyUid],
  ].filter(([, v]) => v !== null && v !== undefined && String(v).trim() !== '');

  if (!fields.length) return null;

  const rows = [];
  for (let i = 0; i < fields.length; i += 2) {
    rows.push(fields.slice(i, i + 2));
  }

  const display = (value) =>
    typeof value === 'number' || /^\d/.test(String(value)) ? toGuDigits(value) : value;

  const cellBg = (idx) => (idx % 2 ? '#fafafa' : '#fff');

  return (
    <table className="deed-keep deed-pdf-table" style={tableStyle({ marginTop: '10px' })}>
      <tbody>
        {rows.map((pair, idx) => {
          const bg = cellBg(idx);
          if (pair.length === 1) {
            const [label, value] = pair[0];
            return (
              <tr key={idx}>
                <PdfTableCell
                  theme={theme}
                  style={{ fontWeight: 700, width: '18%', fontSize: '8pt', background: bg }}
                >
                  {label}
                </PdfTableCell>
                <PdfTableCell
                  theme={theme}
                  colSpan={3}
                  style={{ width: '82%', fontSize: '8pt', background: bg, textAlign: 'left' }}
                >
                  {display(value)}
                </PdfTableCell>
              </tr>
            );
          }
          return (
            <tr key={idx}>
              {pair.map(([label, value]) => (
                <React.Fragment key={label}>
                  <PdfTableCell
                    theme={theme}
                    style={{
                      fontWeight: 700,
                      width: '18%',
                      fontSize: '8pt',
                      background: bg,
                    }}
                  >
                    {label}
                  </PdfTableCell>
                  <PdfTableCell
                    theme={theme}
                    style={{
                      width: '32%',
                      fontSize: '8pt',
                      background: bg,
                    }}
                  >
                    {display(value)}
                  </PdfTableCell>
                </React.Fragment>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default PropertySummaryBlock;
