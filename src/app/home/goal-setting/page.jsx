import { LoadingPopup } from "@/app/api/sessions";
import { CreateGoal } from "@/app/components/drawers";
import { GoalsHeader } from "@/app/components/infocards";
import { GoalTable } from "@/app/components/tables";
import React from "react";

export default function GoalSetting() {
  
  return (
    <main className="m-4">
      <LoadingPopup/>
      <div className="mb-4 flex justify-between flex-row">
        <CreateGoal/>
      </div>
      <div className="mt-16  bg-white rounded-lg">
        <GoalTable />
      </div>
    </main>
  );
}
