'use client'
import React, { useState } from 'react';
import OperationalEfficiency from './tab-files/operationalEfficiency';
import StrategicPerformance from './tab-files/strategicPerformance';
import ReportingNavigation from './navigation';
import BalanceScoreCard from './tab-files/balanceScoreCard';
import GoalAchievemnetReport from './tab-files/goalAchievment';
import Badges from './tab-files/badges';
import { LoadingPopup } from '@/app/api/sessions';

export default function ReportingData() {
  const [activeTab, setActiveTab] = useState("Balance Scorecard"); // Default to "Documents"

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  console.log(activeTab)
  const renderComponent = () => {
    switch (activeTab) {
      case "Balance Scorecard":
        return <BalanceScoreCard />;
      case "Operational Effeciency":
        return <OperationalEfficiency />;
      case "Strategic Performance":
        return <StrategicPerformance/>;
      case "System Goals":
        return <GoalAchievemnetReport/>;
      case "Badges":
        return <Badges/>;
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
