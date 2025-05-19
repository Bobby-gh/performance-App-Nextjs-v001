"use client";
import { useMyGoalRouteData } from "@/app/api/databook/route-data";
import { GoalDetails, Goals } from "@/app/components/infocards";
import { GoalSelectContext, Modaltrigger } from "@/app/contex/context-context";
import React, { useContext, useEffect, useState } from "react";

export default function MyGoals() {
  const [selectedGoal, setSelectedGoal] = useState(null);
  const { setGoal } = useContext(GoalSelectContext);
  const { mygoal, fetchData } = useMyGoalRouteData();
  const { trigger, resettriggerComponent } = useContext(Modaltrigger);
  console.log(mygoal);
  useEffect(() => {
    const fetchAndReset = async () => {
      if (!trigger) return;
      try {
        await fetchData();
        setSelectedGoal(null);
        setGoal(null);
      } finally {
        resettriggerComponent();
      }
    };

    fetchAndReset();
  }, [trigger]);

  const handleCardClick = (goal) => {
    if (selectedGoal?.id === goal.id) {
      setSelectedGoal(null);
      setGoal(null);
    } else {
      setSelectedGoal(goal);
      setGoal(goal);
    }
  };

  return (
    <main className="flex space-x-4">
      {/* Left Panel: Show Goal Details only when a goal is selected */}
      {selectedGoal && (
        <div className="flex-[1] overflow-y-auto max-h-screen">
          <GoalDetails />
        </div>
      )}

      {/* Right Panel: Goals List */}
      <div className="flex-[1.7] overflow-y-auto max-h-[90vh] p-2">
        {mygoal.length > 0 ? (
          <div
            className={`grid gap-4 cursor-pointer ${
              selectedGoal
                ? "grid-cols-1  xl:grid-cols-2 2xl:grid-cols-3"
                : "grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4"
            }`}>
            {mygoal.map((goal, index) => (
              <div
                key={index}
                className={`bg-white transition duration-300 ${
                  selectedGoal && selectedGoal.id !== goal.id
                    ? "opacity-30"
                    : "opacity-100 shadow-lg shadow-[0_0_0_1px_rgba(59,130,246,0.5)]"
                }`}>
                <Goals
                  id={goal.id}
                  goalTitle={goal.goalTitle}
                  goalDeadline={goal.goalDeadline}
                  progress={goal.actualProgressPercent}
                  status={goal.status}
                  onClick={() => handleCardClick(goal)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center h-[60vh] w-full text-gray-600 bg-white rounded-lg shadow-inner">
            <svg
              className="w-12 h-12 mb-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 17L15 12.75m0 0L9.75 8.5m5.25 4.25H3M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-lg font-semibold">No Projects Assigned</h2>
            <p className="text-sm">
              You currently have no projects assigned. Check back later.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
