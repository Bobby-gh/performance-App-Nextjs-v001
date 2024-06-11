import { LoadingPopup } from "@/app/api/sessions";
import { Userforms } from "@/app/components/drawers";
import { EmployeeTable } from "@/app/components/tables";
import React from "react";

export default function Employees() {
  return (
    <main className="m-4">
      <LoadingPopup/>
      <div className="mb-4 flex justify-between flex-row">
        <div className="text-xl font-bold text-blue-500">Organizational Employess</div>
        <Userforms/>
      </div>
      <div className="mt-16 bg-blue-100 shadow-lg shadow-blue-200 rounded-lg">
        <EmployeeTable />
      </div>
    </main>
  );
}
