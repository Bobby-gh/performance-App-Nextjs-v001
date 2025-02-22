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
  const [activeTab, setActiveTab] = useState("Balance Scorecard"); // Default to "Documents"

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  console.log(activeTab)
  
  const renderComponent = () => {
    switch (activeTab) {
      case t("balanceScorecard"): // Dynamically use the translation key
        return <BalanceScoreCard />;
      case t("operationalEfficiency"):
        return <OperationalEfficiency />;
      case t("strategicPerformance"):
        return <StrategicPerformance />;
      case t("systemGoals"):
        return <GoalAchievemnetReport />;
      case t("badges"):
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
