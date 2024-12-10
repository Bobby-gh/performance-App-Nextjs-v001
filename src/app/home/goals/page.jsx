"use client";
import axios from "@/app/api/axios";
import { useMyGoalRouteData } from "@/app/api/databook/route-data";
import { GoalDetails, Goals } from "@/app/components/infocards";
import { GoalSelectContext } from "@/app/contex/context-context";
import React, { useContext } from "react";

export default function MyGoals() {
  const { setGoal } = useContext(GoalSelectContext);
  const { mygoal } = useMyGoalRouteData();

  const handleCardClick = (goal) => {
    setGoal(goal);
  };



  return (
    <main className="m-4 flex space-x-4">
      <div className="flex-[1]">
        <GoalDetails />
      </div>
      <div className="flex-[1.7]">
        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4 cursor-pointer">
          {mygoal.map((goal, index) => (
            <Goals
              key={index}
              id={goal.id}
              goalTitle={goal.goalTitle}
              goalDeadline={goal.goalDeadline}
              status={goal.status}
              progress={goal.actualProgressPercent}
              onClick={() => handleCardClick(goal)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
