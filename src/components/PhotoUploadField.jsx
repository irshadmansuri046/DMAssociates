import React, { useRef, useState } from 'react';
import { Camera, X, Upload } from 'lucide-react';
import { readImageAsDataUrl } from '../utils/imageUpload';
import { useLanguage } from '../context/LanguageContext';

/**
 * Passport / property photo upload — required by Gujarat SRO for registration packet
 */
export default function PhotoUploadField({
  label,
  subLabel,
  value,
  onChange,
  required = false,
  error,
  aspect = 'portrait', // portrait | landscape
  sizeHint,
}) {
  const { t } = useLanguage();
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState('');
  const hint = sizeHint ?? t('passportSizeHint');

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    setLocalError('');
    try {
      const dataUrl = await readImageAsDataUrl(file);
      onChange(dataUrl);
    } catch (err) {
      setLocalError(err.message);
    } finally {
      setLoading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const isLandscape = aspect === 'landscape';
  const boxClass = isLandscape
    ? 'w-full aspect-[4/3] min-h-[7rem]'
    : 'w-24 h-32 shrink-0';

  return (
    <div className="space-y-1.5 min-w-0">
      <label className="block text-xs font-semibold text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {subLabel && <p className="text-[10px] text-slate-500 m-0">{subLabel}</p>}

      <div className={`flex gap-3 ${isLandscape ? 'flex-col' : 'items-start'}`}>
        <div
          className={`${boxClass} border-2 border-dashed rounded-lg overflow-hidden flex items-center justify-center bg-slate-50 ${
            error || localError ? 'border-red-300' : 'border-slate-300'
          }`}
        >
          {value ? (
            <img src={value} alt={label} className="w-full h-full object-cover" />
          ) : (
            <Camera size={20} className="text-slate-400" />
          )}
        </div>

        <div className={`flex gap-1.5 ${isLandscape ? 'flex-row flex-wrap items-center' : 'flex-col'}`}>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={loading}
            className="inline-flex items-center gap-1 text-[10px] font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 px-2.5 py-1.5 rounded border border-emerald-200 cursor-pointer disabled:opacity-60"
          >
            <Upload size={12} />
            {loading ? t('uploading') : value ? t('replacePhoto') : t('uploadPhoto')}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="inline-flex items-center gap-1 text-[10px] font-semibold text-red-600 hover:text-red-700 cursor-pointer"
            >
              <X size={12} /> {t('removePhoto')}
            </button>
          )}
          <span className={`text-[9px] text-slate-400 leading-snug ${isLandscape ? 'w-full' : 'max-w-[140px]'}`}>
            {hint}
          </span>
        </div>
      </div>

      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleFile} />

      {(error || localError) && (
        <p className="text-[10px] text-red-600 m-0">{error || localError}</p>
      )}
    </div>
  );
}
