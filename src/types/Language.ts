export type Language = "ru" | "en";

export interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
}
