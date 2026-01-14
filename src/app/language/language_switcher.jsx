'use client'
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { IoGlobeOutline } from "react-icons/io5";
import Cookies from "js-cookie";

const FLAGS = {
  en: "https://th.bing.com/th/id/OIP.YMOZI-eYNMGLsKvGOfDSLgHaDt?rs=1&pid=ImgDetMain",
  fr: "https://th.bing.com/th/id/R.98ed847d113e4f1899819db4904e9a3b?rik=Ar%2ftjBrb4NJl4Q&pid=ImgRaw&r=0"
};

export function LanguageButton() {
  const { i18n } = useTranslation();
  // Initialize state from cookie or default to 'en'
  const [selectedFlag, setSelectedFlag] = useState(FLAGS.en);

  useEffect(() => {
    const savedLng = Cookies.get("i18next") || "en";
    if (FLAGS[savedLng]) {
      setSelectedFlag(FLAGS[savedLng]);
    }
  }, []);

  const changeLanguage = (event) => {
    const lng = event.target.value;
    if (lng) {
      i18n.changeLanguage(lng);
      Cookies.set("i18next", lng, { expires: 365 }); // Save for 1 year
      setSelectedFlag(FLAGS[lng]);
    }
  };

  return (
    <div>
      <select
        className="border-2 border-blue-500 p-0.5 focus:text-blue-500"
        onChange={changeLanguage}
        value={i18n.language}
        style={{
          background: `url(${selectedFlag}) 8px center / 20px 15px no-repeat`,
          paddingLeft: "35px",
        }}
      >
        <option value="en">English</option>
        <option value="fr">French</option>
      </select>
    </div>
  );
}

export function InnerLanguageButton() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const languages = [
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "fr", label: "French", flag: "🇫🇷" },
  ];

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    Cookies.set("i18next", langCode, { expires: 365 });
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button onClick={() => setOpen(!open)}>
        <IoGlobeOutline size={24} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-36 bg-white border rounded shadow-lg z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className="flex items-center w-full px-4 py-2 hover:bg-blue-100 text-sm text-left"
            >
              <span className="mr-2">{lang.flag}</span> {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}