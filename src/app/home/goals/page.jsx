'use client'
import { useMyGoalRouteData } from "@/app/api/databook/route-data";
import { AddUser, Goals } from "@/app/components/infocards";
import React from "react";



export default function MyGoals() {
  const { mygoal } = useMyGoalRouteData;
  console.log(mygoal)

  return (
    <main className="mt-8 flex">
    <div className="flex-[1]">
      {/* <AddUser /> */}
    </div>
    <div className="flex-[2]">
      <div className="grid grid-cols-3 2xl:grid-cols-4 gap-4 cursor-pointer">
        {/* {mygoal.map((goal, index) => (
          <Goals
            key={index}
            id={goal.id}
            goalTitle={goal.goalTitle}
            goalDeadline={goal.goalDeadline}
            status={goal.status}
          />
        ))} */}
      </div>
    </div>
  </main>
  );
}

