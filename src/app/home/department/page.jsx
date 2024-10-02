import { LoadingPopup } from "@/app/api/sessions";
import { Departmentforms } from "@/app/components/drawers";
import { AddDepartment } from "@/app/components/infocards";
import { DepartmentTable } from "@/app/components/tables";
import React from "react";

export default function Department() {
  return (
    <main className="m-4">
      <LoadingPopup/>
      <div className="mb-4 flex justify-between flex-row">
        <div className="text-xl font-bold text-blue-500">Organizational Department</div>
      </div>
      <AddDepartment/>
      <div className="mt-16 bg-white rounded-lg">
        <DepartmentTable />
      </div>
    </main>
  );
}
