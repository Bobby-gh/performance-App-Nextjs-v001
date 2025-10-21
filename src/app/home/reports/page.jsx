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
import Trends from './tab-files/trends';
import { Printer, Download, Calendar, Building2, TrendingUp, X } from 'lucide-react';

export default function ReportingData() {
  const { t } = useTranslation(); 
  const [activeTab, setActiveTab] = useState("balanceScorecard");
  const [showPrintView, setShowPrintView] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setShowPrintView(false);
  };

  const handleExportAllReports = () => {
    setShowPrintView(true);
  };

  const handlePrint = () => {
    window.print();
  };

  console.log(activeTab)
  
  const renderComponent = () => {
    switch (activeTab) {
      case "balanceScorecard":
        return <BalanceScoreCard />;
      case "operationalEfficiency":
        return <OperationalEfficiency />;
      case "strategicPerformance":
        return <StrategicPerformance />;
      case "systemGoals":
        return <GoalAchievemnetReport />;
      case "badges":
        return <Badges />;
      case "trends":
        return <Trends/>;
      default:
        return <BalanceScoreCard />;
    }
  };

  // Print View - Comprehensive Report
  if (showPrintView) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Non-printable Header with Export Buttons */}
        <div className="print:hidden sticky top-0 z-50 bg-white shadow-md border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Building2 className="w-8 h-8 text-blue-600" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {t('companyReports') || 'Company Performance Reports'}
                  </h1>
                  <p className="text-sm text-gray-500">
                    {t('comprehensiveAnalysis') || 'Comprehensive Performance Analysis'}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowPrintView(false)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all shadow-md font-medium"
                >
                  <X className="w-5 h-5" />
                  {t('close') || 'Close'}
                </button>
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg font-medium"
                >
                  <Printer className="w-5 h-5" />
                  {t('printReport') || 'Print Report'}
                </button>
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-md hover:shadow-lg font-medium"
                >
                  <Download className="w-5 h-5" />
                  {t('exportPDF') || 'Export as PDF'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Printable Content */}
        <div className="print:p-0">
          {/* Cover Page */}
          <div className="page-break bg-white min-h-screen flex flex-col justify-center items-center p-12 print:min-h-screen">
            <div className="text-center space-y-8">
              <div className="inline-block p-6 bg-blue-600 rounded-full shadow-2xl">
                <TrendingUp className="w-24 h-24 text-white" />
              </div>
              
              <div className="space-y-4">
                <h1 className="text-6xl font-bold text-gray-900 print:text-5xl">
                  {t('performanceReport') || 'Performance Report'}
                </h1>
                <div className="h-1 w-32 bg-blue-600 mx-auto rounded"></div>
                <p className="text-2xl text-gray-600 print:text-xl">
                  {t('comprehensiveAnalysis') || 'Comprehensive Analysis & Insights'}
                </p>
              </div>

              <div className="flex items-center justify-center gap-2 text-lg text-gray-700 mt-12">
                <Calendar className="w-5 h-5" />
                <span>{new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>

              <div className="mt-16 pt-8 border-t border-gray-200">
                <p className="text-gray-500 text-sm">
                  {t('confidential') || 'Confidential - Internal Use Only'}
                </p>
              </div>
            </div>
          </div>

          {/* Table of Contents */}
          <div className="page-break bg-white p-12 print:p-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-8 pb-4 border-b-2 border-blue-600">
              {t('tableOfContents') || 'Table of Contents'}
            </h2>
            <div className="space-y-4 text-lg">
              <div className="flex justify-between items-center p-4 hover:bg-blue-50 rounded-lg transition-colors">
                <span className="font-medium text-gray-700">1. {t('balanceScorecard') || 'Balance Scorecard'}</span>
                <span className="text-blue-600 font-semibold">Page 3</span>
              </div>
              <div className="flex justify-between items-center p-4 hover:bg-blue-50 rounded-lg transition-colors">
                <span className="font-medium text-gray-700">2. {t('operationalEfficiency') || 'Operational Efficiency'}</span>
                <span className="text-blue-600 font-semibold">Page 4</span>
              </div>
              <div className="flex justify-between items-center p-4 hover:bg-blue-50 rounded-lg transition-colors">
                <span className="font-medium text-gray-700">3. {t('strategicPerformance') || 'Strategic Performance'}</span>
                <span className="text-blue-600 font-semibold">Page 5</span>
              </div>
              <div className="flex justify-between items-center p-4 hover:bg-blue-50 rounded-lg transition-colors">
                <span className="font-medium text-gray-700">4. {t('systemGoals') || 'Goal Achievement'}</span>
                <span className="text-blue-600 font-semibold">Page 6</span>
              </div>
              <div className="flex justify-between items-center p-4 hover:bg-blue-50 rounded-lg transition-colors">
                <span className="font-medium text-gray-700">5. {t('badges') || 'Performance Badges'}</span>
                <span className="text-blue-600 font-semibold">Page 7</span>
              </div>
              <div className="flex justify-between items-center p-4 hover:bg-blue-50 rounded-lg transition-colors">
                <span className="font-medium text-gray-700">6. {t('trends') || 'Performance Trends'}</span>
                <span className="text-blue-600 font-semibold">Page 8</span>
              </div>
            </div>
          </div>

          {/* Balance Scorecard Section */}
          <div className="page-break bg-white p-12 print:p-8">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-8 bg-blue-600 rounded"></div>
                <h2 className="text-3xl font-bold text-gray-900">
                  1. {t('balanceScorecard') || 'Balance Scorecard'}
                </h2>
              </div>
              <p className="text-gray-600 ml-5">
                {t('balanceScorecardDesc') || 'Overview of key performance indicators across all business dimensions'}
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-sm border border-blue-100">
              <BalanceScoreCard />
            </div>
          </div>

          {/* Operational Efficiency Section */}
          <div className="page-break bg-white p-12 print:p-8">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-8 bg-green-600 rounded"></div>
                <h2 className="text-3xl font-bold text-gray-900">
                  2. {t('operationalEfficiency') || 'Operational Efficiency'}
                </h2>
              </div>
              <p className="text-gray-600 ml-5">
                {t('operationalEfficiencyDesc') || 'Analysis of operational processes and efficiency metrics'}
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl shadow-sm border border-green-100">
              <OperationalEfficiency />
            </div>
          </div>

          {/* Strategic Performance Section */}
          <div className="page-break bg-white p-12 print:p-8">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-8 bg-purple-600 rounded"></div>
                <h2 className="text-3xl font-bold text-gray-900">
                  3. {t('strategicPerformance') || 'Strategic Performance'}
                </h2>
              </div>
              <p className="text-gray-600 ml-5">
                {t('strategicPerformanceDesc') || 'Strategic initiatives and long-term performance tracking'}
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl shadow-sm border border-purple-100">
              <StrategicPerformance />
            </div>
          </div>

          {/* Goal Achievement Section */}
          <div className="page-break bg-white p-12 print:p-8">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-8 bg-orange-600 rounded"></div>
                <h2 className="text-3xl font-bold text-gray-900">
                  4. {t('systemGoals') || 'Goal Achievement'}
                </h2>
              </div>
              <p className="text-gray-600 ml-5">
                {t('goalAchievementDesc') || 'Progress tracking and achievement status of organizational goals'}
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-xl shadow-sm border border-orange-100">
              <GoalAchievemnetReport />
            </div>
          </div>

          {/* Badges Section */}
          <div className="page-break bg-white p-12 print:p-8">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-8 bg-yellow-600 rounded"></div>
                <h2 className="text-3xl font-bold text-gray-900">
                  5. {t('badges') || 'Performance Badges'}
                </h2>
              </div>
              <p className="text-gray-600 ml-5">
                {t('badgesDesc') || 'Recognition and awards for outstanding performance'}
              </p>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-white p-6 rounded-xl shadow-sm border border-yellow-100">
              <Badges />
            </div>
          </div>

          {/* Trends Section */}
          <div className="page-break bg-white p-12 print:p-8">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-8 bg-teal-600 rounded"></div>
                <h2 className="text-3xl font-bold text-gray-900">
                  6. {t('trends') || 'Performance Trends'}
                </h2>
              </div>
              <p className="text-gray-600 ml-5">
                {t('trendsDesc') || 'Historical trends and comparative analysis over time'}
              </p>
            </div>
            <div className="bg-gradient-to-br from-teal-50 to-white p-6 rounded-xl shadow-sm border border-teal-100">
              <Trends />
            </div>
          </div>

          {/* Footer on each page */}
          <div className="print:block hidden fixed bottom-0 left-0 right-0 p-4 text-center text-xs text-gray-500 border-t border-gray-200 bg-white">
            <p>{t('confidential') || 'Confidential - Internal Use Only'} | Generated on {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        {/* Print Styles */}
        <style jsx global>{`
          @media print {
            @page {
              size: A4;
              margin: 0;
            }
            
            body {
              print-color-adjust: exact;
              -webkit-print-color-adjust: exact;
            }
            
            .page-break {
              page-break-after: always;
              page-break-inside: avoid;
            }
            
            .print\\:hidden {
              display: none !important;
            }
            
            .print\\:block {
              display: block !important;
            }
            
            .print\\:p-8 {
              padding: 2rem !important;
            }
            
            .print\\:p-0 {
              padding: 0 !important;
            }
            
            .print\\:min-h-screen {
              min-height: 100vh !important;
            }
            
            .print\\:text-5xl {
              font-size: 3rem !important;
            }
            
            .print\\:text-xl {
              font-size: 1.25rem !important;
            }
          }
        `}</style>
      </div>
    );
  }

  // Normal View - Tab Navigation
  return (
    <div>
      <LoadingPopup/>
      
      {/* Export All Reports Button */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={handleExportAllReports}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl font-medium transform hover:scale-105"
        >
          <Printer className="w-5 h-5" />
          {t('exportAllReports') || 'Export All Report Charts'}
        </button>
      </div>

      <ReportingNavigation onTabChange={handleTabChange} />
      <div className="mt-6">
        {renderComponent()}
      </div>
    </div>
  );
}