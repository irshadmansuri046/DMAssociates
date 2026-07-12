import React from 'react';
import { useDeedForm } from '../context/DeedFormContext';
import { useLanguage } from '../context/LanguageContext';
import { AlertTriangle, Compass, MapPin } from 'lucide-react';

export default function StepPropertyDetails({ stepSubIndex, errors = {} }) {
  const { formData, updateField } = useDeedForm();
  const { t } = useLanguage();

  const p = formData.property || {};

  if (stepSubIndex === 0) {
    // Step 2: Property Identification
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <MapPin className="text-emerald-700 font-bold" size={18} />
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider m-0">
            Property Coordinates Identification
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* District */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t('district')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={p.district || ''}
              onChange={(e) => updateField('property.district', e.target.value)}
              className={`w-full text-sm px-3.5 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-150 ${
                errors.district ? 'border-red-300 focus:border-red-500' : 'border-slate-250 focus:border-emerald-600'
              }`}
              placeholder="e.g. Rajkot"
            />
            {errors.district && <p className="text-[10px] text-red-600 mt-1">{errors.district}</p>}
          </div>

          {/* Taluka */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t('taluka')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={p.taluka || ''}
              onChange={(e) => updateField('property.taluka', e.target.value)}
              className={`w-full text-sm px-3.5 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-150 ${
                errors.taluka ? 'border-red-300 focus:border-red-500' : 'border-slate-250 focus:border-emerald-600'
              }`}
              placeholder="e.g. Jetpur"
            />
            {errors.taluka && <p className="text-[10px] text-red-600 mt-1">{errors.taluka}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Village */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t('village')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={p.village || ''}
              onChange={(e) => updateField('property.village', e.target.value)}
              className={`w-full text-sm px-3.5 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-150 ${
                errors.village ? 'border-red-300 focus:border-red-500' : 'border-slate-250 focus:border-emerald-600'
              }`}
              placeholder="e.g. Jetpur"
            />
            {errors.village && <p className="text-[10px] text-red-600 mt-1">{errors.village}</p>}
          </div>

          {/* Sub-Registrar Office Jurisdiction */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t('sro')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={p.subRegistrarOffice || ''}
              onChange={(e) => updateField('property.subRegistrarOffice', e.target.value)}
              className={`w-full text-sm px-3.5 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-150 ${
                errors.subRegistrarOffice ? 'border-red-300 focus:border-red-500' : 'border-slate-250 focus:border-emerald-600'
              }`}
              placeholder="e.g. Jetpur-1 (Rajkot)"
            />
            {errors.subRegistrarOffice && <p className="text-[10px] text-red-600 mt-1">{errors.subRegistrarOffice}</p>}
          </div>
        </div>

        {/* Survey Identifiers Group */}
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-150 space-y-4">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide m-0">
            Survey Identifiers
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Block / Survey Number */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t('blockNo')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={p.blockSurveyNo || ''}
                onChange={(e) => updateField('property.blockSurveyNo', e.target.value)}
                className={`w-full text-sm px-3.5 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-150 ${
                  errors.blockSurveyNo ? 'border-red-300 focus:border-red-500' : 'border-slate-250 focus:border-emerald-600'
                }`}
                placeholder="e.g. 305/p2"
              />
              {errors.blockSurveyNo && <p className="text-[10px] text-red-600 mt-1">{errors.blockSurveyNo}</p>}
            </div>

            {/* City Survey Number */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t('citySurveyNo')}
              </label>
              <input
                type="text"
                value={p.newCitySurveyNo || ''}
                onChange={(e) => updateField('property.newCitySurveyNo', e.target.value)}
                className="w-full text-sm px-3.5 py-2 rounded-lg border border-slate-250 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 bg-white"
                placeholder="e.g. CS-4829"
              />
            </div>

            {/* TP/FP Number */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t('tpFpNo')}
              </label>
              <input
                type="text"
                value={p.tpFpNo || ''}
                onChange={(e) => updateField('property.tpFpNo', e.target.value)}
                className="w-full text-sm px-3.5 py-2 rounded-lg border border-slate-250 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 bg-white"
                placeholder="e.g. TP No. 3, FP-24"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 3: Property Technicals
  const showCollectorFields = p.tenureType === 'new_tenure';
  
  // Property counts as built-up if explicitly checked OR if constructionArea > 0
  const isCurrentlyBuiltUp = p.isBuiltUp || (p.constructionArea && parseFloat(p.constructionArea) > 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
        <Compass className="text-emerald-700 font-bold" size={18} />
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider m-0">
          Land Tenure, Areas & Boundaries
        </h3>
      </div>

      {/* Tenure Selection */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
        <div className="md:col-span-6">
          <label className="block text-xs font-semibold text-slate-700 mb-2">
            {t('tenureType')} <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4">
            <label className="flex-1 flex items-center justify-between p-3 rounded-lg border border-slate-250 hover:bg-slate-50 cursor-pointer transition-colors duration-150">
              <span className="text-xs font-medium text-slate-800">{t('oldTenure')}</span>
              <input
                type="radio"
                name="tenureType"
                value="old_tenure"
                checked={p.tenureType === 'old_tenure'}
                onChange={() => updateField('property.tenureType', 'old_tenure')}
                className="text-emerald-600 focus:ring-emerald-500"
              />
            </label>

            <label className="flex-1 flex items-center justify-between p-3 rounded-lg border border-slate-250 hover:bg-slate-50 cursor-pointer transition-colors duration-150">
              <span className="text-xs font-medium text-slate-800">{t('newTenure')}</span>
              <input
                type="radio"
                name="tenureType"
                value="new_tenure"
                checked={p.tenureType === 'new_tenure'}
                onChange={() => updateField('property.tenureType', 'new_tenure')}
                className="text-emerald-600 focus:ring-emerald-500"
              />
            </label>
          </div>
        </div>

        {/* Collector Permission Details for New Tenure */}
        {showCollectorFields && (
          <div className="md:col-span-6 bg-amber-50/50 p-4 rounded-xl border border-amber-250 space-y-3">
            <div className="flex items-center gap-1.5 text-amber-800 font-bold text-xs uppercase tracking-wide">
              <AlertTriangle size={14} className="text-amber-600" />
              <span>{t('collectorPermission')}</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-600 mb-1">
                  Order Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={p.collectorPermissionOrderNo || ''}
                  onChange={(e) => updateField('property.collectorPermissionOrderNo', e.target.value)}
                  className={`w-full text-xs px-3 py-1.5 rounded-lg border bg-white focus:outline-none ${
                    errors.collectorPermissionOrderNo ? 'border-red-300 focus:ring-red-200' : 'border-slate-250 focus:ring-emerald-200'
                  }`}
                  placeholder="e.g. REV/COL/PERM/8274"
                />
                {errors.collectorPermissionOrderNo && <p className="text-[9px] text-red-600 mt-0.5">{errors.collectorPermissionOrderNo}</p>}
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-600 mb-1">
                  Order Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={p.collectorPermissionDate || ''}
                  onChange={(e) => updateField('property.collectorPermissionDate', e.target.value)}
                  className={`w-full text-xs px-3 py-1.5 rounded-lg border bg-white focus:outline-none ${
                    errors.collectorPermissionDate ? 'border-red-300' : 'border-slate-250'
                  }`}
                />
                {errors.collectorPermissionDate && <p className="text-[9px] text-red-600 mt-0.5">{errors.collectorPermissionDate}</p>}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Area Coordinates */}
      <div className="bg-slate-50 p-5 rounded-xl border border-slate-150 space-y-4">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide m-0">
          Land & Construction Areas
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Total Plot Area */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t('totalPlotArea')} <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={p.totalPlotArea || ''}
              onChange={(e) => updateField('property.totalPlotArea', e.target.value)}
              className={`w-full text-sm px-3.5 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-150 ${
                errors.totalPlotArea ? 'border-red-300 focus:border-red-500' : 'border-slate-250 focus:border-emerald-600'
              }`}
              placeholder="e.g. 250"
            />
            {errors.totalPlotArea && <p className="text-[10px] text-red-600 mt-1">{errors.totalPlotArea}</p>}
          </div>

          {/* Construction Area */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t('constructionArea')}
            </label>
            <input
              type="number"
              value={p.constructionArea || ''}
              onChange={(e) => updateField('property.constructionArea', e.target.value)}
              className="w-full text-sm px-3.5 py-2 rounded-lg border border-slate-250 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 bg-white"
              placeholder="e.g. 180 (optional)"
            />
          </div>

          {/* Carpet Area */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t('carpetArea')}
            </label>
            <input
              type="number"
              value={p.carpetArea || ''}
              onChange={(e) => updateField('property.carpetArea', e.target.value)}
              className="w-full text-sm px-3.5 py-2 rounded-lg border border-slate-250 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 bg-white"
              placeholder="e.g. 155 (optional)"
            />
          </div>
        </div>

        {/* Built-up Switch */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
          <input
            type="checkbox"
            id="isBuiltUp"
            checked={p.isBuiltUp || false}
            onChange={(e) => updateField('property.isBuiltUp', e.target.checked)}
            className="rounded text-emerald-600 focus:ring-emerald-500 h-4 w-4"
          />
          <label htmlFor="isBuiltUp" className="text-xs font-semibold text-slate-700 cursor-pointer">
            {t('isBuiltUp')}
          </label>
        </div>

        {/* Non-Agricultural Order Fields */}
        {isCurrentlyBuiltUp && (
          <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-250 mt-3 space-y-3">
            <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs uppercase tracking-wide">
              <AlertTriangle size={14} className="text-emerald-600" />
              <span>{t('naOrder')}</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-600 mb-1">
                  {t('naOrderNo')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={p.naOrderNo || ''}
                  onChange={(e) => updateField('property.naOrderNo', e.target.value)}
                  className={`w-full text-xs px-3 py-1.5 rounded-lg border bg-white focus:outline-none ${
                    errors.naOrderNo ? 'border-red-300 focus:ring-red-200' : 'border-slate-250 focus:ring-emerald-200'
                  }`}
                  placeholder="e.g. NA/LAND/ORDER/4910"
                />
                {errors.naOrderNo && <p className="text-[9px] text-red-600 mt-0.5">{errors.naOrderNo}</p>}
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-600 mb-1">
                  {t('naOrderDate')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={p.naOrderDate || ''}
                  onChange={(e) => updateField('property.naOrderDate', e.target.value)}
                  className={`w-full text-xs px-3 py-1.5 rounded-lg border bg-white focus:outline-none ${
                    errors.naOrderDate ? 'border-red-300' : 'border-slate-250'
                  }`}
                />
                {errors.naOrderDate && <p className="text-[9px] text-red-600 mt-0.5">{errors.naOrderDate}</p>}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Directional Boundaries */}
      <div className="bg-slate-50 p-5 rounded-xl border border-slate-150 space-y-4">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide m-0">
          {t('boundaries')}
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* East */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t('east')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={p.boundaries?.east || ''}
              onChange={(e) => updateField('property.boundaries.east', e.target.value)}
              className={`w-full text-sm px-3.5 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-150 ${
                errors.east ? 'border-red-300 focus:border-red-500' : 'border-slate-250 focus:border-emerald-600'
              }`}
              placeholder="What lies to the East?"
            />
            {errors.east && <p className="text-[10px] text-red-600 mt-1">{errors.east}</p>}
          </div>

          {/* West */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t('west')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={p.boundaries?.west || ''}
              onChange={(e) => updateField('property.boundaries.west', e.target.value)}
              className={`w-full text-sm px-3.5 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-150 ${
                errors.west ? 'border-red-300 focus:border-red-500' : 'border-slate-250 focus:border-emerald-600'
              }`}
              placeholder="What lies to the West?"
            />
            {errors.west && <p className="text-[10px] text-red-600 mt-1">{errors.west}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* North */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t('north')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={p.boundaries?.north || ''}
              onChange={(e) => updateField('property.boundaries.north', e.target.value)}
              className={`w-full text-sm px-3.5 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-150 ${
                errors.north ? 'border-red-300 focus:border-red-500' : 'border-slate-250 focus:border-emerald-600'
              }`}
              placeholder="What lies to the North?"
            />
            {errors.north && <p className="text-[10px] text-red-600 mt-1">{errors.north}</p>}
          </div>

          {/* South */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t('south')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={p.boundaries?.south || ''}
              onChange={(e) => updateField('property.boundaries.south', e.target.value)}
              className={`w-full text-sm px-3.5 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-150 ${
                errors.south ? 'border-red-300 focus:border-red-500' : 'border-slate-250 focus:border-emerald-600'
              }`}
              placeholder="What lies to the South?"
            />
            {errors.south && <p className="text-[10px] text-red-600 mt-1">{errors.south}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
