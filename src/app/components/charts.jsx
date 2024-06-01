"use client";
import {
  Bar,
  BarChart,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Gauge, gaugeClasses } from "@mui/x-charts";
import { IoIosTime } from "react-icons/io";
import { FcComboChart, FcBarChart } from "react-icons/fc";
import { GetDepartmentGoalRouteData, } from "../api/databook/route-data";

export function OrganizationPerformanceDashboard() {
  const data = "hi"

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  return (
    <div className=" p-7 mt-5 pt-5 bg-gray-200 shadow-lg shadow-blue-200 rounded-lg">
      <div className="flex justify-between">
        <h3 className="text-lg font-bold pb-4 text-black">
          ORGANIZATIONAL PERFORMANCE
        </h3>
        <span className="flex items-center">
          <FcBarChart />
        </span>
      </div>
      <ResponsiveContainer height={355}>
        <BarChart>
          <Legend iconType="circle" iconSize="6" align="left" />
          <Tooltip />
          <YAxis />
          <XAxis datakey="departmentName" />
          <Bar datakey="average" />
        </BarChart>
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
      <ResponsiveContainer height={340}>
        <ComposedChart>
          <YAxis />
          <Legend iconType="circle" iconSize="6" align="left" />
          <Tooltip />
          <XAxis datakey="departmentName" />
          <Bar datakey="achieved" fill="rgb(22 163 74)" />
          <Bar datakey="partiallyAchieved" fill="rgb(202 138 4)" />
          <Line datakey="notAchieved" stroke="rgb(239 68 68)" fill="" />
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
  return (
    <div>
      <div className="p-7 mt-5  pt-5  bg-gray-200 shadow-lg shadow-blue-200 rounded-lg">
        <div className="text-lg font-bold pb-4 text-black">
          General Performance
        </div>
        <div className="flex items-center">
          <Gauge
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
