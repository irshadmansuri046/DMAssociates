import React from 'react';
import { DOC, formatDocDate, formatToday, pageStyle } from '../utils/documentStyles';

export default function DocumentAffidavit({ data }) {
  const sellers = data.parties?.sellers || [];
  const buyers = data.parties?.buyers || [];
  const s = data.property || {};
  const t = data.transaction || {};
  const ex = data.execution || {};

  return (
    <div style={pageStyle({ pageBreakAfter: 'auto' })} className="gov-doc-page">
      
      {/* Affidavit Title Block */}
      <div style={{ border: '2px solid #000000', backgroundColor: '#fcf9f2', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
        <h3 style={{ margin: 0, fontWeight: 'bold', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          DECLARATION AFFIDAVIT UNDER SECTION 28 OF GUJARAT STAMP ACT, 1958
        </h3>
        <h4 style={{ margin: '4px 0 0 0', fontWeight: 'bold', fontSize: '11px' }}>
          ગુજરાત સ્ટેમ્પ અધિનિયમ ૧૯૫૮ની કલમ-૨૮ અન્વયેનું એકરારનામું (સોગંદનામું)
        </h4>
      </div>

      {/* Deponents Preamble */}
      <div className="space-y-1.5 text-justify" style={{ fontSize: '10.5px' }}>
        <p style={{ margin: 0 }}>
          We, the deponents, do hereby solemnly declare and state on oath under Section 28 of the Gujarat Stamp Act, 1958, that the details of the schedule property bearing Survey/Block No: <span style={{ fontWeight: 'bold' }}>{s.blockSurveyNo || '_______'}</span> situated at Village: <span style={{ fontWeight: 'bold' }}>{s.village || '_______'}</span>, Taluka: <span style={{ fontWeight: 'bold' }}>{s.taluka || '_______'}</span>, District: <span style={{ fontWeight: 'bold' }}>{s.district || '_______'}</span> and SRO jurisdiction of <span style={{ fontWeight: 'bold' }}>{s.subRegistrarOffice || '_______'}</span> are true and correct.
        </p>
        <p style={{ margin: 0, color: '#475569', fontStyle: 'italic' }}>
          અમો સોગંદનામું કરનાર આથી ગુજરાત સ્ટેમ્પ અધિનિયમ ૧૯૫૮ની કલમ-૨૮ અન્વયે ગંભીરતાપૂર્વક પ્રતિજ્ઞાપૂર્વક જાહેર કરીએ છીએ કે સદરહું મિલકત બ્લોક/સર્વે નંબર: {s.blockSurveyNo || '_______'}, મોજે: {s.village || '_______'}, તાલુકો: {s.taluka || '_______'}, જિલ્લો: {s.district || '_______'} અને સબ-રજીસ્ટ્રારશ્રી {s.subRegistrarOffice || '_______'} ના કાર્યક્ષેત્રમાં આવેલી મિલકતની વિગતો સાચી અને ખરી છે.
        </p>
      </div>

      {/* Affidavit Covenants */}
      <div className="space-y-3.5">
        {/* Covenant 1 */}
        <div style={{ padding: '10px', borderLeft: '3px solid #1e293b', backgroundColor: '#f8fafc', borderRadius: '0 8px 8px 0' }} className="space-y-1">
          <div style={{ fontWeight: 'bold', fontSize: '11px' }}>1. True Market Consideration Disclosure (અવેજની સાચી જાહેરાત)</div>
          <p style={{ margin: 0 }}>
            We declare that the total consideration settled for this transaction is ₹{t.totalSaleAmount ? parseInt(t.totalSaleAmount).toLocaleString('en-IN') : '_______'} which is the actual market value as per current Jantri Guidelines. No separate cash or hidden consideration has been exchanged.
          </p>
          <p style={{ margin: 0, color: '#475569', fontStyle: 'italic', fontSize: '9.5px' }}>
            અમો સોગંદ ઉપર જાહેર કરીએ છીએ કે સદરહું મિલકતનો સાચો અવેજ ₹{t.totalSaleAmount ? parseInt(t.totalSaleAmount).toLocaleString('en-IN') : '_______'} નક્કી કરેલ છે, જે હાલના જંત્રી દરો મુજબ યોગ્ય છે. આ સિવાય કોઈ અન્ય ગુપ્ત અવેજની લેવડ-દેવડ થયેલ નથી.
          </p>
        </div>

        {/* Covenant 2 */}
        <div style={{ padding: '10px', borderLeft: '3px solid #1e293b', backgroundColor: '#f8fafc', borderRadius: '0 8px 8px 0' }} className="space-y-1">
          <div style={{ fontWeight: 'bold', fontSize: '11px' }}>2. Encumbrances and Clear Title (બોજા મુક્તિ વિગતો)</div>
          <p style={{ margin: 0 }}>
            The scheduled property is under clear marketable title, free from any mortgage, charge, lien, court attachment, or government acquisition proceedings (GIDC, AUDA, RUDA, etc.).
          </p>
          <p style={{ margin: 0, color: '#475569', fontStyle: 'italic', fontSize: '9.5px' }}>
            સદરહું મિલકત ચોખ્ખા અને વેચાણપાત્ર ટાઇટલ ધરાવે છે. મિલકત પર કોઈ બોજો, ગીરો, કોર્ટ જપ્તી કે સરકારી સંપાદન (GIDC, AUDA, RUDA વગેરે) ની પ્રક્રિયા ચાલુ નથી.
          </p>
        </div>

        {/* Covenant 3 */}
        <div style={{ padding: '10px', borderLeft: '3px solid #1e293b', backgroundColor: '#f8fafc', borderRadius: '0 8px 8px 0' }} className="space-y-1">
          <div style={{ fontWeight: 'bold', fontSize: '11px' }}>3. Indemnity & Penalty Acknowledgment (નુકસાન વળતર અને પેનલ્ટી સ્વીકાર)</div>
          <p style={{ margin: 0 }}>
            In case of any under-valuation or misrepresentation of property coordinates detected by SRO or District Collector, we accept joint liability for recovery of deficit stamp duty under Section 32A of the Gujarat Stamp Act, along with penal interest and prosecution.
          </p>
          <p style={{ margin: 0, color: '#475569', fontStyle: 'italic', fontSize: '9.5px' }}>
            જો સબ-રજીસ્ટ્રાર અથવા કલેક્ટર સાહેબ દ્વારા મિલકતના ક્ષેત્રફળ કે કિંમત બાબતે કોઈ ઓછું મૂલ્યાંકન (Under-valuation) જણાશે, તો સ્ટેમ્પ એક્ટની કલમ-૩૨A હેઠળ ખુટતી સ્ટેમ્પ ડ્યુટી, વ્યાજ અને કાનૂની કાર્યવાહી માટે અમો સંયુક્ત રીતે જવાબદાર રહીશું.
          </p>
        </div>
      </div>

      {/* Deponents Signatures Frame using Layout Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <tbody>
          <tr>
            <td style={{ width: '50%', paddingRight: '6px', verticalAlign: 'top' }}>
              <div style={{ border: '1px solid #cbd5e1', borderRadius: '8px', padding: '12px', textAlign: 'center', backgroundColor: '#ffffff' }} className="space-y-6">
                <span style={{ fontWeight: 'bold', fontSize: '10px', color: '#064e3b', display: 'block', borderBottom: '1px solid #cbd5e1', paddingBottom: '4px', textTransform: 'uppercase' }}>
                  DEPONENT VENDOR (સોગંદનામું કરનાર વેચનાર)
                </span>
                <div className="space-y-4">
                  {sellers.map((p, idx) => (
                    <div key={idx} style={{ borderTop: idx > 0 ? '1px dashed #cbd5e1' : 'none', paddingTop: idx > 0 ? '8px' : '0', fontSize: '9.5px' }}>
                      Signature: ______________________
                      <div style={{ fontWeight: 'bold', color: '#1e293b', marginTop: '2px' }}>{p.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </td>
            <td style={{ width: '50%', paddingLeft: '6px', verticalAlign: 'top' }}>
              <div style={{ border: '1px solid #cbd5e1', borderRadius: '8px', padding: '12px', textAlign: 'center', backgroundColor: '#ffffff' }} className="space-y-6">
                <span style={{ fontWeight: 'bold', fontSize: '10px', color: '#78350f', display: 'block', borderBottom: '1px solid #cbd5e1', paddingBottom: '4px', textTransform: 'uppercase' }}>
                  DEPONENT VENDEE (સોગંદનામું કરનાર ખરીદનાર)
                </span>
                <div className="space-y-4">
                  {buyers.map((p, idx) => (
                    <div key={idx} style={{ borderTop: idx > 0 ? '1px dashed #cbd5e1' : 'none', paddingTop: idx > 0 ? '8px' : '0', fontSize: '9.5px' }}>
                      Signature: ______________________
                      <div style={{ fontWeight: 'bold', color: '#1e293b', marginTop: '2px' }}>{p.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Notary Verification Block */}
      <div style={{ border: '1px solid #000000', borderRadius: '8px', padding: '16px', backgroundColor: '#ffffff', marginTop: '20px' }} className="space-y-4">
        <div style={{ fontWeight: 'bold', fontSize: '11px', textAlign: 'center', color: '#000000', borderBottom: '1px solid #000000', paddingBottom: '4px' }}>
          VERIFICATION BY NOTARY PUBLIC (નોટરી રૂબરૂ ખરાઈ)
        </div>
        <p style={{ margin: 0, fontSize: '9.5px', lineHeight: '1.4' }}>
          Solemnly affirmed and signed before me by the deponents who are personally identified by me or identified by the presenter on this day: <span style={{ fontWeight: 'bold' }}>{formatDocDate(ex.executionDate) || formatToday()}</span> at sub-district registry office area.
        </p>
        
        {/* Notary Verification Fields Layout Table */}
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '16px' }}>
          <tbody>
            <tr>
              <td style={{ width: '33.33%', paddingRight: '8px', verticalAlign: 'middle' }}>
                <div style={{ fontSize: '9px', border: '1px dashed #cbd5e1', padding: '8px', borderRadius: '4px', height: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', color: '#94a3b8', boxSizing: 'border-box' }}>
                  <span>[ NOTARY STAMP ]</span>
                  <span style={{ fontSize: '7.5px', marginTop: '4px' }}>(નોટરી રજીસ્ટ્રેશન સ્ટેમ્પ)</span>
                </div>
              </td>
              <td style={{ width: '33.33%', paddingLeft: '4px', paddingRight: '4px', verticalAlign: 'top', fontSize: '9.5px' }}>
                <div style={{ padding: '4px 0' }}>Notary Serial No: __________</div>
                <div style={{ padding: '4px 0' }}>Notary Register Vol: _______</div>
                <div style={{ padding: '4px 0' }}>Commission Expiry: ________</div>
              </td>
              <td style={{ width: '33.33%', paddingLeft: '8px', textAlign: 'center', verticalAlign: 'bottom', fontSize: '9.5px' }}>
                <div style={{ borderBottom: '1px dashed #cbd5e1', width: '100%', marginBottom: '4px' }}></div>
                <div style={{ fontWeight: 'bold' }}>Notary Public Signature</div>
                <div style={{ fontSize: '8px', color: '#64748b' }}>Government of India / Gujarat</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
