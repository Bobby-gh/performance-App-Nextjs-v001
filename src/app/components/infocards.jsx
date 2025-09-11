"use client";
import {
  FaThumbsDown,
  FaTrophy,
  FaThumbsUp,
  FaRegSmileWink,
} from "react-icons/fa";
import { useGoalStatus } from "../api/databook/route-data";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { useContext, useState } from "react";
import {
  AuthContext,
  GoalSelectContext,
  Modaltrigger,
} from "../contex/context-context";
import axios from "../api/axios";
import { UPDATE_GOAL_PROGRESS } from "../api/routes";
import { useTranslation } from "react-i18next";
import { showToast } from "./notification";
import { FormInputField, ModalModification } from "./widgets";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { IoClose } from "react-icons/io5";
import { Box, Modal } from "@mui/material";
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, Cell } from "recharts";


export function InformationalSummary() {
  const { t } = useTranslation();
  const { goalStatus } = useGoalStatus();
  console.log({ "goal count desctruction": goalStatus });
  const { Completed, InProgress, NotStarted } = goalStatus;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 ">
      <div className="card  bg-white rounded-lg p-4">
        <div className="flex justify-between mb-16">
          <span className="p-4 bg-blue-900 rounded-lg text-white">
            <FaTrophy size={20} />
          </span>
          <span className="flex flex-col items-end">
            <h3>{t("completed")}</h3>
            <h3 className="font-bold text-3xl">{Completed}</h3>
          </span>
        </div>
        <hr className="h-px my-6 border-0 dark:bg-gray-700" />
        <div className="flex">
          <span className="ml-2">{t("thanLastMonth")}</span>
        </div>
      </div>
      <div className="card bg-white rounded-lg p-4">
        <div className="flex justify-between mb-16">
          <span className="p-4 bg-blue-900 text-white rounded-lg">
            <FaThumbsUp size={20} />
          </span>
          <span className="flex flex-col items-end">
            <h3>{t("inProgress")}</h3>
            <h3 className="font-bold text-3xl">{InProgress}</h3>
          </span>
        </div>
        <hr className="h-px my-6 border-0 dark:bg-gray-700" />
        <div className="flex">
          <span className="ml-2">{t("thanLastMonth")}</span>
        </div>
      </div>
      <div className="card  bg-white rounded-lg p-4">
        <div className="flex justify-between mb-16">
          <span className="p-4 bg-blue-900 text-white rounded-lg">
            <FaThumbsDown size={20} />
          </span>
          <span className="flex flex-col items-end">
            <h3>{t("notStarted")}</h3>
            <h3 className="font-bold text-3xl">{NotStarted}</h3>
          </span>
        </div>
        <hr className="h-px my-6 border-0 dark:bg-gray-700" />
        <div className="flex">
          <span className="ml-2">{t("thanLastMonth")}</span>
        </div>
      </div>
    </div>
  );
}

export function UserPerformanceSummary() {
  const { t } = useTranslation();
  return (
    <div>
      <div className="p-7 mt-5  pt-5 bg-white shadow-lg shadow-blue-200 rounded-lg ">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold leading-none text-gray-900 ">
            {t("highPerformingWorkers")}
          </h3>
          <a
            href="#"
            className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
            View all
          </a>
        </div>
        <div className="flow-root">
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700">
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    className="w-8 h-8 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                    alt="Neil image"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate ">
                    Neil Sims
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    email@windster.com
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 ">
                  320
                </div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    className="w-8 h-8 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                    alt="Bonnie image"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate ">
                    Bonnie Green
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    email@windster.com
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 ">
                  3467
                </div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    className="w-8 h-8 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                    alt="Bonnie image"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate ">
                    Bonnie Green
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    email@windster.com
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 ">
                  3467
                </div>
              </div>
            </li>

            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    className="w-8 h-8 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                    alt="Michael image"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate ">
                    Michael Gough
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    email@windster.com
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 ">
                  67
                </div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    className="w-8 h-8 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                    alt="Michael image"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate ">
                    Michael Gough
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    email@windster.com
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 ">
                  67
                </div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    className="w-8 h-8 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                    alt="Michael image"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate ">
                    Michael Gough
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    email@windster.com
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 ">
                  67
                </div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    className="w-8 h-8 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                    alt="Michael image"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate ">
                    Michael Gough
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    email@windster.com
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 ">
                  67
                </div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    className="w-8 h-8 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                    alt="Michael image"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate ">
                    Michael Gough
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    email@windster.com
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 ">
                  67
                </div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    className="w-8 h-8 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-4.jpg"
                    alt="Lana image"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate ">
                    Lana Byr
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    email@windster.com
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 ">
                  367
                </div>
              </div>
            </li>
            <li className="pt-3 pb-0 sm:pt-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    className="w-8 h-8 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    alt="Thomas image"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate ">
                    Thomes Lean
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    email@windster.com
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 ">
                  2367
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export function DataDateAccess() {
  const { t } = useTranslation();
  return (
    <div>
      <div className="flex flex-row-reverse">
        <div className="p-3 mr-2">
          <div className="relative mb-2" data-te-input-wrapper-init>
            <input
              type="date"
              className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              autoComplete="off"
              required
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              {t("dateTo")}
            </label>
          </div>
        </div>
        <div className="p-3 mr -2">
          <div className="relative mb-6" data-te-input-wrapper-init>
            <input
              type="date"
              className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              autoComplete="off"
              required
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              {t("dateFrom")}
            </label>
          </div>
        </div>
        <div className="p-3 mr -2">
          <div className="relative mb-6" data-te-input-wrapper-init>
            <select
              type="text"
              className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              autoComplete="off"
              required>
              <option value="ADMIN">{t("currentDate")}</option>
              <option value="GENERALMANAGER">{t("lastSelected")}</option>
            </select>
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              {t("selectDate")}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AddDepartment() {
  const { t } = useTranslation();
  return (
    <main>
      <div className="mb-4 card border border-2 shadow-lg rounded-lg p-4 border-slate-400 h-44">
        <div className="flex justify-between flex-row">
          <div>
            <div className="flex flex-row items-center">
              {t("addDepartmentPrompt")}{" "}
              <FaRegSmileWink className="ml-2" color="red" />
            </div>
            <p>{t("enterDepartmentName")}</p>
          </div>
          <div>
            <button className="flex flex-row items-center text-blue-500 bg-blue-100 p-3 rounded-lg">
              <div className="px-6 text-sm">Department</div>
              <MdOutlineAddToPhotos size={25} />
            </button>
          </div>
        </div>
        <div className="pt-4">
          <input
            placeholder="Name of Department"
            autoComplete="off"
            type="text"
            className="border rounded-lg p-4 my-2 w-full border-slate-400"
          />
        </div>
      </div>
    </main>
  );
}


export function GoalDetails({ open, onClose }) {
  const { t } = useTranslation();
  const { auth } = useContext(AuthContext);
  const { goal } = useContext(GoalSelectContext);
  const { triggerComponent } = useContext(Modaltrigger);
  const [progress, setProgress] = useState(goal.actualProgress);
  const [comment, setComment] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [assignedExpanded, setAssignedExpanded] = useState(false);
  const [updatesExpanded, setUpdatesExpanded] = useState(false);

  const employeeGoals = goal.employeeGoals || [];
  const isManager = auth.refNum === "ref?2!";
  const isGoalAssignedToManager = isManager && employeeGoals.some(emp => emp.employeeEmail === auth.email);
  const departmentProgressPercent = isManager ? goal.actualProgressPercent : null;

  // Calculate progress trend (assuming progressUpdates has historical progress values)
  const lastUpdate = goal.progressUpdates?.[0] || {};
  const previousProgress = goal.progressUpdates?.[1]?.progress || 0;
  const progressTrend = goal.actualProgressPercent > previousProgress ? "up" : goal.actualProgressPercent < previousProgress ? "down" : "neutral";

  // Check if goal is overdue
  const isOverdue = new Date(goal.goalDeadline) < new Date();

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (progress > goal.target) {
      alert(t("progressExceedsTarget"));
      return;
    }
    setLoading(true);
    const managerAssignedGoalId = isManager
      ? employeeGoals.find(emp => emp.employeeEmail === auth.email)?.goalId
      : null;
    const goalIdToUse = isManager ? managerAssignedGoalId : goal.id;
    try {
      const res = await axios.patch(
        UPDATE_GOAL_PROGRESS,
        JSON.stringify({ goalId: goalIdToUse, progressIncrement: progress, comment }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      if (res.status === 200) {
        showToast(t("progressUpdated"), "success");
        triggerComponent();
      }
    } catch (err) {
      console.error(err);
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const metricCards = [
    { label: t("target"), value: goal.target, icon: "🎯" },
    { 
      label: t("startDate"), 
      value: new Date(goal.dateAssigned).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      icon: "📅"
    },
    { 
      label: t("deadline"), 
      value: new Date(goal.goalDeadline).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      icon: isOverdue ? "⏰" : "📅",
      color: isOverdue ? "error" : "primary"
    },
  ];

  return (
    <Modal open={open} onClose={onClose} keepMounted>
      <Box sx={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        width: '90vw', 
        maxWidth: '1200px', 
        maxHeight: '90vh', 
        overflowY: 'auto', 
        bgcolor: '#F9FAFB', 
        borderRadius: 2, 
        boxShadow: 24,
        p: 3 
      }}>
        {/* Close Button */}
        <Button onClick={onClose} sx={{ position: 'absolute', top: 8, right: 8, minWidth: 'auto', color: 'gray.500' }}>
          <IoClose size={24} />
        </Button>

        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', color: 'gray.900', mb: 2 }}>
            {goal.goalTitle}
          </Typography>
          <Typography variant="body1" sx={{ color: 'gray.600', lineHeight: 1.6 }}>
            {goal.goalDescription}
          </Typography>
        </Box>

        {/* Key Metrics Row */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {metricCards.map(({ label, value, icon, color }, i) => (
            <Grid item xs={12} sm={4} key={i}>
              <Card sx={{ height: '100%', border: '1px solid', borderColor: 'gray.200', '&:hover': { boxShadow: 2 } }}>
                <CardContent sx={{ textAlign: 'center', py: 3 }}>
                  <Box sx={{ fontSize: 32, mb: 1 }}>{icon}</Box>
                  <Typography variant="body2" sx={{ color: 'gray.500', fontWeight: 500 }}>
                    {label}
                  </Typography>
                  <Typography variant="h5" sx={{ mt: 1, color: color ? `${color}.main` : 'gray.900', fontWeight: 'bold' }}>
                    {value}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Main Content Grid */}
        <Grid container spacing={4}>
          {/* Left Column: Goal Progress & Actions */}
          <Grid item xs={12} md={isManager ? 8 : 12}>
            {/* Progress Bar */}
            <Card sx={{ mb: 3, border: '1px solid', borderColor: 'gray.200' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" sx={{ color: 'gray.800' }}>
                    {isManager ? t("departmentProgress") : t("currentProgress")}
                    <Chip label={`${isManager ? departmentProgressPercent : goal.actualProgressPercent}%`} size="small" sx={{ ml: 1 }} color="primary" />
                    <span style={{ fontSize: '1rem', marginLeft: 8 }}>
                      {progressTrend === "up" ? "↑" : progressTrend === "down" ? "↓" : "→"}
                    </span>
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'gray.500' }}>
                    {t("lastUpdate", { date: lastUpdate.date ? new Date(lastUpdate.date).toLocaleString() : "N/A" })}
                  </Typography>
                </Box>
                <Box sx={{ position: 'relative', display: 'inline-block', width: '100%' }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={isManager ? departmentProgressPercent : goal.actualProgressPercent}
                    sx={{ 
                      height: 8, 
                      borderRadius: 4, 
                      bgcolor: 'gray.200',
                      '& .MuiLinearProgress-bar': { borderRadius: 4, background: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)' }
                    }} 
                  />
                  {/* Tooltip simulation */}
                  <Typography variant="caption" sx={{ position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%)', bgcolor: 'gray.800', color: 'white', px: 1, py: 0.5, borderRadius: 1, minWidth: 40, textAlign: 'center' }}>
                    {t("progressTooltip", { percent: isManager ? departmentProgressPercent : goal.actualProgressPercent })}
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            {/* Submission Form (if applicable) */}
            {(!isManager || isGoalAssignedToManager) && (
              <Card sx={{ mb: 3, border: '1px solid', borderColor: 'gray.200' }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ mb: 3, color: 'gray.800' }}>{t("updateProgress")}</Typography>
                  <Box component="form" onSubmit={handleUpdate} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                      label={t("enterProgress")}
                      type="number"
                      inputProps={{ min: 0, max: goal.target }}
                      value={progress}
                      onChange={(e) => setProgress(Number(e.target.value))}
                      error={progress > goal.target}
                      helperText={progress > goal.target ? t("progressExceedsTarget") : ""}
                      fullWidth
                    />
                    <TextField
                      label={t("comment")}
                      multiline
                      rows={4}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      inputProps={{ maxLength: 200 }}
                      helperText={`${comment.length}/200 ${t("characters")}`}
                      fullWidth
                    />
                    <Button
                      type="submit"
                      disabled={isLoading || progress > goal.target}
                      variant="contained"
                      fullWidth
                      sx={{ py: 1.5, background: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)', '&:hover': { background: 'linear-gradient(90deg, #2563EB 0%, #7C3AED 100%)' }, '&:disabled': { background: 'gray.400' } }}
                    >
                      {isLoading ? t("submitting") : t("submitProgress")}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            )}

            {/* Recent Updates Accordion */}
            {goal.progressUpdates?.length > 0 && (
              <Accordion expanded={updatesExpanded} onChange={() => setUpdatesExpanded(!updatesExpanded)} sx={{ border: '1px solid', borderColor: 'gray.200' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6" sx={{ color: 'gray.800' }}>
                    {t("recentUpdates")} <Chip label={goal.progressUpdates.length} size="small" sx={{ ml: 1 }} />
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ maxHeight: 200, overflowY: 'auto', p: 0 }}>
                  {goal.progressUpdates.map((u, i) => (
                    <Card key={i} sx={{ mb: 2, border: '1px solid', borderColor: 'gray.100' }}>
                      <CardContent sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>{u.employeeName}</Typography>
                          <Typography variant="caption" sx={{ color: 'gray.500' }}>
                            {new Date(u.date).toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                          </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: 'gray.600' }}>{u.comment}</Typography>
                      </CardContent>
                    </Card>
                  ))}
                </AccordionDetails>
              </Accordion>
            )}
          </Grid>

          {/* Right Column: Manager Employee Overview */}
          {isManager && (
            <Grid item xs={12} md={4}>
              {/* Assigned Goals Accordion/Table */}
              <Accordion expanded={assignedExpanded} onChange={() => setAssignedExpanded(!assignedExpanded)} sx={{ mb: 3, border: '1px solid', borderColor: 'gray.200' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6" sx={{ color: 'gray.800' }}>
                    {t("assignedGoals")} <Chip label={employeeGoals.length} size="small" sx={{ ml: 1 }} />
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 2 }}>
                  <Grid container spacing={1} sx={{ fontSize: '0.875rem', fontWeight: 500, color: 'gray.600', mb: 1 }}>
                    <Grid item xs={3}><Typography textAlign="center">{t("name")}</Typography></Grid>
                    <Grid item xs={3}><Typography textAlign="center">{t("target")}</Typography></Grid>
                    <Grid item xs={3}><Typography textAlign="center">{t("progress")}</Typography></Grid>
                    <Grid item xs={3}><Typography textAlign="center">{t("status")}</Typography></Grid>
                  </Grid>
                  {employeeGoals.map((e, i) => {
                    const isEmpOverdue = new Date(goal.goalDeadline) < new Date() && e.status !== "Completed";
                    const statusColor = isEmpOverdue ? "error" : e.status === "Completed" ? "success" : e.status === "In Progress" ? "warning" : "default";
                    const statusKey = isEmpOverdue ? "overdue" : e.status.toLowerCase().replace(' ', '');
                    return (
                      <Grid container key={i} spacing={1} alignItems="center" sx={{ py: 1, borderBottom: i < employeeGoals.length - 1 ? '1px solid' : 'none', borderColor: 'gray.200' }}>
                        <Grid item xs={3}><Typography textAlign="center" variant="body2">{e.employeeName}</Typography></Grid>
                        <Grid item xs={3}><Typography textAlign="center" variant="body2">{e.target}</Typography></Grid>
                        <Grid item xs={3}><Typography textAlign="center" variant="body2">{e.actualProgressPercent}%</Typography></Grid>
                        <Grid item xs={3}>
                          <Chip label={t(statusKey)} size="small" color={statusColor} />
                        </Grid>
                      </Grid>
                    );
                  })}
                </AccordionDetails>
              </Accordion>

              {/* Employee Cards Grid */}
              <Card sx={{ border: '1px solid', borderColor: 'gray.200' }}>
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="h6" sx={{ mb: 2, color: 'gray.800' }}>{t("employees")}</Typography>
                  <Grid container spacing={2}>
                    {employeeGoals.map((emp) => {
                      const isEmpOverdue = new Date(goal.goalDeadline) < new Date() && emp.status !== "Completed";
                      const progressColor = isEmpOverdue ? "error" : emp.status === "Completed" ? "success" : "primary";
                      return (
                        <Grid item xs={6} key={emp.employeeName}>
                          <Card sx={{ height: '100%', '&:hover': { boxShadow: 2 } }}>
                            <CardContent sx={{ textAlign: 'center', py: 2 }}>
                              <Avatar 
                                src={`https://api.dicebear.com/7.x/initials/svg?seed=${emp.employeeName}`} 
                                sx={{ width: 48, height: 48, mx: 'auto', mb: 1 }}
                              />
                              <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>{emp.employeeName}</Typography>
                              <Box sx={{ mx: 'auto', width: 60, height: 60 }}>
                                <CircularProgressbar
                                  value={emp.actualProgressPercent}
                                  text={`${emp.actualProgressPercent}%`}
                                  styles={buildStyles({
                                    pathColor: isEmpOverdue ? "#EF4444" : emp.status === "Completed" ? "#22C55E" : "#4B5EAA",
                                    textColor: "#1F2937",
                                    trailColor: "#F3F4F6",
                                    textSize: "20px",
                                  })}
                                />
                              </Box>
                            </CardContent>
                          </Card>
                        </Grid>
                      );
                    })}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </Box>
    </Modal>
  );
}





export function Goals({ goalTitle, goalDescription, status, goalDeadline, onClick, progress, employeeGoals = [] }) {
  const { t } = useTranslation();
  const { auth } = useContext(AuthContext);

  const isManager = auth.refNum === "ref?2!";

  const displayedProgress = progress;
  const progressLabel = isManager ? t("departmentProgress") : t("actualProgress");
  const progressColor = isManager ? "bg-green-500" : "bg-blue-500";

  // Simple avatar component
  const Avatar = ({ name }) => {
    const firstLetter = name.charAt(0).toUpperCase();
    return (
      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-semibold shadow-sm">
        {firstLetter}
      </div>
    );
  };

  return (
    <div
      className="bg-white rounded-xl p-6 cursor-pointer flex flex-col h-full shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden"
      onClick={onClick}
    >
      {/* Header with Goal Title and Description Placeholder */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800 mb-1">{goalTitle}</h2>
        <div flex justify-start>  
          <p className="text-gray-600 text-sm italic">Description:{goalDescription}</p>
          {/* Deadline */}
        <div flex justify-end>  
          <span className="text-gray-500 text-sm mr-2">📅</span>
          <h3 className="font-semibold text-gray-700">{t("deadline")}:</h3>
          <p className="ml-2 text-gray-900 font-medium">{goalDeadline}</p>
        </div>
        </div>
      </div>

      {/* Enhanced Progress Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <p className="text-gray-700 text-sm font-medium">
            <strong>{progressLabel}:</strong> {displayedProgress}%
          </p>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            Target: 100%
          </span>
        </div>
        <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${progressColor} rounded-full transition-all duration-700 ease-out`}
            style={{ width: `${displayedProgress}%` }}
          ></div>
          <div
            className="absolute inset-0 h-3 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            style={{ width: `${displayedProgress}%` }}
          ></div>
        </div>
      </div>

      {/* Footer with Status and Avatars */}
      <div className="mt-auto pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="font-medium text-sm text-gray-600 mr-2">Status:</span>
            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full ${
                status === "In Progress"
                  ? "bg-blue-100 text-blue-800"
                  : status === "Completed"
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {status}
            </span>
          </div>
          <div className="flex -space-x-2">
            {employeeGoals.map((empGoal, index) => (
              <Avatar key={index} name={empGoal.employeeName} />
            ))}
            {employeeGoals.length === 0 && (
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
                -
              </div>
            )}
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Assigned: {employeeGoals.length} employee{employeeGoals.length !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  );
}

export function Notification({ message, typeHeader }) {
  return (
    <main className="border-l-4 px-4 border-blue-900">
      <div className="font-bold text-lg text-blue-900 mb-2">{typeHeader}</div>
      <div className="text-sm">{message}</div>
    </main>
  );
}

export function GoalsHeader() {
  const { t } = useTranslation();
  return <div className=" text-blue-500">{t("goals")}</div>;
}
export function OrganizationalEmployees() {
  const { t } = useTranslation();
  return (
    <div className="font"></div>
  );
}
