"use client";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  accessinggoalcolumn,
  goalsettingcolumn,
} from "../api/databook/tabel-column-data";
import { useEmployeesGoalRouteData } from "../api/databook/route-data";

export function GoalTable() {
  return (
    <div>
      <div style={{ height: 800 }}>
        <DataGrid
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
  const { employeetable, error } = useEmployeesGoalRouteData();
  
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div style={{ height: 650 }}>
        <DataGrid
          rows={employeetable}
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
export function DepartmentTable() {
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
