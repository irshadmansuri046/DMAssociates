import React from 'react';
import EngineDocumentBundle from '../generators/template-engine';
import GovernmentSaleDeedBundle from '../generators/government-sale-deed';
import { DEFAULT_TEMPLATE_ID, SALE_DEED_GOVT_LAYOUT_TEMPLATES } from '../constants/templates';

/**
 * Public document template entry — remounts when type/template change so PDF capture sees fresh DOM.
 * Sale Deed + Builder Style / Government Style use the scanned Gujarat SRO format
 * (AALEKH/govt-sale-deed-format-in-gujarati.pdf). Builder Style is a copy for now.
 */
export default function DocumentTemplate({ data, qrDataUrl = '', containerId = 'deed-document-root' }) {
  const documentType = data?.documentType || 'sale_deed';
  const templateId = data?.templateId || DEFAULT_TEMPLATE_ID;
  const key = `${documentType}-${templateId}`;

  if (documentType === 'sale_deed' && SALE_DEED_GOVT_LAYOUT_TEMPLATES.has(templateId)) {
    return (
      <GovernmentSaleDeedBundle
        key={key}
        data={data}
        containerId={containerId}
      />
    );
  }

  return (
    <EngineDocumentBundle
      key={key}
      data={data}
      qrDataUrl={qrDataUrl}
      containerId={containerId}
    />
  );
}
