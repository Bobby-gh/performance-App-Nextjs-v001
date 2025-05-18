import React from "react";
import { TopGoalTable } from "@/app/components/tables";
import { BadgesReport, FinancialTrendsReport } from "@/app/components/charts";

export default function Trends() {
  return (
    <div className="mt-8 mx-8">
      <FinancialTrendsReport/>
      <div className="mt-8 card bg-white rounded-lg">
        <TopGoalTable/>
      </div>
    </div>
  );
}
