"use client";
import React, {useState} from "react";
import { Tabs } from "./tabs";


export default function ReportingNavigation({ onTabChange }) {
    const [activeTab, setActiveTab] = useState(Tabs[0].title);
  
    const handleTabChange = (tab) => {
      setActiveTab(tab);
      onTabChange(tab);
    };
  
    return (
      <div>
        {/* Tabs Navigation */}
        <div className="flex p-6 justify-center">
          <ul className="flex flex-row space-x-4 border-b border-gray-300">
            {Tabs.map((tab) => (
              <li key={tab.title}>
                <button
                  onClick={() => handleTabChange(tab.title)}
                  className={`text-md p-4 ${activeTab === tab.title ? 'text-[#08376B] border-b-2 border-[#08376B]' : 'text-black'}`}
                >
                  <span className="ml-2 transition duration-300 ease-out">
                    {tab.title}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
