import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translation files
import enHome from "./locales/en/home.json";
import enAbout from "./locales/en/about.json";
import nlHome from "./locales/nl/home.json";
import nlAbout from "./locales/nl/about.json";
import deHome from "./locales/de/home.json";
import deAbout from "./locales/de/about.json";
import huHome from "./locales/hu/home.json";
import huAbout from "./locales/hu/about.json";

// Export supported languages
export const supportedLanguages = {
  en: { nativeName: "English", flag: "🇬🇧" },
  nl: { nativeName: "Nederlands", flag: "🇳🇱" },
  de: { nativeName: "Deutsch", flag: "🇩🇪" },
  hu: { nativeName: "Magyar", flag: "🇭🇺" },
};

// Define resources
const resources = {
  en: {
    home: enHome,
    about: enAbout,
  },
  nl: {
    home: nlHome,
    about: nlAbout,
  },
  de: {
    home: deHome,
    about: deAbout,
  },
  hu: {
    home: huHome,
    about: huAbout,
  },
};

// Language detector configuration
const languageDetectorOptions = {
  order: ["localStorage", "navigator"],
  caches: ["localStorage"],
  lookupLocalStorage: "satsang-language",
};

i18n
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    resources,
    fallbackLng: "en", // Default fallback language
    supportedLngs: ["en", "nl", "de", "hu"],
    defaultNS: "home",
    debug: false, // Set to true during development if needed

    detection: languageDetectorOptions,

    interpolation: {
      escapeValue: false, // React already escapes values
    },

    react: {
      useSuspense: true, // Use suspense mode for better UX
    },
    load: "languageOnly", // This will convert 'en-US' to 'en'
  });

export default i18n;

export type SupportedLanguage = keyof typeof supportedLanguages;
