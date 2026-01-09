import React from "react";
import {
  AchievedGoalChart,
  NotAchievedChart,
  PartiallyAchievedChart,
  TargetAchievementChart,
} from "@/app/components/charts";
import { SystemGoalTable } from "@/app/components/tables";
import FinancialProjections from "@/app/components/widgets";

export default function GoalAchievemnetReport() {
  return (
    <div className="mt-8 mx-8">
      <div className="grid grid-cols-3 gap-4">
        <AchievedGoalChart />
        <PartiallyAchievedChart />
        <NotAchievedChart />
      </div>
      <FinancialProjections/> 
      <div className="mt-8 card bg-white rounded-lg">
        <SystemGoalTable/>
      </div>
    </div>
  );
}
