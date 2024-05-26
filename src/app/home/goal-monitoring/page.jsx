import { MonitorGoalTable } from "@/app/components/tables";
import React from "react";

export default function GoalMonitoring() {
  return (
    <main className="m-4">
      <div className="mb-4 flex justify-between flex-row">
        <div className="text-xl font-bold text-blue-500">Monitor New Goals</div>
        <div>Monitor Goals</div>
      </div>
      <div className="mt-16 bg-blue-100 shadow-lg shadow-blue-200 rounded-lg">
        <MonitorGoalTable />
      </div>
    </main>
  );
}
