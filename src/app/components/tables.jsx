"use client";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  accessinggoalcolumn,
  departmentcolumn,
  goalsettingcolumn,
  usercolumn,
} from "../api/databook/tabel-column-data";
import {
  useDepartmentGoalAccessmentRouteData,
  useDepartmentGoalRouteData,
  useDepartmentRouteData,
  useEmployeesGoalRouteData,
  useEmployeesRouteData,
} from "../api/databook/route-data";

export function GoalTable() {
  const { departmentgoaltable } = useDepartmentGoalRouteData();
  return (
    <div>
      <div>
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
  // const { departassessmenttable } = useDepartmentGoalAccessmentRouteData;
  const { departmentgoaltable } = useDepartmentGoalRouteData();
  return (
    <div>
      <div>
        <DataGrid
          rows={departmentgoaltable}
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
  // const { departassessmenttable } = useDepartmentGoalAccessmentRouteData;
  const { departmentgoaltable } = useDepartmentGoalRouteData();
  return (
    <div>
      <div>
        <DataGrid
          rows={departmentgoaltable}
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

export function TopDepartmentTable() {
  const { departmentgoaltable } = useDepartmentGoalRouteData();
  return (
    <div>
      <div>
        <DataGrid
          rows={departmentgoaltable}
          columns={accessinggoalcolumn}
          getRowId={(row) => row._id}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 15]}
          sx={{
            border: 0,
            borderRadius: 2,
            p: 2,
            minWidth: 300,
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#929da9 !important", 
              color: "black", 
            },
          }}
        />
      </div>
    </div>
  );
}
export function EmployeeTable() {
  const { employeetable } = useEmployeesRouteData();

  return (
    <div>
      <div>
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
  const { departmenttable } = useDepartmentRouteData();
  return (
    <div>
      <div>
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
