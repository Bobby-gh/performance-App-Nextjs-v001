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
} from "recharts";
import { Gauge, gaugeClasses, BarChart as MuiBarchart } from "@mui/x-charts";
import { IoIosTime } from "react-icons/io";
import {
  useGeneralPerformanceChartRouteData,
  useGoalStatus,
  useOrganizationalAveragePerMonthChartRouteData,
  usePerformanceMatrixChartRouteData,
} from "../api/databook/route-data";
import { DataDateAccess } from "./infocards";
import { StarOutline, StarSharp } from "@mui/icons-material";

export function OrganizationPerformanceDashboard() {
  const { organizationalChart } =
    useOrganizationalAveragePerMonthChartRouteData();

  return (
    <div className=" p-7 bg-white rounded-lg">
      <div className="flex justify-between">
        <h3 className="text-lg font-bold text-black">AVERAGE PERFORMANCE</h3>
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
        <span className="ml-2">last updated</span>
      </div>
    </div>
  );
}

export function PerformanceMatrixDashboard() {
  const { performanceMatrixChart } = usePerformanceMatrixChartRouteData();

  return (
    <div className="p-7 bg-gray-200 rounded-lg">
      <div className="flex justify-between">
        <h3 className="text-lg font-bold text-black">PERFORMANCE MATRIX</h3>
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
        <span className="ml-2">last updated</span>
      </div>
    </div>
  );
}

export function GeneralPerformanceDashboard() {
  const { generalPerformance } = useGeneralPerformanceChartRouteData();

  return (
    <div>
      <div className="p-7 bg-white rounded-lg">
        <div className="text-lg font-bold pb-8 text-black">
          General Performance
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
          <span className="ml-2">last updated</span>
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

export function InProgressVsCompleted() {
  const { goalStatus } = useGoalStatus();
  console.log({ completedvrsuncompleted: goalStatus });
  return (
    <div className=" items-center flex flex-col px-4 pb-5">
      <h3 className="pb-3">
        <span style={{ color: "#cc23b3" }}>Completed </span>Vs{" "}
        <span style={{ color: "#4B5563" }}>In progress </span>Vs{" "}
        <span style={{ color: "#2394cc" }}>Not Started</span>
      </h3>
      <ResponsiveContainer height={180}>
        <PieChart>
          <Pie
            data={goalStatus}
            dataKey="value"
            outerRadius={85}
            innerRadius={50}
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function FinancialGoal() {
  const { generalPerformance } = useGeneralPerformanceChartRouteData();

  return (
    <div>
      <div className="p-4 bg-white rounded-lg">
        <div className="text-md font-bold text-black">Financial Goal</div>
        <div>
          <Gauge
            value={80}
            height={230}
            cx="50%"
            cy="60%"
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
  const { generalPerformance } = useGeneralPerformanceChartRouteData();

  return (
    <div>
      <div className="p-4 bg-white rounded-lg">
        <div className="text-md font-bold text-black">Human Resource Goal</div>
        <div>
          <Gauge
            value={80}
            height={230}
            cx="50%"
            cy="60%"
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
  const { generalPerformance } = useGeneralPerformanceChartRouteData();

  return (
    <div>
      <div className="p-4 bg-white rounded-lg">
        <div className="text-md font-bold text-black">Process and Innovation</div>
        <div>
          <Gauge
            value={80}
            height={230}
            cx="50%"
            cy="60%"
            startAngle={-110}
            endAngle={110}
            innerRadius={80}
            outerRadius={110}
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

export function CustomerCentricGoal() {
  const { generalPerformance } = useGeneralPerformanceChartRouteData();

  return (
    <div>
      <div className="p-4 bg-white rounded-lg">
        <div className="text-md font-bold text-black">
          Customer Centric Goal
        </div>
        <div>
          <Gauge
            value={80}
            height={230}
            cx="50%"
            cy="60%"
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

export function AchievedGoalChart() {
  const { generalPerformance } = useGeneralPerformanceChartRouteData();

  return (
    <div>
      <div className="p-4 bg-white rounded-lg">
        <div className="text-lg font-bold text-black">Completed Goals</div>
        <div className="flex items-center justify-center">
          <Gauge
            value={40}
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
  const { generalPerformance } = useGeneralPerformanceChartRouteData();

  return (
    <div>
      <div className="p-4 bg-white rounded-lg">
        <div className="text-lg font-bold text-black">
          In Progress
        </div>
        <div className="flex items-center justify-center">
          <Gauge
            value={30}
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
  const { generalPerformance } = useGeneralPerformanceChartRouteData();

  return (
    <div>
      <div className="p-4 bg-white rounded-lg">
        <div className="text-lg font-bold text-black">Not Completed</div>
        <div className="flex items-center justify-center">
          <Gauge
            value={60}
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
  const { organizationalChart } =
    useOrganizationalAveragePerMonthChartRouteData();

  return (
    <div className=" p-7 bg-white rounded-lg">
      <div className="flex justify-between">
        <h3 className="text-lg font-bold text-black">General Performance</h3>
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

export function BadgesReport() {


  return (
    <div className=" p-7 bg-white rounded-lg flex flex-rows">
      <img height={50} src="https://th.bing.com/th/id/OIP.PfpDK33DpPJ0nu2MeuJo8AHaHa?w=250&h=188&c=7&r=0&o=5&dpr=1.3&pid=1.7"/>
      <div className="flex flex-col space-y-8">
        <div className="flex flex-rows items-center"><StarSharp style={{fill: "gold", fontSize:'40px'}} /> <p className="pl-4">Number of Outstanding Employees</p><p className="pl-4">23</p></div>
        <div className="flex flex-rows items-center"><StarSharp style={{fill: "#cd7f32",fontSize: '38px'}} /> <p className="pl-4">Number of Outstanding Employees</p><p className="pl-4">23</p></div>
        <div className="flex flex-rows items-center"><StarSharp style={{fill: "#c0c0c0",fontSize: '36px'}} /> <p className="pl-4">Number of Outstanding Employees</p><p className="pl-4">23</p></div>
      </div>
    </div>
  );
}

