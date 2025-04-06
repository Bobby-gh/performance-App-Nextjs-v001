'use client';
import React, { useState } from 'react';
import { Tabs } from './tabs'; 
import { useTranslation } from 'react-i18next';

export default function ReportingNavigation({ onTabChange }) {
  const { t } = useTranslation(); 
  const tabs = Tabs(); 
  const [activeTab, setActiveTab] = useState(tabs[0].key); 

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey); 
    onTabChange(tabKey); 
  };

  return (
    <div>
      {/* Tabs Navigation */}
      <div className="flex p-6 justify-center">
        <ul className="flex flex-row space-x-4 border-b border-gray-300">
          {tabs.map((tab) => (
            <li key={tab.key}>
              <button
                onClick={() => handleTabChange(tab.key)}
                className={`text-md p-4 ${activeTab === tab.key ? 'text-[#08376B] border-b-2 border-[#08376B]' : 'text-black'}`}
              >
                <span className="ml-2 transition duration-300 ease-out">
                {t(tab.title)} {/* Render translated title */}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
