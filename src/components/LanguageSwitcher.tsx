import { useState, useRef, useEffect } from "react";
import { useLanguageStore } from "@/store/languageStore";
import { supportedLanguages, type SupportedLanguage } from "@/i18n/config";
import { ChevronDown } from "lucide-react";

const LanguageSwitcher = () => {
  const { currentLanguage, changeLanguage } = useLanguageStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = async (lang: SupportedLanguage) => {
    await changeLanguage(lang);
    setIsOpen(false);
  };

  // Safety check - if currentLanguage is not in supportedLanguages, default to 'en'
  const safeLang = (
    currentLanguage in supportedLanguages ? currentLanguage : "en"
  ) as SupportedLanguage;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 
                   rounded-md transition text-sm font-semibold"
        aria-label="Select language"
      >
        <span>{supportedLanguages[safeLang].flag}</span>
        <span className="hidden md:inline">{safeLang.toUpperCase()}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg 
                        border border-gray-700 overflow-hidden z-50"
        >
          {(Object.keys(supportedLanguages) as SupportedLanguage[]).map(
            (lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`w-full text-left px-4 py-3 hover:bg-gray-700 transition
                         flex items-center gap-3 ${
                           safeLang === lang ? "bg-gray-700" : ""
                         }`}
              >
                <span className="text-xl">{supportedLanguages[lang].flag}</span>
                <span className="flex-1">
                  {supportedLanguages[lang].nativeName}
                </span>
                {safeLang === lang && <span className="text-green-400">✓</span>}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
