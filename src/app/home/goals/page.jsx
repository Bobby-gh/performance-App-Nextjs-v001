import { useMyGoalRouteData } from "@/app/api/databook/route-data";
import { Goals } from "@/app/components/infocards";
import React from "react";



export default function MyGoals() {
  const { mygoal } = useMyGoalRouteData();

  return (
    <div className="grid grid-cols-3 2xl:grid-cols-4 gap-4 cursor-pointer">
      {mygoal.map((card, index) => (
        <Goals
          key={index}
          title={card.taskAssignedTo} // Pass the appropriate title
          date={card.goalDeadline} // Pass the appropriate date
        />
      ))}
    </div>
  );
}

