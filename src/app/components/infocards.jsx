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
import { FormInputField } from "./widgets";

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

export function ProjectCard() {
  const { t } = useTranslation();
  const { auth } = useContext(AuthContext);
  const { goal } = useContext(GoalSelectContext);
  const [progress, setProgress] = useState(goal.actualProgress);
  const [comment, setComment] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { triggerComponent } = useContext(Modaltrigger);

  const handleUpdate = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.patch(
        UPDATE_GOAL_PROGRESS,
        JSON.stringify({
          goalId: goal.id,
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

      if (response.status === 200) {
        showToast("Progress updated successfully", "success");
        triggerComponent();
      }
    } catch (err) {
      console.log(err);
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border-r-2 h-screen border-gray-400">
      {/* Progress Bar */}
      <div className="relative w-full h-8 mb-6 bg-gray-200">
        <div
          className="absolute h-8 bg-blue-500 rounded"
          style={{ width: `${goal.actualProgressPercent}%` }}
        ></div>
      </div>

      {/* Notification */}
      {/* Notification or Title */}
      <div className="mb-12">
        {auth.refNum === "ref?2!" ? (
          <h2 className="text-lg font-semibold text-black">{t("goalDetails")}</h2>
        ) : (
          <Notification
            typeHeader={t("updateGoalProgress")}
            message={t("selectProjectToUpdateProgress")}
          />
        )}
      </div>

      {/* Goal Details */}
      <div className="text-black text-sm mb-4">
        <div className="flex mb-4">
          <strong className="w-1/3">{t("goalName")}:</strong>
          <p className="w-2/3 text-blue-900">{goal.goalTitle}</p>
        </div>
        <div className="flex mb-4">
          <strong className="w-1/3">{t("description")}:</strong>
          <p className="w-2/3 text-blue-900">{goal.goalDescription}</p>
        </div>
        <div className="flex mb-4">
          <strong className="w-1/3">{t("deadline")}:</strong>
          <p className="w-2/3 text-blue-900">{goal.goalDeadline}</p>
        </div>
        <div className="flex mb-4">
          <strong className="w-1/3">{t("status")}:</strong>
          <p className="w-2/3 text-blue-900">{goal.status}</p>
        </div>
        <div className="flex mb-4">
          <strong className="w-1/3">{t("currentProgress")}:</strong>
          <p className="w-2/3 text-blue-900">{goal.actualProgress}</p>
        </div>
        <div className="flex mb-4">
          <strong className="w-1/3">{t("target")}:</strong>
          <p className="w-2/3 text-blue-900">{goal.target}</p>
        </div>
      </div>

      {/* Update Progress - hidden for ref?2! */}
      {auth.refNum !== "ref?2!" && (
        <>
          <div className="flex items-center space-x-4 mt-4 mb-4">
            <label htmlFor="progress-input" className="text-gray-600 text-sm">
              <strong className="w-1/3 text-black">{t("enterProgress")}:</strong>
            </label>
          </div>

          <div className="mb-4 mt-4">
            <FormInputField
              id="progress-input"
              value={progress}
              onChange={(e) => setProgress(e.target.value)}
              required
            />
          </div>

          <div className="mb-12 w-full">
            <label htmlFor="comment" className="block mb-2 font-medium">Comment</label>
            <textarea
              id="comment"
              rows={4}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>
          <button
            className="w-full p-2 bg-blue-900 rounded-xl text-white"
            onClick={handleUpdate}
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : t("submitProgress")}
          </button>
        </>
      )}

    </div>
  );
}


export function GoalDetails() {
  const { t } = useTranslation();
  const { auth } = useContext(AuthContext);
  const { goal } = useContext(GoalSelectContext);

  console.log("Goal data:", goal);

  const [progress, setProgress] = useState(goal.actualProgress);
  const [comment, setComment] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { triggerComponent } = useContext(Modaltrigger);

  const checklistItems = [
    { label: 'Create wireframes to understand', done: true },
    { label: 'UI/UX design development', done: true },
    { label: 'Layout design', done: true },
    { label: 'Backend devs', done: false },
    { label: 'Testing for possible errors', done: false },
    { label: 'Final works on projects', done: false },
  ];

  const employees = ['Jacob', 'Regina', 'Jane', 'Ronald', 'Dustin', 'Robert'];

  const handleUpdate = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.patch(
        UPDATE_GOAL_PROGRESS,
        JSON.stringify({
          goalId: goal.id,
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

      if (response.status === 200) {
        showToast("Progress updated successfully", "success");
        triggerComponent();
      }
    } catch (err) {
      console.log(err);
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow-xl rounded-2xl">
      <div className="flex items-center mb-4">
        <div>
          <h2 className="text-xl font-bold">{goal.goalTitle}</h2>
          <p className="text-gray-500 text-sm">{goal.goalTitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-2 rounded-xl text-center">
          <p className="text-blue-700 text-sm">{t("target")}</p>
          <p className="text-lg font-semibold">{goal.target}</p>
        </div>
        <div className="bg-blue-50 p-2 rounded-xl text-center">
          <p className="text-blue-700 text-sm">Start Date</p>
          <p className="text-lg font-semibold">17 Jun, 2020</p>
        </div>
        <div className="bg-blue-50 p-2 rounded-xl text-center">
          <p className="text-blue-700 text-sm">{t("deadline")}</p>
          <p className="text-lg font-semibold">{goal.goalDeadline}</p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-2">{t("description")}</h3>
        <p className="text-sm text-gray-600">
          {goal.goalDescription}        
        </p>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-2">{t("employees")}</h3>
        <div className="flex gap-4 overflow-x-auto py-4">
          {employees.map((name) => (
            <div key={name} className="flex flex-col items-center">
              <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${name}`}
                alt={name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <p className="text-xs mt-1">{name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-gray-700">{t("currentProgress")} ({goal.actualProgressPercent}%)</h3>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${goal.actualProgressPercent}%` }}></div>
        </div>
        <ul className="space-y-2">
          {checklistItems.map((item, index) => (
            <li key={index} className="flex items-center space-x-2">
              <input type="checkbox" checked={item.done} readOnly className="form-checkbox text-blue-500" />
              <span className={item.done ? 'line-through text-gray-500' : ''}>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {auth.refNum !== "ref?2!" && (
        <>
          <div className="flex items-center space-x-4 mt-2 mb-2">
            <label htmlFor="progress-input" className="text-gray-600 text-sm">
              <strong className="w-1/3 text-black">{t("enterProgress")}</strong>
            </label>
          </div>

          <div className="mb-2">
            <FormInputField
              id="progress-input"
              value={progress}
              onChange={(e) => setProgress(e.target.value)}
              required
            />
          </div>

          <div className="mb-4 w-full">
            <label htmlFor="comment" className="block mb-1 font-medium">{t("comment")}</label>
            <textarea
              id="comment"
              rows={4}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>

          <button
            className="w-full p-2 bg-blue-900 rounded-xl text-white"
            onClick={handleUpdate}
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : t("submitProgress")}
          </button>
        </>
      )}
    </div>
  );
}




export function Goals({ goalTitle, status, goalDeadline, onClick, progress }) {
  const { t } = useTranslation();
  return (
    <div
      className="bg-white rounded-lg p-4 cursor-pointer flex flex-col h-full"
      onClick={onClick}>
      {/* Progress Section */}
      <div className="mb-4">
        <p className="text-blue-900 text-sm mb-2">
          <strong>{t("actualProgress")}:</strong> {progress}%
        </p>
        <div className="relative w-full h-4 bg-gray-200 rounded">
          <div
            className="absolute h-4 bg-blue-500 rounded"
            style={{ width: `${progress}%` }}></div>
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
    <div className="text"></div>
  );
}
