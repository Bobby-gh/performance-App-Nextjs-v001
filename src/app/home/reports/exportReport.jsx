'use client'
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Printer, Download, Calendar, Building2, X, CheckSquare, Square } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  useGeneralPerformanceChartRouteData,
  useGoalCategoryCountRouteData,
  useGoalStatus,
  useOrganizationalAveragePerMonthChartRouteData,
  useAchievedGoalsData,
} from '../../api/databook/route-data';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export default function ExportReportComponent({ onClose }) {
  const { t } = useTranslation();
  const chartsRef = useRef(null);
  const [selectedCharts, setSelectedCharts] = useState({
    balanceScorecard: true,
    organizationPerformance: true,
    achievedGoals: true,
    notAchievedGoals: true,
    partiallyAchievedGoals: true,
    comparativeTrends: true,
    financialTrends: true,
    innovationTrends: true,
  });

  const exportChartsAsPDF = async () => {
    if (chartsRef.current) {
      const pdf = new jsPDF('p', 'mm', 'a4'); // Portrait A4
      const elements = chartsRef.current.querySelectorAll('.print-page');
      const pdfWidth = pdf.internal.pageSize.getWidth(); // 210mm
      const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm
      const sectionHeight = (pdfHeight - 25) / 2; // ~136mm for two sections
      const fullPageHeight = pdfHeight - 20; // ~277mm for full page
      const marginBetween = 5; // 5mm between sections
      const marginTop = 10; // 10mm top margin

      for (let i = 0; i < elements.length; i++) {
        const canvas = await html2canvas(elements[i], {
          scale: 2,
          useCORS: true,
          logging: false,
        });

        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        const imgProps = pdf.getImageProperties(imgData);
        const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

        if (i === 0 || (i === 1 && selectedCharts.balanceScorecard)) {
          // Cover page or Balance Scorecard: Full A4 page
          const targetHeight = Math.min(imgHeight, fullPageHeight);
          pdf.addImage(imgData, 'JPEG', 0, 10, pdfWidth, targetHeight);
          if (i < elements.length - 1) {
            pdf.addPage();
          }
        } else {
          // Other sections: Two per page
          const sectionIndex = i - (selectedCharts.balanceScorecard ? 2 : 1); // Adjust for cover and Balance Scorecard
          const positionInPage = sectionIndex % 2; // 0 or 1 for two sections
          const yPosition = marginTop + positionInPage * (sectionHeight + marginBetween);

          if (positionInPage === 0 && sectionIndex > 0) {
            pdf.addPage();
          }

          pdf.addImage(imgData, 'JPEG', 0, yPosition, pdfWidth, sectionHeight);
        }

        // Save after the last section
        if (i === elements.length - 1) {
          pdf.save('balanced-scorecard-charts.pdf');
        }
      }
    }
  };

  const toggleChart = (chartName) => {
    setSelectedCharts(prev => ({
      ...prev,
      [chartName]: !prev[chartName]
    }));
  };

  const selectAll = () => {
    const allSelected = {};
    Object.keys(selectedCharts).forEach(key => {
      allSelected[key] = true;
    });
    setSelectedCharts(allSelected);
  };

  const deselectAll = () => {
    const allDeselected = {};
    Object.keys(selectedCharts).forEach(key => {
      allDeselected[key] = false;
    });
    setSelectedCharts(allDeselected);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="report-container">
      {/* Non-printable Header */}
      <div className="no-print header-controls">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Building2 className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {t('exportReports') || 'Export Performance Reports'}
                </h1>
                <p className="text-sm text-gray-500">
                  {t('selectChartsToExport') || 'Select charts to include in your report'}
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all shadow-md font-medium"
              >
                <X className="w-5 h-5" />
                {t('close') || 'Close'}
              </button>
              <button
                onClick={exportChartsAsPDF}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg font-medium"
              >
                <Printer className="w-5 h-5" />
                {t('printReport') || 'Print Report'}
              </button>
              <button
                onClick={exportChartsAsPDF}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-md hover:shadow-lg font-medium"
              >
                <Download className="w-5 h-5" />
                {t('exportPDF') || 'Save as PDF'}
              </button>
            </div>
          </div>
        </div>

        {/* Chart Selection Panel */}
        <div className="bg-gray-50 border-t border-gray-200 py-4">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-700">
                {t('selectCharts') || 'Select Charts to Export'}
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={selectAll}
                  className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                >
                  {t('selectAll') || 'Select All'}
                </button>
                <button
                  onClick={deselectAll}
                  className="text-sm px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                >
                  {t('deselectAll') || 'Deselect All'}
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(selectedCharts).map(([key, selected]) => (
                <button
                  key={key}
                  onClick={() => toggleChart(key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
                    selected 
                      ? 'bg-blue-50 border-blue-500 text-blue-700' 
                      : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {selected ? (
                    <CheckSquare className="w-5 h-5" />
                  ) : (
                    <Square className="w-5 h-5" />
                  )}
                  <span className="text-sm font-medium">
                    {t(key) || key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Printable Content */}
      <div className="printable-content" ref={chartsRef}>
        {/* Cover Page */}
        <div className="cover-page print-page">
          <div className="text-center space-y-4">
            <div className="inline-block p-4 bg-blue-600 rounded-full shadow-2xl">
              <Building2 className="w-16 h-16 text-white" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-5xl font-bold text-gray-900">
                {t('performanceReportChart') || 'Performance Report'}
              </h1>
              <div className="h-1 w-24 bg-blue-600 mx-auto rounded"></div>
              <p className="text-xl text-gray-600">
                {t('comprehensiveAnalysis') || 'Comprehensive Performance Analysis'}
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 text-base text-gray-700 mt-8">
              <Calendar className="w-4 h-4" />
              <span>{new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                {t('confidential') || 'Confidential - Internal Use Only'}
              </p>
            </div>
          </div>
        </div>

        {/* Balance Scorecard */}
        {selectedCharts.balanceScorecard && (
          <div className="report-section print-page">
            <div className="section-header">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-8 bg-blue-600 rounded"></div>
                <h2 className="text-3xl font-bold text-gray-900">
                  {t('balanceScorecard') || 'Balance Scorecard'}
                </h2>
              </div>
              <p className="text-gray-600 ml-5 mb-6">
                {t('balanceScorecardDesc') || 'Overview of key performance indicators across all business dimensions'}
              </p>
            </div>
            <div className="chart-container bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl">
              <BalanceScorecardChart />
            </div>
          </div>
        )}

        {/* Organization Performance */}
        {selectedCharts.organizationPerformance && (
          <div className="report-section print-page">
            <div className="section-header">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-8 bg-green-600 rounded"></div>
                <h2 className="text-3xl font-bold text-gray-900">
                  {t('organizationPerformance') || 'Organization Performance'}
                </h2>
              </div>
              <p className="text-gray-600 ml-5 mb-6">
                {t('monthlyPerformanceOverview') || 'Monthly average performance across the organization'}
              </p>
            </div>
            <div className="chart-container bg-gradient-to-br from-green-50 to-white p-6 rounded-xl">
              <OrganizationPerformanceChart />
            </div>
          </div>
        )}

        {/* Goal Status Section */}
        {(selectedCharts.achievedGoals || selectedCharts.partiallyAchievedGoals || selectedCharts.notAchievedGoals) && (
          <div className="report-section print-page">
            <div className="section-header">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-8 bg-purple-600 rounded"></div>
                <h2 className="text-3xl font-bold text-gray-900">
                  {t('goalStatus') || 'Goal Status Overview'}
                </h2>
              </div>
              <p className="text-gray-600 ml-5 mb-6">
                {t('goalStatusDesc') || 'Current status of organizational goals and achievements'}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {selectedCharts.achievedGoals && (
                <div className="chart-container bg-gradient-to-br from-green-50 to-white p-6 rounded-xl">
                  <AchievedGoalsChart />
                </div>
              )}
              {selectedCharts.partiallyAchievedGoals && (
                <div className="chart-container bg-gradient-to-br from-yellow-50 to-white p-6 rounded-xl">
                  <PartiallyAchievedGoalsChart />
                </div>
              )}
              {selectedCharts.notAchievedGoals && (
                <div className="chart-container bg-gradient-to-br from-red-50 to-white p-6 rounded-xl">
                  <NotAchievedGoalsChart />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Comparative Trends */}
        {selectedCharts.comparativeTrends && (
          <div className="report-section print-page">
            <div className="section-header">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-8 bg-indigo-600 rounded"></div>
                <h2 className="text-3xl font-bold text-gray-900">
                  {t('comparativeTrends') || 'Comparative Trends Analysis'}
                </h2>
              </div>
              <p className="text-gray-600 ml-5 mb-6">
                {t('comparativeTrendsDesc') || 'Comparative performance trends across categories'}
              </p>
            </div>
            <div className="chart-container bg-gradient-to-br from-indigo-50 to-white p-6 rounded-xl">
              <ComparativeTrendsChart />
            </div>
          </div>
        )}

        {/* Financial Trends */}
        {selectedCharts.financialTrends && (
          <div className="report-section print-page">
            <div className="section-header">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-8 bg-orange-600 rounded"></div>
                <h2 className="text-3xl font-bold text-gray-900">
                  {t('financialTrends') || 'Financial Performance Trends'}
                </h2>
              </div>
              <p className="text-gray-600 ml-5 mb-6">
                {t('financialTrendsDesc') || 'Monthly financial performance trends'}
              </p>
            </div>
            <div className="chart-container bg-gradient-to-br from-orange-50 to-white p-6 rounded-xl">
              <FinancialTrendsChart />
            </div>
          </div>
        )}

        {/* Innovation Trends */}
        {selectedCharts.innovationTrends && (
          <div className="report-section print-page">
            <div className="section-header">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-8 bg-teal-600 rounded"></div>
                <h2 className="text-3xl font-bold text-gray-900">
                  {t('innovationTrends') || 'Innovation Performance Trends'}
                </h2>
              </div>
              <p className="text-gray-600 ml-5 mb-6">
                {t('innovationTrendsDesc') || 'Monthly innovation performance trends'}
              </p>
            </div>
            <div className="chart-container bg-gradient-to-br from-teal-50 to-white p-6 rounded-xl">
              <InnovationTrendsChart />
            </div>
          </div>
        )}
      </div>

      {/* Comprehensive Print Styles */}
      <style jsx global>{`
        /* Screen Styles */
        .report-container {
          min-height: 100vh;
          background: linear-gradient(to bottom right, #f8fafc, #eff6ff);
        }

        .no-print {
          display: block;
        }

        .header-controls {
          position: sticky;
          top: 0;
          z-index: 50;
          background: white;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          border-bottom: 1px solid #e5e7eb;
        }

        .printable-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .cover-page,
        .report-section {
          background: white;
          padding: 1.5rem;
          margin-bottom: 1rem;
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .cover-page {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          min-height: 297mm;
        }

        /* Critical Print Styles */
        @media print {
          * {
            overflow: visible !important;
            position: static !important;
          }

          html, body {
            width: 100% !important;
            height: auto !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: visible !important;
            background: white !important;
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }

          .no-print,
          .header-controls,
          button,
          .print\\:hidden {
            display: none !important;
          }

          .report-container {
            width: 100% !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            overflow: visible !important;
            position: static !important;
          }

          .printable-content {
            width: 100% !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: visible !important;
            position: static !important;
          }

          @page {
            size: A4 portrait;
            margin: 1cm;
          }

          .print-page {
            page-break-after: always;
            page-break-inside: avoid;
            break-after: page;
            break-inside: avoid;
          }

          .print-page:last-child {
            page-break-after: auto;
          }

          .cover-page {
            min-height: 297mm;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 1cm !important;
            margin: 0 !important;
          }

          .report-section {
            width: 100% !important;
            padding: 1cm !important;
            margin: 0 !important;
            background: white !important;
            box-shadow: none !important;
            border-radius: 0 !important;
          }

          .section-header {
            page-break-after: avoid;
            break-after: avoid;
            margin-bottom: 0.5cm !important;
          }

          .section-header h2 {
            page-break-after: avoid;
            break-after: avoid;
          }

          .chart-container {
            page-break-inside: avoid;
            break-inside: avoid;
            width: 100% !important;
            overflow: visible !important;
            position: static !important;
          }

          .recharts-wrapper,
          .recharts-surface {
            overflow: visible !important;
            position: static !important;
          }

          body {
            font-size: 11pt !important;
            line-height: 1.4 !important;
          }

          h1 {
            font-size: 28pt !important;
          }

          h2 {
            font-size: 20pt !important;
          }

          h3 {
            font-size: 16pt !important;
          }

          .grid {
            display: block !important;
          }

          .grid > * {
            page-break-inside: avoid;
            break-inside: avoid;
            margin-bottom: 0.5cm;
          }

          p, li {
            orphans: 3;
            widows: 3;
          }

          * {
            print-color-adjust: exact !important;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
        }
      `}</style>
    </div>
  );
}

function BalanceScorecardChart() {
  const { t } = useTranslation();
  const { goalCateoryCount } = useGoalCategoryCountRouteData();

  const data = [
    {
      category: t('financial') || 'Financial',
      value: goalCateoryCount.Financial?.financial?.value || 0,
      max: goalCateoryCount.Financial?.financial?.valueMax || 100,
      percentage: ((goalCateoryCount.Financial?.financial?.value || 0) / (goalCateoryCount.Financial?.financial?.valueMax || 100)) * 100,
    },
    {
      category: t('humanRelationship') || 'Human Relations',
      value: goalCateoryCount.Human?.Human?.value || 0,
      max: goalCateoryCount.Human?.Human?.valueMax || 100,
      percentage: ((goalCateoryCount.Human?.Human?.value || 0) / (goalCateoryCount.Human?.Human?.valueMax || 100)) * 100,
    },
    {
      category: t('processAndInnovation') || 'Innovation',
      value: goalCateoryCount.Inovation?.Innovation?.value || 0,
      max: goalCateoryCount.Inovation?.Innovation?.valueMax || 100,
      percentage: ((goalCateoryCount.Inovation?.Innovation?.value || 0) / (goalCateoryCount.Inovation?.Innovation?.valueMax || 100)) * 100,
    },
    {
      category: t('customerCentred') || 'Customer',
      value: goalCateoryCount.Customer?.Customer?.value || 0,
      max: goalCateoryCount.Customer?.Customer?.valueMax || 100,
      percentage: ((goalCateoryCount.Customer?.Customer?.value || 0) / (goalCateoryCount.Customer?.Customer?.valueMax || 100)) * 100,
    },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="flex flex-col space-y-8">
      <div>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data} margin={{ left: 20, right: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" angle={-45} textAnchor="end" height={80} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#08397e" name="Achieved" />
            <Bar dataKey="max" fill="#e0e0e0" name="Target" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart margin={{ left: 20, right: 20 }}>
            <Pie
              data={data}
              dataKey="percentage"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label={(entry) => `${entry.category}: ${entry.percentage.toFixed(1)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-4 gap-2 mt-2">
        {data.map((item, index) => (
          <div key={index} className="bg-white p-2 rounded-lg border border-gray-200 shadow-sm">
            <h4 className="text-sm font-semibold text-gray-600 mb-1">{item.category}</h4>
            <p className="text-lg font-bold text-gray-900">{item.value} / {item.max}</p>
            <p className="text-xs text-gray-500 mt-1">{item.percentage.toFixed(1)}% Complete</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrganizationPerformanceChart() {
  const { t } = useTranslation();
  const { organizationalChart } = useOrganizationalAveragePerMonthChartRouteData();

  return (
    <div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={organizationalChart} margin={{ left: 20, right: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="average_performance" fill="#08397e" name={t('averagePerformance') || 'Average Performance'} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function AchievedGoalsChart() {
  const { t } = useTranslation();
  const { goalStatus } = useGoalStatus();
  const { Completed = 0, Total = 100 } = goalStatus;
  const percentage = Total > 0 ? ((Completed / Total) * 100).toFixed(1) : 0;

  return (
    <div className="text-center">
      <h3 className="text-xl font-bold text-green-700 mb-4">{t('completed') || 'Completed Goals'}</h3>
      <div className="relative inline-block mx-4">
        <svg width="200" height="200" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="80" fill="none" stroke="#e0e0e0" strokeWidth="20" />
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="#22c55e"
            strokeWidth="20"
            strokeDasharray={`${(percentage / 100) * 502.65} 502.65`}
            transform="rotate(-90 100 100)"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-gray-900">{Completed}</span>
          <span className="text-sm text-gray-600">/ {Total}</span>
        </div>
      </div>
      <p className="text-lg font-semibold text-green-600 mt-4">{percentage}% Complete</p>
    </div>
  );
}

function PartiallyAchievedGoalsChart() {
  const { t } = useTranslation();
  const { goalStatus } = useGoalStatus();
  const { InProgress = 0, Total = 100 } = goalStatus;
  const percentage = Total > 0 ? ((InProgress / Total) * 100).toFixed(1) : 0;

  return (
    <div className="text-center">
      <h3 className="text-xl font-bold text-yellow-700 mb-4">{t('inProgress') || 'In Progress'}</h3>
      <div className="relative inline-block mx-4">
        <svg width="200" height="200" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="80" fill="none" stroke="#e0e0e0" strokeWidth="20" />
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="#eab308"
            strokeWidth="20"
            strokeDasharray={`${(percentage / 100) * 502.65} 502.65`}
            transform="rotate(-90 100 100)"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-gray-900">{InProgress}</span>
          <span className="text-sm text-gray-600">/ {Total}</span>
        </div>
      </div>
      <p className="text-lg font-semibold text-yellow-600 mt-4">{percentage}% In Progress</p>
    </div>
  );
}

function NotAchievedGoalsChart() {
  const { t } = useTranslation();
  const { goalStatus } = useGoalStatus();
  const { NotStarted = 0, Total = 100 } = goalStatus;
  const percentage = Total > 0 ? ((NotStarted / Total) * 100).toFixed(1) : 0;

  return (
    <div className="text-center">
      <h3 className="text-xl font-bold text-red-700 mb-4">{t('notStarted') || 'Not Started'}</h3>
      <div className="relative inline-block mx-4">
        <svg width="200" height="200" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="80" fill="none" stroke="#e0e0e0" strokeWidth="20" />
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="#ef4444"
            strokeWidth="20"
            strokeDasharray={`${(percentage / 100) * 502.65} 502.65`}
            transform="rotate(-90 100 100)"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-gray-900">{NotStarted}</span>
          <span className="text-sm text-gray-600">/ {Total}</span>
        </div>
      </div>
      <p className="text-lg font-semibold text-red-600 mt-4">{percentage}% Not Started</p>
    </div>
  );
}

function ComparativeTrendsChart() {
  const { t } = useTranslation();
  const { trends } = useAchievedGoalsData();

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const transformedTrends = months.map((month) => {
    const row = { month };
    if (trends) {
      for (const category in trends) {
        const found = trends[category]?.find((item) => item.month === month);
        row[category] = found ? found.average_performance : 0;
      }
    }
    return row;
  });

  const colors = {
    'financial': '#8884d8',
    'innovation': '#82ca9d',
    'customer centred': '#ffc658',
    'human relationship': '#ff8042'
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={transformedTrends} margin={{ left: 20, right: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis domain={[0, 100]} />
        <Tooltip />
        <Legend />
        {Object.keys(trends || {}).map((category) => (
          <Line
            key={category}
            type="monotone"
            dataKey={category}
            stroke={colors[category] || "#8884d8"}
            name={t(category) || category}
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

function FinancialTrendsChart() {
  const { t } = useTranslation();
  const { trends } = useAchievedGoalsData();
  const trendsData = trends?.financial || [];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={trendsData} margin={{ left: 20, right: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis domain={[0, 100]} />
        <Tooltip />
        <Legend />
        <Bar dataKey="average_performance" fill="#08397e" name={t('financialPerformance') || 'Financial Performance'} />
      </BarChart>
    </ResponsiveContainer>
  );
}

function InnovationTrendsChart() {
  const { t } = useTranslation();
  const { trends } = useAchievedGoalsData();
  const innovationData = trends?.innovation || [];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={innovationData} margin={{ left: 20, right: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis domain={[0, 100]} />
        <Tooltip />
        <Legend />
        <Bar dataKey="average_performance" fill="#10b981" name={t('innovationPerformance') || 'Innovation Performance'} />
      </BarChart>
    </ResponsiveContainer>
  );
}