import BasicStacking from "@/app/components/charts";
import { TopGoalTable } from "@/app/components/tables";
import React from "react";

export default function OperationalEfficiency() {
  return (
    <div className="mt-8 mx-8">
      <BasicStacking />
      <div className="mt-8">
        <TopGoalTable />
      </div>
    </div>
  );
}
