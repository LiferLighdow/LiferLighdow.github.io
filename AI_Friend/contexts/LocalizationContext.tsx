
import React, { createContext, useState, useContext, ReactNode, useCallback, useMemo, useEffect } from 'react';
import en from '../locales/en.js';
import zhTW from '../locales/zh-TW.js';
import ja from '../locales/ja.js';
import zhCN from '../locales/zh-CN.js';

const translations = {
  en,
  'zh-TW': zhTW,
  'ja': ja,
  'zh-CN': zhCN,
};

export type Language = keyof typeof translations;

interface LocalizationContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, replacements?: Record<string, string | number>) => string;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export const LocalizationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en'); // Default to English

  useEffect(() => {
    const savedLang = localStorage.getItem('app-language') as Language;
    if (savedLang && translations[savedLang]) {
      setLanguage(savedLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('app-language', lang);
  };
  
  const t = useCallback((key: string, replacements?: Record<string, string | number>): string => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let translation = (translations[language] as any)[key] || (translations['en'] as any)[key] || key;
    if (replacements) {
        Object.entries(replacements).forEach(([placeholder, value]) => {
            translation = translation.replace(new RegExp(`{{${placeholder}}}`, 'g'), String(value));
        });
    }
    return translation;
  }, [language]);

  const value = useMemo(() => ({
    language,
    setLanguage: handleSetLanguage,
    t,
  }), [language, t]);

  return (
    <LocalizationContext.Provider value={value}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = (): LocalizationContextType => {
  const context = useContext(LocalizationContext);
  if (context === undefined) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
};
