'use client'
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export function LanguageButton() {
  const { i18n } = useTranslation();
  const [selectedFlag, setSelectedFlag] = useState("https://th.bing.com/th/id/OIP.YMOZI-eYNMGLsKvGOfDSLgHaDt?rs=1&pid=ImgDetMain"); 

  const changeLanguage = (event) => {
    const lng = event.target.value;
    if (lng) {
      i18n.changeLanguage(lng);
      setSelectedFlag(lng === "en" ? "https://th.bing.com/th/id/OIP.YMOZI-eYNMGLsKvGOfDSLgHaDt?rs=1&pid=ImgDetMain" : "https://th.bing.com/th/id/R.98ed847d113e4f1899819db4904e9a3b?rik=Ar%2ftjBrb4NJl4Q&pid=ImgRaw&r=0");
    }
  };

  return (
    <div>
      <select
        className="border-2 border-blue-500 p-0.5 focus:text-blue-500"
        onChange={changeLanguage}
        value={i18n.language} // make sure the select shows the current language
        style={{
          background: `url(${selectedFlag}) 8px center / 20px 15px no-repeat`,
          paddingLeft: "35px",
        }}
      >
        <option value="en">
          English
        </option>
        <option value="fr">
          French
        </option>
      </select>
    </div>
  );
}


export function InnerLanguageButton() {
  const [open, setOpen] = useState(false);

  const languages = [
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "fr", label: "French", flag: "🇫🇷" },
  ];

  const toggleDropdown = () => setOpen(!open);

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    setOpen(false);
  };

  

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 border border-blue-500 rounded px-2 py-1 hover:bg-blue-50 transition"
      >
        <FiGlobe className="text-blue-500" />
        <span className="text-sm text-blue-500 capitalize">
          {i18n.language}
        </span>
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


