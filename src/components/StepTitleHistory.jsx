import React from 'react';
import { useDeedForm } from '../context/DeedFormContext';
import { useLanguage } from '../context/LanguageContext';
import { Plus, Trash2, History } from 'lucide-react';

export default function StepTitleHistory({ errors = {} }) {
  const { formData, updateField, addListItem, removeListItem } = useDeedForm();
  const { t } = useLanguage();

  const titleHistory = formData.titleHistory || [];
  const listErrors = errors.titleHistory || [];

  const handleAddMilestone = () => {
    addListItem('titleHistory', { entryNo: "", date: "", description: "" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider m-0 flex items-center gap-2">
          <History className="text-emerald-700 font-bold" size={18} />
          {t('titleHistoryTitle')}
        </h3>
        <button
          onClick={handleAddMilestone}
          type="button"
          className="inline-flex items-center gap-1 text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-md border border-emerald-100 transition-colors duration-200 cursor-pointer"
        >
          <Plus size={14} />
          {t('addMilestone')}
        </button>
      </div>

      {titleHistory.length === 0 && (
        <div className="text-center py-10 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
          <History className="mx-auto text-slate-300 mb-2 stroke-[1.5]" size={36} />
          <p className="text-xs text-slate-400 italic m-0">
            {t('noHistory')}
          </p>
        </div>
      )}

      {titleHistory.map((item, index) => {
        const itemErrors = listErrors[index] || {};
        const pathPrefix = `titleHistory.${index}`;

        return (
          <div key={index} className="relative p-5 bg-slate-50/50 rounded-xl border border-slate-150 space-y-4">
            <button
              onClick={() => removeListItem('titleHistory', index)}
              type="button"
              className="absolute top-4 right-4 text-slate-400 hover:text-red-600 transition-colors duration-150 cursor-pointer"
              title="Remove Milestone"
            >
              <Trash2 size={16} />
            </button>

            <div className="text-xs font-bold text-slate-400">
              Milestone Entry #{index + 1}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Entry Number */}
              <div className="md:col-span-4">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('milestoneEntryNo')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={item.entryNo || ''}
                  onChange={(e) => updateField(`${pathPrefix}.entryNo`, e.target.value)}
                  className={`w-full text-sm px-3.5 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-150 ${
                    itemErrors.entryNo ? 'border-red-300 focus:border-red-500' : 'border-slate-250 focus:border-emerald-600'
                  }`}
                  placeholder="e.g. 1402"
                />
                {itemErrors.entryNo && <p className="text-[10px] text-red-600 mt-1">{itemErrors.entryNo}</p>}
              </div>

              {/* Date */}
              <div className="md:col-span-4">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('milestoneDate')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={item.date || ''}
                  onChange={(e) => updateField(`${pathPrefix}.date`, e.target.value)}
                  className={`w-full text-sm px-3.5 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-150 ${
                    itemErrors.date ? 'border-red-300 focus:border-red-500' : 'border-slate-250 focus:border-emerald-600'
                  }`}
                />
                {itemErrors.date && <p className="text-[10px] text-red-600 mt-1">{itemErrors.date}</p>}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t('milestoneDesc')} <span className="text-red-500">*</span>
              </label>
              <textarea
                value={item.description || ''}
                onChange={(e) => updateField(`${pathPrefix}.description`, e.target.value)}
                rows={2}
                className={`w-full text-sm px-3.5 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-150 ${
                  itemErrors.description ? 'border-red-300 focus:border-red-500' : 'border-slate-250 focus:border-emerald-600'
                }`}
                placeholder="e.g. Succession entry registered in Revenue records in favor of Rameshbhai..."
              />
              {itemErrors.description && <p className="text-[10px] text-red-600 mt-1">{itemErrors.description}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
