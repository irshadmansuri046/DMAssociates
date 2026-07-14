import React, { useMemo } from 'react';
import { getClausePack } from '../../clauses/registry';
import { renderClauses } from '../clause-generator';
import EngineCoverPage from './CoverPage';
import { DocumentPage } from './PageChrome';
import { PropertySummaryBlock } from './PropertySummaryBlock';
import {
  ClauseBlock,
  PartiesBlock,
  PaymentBlock,
  BoundariesBlock,
  SignaturesBlock,
} from './ClauseBlocks';
import DocumentPropertyPhotos from '../../components/DocumentPropertyPhotos';
import DocumentFormNo1 from '../../components/DocumentFormNo1';
import { formDataToDocument } from '../../models/adapters';
import { SOFTWARE_VERSION } from '../../constants/version';
import { getPreambleTitle, getPartyRoles } from '../../constants/partyRoles';
import { getTemplateTheme } from './styles';

/**
 * Pack rendered clause nodes into content-sized pages.
 * Special renderAs blocks are expanded inline.
 */
function expandClauses(clauses, doc) {
  const roles = getPartyRoles(doc.documentType);
  const nodes = [];
  for (const clause of clauses) {
    if (clause.renderAs === 'parties') {
      nodes.push({ type: 'parties', key: clause.id });
    } else if (clause.renderAs === 'payment') {
      if (roles.showPayment === false) continue;
      nodes.push({ type: 'payment', key: clause.id, intro: clause.body });
    } else if (clause.renderAs === 'boundaries') {
      nodes.push({ type: 'boundaries', key: clause.id, intro: clause.body });
    } else if (clause.renderAs === 'signatures') {
      nodes.push({ type: 'signatures', key: clause.id, intro: clause.body });
    } else if (clause.renderAs === 'preamble') {
      nodes.push({
        type: 'preamble',
        key: clause.id,
        title: getPreambleTitle(doc.documentType, doc.locale || 'gu'),
        body: clause.body,
      });
    } else {
      nodes.push({ type: 'clause', key: clause.id, clause });
    }
  }
  return nodes;
}

/** Heuristic chunking into pages (content-packed, not fixed 18). */
function chunkNodes(nodes) {
  const pages = [];
  let current = [];
  let weight = 0;

  const flush = () => {
    if (current.length) {
      pages.push(current);
      current = [];
      weight = 0;
    }
  };

  const weights = {
    preamble: 2,
    parties: 4,
    payment: 3,
    boundaries: 2,
    signatures: 4,
    clause: 2,
  };

  for (const node of nodes) {
    const w = weights[node.type] || 2;
    if (weight + w > 10 && current.length) flush();
    current.push(node);
    weight += w;
    if (node.type === 'signatures') flush();
  }
  flush();
  return pages.length ? pages : [[]];
}

function renderNode(node, doc) {
  switch (node.type) {
    case 'preamble':
      return (
        <div key={node.key} className="deed-keep" style={{ marginBottom: 10 }}>
          <div style={{ textAlign: 'center', fontWeight: 700, fontSize: '12pt', textDecoration: 'underline', marginBottom: 10 }}>
            {node.title}
          </div>
          <p style={{ margin: 0, textAlign: 'justify', fontSize: '10pt' }}>{node.body}</p>
        </div>
      );
    case 'parties':
      return <PartiesBlock key={node.key} doc={doc} />;
    case 'payment':
      return <PaymentBlock key={node.key} doc={doc} intro={node.intro} />;
    case 'boundaries':
      return <BoundariesBlock key={node.key} doc={doc} intro={node.intro} />;
    case 'signatures':
      return <SignaturesBlock key={node.key} doc={doc} intro={node.intro} />;
    case 'clause':
      return <ClauseBlock key={node.key} clause={node.clause} />;
    default:
      return null;
  }
}

/**
 * Full document bundle driven by clause engine + template chrome.
 * Accepts either Document model or legacy formData (+ optional qrDataUrl).
 */
export default function EngineDocumentBundle({
  data,
  document: documentProp,
  qrDataUrl = '',
  containerId = 'deed-document-root',
}) {
  const doc = useMemo(() => {
    if (documentProp) {
      return {
        ...documentProp,
        version: documentProp.version || SOFTWARE_VERSION,
        generatedAt: documentProp.generatedAt || new Date().toISOString(),
      };
    }
    const converted = formDataToDocument(data || {}, {
      documentType: data?.documentType || 'sale_deed_flat',
      templateId: data?.templateId || 'builder',
    });
    // Preserve uploaded photos from live formData (base64 data URLs)
    const sellers = (data?.parties?.sellers || converted.parties?.sellers || []).map((p, i) => ({
      ...(converted.parties?.sellers?.[i] || {}),
      ...p,
      photo: p.photo || converted.parties?.sellers?.[i]?.photo || '',
    }));
    const buyers = (data?.parties?.buyers || converted.parties?.buyers || []).map((p, i) => ({
      ...(converted.parties?.buyers?.[i] || {}),
      ...p,
      photo: p.photo || converted.parties?.buyers?.[i]?.photo || '',
    }));
    const witnesses = (data?.witnesses || converted.witnesses || []).map((w, i) => ({
      ...(converted.witnesses?.[i] || {}),
      ...w,
      photo: w.photo || converted.witnesses?.[i]?.photo || '',
    }));
    const photos = {
      ...(converted.property?.photos || {}),
      ...(data?.property?.photos || {}),
    };
    return {
      ...converted,
      parties: { sellers, buyers },
      witnesses,
      property: { ...converted.property, photos },
      version: SOFTWARE_VERSION,
      generatedAt: new Date().toISOString(),
    };
  }, [data, documentProp]);

  const locale = doc.locale || 'gu';
  const theme = getTemplateTheme(doc.templateId);
  const roles = getPartyRoles(doc.documentType);
  const pack = getClausePack(doc.documentType || 'sale_deed_flat');
  const clauses = renderClauses(pack, doc, locale);
  const nodes = expandClauses(clauses, doc);
  const bodyPages = chunkNodes(nodes);
  // First dastavej page (PDF page 2 after cover) leaves top blank for govt stamp paper
  const useStamp = roles.useStampReserve !== false;

  let pageCounter = 1;
  const localeFont = theme.fonts?.gu || '"Noto Sans Gujarati", sans-serif';

  return (
    <div
      id={containerId}
      className={`gov-doc-bundle aalekh-doc-bundle deed-engine-bundle template-${doc.templateId || 'government'} doctype-${doc.documentType || 'sale_deed_flat'}`}
      data-document-type={doc.documentType || 'sale_deed_flat'}
      data-template-id={doc.templateId || 'government'}
      style={{
        color: theme.colors.text,
        width: '794px',
        maxWidth: '794px',
        background: '#fff',
        fontFamily: localeFont,
        fontSize: theme.fontSize || '10.5pt',
        lineHeight: theme.lineHeight,
      }}
    >
      <EngineCoverPage doc={doc} qrDataUrl={qrDataUrl} locale={locale} />

      {bodyPages.map((pageNodes, idx) => {
        const num = pageCounter++;
        const isStampPage = useStamp && idx === 0;
        return (
          <DocumentPage
            key={`body-${doc.documentType}-${doc.templateId}-${idx}`}
            doc={doc}
            pageNum={num}
            totalPages={bodyPages.length + 2}
            locale={locale}
            stampReserve={isStampPage}
            stampReserveHeight="480px"
            showHeader={!isStampPage}
          >
            {pageNodes.map((n) => renderNode(n, doc))}
            <PropertySummaryBlock doc={doc} />
          </DocumentPage>
        );
      })}

      <DocumentPropertyPhotos data={{ ...doc, property: doc.property, parties: doc.parties }} startPageNum={bodyPages.length + 1} />
      <DocumentFormNo1 data={{ ...doc, parties: doc.parties, property: doc.property }} />
    </div>
  );
}
