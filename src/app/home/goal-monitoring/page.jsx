import { InProgressVsCompleted, ProgressLineChat } from "@/app/components/charts";
import { MonitorGoalTable } from "@/app/components/tables";
import React from "react";

export default function GoalMonitoring() {
  return (
    <main className="m-4">
      <div className="mb-4 flex justify-between flex-row">
        <div className="text-xl font-bold text-blue-500">Monitor New Goals</div>
        <div>Monitor Goals</div>
      </div>
      <div className="flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="col-span-2">
            <ProgressLineChat />
          </div>
          <div className="flex flex-col justify-center card">
            <InProgressVsCompleted />
          </div>
        </div>
        <RiskMonitor />
      </div>
    </main>
  );
}
