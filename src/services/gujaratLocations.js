import { supabase } from '../lib/supabase';

export async function fetchGujaratDistricts() {
  const { data, error } = await supabase.rpc('list_gu_districts');
  if (error) throw new Error(error.message || 'Failed to load districts');
  return Array.isArray(data) ? data : [];
}

export async function fetchGujaratTalukas(districtId) {
  if (!districtId) return [];
  const { data, error } = await supabase.rpc('list_gu_talukas', {
    p_district_id: districtId,
  });
  if (error) throw new Error(error.message || 'Failed to load talukas');
  return Array.isArray(data) ? data : [];
}

export async function fetchGujaratPlaces(talukaId) {
  if (!talukaId) return [];
  const { data, error } = await supabase.rpc('list_gu_places', {
    p_taluka_id: talukaId,
  });
  if (error) throw new Error(error.message || 'Failed to load villages/cities');
  return Array.isArray(data) ? data : [];
}

export async function fetchGujaratSroOffices({ districtId, talukaId, placeId }) {
  if (!districtId) return [];
  const { data, error } = await supabase.rpc('list_gu_sro_offices', {
    p_district_id: districtId,
    p_taluka_id: talukaId || null,
    p_place_id: placeId || null,
  });
  if (error) throw new Error(error.message || 'Failed to load Sub-Registrar offices');
  return Array.isArray(data) ? data : [];
}

export function locationLabel(item, language = 'en') {
  if (!item) return '';
  const gu = (item.nameGu || '').trim();
  const en = (item.nameEn || '').trim();
  if (language === 'gu') {
    // Prefer Gujarati when it is actually translated (not a Latin duplicate)
    if (gu && /[\u0A80-\u0AFF]/.test(gu)) return gu;
    if (gu && gu !== en) return gu;
  }
  return en || gu || '';
}
