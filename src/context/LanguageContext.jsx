import React, { createContext, useContext, useState, useEffect } from 'react';
import { legalDictionary, legalTranslationDictionary } from '../utils/legalDictionary';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    const saved = localStorage.getItem('deed_app_lang');
    return saved === 'gu' ? 'gu' : 'en';
  });

  const setLanguage = (lang) => {
    if (lang === 'en' || lang === 'gu') {
      setLanguageState(lang);
      localStorage.setItem('deed_app_lang', lang);
    }
  };

  const t = (key, vars = {}) => {
    let text = legalDictionary[language]?.[key] || legalDictionary.en?.[key] || key;
    Object.keys(vars).forEach((k) => {
      text = String(text).replace(new RegExp(`\\{${k}\\}`, 'g'), String(vars[k]));
    });
    return text;
  };

  const translateLegal = (key, variables = {}) => {
    let template = legalTranslationDictionary[key]?.[language] || legalTranslationDictionary[key]?.['en'] || "";
    
    // Replace placeholders like {orderNo} or {orderDate}
    Object.keys(variables).forEach(vKey => {
      template = template.replace(new RegExp(`{${vKey}}`, 'g'), variables[vKey]);
    });
    
    return template;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translateLegal }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
