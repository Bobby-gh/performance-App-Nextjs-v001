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

//   const employeeGoals = goal.employeeGoals || [];
//   const isManager = auth.refNum === "ref?2!";
//   const isGoalAssignedToManager = isManager && employeeGoals.some(emp => emp.employeeEmail === auth.email);

//   const departmentProgressPercent = isManager
//     ? Math.round(
//         employeeGoals.reduce((sum, e) => sum + e.actualProgressPercent, 0) /
//           (employeeGoals.length || 1)
//       )
//     : null;

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const managerAssignedGoalId = isManager
//     ? employeeGoals.find(emp => emp.employeeEmail === auth.email)?.goalId
//     : null;

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
//         showToast("Progress updated successfully", "success");
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
//       <Box sx={{ ...ModalModification, maxHeight: "90vh", overflowY: "auto" }}>
//         <div className="absolute top-2 right-2">
//           <button onClick={onClose}>
//             <IoClose size={24} />
//           </button>
//         </div>

//         <div className="mb-6">
//           <h2 className="text-3xl font-extrabold text-gray-900">{goal.goalTitle}</h2>
//           <p className="text-gray-600 mt-1">{goal.goalDescription}</p>
//         </div>

//         {/* Top Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
//           {[ 
//             { label: t("target"), value: goal.target },
//             { label: t("startDate"), value: new Date(goal.dateAssigned).toLocaleDateString() },
//             { label: t("deadline"), value: new Date(goal.goalDeadline).toLocaleDateString() },
//           ].map(({ label, value }) => (
//             <div key={label} className="p-4 bg-blue-50 rounded-xl text-center shadow-sm">
//               <p className="text-blue-700 font-semibold">{label}</p>
//               <p className="mt-2 text-xl font-bold">{value}</p>
//             </div>
//           ))}
//         </div>

//         <div className="flex flex-col md:flex-row gap-8">
//           <div className="flex-1">
//             {/* Staff Progress */}
//             {!isManager && (
//               <div className="mb-6">
//                 <h3 className="text-xl font-semibold text-gray-700 mb-4">
//                   {t("currentProgress")} ({goal.actualProgressPercent}%)
//                 </h3>
//                 <div className="relative w-full h-6 bg-gray-200 rounded-full overflow-hidden shadow-inner mb-6">
//                   <div
//                     className="h-full bg-blue-600 transition-all duration-700"
//                     style={{
//                       width: `${goal.actualProgressPercent}%`,
//                       borderRadius: "9999px",
//                     }}
//                   />
//                 </div>
//               </div>
//             )}

//             {/* Department Progress */}
//             {isManager && (
//               <div className="mb-6">
//                 <h4 className="text-lg font-semibold text-gray-700 mb-3">
//                   {t("departmentProgress")} ({departmentProgressPercent}%)
//                 </h4>
//                 <div className="relative w-full h-6 bg-gray-200 rounded-full overflow-hidden shadow-inner mb-6">
//                   <div
//                     className="h-full bg-green-600 transition-all duration-700"
//                     style={{
//                       width: `${departmentProgressPercent}%`,
//                       borderRadius: "9999px",
//                     }}
//                   />
//                 </div>
//               </div>
//             )}

//             {/* Assigned Goals Card — moved here for manager */}
//             {isManager && (
//               <div className="mb-6 bg-blue-50 rounded-xl p-4 shadow-sm">
//                 <h4 className="text-lg font-semibold text-gray-700 mb-3">{t("assignedGoals")}</h4>
//                 {employeeGoals.map((e, i) => (
//                   <div key={i} className="flex justify-between mb-2 items-center">
//                     <p className="text-sm text-gray-800">{e.goalTitle}</p>
//                     <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
//                       e.status === "Completed" ? "bg-green-100 text-green-800" :
//                       e.status === "In Progress" ? "bg-yellow-100 text-yellow-800" :
//                       "bg-red-100 text-red-800"
//                     }`}>
//                       {t(
//                         e.status === "In Progress"
//                           ? "inProgress"
//                           : e.status === "Not Started"
//                           ? "notStarted"
//                           : "completed"
//                       )}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {/* Submission Form — Shown for staff and managers assigned to this goal */}
//             {(!isManager || isGoalAssignedToManager) && (
//               <form onSubmit={handleUpdate} className="space-y-6">
//                 <div>
//                   <label className="block mb-2 font-semibold text-gray-700">{t("enterProgress")}</label>
//                   <input
//                     type="number"
//                     min="0"
//                     max="100"
//                     value={progress}
//                     onChange={(e) => setProgress(Number(e.target.value))}
//                     className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-2 font-semibold text-gray-700">{t("comment")}</label>
//                   <textarea
//                     rows="4"
//                     placeholder="Enter comment"
//                     value={comment}
//                     onChange={(e) => setComment(e.target.value)}
//                     className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                     required
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className={`w-full py-3 rounded-xl text-white font-bold transition ${
//                     isLoading ? "bg-blue-700" : "bg-blue-900 hover:bg-blue-800"
//                   }`}
//                 >
//                   {isLoading ? t("submitting") : t("submitProgress")}
//                 </button>
//               </form>
//             )}

//             {/* Recent Updates */}
//             {goal.progressUpdates?.length > 0 && (
//               <div className="mb-8">
//                 <h4 className="text-lg font-semibold text-gray-700 mb-3">{t("recentUpdates")}</h4>
//                 <ul className="space-y-3 max-h-[150px] overflow-y-auto">
//                   {goal.progressUpdates.map((u, i) => (
//                     <li key={i} className="bg-gray-50 p-3 rounded-lg shadow-sm">
//                       <div className="flex justify-between text-sm text-gray-600">
//                         <span>{u.employeeName}</span>
//                         <span>{new Date(u.date).toLocaleString()}</span>
//                       </div>
//                       <p className="mt-2 text-gray-800">{u.comment}</p>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>

//           {/* Manager Side Panel */}
//           {isManager && (
//             <>
//               <div className="hidden md:block border-l border-gray-300" />
//               <div className="w-full md:w-1/3 space-y-6">
//                 <h4 className="text-lg font-semibold text-gray-700">{t("employees")}</h4>
//                 <div className="grid grid-cols-2 gap-6">
//                   {employeeGoals.map((emp) => (
//                     <div
//                       key={emp.employeeName}
//                       className="bg-gray-50 p-4 rounded-xl shadow-sm flex flex-col items-center"
//                     >
//                       <img
//                         src={`https://api.dicebear.com/7.x/initials/svg?seed=${emp.employeeName}`}
//                         alt={emp.employeeName}
//                         className="w-16 h-16 rounded-full mb-3"
//                       />
//                       <p className="text-sm font-medium mb-1">{emp.employeeName}</p>
//                       <div className="w-16 h-16">
//                         <CircularProgressbar
//                           value={emp.actualProgressPercent}
//                           text={`${emp.actualProgressPercent}%`}
//                           styles={buildStyles({
//                             pathColor: emp.status === "Completed" ? "#22c55e" : "#3b82f6",
//                             textColor: "#374151",
//                             trailColor: "#e5e7eb",
//                             textSize: "28px",
//                           })}
//                         />
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Bar Chart below Employees */}
//                 {employeeGoals.length > 0 && (
//                   <div className="mt-6">
//                     <h4 className="text-lg font-semibold text-gray-700 mb-3">{t("teamProgressChart")}</h4>
//                     <ResponsiveContainer width="100%" height={180}>
//                       <BarChart
//                         data={employeeGoals}
//                         barCategoryGap="10%"
//                         barGap={2}
//                         margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
//                       >
//                         <XAxis dataKey="employeeName" tick={{ fontSize: 12 }} />
//                         <Tooltip />
//                         <Bar dataKey="actualProgress" barSize={80} fill="#3b82f6">
//                           {employeeGoals.map((e, idx) => (
//                             <Cell
//                               key={idx}
//                               fill={e.actualProgressPercent > 80 ? "#10b981" : "#3b82f6"}
//                             />
//                           ))}
//                         </Bar>
//                       </BarChart>
//                     </ResponsiveContainer>
//                   </div>
//                 )}
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


        
        

   

  


export function Goals({ goalTitle, status, goalDeadline, onClick, progress, employeeGoals = [] }) {
  const { t } = useTranslation();
  const { auth } = useContext(AuthContext);

  const isManager = auth.refNum === "ref?2!";

  const departmentProgress = isManager
    ? Math.round(
        employeeGoals.reduce((sum, emp) => sum + (emp.actualProgressPercent || 0), 0) /
          (employeeGoals.length || 1)
      )
    : null;

  const displayedProgress = isManager ? departmentProgress : progress;
  const progressLabel = isManager ? t("departmentProgress") : t("actualProgress");

  return (
    <div
      className="bg-white rounded-lg p-4 cursor-pointer flex flex-col h-full shadow-sm border hover:shadow-md transition"
      onClick={onClick}
    >
      {/* Progress Section */}
      <div className="mb-4">
        <p className="text-blue-900 text-sm mb-2">
          <strong>{progressLabel}:</strong> {displayedProgress}%
        </p>
        <div className="relative w-full h-4 bg-gray-200 rounded">
          <div
            className={`absolute h-4 ${
              isManager ? "bg-green-500" : "bg-blue-500"
            } rounded transition-all duration-500`}
            style={{ width: `${displayedProgress}%` }}
          ></div>
        </div>
      </div>

      {/* Goal Title */}
      <div className="mb-2">
        <h3 className="font-semibold">{t("goal")}:</h3>
        <p>{goalTitle}</p>
      </div>

      {/* Deadline */}
      <div className="mb-4">
        <h3 className="font-semibold">{t("deadline")}:</h3>
        <p>{goalDeadline}</p>
      </div>

      {/* Bottom section pinned to bottom */}
      <div className="mt-auto">
        <hr className="h-px my-2 border-0 bg-gray-300" />
        <div className="flex items-center mt-2">
          <span className="font-medium text-sm text-gray-600">{t("status")}:</span>
          <span className="ml-2 text-blue-900 text-xs">{status}</span>
        </div>
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
