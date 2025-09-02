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
  const { auth } = useContext(AuthContext) || {};
  const { goal } = useContext(GoalSelectContext) || {};
  const { triggerComponent } = useContext(Modaltrigger) || {};
  const [progress, setProgress] = useState(goal?.actualProgress || 0);
  const [comment, setComment] = useState('');
  const [isLoading, setLoading] = useState(false);

  // Defensive checks for undefined context values
  if (!auth || !goal) {
    return (
      <Modal open={open} onClose={onClose}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
        >
          <IoClose size={24} />
        </button>
        <div className="text-center text-gray-600 p-6">
          <p>{t('errorLoadingData')}</p>
        </div>
      </Modal>
    );
  }

  const employeeGoals = goal.employeeGoals || [];
  const isManager = auth.refNum === 'ref?2!';
  const isGoalAssignedToManager = isManager && employeeGoals.some(emp => emp?.employeeEmail === auth.email);
  const departmentProgressPercent = isManager ? goal.actualProgressPercent || 0 : null;

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const managerAssignedGoalId = isManager
      ? employeeGoals.find(emp => emp?.employeeEmail === auth.email)?.goalId
      : null;
    const goalIdToUse = isManager ? managerAssignedGoalId : goal.id;
    try {
      const res = await axios.patch(
        'UPDATE_GOAL_PROGRESS',
        JSON.stringify({ goalId: goalIdToUse, progressIncrement: progress, comment }),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      if (res.status === 200) {
        showToast('Progress updated successfully', 'success');
        triggerComponent?.();
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
      <div className="relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
        >
          <IoClose size={24} />
        </button>

        <div className="space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{goal.goalTitle || t('noTitle')}</h2>
            <p className="text-gray-500 mt-2">{goal.goalDescription || t('noDescription')}</p>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: t('target'), value: goal.target || t('noTarget') },
              { label: t('startDate'), value: goal.dateAssigned ? new Date(goal.dateAssigned).toLocaleDateString() : t('noDate') },
              { label: t('deadline'), value: goal.goalDeadline ? new Date(goal.goalDeadline).toLocaleDateString() : t('noDate') },
            ].map(({ label, value }) => (
              <div key={label} className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 shadow-sm text-center">
                <p className="text-blue-700 font-medium">{label}</p>
                <p className="text-lg font-semibold text-gray-800">{value}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 space-y-6">
              {/* Staff Progress */}
              {!isManager && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    {t('currentProgress')} ({goal.actualProgressPercent || 0}%)
                  </h3>
                  <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden mt-2">
                    <div
                      className="h-full bg-blue-500 transition-all duration-500 ease-out"
                      style={{ width: `${goal.actualProgressPercent || 0}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Department Progress */}
              {isManager && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    {t('departmentProgress')} ({departmentProgressPercent}%)
                  </h3>
                  <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden mt-2">
                    <div
                      className="h-full bg-green-500 transition-all duration-500 ease-out"
                      style={{ width: `${departmentProgressPercent}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Assigned Goals Table */}
              {isManager && employeeGoals.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">{t('assignedGoals')}</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-gray-700">
                      <thead>
                        <tr className="border-b">
                          <th className="py-2 px-4 text-left">{t('name')}</th>
                          <th className="py-2 px-4 text-left">{t('goalName')}</th>
                          <th className="py-2 px-4 text-left">{t('target')}</th>
                          <th className="py-2 px-4 text-left">{t('status')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {employeeGoals.map((e, i) => (
                          <tr key={i} className="border-b hover:bg-gray-50">
                            <td className="py-2 px-4">{e.employeeName || t('unknown')}</td>
                            <td className="py-2 px-4">{e.goalTitle || t('noTitle')}</td>
                            <td className="py-2 px-4">{e.target || t('noTarget')}</td>
                            <td className="py-2 px-4">
                              <span
                                className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                  e.status === 'Completed'
                                    ? 'bg-green-100 text-green-800'
                                    : e.status === 'In Progress'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-red-100 text-red-800'
                                }`}
                              >
                                {t(
                                  e.status === 'In Progress'
                                    ? 'inProgress'
                                    : e.status === 'Not Started'
                                    ? 'notStarted'
                                    : e.status === 'Completed'
                                    ? 'completed'
                                    : 'unknown'
                                )}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Submission Form */}
              {(!isManager || isGoalAssignedToManager) && (
                <form onSubmit={handleUpdate} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">{t('enterProgress')}</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={progress}
                      onChange={(e) => setProgress(Number(e.target.value))}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">{t('comment')}</label>
                    <textarea
                      rows="4"
                      placeholder={t('enterComment')}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 rounded-lg text-white font-semibold transition-all ${
                      isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {isLoading ? t('submitting') : t('submitProgress')}
                  </button>
                </form>
              )}

              {/* Recent Updates */}
              {goal.progressUpdates?.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">{t('recentUpdates')}</h3>
                  <div className="space-y-3 max-h-48 overflow-y-auto">
                    {goal.progressUpdates.map((u, i) => (
                      <div key={i} className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>{u.employeeName || t('unknown')}</span>
                          <span>{u.date ? new Date(u.date).toLocaleString() : t('noDate')}</span>
                        </div>
                        <p className="mt-1 text-gray-800">{u.comment || t('noComment')}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Manager Side Panel */}
            {isManager && (
              <>
                <div className="hidden md:block border-l border-gray-200 mx-6" />
                <div className="w-full md:w-80 space-y-6">
                  <h3 className="text-lg font-semibold text-gray-700">{t('employees')}</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {employeeGoals.map((emp) => (
                      <div
                        key={emp.employeeName || `emp-${Math.random()}`}
                        className="bg-white p-4 rounded-lg shadow-sm flex items-center space-x-4"
                      >
                        <img
                          src={`https://api.dicebear.com/7.x/initials/svg?seed=${emp.employeeName || 'Unknown'}`}
                          alt={emp.employeeName || 'Unknown'}
                          className="w-12 h-12 rounded-full"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">{emp.employeeName || t('unknown')}</p>
                          <div className="w-16 h-16 mt-2">
                            <CircularProgressbar
                              value={emp.actualProgressPercent || 0}
                              text={`${emp.actualProgressPercent || 0}%`}
                              styles={buildStyles({
                                pathColor: emp.status === 'Completed' ? '#22c55e' : '#3b82f6',
                                textColor: '#374151',
                                trailColor: '#e5e7eb',
                                textSize: '28px',
                              })}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}







export function Goals({ goalTitle, status, goalDeadline, onClick, progress, employeeGoals = [] }) {
  const { t } = useTranslation();
  const { auth } = useContext(AuthContext);

  const isManager = auth.refNum === "ref?2!";

  const displayedProgress = progress;
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
