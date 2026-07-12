/**
 * Paragraph engine — mustache-style {{placeholder}} replacement.
 */

export function renderTemplate(template, context = {}) {
  if (!template) return '';
  return String(template).replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_, key) => {
    const value = context[key];
    if (value === null || value === undefined || value === '') return '_______________';
    return String(value);
  });
}

export function renderLocalized(templateObj, locale = 'gu', context = {}) {
  if (!templateObj) return '';
  if (typeof templateObj === 'string') return renderTemplate(templateObj, context);
  const raw = templateObj[locale] || templateObj.gu || templateObj.en || '';
  return renderTemplate(raw, context);
}

export default { renderTemplate, renderLocalized };
