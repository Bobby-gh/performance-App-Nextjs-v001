import React from "react";
import {
  AchievedGoalChart,
  NotAchievedChart,
  PartiallyAchievedChart,
  TargetAchievementChart,
} from "@/app/components/charts";
import { SystemGoalTable } from "@/app/components/tables";

export default function GoalAchievemnetReport() {
  return (
    <div className="mt-8 mx-8">
      <div className="grid grid-cols-3 gap-4">
        <AchievedGoalChart />
        <PartiallyAchievedChart />
        <NotAchievedChart />
        <TargetAchievementChart/>
      </div>
      <div className="mt-8 card bg-white rounded-lg">
        <SystemGoalTable/>
      </div>
    </div>
  );
}
