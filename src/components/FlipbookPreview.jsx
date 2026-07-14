import React, { useState } from 'react';
import { useDeedForm } from '../context/DeedFormContext';
import { useLanguage } from '../context/LanguageContext';
import { numberToWords } from '../utils/numberToWords';
import { ChevronLeft, ChevronRight, BookOpen, ShieldCheck, FileText, Check } from 'lucide-react';

export default function FlipbookPreview() {
  const { formData } = useDeedForm();
  const { t, translateLegal } = useLanguage();
  const [activePair, setActivePair] = useState(0); // 0: Cover/Stamp, 1: Parties/Property, 2: Consideration/Annexure, 3: Checklist/Affidavit

  const s = formData.property || {};
  const tr = formData.transaction || {};
  const sellers = formData.parties?.sellers || [];
  const buyers = formData.parties?.buyers || [];
  const history = formData.titleHistory || [];
  const payments = tr.payments || [];
  const c = formData.compliance || {};

  const totalSaleAmount = parseFloat(tr.totalSaleAmount) || 0;
  const spelledOutEn = numberToWords(totalSaleAmount, 'en');
  const spelledOutGu = numberToWords(totalSaleAmount, 'gu');

  // TDS Calculations
  const tdsActive = totalSaleAmount >= 5000000;
  const tdsAmount = tdsActive ? Math.round(totalSaleAmount * 0.01) : 0;
  const netAmount = totalSaleAmount - tdsAmount;

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-GB');
    } catch {
      return dateStr;
    }
  };

  const nextPage = () => {
    if (activePair < 3) setActivePair(activePair + 1);
  };

  const prevPage = () => {
    if (activePair > 0) setActivePair(activePair - 1);
  };

  const renderPartyBrief = (party) => {
    if (party.isCorporate) {
      return (
        <div style={{ color: '#1e293b' }}>
          <span style={{ fontWeight: 'bold' }}>{party.name}</span> (Corporate Entity)<br/>
          CIN: {party.companyCin || '________'}<br/>
          Signatory: {party.authorisedSignatory || '________'}
        </div>
      );
    } else {
      return (
        <div style={{ color: '#1e293b' }}>
          <span style={{ fontWeight: 'bold' }}>{party.name}</span> (Individual)<br/>
          Age: {party.age || '___'} years | Occ: {party.occupation || '___'}
        </div>
      );
    }
  };

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* 3D Ledger Book Container */}
      <div className="w-full max-w-[850px] aspect-[16/10] bg-emerald-950/20 rounded-2xl p-4 md:p-6 shadow-2xl border border-white/20 relative flipbook-perspective flex items-center justify-center">
        
        {/* Book Outer Leather Cover Shadow effect */}
        <div className="absolute inset-2 bg-stone-900 rounded-xl shadow-inner border-2 border-stone-850 flex pointer-events-none">
          <div className="w-1/2 h-full border-r border-stone-950 bg-gradient-to-l from-stone-800 to-stone-900 rounded-l-xl"></div>
          <div className="w-1/2 h-full bg-gradient-to-r from-stone-800 to-stone-900 rounded-r-xl"></div>
        </div>

        {/* The Open Pages */}
        <div className="w-[96%] h-[94%] bg-amber-50/10 rounded-lg relative flex z-10 overflow-hidden shadow-2xl">
          {/* Middle Spine of the Book */}
          <div className="flipbook-spine"></div>

          {/* LEFT PAGE */}
          <div className="w-1/2 h-full bg-[#fcf9f2] p-6 relative ledger-paper-lines flex flex-col justify-between overflow-y-auto text-[9px] leading-relaxed border-r border-slate-200">
            {activePair === 0 && (
              <div className="space-y-4 my-auto text-center px-4">
                <BookOpen size={44} className="mx-auto text-emerald-800 animate-pulse stroke-[1.2]" />
                <h4 className="text-xs font-extrabold text-emerald-950 uppercase tracking-widest leading-normal">
                  SUB-REGISTRAR OFFICE REGISTRATION LEDGER
                </h4>
                <div className="border-t-2 border-amber-600/40 w-1/3 mx-auto"></div>
                <p className="text-[10px] text-slate-500 font-semibold italic">
                  State of Gujarat, India
                </p>
                <div className="bg-amber-100/40 p-3 rounded-lg border border-amber-200 text-left text-[9px] text-slate-700 space-y-1 mt-6">
                  <div>District: <span className="font-bold text-slate-900">{s.district || '_______'}</span></div>
                  <div>Taluka: <span className="font-bold text-slate-900">{s.taluka || '_______'}</span></div>
                  <div>SRO Office: <span className="font-bold text-slate-900">{s.subRegistrarOffice || '_______'}</span></div>
                  <div>Village: <span className="font-bold text-slate-900">{s.village || '_______'}</span></div>
                  <div>Moje / Mouza: <span className="font-bold text-slate-900">{s.moje || s.village || '_______'}</span></div>
                </div>
              </div>
            )}

            {activePair === 1 && (
              <div className="space-y-4">
                <h5 className="text-[10px] font-bold text-emerald-900 border-b border-emerald-100 pb-0.5 uppercase tracking-wide">
                  {translateLegal('firstParty', {})}
                </h5>
                <div className="space-y-2">
                  {sellers.map((party, index) => (
                    <div key={index} className="pb-2 border-b border-slate-100 last:border-0 text-[8.5px]">
                      {renderPartyBrief(party)}
                      <div className="font-mono text-slate-400 mt-0.5">PAN: {party.pan || '___________'}</div>
                    </div>
                  ))}
                </div>

                <h5 className="text-[10px] font-bold text-amber-900 border-b border-amber-100 pb-0.5 uppercase tracking-wide pt-1">
                  {translateLegal('secondParty', {})}
                </h5>
                <div className="space-y-2">
                  {buyers.map((party, index) => (
                    <div key={index} className="pb-2 border-b border-slate-100 last:border-0 text-[8.5px]">
                      {renderPartyBrief(party)}
                      <div className="font-mono text-slate-400 mt-0.5">PAN: {party.pan || '___________'}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activePair === 2 && (
              <div className="space-y-3">
                <h5 className="text-[10px] font-bold text-slate-800 border-b border-slate-200 pb-0.5 uppercase tracking-wide">
                  Consideration Recital
                </h5>
                
                <div className="bg-amber-50/40 p-2 rounded border border-amber-250 text-slate-850 space-y-1 text-[8.5px] leading-normal">
                  <div>
                    સદર મિલકતનો સાચો અવેજ <span className="font-bold">₹{totalSaleAmount.toLocaleString('en-IN')}</span> નક્કી કરેલ છે.
                  </div>
                  {tdsActive && (
                    <div style={{ color: '#b91c1c', fontWeight: 'bold' }}>
                      Section 194-IA 1% TDS (₹{tdsAmount.toLocaleString('en-IN')}) Deducted. Net Payable: ₹{netAmount.toLocaleString('en-IN')}.
                    </div>
                  )}
                </div>

                {payments.length > 0 && (
                  <div className="space-y-1">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block">Installments splits:</span>
                    <div className="border border-slate-200 rounded overflow-hidden">
                      <table className="min-w-full divide-y divide-slate-150 text-[7px]">
                        <thead>
                          <tr className="bg-slate-100">
                            <th className="p-1 text-left font-bold text-slate-600">Mode/Bank</th>
                            <th className="p-1 text-left font-bold text-slate-600">Instrument No</th>
                            <th className="p-1 text-right font-bold text-slate-600">Amt</th>
                          </tr>
                        </thead>
                        <tbody>
                          {payments.slice(0, 3).map((py, idx) => (
                            <tr key={idx} className="border-b border-slate-100 last:border-0 bg-white">
                              <td className="p-1 text-slate-700 truncate max-w-[65px]">{py.mode} - {py.bankName}</td>
                              <td className="p-1 font-mono text-[6.5px] text-slate-500 truncate max-w-[50px]">{py.instrumentNo}</td>
                              <td className="p-1 text-right font-bold text-slate-900">₹{(parseInt(py.amount) || 0).toLocaleString('en-IN')}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activePair === 3 && (
              <div className="space-y-3">
                <h5 className="text-[10px] font-bold text-slate-800 border-b border-slate-200 pb-0.5 uppercase tracking-wide flex items-center gap-1">
                  <ShieldCheck size={12} className="text-emerald-700" />
                  SRO Verification Checklist
                </h5>

                <div className="space-y-1.5 text-[8px]">
                  <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded">
                    <Check size={10} className={c.hasOriginalTitleDeeds ? "text-emerald-600" : "text-slate-300"} />
                    <span>Original Deeds Verified: {c.hasOriginalTitleDeeds ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded">
                    <Check size={10} className={c.hasJantriCertificate ? "text-emerald-600" : "text-slate-300"} />
                    <span>Jantri Rate Checked: {c.hasJantriCertificate ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded">
                    <Check size={10} className={c.hasPropertyCard ? "text-emerald-600" : "text-slate-300"} />
                    <span>7-12 Copy (&lt;30 days): {c.hasPropertyCard ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded">
                    <Check size={10} className={c.hasGrasPayment ? "text-emerald-600" : "text-slate-300"} />
                    <span>GRAS E-Challan Paid: {c.hasGrasPayment ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </div>
            )}
            
            <div className="text-[8px] text-slate-400 text-center font-bold">
              Page {activePair * 2 + 1}
            </div>
          </div>

          {/* RIGHT PAGE */}
          <div className="w-1/2 h-full bg-[#fcf9f2] p-6 relative ledger-paper-lines flex flex-col justify-between overflow-y-auto text-[9px] leading-relaxed">
            {activePair === 0 && (
              <div className="space-y-4">
                {/* Stamp Paper Preview Header */}
                <div className="stamp-header p-2.5 rounded text-center space-y-1 select-none">
                  <div className="text-[8px] font-bold text-emerald-850 uppercase tracking-wider">GUJARAT STATE E-STAMPING</div>
                  <div className="text-[10px] font-extrabold text-emerald-950">Draft Sale Deed / વેચાણ દસ્તાવેજ મુસદ્દો</div>
                  <div className="border-t border-emerald-800/10 my-0.5"></div>
                  <div className="text-[7.5px] text-slate-500 font-semibold">
                    Duty Receipt: {tr.stampDutyReceiptNo || 'GRAS-SD-XXXXXXXX'}
                  </div>
                </div>

                <div className="text-center py-1">
                  <h4 className="text-[10px] font-extrabold text-slate-900 m-0 uppercase tracking-wide">
                    {translateLegal('deedTitle', {})}
                  </h4>
                </div>

                <div className="space-y-2 text-[8.5px]">
                  <div className="font-semibold text-slate-800">
                    {translateLegal('partiesPreamble', {})}
                  </div>
                  <div className="text-slate-400 italic">
                    This Deed of Sale is executed at the Sub-Registrar Office, Gujarat state, on this day as under:
                  </div>
                </div>
              </div>
            )}

            {activePair === 1 && (
              <div className="space-y-3">
                <h5 className="text-[10px] font-bold text-slate-800 border-b border-slate-200 pb-0.5 uppercase tracking-wide">
                  {translateLegal('propertyDescription', {})}
                </h5>

                <div className="space-y-1.5 bg-slate-100/40 p-2 rounded-lg border border-slate-150">
                  <div className="font-semibold text-slate-850 leading-tight">
                    સ્થાવર મિલકત ગામ: <span className="font-bold">{s.village || '_______'}</span>, તાલુકો: <span className="font-bold">{s.taluka || '_______'}</span>, જિલ્લો: <span className="font-bold">{s.district || '_______'}</span>, સર્વે/બ્લોક નંબર: <span className="font-bold">{s.blockSurveyNo || '_______'}</span>.
                  </div>
                  <div className="text-slate-500 italic text-[7.5px] leading-tight">
                    Plot Area: {s.totalPlotArea || '___'} Sqm | SRO: {s.subRegistrarOffice || '___'}
                  </div>
                </div>

                {/* Tenure Clauses */}
                <div className="p-2 rounded border border-amber-200 bg-amber-50/20 text-[8px] leading-snug">
                  {s.tenureType === 'new_tenure' ? (
                    <div className="text-amber-900 font-bold">
                      🛡️ નવી શરત: કલેક્ટર સાહેબના પરવાનગી હુકમ નંબર: <span className="underline">{s.collectorPermissionOrderNo || '_____'}</span> અન્વયે મંજૂર થયેલ છે.
                    </div>
                  ) : (
                    <div className="text-slate-700 font-bold">
                      🛡️ જૂની શરત: સદર મિલકત હસ્તાંતરણ અર્થે મુક્ત અને લાયક છે.
                    </div>
                  )}
                </div>

                {/* Boundaries list */}
                <div className="grid grid-cols-2 gap-1.5 text-[7.5px] p-1.5 bg-slate-50 rounded border border-slate-200">
                  <div>East: <span className="font-semibold text-slate-700 truncate block">{s.boundaries?.east || '____'}</span></div>
                  <div>West: <span className="font-semibold text-slate-700 truncate block">{s.boundaries?.west || '____'}</span></div>
                  <div>North: <span className="font-semibold text-slate-700 truncate block">{s.boundaries?.north || '____'}</span></div>
                  <div>South: <span className="font-semibold text-slate-700 truncate block">{s.boundaries?.south || '____'}</span></div>
                </div>
              </div>
            )}

            {activePair === 2 && (
              <div className="space-y-3">
                <h5 className="text-[10px] font-bold text-slate-800 border-b border-slate-200 pb-0.5 uppercase tracking-wide">
                  Annexure-A: Photo & Fingerprints
                </h5>

                <div className="grid grid-cols-2 gap-3 text-center">
                  <div style={{ border: '1px dashed #94a3b8', borderRadius: '4px', height: '110px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc', padding: '4px' }}>
                    <div style={{ width: '45px', height: '55px', border: '1px solid #cbd5e1', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '6px', color: '#64748b' }}>
                      Affix Photo
                    </div>
                    <span style={{ fontSize: '7px', color: '#64748b', marginTop: '4px', fontWeight: 'bold' }}>PASSPORT PHOTO</span>
                  </div>
                  <div style={{ border: '1px dashed #94a3b8', borderRadius: '4px', height: '110px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc', padding: '4px' }}>
                    <div style={{ width: '45px', height: '40px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '6px', color: '#cbd5e1' }}>
                      Ink Space
                    </div>
                    <span style={{ fontSize: '7px', color: '#64748b', marginTop: '10px', fontWeight: 'bold' }}>THUMB IMPRESSION</span>
                  </div>
                </div>

                <div style={{ borderTop: '1px dashed #e2e8f0', paddingTop: '4px', display: 'flex', justifyStyle: 'space-between', justifyContent: 'space-between', fontSize: '8px', fontWeight: 'bold', color: '#1e293b' }}>
                  <span>DEPONENT VENDOR</span>
                  <span>Signature: _________________</span>
                </div>
              </div>
            )}

            {activePair === 3 && (
              <div className="space-y-3">
                <h5 className="text-[10px] font-bold text-slate-850 border-b border-slate-200 pb-0.5 uppercase tracking-wide flex items-center gap-1">
                  <FileText size={12} className="text-slate-700" />
                  Section 28 Stamp Act Affidavit
                </h5>

                <p style={{ fontSize: '7.5px', color: '#475569', lineHeight: '1.4', margin: 0 }} className="text-justify italic">
                  We, the deponents, solemnly swear that the market consideration of the property has been fully and truly declared as per Jantri rates. Deficiency of stamp duty recovery under Sec 32A accepted if discrepancy detected.
                </p>

                <div style={{ border: '1px solid #000', borderRadius: '4px', padding: '6px', backgroundColor: '#ffffff', fontSize: '7.5px' }} className="space-y-1">
                  <div style={{ fontWeight: 'bold', textAlign: 'center', borderBottom: '1px solid #000', paddingBottom: '2px' }}>NOTARY VERIFICATION</div>
                  <div>Notary Serial No: __________</div>
                  <div>Seal & Sign: _______________</div>
                </div>
              </div>
            )}
            
            <div className="text-[8px] text-slate-400 text-center font-bold">
              Page {activePair * 2 + 2}
            </div>
          </div>

        </div>
      </div>

      {/* 3D Navigation Controls */}
      <div className="mt-5 flex items-center space-x-3 text-xs font-semibold no-print">
        <button
          onClick={prevPage}
          disabled={activePair === 0}
          type="button"
          className={`p-2 rounded-lg border flex items-center justify-center cursor-pointer transition-colors duration-150 ${
            activePair === 0 
              ? 'border-slate-200 text-slate-350 bg-slate-55 bg-slate-50 cursor-not-allowed'
              : 'border-slate-300 text-slate-700 bg-white hover:bg-slate-50'
          }`}
        >
          <ChevronLeft size={16} />
        </button>
        
        <span className="text-slate-600 font-bold bg-white px-3.5 py-1.5 rounded-full shadow-sm border border-slate-200 select-none">
          Page {activePair * 2 + 1} - {activePair * 2 + 2} of 8
        </span>
        
        <button
          onClick={nextPage}
          disabled={activePair === 3}
          type="button"
          className={`p-2 rounded-lg border flex items-center justify-center cursor-pointer transition-colors duration-150 ${
            activePair === 3
              ? 'border-slate-200 text-slate-350 bg-slate-55 bg-slate-50 cursor-not-allowed'
              : 'border-slate-300 text-slate-700 bg-white hover:bg-slate-50'
          }`}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
