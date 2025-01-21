import { OperationalEffeciencyTable, TopGoalTable } from "@/app/components/tables";
import React from "react";

export default function OperationalEfficiency() {
  return (
    <div className="mt-8 mx-8">
      <div className="mt-8 card bg-white rounded-lg">
        <OperationalEffeciencyTable/>
      </div>
    </div>
  );
}
