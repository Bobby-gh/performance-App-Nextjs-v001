import React from "react";
import {InformationalSummary, UserPerformanceSummary } from "../components/infocards";
import { GeneralPerformanceDashboard, OrganizationPerformanceDashboard, PerformanceMatrixDashboard } from "../components/charts";
import { LoadingPopup } from "../api/sessions";

export default function dashboard() {
  return (
    <main className="m-4">
      <LoadingPopup/>
      <div className="mb-4">Dashboard</div>
      <InformationalSummary />
      <div className="grid xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2">
          <OrganizationPerformanceDashboard />
          <PerformanceMatrixDashboard/>
        </div>
        <div>
          <GeneralPerformanceDashboard/>
          <UserPerformanceSummary/>
        </div>
      </div>
    </main>
  );
}
