import React from 'react';
import { useDeedForm } from '../context/DeedFormContext';
import { useLanguage } from '../context/LanguageContext';
import { PROPERTY_TYPES } from '../utils/sroRequirements';
import PhotoUploadField from './PhotoUploadField';
import GujaratLocationFields from './GujaratLocationFields';
import { MapPin, Compass, Building, ShieldAlert, FileText, Camera } from 'lucide-react';

export default function StepPropertySpecs({ errors = {} }) {
  const { formData, updateField } = useDeedForm();
  const { t, language } = useLanguage();
  const locale = language === 'gu' ? 'gu' : 'en';

  const p = formData.property || {};
  const b = p.boundaries || {};
  const rev = p.revenueRecords || {};
  const photos = p.photos || {};

  return (
    <div className="space-y-8 p-6">
      {/* 0. Property Type — SRO classification */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Building size={18} className="text-emerald-700" />
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider m-0">
            {t('propertyClassification')}
          </h3>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            {t('natureOfProperty')} <span className="text-red-500">*</span>
          </label>
          <select
            value={p.propertyType || 'na_land'}
            onChange={(e) => updateField('property.propertyType', e.target.value)}
            className={`w-full text-sm px-3.5 py-2 rounded-lg border bg-white focus:outline-none focus:border-emerald-600 ${
              errors.propertyType ? 'border-red-300' : 'border-slate-250'
            }`}
          >
            {PROPERTY_TYPES.map((pt) => (
              <option key={pt.id} value={pt.id}>{pt.label[locale] || pt.label.en}</option>
            ))}
          </select>
          {errors.propertyType && <p className="text-[10px] text-red-600 mt-1">{errors.propertyType}</p>}
        </div>
      </div>

      {/* 1. Administrative Location Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <MapPin size={18} className="text-emerald-700" />
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider m-0">
            {t('propertyLocation')}
          </h3>
        </div>

        <GujaratLocationFields property={p} errors={errors} updateField={updateField} />
      </div>

      {/* 2. Survey Codes & Metrics */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Building size={18} className="text-emerald-700" />
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider m-0">
            {t('surveyCodes')}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* New Block/Survey */}
          <div className="md:col-span-2">
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
            {errors.blockSurveyNo && <p className="text-[10px] text-red-655 mt-1">{errors.blockSurveyNo}</p>}
          </div>

          {/* Old Survey */}
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t('oldSurveyDetails')}
            </label>
            <input
              type="text"
              value={p.oldSurveyNo || ''}
              onChange={(e) => updateField('property.oldSurveyNo', e.target.value)}
              className="w-full text-sm px-3.5 py-2 rounded-lg border border-slate-250 bg-white focus:outline-none focus:border-emerald-600"
              placeholder="e.g. Old Survey 124"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* City Survey Number */}
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t('citySurveyNo')}
            </label>
            <input
              type="text"
              value={p.newCitySurveyNo || ''}
              onChange={(e) => updateField('property.newCitySurveyNo', e.target.value)}
              className="w-full text-sm px-3.5 py-2 rounded-lg border border-slate-250 bg-white focus:outline-none focus:border-emerald-600"
              placeholder="e.g. CS-4829"
            />
          </div>

          {/* TP/FP Number */}
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t('tpFpNo')}
            </label>
            <input
              type="text"
              value={p.tpFpNo || ''}
              onChange={(e) => updateField('property.tpFpNo', e.target.value)}
              className="w-full text-sm px-3.5 py-2 rounded-lg border border-slate-250 bg-white focus:outline-none focus:border-emerald-600"
              placeholder="e.g. TP-3, FP-24"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Total Land Area */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t('landAreaSqm')} <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={p.totalPlotArea || ''}
              onChange={(e) => updateField('property.totalPlotArea', e.target.value)}
              className={`w-full text-sm px-3.5 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-150 ${
                errors.totalPlotArea ? 'border-red-300 focus:border-red-500' : 'border-slate-250 focus:border-emerald-600'
              }`}
              placeholder="Land Area"
            />
            {errors.totalPlotArea && <p className="text-[10px] text-red-655 mt-1">{errors.totalPlotArea}</p>}
          </div>

          {/* Jantri Consideration Value */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t('jantriValue')} <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={p.jantriValue || ''}
              onChange={(e) => updateField('property.jantriValue', e.target.value)}
              className={`w-full text-sm px-3.5 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-150 ${
                errors.jantriValue ? 'border-red-300 focus:border-red-500' : 'border-slate-250 focus:border-emerald-600'
              }`}
              placeholder="Government Jantri Value"
            />
            {errors.jantriValue && <p className="text-[10px] text-red-655 mt-1">{errors.jantriValue}</p>}
          </div>

          {/* Land Tenure Select */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t('tenureType')}
            </label>
            <select
              value={p.tenureType || 'old_tenure'}
              onChange={(e) => updateField('property.tenureType', e.target.value)}
              className="w-full text-sm px-3.5 py-2 rounded-lg border border-slate-250 bg-white focus:outline-none focus:border-emerald-600 cursor-pointer"
            >
              <option value="old_tenure">{t('oldTenureOption')}</option>
              <option value="new_tenure">{t('newTenureOption')}</option>
            </select>
          </div>
        </div>

        {/* Collector Permission (Visible only for New Tenure) */}
        {p.tenureType === 'new_tenure' && (
          <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100 space-y-4">
            <div className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
              <ShieldAlert size={14} />
              {t('collectorApproval')}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('collectorOrderNo')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={p.collectorPermissionOrderNo || ''}
                  onChange={(e) => updateField('property.collectorPermissionOrderNo', e.target.value)}
                  className={`w-full text-sm px-3.5 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-150 ${
                    errors.collectorPermissionOrderNo ? 'border-red-300 focus:border-red-500' : 'border-slate-250 focus:border-emerald-600'
                  }`}
                  placeholder="e.g. REV/COL/PERM/8274/2026"
                />
                {errors.collectorPermissionOrderNo && <p className="text-[10px] text-red-655 mt-1">{errors.collectorPermissionOrderNo}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('permissionDate')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={p.collectorPermissionDate || ''}
                  onChange={(e) => updateField('property.collectorPermissionDate', e.target.value)}
                  className={`w-full text-sm px-3.5 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-150 ${
                    errors.collectorPermissionDate ? 'border-red-300 focus:border-red-500' : 'border-slate-250 focus:border-emerald-600'
                  }`}
                />
                {errors.collectorPermissionDate && <p className="text-[10px] text-red-655 mt-1">{errors.collectorPermissionDate}</p>}
              </div>
            </div>
          </div>
        )}

        {/* Project / unit details — always shown for deed PDF */}
        <div className="space-y-4 pt-2 border-t border-slate-100">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide m-0">{t('projectUnitDetails')}</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">{t('unitType')}</label>
              <select
                value={p.unitType || 'flat'}
                onChange={(e) => updateField('property.unitType', e.target.value)}
                className="w-full text-sm px-3.5 py-2 rounded-lg border border-slate-250 bg-white focus:outline-none focus:border-emerald-600"
              >
                <option value="flat">{t('flatApartment')}</option>
                <option value="row_house">{t('rowHouse')}</option>
                <option value="house">{t('independentHouse')}</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">{t('complexSiteName')}</label>
              <input type="text" value={p.complexName || ''} onChange={(e) => updateField('property.complexName', e.target.value)} className="w-full text-sm px-3.5 py-2 rounded-lg border border-slate-250 bg-white focus:outline-none focus:border-emerald-600" placeholder="e.g. Shrinath Complex" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">{t('towerBuilding')}</label>
              <input type="text" value={p.tower || ''} onChange={(e) => updateField('property.tower', e.target.value)} className="w-full text-sm px-3.5 py-2 rounded-lg border border-slate-250 bg-white focus:outline-none focus:border-emerald-600" placeholder="e.g. Tower A" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">{t('floorUnitNo')}</label>
              <div className="flex gap-2">
                <input type="text" value={p.floor || ''} onChange={(e) => updateField('property.floor', e.target.value)} className="w-1/2 text-sm px-3.5 py-2 rounded-lg border border-slate-250 bg-white focus:outline-none focus:border-emerald-600" placeholder={t('floorPlaceholder')} />
                <input type="text" value={p.unitNumber || ''} onChange={(e) => updateField('property.unitNumber', e.target.value)} className="w-1/2 text-sm px-3.5 py-2 rounded-lg border border-slate-250 bg-white focus:outline-none focus:border-emerald-600" placeholder={t('unitPlaceholder')} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">{t('unitCardNo')}</label>
              <input type="text" value={p.unitCardNo || ''} onChange={(e) => updateField('property.unitCardNo', e.target.value)} className="w-full text-sm px-3.5 py-2 rounded-lg border border-slate-250 bg-white focus:outline-none focus:border-emerald-600" placeholder="A/01/02/202" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">{t('verandaShareArea')}</label>
              <input type="number" value={p.verandaArea || ''} onChange={(e) => updateField('property.verandaArea', e.target.value)} className="w-full text-sm px-3.5 py-2 rounded-lg border border-slate-250 bg-white focus:outline-none focus:border-emerald-600" placeholder="135.00" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">{t('reraRegNo')}</label>
              <input type="text" value={p.reraNumber || ''} onChange={(e) => updateField('property.reraNumber', e.target.value)} className="w-full text-sm px-3.5 py-2 rounded-lg border border-slate-250 bg-white focus:outline-none focus:border-emerald-600" placeholder="PR/GJ/..." />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">{t('parkingTypeSlots')}</label>
              <div className="flex gap-2">
                <input type="text" value={p.parkingType || ''} onChange={(e) => updateField('property.parkingType', e.target.value)} className="w-1/2 text-sm px-3.5 py-2 rounded-lg border border-slate-250 bg-white focus:outline-none focus:border-emerald-600" placeholder="Covered" />
                <input type="text" value={p.parkingSlots || ''} onChange={(e) => updateField('property.parkingSlots', e.target.value)} className="w-1/2 text-sm px-3.5 py-2 rounded-lg border border-slate-250 bg-white focus:outline-none focus:border-emerald-600" placeholder="Slot no." />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">{t('parkingArea')}</label>
              <input type="text" value={p.parkingArea || ''} onChange={(e) => updateField('property.parkingArea', e.target.value)} className="w-full text-sm px-3.5 py-2 rounded-lg border border-slate-250 bg-white focus:outline-none focus:border-emerald-600" placeholder="12.5" />
            </div>
          </div>
        </div>

        {/* Built-up & NA checks */}
        <div className="space-y-4 pt-2">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
            <input
              type="checkbox"
              checked={p.isBuiltUp || false}
              onChange={(e) => updateField('property.isBuiltUp', e.target.checked)}
              className="w-4 h-4 text-emerald-800 border-slate-300 rounded focus:ring-emerald-500 cursor-pointer"
            />
            <span>{t('isPropertyBuiltUp')}</span>
          </label>

          {(p.isBuiltUp) && (
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t('constructionAreaSqm')}
                  </label>
                  <input
                    type="number"
                    value={p.constructionArea || ''}
                    onChange={(e) => updateField('property.constructionArea', e.target.value)}
                    className="w-full text-sm px-3.5 py-2 rounded-lg border border-slate-250 bg-white focus:outline-none focus:border-emerald-600"
                    placeholder="Construction Area"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t('carpetAreaSqm')}
                  </label>
                  <input
                    type="number"
                    value={p.carpetArea || ''}
                    onChange={(e) => updateField('property.carpetArea', e.target.value)}
                    className="w-full text-sm px-3.5 py-2 rounded-lg border border-slate-250 bg-white focus:outline-none focus:border-emerald-600"
                    placeholder="Carpet Area"
                  />
                </div>
              </div>

              {/* NA Conversion Order Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t('naOrderNoLabel')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={p.naOrderNo || ''}
                    onChange={(e) => updateField('property.naOrderNo', e.target.value)}
                    className={`w-full text-sm px-3.5 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-150 ${
                      errors.naOrderNo ? 'border-red-300 focus:border-red-500' : 'border-slate-250 focus:border-emerald-600'
                    }`}
                    placeholder="e.g. NA/LAND/ORDER/4910/2026"
                  />
                  {errors.naOrderNo && <p className="text-[10px] text-red-655 mt-1">{errors.naOrderNo}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t('naOrderDateLabel')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={p.naOrderDate || ''}
                    onChange={(e) => updateField('property.naOrderDate', e.target.value)}
                    className={`w-full text-sm px-3.5 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-150 ${
                      errors.naOrderDate ? 'border-red-300 focus:border-red-500' : 'border-slate-250 focus:border-emerald-600'
                    }`}
                  />
                  {errors.naOrderDate && <p className="text-[10px] text-red-655 mt-1">{errors.naOrderDate}</p>}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. Revenue Records — 7/12, 8-A, Mutation (SRO Mandatory) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <FileText size={18} className="text-emerald-700" />
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider m-0">
            {t('revenueRecords')}
          </h3>
        </div>
        <p className="text-[10px] text-slate-500 m-0">{t('revenue712Hint')}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">{t('extract712No')} <span className="text-red-500">*</span></label>
            <input type="text" value={rev.extract712No || ''} onChange={(e) => updateField('property.revenueRecords.extract712No', e.target.value)}
              className={`w-full text-sm px-3 py-2 rounded-lg border bg-white ${errors.extract712No ? 'border-red-300' : 'border-slate-250'}`}
              placeholder="712/JTP/305/2026" />
            {errors.extract712No && <p className="text-[10px] text-red-600 mt-1">{errors.extract712No}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">{t('extract712Date')} <span className="text-red-500">*</span></label>
            <input type="date" value={rev.extract712Date || ''} onChange={(e) => updateField('property.revenueRecords.extract712Date', e.target.value)}
              className={`w-full text-sm px-3 py-2 rounded-lg border bg-white ${errors.extract712Date ? 'border-red-300' : 'border-slate-250'}`} />
            {errors.extract712Date && <p className="text-[10px] text-red-600 mt-1">{errors.extract712Date}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">{t('khata8ANo')}</label>
            <input type="text" value={rev.khata8ANo || ''} onChange={(e) => updateField('property.revenueRecords.khata8ANo', e.target.value)}
              className="w-full text-sm px-3 py-2 rounded-lg border border-slate-250 bg-white" placeholder="8A/KH/4829/2026" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">{t('mutationEntryNo')}</label>
            <input type="text" value={rev.mutationEntryNo || ''} onChange={(e) => updateField('property.revenueRecords.mutationEntryNo', e.target.value)}
              className="w-full text-sm px-3 py-2 rounded-lg border border-slate-250 bg-white" placeholder="MUT/1845/2026" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">{t('mutationDate')}</label>
            <input type="date" value={rev.mutationDate || ''} onChange={(e) => updateField('property.revenueRecords.mutationDate', e.target.value)}
              className="w-full text-sm px-3 py-2 rounded-lg border border-slate-250 bg-white" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">{t('propertyCardNo')}</label>
            <input type="text" value={rev.propertyCardNo || ''} onChange={(e) => updateField('property.revenueRecords.propertyCardNo', e.target.value)}
              className="w-full text-sm px-3 py-2 rounded-lg border border-slate-250 bg-white" placeholder="PC/JTP/305/2026" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">{t('encumbranceCertNo')}</label>
            <input type="text" value={rev.encumbranceCertNo || ''} onChange={(e) => updateField('property.revenueRecords.encumbranceCertNo', e.target.value)}
              className="w-full text-sm px-3 py-2 rounded-lg border border-slate-250 bg-white" placeholder="EC/JTP/305/2026" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">{t('encumbranceCertDate')}</label>
            <input type="date" value={rev.encumbranceCertDate || ''} onChange={(e) => updateField('property.revenueRecords.encumbranceCertDate', e.target.value)}
              className="w-full text-sm px-3 py-2 rounded-lg border border-slate-250 bg-white" />
          </div>
        </div>
      </div>

      {/* 4. Property Site Photos — SRO Required */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Camera size={18} className="text-emerald-700" />
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider m-0">
            {t('propertyPhotographs')}
          </h3>
        </div>
        <p className="text-[10px] text-slate-500 m-0">{t('photosOptionalHint')}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <PhotoUploadField
            label={t('siteLandPhoto')}
            subLabel={t('optionalDeedPage')}
            value={photos.sitePhoto || ''}
            onChange={(v) => updateField('property.photos.sitePhoto', v)}
            aspect="landscape"
            sizeHint="Landscape photo, max 400 KB"
          />
          <PhotoUploadField
            label={t('boundaryPhoto')}
            subLabel={t('optionalDeedPage')}
            value={photos.boundaryPhoto || ''}
            onChange={(v) => updateField('property.photos.boundaryPhoto', v)}
            aspect="landscape"
            sizeHint="Optional"
          />
          <PhotoUploadField
            label={t('structurePhoto')}
            subLabel={t('optionalDeedPage')}
            value={photos.structurePhoto || ''}
            onChange={(v) => updateField('property.photos.structurePhoto', v)}
            aspect="landscape"
            sizeHint="Optional if built-up"
          />
        </div>
      </div>

      {/* 5. Directional Boundaries Matrix */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Compass size={18} className="text-emerald-700" />
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider m-0">
            {t('boundariesMatrix')}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* East */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t('eastBoundary')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={b.east || ''}
              onChange={(e) => updateField('property.boundaries.east', e.target.value)}
              className={`w-full text-sm px-3.5 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-150 ${
                errors.east ? 'border-red-300 focus:border-red-500' : 'border-slate-250 focus:border-emerald-600'
              }`}
              placeholder="Description of Eastern boundary"
            />
            {errors.east && <p className="text-[10px] text-red-655 mt-1">{errors.east}</p>}
          </div>

          {/* West */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t('westBoundary')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={b.west || ''}
              onChange={(e) => updateField('property.boundaries.west', e.target.value)}
              className={`w-full text-sm px-3.5 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-150 ${
                errors.west ? 'border-red-300 focus:border-red-500' : 'border-slate-250 focus:border-emerald-600'
              }`}
              placeholder="Description of Western boundary"
            />
            {errors.west && <p className="text-[10px] text-red-655 mt-1">{errors.west}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* North */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t('northBoundary')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={b.north || ''}
              onChange={(e) => updateField('property.boundaries.north', e.target.value)}
              className={`w-full text-sm px-3.5 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-150 ${
                errors.north ? 'border-red-300 focus:border-red-500' : 'border-slate-250 focus:border-emerald-600'
              }`}
              placeholder="Description of Northern boundary"
            />
            {errors.north && <p className="text-[10px] text-red-655 mt-1">{errors.north}</p>}
          </div>

          {/* South */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t('southBoundary')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={b.south || ''}
              onChange={(e) => updateField('property.boundaries.south', e.target.value)}
              className={`w-full text-sm px-3.5 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-150 ${
                errors.south ? 'border-red-300 focus:border-red-500' : 'border-slate-250 focus:border-emerald-600'
              }`}
              placeholder="Description of Southern boundary"
            />
            {errors.south && <p className="text-[10px] text-red-655 mt-1">{errors.south}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
