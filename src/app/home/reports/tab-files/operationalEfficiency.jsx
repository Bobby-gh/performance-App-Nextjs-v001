import OrganizationalEfficiency from "@/app/components/charts";
import { TopGoalTable } from "@/app/components/tables";
import React from "react";

export default function OperationalEfficiency() {
  return (
    <div className="mt-8 mx-8">
      <OrganizationalEfficiency />
      <div className="mt-8 card bg-white rounded-lg">
        <TopGoalTable />
      </div>
    </div>
  );
}
