import QRCode from 'qrcode';
import { buildQrPayload } from './IdService';

/**
 * Generate QR as data URL for cover page embedding.
 */
export async function generateDocumentQrDataUrl(doc, options = {}) {
  const payload = buildQrPayload(doc);
  const text = JSON.stringify(payload);
  try {
    return await QRCode.toDataURL(text, {
      errorCorrectionLevel: 'M',
      margin: 1,
      width: options.width || 120,
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
    });
  } catch (err) {
    console.error('QR generation failed', err);
    return '';
  }
}

export default { generateDocumentQrDataUrl };
