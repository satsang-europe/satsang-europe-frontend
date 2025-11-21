import { create } from "zustand";
import i18n, {
  type SupportedLanguage,
  supportedLanguages,
} from "@/i18n/config";

interface LanguageState {
  currentLanguage: SupportedLanguage;
  changeLanguage: (lang: SupportedLanguage) => Promise<void>;
}

// Helper function to normalize language code
const normalizeLanguage = (lang: string): SupportedLanguage => {
  // Extract base language code (e.g., 'en-US' -> 'en')
  const baseLang = lang.split("-")[0].toLowerCase();

  // Check if it's a supported language
  if (baseLang in supportedLanguages) {
    return baseLang as SupportedLanguage;
  }

  // Default to English
  return "en";
};

export const useLanguageStore = create<LanguageState>((set) => ({
  currentLanguage: normalizeLanguage(i18n.language || "en"),

  changeLanguage: async (lang: SupportedLanguage) => {
    await i18n.changeLanguage(lang);
    set({ currentLanguage: lang });
    // Language is automatically saved to localStorage by i18next-browser-languagedetector
  },
}));
