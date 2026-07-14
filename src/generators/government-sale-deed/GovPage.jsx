import React from 'react';
import { GOVT, DEED, govPageShell } from './styles';
import { APP_NAME, WATERMARK_TEXT } from '../../constants/version';
import { toGuDigits } from '../../utils/aalekhDocumentUtils';

/** Centered Gujarati page number — matches scanned govt deed (no modern Doc No header). */
export function GovPageNumber({ n, tokens = GOVT }) {
  if (n == null) return null;
  return (
    <div
      style={{
        textAlign: 'center',
        fontSize: tokens.fontSizePageNum || tokens.fontSize,
        fontWeight: 700,
        marginBottom: '8px',
        lineHeight: 1.3,
        flexShrink: 0,
        fontFamily: tokens.fontFamily,
      }}
    >
      {toGuDigits(n)}
    </div>
  );
}

function BrandPageFooter({ compact = false, tokens = GOVT }) {
  return (
    <div
      style={{
        marginTop: compact ? '6px' : '10px',
        paddingTop: '8px',
        flexShrink: 0,
        textAlign: 'center',
        fontSize: tokens.fontSizeBrand || '8.5pt',
        color: '#4b5563',
        borderTop: '0.5px solid #d1d5db',
        lineHeight: 1.35,
        fontFamily: tokens.fontFamily,
      }}
    >
      Created by : {APP_NAME}
    </div>
  );
}

/**
 * Government-style A4 page — wide margins, light watermark.
 * Pass `tokens={DEED}` for Farm/Plot finalized typography.
 * Pass `footer` to pin a signature strip above the brand page footer.
 */
export function GovPage({ pageNum, children, footer = null, style, tokens = GOVT, fixedHeight = false }) {
  const T = tokens || GOVT;
  const useDeed = T === DEED || T?.fontSize === DEED.fontSize;
  return (
    <div
      style={{
        ...govPageShell(style, T),
        display: 'flex',
        flexDirection: 'column',
        ...(fixedHeight
          ? {
              height: T.pageHeight,
              minHeight: T.pageHeight,
              maxHeight: T.pageHeight,
              overflow: 'hidden',
            }
          : { minHeight: T.pageHeight }),
      }}
      className={`gov-doc-page govt-sale-deed-page${useDeed ? ' deed-typo-page' : ''}`}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 0,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            transform: 'rotate(-32deg)',
            opacity: 0.04,
            fontSize: '20pt',
            fontWeight: 700,
            letterSpacing: '1.5px',
            color: '#111827',
            whiteSpace: 'nowrap',
            userSelect: 'none',
          }}
        >
          {String(WATERMARK_TEXT).toUpperCase()}
        </div>
      </div>
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          height: fixedHeight ? '100%' : undefined,
        }}
      >
        <GovPageNumber n={pageNum} tokens={T} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div style={{ flex: '1 1 auto', minHeight: 0, overflow: fixedHeight ? 'hidden' : undefined }}>
            {children}
          </div>
          <div style={{ marginTop: 'auto', flexShrink: 0 }}>
            {footer ? (
              <div style={{ marginTop: '12px', paddingTop: '6px' }}>{footer}</div>
            ) : null}
            <BrandPageFooter compact={Boolean(footer)} tokens={T} />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Bottom signature strip like the scanned deed (sellers left / buyer-company right). */
export function GovSignatureStrip({ sellers = [], buyers = [], tokens = GOVT }) {
  const T = tokens || GOVT;
  const seller = sellers[0];
  const buyer = buyers[0];
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: '24px',
        marginTop: 0,
        fontSize: T.fontSizeSmall,
        lineHeight: 1.45,
        fontFamily: T.fontFamily,
      }}
    >
      <div style={{ flex: 1 }}>
        {(sellers.length ? sellers : [seller || {}]).slice(0, 3).map((p, i) => (
          <div key={i} style={{ marginBottom: i === 0 ? 0 : '12px' }}>
            <div style={{ borderBottom: '1px dotted #000', width: '85%', marginBottom: '4px', minHeight: '16px' }} />
            <div>{p?.name || 'વેચાણ આપનાર'}</div>
          </div>
        ))}
      </div>
      <div style={{ flex: 1, textAlign: 'right' }}>
        {buyer?.isCorporate ? (
          <div>
            <div style={{ fontWeight: 700, textTransform: 'uppercase' }}>{buyer.name}</div>
            <div style={{ borderBottom: '1px dotted #000', width: '85%', margin: '14px 0 4px auto', minHeight: '16px' }} />
            <div>{buyer.authorisedSignatory || 'DIRECTOR'}</div>
          </div>
        ) : (
          <div>
            <div style={{ borderBottom: '1px dotted #000', width: '85%', margin: '0 0 4px auto', minHeight: '16px' }} />
            <div>{buyer?.name || 'વેચાણ લેનાર'}</div>
          </div>
        )}
      </div>
    </div>
  );
}
