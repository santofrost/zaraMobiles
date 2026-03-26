"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, translations, TranslationKey } from "./translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("es"); // Default spanish
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    const saved = localStorage.getItem("language") as Language;
    if (saved && (saved === "es" || saved === "en")) {
      setLanguage(saved);
    }
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: TranslationKey): string => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const resolvePath = (obj: any, path: string) => {
      return path.split(".").reduce((acc, part) => acc && acc[part], obj);
    };

    // ¡¡¡Importante!!!
    // Para evitar hydration mismatch durante el primer render en Next.js App Router,
    // asumimos 'es' por defecto y devolvemos la traducción hasta que esté montado
    if (!isMounted) {
      const translationEs = resolvePath(translations["es"], key);
      return typeof translationEs === "string" ? translationEs : key;
    }
    const translation =
      resolvePath(translations[language], key) || resolvePath(translations["es"], key);
    return typeof translation === "string" ? translation : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
