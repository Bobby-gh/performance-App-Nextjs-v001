'use client'
import React, { useEffect, useState } from "react";
import { FaThumbsDown, FaTrophy, FaThumbsUp } from "react-icons/fa";
import { useGoalCountRouteData } from "../api/databook/route-data";

export function InformationalSummary() {
  const { goalCount, error } = useGoalCountRouteData();
  const { achieved, notAchieved, partiallyAchieved } = goalCount;

  if (error) {
    return <div>Error: {error.message}</div>;
  }

console.log(achieved)
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 ">
      <div className="card shadow-lg bg-gray-200 rounded-lg p-4 border border-2 border-slate-400">
        <div className="flex justify-between">
          <span className="p-4 bg-green-900 rounded-lg">
            <FaTrophy />
          </span>
          <span className="flex flex-col items-end">
            <h3 className="text-blue-900">Achieved Goals</h3>
          <h3 className="font-bold text-xl"></h3>
          </span>
        </div>
        <hr className="h-px my-6 border-0 dark:bg-gray-700"/>
        <div className="flex">
          <span className="text-blue-900">+55%</span>
          <span className="ml-2">than last Month</span>
        </div>
      </div>
      <div className="card shadow-lg bg-gray-200 rounded-lg p-4 border border-2 border-slate-400">
        <div className="flex justify-between">
          <span className="p-4 bg-yellow-500 rounded-lg">
            <FaThumbsUp />
          </span>
          <span className="flex flex-col items-end">
            <h3 className="text-blue-900">Partially Achieved Goals</h3>
            <h3 className="font-bold text-xl"></h3>
          </span>
        </div>
        <hr className="h-px my-6 border-0 dark:bg-gray-700" />
        <div className="flex">
          <span className="text-blue-900">+55%</span>
          <span className="ml-2">than last Month</span>
        </div>
      </div>
      <div className="card shadow-lg  bg-gray-200 rounded-lg p-4 border border-2 border-slate-400">
        <div className="flex justify-between">
          <span className="p-4 bg-red-900 rounded-lg">
            <FaThumbsDown />
          </span>
          <span className="flex flex-col items-end">
            <h3 className="text-blue-900">Unachieved Goals</h3>
            <h3 className="font-bold text-xl"></h3>
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
      <div className="p-7 mt-5  pt-5 bg-gray-100 shadow-lg shadow-blue-200 rounded-lg ">
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
