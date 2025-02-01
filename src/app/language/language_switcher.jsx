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

