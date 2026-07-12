import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { SOFTWARE_VERSION, APP_AUTHOR, APP_NAME } from '../../constants/version';
import { getDocumentTypeLabel } from '../../constants/documentTypes';

const CANVAS_MAX_PX = 16384;
const A4 = { widthMm: 210, heightMm: 297 };
const MARGIN_MM = 2;

function computeSafeScale(widthPx, heightPx, preferred = 1.75) {
  let scale = preferred;
  while (scale > 0.5 && (widthPx * scale > CANVAS_MAX_PX || heightPx * scale > CANVAS_MAX_PX)) {
    scale -= 0.25;
  }
  return scale;
}

function preprocessOklchStyles() {
  const detachedSheets = [];
  const tempStyleTags = [];
  const styleElements = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'));

  for (const el of styleElements) {
    try {
      let cssText = '';
      if (el.tagName.toLowerCase() === 'style') {
        cssText = el.innerHTML;
      } else if (el.tagName.toLowerCase() === 'link') {
        const sheet = el.sheet;
        if (sheet) {
          try {
            const rules = sheet.cssRules || sheet.rules;
            if (rules) cssText = Array.from(rules).map((r) => r.cssText).join('\n');
          } catch {
            // cross-origin
          }
        }
      }
      if (cssText && cssText.includes('oklch')) {
        const sanitizedCss = cssText.replace(/oklch\([^)]+\)/g, 'rgb(80, 80, 80)');
        const tempStyle = document.createElement('style');
        tempStyle.setAttribute('data-temp-pdf-style', 'true');
        tempStyle.innerHTML = sanitizedCss;
        document.head.appendChild(tempStyle);
        tempStyleTags.push(tempStyle);
        detachedSheets.push({ element: el, parent: el.parentNode, nextSibling: el.nextSibling });
        el.parentNode.removeChild(el);
      }
    } catch (err) {
      console.error('Error preprocessing stylesheet:', err);
    }
  }
  return { detachedSheets, tempStyleTags };
}

function restoreOklchStyles({ detachedSheets, tempStyleTags }) {
  tempStyleTags.forEach((tag) => {
    if (tag.parentNode) tag.parentNode.removeChild(tag);
  });
  detachedSheets.forEach((item) => {
    try {
      if (item.parent) {
        if (item.nextSibling && item.nextSibling.parentNode === item.parent) {
          item.parent.insertBefore(item.element, item.nextSibling);
        } else {
          item.parent.appendChild(item.element);
        }
      }
    } catch (restoreErr) {
      console.error('Failed to restore stylesheet:', restoreErr);
    }
  });
}

async function waitForImages(rootEl, timeoutMs = 8000) {
  const imgs = Array.from(rootEl.querySelectorAll('img'));
  if (!imgs.length) return;
  await Promise.all(
    imgs.map(
      (img) =>
        new Promise((resolve) => {
          if (img.complete && img.naturalWidth > 0) {
            resolve();
            return;
          }
          const done = () => resolve();
          img.addEventListener('load', done, { once: true });
          img.addEventListener('error', done, { once: true });
          setTimeout(done, timeoutMs);
        })
    )
  );
}

async function renderPageToCanvas(pageEl) {
  await waitForImages(pageEl);
  const widthPx = pageEl.offsetWidth || pageEl.scrollWidth || 794;
  const heightPx = pageEl.offsetHeight || pageEl.scrollHeight || 1123;
  const scale = computeSafeScale(widthPx, heightPx);
  return html2canvas(pageEl, {
    scale,
    logging: false,
    useCORS: true,
    allowTaint: true,
    backgroundColor: '#ffffff',
    letterRendering: true,
    imageTimeout: 15000,
    scrollX: 0,
    scrollY: -window.scrollY,
    windowWidth: widthPx,
    windowHeight: heightPx,
    width: widthPx,
    height: heightPx,
  });
}

/**
 * Professional PDF generation with metadata.
 */
export async function generatePlatformPDF({
  elementId,
  document: docMeta = {},
  villageName = 'Draft',
}) {
  const container = document.getElementById(elementId);
  if (!container) {
    throw new Error(`Printable element with ID "${elementId}" not found in DOM`);
  }

  const pages = container.querySelectorAll('.gov-doc-page');
  if (!pages.length) {
    throw new Error('No printable pages (.gov-doc-page) found in document');
  }

  // Ensure all uploaded photos are decoded before capture
  await waitForImages(container);

  const safeName = (villageName || 'Draft').replace(/[^a-zA-Z0-9\u0A80-\u0AFF_-]/g, '_');
  const dateStr = new Date().toISOString().slice(0, 10);
  const typeLabel = getDocumentTypeLabel(docMeta.documentType || 'sale_deed', 'en').replace(/\s+/g, '_');
  const filename = `${typeLabel}_${safeName}_${dateStr}.pdf`;

  const contentWidthMm = A4.widthMm - MARGIN_MM * 2;
  const contentHeightMm = A4.heightMm - MARGIN_MM * 2;
  const styleState = preprocessOklchStyles();

  try {
    const pdf = new jsPDF({
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait',
      compress: true,
    });

    pdf.setProperties({
      title: getDocumentTypeLabel(docMeta.documentType || 'sale_deed', 'en'),
      subject: 'Property Registration — Gujarat',
      author: APP_AUTHOR,
      keywords: `${getDocumentTypeLabel(docMeta.documentType || 'sale_deed', 'en')}, Gujarat, Property, Registration, ${docMeta.templateId || 'government'}, ${APP_NAME}, ${SOFTWARE_VERSION}`,
      creator: `${APP_NAME} v${SOFTWARE_VERSION}`,
    });

    for (let i = 0; i < pages.length; i++) {
      const pageEl = pages[i];
      const canvas = await renderPageToCanvas(pageEl);
      const imgData = canvas.toDataURL('image/jpeg', 0.88);
      const drawWidth = contentWidthMm;
      const naturalHeight = (canvas.height * drawWidth) / canvas.width;
      const drawHeight = Math.min(naturalHeight, contentHeightMm);
      if (i > 0) pdf.addPage();
      pdf.addImage(imgData, 'JPEG', MARGIN_MM, MARGIN_MM, drawWidth, drawHeight, undefined, 'FAST');
    }

    pdf.save(filename);
    return { filename, pageCount: pages.length };
  } finally {
    restoreOklchStyles(styleState);
  }
}

/** Back-compat wrapper used by WizardForm */
export const generateDeedPDF = async (elementId, villageName = 'Draft') => {
  return generatePlatformPDF({ elementId, villageName, document: { documentType: 'sale_deed' } });
};

export default generatePlatformPDF;
