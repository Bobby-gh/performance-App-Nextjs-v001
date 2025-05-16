import { LoadingPopup } from "@/app/api/sessions";
import { CreateGoal } from "@/app/components/drawers";
import { GoalTable } from "@/app/components/tables";
import React from "react";

export default function GoalSetting() {
  
  return (
    <main className="mt-8">
      <LoadingPopup/>
      <div className="card bg-white p-8 rounded-lg">
        <div className="flex justify-end mb-4">
          <div className="mt-1">
            <CreateGoal/>
          </div>
        </div>
        <div>
          <GoalTable/>
        </div>
      </div>
    </main>
  );
}
