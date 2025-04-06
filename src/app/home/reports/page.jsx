'use client'
import React, { useState } from 'react';
import OperationalEfficiency from './tab-files/operationalEfficiency';
import StrategicPerformance from './tab-files/strategicPerformance';
import ReportingNavigation from './navigation';
import BalanceScoreCard from './tab-files/balanceScoreCard';
import GoalAchievemnetReport from './tab-files/goalAchievment';
import Badges from './tab-files/badges';
import { LoadingPopup } from '@/app/api/sessions';
import { useTranslation } from 'react-i18next';


export default function ReportingData() {
  const { t } = useTranslation(); 
  const [activeTab, setActiveTab] = useState("balanceScorecard"); // Default to "Documents"

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  console.log(activeTab)
  
  const renderComponent = () => {
    switch (activeTab) {
      case "balanceScorecard": // Dynamically use the translation key
        return <BalanceScoreCard />;
      case "operationalEfficiency":
        return <OperationalEfficiency />;
      case "strategicPerformance":
        return <StrategicPerformance />;
      case "systemGoals":
        return <GoalAchievemnetReport />;
      case "badges":
        return <Badges />;
      default:
        return <BalanceScoreCard />;
    }
  };

  return (
    <div>
      <LoadingPopup/>
      <ReportingNavigation onTabChange={handleTabChange} />
      <div className="mt-6">
        {renderComponent()}
      </div>
    </div>
  );
}
