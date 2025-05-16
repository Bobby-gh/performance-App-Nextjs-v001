import { LoadingPopup } from "@/app/api/sessions";
import { AccessGoal } from "@/app/components/drawers";
import { AccessGoalTable } from "@/app/components/tables";
import React from "react";

export default function GoalAssessment() {
  return (
    <main className="mt-8">
      <LoadingPopup />
      <div className="card bg-white p-8 rounded-lg">
        <div className="flex justify-end mb-4">
          <div className="mt-1">
            <AccessGoal />
          </div>
        </div>
        <div>
          <AccessGoalTable />
        </div>
      </div>
    </main>
  );
}
