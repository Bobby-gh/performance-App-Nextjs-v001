"use client";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  LineChart,
  Line,
  ReferenceLine,
} from "recharts";
import { Gauge, gaugeClasses, BarChart as MuiBarchart } from "@mui/x-charts";
import { IoIosTime } from "react-icons/io";
import {
  useGeneralPerformanceChartRouteData,
  useGoalCategoryCountRouteData,
  useGoalStatus,
  useOrganizationalAveragePerMonthChartRouteData,
  usePerformanceMatrixChartRouteData,
  useGoalCountRouteData,
  useMyGoalBadgesData,
  useAchievedGoalsData,
} from "../api/databook/route-data";
import { DataDateAccess } from "./infocards";
import { StarOutline, StarSharp } from "@mui/icons-material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { TrendingUp, TrendingDown } from 'lucide-react';



export function OrganizationPerformanceDashboard() {
  const { t } = useTranslation();
  const { organizationalChart } =
    useOrganizationalAveragePerMonthChartRouteData();

  return (
    <div className=" p-7 bg-white rounded-lg">
      <div className="flex justify-between">
        <h3 className="text-lg font-bold text-black">
          {t("averagePerformance")}
        </h3>
        <span className="flex items-center">
          <DataDateAccess />
        </span>
      </div>
      <ResponsiveContainer height={250}>
        <BarChart data={organizationalChart}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="average_performance" fill="#08397e" />
        </BarChart>
      </ResponsiveContainer>
      <hr className="h-px my-6 border-0 dark:bg-gray-700" />
      <div className="mt-4 flex items-center">
        <IoIosTime />
        <span className="ml-2">{t("lastUpdated")}</span>
      </div>
    </div>
  );
}

export function PerformanceMatrixDashboard() {
  const { t } = useTranslation();
  const { performanceMatrixChart } = usePerformanceMatrixChartRouteData();

  return (
    <div className="p-7 bg-gray-200 rounded-lg">
      <div className="flex justify-between">
        <h3 className="text-lg font-bold text-black">
          {t("performanceMatrix")}
        </h3>
        <span className="flex items-center">
          <DataDateAccess />
        </span>
      </div>
      <ResponsiveContainer>
        <ComposedChart data={performanceMatrixChart}>
          <YAxis />
          <Tooltip />
          <XAxis dataKey="departmentName" />
          <Bar dataKey="achieved" fill="rgb(20 83 45)" />
          <Bar dataKey="partiallyAchieved" fill="rgb(234 179 8)" />
          <Bar dataKey="notAchieved" stroke="rgb(127 29 29)" fill="red" />
        </ComposedChart>
      </ResponsiveContainer>
      <hr className="h-px my-6 border-0 dark:bg-gray-700" />
      <div className="mt-4 flex items-center">
        <IoIosTime />
        <span className="ml-2">{t("lastUpdated")}</span>
      </div>
    </div>
  );
}

export function GeneralPerformanceDashboard() {
  const { t } = useTranslation();
  const { generalPerformance } = useGeneralPerformanceChartRouteData();

  return (
    <div>
      <div className="p-7 bg-white rounded-lg">
        <div className="text-lg font-bold pb-8 text-black">
          {t("generalPerformance")}
        </div>
        <div className="flex items-center justify-center">
          <Gauge
            value={generalPerformance}
            height={300}
            cx="50%"
            cy="55%"
            startAngle={-110}
            endAngle={110}
            innerRadius={90}
            outerRadius={120}
            fill="#08397e"
            datakey="overallAverage"
            sx={(theme) => ({
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 40,
              },
              [`& .${gaugeClasses.valueArc}`]: {
                fill: "#08397e",
              },
              [`& .${gaugeClasses.referenceArc}`]: {
                fill: theme.palette.text.disabled,
              },
            })}
            text={({ value }) => `${value}%`}
          />
        </div>
        <hr className="h-px my-4 border-0 dark:bg-gray-700" />
        <div className="mt-4 flex items-center">
          <IoIosTime />
          <span className="ml-2">{t("lastUpdated")}</span>
        </div>
      </div>
    </div>
  );
}

export function ProgressBarChat() {
  const { performanceMatrixChart } = usePerformanceMatrixChartRouteData();
  return (
    <div className="p-3 card bg-white rounded-lg">
      <span className="flex items-center">
        <DataDateAccess />
      </span>
      <ResponsiveContainer height={300}>
        <BarChart data={performanceMatrixChart}>
          <YAxis />
          <Tooltip />
          <XAxis dataKey="departmentName" />
          <Bar dataKey="achieved" fill="rgb(22 163 74)" />
          <Bar dataKey="notAchieved" fill="rgb(239 68 68)" />
          <Bar dataKey="partiallyAchieved" fill="rgb(202 138 4)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function EmployeePerformance() {
  const { badges } = useMyGoalBadgesData();
  console.log({ completedvrsuncompleted: badges });
  return (
    <div className=" items-center flex flex-col px-4 pb-5">
      <ResponsiveContainer height={250}>
        <PieChart>
          <Pie
            data={badges.ratingsPie}
            dataKey="value"
            outerRadius={115}
            innerRadius={70}
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function FinancialGoal() {
  const { t } = useTranslation();
  const { goalCateoryCount } = useGoalCategoryCountRouteData();
  const value = goalCateoryCount.Financial?.financial?.value;
  const valueMax = goalCateoryCount.Financial?.financial?.valueMax;

  console.log(goalCateoryCount);

  return (
    <div>
      <div className="p-4 bg-white rounded-lg">
        <div className="text-md font-bold text-black ">{t("financial")} </div>
        <div className="w-full flex justify-center">
          <Gauge
            valueMax={valueMax}
            value={value}
            width={300}
            height={230}
            cx="50%"
            cy="60%"
            startAngle={-110}
            endAngle={110}
            innerRadius="75%"
            outerRadius="100%"
            fill="#08397e"
            datakey="overallAverage"
            sx={(theme) => ({
              width: '100%',
              maxWidth: '300px',
              minHeight: '200px', // Ensures minimum size
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 'clamp(20px, 4vw, 30px)', // Responsive font size
              },
              [`& .${gaugeClasses.valueArc}`]: {
                fill: "#08397e",
              },
              [`& .${gaugeClasses.referenceArc}`]: {
                fill: theme.palette.text.disabled,
              },
            })}
            text={({ value, valueMax }) => `${value} / ${valueMax}`}
          />
        </div>
      </div>
    </div>
  );
}

export function HumanResourceGoal() {
  const { t } = useTranslation();
  const { goalCateoryCount } = useGoalCategoryCountRouteData();
  const value = goalCateoryCount.Human?.Human?.value;
  const valueMax = goalCateoryCount.Human?.Human?.valueMax;

  return (
    <div>
      <div className="p-4 bg-white rounded-lg">
        <div className="text-md font-bold text-black">
          {t("humanRelationship")}
        </div>
        <div className="w-full flex justify-center">
          <Gauge
            valueMax={valueMax}
            value={value}
            width={300}
            height={230}
            cx="50%"
            cy="60%"
            startAngle={-110}
            endAngle={110}
            innerRadius="75%"
            outerRadius="100%"
            fill="#08397e"
            datakey="overallAverage"
            sx={(theme) => ({
              width: '100%',
              maxWidth: '300px',
              minHeight: '200px', // Ensures minimum size
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 'clamp(20px, 4vw, 30px)', // Responsive font size
              },
              [`& .${gaugeClasses.valueArc}`]: {
                fill: "#08397e",
              },
              [`& .${gaugeClasses.referenceArc}`]: {
                fill: theme.palette.text.disabled,
              },
            })}
            text={({ value, valueMax }) => `${value} / ${valueMax}`}
          />
        </div>
      </div>
    </div>
  );
}

export function InternalProcessandInnovation() {
  const { t } = useTranslation();
  const { goalCateoryCount } = useGoalCategoryCountRouteData();
  const value = goalCateoryCount.Inovation?.Innovation?.value;
  const valueMax = goalCateoryCount.Inovation?.Innovation?.valueMax;

  return (
    <div>
      <div className="p-4 bg-white rounded-lg">
        <div className="text-md font-bold text-black">
          {t("processAndInnovation")}
        </div>
        <div className="w-full flex justify-center">
          <Gauge
            valueMax={valueMax}
            value={value}
            width={300}
            height={230}
            cx="50%"
            cy="60%"
            startAngle={-110}
            endAngle={110}
            innerRadius="75%"
            outerRadius="100%"
            fill="#08397e"
            datakey="overallAverage"
            sx={(theme) => ({
              width: '100%',
              maxWidth: '300px',
              minHeight: '200px', // Ensures minimum size
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 'clamp(20px, 4vw, 30px)', // Responsive font size
              },
              [`& .${gaugeClasses.valueArc}`]: {
                fill: "#08397e",
              },
              [`& .${gaugeClasses.referenceArc}`]: {
                fill: theme.palette.text.disabled,
              },
            })}
            text={({ value, valueMax }) => `${value} / ${valueMax}`}
          />
        </div>
      </div>
    </div>
  );
}

export function CustomerCentricGoal() {
  const { t } = useTranslation();
  const { goalCateoryCount } = useGoalCategoryCountRouteData();
  const value = goalCateoryCount.Customer?.Customer?.value;
  const valueMax = goalCateoryCount.Customer?.Customer?.valueMax;

  return (
    <div>
      <div className="p-4 bg-white rounded-lg">
        <div className="text-md font-bold text-black">
          {t("customerCentred")}
        </div>
        <div className="w-full flex justify-center">
          <Gauge
            valueMax={valueMax}
            value={value}
            width={300}
            height={230}
            cx="50%"
            cy="60%"
            startAngle={-110}
            endAngle={110}
            innerRadius="75%"
            outerRadius="100%"
            fill="#08397e"
            datakey="overallAverage"
            sx={(theme) => ({
              width: '100%',
              maxWidth: '300px',
              minHeight: '200px', // Ensures minimum size
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 'clamp(20px, 4vw, 30px)', // Responsive font size
              },
              [`& .${gaugeClasses.valueArc}`]: {
                fill: "#08397e",
              },
              [`& .${gaugeClasses.referenceArc}`]: {
                fill: theme.palette.text.disabled,
              },
            })}
            text={({ value, valueMax }) => `${value} / ${valueMax}`}
          />
        </div>
      </div>
    </div>
  );
}

export function AchievedGoalChart() {
  //for all the goals achieved within the system

  const { t } = useTranslation();
  const { goalStatus } = useGoalStatus();
  const { Completed, Total } = goalStatus;

  return (
    <div>
      <div className="p-4 bg-white rounded-lg">
        <div className="text-lg font-bold text-black">{t("completed")}</div>
        <div className="flex items-center justify-center">
          <Gauge
            valueMax={Total}
            value={Completed}
            height={250}
            cx="50%"
            cy="65%"
            startAngle={-110}
            endAngle={110}
            innerRadius={90}
            outerRadius={120}
            fill="#08397e"
            datakey="overallAverage"
            sx={(theme) => ({
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 30,
              },
              [`& .${gaugeClasses.valueArc}`]: {
                fill: "green",
              },
              [`& .${gaugeClasses.referenceArc}`]: {
                fill: theme.palette.text.disabled,
              },
            })}
            text={({ value, valueMax }) => `${value} / ${valueMax}`}
          />
        </div>
      </div>
    </div>
  );
}

export function PartiallyAchievedChart() {
  const { t } = useTranslation();
  const { goalStatus } = useGoalStatus();
  const { InProgress, Total } = goalStatus;

  return (
    <div>
      <div className="p-4 bg-white rounded-lg">
        <div className="text-lg font-bold text-black">{t("inProgress")}</div>
        <div className="flex items-center justify-center">
          <Gauge
            valueMax={Total}
            value={InProgress}
            height={250}
            cx="50%"
            cy="65%"
            startAngle={-110}
            endAngle={110}
            innerRadius={90}
            outerRadius={120}
            fill="#08397e"
            datakey="overallAverage"
            sx={(theme) => ({
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 30,
              },
              [`& .${gaugeClasses.valueArc}`]: {
                fill: "yellow",
              },
              [`& .${gaugeClasses.referenceArc}`]: {
                fill: theme.palette.text.disabled,
              },
            })}
            text={({ value, valueMax }) => `${value} / ${valueMax}`}
          />
        </div>
      </div>
    </div>
  );
}

export function NotAchievedChart() {
  const { t } = useTranslation();
  const { goalStatus } = useGoalStatus();
  const { NotStarted, Total } = goalStatus;

  return (
    <div>
      <div className="p-4 bg-white rounded-lg">
        <div className="text-lg font-bold text-black">{t("notStarted")}</div>
        <div className="flex items-center justify-center">
          <Gauge
            valueMax={Total}
            value={NotStarted}
            height={250}
            cx="50%"
            cy="65%"
            startAngle={-110}
            endAngle={110}
            innerRadius={90}
            outerRadius={120}
            fill="#08397e"
            datakey="overallAverage"
            sx={(theme) => ({
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 30,
              },
              [`& .${gaugeClasses.valueArc}`]: {
                fill: "red",
              },
              [`& .${gaugeClasses.referenceArc}`]: {
                fill: theme.palette.text.disabled,
              },
            })}
            text={({ value, valueMax }) => `${value} / ${valueMax}`}
          />
        </div>
      </div>
    </div>
  );
}

//target achieved implementation

export default function TargetAchievementChart() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Dummy data - 12 months
  const data = [
    { month: 'Jan', target: 100, achievement: 85 },
    { month: 'Feb', target: 100, achievement: 95 },
    { month: 'Mar', target: 100, achievement: 110 },
    { month: 'Apr', target: 100, achievement: 105 },
    { month: 'May', target: 100, achievement: 92 },
    { month: 'Jun', target: 100, achievement: 115 },
    { month: 'Jul', target: 100, achievement: 108 },
    { month: 'Aug', target: 100, achievement: 98 },
    { month: 'Sep', target: 100, achievement: 120 },
    { month: 'Oct', target: 100, achievement: 112 },
    { month: 'Nov', target: 100, achievement: 125 },
    { month: 'Dec', target: 100, achievement: 118 },
  ];

  const maxValue = 130;
  const minValue = 80;
  const chartHeight = 300;
  const chartWidth = 800;
  const padding = { top: 20, right: 40, bottom: 40, left: 40 };

  const scaleY = (value) => {
    return chartHeight - padding.bottom - ((value - minValue) / (maxValue - minValue)) * (chartHeight - padding.top - padding.bottom);
  };

  const scaleX = (index) => {
    return padding.left + (index / (data.length - 1)) * (chartWidth - padding.left - padding.right);
  };

  const targetPath = data.map((d, i) => 
    `${i === 0 ? 'M' : 'L'} ${scaleX(i)},${scaleY(d.target)}`
  ).join(' ');

  const achievementPath = data.map((d, i) => 
    `${i === 0 ? 'M' : 'L'} ${scaleX(i)},${scaleY(d.achievement)}`
  ).join(' ');

  const avgAchievement = Math.round(data.reduce((sum, d) => sum + d.achievement, 0) / data.length);
  const performance = avgAchievement - 100;

  const hoveredData = hoveredIndex !== null ? data[hoveredIndex] : null;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Target vs Achievement</h3>
        <p className="text-sm text-gray-500">Monthly performance comparison</p>
      </div>

      <div className="relative">
        {/* Tooltip */}
        {hoveredData && (
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10 bg-white p-3 rounded-lg shadow-lg border border-gray-200 text-sm">
            <p className="font-semibold text-gray-700 mb-2">{hoveredData.month}</p>
            <div className="space-y-1">
              <p><span className="text-purple-600 font-medium">Target:</span> {hoveredData.target}</p>
              <p><span className="text-blue-600 font-medium">Achievement:</span> {hoveredData.achievement}</p>
              <p className={`font-semibold ${hoveredData.achievement >= hoveredData.target ? 'text-green-600' : 'text-red-600'}`}>
                {hoveredData.achievement >= hoveredData.target ? '↑' : '↓'} {Math.abs(hoveredData.achievement - hoveredData.target)} ({hoveredData.achievement >= hoveredData.target ? 'Above' : 'Below'})
              </p>
            </div>
          </div>
        )}

        <svg width="100%" height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="overflow-visible">
          {/* Grid lines */}
          {[80, 90, 100, 110, 120, 130].map((value) => (
            <g key={value}>
              <line
                x1={padding.left}
                y1={scaleY(value)}
                x2={chartWidth - padding.right}
                y2={scaleY(value)}
                stroke="#f0f0f0"
                strokeWidth="1"
              />
              <text
                x={padding.left - 10}
                y={scaleY(value) + 4}
                textAnchor="end"
                fontSize="12"
                fill="#9ca3af"
              >
                {value}
              </text>
            </g>
          ))}

          {/* Target line (dashed) */}
          <path
            d={targetPath}
            fill="none"
            stroke="#9333ea"
            strokeWidth="3"
            strokeDasharray="8 4"
          />

          {/* Achievement line (solid) */}
          <path
            d={achievementPath}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
          />

          {/* Data points and labels */}
          {data.map((d, i) => {
            const x = scaleX(i);
            const yTarget = scaleY(d.target);
            const yAchievement = scaleY(d.achievement);
            const isHovered = hoveredIndex === i;

            return (
              <g key={i}>
                {/* Target dot */}
                <circle
                  cx={x}
                  cy={yTarget}
                  r={isHovered ? 6 : 4}
                  fill="#9333ea"
                  className="transition-all cursor-pointer"
                />

                {/* Achievement dot */}
                <circle
                  cx={x}
                  cy={yAchievement}
                  r={isHovered ? 7 : 5}
                  fill="#3b82f6"
                  className="transition-all cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />

                {/* Month label */}
                <text
                  x={x}
                  y={chartHeight - padding.bottom + 20}
                  textAnchor="middle"
                  fontSize="12"
                  fill="#9ca3af"
                >
                  {d.month}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Legend */}
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-purple-600" style={{ borderTop: '3px dashed #9333ea' }}></div>
            <span className="text-sm text-gray-600">Target</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-blue-600"></div>
            <span className="text-sm text-gray-600">Achievement</span>
          </div>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-1">Avg Target</p>
          <p className="text-2xl font-bold text-purple-600">100</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-1">Avg Achievement</p>
          <p className="text-2xl font-bold text-blue-600">{avgAchievement}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-1">Performance</p>
          <p className={`text-2xl font-bold flex items-center justify-center gap-1 ${performance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {performance >= 0 ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
            {performance >= 0 ? '+' : ''}{performance}%
          </p>
        </div>
      </div>
    </div>
  );
}

export function OrganizationPerformanceReport() {
  const { t } = useTranslation();
  const { organizationalChart } =
    useOrganizationalAveragePerMonthChartRouteData();

  return (
    <div className=" p-7 bg-white rounded-lg">
      <div className="flex justify-between">
        <h3 className="text-lg font-bold text-black">
          {t("generalPerformance")}
        </h3>
        <span className="flex items-center">
          <DataDateAccess />
        </span>
      </div>
      <ResponsiveContainer height={250}>
        <BarChart data={organizationalChart}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="average_performance" fill="#08397e" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function FinancialTrendsReport() {
  const { t } = useTranslation();
  const { trends } = useAchievedGoalsData();
  const trendsData = trends?.financial;
  console.log({ trends: trends });

  return (
    <div className=" p-7 bg-white rounded-lg">
      <div className="flex justify-between">
        <h3 className="text-lg font-bold text-black">{t("financialTrends")}</h3>
        <span className="flex items-center">
          <DataDateAccess />
        </span>
      </div>
      <ResponsiveContainer height={250}>
        <BarChart data={trendsData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="average_performance" fill="#08397e" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function InnovationTrendsReport() {
  const { t } = useTranslation();
  const { trends } = useAchievedGoalsData();
  const innovationData = trends?.innovation;
  console.log({ trends: trends });

  return (
    <div className=" p-7 bg-white rounded-lg">
      <div className="flex justify-between">
        <h3 className="text-lg font-bold text-black">
          {t("innovationalTrends")}
        </h3>
        <span className="flex items-center">
          <DataDateAccess />
        </span>
      </div>
      <ResponsiveContainer height={250}>
        <BarChart data={innovationData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="average_performance" fill="#08397e" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ComparativeTrendsReport() {
  const { t } = useTranslation();
  const { trends } = useAchievedGoalsData();
  console.log({ trends: trends });

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const transformedTrends = months.map((month) => {
    const row = { month };

    if (trends) {
      for (const category in trends) {
        const found = trends[category].find((item) => item.month === month);
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
    <div className=" p-7 bg-white rounded-lg">
      <div className="flex justify-between">
        <h3 className="text-lg font-bold text-black">{t("organizationalTrends")}</h3>
        <span className="flex items-center">
          <DataDateAccess />
        </span>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={transformedTrends}>
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
              name={t(category)}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function BadgesReport() {
  const { t } = useTranslation();
  const { badges } = useMyGoalBadgesData();
  console.log({badges:badges})
  const Outstanding = badges.ratingsSummary?.Outstanding;
  const ExceedsExpectations = badges.ratingsSummary?.ExceedsExpectations;
  const MeetsExpectations = badges.ratingsSummary?.MeetsExpectations;
  return (
    <div className=" p-7 bg-white rounded-lg">
      <div className="border-l-4 px-4 border-blue-500 mb-6">
        <p className="font-bold text-blue-500">{t("topPerformerAward")}</p>
        <p>{t("awardsDescription")}</p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 flex items-center">
          <img
            height={40}
            src="https://th.bing.com/th/id/OIP.PfpDK33DpPJ0nu2MeuJo8AHaHa?w=250&h=188&c=7&r=0&o=5&dpr=1.3&pid=1.7"
          />
          <div className="flex flex-col space-y-8">
            <div className="flex flex-rows items-center">
              <p className="pl-24 text-yellow-500 font-bold">
                {t("goldBadges")}:
              </p>
              <p className="pl-4">{Outstanding}</p>
            </div>
            <div className="flex flex-rows items-center">
              <p className="pl-24 text-[#c0c0c0] font-medium">
                {t("silverBadges")}:
              </p>
              <p className="pl-4">{ExceedsExpectations}</p>
            </div>
            <div className="flex flex-rows items-center">
              <p className="pl-24 text-[#cd7f32] font-medium">
                {t("bronzeBadges")}:
              </p>
              <p className="pl-4">{MeetsExpectations}</p>
            </div>
          </div>
        </div>
        <div>
          <EmployeePerformance />
        </div>
      </div>
    </div>
  );
}
