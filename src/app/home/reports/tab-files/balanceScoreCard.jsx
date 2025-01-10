import React from "react";
import {
  CustomerCentricGoal,
  FinancialGoal,
  HumanResourceGoal,
} from "@/app/components/charts";
import { TopGoalTable } from "@/app/components/tables";

export default function BalanceScoreCard() {
  return (
    <div className="mt-8 mx-8">
      <div className="grid grid-cols-3 gap-4">
        <FinancialGoal />
        <HumanResourceGoal />
        <CustomerCentricGoal />
      </div>
      <div className="mt-8 card bg-white rounded-lg">
        <TopGoalTable/>
      </div>
    </div>
  );
}
