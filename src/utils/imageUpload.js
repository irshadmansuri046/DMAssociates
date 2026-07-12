const MAX_BYTES = 400 * 1024;
const ACCEPTED = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

/** Downscale / compress image for PDF performance */
export function compressImageDataUrl(dataUrl, maxWidth = 900, quality = 0.82) {
  return new Promise((resolve) => {
    if (!dataUrl || !dataUrl.startsWith('data:image')) {
      resolve(dataUrl);
      return;
    }
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxWidth / img.width);
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}

export function readImageAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file selected'));
      return;
    }
    if (!ACCEPTED.includes(file.type)) {
      reject(new Error('Only JPG, PNG, or WebP images are allowed'));
      return;
    }
    if (file.size > MAX_BYTES) {
      reject(new Error('Image must be under 400 KB (passport-size recommended)'));
      return;
    }
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const compressed = await compressImageDataUrl(reader.result);
        resolve(compressed);
      } catch {
        resolve(reader.result);
      }
    };
    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.readAsDataURL(file);
  });
}

export function photoPlaceholder(label = 'PHOTO') {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="150" viewBox="0 0 120 150">
    <rect width="120" height="150" fill="#f1f5f9" stroke="#94a3b8" stroke-width="2"/>
    <text x="60" y="70" text-anchor="middle" font-family="Arial" font-size="10" fill="#64748b">${label}</text>
  </svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export const partyPhotoPlaceholder = photoPlaceholder;

export function propertyPhotoPlaceholder(label = 'PROPERTY') {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="150" viewBox="0 0 200 150">
    <rect width="200" height="150" fill="#f8fafc" stroke="#64748b" stroke-width="2"/>
    <text x="100" y="75" text-anchor="middle" font-family="Arial" font-size="11" fill="#475569">${label}</text>
  </svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
