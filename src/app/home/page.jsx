import React from "react";
import {
  DashboardHeader,
  InformationalSummary,
  UserPerformanceSummary,
} from "../components/infocards";
import {
  GeneralPerformanceDashboard,
  OrganizationPerformanceDashboard,
  PerformanceMatrixDashboard,
} from "../components/charts";
import { LoadingPopup } from "../api/sessions";
import { TopGoalTable } from "../components/tables";


export default function dashboard() {
  return (
    <main className="p-4">
      <LoadingPopup />
        <DashboardHeader/>
      <section className="mb-6">
        <InformationalSummary />
      </section>
      <section className="flex gap-4">
        <div className="flex-2 w-full lg:w-2/3">
          <OrganizationPerformanceDashboard />
        </div>
        <div className="flex-1 w-full h-full lg:w-1/3">
          <GeneralPerformanceDashboard />
        </div>
      </section>
      <section className="mt-6 card bg-white rounded-lg">
        <TopGoalTable/>
      </section>
    </main>
  );
}
