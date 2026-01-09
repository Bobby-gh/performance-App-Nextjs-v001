"use client";
import {
  FaThumbsDown,
  FaTrophy,
  FaThumbsUp,
  FaRegSmileWink,
  FaBullseye,
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
import { FormInputField, ModalModification, ModalModifications } from "./widgets";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { IoClose } from "react-icons/io5";
import { Box, Modal } from "@mui/material";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  Cell,
} from "recharts";
import { FiTarget, FiCalendar, FiClock } from "react-icons/fi";
import { Trophy, ThumbsUp, Clock, Target, TrendingUp, TrendingDown } from 'lucide-react';

export function InformationalSummary() {
  const { t } = useTranslation();
  const { goalStatus } = useGoalStatus();
  console.log({ "goal count desctruction": goalStatus });
  const { Completed, InProgress, NotStarted, Total } = goalStatus;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-2">
      {/* Completed Card */}
      <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border-l-4 border-green-500">
        <div className="flex items-start justify-between mb-6">
          <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg">
            <Trophy className="text-white" size={24} />
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 font-medium mb-1">{t("completed")}</p>
            <h3 className="text-4xl font-bold text-gray-800">{Completed}</h3>
          </div>
        </div>
        
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">{t("thanLastMonth")}</span>
          </div>
        </div>
      </div>

      {/* In Progress Card */}
      <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border-l-4 border-blue-500">
        <div className="flex items-start justify-between mb-6">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
            <ThumbsUp className="text-white" size={24} />
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 font-medium mb-1">{t("inProgress")}</p>
            <h3 className="text-4xl font-bold text-gray-800">{InProgress}</h3>
          </div>
        </div>
        
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">{t("thanLastMonth")}</span>
          </div>
        </div>
      </div>

      {/* Not Started Card */}
      <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border-l-4 border-orange-500">
        <div className="flex items-start justify-between mb-6">
          <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg">
            <Clock className="text-white" size={24} />
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 font-medium mb-1">{t("notStarted")}</p>
            <h3 className="text-4xl font-bold text-gray-800">{NotStarted}</h3>
          </div>
        </div>
        
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">{t("thanLastMonth")}</span>
          </div>
        </div>
      </div>

      {/* Total */}

      <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border-l-4 border-orange-500">
        <div className="flex items-start justify-between mb-6">
          <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg">
            <Clock className="text-white" size={24} />
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 font-medium mb-1">{t("total")}</p>
            <h3 className="text-4xl font-bold text-gray-800">{Total}</h3>
          </div>
        </div>
        
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">{t("thanLastMonth")}</span>
          </div>
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

// export function GoalDetails({ open, onClose }) {
//   const { t } = useTranslation();
//   const { auth } = useContext(AuthContext);
//   const { goal } = useContext(GoalSelectContext);
//   const { triggerComponent } = useContext(Modaltrigger);
//   const [progress, setProgress] = useState(goal.actualProgress);
//   const [comment, setComment] = useState("");
//   const [isLoading, setLoading] = useState(false);
//   const [editableGoal, setEditableGoal] = useState({
//     title: goal.goalTitle,
//     description: goal.goalDescription,
//     target: goal.target,
//     startDate: goal.dateAssigned,
//     deadline: goal.goalDeadline
//   });

//   const employeeGoals = goal.employeeGoals || [];
//   const isManager = auth.refNum === "ref?2!";
//   const isGoalAssignedToManager = isManager && employeeGoals.some(emp => emp.employeeEmail === auth.email);
//   const departmentProgressPercent = isManager ? goal.actualProgressPercent : null;

//   // Calculate progress trend (assuming progressUpdates has historical progress values)
//   const lastUpdate = goal.progressUpdates?.[0] || {};
//   const previousProgress = goal.progressUpdates?.[1]?.progress || 0;
//   const progressTrend = goal.actualProgressPercent > previousProgress ? "up" : goal.actualProgressPercent < previousProgress ? "down" : "neutral";

//   // Check if goal is overdue
//   const isOverdue = new Date(goal.goalDeadline) < new Date();

//   const currentProgressPercent = isManager ? departmentProgressPercent : goal.actualProgressPercent;

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     if (progress > goal.target) {
//       alert(t("progressExceedsTarget"));
//       return;
//     }
//     setLoading(true);
//     const managerAssignedGoalId = isManager
//       ? employeeGoals.find(emp => emp.employeeEmail === auth.email)?.goalId
//       : null;
//     const goalIdToUse = isManager ? managerAssignedGoalId : goal.id;
//     try {
//       const res = await axios.patch(
//         UPDATE_GOAL_PROGRESS,
//         JSON.stringify({ goalId: goalIdToUse, progressIncrement: progress, comment }),
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${auth.token}`,
//           },
//         }
//       );
//       if (res.status === 200) {
//         showToast(t("progressUpdated"), "success");
//         triggerComponent();
//       }
//     } catch (err) {
//       console.error(err);
//       alert(`Error: ${err.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Modal open={open} onClose={onClose}>
//       <Box sx={{ ...ModalModification, maxHeight: "90vh", overflowY: "auto", backgroundColor: "#F9FAFB" }}>
//         <div className="absolute top-4 right-4">
//           <button
//             onClick={onClose}
//             className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
//           >
//             <IoClose size={24} className="text-gray-600" />
//           </button>
//         </div>

//         <div className="mb-6 px-6 pt-6 animate-fade-in">
//           <h2 className="text-3xl font-bold text-gray-900 tracking-tight">{goal.goalTitle}</h2>
//           <p className="text-gray-500 mt-2 text-base leading-relaxed">{goal.goalDescription}</p>
//         </div>

//         {/* Top Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 px-6 animate-fade-in">
//           {[
//             { label: t("target"), value: goal.target },
//             { label: t("startDate"), value: new Date(goal.dateAssigned).toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric" }) },
//             {
//               label: t("deadline"),
//               value: new Date(goal.goalDeadline).toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
//               className: isOverdue ? "text-red-600" : "text-gray-900"
//             },
//           ].map(({ label, value, className = "text-gray-900" }) => (
//             <div
//               key={label}
//               className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
//             >
//               <p className="text-gray-500 font-medium text-sm">{label}</p>
//               <p className={`mt-2 text-xl font-semibold ${className}`}>{value}</p>
//             </div>
//           ))}
//         </div>

//         <div className="flex flex-col md:flex-row gap-8 px-6">
//           <div className="flex-1">
//             {/* Staff Progress */}
//             {!isManager && (
//               <div className="mb-6 animate-fade-in">
//                 <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
//                   {t("currentProgress")} ({goal.actualProgressPercent}%)
//                   <span className="ml-2 text-sm" title={t("lastUpdate", { date: lastUpdate.date ? new Date(lastUpdate.date).toLocaleString() : "N/A" })}>
//                     {progressTrend === "up" && "↑"}{progressTrend === "down" && "↓"}
//                   </span>
//                 </h3>
//                 <div className="relative w-full h-6 bg-gray-100 rounded-full overflow-hidden shadow-sm group">
//                   <div
//                     className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-700"
//                     style={{ width: `${goal.actualProgressPercent}%` }}
//                   />
//                   <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs p-2 rounded-md -top-10 left-1/2 transform -translate-x-1/2">
//                     {t("progressTooltip", { percent: goal.actualProgressPercent })}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Department Progress */}
//             {isManager && (
//               <div className="mb-6 animate-fade-in">
//                 <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
//                   {t("departmentProgress")} ({departmentProgressPercent}%)
//                   <span className="ml-2 text-sm" title={t("lastUpdate", { date: lastUpdate.date ? new Date(lastUpdate.date).toLocaleString() : "N/A" })}>
//                     {progressTrend === "up" && "↑"}{progressTrend === "down" && "↓"}
//                   </span>
//                 </h4>
//                 <div className="relative w-full h-6 bg-gray-100 rounded-full overflow-hidden shadow-sm group">
//                   <div
//                     className="h-full bg-gradient-to-r from-green-500 to-teal-600 transition-all duration-700"
//                     style={{ width: `${departmentProgressPercent}%` }}
//                   />
//                   <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs p-2 rounded-md -top-10 left-1/2 transform -translate-x-1/2">
//                     {t("departmentProgressTooltip", { percent: departmentProgressPercent })}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Assigned Goals Card */}
//             {isManager && (
//               <div className="mb-6 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
//                 <button
//                   className="text-lg font-semibold text-gray-800 mb-4 flex items-center"
//                   onClick={() => document.getElementById("assigned-goals").classList.toggle("hidden")}
//                 >
//                   {t("assignedGoals")}
//                   <span className="ml-2 text-sm">{employeeGoals.length} {t("employees")}</span>
//                 </button>
//                 <div id="assigned-goals">
//                   <div className="grid grid-cols-4 gap-2 font-semibold text-sm text-gray-600 bg-gray-50 p-3 rounded-t-md">
//                     <p className="text-center">{t("name")}</p>
//                     <p className="text-center">{t("goalName")}</p>
//                     <p className="text-center">{t("target")}</p>
//                     <p className="text-center">{t("status")}</p>
//                   </div>
//                   {employeeGoals.map((e, i) => {
//                     const isEmpOverdue = new Date(goal.goalDeadline) < new Date() && e.status !== "Completed";
//                     return (
//                       <div
//                         key={i}
//                         className={`grid grid-cols-4 gap-2 items-center text-sm text-gray-700 py-3 text-center ${
//                           i % 2 === 0 ? "bg-white" : "bg-gray-50"
//                         } hover:bg-gray-100 transition-colors duration-200`}
//                       >
//                         <p>{e.employeeName}</p>
//                         <p>{e.goalTitle}</p>
//                         <p>{e.target}</p>
//                         <span
//                           className={`text-xs font-medium px-3 py-1 rounded-full group relative ${
//                             isEmpOverdue
//                               ? "bg-red-200 text-red-800"
//                               : e.status === "Completed"
//                               ? "bg-green-100 text-green-700"
//                               : e.status === "In Progress"
//                               ? "bg-yellow-100 text-yellow-700"
//                               : "bg-gray-100 text-gray-700"
//                           }`}
//                         >
//                           {t(
//                             isEmpOverdue
//                               ? "overdue"
//                               : e.status === "In Progress"
//                               ? "inProgress"
//                               : e.status === "Not Started"
//                               ? "notStarted"
//                               : "completed"
//                           )}
//                           <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs p-2 rounded-md -top-10 left-1/2 transform -translate-x-1/2">
//                             {t(isEmpOverdue ? "overdueTooltip" : `${e.status.toLowerCase()}Tooltip`)}
//                           </div>
//                         </span>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}

//             {/* Submission Form */}
//             {(!isManager || isGoalAssignedToManager) && (
//               <form onSubmit={handleUpdate} className="space-y-6 animate-fade-in">
//                 <div>
//                   <label className="block mb-2 font-medium text-gray-700">{t("enterProgress")}</label>
//                   <input
//                     type="number"
//                     min="0"
//                     max="100"
//                     value={progress}
//                     onChange={(e) => setProgress(Number(e.target.value))}
//                     className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-shadow duration-200 bg-white ${
//                       progress > goal.target ? "border-red-500" : "border-gray-200"
//                     }`}
//                     required
//                   />
//                   {progress > goal.target && (
//                     <p className="text-red-500 text-sm mt-1">{t("progressExceedsTarget")}</p>
//                   )}
//                 </div>
//                 <div>
//                   <label className="block mb-2 font-medium text-gray-700">{t("comment")}</label>
//                   <div className="relative">
//                     <textarea
//                       rows="4"
//                       placeholder={t("enterComment")}
//                       value={comment}
//                       onChange={(e) => setComment(e.target.value)}
//                       className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-shadow duration-200 bg-white"
//                       required
//                     />
//                     <p className="text-sm text-gray-500 mt-1">{comment.length}/200 {t("characters")}</p>
//                   </div>
//                 </div>
//                 <button
//                   type="submit"
//                   disabled={isLoading || progress > goal.target}
//                   className={`w-full py-3 rounded-lg text-white font-semibold transition-all duration-200 ${
//                     isLoading || progress > goal.target
//                       ? "bg-gray-400 cursor-not-allowed"
//                       : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
//                   }`}
//                 >
//                   {isLoading ? t("submitting") : t("submitProgress")}
//                 </button>
//               </form>
//             )}

//             {/* Recent Updates */}
//             {goal.progressUpdates?.length > 0 && (
//               <div className="mb-8">
//                 <button
//                   className="text-lg font-semibold text-gray-800 mb-3 flex items-center"
//                   onClick={() => document.getElementById("recent-updates").classList.toggle("hidden")}
//                 >
//                   {t("recentUpdates")}
//                   <span className="ml-2 text-sm">{goal.progressUpdates.length} {t("updates")}</span>
//                 </button>
//                 <ul id="recent-updates" className="space-y-3 max-h-[150px] overflow-y-auto">
//                   {goal.progressUpdates.map((u, i) => (
//                     <li
//                       key={i}
//                       className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors duration-200"
//                     >
//                       <div className="flex justify-between text-sm text-gray-500">
//                         <span className="font-medium text-gray-700">{u.employeeName}</span>
//                         <span>{new Date(u.date).toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
//                       </div>
//                       <p className="mt-2 text-gray-600">{u.comment}</p>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>

//           {/* Manager Side Panel */}
//           {isManager && (
//             <>
//               <div className="hidden md:block border-l border-gray-200" />
//               <div className="w-full md:w-1/3 space-y-6">
//                 <h4 className="text-lg font-semibold text-gray-800">{t("employees")}</h4>
//                 <div className="grid grid-cols-2 gap-6">
//                   {employeeGoals.map((emp) => {
//                     const isEmpOverdue = new Date(goal.goalDeadline) < new Date() && emp.status !== "Completed";
//                     return (
//                       <div
//                         key={emp.employeeName}
//                         className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
//                       >
//                         <img
//                           src={`https://api.dicebear.com/7.x/initials/svg?seed=${emp.employeeName}`}
//                           alt={emp.employeeName}
//                           className="w-16 h-16 rounded-full mb-3"
//                         />
//                         <p className="text-sm font-medium text-gray-700 mb-2">{emp.employeeName}</p>
//                         <div className="w-16 h-16">
//                           <CircularProgressbar
//                             value={emp.actualProgressPercent}
//                             text={`${emp.actualProgressPercent}%`}
//                             styles={buildStyles({
//                               pathColor: isEmpOverdue ? "#EF4444" : emp.status === "Completed" ? "#22C55E" : "#4B5EAA",
//                               textColor: "#1F2937",
//                               trailColor: "#F3F4F6",
//                               textSize: "28px",
//                             })}
//                           />
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       </Box>
//     </Modal>
//   );
// }
// export function GoalDetails({ open, onClose }) {
//   const { t } = useTranslation();
//   const { auth } = useContext(AuthContext);
//   const { goal } = useContext(GoalSelectContext);
//   const { triggerComponent } = useContext(Modaltrigger);
//   const [progress, setProgress] = useState(goal.actualProgress);
//   const [comment, setComment] = useState("");
//   const [isLoading, setLoading] = useState(false);
//   const [editableGoal, setEditableGoal] = useState({
//     title: goal.goalTitle,
//     description: goal.goalDescription,
//     target: goal.target,
//     startDate: goal.dateAssigned,
//     deadline: goal.goalDeadline,
//   });

//   const employeeGoals = goal.employeeGoals || [];
//   const isManager = auth.refNum === "ref?2!";
//   const isGoalAssignedToManager =
//     isManager && employeeGoals.some((emp) => emp.employeeEmail === auth.email);
//   const departmentProgressPercent = isManager
//     ? goal.actualProgressPercent
//     : null;

//   // Calculate progress trend (assuming progressUpdates has historical progress values)
//   const lastUpdate = goal.progressUpdates?.[0] || {};
//   const previousProgress = goal.progressUpdates?.[1]?.progress || 0;
//   const progressTrend =
//     goal.actualProgressPercent > previousProgress
//       ? "up"
//       : goal.actualProgressPercent < previousProgress
//       ? "down"
//       : "neutral";

//   // Check if goal is overdue
//   const isOverdue = new Date(goal.goalDeadline) < new Date();

//   const currentProgressPercent = isManager
//     ? departmentProgressPercent
//     : goal.actualProgressPercent;

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     if (progress > goal.target) {
//       alert(t("progressExceedsTarget"));
//       return;
//     }
//     setLoading(true);
//     const managerAssignedGoalId = isManager
//       ? employeeGoals.find((emp) => emp.employeeEmail === auth.email)?.goalId
//       : null;
//     const goalIdToUse = isManager ? managerAssignedGoalId : goal.id;
//     try {
//       const res = await axios.patch(
//         UPDATE_GOAL_PROGRESS,
//         JSON.stringify({
//           goalId: goalIdToUse,
//           progressIncrement: progress,
//           comment,
//         }),
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${auth.token}`,
//           },
//         }
//       );
//       if (res.status === 200) {
//         showToast(t("progressUpdated"), "success");
//         triggerComponent();
//       }
//     } catch (err) {
//       console.error(err);
//       alert(`Error: ${err.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const topInfoCards = [
//     {
//       label: t("target"),
//       value: goal.target,
//       icon: <FiTarget className="text-gray-400 w-6 h-6" />,
//     },
//     {
//       label: t("startDate"),
//       value: new Date(goal.dateAssigned).toLocaleString("en-US", {
//         month: "short",
//         day: "2-digit",
//         year: "numeric",
//       }),
//       icon: <FiCalendar className="text-gray-400 w-6 h-6" />,
//     },
//     {
//       label: t("deadline"),
//       value: new Date(goal.goalDeadline).toLocaleString("en-US", {
//         month: "short",
//         day: "2-digit",
//         year: "numeric",
//       }),
//       className: isOverdue ? "text-red-600" : "text-gray-900",
//       icon: (
//         <FiClock
//           className={`w-6 h-6 ${isOverdue ? "text-red-600" : "text-gray-400"}`}
//         />
//       ),
//     },
//   ];
  
//   return (
//     <Modal open={open} onClose={onClose}>
//       <Box
//         sx={{
//           ...ModalModifications,
//           maxHeight: "90vh",
//           overflowY: "auto",
//           backgroundColor: "#F9FAFB",
//         }}>
//         <div className="absolute top-4 right-4">
//           <button
//             onClick={onClose}
//             className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
//             <IoClose size={24} className="text-gray-600" />
//           </button>
//         </div>

//         <div className="mb-6 px-6 pt-6 animate-fade-in">
//           <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
//             {goal.goalTitle}
//           </h2>
//           <p className="text-gray-500 mt-2 text-base leading-relaxed">
//             {goal.goalDescription}
//           </p>
//         </div>

//         <div className="flex flex-col md:flex-row gap-8 px-6">
//           <div className="flex-1">
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 animate-fade-in">
//               {topInfoCards.map(({ label, value, icon, className = "text-gray-900" }) => (
                
//                 <div key={label} className="flex items-center bg-white rounded-xl shadow-lg border border-gray-100 ">
//                   {/* Left Icon Section */}
//                   <div className="flex items-center justify-center bg-blue-50 w-16 h-full p-4">
//                     <span className="text-blue-600 text-2xl">
//                       {/* Replace with your icon */}
//                       {icon}
//                     </span>
//                   </div>

//                   {/* Right Text Section */}
//                   <div className="flex flex-col justify-center px-4 py-3">
//                     <p className="text-gray-600 text-sm font-medium">{label}</p>
//                     <p className="text-gray-900 text-2xl font-bold">{value}</p>
//                   </div>
//                 </div>


//               ))}
//             </div>
//             {/* Staff Progress */}
//             {!isManager && (
//               <div className="mb-6 animate-fade-in">
//                 <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
//                   {t("currentProgress")} ({goal.actualProgressPercent}%)
//                   <span
//                     className="ml-2 text-sm"
//                     title={t("lastUpdate", {
//                       date: lastUpdate.date
//                         ? new Date(lastUpdate.date).toLocaleString()
//                         : "N/A",
//                     })}>
//                     {progressTrend === "up" && "↑"}
//                     {progressTrend === "down" && "↓"}
//                   </span>
//                 </h3>
//                 <div className="relative w-full h-6 bg-gray-100 rounded-full overflow-hidden shadow-sm group">
//                   <div
//                     className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-700"
//                     style={{ width: `${goal.actualProgressPercent}%` }}
//                   />
//                   <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs p-2 rounded-md -top-10 left-1/2 transform -translate-x-1/2">
//                     {t("progressTooltip", {
//                       percent: goal.actualProgressPercent,
//                     })}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Department Progress */}
//             {isManager && (
//               <div className="mb-6 animate-fade-in">
//                 <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
//                   {t("departmentProgress")} ({departmentProgressPercent}%)
//                   <span
//                     className="ml-2 text-sm"
//                     title={t("lastUpdate", {
//                       date: lastUpdate.date
//                         ? new Date(lastUpdate.date).toLocaleString()
//                         : "N/A",
//                     })}>
//                     {progressTrend === "up" && "↑"}
//                     {progressTrend === "down" && "↓"}
//                   </span>
//                 </h4>
//                 <div className="relative w-full h-6 bg-gray-100 rounded-full overflow-hidden shadow-sm group">
//                   <div
//                     className="h-full bg-gradient-to-r from-green-500 to-teal-600 transition-all duration-700"
//                     style={{ width: `${departmentProgressPercent}%` }}
//                   />
//                   <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs p-2 rounded-md -top-10 left-1/2 transform -translate-x-1/2">
//                     {t("departmentProgressTooltip", {
//                       percent: departmentProgressPercent,
//                     })}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Assigned Goals Card */}
//             {isManager && (
//               <div className="mb-6 bg-white rounded-xl p-4 shadow-lg border border-gray-100">
//                 <button
//                   className="text-lg font-semibold text-gray-800 mb-4 flex items-center"
//                   onClick={() =>
//                     document
//                       .getElementById("assigned-goals")
//                       .classList.toggle("hidden")
//                   }>
//                   {t("assignedGoals")}
//                   <span className="ml-2 text-sm">
//                     {employeeGoals.length} {t("employees")}
//                   </span>
//                 </button>
//                 <div id="assigned-goals">
//                   <div className="grid grid-cols-4 gap-2 font-semibold text-sm text-gray-600 bg-gray-50 p-3 rounded-t-md">
//                     <p className="text-center">{t("name")}</p>
//                     <p className="text-center">{t("goalName")}</p>
//                     <p className="text-center">{t("target")}</p>
//                     <p className="text-center">{t("status")}</p>
//                   </div>
//                   {employeeGoals.map((e, i) => {
//                     const isEmpOverdue =
//                       new Date(goal.goalDeadline) < new Date() &&
//                       e.status !== "Completed";
//                     return (
//                       <div
//                         key={i}
//                         className={`grid grid-cols-4 gap-2 items-center text-sm text-gray-700 py-3 text-center ${
//                           i % 2 === 0 ? "bg-white" : "bg-gray-50"
//                         } hover:bg-gray-100 transition-colors duration-200`}>
//                         <p>{e.employeeName}</p>
//                         <p>{e.goalTitle}</p>
//                         <p>{e.target}</p>
//                         <span
//                           className={`text-xs font-medium px-3 py-1 rounded-full group relative ${
//                             isEmpOverdue
//                               ? "bg-red-200 text-red-800"
//                               : e.status === "Completed"
//                               ? "bg-green-100 text-green-700"
//                               : e.status === "In Progress"
//                               ? "bg-yellow-100 text-yellow-700"
//                               : "bg-gray-100 text-gray-700"
//                           }`}>
//                           {t(
//                             isEmpOverdue
//                               ? "overdue"
//                               : e.status === "In Progress"
//                               ? "inProgress"
//                               : e.status === "Not Started"
//                               ? "notStarted"
//                               : "completed"
//                           )}
//                           <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs p-2 rounded-md -top-10 left-1/2 transform -translate-x-1/2">
//                             {t(
//                               isEmpOverdue
//                                 ? "overdueTooltip"
//                                 : `${e.status.toLowerCase()}Tooltip`
//                             )}
//                           </div>
//                         </span>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}

//             {/* Submission Form */}
//             {(!isManager || isGoalAssignedToManager) && (
//               <form
//                 onSubmit={handleUpdate}
//                 className="space-y-6 animate-fade-in">
//                 <div>
//                   <label className="block mb-2 font-medium text-gray-700">
//                     {t("enterProgress")}
//                   </label>
//                   <input
//                     type="number"
//                     min="0"
//                     max="100"
//                     value={progress}
//                     onChange={(e) => setProgress(Number(e.target.value))}
//                     className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-shadow duration-200 bg-white ${
//                       progress > goal.target
//                         ? "border-red-500"
//                         : "border-gray-200"
//                     }`}
//                     required
//                   />
//                   {progress > goal.target && (
//                     <p className="text-red-500 text-sm mt-1">
//                       {t("progressExceedsTarget")}
//                     </p>
//                   )}
//                 </div>
//                 <div>
//                   <label className="block mb-2 font-medium text-gray-700">
//                     {t("comment")}
//                   </label>
//                   <div className="relative">
//                     <textarea
//                       rows="4"
//                       placeholder={t("enterComment")}
//                       value={comment}
//                       onChange={(e) => setComment(e.target.value)}
//                       className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-shadow duration-200 bg-white"
//                       required
//                     />
//                     <p className="text-sm text-gray-500 mt-1">
//                       {comment.length}/200 {t("characters")}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex justify-end">
//                   <button
//                     type="submit"
//                     disabled={isLoading || progress > goal.target}
//                     className={`px-6 py-3 rounded-lg text-white font-semibold transition-all duration-200 ${
//                       isLoading || progress > goal.target
//                         ? "bg-gray-400 cursor-not-allowed"
//                         : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
//                     }`}
//                   >
//                     {isLoading ? t("submitting") : t("submitProgress")}
//                   </button>
//                 </div>
//               </form>
//             )}

//             {/* Recent Updates */}
//             {goal.progressUpdates?.length > 0 && (
//               <div className="mb-8">
//                 <button
//                   className="text-lg font-semibold text-gray-800 mb-3 flex items-center"
//                   onClick={() =>
//                     document
//                       .getElementById("recent-updates")
//                       .classList.toggle("hidden")
//                   }>
//                   {t("recentUpdates")}
//                   <span className="ml-2 text-sm">
//                     {goal.progressUpdates.length} {t("updates")}
//                   </span>
//                 </button>
//                 <ul
//                   id="recent-updates"
//                   className="space-y-3 max-h-[150px] overflow-y-auto">
//                   {goal.progressUpdates.map((u, i) => (
//                     <li
//                       key={i}
//                       className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors duration-200">
//                       <div className="flex justify-between text-sm text-gray-500">
//                         <span className="font-medium text-gray-700">
//                           {u.employeeName}
//                         </span>
//                         <span>
//                           {new Date(u.date).toLocaleString("en-US", {
//                             month: "short",
//                             day: "2-digit",
//                             year: "numeric",
//                             hour: "2-digit",
//                             minute: "2-digit",
//                           })}
//                         </span>
//                       </div>
//                       <p className="mt-2 text-gray-600">{u.comment}</p>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>
//       </Box>
//     </Modal>
//   );
// }
export function GoalDetails({ open, onClose }) {
  const { t } = useTranslation();
  const { auth } = useContext(AuthContext);
  const { goal } = useContext(GoalSelectContext);
  const { triggerComponent } = useContext(Modaltrigger);
  const [progress, setProgress] = useState(goal.actualProgress);
  const [comment, setComment] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [editableGoal, setEditableGoal] = useState({
    title: goal.goalTitle,
    description: goal.goalDescription,
    target: goal.target,
    startDate: goal.dateAssigned,
    deadline: goal.goalDeadline,
  });

  const employeeGoals = goal.employeeGoals || [];
  const isManager = auth.refNum === "ref?2!";
  const isGoalAssignedToManager =
    isManager && employeeGoals.some((emp) => emp.employeeEmail === auth.email);
  const departmentProgressPercent = isManager
    ? goal.actualProgressPercent
    : null;

  // Calculate progress trend
  const lastUpdate = goal.progressUpdates?.[0] || {};
  const previousProgress = goal.progressUpdates?.[1]?.progress || 0;
  const progressTrend =
    goal.actualProgressPercent > previousProgress
      ? "up"
      : goal.actualProgressPercent < previousProgress
      ? "down"
      : "neutral";

  // Check if goal is overdue
  const isOverdue = new Date(goal.goalDeadline) < new Date();

  const currentProgressPercent = isManager
    ? departmentProgressPercent
    : goal.actualProgressPercent;

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (progress > goal.target) {
      alert(t("progressExceedsTarget"));
      return;
    }
    setLoading(true);
    const managerAssignedGoalId = isManager
      ? employeeGoals.find((emp) => emp.employeeEmail === auth.email)?.goalId
      : null;
    const goalIdToUse = isManager ? managerAssignedGoalId : goal.id;
    try {
      const res = await axios.patch(
        UPDATE_GOAL_PROGRESS,
        JSON.stringify({
          goalId: goalIdToUse,
          progressIncrement: progress,
          comment,
        }),
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

  const topInfoCards = [
    {
      label: t("target"),
      value: goal.target,
      icon: <FiTarget className="text-slate-500 w-5 h-5" />,
    },
    {
      label: t("startDate"),
      value: new Date(goal.dateAssigned).toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      icon: <FiCalendar className="text-slate-500 w-5 h-5" />,
    },
    {
      label: t("deadline"),
      value: new Date(goal.goalDeadline).toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      className: isOverdue ? "text-red-600" : "text-slate-700",
      icon: (
        <FiClock
          className={`w-5 h-5 ${isOverdue ? "text-red-500" : "text-slate-500"}`}
        />
      ),
    },
  ];
  
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          ...ModalModifications,
          maxHeight: "92vh",
          overflowY: "auto",
          backgroundColor: "#FAFAFA",
          borderRadius: "12px",
          border: "1px solid #E5E7EB",
        }}>
        {/* Header Section */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-8 py-6 rounded-t-xl">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-slate-800 mb-2 leading-tight">
                {goal.goalTitle}
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed max-w-3xl">
                {goal.goalDescription}
              </p>
            </div>
            <button
              onClick={onClose}
              className="ml-4 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex-shrink-0">
              <IoClose size={20} className="text-slate-500" />
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="px-8 py-6">
          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {topInfoCards.map(({ label, value, icon, className = "text-slate-700" }) => (
              <div
                key={label}
                className="bg-white rounded-lg border border-gray-200 p-0 hover:shadow-sm transition-shadow duration-200"
              >
                <div className="grid grid-cols-3 h-full">
                  {/* Icon Section (1/3) */}
                  <div className="flex items-center justify-center bg-blue-50">
                    <span className="text-blue-600 text-2xl">{icon}</span>
                  </div>

                  {/* Text Section (2/3) */}
                  <div className="col-span-2 flex flex-col justify-center px-4 py-3">
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                      {label}
                    </p>
                    <p className={`text-lg font-semibold ${className} truncate`}>
                      {value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>


          {/* Progress Sections */}
          <div className="space-y-6">
            {/* Individual Progress */}
            {!isManager && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-800">
                    {t("currentProgress")}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-slate-700">
                      {goal.actualProgressPercent}%
                    </span>
                    {progressTrend !== "neutral" && (
                      <span className={`text-sm ${progressTrend === "up" ? "text-green-600" : "text-red-500"}`}>
                        {progressTrend === "up" ? "↗" : "↘"}
                      </span>
                    )}
                  </div>
                </div>
                <div className="relative">
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-slate-500 to-slate-600 transition-all duration-500 ease-out rounded-full"
                      style={{ width: `${Math.min(goal.actualProgressPercent, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 mt-2">
                    <span>0</span>
                    <span>{goal.target}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Department Progress */}
            {isManager && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-800">
                    {t("departmentProgress")}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-slate-700">
                      {departmentProgressPercent}%
                    </span>
                    {progressTrend !== "neutral" && (
                      <span className={`text-sm ${progressTrend === "up" ? "text-green-600" : "text-red-500"}`}>
                        {progressTrend === "up" ? "↗" : "↘"}
                      </span>
                    )}
                  </div>
                </div>
                <div className="relative">
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-500 ease-out rounded-full"
                      style={{ width: `${Math.min(departmentProgressPercent, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 mt-2">
                    <span>0</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            )}

            {/* Assigned Goals Table */}
            {isManager && employeeGoals.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-slate-800">
                    {t("assignedGoals")}
                    <span className="ml-2 text-sm font-normal text-slate-500">
                      ({employeeGoals.length} {t("employees")})
                    </span>
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          {t("name")}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          {t("goalName")}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          {t("target")}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          {t("status")}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {employeeGoals.map((e, i) => {
                        const isEmpOverdue =
                          new Date(goal.goalDeadline) < new Date() &&
                          e.status !== "Completed";
                        return (
                          <tr key={i} className="hover:bg-slate-25 transition-colors duration-150">
                            <td className="px-6 py-4 text-sm font-medium text-slate-800">
                              {e.employeeName}
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-600">
                              {e.goalTitle}
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-600">
                              {e.target}
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${
                                  isEmpOverdue
                                    ? "bg-red-50 text-red-700 border border-red-200"
                                    : e.status === "Completed"
                                    ? "bg-green-50 text-green-700 border border-green-200"
                                    : e.status === "In Progress"
                                    ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
                                    : "bg-gray-50 text-gray-600 border border-gray-200"
                                }`}>
                                {t(
                                  isEmpOverdue
                                    ? "overdue"
                                    : e.status === "In Progress"
                                    ? "inProgress"
                                    : e.status === "Not Started"
                                    ? "notStarted"
                                    : "completed"
                                )}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Progress Update Form */}
            {(!isManager || isGoalAssignedToManager) && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-6">
                  {t("updateProgress")}
                </h3>
                <form onSubmit={handleUpdate} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {t("enterProgress")}
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={progress}
                      onChange={(e) => setProgress(Number(e.target.value))}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200 ${
                        progress > goal.target
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300 bg-white"
                      }`}
                      required
                    />
                    {progress > goal.target && (
                      <p className="text-red-600 text-sm mt-2 flex items-center">
                        <span className="mr-1">⚠</span>
                        {t("progressExceedsTarget")}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {t("comment")}
                    </label>
                    <textarea
                      rows="4"
                      placeholder={t("enterComment")}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      maxLength="200"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200 resize-none"
                      required
                    />
                    <div className="flex justify-between text-sm text-slate-500 mt-2">
                      <span></span>
                      <span>{comment.length}/200 {t("characters")}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      disabled={isLoading || progress > goal.target}
                      className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
                        isLoading || progress > goal.target
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-slate-700 hover:bg-slate-800 text-white shadow-sm hover:shadow-md"
                      }`}
                    >
                      {isLoading ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          {t("submitting")}
                        </span>
                      ) : (
                        t("submitProgress")
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Recent Updates */}
            {goal.progressUpdates?.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-slate-800">
                    {t("recentUpdates")}
                    <span className="ml-2 text-sm font-normal text-slate-500">
                      ({goal.progressUpdates.length} {t("updates")})
                    </span>
                  </h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  <div className="divide-y divide-gray-100">
                    {goal.progressUpdates.map((u, i) => (
                      <div key={i} className="px-6 py-4 hover:bg-slate-25 transition-colors duration-150">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-slate-800 text-sm">
                            {u.employeeName}
                          </span>
                          <time className="text-xs text-slate-500">
                            {new Date(u.date).toLocaleString("en-US", {
                              month: "short",
                              day: "2-digit",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </time>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {u.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Box>
    </Modal>
  );
}

export function Goals({
  goalTitle,
  goalDescription,
  status,
  goalDeadline,
  onClick,
  progress,
  employeeGoals = [],
}) {
  const { t } = useTranslation();
  const { auth } = useContext(AuthContext);

  const isManager = auth.refNum === "ref?2!";

  const displayedProgress = progress;
  const progressLabel = isManager
    ? t("departmentProgress")
    : t("actualProgress");
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
      onClick={onClick}>
      {/* Header with Goal Title and Description Placeholder */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800 mb-1">{goalTitle}</h2>
        <div className="flex justify-between">
          <p className="text-gray-600 text-sm italic">
            Description:{goalDescription}
          </p>
          {/* Deadline */}
          <div className="flex justify-end">
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
            style={{ width: `${displayedProgress}%` }}></div>
          <div
            className="absolute inset-0 h-3 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            style={{ width: `${displayedProgress}%` }}></div>
        </div>
      </div>

      {/* Footer with Status and Avatars */}
      <div className="mt-auto pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="font-medium text-sm text-gray-600 mr-2">
              Status:
            </span>
            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full ${
                status === "In Progress"
                  ? "bg-blue-100 text-blue-800"
                  : status === "Completed"
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}>
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
          Assigned: {employeeGoals.length} employee
          {employeeGoals.length !== 1 ? "s" : ""}
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
  return <div className="font"></div>;
}
