import React from "react";
import {
  CustomerCentricGoal,
  FinancialGoal,
  HumanResourceGoal,
  InternalProcessandInnovation,
} from "@/app/components/charts";
import { GoalTable} from "@/app/components/tables";

export default function BalanceScoreCard() {
  return (
    <div className="mt-8 mx-8">
      <div className="grid grid-cols-4 sm:grid-cols-2 gap-4">
        <FinancialGoal />
        <HumanResourceGoal />
        <CustomerCentricGoal />
        <InternalProcessandInnovation/>
      </div>
      <div className="mt-8 card bg-white rounded-lg">
        <GoalTable/>
      </div>
    </div>
  );
}
