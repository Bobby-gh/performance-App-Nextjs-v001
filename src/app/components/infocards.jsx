"use client";
import {
  FaThumbsDown,
  FaTrophy,
  FaThumbsUp,
  FaRegSmileWink,
} from "react-icons/fa";
import { useGoalCountRouteData } from "../api/databook/route-data";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { useContext, useState } from "react";
import { AuthContext, GoalSelectContext } from "../contex/context-context";
import axios from "../api/axios";
import { UPDATE_GOAL_PROGRESS } from "../api/routes";

export function InformationalSummary() {
  const { goalCount } = useGoalCountRouteData();
  console.log({ "goal count desctruction": goalCount });
  const { achieved, notAchieved, partiallyAchieved } = goalCount;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 ">
      <div className="card  bg-white rounded-lg p-4">
        <div className="flex justify-between mb-16">
          <span className="p-4 bg-blue-900 rounded-lg text-white">
            <FaTrophy size={20} />
          </span>
          <span className="flex flex-col items-end">
            <h3>Completed</h3>
            <h3 className="font-bold text-3xl">{achieved}</h3>
          </span>
        </div>
        <hr className="h-px my-6 border-0 dark:bg-gray-700" />
        <div className="flex">
          <span className="text-blue-900">+55%</span>
          <span className="ml-2">than last Month</span>
        </div>
      </div>
      <div className="card bg-white rounded-lg p-4">
        <div className="flex justify-between mb-16">
          <span className="p-4 bg-blue-900 text-white rounded-lg">
            <FaThumbsUp size={20} />
          </span>
          <span className="flex flex-col items-end">
            <h3>In Progress</h3>
            <h3 className="font-bold text-3xl">{partiallyAchieved}</h3>
          </span>
        </div>
        <hr className="h-px my-6 border-0 dark:bg-gray-700" />
        <div className="flex">
          <span className="text-blue-900">+55%</span>
          <span className="ml-2">than last Month</span>
        </div>
      </div>
      <div className="card  bg-white rounded-lg p-4">
        <div className="flex justify-between mb-16">
          <span className="p-4 bg-blue-900 text-white rounded-lg">
            <FaThumbsDown size={20} />
          </span>
          <span className="flex flex-col items-end">
            <h3>Not Started</h3>
            <h3 className="font-bold text-3xl">{notAchieved}</h3>
          </span>
        </div>
        <hr className="h-px my-6 border-0 dark:bg-gray-700" />
        <div className="flex">
          <span className="text-blue-900">+55%</span>
          <span className="ml-2">than last Month</span>
        </div>
      </div>
    </div>
  );
}

export function UserPerformanceSummary() {
  return (
    <div>
      <div className="p-7 mt-5  pt-5 bg-white shadow-lg shadow-blue-200 rounded-lg ">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold leading-none text-gray-900 ">
            High Performing Workers
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
                    Lana Byrd
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
              Date to
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
              Date from
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
              <option value="ADMIN">Current Date</option>
              <option value="GENERALMANAGER">Last Selected</option>
            </select>
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Select Date
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AddDepartment() {
  return (
    <main>
      <div className="mb-4 card border border-2 shadow-lg rounded-lg p-4 border-slate-400 h-44">
        <div className="flex justify-between flex-row">
          <div>
            <div className="flex flex-row items-center">
              Wishing to add new Department ?{" "}
              <FaRegSmileWink className="ml-2" color="red" />
            </div>
            <p>Enter the name of the Department in the field below</p>
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

export function GoalDetails() {
  const {auth} = useContext(AuthContext)
  const { goal } = useContext(GoalSelectContext);
  const [progress, setProgress] = useState(goal.actualProgress);
  const [isLoading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const value = Math.min(100, Math.max(0, Number(event.target.value)));
    setProgress(value);
  };

  const handleUpdate = async (event) => {
    event.preventDefault(); // Prevent default form submission
    setLoading(true);
    try {

      const response = await axios.patch(
        UPDATE_GOAL_PROGRESS,
        JSON.stringify({
          goalId: goal.id,
          progressIncrement: progress,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },

        }
      );

      if (response.status === 200) {
        alert('Progress updated successfully');
      }
    } catch (err) {
      console.log(err)
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
          style={{ width: `${goal.actualProgressPercent}%` }}></div>
      </div>

      {/* Notification */}
      <div className="mb-12">
        <Notification
          typeHeader="Update Goal Progress"
          message="Select project to update progress"
        />
      </div>

      {/* Goal Details */}
      <div className="text-black text-sm mb-4">
        <div className="flex mb-4">
          <strong className="w-1/3">Goal ID:</strong>
          <p className="w-2/3 text-blue-900">{goal.id}</p>
        </div>
        <div className="flex mb-4">
          <strong className="w-1/3">Goal Name:</strong>
          <p className="w-2/3 text-blue-900">{goal.goalTitle}</p>
        </div>
        <div className="flex mb-4">
          <strong className="w-1/3">Description:</strong>
          <p className="w-2/3 text-blue-900">{goal.goalDescription}</p>
        </div>
        <div className="flex mb-4">
          <strong className="w-1/3">Deadline:</strong>
          <p className="w-2/3 text-blue-900">{goal.goalDeadline}</p>
        </div>
        <div className="flex mb-4">
          <strong className="w-1/3">Status:</strong>
          <p className="w-2/3 text-blue-900">{goal.status}</p>
        </div>
        <div className="flex mb-4">
          <strong className="w-1/3">Current Progress:</strong>
          <p className="w-2/3 text-blue-900">{goal.actualProgress}</p>
        </div>
        <div className="flex mb-4">
          <strong className="w-1/3">Target:</strong>
          <p className="w-2/3 text-blue-900">{goal.target}</p>
        </div>
      </div>

      {/* Update Progress */}
      <div className="flex items-center space-x-4 mt-4 mb-12">
        <label htmlFor="progress-input" className="text-gray-600 text-sm">
          <strong className="w-1/3 text-black">Enter Progress:</strong>
        </label>
        <input
          id="progress-input"
          type="number"
          min="0"
          max="100"
          value={progress}
          onChange={handleInputChange}
          className="w-40 border h-8 rounded p-2 text-center"
        />
      </div>

      <button
        className="w-full p-2 bg-blue-900 rounded-xl text-white"
        onClick={handleUpdate}
        disabled={isLoading}>
        {isLoading ? 'Submitting...' : 'Submit Progress'}
      </button>
    </div>
  );
}

export function Goals({
  goalTitle,
  id,
  status,
  goalDeadline,
  onClick,
  progress,
}) {
  return (
    <div
      className="card bg-white rounded-lg p-4 cursor-pointer"
      onClick={onClick}>
      {/* Progress Section */}
      <div className="mb-4">
        <p className="text-blue-900 text-sm mb-2">
          <strong>Actual Progress:</strong> {progress}%
        </p>
        <div className="relative w-full h-4 bg-gray-200 rounded">
          <div
            className="absolute h-4 bg-blue-500 rounded"
            style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      <div className="flex mb-2">
        <span className="flex ">
          <h3>Goal:</h3>
          <h3 className="pl-2"> {goalTitle}</h3>
        </span>
      </div>
      <div className="flex mb-4">
        <div className="flex justify-between">
          <h3>Deadline:</h3>
          <h3 className="pl-2">{goalDeadline}</h3>
        </div>
      </div>
      <hr className="h-px my-2 border-0 dark:bg-gray-700" />
      <div className="flex items-center">
        <span className="">status: </span>
        <span className="ml-2 text-blue-900 text-xs">{status}</span>
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
