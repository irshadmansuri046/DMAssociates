import React from 'react';
import EngineDocumentBundle from '../generators/template-engine';
import GovernmentSaleDeedBundle from '../generators/government-sale-deed';
import BuilderSaleDeedBundle from '../generators/builder-sale-deed';
import { DEFAULT_TEMPLATE_ID, SALE_DEED_GOVT_LAYOUT_TEMPLATES, TEMPLATE_IDS } from '../constants/templates';

/**
 * Public document template entry — remounts when type/template change so PDF capture sees fresh DOM.
 * Sale Deed + Builder Style → Promoter→Allottee conveyance layout.
 * Sale Deed + Government Style → scanned Gujarat SRO layout.
 */
export default function DocumentTemplate({ data, qrDataUrl = '', containerId = 'deed-document-root' }) {
  const documentType = data?.documentType || 'sale_deed';
  const templateId = data?.templateId || DEFAULT_TEMPLATE_ID;
  const key = `${documentType}-${templateId}`;

  if (documentType === 'sale_deed' && templateId === TEMPLATE_IDS.builder) {
    return (
      <BuilderSaleDeedBundle
        key={key}
        data={data}
        containerId={containerId}
      />
    );
  }

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
