import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useDeedForm } from '../context/DeedFormContext';
import { SOFTWARE_VERSION, APP_NAME } from '../constants/version';
import { RotateCcw, FileText, Globe, Save, LogOut, Menu, X } from 'lucide-react';

export default function Navbar({ onLogout, sessionUser = null }) {
  const { language, setLanguage, t } = useLanguage();
  const { resetForm, loadMockData, isSaved } = useDeedForm();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLanguageToggle = () => {
    setLanguage(language === 'en' ? 'gu' : 'en');
  };

  const closeMenu = () => setMenuOpen(false);

  const actionBtn =
    'inline-flex items-center justify-center gap-1.5 text-xs font-semibold px-3 py-2.5 rounded-md transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-emerald-900 min-h-[40px]';

  return (
    <header className="bg-emerald-900 text-white shadow-md no-print sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-2 min-h-14 py-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <div className="bg-amber-500 p-1.5 sm:p-2 rounded-lg text-emerald-950 flex items-center justify-center shrink-0">
              <FileText size={20} className="stroke-[2.5] sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <h1 className="text-sm sm:text-lg font-bold tracking-tight m-0 text-white flex items-center gap-1.5 flex-wrap">
                <span className="truncate">{APP_NAME}</span>
                <span className="text-[9px] sm:text-[10px] font-semibold bg-emerald-800 px-1.5 py-0.5 rounded text-emerald-100 shrink-0">
                  v{SOFTWARE_VERSION}
                </span>
              </h1>
              <p className="hidden sm:block text-xs text-emerald-200 m-0 leading-tight">
                Legal Document Generator · Gujarat
                {sessionUser?.email ? (
                  <span className="text-emerald-300/90">
                    {' '}
                    · {sessionUser.fullName || sessionUser.email}
                    {sessionUser.role ? ` (${sessionUser.role})` : ''}
                  </span>
                ) : null}
              </p>
            </div>
          </div>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3 shrink-0">
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs transition-opacity duration-500 ${
                isSaved ? 'bg-emerald-800 text-emerald-300 opacity-100' : 'opacity-0'
              }`}
            >
              <Save size={12} className="animate-pulse" />
              <span>{t('draftStatus')}</span>
            </div>

            <button
              onClick={() => loadMockData(language)}
              type="button"
              className={`${actionBtn} bg-amber-500 hover:bg-amber-600 text-emerald-950 focus:ring-amber-400`}
            >
              {t('loadMock')}
            </button>

            <button
              onClick={resetForm}
              type="button"
              className={`${actionBtn} border border-emerald-700 hover:bg-emerald-800 text-emerald-200 focus:ring-emerald-500`}
              title={t('reset')}
            >
              <RotateCcw size={14} />
              <span>{t('reset')}</span>
            </button>

            <button
              onClick={handleLanguageToggle}
              type="button"
              className={`${actionBtn} bg-emerald-800 hover:bg-emerald-700 text-white border border-emerald-700 focus:ring-emerald-500`}
            >
              <Globe size={14} className="text-emerald-300" />
              <span>{t('toggleLanguage')}</span>
            </button>

            <button
              onClick={onLogout}
              type="button"
              className={`${actionBtn} bg-red-900/80 hover:bg-red-800 text-white border border-red-800 focus:ring-red-500`}
              title="Logout"
            >
              <LogOut size={14} />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile: language + menu */}
          <div className="flex md:hidden items-center gap-1.5 shrink-0">
            <button
              onClick={handleLanguageToggle}
              type="button"
              className={`${actionBtn} bg-emerald-800 text-white border border-emerald-700 px-2.5`}
              aria-label="Toggle language"
            >
              <Globe size={16} />
              <span className="uppercase">{language === 'gu' ? 'EN' : 'GU'}</span>
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              className={`${actionBtn} bg-emerald-800 text-white border border-emerald-700 px-2.5`}
              aria-expanded={menuOpen}
              aria-label="Open menu"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-emerald-800 pb-3 pt-2 space-y-2 animate-in fade-in slide-in-from-top-2">
            {isSaved && (
              <div className="flex items-center gap-1.5 text-xs text-emerald-300 px-1">
                <Save size={12} />
                <span>{t('draftStatus')}</span>
              </div>
            )}
            <button
              onClick={() => {
                loadMockData(language);
                closeMenu();
              }}
              type="button"
              className={`${actionBtn} w-full bg-amber-500 text-emerald-950`}
            >
              {t('loadMock')}
            </button>
            <button
              onClick={() => {
                resetForm();
                closeMenu();
              }}
              type="button"
              className={`${actionBtn} w-full border border-emerald-700 text-emerald-100`}
            >
              <RotateCcw size={14} />
              {t('reset')}
            </button>
            <button
              onClick={() => {
                onLogout();
                closeMenu();
              }}
              type="button"
              className={`${actionBtn} w-full bg-red-900/80 text-white border border-red-800`}
            >
              <LogOut size={14} />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
