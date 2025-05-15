import { LoadingPopup } from "@/app/api/sessions";
import { Userforms } from "@/app/components/drawers";
import { AddUser, OrganizationalEmployees } from "@/app/components/infocards";
import { EmployeeTable } from "@/app/components/tables";
import React from "react";

export default function Employees() {
  return (
    <main>
      <LoadingPopup/>
      <div className="mb-4 flex justify-between flex-row">
        <Userforms/>
      </div>
      <div className="mt-16 bg-white rounded-lg">
        <EmployeeTable /> 
      </div>
    </main>
  );
}
