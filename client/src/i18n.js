import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

// Function to get the selected language from storage or use the fallback
const getStoredLanguage = () => {
  const storedLanguage = localStorage.getItem("i18nextLng");
  return storedLanguage || "fr"; // Fallback to French if not found
};

const selectedLanguage = getStoredLanguage();

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "fr",
    detection: {
      order: ["navigator"],
      lookupFromPathIndex: 0,
      checkWhitelist: true,
    },
    interpolation: {
      escapeValue: false,
    },
    lng: selectedLanguage, // Set the default language to the stored or fallback language
  });

export default i18n;
