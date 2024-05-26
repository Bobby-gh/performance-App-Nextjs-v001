import { AccessGoal } from "@/app/components/drawers";
import { AccessGoalTable } from "@/app/components/tables";
import React from "react";

export default function GoalAssessment() {
  return (
    <main className="m-4">
      <div className="mb-4 flex justify-between flex-row">
        <div className="text-xl font-bold text-blue-500">Assess New Goals</div>
        <AccessGoal/>
      </div>
      <div className="mt-16  bg-blue-100 shadow-lg shadow-blue-200 rounded-lg">
        <AccessGoalTable />
      </div>
    </main>
  );
}
