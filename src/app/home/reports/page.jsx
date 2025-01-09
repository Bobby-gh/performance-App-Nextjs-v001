'use client'
import React, { useState } from 'react';
import OperationalEfficiency from './tab-files/operationalEfficiency';
import StrategicPerformance from './tab-files/strategicPerformance';
import ReportingNavigation from './navigation';
import BalanceScoreCard from './tab-files/balanceScoreCard';
import GoalAchievemnetReport from './tab-files/goalAchievment';

export default function ReportingData() {
  const [activeTab, setActiveTab] = useState("Documents"); // Default to "Documents"

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  console.log(activeTab)
  const renderComponent = () => {
    switch (activeTab) {
      case "Strattegic Performance":
        return <StrategicPerformance/>;
      case "Operational Effeciency":
        return <OperationalEfficiency />;
      case "Balance Scorecard":
        return <BalanceScoreCard />;
      case "Goal Achievement":
        return <GoalAchievemnetReport/>;
      default:
        return <StrategicPerformance />;;
    }
  };

  return (
    <div>
      <ReportingNavigation onTabChange={handleTabChange} />
      <div className="mt-6">
        {renderComponent()}
      </div>
    </div>
  );
}
