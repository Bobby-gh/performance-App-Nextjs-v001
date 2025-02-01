'use client'
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  fallbackLng: "en", // Default language
  interpolation: {
    escapeValue: false, // React already escapes values to prevent XSS
  },
  resources: {
    en: {
      translation: {
        //login
        email: "Email",
        password: "Password"
      },
    },
    fr: {
      translation: {
        //login
        email: "Messagerie électronique",
        password: "Mot de passe"
      },
    },
  },
});

export default i18n;

