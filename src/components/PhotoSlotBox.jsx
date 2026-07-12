import React from 'react';
import { AALEKH } from '../utils/aalekhDocumentUtils';

/**
 * Indian passport photograph size ≈ 3.5 × 4.5 cm.
 * At ~96dpi screen/PDF: ~132 × 170 px — use slightly larger paste boxes for SRO print.
 */
export const PASSPORT_PHOTO = {
  width: '135px',
  height: '175px',
  widthMm: '35mm',
  heightMm: '45mm',
};

/** Tiny stamp-ticket size for inline party photo next to name/address */
export const STAMP_PHOTO = {
  width: '52px',
  height: '65px',
  widthMm: '14mm',
  heightMm: '17mm',
};

/** Empty bordered box for pasting photos, or shows uploaded image when provided */
export default function PhotoSlotBox({
  src,
  label = 'ફોટો',
  width = PASSPORT_PHOTO.width,
  height = PASSPORT_PHOTO.height,
  portrait = true,
  compact = false,
}) {
  if (src) {
    return (
      <img
        src={src}
        alt={label}
        decoding="sync"
        style={{
          width,
          height,
          objectFit: 'cover',
          border: AALEKH.border,
          display: 'block',
          margin: compact ? 0 : '0 auto',
          boxSizing: 'border-box',
          flexShrink: 0,
        }}
      />
    );
  }

  return (
    <div
      style={{
        width,
        height,
        border: `1px solid #000`,
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: compact ? 0 : '0 auto',
        boxSizing: 'border-box',
        padding: compact ? '2px' : '6px',
        flexShrink: 0,
      }}
    >
      <span
        style={{
          fontSize: compact ? '6.5pt' : '9pt',
          color: '#374151',
          textAlign: 'center',
          fontWeight: 'bold',
          lineHeight: 1.15,
        }}
      >
        {label}
      </span>
      {!compact && (
        <>
          <span style={{ fontSize: '7.5pt', color: '#9ca3af', textAlign: 'center', marginTop: '4px', lineHeight: 1.3 }}>
            {portrait ? 'પાસપોર્ટ સાઈઝ ૩.૫ × ૪.૫ સેમી' : '(ફોટો અહીં ચોંટાડવો)'}
          </span>
          {portrait && (
            <span style={{ fontSize: '7pt', color: '#9ca3af', textAlign: 'center', marginTop: '2px' }}>
              3.5 × 4.5 cm
            </span>
          )}
        </>
      )}
    </div>
  );
}

export function ThumbSlotBox({ height = PASSPORT_PHOTO.height, width = PASSPORT_PHOTO.width }) {
  return (
    <div
      style={{
        width,
        minHeight: height,
        height,
        border: `1px dashed #64748b`,
        backgroundColor: '#fafafa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '8pt',
        color: '#64748b',
        textAlign: 'center',
        padding: '4px',
        boxSizing: 'border-box',
        margin: '0 auto',
      }}
    >
      અંગૂઠાની છાપ
    </div>
  );
}

export function SignatureSlotBox({ height = PASSPORT_PHOTO.height, width = '160px' }) {
  return (
    <div
      style={{
        width,
        minHeight: height,
        height,
        border: `1px dashed #64748b`,
        backgroundColor: '#fafafa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '8pt',
        color: '#64748b',
        textAlign: 'center',
        padding: '4px',
        boxSizing: 'border-box',
        margin: '0 auto',
      }}
    >
      સહી
    </div>
  );
}
