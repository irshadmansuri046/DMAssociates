import React from 'react';
import {
  AALEKH,
  aalekhPageStyle,
  getPropertySnapshot,
  PropertySummaryTable,
  Watermark,
  PageNumber,
} from '../utils/aalekhDocumentUtils';
import PhotoSlotBox from './PhotoSlotBox';

/**
 * Property photo page(s) — content-packed.
 * One page with up to 2 photo slots; no forced empty middle stretch.
 */
export default function DocumentPropertyPhotos({ data, startPageNum = 7 }) {
  const photos = data.property?.photos || {};
  const snap = getPropertySnapshot(data);

  const slots = [
    { src: photos.sitePhoto || '', label: 'મિલકતનો ફોટો (૧)' },
    { src: photos.boundaryPhoto || photos.structurePhoto || '', label: 'મિલકતનો ફોટો (૨)' },
  ];

  return (
    <div
      style={{ ...aalekhPageStyle(), display: 'flex', flexDirection: 'column' }}
      className="gov-doc-page aalekh-photo-page"
    >
      <Watermark />
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column' }}>
        <PageNumber n={startPageNum} />

        <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '12pt', marginBottom: '12px', textDecoration: 'underline' }}>
          -:: વેચાણ આપેલ મિલકતના ફોટો ::-
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            flexWrap: 'wrap',
            marginBottom: '14px',
          }}
        >
          {slots.map((slot) => (
            <PhotoSlotBox
              key={slot.label}
              src={slot.src || null}
              label={slot.label}
              width="280px"
              height="340px"
              portrait
            />
          ))}
        </div>

        <p style={{ fontSize: AALEKH.fontSizeSmall, margin: '0 0 8px 0', lineHeight: '1.55' }}>
          વેચાણ આપેલ મિલકતનું પોસ્ટલ સરનામું : {snap.postalAddress}
        </p>
        <p style={{ fontSize: AALEKH.fontSizeSmall, margin: '4px 0' }}>
          વેચાણ આપનારની સહી :- ........................................................
        </p>
        <p style={{ fontSize: AALEKH.fontSizeSmall, margin: '4px 0 0 0' }}>
          વેચાણ લેનારની સહી :- ........................................................
        </p>

        <PropertySummaryTable data={data} />
      </div>
    </div>
  );
}
