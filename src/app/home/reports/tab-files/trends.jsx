import React from "react";
import { TopGoalTable } from "@/app/components/tables";
import { BadgesReport, ComparativeTrendsReport, FinancialTrendsReport, InnovationTrendsReport } from "@/app/components/charts";

export default function Trends() {
  return (
    <div className="mt-8 mx-8 space-y-8">
      <FinancialTrendsReport/>
      <InnovationTrendsReport/>
      <ComparativeTrendsReport/>
    </div>
  );
}
