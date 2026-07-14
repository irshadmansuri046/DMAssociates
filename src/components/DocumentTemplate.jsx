import React from 'react';
import EngineDocumentBundle from '../generators/template-engine';
import GovernmentSaleDeedBundle from '../generators/government-sale-deed';
import FarmLandSaleDeedBundle from '../generators/farm-land-sale-deed';
import BuilderSaleDeedBundle from '../generators/builder-sale-deed';
import { DEFAULT_TEMPLATE_ID, SALE_DEED_GOVT_LAYOUT_TEMPLATES, TEMPLATE_IDS } from '../constants/templates';
import { DEFAULT_DOCUMENT_TYPE, isBuilderSaleDeedType, isSaleDeedType } from '../constants/documentTypes';

/**
 * Public document template entry — remounts when type/template change so PDF capture sees fresh DOM.
 * Flat/House Sale Deed + Builder Style → Promoter→Allottee conveyance layout.
 * Farm Land + Government Style → agricultural deed layout (farm_land_sale_deed.pdf).
 * Plot / other Sale Deeds + Government Style → SRO layout with same typography as Farm Land.
 */
export default function DocumentTemplate({ data, qrDataUrl = '', containerId = 'deed-document-root' }) {
  const documentType = data?.documentType || DEFAULT_DOCUMENT_TYPE;
  const templateId = data?.templateId || DEFAULT_TEMPLATE_ID;
  const key = `${documentType}-${templateId}`;

  if (isBuilderSaleDeedType(documentType) && templateId === TEMPLATE_IDS.builder) {
    return (
      <BuilderSaleDeedBundle
        key={key}
        data={data}
        containerId={containerId}
      />
    );
  }

  if (documentType === 'sale_deed_farm_land' && SALE_DEED_GOVT_LAYOUT_TEMPLATES.has(templateId)) {
    return (
      <FarmLandSaleDeedBundle
        key={key}
        data={data}
        containerId={containerId}
      />
    );
  }

  if (isSaleDeedType(documentType) && SALE_DEED_GOVT_LAYOUT_TEMPLATES.has(templateId)) {
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
