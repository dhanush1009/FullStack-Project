    // src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector) // detects browser language
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: {
          welcome: "Welcome to the Admin Dashboard",
          volunteers: "Volunteers",
          shelters: "Shelters",
          emergencies: "Emergencies",
          assignTask: "Assign Task",
          logout: "Logout",
        },
      },
      ta: {
        translation: {
          welcome: "அட்மின் டாஷ்போர்டுக்கு வரவேற்கிறோம்",
          volunteers: "தன்னார்வலர்கள்",
          shelters: "அடைக்கலங்கள்",
          emergencies: "அவசரநிலைகள்",
          assignTask: "பணி ஒதுக்குக",
          logout: "வெளியேறு",
        },
      },
      hi: {
        translation: {
          welcome: "एडमिन डैशबोर्ड में आपका स्वागत है",
          volunteers: "स्वयंसेवक",
          shelters: "शरणालय",
          emergencies: "आपातकाल",
          assignTask: "कार्य सौंपें",
          logout: "लॉग आउट",
        },
      },
    },
    fallbackLng: "en", // default
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
