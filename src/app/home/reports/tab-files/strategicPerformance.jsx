import { OrganizationPerformanceDashboard } from "@/app/components/charts";
import { TopGoalTable } from "@/app/components/tables";
import React from "react";

export default function StrategicPerformance() {
  return (
    <div className="mt-8 mx-8">
      <OrganizationPerformanceDashboard/>
      <div className="mt-8 card bg-white rounded-lg">
        <TopGoalTable/>
      </div>
    </div>
  );
}
