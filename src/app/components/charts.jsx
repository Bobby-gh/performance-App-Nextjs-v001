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
