import { renderLocalized } from '../paragraph-engine';
import { buildParagraphContext } from '../../models/adapters';
import { toGuDigits, formatGuDate, formatGuCurrency } from '../../utils/aalekhDocumentUtils';
import { amountInWords } from '../../utils/documentStyles';

/**
 * Evaluate clause pack against document; return rendered clause blocks.
 */
export function selectClauses(clausePack = [], doc) {
  return clausePack
    .filter((clause) => {
      if (clause.documentTypes?.length && !clause.documentTypes.includes(doc.documentType)) {
        return false;
      }
      if (typeof clause.condition === 'function') {
        try {
          return Boolean(clause.condition(doc));
        } catch {
          return false;
        }
      }
      return true;
    })
    .sort((a, b) => (a.priority ?? 100) - (b.priority ?? 100));
}

export function renderClauses(clausePack, doc, locale = 'gu') {
  const helpers = {
    toGuDigits,
    formatGuDate,
    formatCurrency: formatGuCurrency,
  };
  const context = {
    ...buildParagraphContext(doc, helpers),
    SaleAmountWords: amountInWords(parseInt(doc.transaction?.totalSaleAmount, 10) || 0, locale === 'gu' ? 'gu' : 'en'),
  };

  const selected = selectClauses(clausePack, doc);
  return selected.map((clause) => ({
    id: clause.id,
    title: renderLocalized(clause.title, locale, context),
    body: renderLocalized(clause.template, locale, context),
    priority: clause.priority,
    renderAs: clause.renderAs || 'paragraph', // paragraph | table | parties | payment | boundaries | signatures
    meta: clause.meta || {},
  }));
}

export default { selectClauses, renderClauses };
