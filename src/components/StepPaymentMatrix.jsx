import React from 'react';
import { useDeedForm } from '../context/DeedFormContext';
import { useLanguage } from '../context/LanguageContext';
import {
  getDocumentRequirements,
  getAmountFieldLabel,
  INSTRUMENT_FIELD_META,
} from '../constants/documentTypeRequirements';
import { Plus, Trash2, CreditCard, Receipt, Info, Sparkles, FileSignature } from 'lucide-react';

export default function StepPaymentMatrix({ errors = {} }) {
  const { formData, updateField, addListItem, removeListItem } = useDeedForm();
  const { language, t } = useLanguage();
  const locale = language === 'gu' ? 'gu' : 'en';
  const req = getDocumentRequirements(formData.documentType);
  const amountLabel = getAmountFieldLabel(formData.documentType, locale);

  const tr = formData.transaction || {};
  const inst = formData.instrument || {};
  const payments = tr.payments || [];
  const totalSaleAmount = parseFloat(tr.totalSaleAmount) || 0;

  // TDS Calculation (Section 194-IA: 1% TDS if sale value >= 50 Lakhs)
  const tdsActive = req.showTds && totalSaleAmount >= 5000000;
  const tdsAmount = tdsActive ? Math.round(totalSaleAmount * 0.01) : 0;

  // Sum installments
  const totalPaid = payments.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
  const remainingPaid = totalSaleAmount - totalPaid;

  const handleAddPayment = () => {
    addListItem('transaction.payments', {
      mode: 'RTGS',
      bankName: '',
      branchName: '',
      instrumentNo: '',
      chequeNumber: '',
      utrNumber: '',
      transactionNumber: '',
      date: '',
      amount: '',
      remarks: '',
    });
  };

  return (
    <div className="space-y-8 p-6">
      {/* 1. Overall Consideration & TDS */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <CreditCard size={18} className="text-emerald-700" />
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider m-0">
            {t('financialDetails')}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Primary amount — only when consideration/value applies */}
          {req.showConsideration && req.amountLabelKey !== 'none' && !(req.amountLabelKey === 'rent' || req.amountLabelKey === 'licenseFee') && (
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {amountLabel} <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={tr.totalSaleAmount || ''}
              onChange={(e) => updateField('transaction.totalSaleAmount', e.target.value)}
              className={`w-full text-sm px-3.5 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-150 ${
                errors.totalSaleAmount ? 'border-red-300 focus:border-red-500' : 'border-slate-250 focus:border-emerald-600'
              }`}
              placeholder="e.g. 5500000"
            />
            {errors.totalSaleAmount && <p className="text-[10px] text-red-655 mt-1">{errors.totalSaleAmount}</p>}
          </div>
          )}

          {req.showPaymentInstallments && (
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t('primarySettlementMode')}
            </label>
            <select
              value={tr.paymentMode || 'Cheque'}
              onChange={(e) => updateField('transaction.paymentMode', e.target.value)}
              className="w-full text-sm px-3.5 py-2 rounded-lg border border-slate-250 bg-white focus:outline-none focus:border-emerald-600 cursor-pointer"
            >
              <option value="RTGS">RTGS (Real Time Gross Settlement)</option>
              <option value="NEFT">NEFT (National Electronic Funds Transfer)</option>
              <option value="Cheque">Banker's Cheque / Demand Draft</option>
              <option value="Cash">Cash (Subject to IT Limit)</option>
            </select>
          </div>
          )}
        </div>

        {/* Dynamic TDS Banner */}
        {req.showTds && (tdsActive ? (
          <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex gap-3 animate-in fade-in slide-in-from-top duration-250">
            <Sparkles className="text-emerald-700 shrink-0 mt-0.5" size={18} />
            <div className="text-xs text-emerald-800 leading-snug">
              {t('tdsActiveBanner', { amount: tdsAmount.toLocaleString('en-IN') })}
            </div>
          </div>
        ) : (
          totalSaleAmount > 0 && (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex gap-3">
              <Info className="text-slate-500 shrink-0 mt-0.5" size={16} />
              <p className="text-[11px] text-slate-500 leading-snug m-0">
                {t('tdsNotReached')}
              </p>
            </div>
          )
        ))}

        {req.showTds && tdsActive && (
          <div className="space-y-4 p-4 bg-amber-50/50 border border-amber-200 rounded-xl">
            <h4 className="text-xs font-bold text-amber-900 m-0 uppercase">{t('tdsForm26qbTitle')}</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">{t('tdsForm26qbAck')} <span className="text-red-500">*</span></label>
                <input type="text" value={tr.tdsForm26QB || ''} onChange={(e) => updateField('transaction.tdsForm26QB', e.target.value)}
                  className={`w-full text-sm px-3 py-2 rounded-lg border bg-white font-mono ${errors.tdsForm26QB ? 'border-red-300' : 'border-slate-250'}`}
                  placeholder="26QB-202607-XXXXXXX" />
                {errors.tdsForm26QB && <p className="text-[10px] text-red-600 mt-1">{errors.tdsForm26QB}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">{t('tdsChallanNo')} <span className="text-red-500">*</span></label>
                <input type="text" value={tr.tdsChallanNo || ''} onChange={(e) => updateField('transaction.tdsChallanNo', e.target.value)}
                  className={`w-full text-sm px-3 py-2 rounded-lg border bg-white font-mono ${errors.tdsChallanNo ? 'border-red-300' : 'border-slate-250'}`}
                  placeholder="TDS/194IA/XXXX/2026" />
                {errors.tdsChallanNo && <p className="text-[10px] text-red-600 mt-1">{errors.tdsChallanNo}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">{t('tdsPaymentDate')}</label>
                <input type="date" value={tr.tdsPaidDate || ''} onChange={(e) => updateField('transaction.tdsPaidDate', e.target.value)}
                  className="w-full text-sm px-3 py-2 rounded-lg border border-slate-250 bg-white" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Type-specific instrument fields */}
      {(req.instrumentFields || []).length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <FileSignature size={18} className="text-emerald-700" />
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider m-0">
              {t('documentSpecificParticulars')}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {req.instrumentFields.map((field) => {
              const meta = INSTRUMENT_FIELD_META[field];
              if (!meta) return null;
              const label = meta.label?.[locale] || meta.label?.en || field;
              if (meta.type === 'checkbox') {
                return (
                  <label key={field} className="flex items-center gap-2 text-xs font-semibold text-slate-700 md:col-span-2">
                    <input
                      type="checkbox"
                      checked={Boolean(inst[field])}
                      onChange={(e) => updateField(`instrument.${field}`, e.target.checked)}
                      className="rounded border-slate-300"
                    />
                    {label}
                  </label>
                );
              }
              if (meta.type === 'select') {
                return (
                  <div key={field}>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">{label}</label>
                    <select
                      value={inst[field] || ''}
                      onChange={(e) => updateField(`instrument.${field}`, e.target.value)}
                      className="w-full text-sm px-3 py-2 rounded-lg border border-slate-250 bg-white"
                    >
                      {(meta.options || []).map((o) => (
                        <option key={o.value} value={o.value}>{o.label?.[locale] || o.label?.en}</option>
                      ))}
                    </select>
                  </div>
                );
              }
              if (meta.type === 'textarea') {
                return (
                  <div key={field} className="md:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">{label}</label>
                    <textarea
                      rows={3}
                      value={inst[field] || ''}
                      onChange={(e) => updateField(`instrument.${field}`, e.target.value)}
                      placeholder={meta.placeholder?.[locale] || meta.placeholder?.en || ''}
                      className={`w-full text-sm px-3 py-2 rounded-lg border bg-white ${errors[field] ? 'border-red-300' : 'border-slate-250'}`}
                    />
                    {errors[field] && <p className="text-[10px] text-red-600 mt-1">{errors[field]}</p>}
                  </div>
                );
              }
              return (
                <div key={field}>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">{label}</label>
                  <input
                    type={meta.type === 'date' ? 'date' : meta.type === 'number' ? 'number' : 'text'}
                    value={inst[field] || ''}
                    onChange={(e) => updateField(`instrument.${field}`, e.target.value)}
                    placeholder={meta.placeholder?.[locale] || meta.placeholder?.en || ''}
                    className={`w-full text-sm px-3 py-2 rounded-lg border bg-white ${errors[field] ? 'border-red-300' : 'border-slate-250'}`}
                  />
                  {errors[field] && <p className="text-[10px] text-red-600 mt-1">{errors[field]}</p>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Installments Matrix Table */}
      {req.showPaymentInstallments && (
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider m-0">
            {t('paymentInstallmentsMatrix')}
          </h3>
          <button
            onClick={handleAddPayment}
            type="button"
            className="inline-flex items-center gap-1 text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-md border border-emerald-100 transition-colors duration-200 cursor-pointer"
          >
            <Plus size={14} />
            {t('addEntry')}
          </button>
        </div>

        {errors.paymentsSummary && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs font-semibold text-red-800">
            ⚠️ {errors.paymentsSummary}
          </div>
        )}

        {payments.length === 0 ? (
          <p className="text-xs text-slate-400 italic text-center py-4 bg-slate-50 rounded-lg border border-dashed border-slate-200">
            {t('noPaymentEntries')}
          </p>
        ) : (
          <div className="space-y-4">
            {payments.map((payment, idx) => {
              const pathPrefix = `transaction.payments.${idx}`;
              const itemErrors = errors.payments?.[idx] || {};

              return (
                <div key={idx} className="relative p-4 bg-white border border-slate-200 rounded-xl shadow-sm space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{t('installment')} #{idx + 1}</span>
                    <button
                      onClick={() => removeListItem('transaction.payments', idx)}
                      type="button"
                      className="text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                    {/* Payment Mode */}
                    <div className="md:col-span-3">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">{t('mode')}</label>
                      <select
                        value={payment.mode || 'RTGS'}
                        onChange={(e) => updateField(`${pathPrefix}.mode`, e.target.value)}
                        className="w-full text-xs px-2.5 py-1.5 rounded border border-slate-250 bg-white cursor-pointer focus:outline-none focus:border-emerald-600"
                      >
                        <option value="RTGS">RTGS</option>
                        <option value="NEFT">NEFT</option>
                        <option value="IMPS">IMPS</option>
                        <option value="UPI">UPI</option>
                        <option value="Cheque">Cheque</option>
                        <option value="DD">Demand Draft</option>
                        <option value="Cash">Cash</option>
                        <option value="Loan">Loan</option>
                        <option value="IMPS">IMPS</option>
                        <option value="Cash">Cash</option>
                      </select>
                    </div>

                    {/* Bank Name */}
                    <div className="md:col-span-3">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">{t('bankName')}</label>
                      <input
                        type="text"
                        value={payment.bankName || ''}
                        onChange={(e) => updateField(`${pathPrefix}.bankName`, e.target.value)}
                        className={`w-full text-xs px-2.5 py-1.5 rounded border focus:outline-none focus:border-emerald-650 bg-white ${
                          itemErrors.bankName ? 'border-red-300' : 'border-slate-250'
                        }`}
                        placeholder="e.g. SBI Bank"
                      />
                    </div>

                    {/* Branch Name */}
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">{t('branch')}</label>
                      <input
                        type="text"
                        value={payment.branchName || ''}
                        onChange={(e) => updateField(`${pathPrefix}.branchName`, e.target.value)}
                        className="w-full text-xs px-2.5 py-1.5 rounded border border-slate-250 focus:outline-none focus:border-emerald-650 bg-white"
                        placeholder="Branch"
                      />
                    </div>

                    {/* UTR / Instrument */}
                    <div className="md:col-span-4">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">{t('utrInstrumentNo')}</label>
                      <input
                        type="text"
                        value={payment.instrumentNo || ''}
                        onChange={(e) => updateField(`${pathPrefix}.instrumentNo`, e.target.value)}
                        className={`w-full text-xs px-2.5 py-1.5 rounded border focus:outline-none focus:border-emerald-650 bg-white ${
                          itemErrors.instrumentNo ? 'border-red-300' : 'border-slate-250'
                        }`}
                        placeholder="Instrument UTR/No."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Date */}
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">{t('transactionDate')}</label>
                      <input
                        type="date"
                        value={payment.date || ''}
                        onChange={(e) => updateField(`${pathPrefix}.date`, e.target.value)}
                        className={`w-full text-xs px-2.5 py-1.5 rounded border focus:outline-none focus:border-emerald-650 bg-white ${
                          itemErrors.date ? 'border-red-300' : 'border-slate-250'
                        }`}
                      />
                    </div>

                    {/* Amount */}
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">{t('amountInr')}</label>
                      <input
                        type="number"
                        value={payment.amount || ''}
                        onChange={(e) => updateField(`${pathPrefix}.amount`, e.target.value)}
                        className={`w-full text-xs px-2.5 py-1.5 rounded border focus:outline-none focus:border-emerald-650 bg-white ${
                          itemErrors.amount ? 'border-red-300' : 'border-slate-250'
                        }`}
                        placeholder="Amount in INR"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Ledger Balance Summary Cards */}
        {totalSaleAmount > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 sm:p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
            <div className="space-y-0.5">
              <div className="text-[9px] font-bold text-slate-400 uppercase">{t('totalTargetValue')}</div>
              <div className="text-sm font-bold text-slate-800">₹{totalSaleAmount.toLocaleString('en-IN')}</div>
            </div>
            <div className="space-y-0.5">
              <div className="text-[9px] font-bold text-slate-400 uppercase">{t('sumOfInstallments')}</div>
              <div className={`text-sm font-bold ${remainingPaid === 0 ? 'text-emerald-700' : 'text-slate-805'}`}>
                ₹{totalPaid.toLocaleString('en-IN')}
              </div>
            </div>
            <div className="space-y-0.5">
              <div className="text-[9px] font-bold text-slate-400 uppercase">{t('balanceStatus')}</div>
              {remainingPaid === 0 ? (
                <div className="text-xs font-semibold text-emerald-800 bg-emerald-100 rounded px-1.5 py-0.5 inline-block">{t('matched')}</div>
              ) : remainingPaid > 0 ? (
                <div className="text-xs font-semibold text-amber-800 bg-amber-100 rounded px-1.5 py-0.5 inline-block">
                  {t('remaining')}: ₹{remainingPaid.toLocaleString('en-IN')}
                </div>
              ) : (
                <div className="text-xs font-semibold text-red-800 bg-red-100 rounded px-1.5 py-0.5 inline-block">
                  {t('overpaid')}: ₹{Math.abs(remainingPaid).toLocaleString('en-IN')}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      )}

      {/* 3. Stamp Duty & Registration Fees E-Payments */}
      {(req.showStampDuty || req.showRegistrationFee) && (
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Receipt size={18} className="text-emerald-700" />
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider m-0">
            {t('stampDutyRegReceipts')}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50/50 p-4 rounded-xl border border-slate-200">
          {/* Stamp Duty Receipt */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t('stampDutyReceiptGras')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={tr.stampDutyReceiptNo || ''}
              onChange={(e) => updateField('transaction.stampDutyReceiptNo', e.target.value)}
              className={`w-full text-sm px-3.5 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-150 ${
                errors.stampDutyReceiptNo ? 'border-red-300 focus:border-red-500' : 'border-slate-250 focus:border-emerald-600'
              }`}
              placeholder="e.g. GRAS-SD-984620183"
            />
            {errors.stampDutyReceiptNo && <p className="text-[10px] text-red-655 mt-1">{errors.stampDutyReceiptNo}</p>}
          </div>

          {/* Stamp Duty Amount */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t('stampDutyPaid')} <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={tr.stampDutyAmount || ''}
              onChange={(e) => updateField('transaction.stampDutyAmount', e.target.value)}
              className={`w-full text-sm px-3.5 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-150 ${
                errors.stampDutyAmount ? 'border-red-300 focus:border-red-500' : 'border-slate-250 focus:border-emerald-600'
              }`}
              placeholder="e.g. 269500"
            />
            {errors.stampDutyAmount && <p className="text-[10px] text-red-655 mt-1">{errors.stampDutyAmount}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50/50 p-4 rounded-xl border border-slate-200">
          {/* Reg Fee Receipt */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t('regFeeReceiptGras')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={tr.registrationFeeReceiptNo || ''}
              onChange={(e) => updateField('transaction.registrationFeeReceiptNo', e.target.value)}
              className={`w-full text-sm px-3.5 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-150 ${
                errors.registrationFeeReceiptNo ? 'border-red-300 focus:border-red-500' : 'border-slate-250 focus:border-emerald-600'
              }`}
              placeholder="e.g. GRAS-RF-481920384"
            />
            {errors.registrationFeeReceiptNo && <p className="text-[10px] text-red-655 mt-1">{errors.registrationFeeReceiptNo}</p>}
          </div>

          {/* Reg Fee Amount */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t('regFeePaid')} <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={tr.registrationFeeAmount || ''}
              onChange={(e) => updateField('transaction.registrationFeeAmount', e.target.value)}
              className={`w-full text-sm px-3.5 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-150 ${
                errors.registrationFeeAmount ? 'border-red-300 focus:border-red-500' : 'border-slate-250 focus:border-emerald-600'
              }`}
              placeholder="e.g. 55000"
            />
            {errors.registrationFeeAmount && <p className="text-[10px] text-red-655 mt-1">{errors.registrationFeeAmount}</p>}
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
