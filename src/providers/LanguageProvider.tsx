import React, { useState } from "react";
import { LanguageContext } from "../context";
import { Language } from "../types";

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("ru");

  const toggleLanguage = () =>
    setLanguage((prev) => (prev === "ru" ? "en" : "ru"));

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
