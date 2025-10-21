'use client';
import React, { useState } from 'react';
import OperationalEfficiency from './tab-files/operationalEfficiency';
import StrategicPerformance from './tab-files/strategicPerformance';
import ReportingNavigation from './navigation';
import BalanceScoreCard from './tab-files/balanceScoreCard';
import GoalAchievemnetReport from './tab-files/goalAchievment';
import Badges from './tab-files/badges';
import { LoadingPopup } from '@/app/api/sessions';
import { useTranslation } from 'react-i18next';
import Trends from './tab-files/trends';
import { Printer } from 'lucide-react';
import ExportReportComponent from './exportReport';

export default function ReportingData() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('balanceScorecard');
  const [showExportView, setShowExportView] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setShowExportView(false); // Ensure export view is closed when changing tabs
  };

  const handleExportReports = () => {
    setShowExportView(true);
  };

  const handleCloseExport = () => {
    setShowExportView(false);
  };

  const renderComponent = () => {
    switch (activeTab) {
      case 'balanceScorecard':
        return <BalanceScoreCard />;
      case 'operationalEfficiency':
        return <OperationalEfficiency />;
      case 'strategicPerformance':
        return <StrategicPerformance />;
      case 'systemGoals':
        return <GoalAchievemnetReport />;
      case 'badges':
        return <Badges />;
      case 'trends':
        return <Trends />;
      default:
        return <BalanceScoreCard />;
    }
  };

  // Export View
  if (showExportView) {
    return <ExportReportComponent onClose={handleCloseExport} />;
  }

  // Normal View - Tab Navigation
  return (
    <div>
      <LoadingPopup />

      {/* Export All Reports Button */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={handleExportReports}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl font-medium transform hover:scale-105"
        >
          <Printer className="w-5 h-5" />
          {t('exportAllReportsCharts') || 'Export All Report Charts'}
        </button>
      </div>

      <ReportingNavigation onTabChange={handleTabChange} />
      <div className="mt-6">{renderComponent()}</div>
    </div>
  );
}