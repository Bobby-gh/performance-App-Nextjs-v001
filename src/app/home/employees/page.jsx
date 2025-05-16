import { LoadingPopup } from "@/app/api/sessions";
import { Userforms } from "@/app/components/drawers";
import { EmployeeTable } from "@/app/components/tables";
import React from "react";

export default function Employees() {
  return (
    <main className="mt-8">
      <LoadingPopup />
      <div className="card bg-white p-8 rounded-lg">
        <div className="flex justify-end mb-4">
          <div className="mt-1">
            <Userforms />
          </div>
        </div>
        <div>
          <EmployeeTable />
        </div>
      </div>
    </main>
  );
}
