import React from 'react';
import { useDeedForm } from '../context/DeedFormContext';
import { useLanguage } from '../context/LanguageContext';
import {
  DOCUMENT_TYPES,
  DOCUMENT_TYPE_IDS,
  getSaleDeedPropertyDefaults,
  isBuilderSaleDeedType,
} from '../constants/documentTypes';
import { TEMPLATES, TEMPLATE_IDS, DEFAULT_TEMPLATE_ID } from '../constants/templates';
import { getDocumentRequirements } from '../constants/documentTypeRequirements';
import { FileText } from 'lucide-react';

/** Document type + template picker (platform config) */
export default function DocumentConfigBar() {
  const { formData, updateField } = useDeedForm();
  const { language, t } = useLanguage();
  const locale = language === 'gu' ? 'gu' : 'en';
  const docType = formData.documentType || 'sale_deed_flat';
  const templateId = formData.templateId || DEFAULT_TEMPLATE_ID;
  const req = getDocumentRequirements(docType);

  const onDocumentTypeChange = (id) => {
    updateField('documentType', id);
    const defaults = getSaleDeedPropertyDefaults(id);
    if (defaults?.propertyType) updateField('property.propertyType', defaults.propertyType);
    if (defaults?.unitType !== undefined) updateField('property.unitType', defaults.unitType);
    // Farm land Government Style matches Original/farm_land_sale_deed.pdf
    if (id === 'sale_deed_farm_land') {
      updateField('templateId', TEMPLATE_IDS.government);
    }
  };

  return (
    <div className="mb-4 sm:mb-6 bg-white rounded-xl border border-slate-200 shadow-sm p-3 sm:p-4 no-print">
      <div className="flex items-center gap-2 mb-3">
        <FileText size={16} className="text-slate-700 shrink-0" />
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider m-0">{t('documentConfiguration')}</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div className="min-w-0">
          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">{t('documentType')}</label>
          <select
            value={DOCUMENT_TYPES[docType] && !DOCUMENT_TYPES[docType].hidden ? docType : 'sale_deed_flat'}
            onChange={(e) => onDocumentTypeChange(e.target.value)}
            className="w-full text-sm px-3 py-2.5 rounded-lg border border-slate-250 bg-white focus:outline-none focus:border-emerald-600 min-h-[44px]"
          >
            {DOCUMENT_TYPE_IDS.map((id) => (
              <option key={id} value={id}>
                {DOCUMENT_TYPES[id].label[locale] || DOCUMENT_TYPES[id].label.en}
              </option>
            ))}
          </select>
        </div>
        <div className="min-w-0">
          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">{t('pdfTemplateStyle')}</label>
          <select
            value={templateId}
            onChange={(e) => updateField('templateId', e.target.value)}
            className="w-full text-sm px-3 py-2.5 rounded-lg border border-slate-250 bg-white focus:outline-none focus:border-emerald-600 min-h-[44px]"
          >
            {Object.values(TEMPLATE_IDS).map((id) => (
              <option key={id} value={id}>
                {TEMPLATES[id].label[locale] || TEMPLATES[id].label.en}
              </option>
            ))}
          </select>
        </div>
      </div>
      <p className="text-[11px] text-slate-500 mt-3 mb-0 leading-relaxed">
        {t('formStepsAdapt')}
        {req.showFinancialStep ? '' : ` ${t('noFinancialStep')}`}.
        {templateId === 'builder' && isBuilderSaleDeedType(docType) ? ` ${t('builderStyleHint')}` : ''}
        {docType === 'sale_deed_farm_land' && templateId === TEMPLATE_IDS.government
          ? ` ${t('farmLandGovStyleHint')}`
          : ''}{' '}
        {t('useLoadMockHint')}{' '}
        <span className="font-semibold text-slate-700">
          {DOCUMENT_TYPES[docType]?.label[locale] || DOCUMENT_TYPES[docType]?.label.en}
        </span>
        .
      </p>
    </div>
  );
}
