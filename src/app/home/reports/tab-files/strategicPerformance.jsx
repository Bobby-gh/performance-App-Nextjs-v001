
import OrganizationPerformanceReport from "@/app/components/charts";
import { TopGoalTable } from "@/app/components/tables";
import React from "react";

export default function StrategicPerformance() {
  return (
    <div className="mt-8 mx-8">
      <OrganizationPerformanceReport/>
      <div className="mt-8">
        <TopGoalTable/>
      </div>
    </div>
  );
}
