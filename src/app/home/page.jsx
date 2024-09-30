import React from "react";
import {
  InformationalSummary,
  UserPerformanceSummary,
} from "../components/infocards";
import {
  GeneralPerformanceDashboard,
  OrganizationPerformanceDashboard,
  PerformanceMatrixDashboard,
} from "../components/charts";
import { LoadingPopup } from "../api/sessions";

export default function dashboard() {
  return (
    <main className="p-4">
      <LoadingPopup />
      <header className="mb-4 text-xl font-semibold">Dashboard</header>
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
      <section className="mt-6">
        <PerformanceMatrixDashboard />
      </section>
    </main>
  );
}
