import React, { useState, useEffect, useMemo } from 'react';
import { useDeedForm } from '../context/DeedFormContext';
import { useLanguage } from '../context/LanguageContext';
import { validateStep } from '../utils/validation';
import { generatePlatformPDF } from '../generators/pdf-generator';
import { ValidationEngine } from '../validators/ValidationEngine';
import { formDataToDocument } from '../models/adapters';
import { generateDocumentQrDataUrl } from '../services/QrService';
import { DocumentRepository } from '../repositories/DocumentRepository';
import { SOFTWARE_VERSION, APP_NAME, PDF_DOWNLOAD_PRICE_INR } from '../constants/version';
import { getDocumentRequirements, getWizardStepsForType } from '../constants/documentTypeRequirements';
import { getDocumentTypeLabel } from '../constants/documentTypes';
import { getSessionUser } from '../services/authService';
import { generateTaxInvoicePdf } from '../generators/invoice-generator';
import { createInvoiceNumber, formatInr, splitInclusiveGst } from '../utils/gst';
import StepPartyDetails from './StepPartyDetails';
import StepPropertySpecs from './StepPropertySpecs';
import StepPaymentMatrix from './StepPaymentMatrix';
import StepComplianceChecklist from './StepComplianceChecklist';
import StepGovRecords from './StepGovRecords';
import DocumentConfigBar from './DocumentConfigBar';
import DocumentTemplate from './DocumentTemplate';
import { ChevronLeft, ChevronRight, CheckCircle, AlertTriangle, Loader2, FileText, Receipt } from 'lucide-react';

export default function WizardForm() {
  const { step, setStep, formData } = useDeedForm();
  const { t, language } = useLanguage();
  const [validationErrors, setValidationErrors] = useState({});
  const [showErrorBanner, setShowErrorBanner] = useState(false);
  const [engineErrors, setEngineErrors] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadError, setDownloadError] = useState(null);
  const [qrDataUrl, setQrDataUrl] = useState('');

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [paymentStep, setPaymentStep] = useState('checkout');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [mockUpiId, setMockUpiId] = useState('gras.user@oksbi');
  const [mockCardNo, setMockCardNo] = useState('4111 2222 3333 4444');
  const [unlockPayment, setUnlockPayment] = useState(null);
  const [isInvoiceGenerating, setIsInvoiceGenerating] = useState(false);
  const sessionUser = getSessionUser();
  const gstBreakup = splitInclusiveGst(PDF_DOWNLOAD_PRICE_INR);

  const req = getDocumentRequirements(formData.documentType);
  const wizardSteps = useMemo(
    () => getWizardStepsForType(formData.documentType, language === 'gu' ? 'gu' : 'en'),
    [formData.documentType, language]
  );
  const stepKeys = wizardSteps.map((s) => s.key);

  useEffect(() => {
    setPaymentStep('checkout');
    setDownloadError(null);
    setUnlockPayment(null);
  }, [formData.transaction?.totalSaleAmount, formData.parties?.sellers?.length, formData.documentType]);

  const buildUnlockPayment = () => {
    const paidAt = new Date().toISOString();
    const digits = String(mockCardNo || '').replace(/\D/g, '');
    const cardLast4 = digits.slice(-4) || null;
    const gst = splitInclusiveGst(PDF_DOWNLOAD_PRICE_INR);
    return {
      amount: PDF_DOWNLOAD_PRICE_INR,
      currency: 'INR',
      method: paymentMethod === 'card' ? 'card' : 'upi',
      status: 'success',
      paidAt,
      isDemo: true,
      invoiceNo: createInvoiceNumber(new Date(paidAt)),
      gstInclusive: true,
      taxableValue: gst.taxableValue,
      gstAmount: gst.gstAmount,
      cgst: gst.cgst,
      sgst: gst.sgst,
      gstRatePercent: gst.ratePercent,
      upiId: paymentMethod === 'upi' ? mockUpiId : null,
      payerRef: paymentMethod === 'upi' ? mockUpiId : cardLast4 ? `card_****${cardLast4}` : null,
      cardLast4: paymentMethod === 'card' ? cardLast4 : null,
    };
  };

  const runInvoiceDownload = async () => {
    setIsInvoiceGenerating(true);
    setDownloadError(null);
    try {
      const payment = unlockPayment || buildUnlockPayment();
      if (!unlockPayment) setUnlockPayment(payment);
      await generateTaxInvoicePdf({
        user: sessionUser || getSessionUser(),
        payment,
        documentTypeLabel: getDocumentTypeLabel(formData.documentType || 'sale_deed', 'en'),
        amountInclusive: PDF_DOWNLOAD_PRICE_INR,
      });
    } catch (err) {
      console.error(err);
      setDownloadError(err.message || 'Invoice download failed');
    } finally {
      setIsInvoiceGenerating(false);
    }
  };

  // Clamp step when document type changes and financial step disappears
  useEffect(() => {
    if (step >= wizardSteps.length) {
      setStep(Math.max(0, wizardSteps.length - 1));
    }
  }, [wizardSteps.length, step, setStep]);

  const stepsList = wizardSteps.map((s, index) => ({
    id: index,
    key: s.key,
    label: s.label,
    desc: s.desc,
  }));

  const handleNext = async () => {
    const errors = validateStep(step, formData, stepKeys);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setShowErrorBanner(true);
      document.getElementById('form-scroll-top')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    setValidationErrors({});
    setShowErrorBanner(false);

    if (step < stepsList.length - 1) {
      setStep(step + 1);
      return;
    }

    const doc = formDataToDocument(formData);
    const result = ValidationEngine.validate(doc);
    if (!result.ok) {
      setEngineErrors(result.messages);
      setShowErrorBanner(true);
      document.getElementById('form-scroll-top')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    setEngineErrors([]);
    setIsReviewModalOpen(true);
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
      setValidationErrors({});
      setShowErrorBanner(false);
      setEngineErrors([]);
    }
  };

  const runPdfGeneration = async () => {
    setIsGenerating(true);
    setDownloadError(null);
    try {
      const payment = unlockPayment || buildUnlockPayment();
      const doc = formDataToDocument(formData, {
        version: SOFTWARE_VERSION,
        generatedAt: new Date().toISOString(),
      });

      // Persist filled form + unlock payment to Supabase (no PDF file stored)
      await DocumentRepository.saveOnPaidPdfGeneration(doc, payment);

      const qr = await generateDocumentQrDataUrl(doc);
      setQrDataUrl(qr);
      // Allow React to paint printable DOM (incl. uploaded photo <img> tags)
      await new Promise((r) => setTimeout(r, 500));
      await generatePlatformPDF({
        elementId: 'pdf-document-render',
        villageName: formData.property?.village || 'Draft',
        document: doc,
      });
    } catch (err) {
      console.error(err);
      setDownloadError(err.message || 'PDF generation failed');
    } finally {
      setIsGenerating(false);
    }
  };

  const renderActiveStep = () => {
    const key = stepKeys[step] || 'parties';
    if (key === 'parties') return <StepPartyDetails errors={validationErrors} />;
    if (key === 'property') {
      return (
        <>
          <StepPropertySpecs errors={validationErrors} />
          {req.showGovRecords && <StepGovRecords />}
        </>
      );
    }
    if (key === 'financial') return <StepPaymentMatrix errors={validationErrors} />;
    if (key === 'compliance') return <StepComplianceChecklist errors={validationErrors} />;
    return <StepPartyDetails errors={validationErrors} />;
  };

  return (
    <div className="max-w-5xl mx-auto px-3 py-4 sm:px-6 sm:py-8 lg:px-8 pb-[max(1rem,env(safe-area-inset-bottom))]">
      <DocumentConfigBar />

      <nav className="mb-4 sm:mb-8 no-print" aria-label="Progress">
        <ol role="list" className="flex flex-col gap-1 md:flex-row md:gap-0 md:space-x-4 bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-slate-200">
          {stepsList.map((s, index) => {
            const isCompleted = step > s.id;
            const isActive = step === s.id;
            return (
              <li key={s.id} className="flex-1 min-w-0">
                <div
                  className={`group flex flex-col border-l-4 md:border-l-0 md:border-t-4 py-2 pl-3 md:pl-0 md:pt-4 md:pb-0 ${
                    isActive || isCompleted ? 'border-emerald-600' : 'border-slate-200'
                  }`}
                >
                  <span className="text-[10px] sm:text-xs font-semibold tracking-wide uppercase">
                    {isCompleted ? (
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <CheckCircle size={14} /> {t('step')} {index + 1}
                      </span>
                    ) : isActive ? (
                      <span className="text-amber-600 font-bold">
                        {t('step')} {index + 1}
                      </span>
                    ) : (
                      <span className="text-slate-400">
                        {t('step')} {index + 1}
                      </span>
                    )}
                  </span>
                  <span className={`text-xs sm:text-sm font-medium truncate ${isActive ? 'text-slate-900' : 'text-slate-500'}`}>
                    {s.label}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>
      </nav>

      <div id="form-scroll-top" className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col min-h-0 sm:min-h-[480px] no-print">
        <div className="px-4 py-4 sm:px-6 sm:py-5 border-b border-slate-100 bg-slate-50/50 flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
          <div className="min-w-0">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 m-0">{stepsList[step]?.label}</h2>
            <p className="text-xs text-slate-500 m-0 mt-0.5 leading-snug">{stepsList[step]?.desc}</p>
          </div>
          <span className="self-start sm:self-auto bg-emerald-50 text-emerald-800 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-100 shrink-0">
            {step + 1} / {stepsList.length} · v{SOFTWARE_VERSION}
          </span>
        </div>

        {showErrorBanner && (
          <div className="mx-3 sm:mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2.5">
            <AlertTriangle className="text-red-500 shrink-0 mt-0.5" size={16} />
            <div className="text-xs font-medium text-red-800 leading-tight space-y-1 min-w-0">
              <div>Please correct validation errors before proceeding.</div>
              {engineErrors.length > 0 && (
                <ul className="list-disc pl-4 m-0 break-words">
                  {engineErrors.map((msg) => (
                    <li key={msg}>{msg}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        <div className="p-4 sm:p-6 flex-grow overflow-x-hidden">{renderActiveStep()}</div>

        <div className="px-3 py-3 sm:px-6 sm:py-4 bg-slate-50 border-t border-slate-100 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between sticky bottom-0 sm:static safe-bottom">
          <button
            onClick={handleBack}
            disabled={step === 0}
            type="button"
            className={`flex items-center justify-center gap-1 text-sm font-semibold px-4 py-3 sm:py-2.5 rounded-lg border cursor-pointer w-full sm:w-auto min-h-[44px] ${
              step === 0 ? 'border-slate-200 text-slate-300 cursor-not-allowed' : 'border-slate-300 text-slate-700 bg-white'
            }`}
          >
            <ChevronLeft size={16} />
            {t('back')}
          </button>
          <button
            onClick={handleNext}
            disabled={isGenerating}
            type="button"
            className="flex items-center justify-center gap-1.5 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 px-4 py-3 sm:px-5 sm:py-2.5 rounded-lg cursor-pointer disabled:opacity-75 w-full sm:w-auto min-h-[44px]"
          >
            <span className="text-center leading-tight">
              {step === stepsList.length - 1 ? 'Validate & Build' : t('next')}
            </span>
            {step < stepsList.length - 1 && <ChevronRight size={16} className="shrink-0" />}
          </button>
        </div>
      </div>

      {/* Off-screen printable DOM — keep opacity:1 so html2canvas captures uploaded photos */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: '-10000px',
          width: '794px',
          zIndex: -50,
          opacity: 1,
          visibility: 'visible',
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
        className="no-print"
        aria-hidden
      >
        <div id="printable-deed-area" style={{ width: '794px', backgroundColor: '#ffffff', boxSizing: 'border-box' }}>
          <DocumentTemplate data={formData} qrDataUrl={qrDataUrl} containerId="pdf-document-render" />
        </div>
      </div>

      {isReviewModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4 no-print">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl max-w-md w-full max-h-[92vh] overflow-y-auto border border-slate-100">
            <div className="px-4 py-4 sm:px-6 bg-emerald-900 text-white flex justify-between items-center sticky top-0 z-10">
              <div>
                <h3 className="text-base font-bold m-0 text-white">Download Legal Document</h3>
                <p className="text-[10px] text-emerald-200 m-0">
                  {APP_NAME} · v{SOFTWARE_VERSION}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsReviewModalOpen(false);
                  setPaymentStep('checkout');
                  setUnlockPayment(null);
                }}
                className="text-white bg-transparent border-0 cursor-pointer text-lg font-bold"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4 bg-slate-50">
              <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Service Charge</div>
                <div className="text-3xl font-black text-emerald-950">₹{PDF_DOWNLOAD_PRICE_INR}.00</div>
                <p className="text-[10px] text-slate-500 m-0 mt-1">
                  Inclusive of GST ({gstBreakup.ratePercent}%) · Taxable {formatInr(gstBreakup.taxableValue)} + GST{' '}
                  {formatInr(gstBreakup.gstAmount)}
                </p>
              </div>

              {paymentStep === 'checkout' && (
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('upi')}
                      className={`flex-1 py-2 rounded-lg border text-xs font-bold cursor-pointer ${
                        paymentMethod === 'upi' ? 'bg-emerald-800 text-white' : 'bg-white'
                      }`}
                    >
                      UPI
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`flex-1 py-2 rounded-lg border text-xs font-bold cursor-pointer ${
                        paymentMethod === 'card' ? 'bg-emerald-800 text-white' : 'bg-white'
                      }`}
                    >
                      Card
                    </button>
                  </div>
                  <input
                    type="text"
                    value={paymentMethod === 'upi' ? mockUpiId : mockCardNo}
                    onChange={(e) => (paymentMethod === 'upi' ? setMockUpiId(e.target.value) : setMockCardNo(e.target.value))}
                    className="w-full text-xs font-mono px-3 py-2 rounded-lg border bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const payment = buildUnlockPayment();
                      setUnlockPayment(payment);
                      setPaymentStep('processing');
                      setTimeout(() => setPaymentStep('success'), 1000);
                    }}
                    className="w-full py-2.5 rounded-lg bg-emerald-700 text-white text-sm font-bold cursor-pointer border-0"
                  >
                    Pay ₹{PDF_DOWNLOAD_PRICE_INR} (Demo)
                  </button>
                </div>
              )}

              {paymentStep === 'processing' && (
                <div className="text-center py-8">
                  <Loader2 className="animate-spin mx-auto text-emerald-700" />
                  <p className="text-xs text-slate-500 mt-2">Processing…</p>
                </div>
              )}

              {paymentStep === 'success' && (
                <div className="space-y-3 text-center">
                  <CheckCircle className="mx-auto text-emerald-600" size={36} />
                  <p className="text-sm font-semibold m-0">Payment successful</p>
                  {unlockPayment?.invoiceNo && (
                    <p className="text-[10px] text-slate-500 m-0">Invoice {unlockPayment.invoiceNo}</p>
                  )}
                  {downloadError && <p className="text-xs text-red-600">{downloadError}</p>}
                  <button
                    type="button"
                    disabled={isGenerating || isInvoiceGenerating}
                    onClick={runPdfGeneration}
                    className="w-full py-2.5 rounded-lg bg-emerald-700 text-white text-sm font-bold cursor-pointer border-0 disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 size={16} className="animate-spin" /> Generating…
                      </>
                    ) : (
                      <>
                        <FileText size={16} /> Download PDF
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    disabled={isGenerating || isInvoiceGenerating}
                    onClick={runInvoiceDownload}
                    className="w-full py-2.5 rounded-lg bg-white text-emerald-900 border border-emerald-700 text-sm font-bold cursor-pointer disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {isInvoiceGenerating ? (
                      <>
                        <Loader2 size={16} className="animate-spin" /> Preparing invoice…
                      </>
                    ) : (
                      <>
                        <Receipt size={16} /> Download Invoice
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
