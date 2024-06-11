"use client";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Gauge, gaugeClasses } from "@mui/x-charts";
import { IoIosTime } from "react-icons/io";
import { FcComboChart, FcBarChart } from "react-icons/fc";
import {
  useGeneralPerformanceChartRouteData,
  useOrganizationalChartRouteData,
  usePerformanceMatrixChartRouteData,
} from "../api/databook/route-data";
import { DataDateAccess } from "./infocards";

export function OrganizationPerformanceDashboard() {
  const { organizationalChart, error } = useOrganizationalChartRouteData();
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className=" p-7 mt-5 pt-5 bg-gray-200 shadow-lg shadow-blue-200 rounded-lg">
      <div className="flex justify-between">
        <h3 className="text-lg font-bold pb-4 text-black">
          DEPARTMENTAL AVERAGE
        </h3>
        <span className="flex items-center">
          <FcBarChart />
        </span>
      </div>
      <DataDateAccess />
      <ResponsiveContainer height={355}>
        <LineChart
          data={organizationalChart}
          interval={0}
          angle={-45}
          textAnchor="end">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="departmentName"
            interval={0}
            angle={-45}
            textAnchor="end"
          />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="average"
            stroke="#8884d8"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
      <hr className="h-px my-6 border-0 dark:bg-gray-700" />
      <div className="mt-4 flex items-center">
        <IoIosTime />
        <span className="ml-2">last updated</span>
      </div>
    </div>
  );
}

export function PerformanceMatrixDashboard() {
  const { performanceMatrixChart, error } =
    usePerformanceMatrixChartRouteData();
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="p-7 mt-5  pt-5  bg-gray-200 shadow-lg shadow-blue-200 rounded-lg">
      <div className="flex justify-between">
        <h3 className="text-lg font-bold pb-4 text-black">
          PERFORMANCE MATRIX
        </h3>
        <span className="flex items-center">
          <FcComboChart />
        </span>
      </div>
      <DataDateAccess />
      <ResponsiveContainer height={340}>
        <ComposedChart data={performanceMatrixChart}>
          <YAxis />
          <Tooltip />
          <XAxis dataKey="departmentName" />
          <Bar dataKey="achieved" fill="rgb(22 163 74)" />
          <Bar dataKey="partiallyAchieved" fill="rgb(202 138 4)" />
          <Line dataKey="notAchieved" stroke="rgb(239 68 68)" fill="red" />
        </ComposedChart>
      </ResponsiveContainer>
      <hr className="h-px my-6 border-0 dark:bg-gray-700" />
      <div className="mt-4 flex items-center">
        <IoIosTime />
        <span className="ml-2">last updated</span>
      </div>
    </div>
  );
}

export function GeneralPerformanceDashboard() {
  const { generalPerformance, error } = useGeneralPerformanceChartRouteData();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div className="p-7 mt-5  pt-5  bg-gray-200 shadow-lg shadow-blue-200 rounded-lg">
        <div className="text-lg font-bold pb-4 text-black">
          General Performance
        </div>
        <div className="flex items-center">
          <Gauge
            value={generalPerformance}
            height={355}
            cx="50%"
            cy="50%"
            startAngle={-110}
            endAngle={110}
            innerRadius={90}
            outerRadius={120}
            fill="#8884d8"
            datakey="overallAverage"
            sx={(theme) => ({
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 40,
              },
              [`& .${gaugeClasses.valueArc}`]: {
                fill: "#52b202",
              },
              [`& .${gaugeClasses.referenceArc}`]: {
                fill: theme.palette.text.disabled,
              },
            })}
            text={({ value }) => `${value}%`}
          />
        </div>
        <hr className="h-px my-6 border-0 dark:bg-gray-700" />
        <div className="mt-4 flex items-center">
          <IoIosTime />
          <span className="ml-2">last updated</span>
        </div>
      </div>
    </div>
  );
}

export function ProgressLineChat() {
  const { performanceMatrixChart, error } =
    usePerformanceMatrixChartRouteData();
  return (
    <div className="p-3 card">
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-4" />
        <div className="flex flex-row">
          <section className="m-2">
            <p>Years</p>
          </section>
          <select>
            <option>2024</option>
            <option>2025</option>
          </select>
        </div>
      </div>
      <ResponsiveContainer height={200}>
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

export function InProgressVsCompleted() {
  const { performanceMatrixChart, error } =
    usePerformanceMatrixChartRouteData();
  return (
    <div className=" items-center flex flex-col px-4 pb-5">
      <h3 className="pb-3">
        <span style={{ color: "#cc23b3" }}>Completed </span>Vs{" "}
        <span style={{ color: "#2394cc" }}>Uncompleted</span>
      </h3>
      <ResponsiveContainer height={180}>
        <PieChart>
          <Pie
            data={performanceMatrixChart}
            dataKey="achieved"
            outerRadius={85}
            innerRadius={50}
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
