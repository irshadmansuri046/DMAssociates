import React from 'react';
import { useDeedForm } from '../context/DeedFormContext';
import { useLanguage } from '../context/LanguageContext';
import { defaultPartyFields } from '../utils/sroRequirements';
import { getPartyRoles } from '../constants/partyRoles';
import { getDocumentRequirements } from '../constants/documentTypeRequirements';
import PhotoUploadField from './PhotoUploadField';
import { Plus, Trash2, User, Landmark, Building2 } from 'lucide-react';

export default function StepPartyDetails({ errors = {} }) {
  const { formData, updateField, addListItem, removeListItem } = useDeedForm();
  const { t, language } = useLanguage();
  const locale = language === 'gu' ? 'gu' : 'en';
  const roles = getPartyRoles(formData.documentType);
  const req = getDocumentRequirements(formData.documentType);

  const sellers = formData.parties.sellers || [];
  const buyers = formData.parties.buyers || [];
  const firstTitle = roles.first[locale] || roles.first.en;
  const secondTitle = roles.second[locale] || roles.second.en;

  const handleAddSeller = () => {
    addListItem('parties.sellers', defaultPartyFields());
  };

  const handleAddBuyer = () => {
    addListItem('parties.buyers', defaultPartyFields());
  };

  const renderPartyInputs = (type, list, addFn, removeFn, title, addBtnLabel) => {
    const listErrors = errors[type] || [];
    
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2 m-0">
            {type === 'sellers' ? <Landmark size={16} className="text-emerald-700 shrink-0" /> : <User size={16} className="text-amber-600 shrink-0" />}
            <span className="leading-snug">{title}</span>
          </h3>
          <button
            onClick={addFn}
            type="button"
            className="inline-flex items-center justify-center gap-1 text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 px-3 py-2 rounded-md border border-emerald-100 transition-colors duration-200 cursor-pointer self-stretch sm:self-auto min-h-[40px]"
          >
            <Plus size={14} />
            {addBtnLabel}
          </button>
        </div>

        {list.length === 0 && (
          <p className="text-xs text-slate-400 italic text-center py-4 bg-slate-55/30 bg-slate-50 rounded-lg border border-dashed border-slate-200">
            No entries. Please click the button to add a party.
          </p>
        )}

        {list.map((party, index) => {
          const itemErrors = listErrors[index] || {};
          const pathPrefix = `parties.${type}.${index}`;

          return (
            <div key={index} className="relative p-3 sm:p-5 bg-slate-50/50 rounded-xl border border-slate-200 space-y-4 overflow-hidden">
              {list.length > 1 && (
                <button
                  onClick={() => removeFn(`parties.${type}`, index)}
                  type="button"
                  className="absolute top-3 right-3 text-slate-400 hover:text-red-600 transition-colors duration-150 cursor-pointer p-1"
                  title="Remove Party"
                >
                  <Trash2 size={16} />
                </button>
              )}

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pr-8 sm:pr-0">
                <div className="text-xs font-bold text-slate-400">
                  {title} #{index + 1}
                </div>
                
                {/* Party type + Corporate */}
                <div className="flex flex-col xs:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
                  <select
                    value={party.partyType || (party.isCorporate ? 'company' : 'individual')}
                    onChange={(e) => {
                      const v = e.target.value;
                      updateField(`${pathPrefix}.partyType`, v);
                      updateField(`${pathPrefix}.isCorporate`, v !== 'individual');
                    }}
                    className="text-xs px-2 py-2 rounded border border-slate-250 bg-white w-full sm:w-auto min-h-[40px]"
                  >
                    <option value="individual">Individual</option>
                    <option value="company">Company</option>
                    <option value="partnership">Partnership</option>
                    <option value="llp">LLP</option>
                    <option value="trust">Trust</option>
                    <option value="society">Society</option>
                    <option value="government">Government</option>
                  </select>
                  <label className="flex items-center gap-1.5 cursor-pointer text-xs font-semibold text-slate-600">
                  <input
                    type="checkbox"
                    checked={party.isCorporate || false}
                    onChange={(e) => {
                      updateField(`${pathPrefix}.isCorporate`, e.target.checked);
                      updateField(`${pathPrefix}.partyType`, e.target.checked ? 'company' : 'individual');
                      if (e.target.checked) {
                        updateField(`${pathPrefix}.age`, "");
                        updateField(`${pathPrefix}.occupation`, "");
                        updateField(`${pathPrefix}.aadhaar`, "");
                      } else {
                        updateField(`${pathPrefix}.companyCin`, "");
                        updateField(`${pathPrefix}.registeredOffice`, "");
                        updateField(`${pathPrefix}.authorisedSignatory`, "");
                        updateField(`${pathPrefix}.signatoryAge`, "");
                        updateField(`${pathPrefix}.signatoryOccupation`, "");
                        updateField(`${pathPrefix}.signatoryReligion`, "");
                        updateField(`${pathPrefix}.boardResolutionDate`, "");
                      }
                    }}
                    className="w-3.5 h-3.5 text-emerald-800 border-slate-300 rounded focus:ring-emerald-500 focus:ring-opacity-20 cursor-pointer"
                  />
                  <Building2 size={14} className="text-slate-500 shrink-0" />
                  <span>Corporate Entity</span>
                </label>
                </div>
              </div>

              {/* Name field */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className={party.isCorporate ? "md:col-span-8" : "md:col-span-12"}>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {party.isCorporate ? "Company / Legal Entity Name" : t('fullName')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={party.name || ''}
                    onChange={(e) => updateField(`${pathPrefix}.name`, e.target.value)}
                    className={`w-full text-sm px-3.5 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-150 ${
                      itemErrors.name ? 'border-red-300 focus:border-red-500' : 'border-slate-250 focus:border-emerald-600'
                    }`}
                    placeholder={party.isCorporate ? "e.g. Gujarat Infratech Private Limited" : "e.g. Rajeshbhai Patel"}
                  />
                  {itemErrors.name && <p className="text-[10px] text-red-650 mt-1">{itemErrors.name}</p>}
                </div>

                {/* CIN Number (if corporate) */}
                {party.isCorporate && (
                  <div className="md:col-span-4">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Company CIN <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={party.companyCin || ''}
                      onChange={(e) => updateField(`${pathPrefix}.companyCin`, e.target.value.toUpperCase())}
                      maxLength={21}
                      className={`w-full text-sm px-3.5 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-150 ${
                        itemErrors.companyCin ? 'border-red-300 focus:border-red-500' : 'border-slate-250 focus:border-emerald-600'
                      }`}
                      placeholder="U12345GJ2020PTC123456"
                    />
                    {itemErrors.companyCin && <p className="text-[10px] text-red-650 mt-1">{itemErrors.companyCin}</p>}
                  </div>
                )}
              </div>

              {/* Corporate Specific Fields */}
              {party.isCorporate ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    {/* Authorised Signatory */}
                    <div className="md:col-span-8">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Authorised Signatory (Name & Designation) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={party.authorisedSignatory || ''}
                        onChange={(e) => updateField(`${pathPrefix}.authorisedSignatory`, e.target.value)}
                        className={`w-full text-sm px-3.5 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-150 ${
                          itemErrors.authorisedSignatory ? 'border-red-300 focus:border-red-500' : 'border-slate-250 focus:border-emerald-600'
                        }`}
                        placeholder="e.g. Kiritbhai Patel (Managing Director)"
                      />
                      {itemErrors.authorisedSignatory && <p className="text-[10px] text-red-650 mt-1">{itemErrors.authorisedSignatory}</p>}
                    </div>

                    {/* Resolution Date */}
                    <div className="md:col-span-4">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Board Resolution Date
                      </label>
                      <input
                        type="date"
                        value={party.boardResolutionDate || ''}
                        onChange={(e) => updateField(`${pathPrefix}.boardResolutionDate`, e.target.value)}
                        className="w-full text-sm px-3.5 py-2 rounded-lg border border-slate-250 bg-white focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-4">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Signatory Age</label>
                      <input
                        type="text"
                        value={party.signatoryAge || ''}
                        onChange={(e) => updateField(`${pathPrefix}.signatoryAge`, e.target.value)}
                        className="w-full text-sm px-3.5 py-2 rounded-lg border border-slate-250 bg-white focus:outline-none focus:border-emerald-600"
                        placeholder="e.g. 52"
                      />
                    </div>
                    <div className="md:col-span-4">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Signatory Occupation</label>
                      <input
                        type="text"
                        value={party.signatoryOccupation || ''}
                        onChange={(e) => updateField(`${pathPrefix}.signatoryOccupation`, e.target.value)}
                        className="w-full text-sm px-3.5 py-2 rounded-lg border border-slate-250 bg-white focus:outline-none focus:border-emerald-600"
                        placeholder="e.g. Business"
                      />
                    </div>
                    <div className="md:col-span-4">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Signatory Religion / Caste</label>
                      <input
                        type="text"
                        value={party.signatoryReligion || ''}
                        onChange={(e) => updateField(`${pathPrefix}.signatoryReligion`, e.target.value)}
                        className="w-full text-sm px-3.5 py-2 rounded-lg border border-slate-250 bg-white focus:outline-none focus:border-emerald-600"
                        placeholder="e.g. Hindu"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    {/* PAN */}
                    <div className="md:col-span-4">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Company PAN <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={party.pan || ''}
                        onChange={(e) => updateField(`${pathPrefix}.pan`, e.target.value.toUpperCase())}
                        maxLength={10}
                        className={`w-full text-sm px-3.5 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-150 ${
                          itemErrors.pan ? 'border-red-300 focus:border-red-500' : 'border-slate-250 focus:border-emerald-600'
                        }`}
                        placeholder="ABCDE1234F"
                      />
                      {itemErrors.pan && <p className="text-[10px] text-red-650 mt-1">{itemErrors.pan}</p>}
                    </div>

                    {/* Registered Office */}
                    <div className="md:col-span-8">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Registered Office Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={party.registeredOffice || ''}
                        onChange={(e) => {
                          updateField(`${pathPrefix}.registeredOffice`, e.target.value);
                          updateField(`${pathPrefix}.address`, e.target.value); // Sync to address field
                        }}
                        className={`w-full text-sm px-3.5 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-150 ${
                          itemErrors.registeredOffice ? 'border-red-300 focus:border-red-500' : 'border-slate-250 focus:border-emerald-600'
                        }`}
                        placeholder="Enter full corporate registered office address"
                      />
                      {itemErrors.registeredOffice && <p className="text-[10px] text-red-650 mt-1">{itemErrors.registeredOffice}</p>}
                    </div>
                  </div>
                </div>
              ) : (
                // Individual Specific Fields
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    {/* Age */}
                    <div className="md:col-span-4">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {t('age')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        value={party.age || ''}
                        onChange={(e) => updateField(`${pathPrefix}.age`, e.target.value)}
                        className={`w-full text-sm px-3.5 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-150 ${
                          itemErrors.age ? 'border-red-300 focus:border-red-500' : 'border-slate-250 focus:border-emerald-600'
                        }`}
                        placeholder="Age"
                      />
                      {itemErrors.age && <p className="text-[10px] text-red-650 mt-1">{itemErrors.age}</p>}
                    </div>

                    {/* Occupation */}
                    <div className="md:col-span-4">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {t('occupation')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={party.occupation || ''}
                        onChange={(e) => updateField(`${pathPrefix}.occupation`, e.target.value)}
                        className={`w-full text-sm px-3.5 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-150 ${
                          itemErrors.occupation ? 'border-red-300 focus:border-red-500' : 'border-slate-250 focus:border-emerald-600'
                        }`}
                        placeholder="Occupation"
                      />
                      {itemErrors.occupation && <p className="text-[10px] text-red-650 mt-1">{itemErrors.occupation}</p>}
                    </div>

                    {/* Religion */}
                    <div className="md:col-span-4">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Religion / Caste (જાતના)</label>
                      <input
                        type="text"
                        value={party.religion || party.caste || ''}
                        onChange={(e) => updateField(`${pathPrefix}.religion`, e.target.value)}
                        className="w-full text-sm px-3.5 py-2 rounded-lg border border-slate-250 bg-white focus:outline-none focus:border-emerald-600"
                        placeholder="e.g. Hindu"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    {/* PAN */}
                    <div className="md:col-span-4">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {t('pan')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={party.pan || ''}
                        onChange={(e) => updateField(`${pathPrefix}.pan`, e.target.value.toUpperCase())}
                        maxLength={10}
                        className={`w-full text-sm px-3.5 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-150 ${
                          itemErrors.pan ? 'border-red-300 focus:border-red-500' : 'border-slate-250 focus:border-emerald-600'
                        }`}
                        placeholder="ABCDE1234F"
                      />
                      {itemErrors.pan && <p className="text-[10px] text-red-650 mt-1">{itemErrors.pan}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    {/* Aadhaar */}
                    <div className="md:col-span-4">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {t('aadhaar')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={party.aadhaar || ''}
                        onChange={(e) => updateField(`${pathPrefix}.aadhaar`, e.target.value)}
                        placeholder="XXXX XXXX XXXX"
                        className={`w-full text-sm px-3.5 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-150 ${
                          itemErrors.aadhaar ? 'border-red-300 focus:border-red-500' : 'border-slate-250 focus:border-emerald-600'
                        }`}
                      />
                      {itemErrors.aadhaar && <p className="text-[10px] text-red-650 mt-1">{itemErrors.aadhaar}</p>}
                    </div>

                    {/* Address */}
                    <div className="md:col-span-8">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Residential Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={party.address || ''}
                        onChange={(e) => updateField(`${pathPrefix}.address`, e.target.value)}
                        className={`w-full text-sm px-3.5 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-150 ${
                          itemErrors.address ? 'border-red-300 focus:border-red-500' : 'border-slate-250 focus:border-emerald-600'
                        }`}
                        placeholder="Enter full address with pin code"
                      />
                      {itemErrors.address && <p className="text-[10px] text-red-650 mt-1">{itemErrors.address}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* Contact + Photo (optional) */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-2 border-t border-slate-100">
                <div className="md:col-span-4">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mobile (Garvi Portal) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={party.mobile || ''}
                    onChange={(e) => updateField(`${pathPrefix}.mobile`, e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className={`w-full text-sm px-3.5 py-2 rounded-lg border bg-white focus:outline-none focus:border-emerald-600 ${
                      itemErrors.mobile ? 'border-red-300' : 'border-slate-250'
                    }`}
                    placeholder="10-digit mobile"
                  />
                  {itemErrors.mobile && <p className="text-[10px] text-red-650 mt-1">{itemErrors.mobile}</p>}
                </div>
                <div className="md:col-span-4">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email (optional)</label>
                  <input
                    type="email"
                    value={party.email || ''}
                    onChange={(e) => updateField(`${pathPrefix}.email`, e.target.value)}
                    className="w-full text-sm px-3.5 py-2 rounded-lg border border-slate-250 bg-white focus:outline-none focus:border-emerald-600"
                    placeholder="email@example.com"
                  />
                </div>
                <div className="md:col-span-4">
                  <PhotoUploadField
                    label={party.isCorporate ? "Signatory Photo (Optional)" : "Passport Photo (Optional)"}
                    subLabel="Uploaded photo appears in the PDF; leave empty for a paste box"
                    value={party.photo || ''}
                    onChange={(v) => updateField(`${pathPrefix}.photo`, v)}
                    error={itemErrors.photo}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-8 p-6">
      {typeof errors.sellers === 'string' && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs font-semibold text-red-800">{errors.sellers}</div>
      )}
      {renderPartyInputs('sellers', sellers, handleAddSeller, removeListItem, firstTitle, locale === 'gu' ? 'ઉમેરો' : 'Add')}

      {req.minBuyers > 0 && (
        <>
          <div className="border-t border-slate-100 my-2" />
          {typeof errors.buyers === 'string' && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs font-semibold text-red-800">{errors.buyers}</div>
          )}
          {renderPartyInputs('buyers', buyers, handleAddBuyer, removeListItem, secondTitle, locale === 'gu' ? 'ઉમેરો' : 'Add')}
        </>
      )}

      {req.minSellers > 1 && (
        <p className="text-xs text-slate-500 m-0">
          {locale === 'gu'
            ? `આ દસ્તાવેજ પ્રકાર માટે ઓછામાં ઓછા ${req.minSellers} પક્ષકારો જરૂરી છે.`
            : `This document type requires at least ${req.minSellers} co-owners / first parties.`}
        </p>
      )}
    </div>
  );
}
