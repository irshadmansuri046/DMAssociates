import React, { useState } from 'react';
import { Lock, Mail, AlertCircle, FileText, Globe } from 'lucide-react';
import { loginWithEmailPassword, saveSession } from '../services/authService';
import { useLanguage } from '../context/LanguageContext';

export default function Login({ onLoginSuccess }) {
  const { language, setLanguage, t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const user = await loginWithEmailPassword(email, password);
      saveSession(user);
      onLoginSuccess(user);
    } catch (err) {
      setError(err.message || t('invalidCredentials'));
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-900/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-amber-950/20 blur-[120px] pointer-events-none" />

      <button
        type="button"
        onClick={() => setLanguage(language === 'en' ? 'gu' : 'en')}
        className="absolute top-4 right-4 z-20 inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 cursor-pointer"
        aria-label={t('toggleLanguageAria')}
      >
        <Globe size={14} />
        {t('toggleLanguage')}
      </button>

      <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl relative z-10 animate-in fade-in zoom-in-95 duration-500">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-gradient-to-tr from-amber-500 to-emerald-600 p-4 rounded-2xl text-emerald-950 shadow-lg shadow-emerald-500/10 mb-4 animate-bounce duration-1000">
            <FileText size={32} className="stroke-[2.5] text-white" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">DM Associates</h2>
          <p className="text-xs text-slate-400 mt-1">{t('legalDocGeneratorGujarat')}</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-950/40 border border-red-800/60 rounded-xl flex items-start gap-3 text-red-200 text-xs animate-in shake duration-300">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">{t('authFailed')}:</span> {error}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 block" htmlFor="email-input">
              {t('emailAddress')}
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                <Mail size={16} />
              </span>
              <input
                id="email-input"
                type="email"
                required
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-900/50 rounded-xl text-sm text-white placeholder-slate-600 transition-all duration-200 focus:outline-none"
                placeholder="name@domain.com"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 block" htmlFor="password-input">
              {t('secretPassword')}
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                <Lock size={16} />
              </span>
              <input
                id="password-input"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-900/50 rounded-xl text-sm text-white placeholder-slate-600 transition-all duration-200 focus:outline-none"
                placeholder="••••••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold py-3 rounded-xl shadow-lg shadow-emerald-600/20 hover:shadow-emerald-500/30 transition-all duration-300 transform active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none text-sm cursor-pointer mt-2"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {t('verifyingAccess')}
              </span>
            ) : (
              t('unlockApp')
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
