import React from 'react';
import { useDeedForm } from '../context/DeedFormContext';
import { useLanguage } from '../context/LanguageContext';
import { numberToWords } from '../utils/numberToWords';
import { Plus, Trash2, CreditCard, Banknote, Landmark } from 'lucide-react';

export default function StepTransaction({ errors = {} }) {
  const { formData, updateField, addListItem, removeListItem } = useDeedForm();
  const { t } = useLanguage();

  const tr = formData.transaction || {};
  const payments = tr.payments || [];
  const listErrors = errors.payments || [];

  const handleAddPayment = () => {
    addListItem('transaction.payments', { mode: "Cheque", bankName: "", instrumentNo: "", date: "", amount: "" });
  };

  const spelledOutEn = numberToWords(tr.totalSaleAmount, 'en');
  const spelledOutGu = numberToWords(tr.totalSaleAmount, 'gu');

  // Sum of payments entered
  const totalPaymentsAmount = payments.reduce((acc, curr) => acc + (parseFloat(curr.amount) || 0), 0);
  const totalConsideration = parseFloat(tr.totalSaleAmount) || 0;
  const paymentDiff = totalConsideration - totalPaymentsAmount;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
        <CreditCard className="text-emerald-700 font-bold" size={18} />
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider m-0">
          {t('transactionTitle')}
        </h3>
      </div>

      {/* Sale Amount & spelled out words */}
      <div className="bg-slate-50 p-5 rounded-xl border border-slate-150 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t('totalSaleAmount')} <span className="text-red-500">*</span>
            </label>
            <div className="relative rounded-lg shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-slate-500 text-sm font-semibold">₹</span>
              </div>
              <input
                type="number"
                value={tr.totalSaleAmount || ''}
                onChange={(e) => updateField('transaction.totalSaleAmount', e.target.value)}
                className={`w-full text-sm pl-7 pr-3 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-150 ${
                  errors.totalSaleAmount ? 'border-red-300 focus:border-red-500' : 'border-slate-250 focus:border-emerald-600'
                }`}
                placeholder="e.g. 4500000"
              />
            </div>
            {errors.totalSaleAmount && <p className="text-[10px] text-red-600 mt-1">{errors.totalSaleAmount}</p>}
          </div>

          {/* Auto Spelled Output (English) */}
          <div className="md:col-span-2 space-y-2">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Spelled in English:</span>
              <div className="text-xs font-semibold text-emerald-800 bg-white border border-slate-200 px-3.5 py-2.5 rounded-lg min-h-[38px] flex items-center">
                {spelledOutEn || <span className="text-slate-300 italic">Enter amount to generate words</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Auto Spelled Output (Gujarati) */}
        {spelledOutGu && (
          <div className="mt-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">ગુજરાતીમાં અક્ષરે રકમ:</span>
            <div className="text-xs font-semibold text-emerald-800 bg-white border border-slate-200 px-3.5 py-2.5 rounded-lg min-h-[38px] flex items-center mt-1">
              {spelledOutGu}
            </div>
          </div>
        )}
      </div>

      {/* Payment Details Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide m-0 flex items-center gap-1.5">
            <Banknote size={14} className="text-emerald-700" />
            {t('paymentTableTitle')}
          </h4>
          <button
            onClick={handleAddPayment}
            type="button"
            className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 px-2.5 py-1.5 rounded-md border border-emerald-100 transition-colors duration-200 cursor-pointer"
          >
            <Plus size={12} />
            {t('addPayment')}
          </button>
        </div>

        {payments.length === 0 && (
          <p className="text-xs text-slate-400 italic text-center py-4 bg-slate-50 rounded-lg border border-dashed border-slate-200">
            No payments entered. Click button to add cheque/online transfer receipts.
          </p>
        )}

        {payments.map((item, index) => {
          const itemErrors = listErrors[index] || {};
          const pathPrefix = `transaction.payments.${index}`;

          return (
            <div key={index} className="relative p-4 bg-slate-50/50 rounded-lg border border-slate-150 grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
              <button
                onClick={() => removeListItem('transaction.payments', index)}
                type="button"
                className="absolute top-2 right-2 text-slate-400 hover:text-red-600 transition-colors duration-150 cursor-pointer"
                title="Remove Entry"
              >
                <Trash2 size={14} />
              </button>

              {/* Mode */}
              <div className="md:col-span-2">
                <label className="block text-[10px] font-bold text-slate-600 mb-1">{t('paymentModeCol')}</label>
                <select
                  value={item.mode || 'Cheque'}
                  onChange={(e) => updateField(`${pathPrefix}.mode`, e.target.value)}
                  className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-250 bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="Cheque">Cheque</option>
                  <option value="NEFT">NEFT</option>
                  <option value="RTGS">RTGS</option>
                  <option value="IMPS">IMPS</option>
                  <option value="Demand Draft">Demand Draft</option>
                  <option value="Bankers Cheque">Bankers Cheque</option>
                </select>
              </div>

              {/* Bank Name */}
              <div className="md:col-span-3">
                <label className="block text-[10px] font-bold text-slate-600 mb-1">{t('bankNameCol')}</label>
                <input
                  type="text"
                  value={item.bankName || ''}
                  onChange={(e) => updateField(`${pathPrefix}.bankName`, e.target.value)}
                  placeholder="e.g. State Bank of India"
                  className={`w-full text-xs px-2.5 py-1.5 rounded-lg border bg-white focus:outline-none ${
                    itemErrors.bankName ? 'border-red-300' : 'border-slate-250'
                  }`}
                />
              </div>

              {/* Instrument No */}
              <div className="md:col-span-3">
                <label className="block text-[10px] font-bold text-slate-600 mb-1">{t('instrumentNoCol')}</label>
                <input
                  type="text"
                  value={item.instrumentNo || ''}
                  onChange={(e) => updateField(`${pathPrefix}.instrumentNo`, e.target.value)}
                  placeholder="UTR or Cheque No"
                  className={`w-full text-xs px-2.5 py-1.5 rounded-lg border bg-white focus:outline-none ${
                    itemErrors.instrumentNo ? 'border-red-300' : 'border-slate-250'
                  }`}
                />
              </div>

              {/* Date */}
              <div className="md:col-span-2">
                <label className="block text-[10px] font-bold text-slate-600 mb-1">{t('paymentDateCol')}</label>
                <input
                  type="date"
                  value={item.date || ''}
                  onChange={(e) => updateField(`${pathPrefix}.date`, e.target.value)}
                  className={`w-full text-xs px-2.5 py-1.5 rounded-lg border bg-white focus:outline-none ${
                    itemErrors.date ? 'border-red-300' : 'border-slate-250'
                  }`}
                />
              </div>

              {/* Amount */}
              <div className="md:col-span-2">
                <label className="block text-[10px] font-bold text-slate-600 mb-1">{t('amountCol')}</label>
                <input
                  type="number"
                  value={item.amount || ''}
                  onChange={(e) => updateField(`${pathPrefix}.amount`, e.target.value)}
                  placeholder="Amount"
                  className={`w-full text-xs px-2.5 py-1.5 rounded-lg border bg-white focus:outline-none ${
                    itemErrors.amount ? 'border-red-300' : 'border-slate-250'
                  }`}
                />
              </div>
            </div>
          );
        })}

        {/* Sum Alert Checklist */}
        {payments.length > 0 && totalConsideration > 0 && (
          <div className="flex justify-between items-center px-4 py-2.5 rounded-lg text-xs font-semibold bg-slate-100 border border-slate-200">
            <div>
              Total Entered: <span className="text-slate-800">₹{totalPaymentsAmount.toLocaleString('en-IN')}</span>
            </div>
            {paymentDiff === 0 ? (
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">Match Perfect</span>
            ) : paymentDiff > 0 ? (
              <span className="text-amber-700">Remaining: ₹{paymentDiff.toLocaleString('en-IN')}</span>
            ) : (
              <span className="text-red-700">Excess: ₹{Math.abs(paymentDiff).toLocaleString('en-IN')}</span>
            )}
          </div>
        )}
      </div>

      {/* Stamp Duty Receipts */}
      <div className="bg-slate-50 p-5 rounded-xl border border-slate-150 space-y-4">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide m-0 flex items-center gap-1.5">
          <Landmark size={14} className="text-emerald-700" />
          {t('stampDutyTitle')}
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Stamp Duty Receipt */}
          <div className="md:col-span-6">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t('stampDutyReceipt')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={tr.stampDutyReceiptNo || ''}
              onChange={(e) => updateField('transaction.stampDutyReceiptNo', e.target.value)}
              className={`w-full text-sm px-3.5 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-150 ${
                errors.stampDutyReceiptNo ? 'border-red-300 focus:border-red-500' : 'border-slate-250 focus:border-emerald-600'
              }`}
              placeholder="e.g. GRAS-SD-9846201"
            />
            {errors.stampDutyReceiptNo && <p className="text-[10px] text-red-600 mt-1">{errors.stampDutyReceiptNo}</p>}
          </div>

          {/* Stamp Duty Amount */}
          <div className="md:col-span-6">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t('stampDutyAmt')} <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={tr.stampDutyAmount || ''}
              onChange={(e) => updateField('transaction.stampDutyAmount', e.target.value)}
              className={`w-full text-sm px-3.5 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-150 ${
                errors.stampDutyAmount ? 'border-red-300 focus:border-red-500' : 'border-slate-250 focus:border-emerald-600'
              }`}
              placeholder="e.g. 220500"
            />
            {errors.stampDutyAmount && <p className="text-[10px] text-red-600 mt-1">{errors.stampDutyAmount}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Registration Fee Receipt */}
          <div className="md:col-span-6">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t('regFeeReceipt')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={tr.registrationFeeReceiptNo || ''}
              onChange={(e) => updateField('transaction.registrationFeeReceiptNo', e.target.value)}
              className={`w-full text-sm px-3.5 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-150 ${
                errors.registrationFeeReceiptNo ? 'border-red-300 focus:border-red-500' : 'border-slate-250 focus:border-emerald-600'
              }`}
              placeholder="e.g. GRAS-RF-4819203"
            />
            {errors.registrationFeeReceiptNo && <p className="text-[10px] text-red-600 mt-1">{errors.registrationFeeReceiptNo}</p>}
          </div>

          {/* Registration Fee Amount */}
          <div className="md:col-span-6">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t('regFeeAmt')} <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={tr.registrationFeeAmount || ''}
              onChange={(e) => updateField('transaction.registrationFeeAmount', e.target.value)}
              className={`w-full text-sm px-3.5 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-150 ${
                errors.registrationFeeAmount ? 'border-red-300 focus:border-red-500' : 'border-slate-250 focus:border-emerald-600'
              }`}
              placeholder="e.g. 45000"
            />
            {errors.registrationFeeAmount && <p className="text-[10px] text-red-600 mt-1">{errors.registrationFeeAmount}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
