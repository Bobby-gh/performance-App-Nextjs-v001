import { LoadingPopup } from "@/app/api/sessions";
import { AccessGoal } from "@/app/components/drawers";
import { AssessNewGoals } from "@/app/components/infocards";
import { AccessGoalTable } from "@/app/components/tables";
import React from "react";


export default function GoalAssessment() {
  return (
    <main className="m-4">
      <LoadingPopup/>
      <div className="mb-4 flex justify-between flex-row">
        <AssessNewGoals/>
        <AccessGoal/>
      </div>
      <div className="mt-16  bg-white rounded-lg">
        <AccessGoalTable />
      </div>
    </main>
  );
}
