import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  fetchGujaratDistricts,
  fetchGujaratPlaces,
  fetchGujaratSroOffices,
  fetchGujaratTalukas,
  locationLabel,
} from '../services/gujaratLocations';

const OTHER_PLACE = '__other__';

/**
 * Cascading Gujarat location selectors:
 * District → Taluka → Village/City → Sub-Registrar Office
 * Auto-selects SRO when only one office matches.
 */
export default function GujaratLocationFields({ property = {}, errors = {}, updateField }) {
  const { language, t } = useLanguage();
  const [districts, setDistricts] = useState([]);
  const [talukas, setTalukas] = useState([]);
  const [places, setPlaces] = useState([]);
  const [sros, setSros] = useState([]);
  const [loading, setLoading] = useState({ districts: false, talukas: false, places: false, sros: false });
  const [loadError, setLoadError] = useState('');
  const [otherPlace, setOtherPlace] = useState(false);

  const districtId = property.districtId || '';
  const talukaId = property.talukaId || '';
  const placeId = property.placeId || '';
  const sroId = property.sroId || '';

  useEffect(() => {
    let cancelled = false;
    setLoading((s) => ({ ...s, districts: true }));
    fetchGujaratDistricts()
      .then((rows) => {
        if (!cancelled) setDistricts(rows);
      })
      .catch((err) => {
        if (!cancelled) setLoadError(err.message || 'Could not load Gujarat districts');
      })
      .finally(() => {
        if (!cancelled) setLoading((s) => ({ ...s, districts: false }));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!districtId) {
      setTalukas([]);
      return undefined;
    }
    let cancelled = false;
    setLoading((s) => ({ ...s, talukas: true }));
    fetchGujaratTalukas(districtId)
      .then((rows) => {
        if (!cancelled) setTalukas(rows);
      })
      .catch((err) => {
        if (!cancelled) setLoadError(err.message || 'Could not load talukas');
      })
      .finally(() => {
        if (!cancelled) setLoading((s) => ({ ...s, talukas: false }));
      });
    return () => {
      cancelled = true;
    };
  }, [districtId]);

  useEffect(() => {
    if (!talukaId) {
      setPlaces([]);
      return undefined;
    }
    let cancelled = false;
    setLoading((s) => ({ ...s, places: true }));
    fetchGujaratPlaces(talukaId)
      .then((rows) => {
        if (!cancelled) setPlaces(rows);
      })
      .catch((err) => {
        if (!cancelled) setLoadError(err.message || 'Could not load villages/cities');
      })
      .finally(() => {
        if (!cancelled) setLoading((s) => ({ ...s, places: false }));
      });
    return () => {
      cancelled = true;
    };
  }, [talukaId]);

  useEffect(() => {
    if (!districtId || !talukaId) {
      setSros([]);
      return undefined;
    }
    let cancelled = false;
    setLoading((s) => ({ ...s, sros: true }));
    fetchGujaratSroOffices({
      districtId,
      talukaId,
      placeId: otherPlace ? null : placeId || null,
    })
      .then((rows) => {
        if (cancelled) return;
        setSros(rows);
        if (rows.length === 1) {
          const only = rows[0];
          if (property.sroId !== only.id || property.subRegistrarOffice !== locationLabel(only, language)) {
            updateField('property.sroId', only.id);
            updateField('property.subRegistrarOffice', locationLabel(only, language));
          }
        } else if (rows.length === 0) {
          updateField('property.sroId', '');
          updateField('property.subRegistrarOffice', '');
        } else if (property.sroId && !rows.some((r) => r.id === property.sroId)) {
          updateField('property.sroId', '');
          updateField('property.subRegistrarOffice', '');
        }
      })
      .catch((err) => {
        if (!cancelled) setLoadError(err.message || 'Could not load SRO offices');
      })
      .finally(() => {
        if (!cancelled) setLoading((s) => ({ ...s, sros: false }));
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- sync SRO from selection only
  }, [districtId, talukaId, placeId, otherPlace, language]);

  useEffect(() => {
    if (!placeId && property.village && talukaId && places.length) {
      const match = places.find(
        (p) => p.nameEn?.toLowerCase() === String(property.village).toLowerCase()
      );
      if (!match) setOtherPlace(true);
    }
  }, [places, placeId, property.village, talukaId]);

  // Keep stored location names in sync with UI language for the PDF
  useEffect(() => {
    if (districtId) {
      const dist = districts.find((d) => d.id === districtId);
      if (dist) updateField('property.district', locationLabel(dist, language));
    }
    if (talukaId) {
      const tal = talukas.find((d) => d.id === talukaId);
      if (tal) updateField('property.taluka', locationLabel(tal, language));
    }
    if (placeId && !otherPlace) {
      const place = places.find((p) => p.id === placeId);
      if (place) updateField('property.village', locationLabel(place, language));
    }
    if (sroId) {
      const sro = sros.find((d) => d.id === sroId);
      if (sro) updateField('property.subRegistrarOffice', locationLabel(sro, language));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only re-label when language or option lists change
  }, [language, districts, talukas, places, sros, districtId, talukaId, placeId, sroId, otherPlace]);

  const selectClass = (hasError) =>
    `w-full text-sm px-3.5 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-150 ${
      hasError ? 'border-red-300 focus:border-red-500' : 'border-slate-250 focus:border-emerald-600'
    }`;

  const onDistrictChange = (id) => {
    const dist = districts.find((d) => d.id === id);
    updateField('property.districtId', id);
    updateField('property.district', dist ? locationLabel(dist, language) : '');
    updateField('property.talukaId', '');
    updateField('property.taluka', '');
    updateField('property.placeId', '');
    updateField('property.village', '');
    updateField('property.sroId', '');
    updateField('property.subRegistrarOffice', '');
    setOtherPlace(false);
  };

  const onTalukaChange = (id) => {
    const tal = talukas.find((d) => d.id === id);
    updateField('property.talukaId', id);
    updateField('property.taluka', tal ? locationLabel(tal, language) : '');
    updateField('property.placeId', '');
    updateField('property.village', '');
    updateField('property.sroId', '');
    updateField('property.subRegistrarOffice', '');
    setOtherPlace(false);
  };

  const onPlaceChange = (value) => {
    if (value === OTHER_PLACE) {
      setOtherPlace(true);
      updateField('property.placeId', '');
      updateField('property.village', '');
      updateField('property.sroId', '');
      updateField('property.subRegistrarOffice', '');
      return;
    }
    setOtherPlace(false);
    const place = places.find((p) => p.id === value);
    updateField('property.placeId', value);
    updateField('property.village', place ? locationLabel(place, language) : '');
    updateField('property.sroId', '');
    updateField('property.subRegistrarOffice', '');
  };

  const onSroChange = (id) => {
    const sro = sros.find((d) => d.id === id);
    updateField('property.sroId', id);
    updateField('property.subRegistrarOffice', sro ? locationLabel(sro, language) : '');
  };

  const placeTypeLabel = (type) => {
    if (language !== 'gu') return type;
    if (type === 'city') return 'શહેર';
    if (type === 'town') return 'નગર';
    if (type === 'village') return 'ગામ';
    return type;
  };

  return (
    <div className="space-y-4">
      {loadError && (
        <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 m-0">
          {loadError}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            {t('district')} <span className="text-red-500">*</span>
          </label>
          <select
            value={districtId}
            onChange={(e) => onDistrictChange(e.target.value)}
            disabled={loading.districts}
            className={selectClass(errors.district)}
          >
            <option value="">{loading.districts ? 'Loading districts…' : 'Select district'}</option>
            {districts.map((d) => (
              <option key={d.id} value={d.id}>
                {locationLabel(d, language)}
              </option>
            ))}
          </select>
          {errors.district && <p className="text-[10px] text-red-600 mt-1">{errors.district}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            {t('taluka')} <span className="text-red-500">*</span>
          </label>
          <select
            value={talukaId}
            onChange={(e) => onTalukaChange(e.target.value)}
            disabled={!districtId || loading.talukas}
            className={selectClass(errors.taluka)}
          >
            <option value="">
              {!districtId ? 'Select district first' : loading.talukas ? 'Loading talukas…' : 'Select taluka'}
            </option>
            {talukas.map((d) => (
              <option key={d.id} value={d.id}>
                {locationLabel(d, language)}
              </option>
            ))}
          </select>
          {errors.taluka && <p className="text-[10px] text-red-600 mt-1">{errors.taluka}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Village / City (Moje / મોજે) <span className="text-red-500">*</span>
          </label>
          <select
            value={otherPlace ? OTHER_PLACE : placeId}
            onChange={(e) => onPlaceChange(e.target.value)}
            disabled={!talukaId || loading.places}
            className={selectClass(errors.village)}
          >
            <option value="">
              {!talukaId ? 'Select taluka first' : loading.places ? 'Loading places…' : 'Select village / city'}
            </option>
            {places.map((d) => (
              <option key={d.id} value={d.id}>
                {locationLabel(d, language)}
                {d.placeType && d.placeType !== 'village' ? ` (${placeTypeLabel(d.placeType)})` : ''}
              </option>
            ))}
            <option value={OTHER_PLACE}>
              {language === 'gu' ? 'અન્ય (ગામનું નામ લખો)' : 'Other (type village name)'}
            </option>
          </select>
          {otherPlace && (
            <input
              type="text"
              value={property.village || ''}
              onChange={(e) => updateField('property.village', e.target.value)}
              className={`mt-2 ${selectClass(errors.village)}`}
              placeholder="Enter village / city name"
            />
          )}
          {errors.village && <p className="text-[10px] text-red-600 mt-1">{errors.village}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            {t('sro')} <span className="text-red-500">*</span>
          </label>
          <select
            value={sroId}
            onChange={(e) => onSroChange(e.target.value)}
            disabled={!talukaId || loading.sros || sros.length <= 1}
            className={selectClass(errors.subRegistrarOffice)}
          >
            {sros.length !== 1 && (
              <option value="">
                {!talukaId
                  ? 'Select taluka / village first'
                  : loading.sros
                    ? 'Loading offices…'
                    : sros.length === 0
                      ? 'No office found'
                      : 'Select Sub-Registrar office'}
              </option>
            )}
            {sros.map((d) => (
              <option key={d.id} value={d.id}>
                {locationLabel(d, language)}
              </option>
            ))}
          </select>
          {sros.length === 1 && (
            <p className="text-[10px] text-emerald-700 mt-1 m-0">Auto-selected (only office for this area)</p>
          )}
          {errors.subRegistrarOffice && (
            <p className="text-[10px] text-red-600 mt-1">{errors.subRegistrarOffice}</p>
          )}
        </div>
      </div>
    </div>
  );
}
