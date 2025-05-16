import { LoadingPopup } from "@/app/api/sessions";
import { Departmentforms } from "@/app/components/drawers";
import { DepartmentTable } from "@/app/components/tables";
import React from "react";

export default function Department() {
  return (
    <main className="mt-8">
      <LoadingPopup />
      <div className="card bg-white p-8 rounded-lg">
        <div className="flex justify-end mb-4">
          <div className="mt-1">
            <Departmentforms />
          </div>
        </div>
        <div>
          <DepartmentTable />
        </div>
      </div>
    </main>
  );
}
