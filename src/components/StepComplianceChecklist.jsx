import React from 'react';
import { useDeedForm } from '../context/DeedFormContext';
import { useLanguage } from '../context/LanguageContext';
import { SRO_DOCUMENT_CHECKLIST } from '../utils/sroRequirements';
import { getDocumentRequirements } from '../constants/documentTypeRequirements';
import PhotoUploadField from './PhotoUploadField';
import { ShieldCheck, Plus, Trash2, ClipboardList, Calendar, UserCheck } from 'lucide-react';

export default function StepComplianceChecklist({ errors = {} }) {
  const { formData, updateField, addListItem, removeListItem } = useDeedForm();
  const { t, language } = useLanguage();
  const locale = language === 'gu' ? 'gu' : 'en';
  const req = getDocumentRequirements(formData.documentType);

  const c = formData.compliance || {};
  const history = formData.titleHistory || [];
  const isNewTenure = formData.property?.tenureType === 'new_tenure';
  const isBuiltUp = formData.property?.isBuiltUp || false;
  const isFlat = formData.property?.propertyType === 'flat';
  const tdsActive = req.showTds && parseFloat(formData.transaction?.totalSaleAmount || 0) >= 5000000;
  const ex = formData.execution || {};
  const id = formData.identifier || {};

  const visibleChecklist = SRO_DOCUMENT_CHECKLIST.filter((item) => {
    if (!req.complianceKeys.includes(item.key) && !item.conditional) {
      // still show conditional items when condition matches even if not in base keys
      return false;
    }
    if (item.conditional === 'new_tenure') return isNewTenure && req.showGovRecords;
    if (item.conditional === 'built_up') return isBuiltUp && req.showGovRecords;
    if (item.conditional === 'flat') return isFlat;
    if (item.conditional === 'tds') return tdsActive;
    return req.complianceKeys.includes(item.key);
  });

  const handleAddMilestone = () => {
    addListItem('titleHistory', { entryNo: "", date: "", description: "" });
  };

  return (
    <div className="space-y-8 p-6">
      {/* 1. Section 34 Registration Act SRO Checklist */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <ShieldCheck size={18} className="text-emerald-700" />
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider m-0">
            {t('complianceTitle')}
          </h3>
        </div>

        {errors.compliance && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs font-semibold text-red-800">
            ⚠️ {errors.compliance}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {visibleChecklist.map((item) => (
            <label key={item.key} className="flex items-start gap-3 p-3 bg-slate-50/50 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors">
              <input
                type="checkbox"
                checked={c[item.key] || false}
                onChange={(e) => updateField(`compliance.${item.key}`, e.target.checked)}
                className="w-4 h-4 text-emerald-800 border-slate-300 rounded focus:ring-emerald-500 cursor-pointer mt-0.5"
              />
              <div className="text-xs leading-normal">
                <span className="font-bold text-slate-850 block">{item[locale] || item.en}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* 2. Sequential Title History Chain */}
      {req.showTitleHistory && (
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <ClipboardList size={18} className="text-emerald-700" />
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider m-0">
              {t('titleHistorySection')}
            </h3>
          </div>
          <button
            onClick={handleAddMilestone}
            type="button"
            className="inline-flex items-center gap-1 text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-md border border-emerald-100 transition-colors duration-200 cursor-pointer"
          >
            <Plus size={14} />
            {t('addMilestoneBtn')}
          </button>
        </div>

        {history.length === 0 ? (
          <p className="text-xs text-slate-400 italic text-center py-4 bg-slate-50 rounded-lg border border-dashed border-slate-200">
            {t('noMilestones')}
          </p>
        ) : (
          <div className="space-y-4">
            {history.map((milestone, idx) => {
              const pathPrefix = `titleHistory.${idx}`;

              return (
                <div key={idx} className="relative p-4 bg-white border border-slate-205 border-slate-200 rounded-xl shadow-sm space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1">
                      <Calendar size={12} />
                      {t('milestoneEntry')} #{idx + 1}
                    </span>
                    <button
                      onClick={() => removeListItem('titleHistory', idx)}
                      type="button"
                      className="text-slate-400 hover:text-red-655 transition-colors cursor-pointer"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                    {/* Entry Number */}
                    <div className="md:col-span-4">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">{t('entryMutationNo')}</label>
                      <input
                        type="text"
                        value={milestone.entryNo || ''}
                        onChange={(e) => updateField(`${pathPrefix}.entryNo`, e.target.value)}
                        className="w-full text-xs px-2.5 py-1.5 rounded border border-slate-250 bg-white focus:outline-none focus:border-emerald-605"
                        placeholder="e.g. Entry-1402"
                      />
                    </div>

                    {/* Entry Date */}
                    <div className="md:col-span-4">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">{t('dateOfRecord')}</label>
                      <input
                        type="date"
                        value={milestone.date || ''}
                        onChange={(e) => updateField(`${pathPrefix}.date`, e.target.value)}
                        className="w-full text-xs px-2.5 py-1.5 rounded border border-slate-250 bg-white focus:outline-none focus:border-emerald-605"
                      />
                    </div>

                    {/* Description */}
                    <div className="md:col-span-12">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">{t('mutationDesc')}</label>
                      <textarea
                        value={milestone.description || ''}
                        onChange={(e) => updateField(`${pathPrefix}.description`, e.target.value)}
                        rows={2}
                        className="w-full text-xs px-2.5 py-1.5 rounded border border-slate-250 bg-white focus:outline-none focus:border-emerald-605"
                        placeholder="Describe ownership mutations, successions, division entries, or mortgage clears..."
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      )}

      {/* 3. Witness Details (Mandatory for Registration) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <ClipboardList size={18} className="text-slate-700" />
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider m-0">
            {t('witnessDetails')}
          </h3>
        </div>
        {errors.witnesses && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs font-semibold text-red-800">
            ⚠️ {t('completeWitnessDetails')}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(formData.witnesses || [{}, {}]).map((witness, idx) => {
            const we = errors.witnesses?.[idx] || {};
            return (
            <div key={idx} className="p-4 bg-slate-50/50 rounded-xl border border-slate-200 space-y-3">
              <div className="text-xs font-bold text-slate-500">{t('witnessN', { n: idx + 1 })}</div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">{t('fullName')}</label>
                <input type="text" value={witness.name || ''} onChange={(e) => updateField(`witnesses.${idx}.name`, e.target.value)}
                  className={`w-full text-xs px-2.5 py-1.5 rounded border bg-white ${we.name ? 'border-red-300' : 'border-slate-250'}`} placeholder="Witness full name" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">{t('address')}</label>
                <input type="text" value={witness.address || ''} onChange={(e) => updateField(`witnesses.${idx}.address`, e.target.value)}
                  className={`w-full text-xs px-2.5 py-1.5 rounded border bg-white ${we.address ? 'border-red-300' : 'border-slate-250'}`} placeholder="Full address" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">{t('pan')}</label>
                  <input type="text" value={witness.pan || ''} onChange={(e) => updateField(`witnesses.${idx}.pan`, e.target.value.toUpperCase())}
                    className={`w-full text-xs px-2.5 py-1.5 rounded border bg-white font-mono ${we.pan ? 'border-red-300' : 'border-slate-250'}`} placeholder="ABCDE1234F" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">{t('aadhaar')}</label>
                  <input type="text" value={witness.aadhaar || ''} onChange={(e) => updateField(`witnesses.${idx}.aadhaar`, e.target.value)}
                    className={`w-full text-xs px-2.5 py-1.5 rounded border bg-white font-mono ${we.aadhaar ? 'border-red-300' : 'border-slate-250'}`} placeholder="1234 5678 9012" />
                </div>
              </div>
              <PhotoUploadField
                label={t('witnessPhotoOptional')}
                subLabel={t('leaveEmptyPaste')}
                value={witness.photo || ''}
                onChange={(v) => updateField(`witnesses.${idx}.photo`, v)}
                error={we.photo}
              />
            </div>
          );})}
        </div>
      </div>

      {/* 3b. Document Presenter / Identifier (Garvi) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <UserCheck size={18} className="text-emerald-700" />
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider m-0">
            {t('presenterDetails')}
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">{t('presenterName')}</label>
            <input type="text" value={id.name || ''} onChange={(e) => updateField('identifier.name', e.target.value)}
              className="w-full text-sm px-3 py-2 rounded-lg border border-slate-250 bg-white" placeholder="Advocate / Agent name" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">{t('relationRole')}</label>
            <input type="text" value={id.relation || ''} onChange={(e) => updateField('identifier.relation', e.target.value)}
              className="w-full text-sm px-3 py-2 rounded-lg border border-slate-250 bg-white" placeholder="Advocate / Document Presenter" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">{t('presenterAadhaar')}</label>
            <input type="text" value={id.aadhaar || ''} onChange={(e) => updateField('identifier.aadhaar', e.target.value)}
              className="w-full text-sm px-3 py-2 rounded-lg border border-slate-250 bg-white font-mono" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">{t('presenterMobile')}</label>
            <input type="tel" value={id.mobile || ''} onChange={(e) => updateField('identifier.mobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
              className="w-full text-sm px-3 py-2 rounded-lg border border-slate-250 bg-white" />
          </div>
        </div>
      </div>

      {/* 4. Execution & Registration Details */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Calendar size={18} className="text-emerald-700" />
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider m-0">
            {t('executionDetails')}
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">{t('executionDate')}</label>
            <input type="date" value={formData.execution?.executionDate || ''} onChange={(e) => updateField('execution.executionDate', e.target.value)}
              className="w-full text-sm px-3 py-2 rounded-lg border border-slate-250 bg-white focus:outline-none focus:border-emerald-600" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">{t('possessionDate')}</label>
            <input type="date" value={formData.execution?.possessionDate || ''} onChange={(e) => updateField('execution.possessionDate', e.target.value)}
              className="w-full text-sm px-3 py-2 rounded-lg border border-slate-250 bg-white focus:outline-none focus:border-emerald-600" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">{t('placeOfExecution')}</label>
            <input type="text" value={formData.execution?.executionPlace || ''} onChange={(e) => updateField('execution.executionPlace', e.target.value)}
              className="w-full text-sm px-3 py-2 rounded-lg border border-slate-250 bg-white focus:outline-none focus:border-emerald-600"
              placeholder="Sub-Registrar Office, District" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">{t('garviApplicationNo')} <span className="text-red-500">*</span></label>
            <input type="text" value={ex.garviApplicationNo || ''} onChange={(e) => updateField('execution.garviApplicationNo', e.target.value)}
              className={`w-full text-sm px-3 py-2 rounded-lg border bg-white font-mono focus:outline-none focus:border-emerald-600 ${errors.garviApplicationNo ? 'border-red-300' : 'border-slate-250'}`}
              placeholder="GARVI-2026-XXX-XXXXXX" />
            {errors.garviApplicationNo && <p className="text-[10px] text-red-600 mt-1">{errors.garviApplicationNo}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">{t('garviAppointmentDate')}</label>
            <input type="date" value={ex.garviAppointmentDate || ''} onChange={(e) => updateField('execution.garviAppointmentDate', e.target.value)}
              className="w-full text-sm px-3 py-2 rounded-lg border border-slate-250 bg-white" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">{t('appointmentTimeSlot')}</label>
            <input type="text" value={ex.garviAppointmentSlot || ''} onChange={(e) => updateField('execution.garviAppointmentSlot', e.target.value)}
              className="w-full text-sm px-3 py-2 rounded-lg border border-slate-250 bg-white" placeholder="11:00 AM - 11:15 AM" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">{t('presentingPartyMobile')}</label>
            <input type="tel" value={ex.presentingPartyMobile || ''} onChange={(e) => updateField('execution.presentingPartyMobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
              className="w-full text-sm px-3 py-2 rounded-lg border border-slate-250 bg-white" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">{t('possessionType')}</label>
            <select value={formData.execution?.possessionType || 'immediate'} onChange={(e) => updateField('execution.possessionType', e.target.value)}
              className="w-full text-sm px-3 py-2 rounded-lg border border-slate-250 bg-white focus:outline-none focus:border-emerald-600">
              <option value="immediate">{t('immediatePossession')}</option>
              <option value="future">{t('futurePossession')}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
