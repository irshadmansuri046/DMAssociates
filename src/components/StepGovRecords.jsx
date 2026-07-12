import React, { useState } from 'react';
import { useDeedForm } from '../context/DeedFormContext';
import { GOV_MODULES } from '../modules/gov-records';
import { Landmark } from 'lucide-react';

function getNested(obj, path) {
  return path.split('.').reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);
}

/**
 * Government records accordion — only modules with data or expanded by user.
 */
export default function StepGovRecords() {
  const { formData, updateField } = useDeedForm();
  const [openId, setOpenId] = useState(null);
  const property = formData.property || {};

  const setModuleField = (moduleId, field, value) => {
    const mod = GOV_MODULES.find((m) => m.id === moduleId);
    if (!mod) return;
    // path like govRecords.naPermission — update under property
    const parts = mod.path.split('.');
    // ensure structure
    const govRecords = { ...(property.govRecords || {}) };
    const key = parts[parts.length - 1];
    govRecords[key] = { ...(govRecords[key] || {}), [field]: value };
    updateField('property.govRecords', govRecords);

    // sync common flat fields
    if (moduleId === 'naPermission' && field === 'orderNo') updateField('property.naOrderNo', value);
    if (moduleId === 'naPermission' && field === 'date') updateField('property.naOrderDate', value);
    if (moduleId === 'rera' && field === 'registrationNo') updateField('property.reraNumber', value);
    if (moduleId === 'propertyCard' && field === 'cardNo') updateField('property.unitCardNo', value);
  };

  return (
    <div className="space-y-4 p-6 border-t border-slate-100">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
        <Landmark size={18} className="text-emerald-700" />
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider m-0">
          Government Records (સરકારી નોંધો)
        </h3>
      </div>
      <p className="text-[10px] text-slate-500 m-0">
        Fill only applicable modules. Empty modules are omitted from clauses automatically.
      </p>
      <div className="space-y-2">
        {GOV_MODULES.map((mod) => {
          const data = getNested(property, mod.path) || {};
          const isOpen = openId === mod.id;
          return (
            <div key={mod.id} className="border border-slate-200 rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : mod.id)}
                className="w-full text-left px-3 py-2 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-800 flex justify-between cursor-pointer border-0"
              >
                <span>{mod.label.en} ({mod.label.gu})</span>
                <span className="text-slate-400">{isOpen ? '−' : '+'}</span>
              </button>
              {isOpen && (
                <div className="p-3 grid grid-cols-1 md:grid-cols-3 gap-3 bg-white">
                  {mod.fields.map((field) => (
                    <div key={field}>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">{field}</label>
                      <input
                        type="text"
                        value={data[field] || ''}
                        onChange={(e) => setModuleField(mod.id, field, e.target.value)}
                        className="w-full text-xs px-2.5 py-1.5 rounded border border-slate-250 bg-white"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
