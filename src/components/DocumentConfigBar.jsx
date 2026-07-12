import React from 'react';
import { useDeedForm } from '../context/DeedFormContext';
import { DOCUMENT_TYPES, DOCUMENT_TYPE_IDS } from '../constants/documentTypes';
import { TEMPLATES, TEMPLATE_IDS, DEFAULT_TEMPLATE_ID } from '../constants/templates';
import { getDocumentRequirements } from '../constants/documentTypeRequirements';
import { FileText } from 'lucide-react';

/** Document type + template picker (platform config) */
export default function DocumentConfigBar() {
  const { formData, updateField } = useDeedForm();
  const docType = formData.documentType || 'sale_deed';
  const templateId = formData.templateId || DEFAULT_TEMPLATE_ID;
  const req = getDocumentRequirements(docType);

  return (
    <div className="mb-4 sm:mb-6 bg-white rounded-xl border border-slate-200 shadow-sm p-3 sm:p-4 no-print">
      <div className="flex items-center gap-2 mb-3">
        <FileText size={16} className="text-slate-700 shrink-0" />
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider m-0">Document Configuration</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div className="min-w-0">
          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Document Type</label>
          <select
            value={docType}
            onChange={(e) => updateField('documentType', e.target.value)}
            className="w-full text-sm px-3 py-2.5 rounded-lg border border-slate-250 bg-white focus:outline-none focus:border-emerald-600 min-h-[44px]"
          >
            {DOCUMENT_TYPE_IDS.map((id) => (
              <option key={id} value={id}>
                {DOCUMENT_TYPES[id].label.en} ({DOCUMENT_TYPES[id].label.gu})
              </option>
            ))}
          </select>
        </div>
        <div className="min-w-0">
          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">PDF Template Style</label>
          <select
            value={templateId}
            onChange={(e) => updateField('templateId', e.target.value)}
            className="w-full text-sm px-3 py-2.5 rounded-lg border border-slate-250 bg-white focus:outline-none focus:border-emerald-600 min-h-[44px]"
          >
            {Object.values(TEMPLATE_IDS).map((id) => (
              <option key={id} value={id}>
                {TEMPLATES[id].label.en}
              </option>
            ))}
          </select>
        </div>
      </div>
      <p className="text-[11px] text-slate-500 mt-3 mb-0 leading-relaxed">
        Form steps adapt to this type
        {req.showFinancialStep ? '' : ' (no financial step)'}.
        Use <span className="font-semibold text-slate-700">Load Mock Data</span> after selecting type, template, and language —
        mock fills only fields relevant to <span className="font-semibold">{DOCUMENT_TYPES[docType]?.label.en}</span>.
      </p>
    </div>
  );
}
