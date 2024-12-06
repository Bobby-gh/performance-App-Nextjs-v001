"use client";
import { useMyGoalRouteData } from "@/app/api/databook/route-data";
import { AddUser, Goals } from "@/app/components/infocards";
import React from "react";

export default function MyGoals() {
  const { mygoal } = useMyGoalRouteData();
  console.log({ "my goals:": mygoal });

  return (
    <main className="m-4">
      <div className="flex-[1]">
        <AddUser />
      </div>
      <div className="flex-[1.7]">
        <div className="grid grid-cols-2 2xl:grid-cols-3 gap-4 cursor-pointer">
          {mygoal.map((goal, index) => (
            <Goals
              key={index}
              id={goal.id}
              goalTitle={goal.goalTitle}
              goalDeadline={goal.goalDeadline}
              status={goal.status}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
