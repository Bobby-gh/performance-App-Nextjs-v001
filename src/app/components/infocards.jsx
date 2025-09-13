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
    deadline: goal.goalDeadline
  });

  const employeeGoals = goal.employeeGoals || [];
  const isManager = auth.refNum === "ref?2!";
  const isGoalAssignedToManager = isManager && employeeGoals.some(emp => emp.employeeEmail === auth.email);

  const departmentProgressPercent = isManager
    ? Math.round(
        employeeGoals.reduce((sum, e) => sum + e.actualProgressPercent, 0) /
          (employeeGoals.length || 1)
      )
    : null;

  const currentProgressPercent = isManager ? departmentProgressPercent : goal.actualProgressPercent;

  const handleUpdate = async (e) => {
    e.preventDefault();
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
        showToast("Progress updated successfully", "success");
        triggerComponent();
      }
    } catch (err) {
      console.error(err);
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ 
        ...ModalModification, 
        maxHeight: "95vh", 
        maxWidth: "1200px",
        width: "90vw",
        overflowY: "auto" 
      }}>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          
          {/* Close Button */}
          <div className="absolute top-4 right-4 z-10">
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <IoClose size={24} />
            </button>
          </div>

          {/* Section 1: Goal Header */}
          <div className="p-8 border-b-2 border-gray-100">
            <div className="flex items-start gap-8 max-w-5xl">
              <div className="flex-1 min-w-0">
                <input 
                  type="text" 
                  value={editableGoal.title}
                  onChange={(e) => setEditableGoal({...editableGoal, title: e.target.value})}
                  className="text-2xl font-bold text-gray-900 mb-3 w-full bg-transparent border-none focus:outline-none focus:ring-0 p-0"
                />
                <textarea 
                  value={editableGoal.description}
                  onChange={(e) => setEditableGoal({...editableGoal, description: e.target.value})}
                  className="text-gray-600 text-lg w-full bg-transparent border-none focus:outline-none focus:ring-0 p-0 resize-none" 
                  rows="2"
                />
              </div>
              <div className="flex-shrink-0 bg-gray-50 rounded-lg p-6 w-80">
                <div className="text-4xl font-bold text-green-600 mb-2 text-center">
                  {currentProgressPercent}%
                </div>
                <div className="text-sm text-gray-500 text-center mb-4">
                  {isManager ? t("departmentProgress") : t("currentProgress")}
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-gray-500">
                    <span className="font-medium text-gray-700 block">TARGET</span>
                    <input 
                      type="text" 
                      value={editableGoal.target}
                      onChange={(e) => setEditableGoal({...editableGoal, target: e.target.value})}
                      className="bg-transparent border-none focus:outline-none text-gray-900 font-medium w-full"
                    />
                  </div>
                  <div className="text-gray-500">
                    <span className="font-medium text-gray-700 block">START DATE</span>
                    <input 
                      type="date" 
                      value={new Date(editableGoal.startDate).toISOString().split('T')[0]}
                      onChange={(e) => setEditableGoal({...editableGoal, startDate: e.target.value})}
                      className="bg-transparent border-none focus:outline-none text-gray-900 font-medium w-full text-xs"
                    />
                  </div>
                  <div className="text-gray-500 col-span-2">
                    <span className="font-medium text-gray-700 block">DEADLINE</span>
                    <input 
                      type="date" 
                      value={new Date(editableGoal.deadline).toISOString().split('T')[0]}
                      onChange={(e) => setEditableGoal({...editableGoal, deadline: e.target.value})}
                      className="bg-transparent border-none focus:outline-none text-gray-900 font-medium w-full text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Team Members */}
          {isManager && (
            <div className="p-8 bg-gray-50 border-b-2 border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">{t("assignedTeamMembers")}</h2>
              <div className="flex flex-wrap gap-6 max-w-5xl">
                {employeeGoals.map((emp, index) => (
                  <div key={index} className="flex items-center gap-4 bg-white p-4 rounded-lg flex-shrink-0 min-w-[280px]">
                    <img
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${emp.employeeName}`}
                      alt={emp.employeeName}
                      className="w-16 h-16 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="text-xl font-bold text-gray-900">{emp.employeeName}</div>
                      <div className="text-gray-500">{emp.goalTitle}</div>
                      <div className={`inline-block text-xs font-semibold px-2 py-1 rounded-full mt-1 ${
                        emp.status === "Completed" ? "bg-green-100 text-green-800" :
                        emp.status === "In Progress" ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      }`}>
                        {t(emp.status === "In Progress" ? "inProgress" : 
                           emp.status === "Not Started" ? "notStarted" : "completed")}
                      </div>
                    </div>
                    <div className="w-16 h-16">
                      <CircularProgressbar
                        value={emp.actualProgressPercent}
                        text={`${emp.actualProgressPercent}%`}
                        styles={buildStyles({
                          pathColor: emp.status === "Completed" ? "#22c55e" : "#3b82f6",
                          textColor: "#374151",
                          trailColor: "#e5e7eb",
                          textSize: "28px",
                        })}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 3: Progress Update */}
          {(!isManager || isGoalAssignedToManager) && (
            <div className="p-8 border-b-2 border-gray-100">
              <div className="flex items-center gap-8 max-w-5xl">
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">{t("progressUpdate")}</h2>
                  <div className="w-full bg-gray-200 rounded-full h-6 mb-4">
                    <div 
                      className="bg-green-500 h-6 rounded-full transition-all duration-300" 
                      style={{ width: `${currentProgressPercent}%` }}
                    />
                  </div>
                  <div className="text-center text-xl font-bold text-gray-900">
                    {currentProgressPercent}% Complete
                  </div>
                </div>
                <div className="flex flex-col items-center gap-4 flex-shrink-0">
                  <input 
                    type="number" 
                    min="0" 
                    max="100" 
                    value={progress}
                    onChange={(e) => setProgress(Number(e.target.value))}
                    className="text-3xl font-bold text-gray-900 w-20 text-center bg-gray-50 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button 
                    onClick={handleUpdate}
                    disabled={isLoading}
                    className={`px-6 py-3 font-medium rounded-lg transition-colors ${
                      isLoading ? "bg-blue-700 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"
                    }`}
                  >
                    {isLoading ? t("submitting") : t("update")}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Section 4: Comments & Updates */}
          <div className="p-8 bg-gray-50 border-b-2 border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">{t("progressComments")}</h2>
            <div className="max-w-5xl">
              {(!isManager || isGoalAssignedToManager) && (
                <div className="bg-white rounded-lg p-6 mb-6">
                  <label className="block mb-2 font-semibold text-gray-700">{t("addComment")}</label>
                  <textarea
                    rows="4"
                    placeholder={t("enterComment")}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full text-gray-700 bg-transparent resize-none focus:outline-none text-lg p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
              
              {/* Recent Updates */}
              {goal.progressUpdates?.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">{t("recentUpdates")}</h3>
                  <div className="space-y-3 max-h-[200px] overflow-y-auto">
                    {goal.progressUpdates.map((update, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                          <span className="font-medium">{update.employeeName}</span>
                          <span>{new Date(update.date).toLocaleDateString()}</span>
                        </div>
                        <p className="text-gray-800">{update.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Section 5: Chart & Footer */}
          <div className="p-8">
            <div className="max-w-5xl">
              {/* Team Progress Chart for Managers */}
              {isManager && employeeGoals.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">{t("teamProgressChart")}</h2>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart
                        data={employeeGoals}
                        barCategoryGap="15%"
                        barGap={5}
                        margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                      >
                        <XAxis 
                          dataKey="employeeName" 
                          tick={{ fontSize: 12 }}
                          angle={-45}
                          textAnchor="end"
                          height={60}
                        />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="actualProgressPercent" barSize={60} fill="#3b82f6">
                          {employeeGoals.map((emp, idx) => (
                            <Cell
                              key={idx}
                              fill={emp.actualProgressPercent > 80 ? "#10b981" : "#3b82f6"}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* Footer Actions */}
              <div className="flex justify-between items-center">
                <div className="flex gap-4">
                  <button 
                    onClick={onClose}
                    className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    {t("close")}
                  </button>
                  <button className="px-6 py-3 text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors font-medium">
                    {t("saveDraft")}
                  </button>
                </div>
                {(!isManager || isGoalAssignedToManager) && (
                  <button
                    onClick={handleUpdate}
                    disabled={isLoading}
                    className={`px-8 py-4 font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg ${
                      isLoading 
                        ? "bg-green-400 text-white cursor-not-allowed" 
                        : "bg-green-500 hover:bg-green-600 text-white"
                    }`}
                  >
                    {isLoading ? t("submitting") : t("saveChanges")}
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>
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
        <div className="flex justify-between">  
          <p className="text-gray-600 text-sm italic">Description:{goalDescription}</p>
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
