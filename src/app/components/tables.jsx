"use client";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  accessinggoalcolumn,
  departmentcolumn,
  goalsettingcolumn,
  usercolumn,
} from "../api/databook/tabel-column-data";
import { useDepartmentGoalRouteData, useDepartmentRouteData, useEmployeesGoalRouteData, useEmployeesRouteData } from "../api/databook/route-data";

export function GoalTable() {
  const { departmentgoaltable} = useDepartmentGoalRouteData();
  return (
    <div>
      <div style={{ height: 800 }}>
        <DataGrid
          rows={departmentgoaltable}
          columns={goalsettingcolumn}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 15]}
          slots={{ toolbar: GridToolbar }}
          getRowId={(row) => row._id}
          sx={{
            border: 0, 
            borderRadius: 2,
            p: 2,
            minWidth: 300,
        }}
        />
      </div>
    </div>
  );
}

export function MonitorGoalTable() {
  return (
    <div>
      <div style={{ height: 350 }}>
        <DataGrid
          columns={accessinggoalcolumn}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 15]}
          slots={{ toolbar: GridToolbar }}
          getRowId={(row) => row._id}
          sx={{
            border: 0, 
            borderRadius: 2,
            p: 2,
            minWidth: 300,
        }}
        />
      </div>
    </div>
  );
}
export function AccessGoalTable() {
  return (
    <div>
      <div style={{ height: 650 }}>
        <DataGrid
          columns={accessinggoalcolumn}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 15]}
          slots={{ toolbar: GridToolbar }}
          getRowId={(row) => row._id}
          sx={{
            border: 0,
            borderRadius: 2,
            p: 2,
            minWidth: 300,
        }}
        />
      </div>
    </div>
  );
}
export function EmployeeTable() {
  const { employeetable} = useEmployeesRouteData();

  return (
    <div>
      <div style={{ height: 650 }}>
        <DataGrid
          rows={employeetable}
          columns={usercolumn}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 15]}
          slots={{ toolbar: GridToolbar }}
          getRowId={(row) => row._id}
          sx={{
            border: 0,
            borderRadius: 2,
            p: 2,
            minWidth: 300,
        }}
        />
      </div>
    </div>
  );
}
export function DepartmentTable() {
  const { departmenttable} = useDepartmentRouteData();
  console.log(departmenttable)
  return (
    <div>
      <div style={{ height: 650 }}>
        <DataGrid
          rows={departmenttable}
          columns={departmentcolumn}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 15]}
          slots={{ toolbar: GridToolbar }}
          getRowId={(row) => row.departmentId}
          sx={{
            border: 0,
            borderRadius: 2,
            p: 2,
            minWidth: 300,
        }}
        />
      </div>
    </div>
  );
}
