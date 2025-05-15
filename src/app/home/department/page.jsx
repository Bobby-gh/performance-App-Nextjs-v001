import { LoadingPopup } from "@/app/api/sessions";
import { Departmentforms } from "@/app/components/drawers";
import { AddDepartment, OrganisationalDepartment } from "@/app/components/infocards";
import { DepartmentTable } from "@/app/components/tables";
import React from "react";

export default function Department() {
  return (
    <main>
      <LoadingPopup/>
      <div className="mb-4 flex justify-between flex-row">
        <Departmentforms/>
      </div>
      <div className="mt-16 bg-white rounded-lg">
        <DepartmentTable />
      </div>
    </main>
  );
}
