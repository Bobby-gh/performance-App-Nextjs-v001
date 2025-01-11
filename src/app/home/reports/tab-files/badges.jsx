import React from "react";
import { TopGoalTable } from "@/app/components/tables";
import { BadgesReport } from "@/app/components/charts";

export default function Badges() {
  return (
    <div className="mt-8 mx-8">
      <BadgesReport/>
      <div className="mt-8 card bg-white rounded-lg">
        <TopGoalTable/>
      </div>
    </div>
  );
}
