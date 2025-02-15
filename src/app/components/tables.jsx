"use client";

import { DataGrid, GridToolbar, gridClasses } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import {
  accessinggoalcolumn,
  balancescorecardcolumn,
  departmentcolumn,
  goalsettingcolumn,
  operationaleffeciencycolumn,
  systemcolumn,
  topgoalcolumn,
  usercolumn,
} from "../api/databook/tabel-column-data";
import {
  useDepartmentRouteData,
  useEmployeesRouteData,
  useGoalAccessmentRouteData,
  useGoalRouteData,
  useTopGoalsRouteData,
} from "../api/databook/route-data";

export function GoalTable() {
  const { departmentgoaltable } = useGoalRouteData();
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

export function AccessGoalTable() {
  const { goalAssessmentData } = useGoalAccessmentRouteData();
  return (
    <div>
      <div>
      <Box
          sx={{
            [`.${gridClasses.cell}.veryhigh`]: {
              backgroundColor: "#F84626",
            },
            [`.${gridClasses.cell}.high`]: {
              backgroundColor: "#ecbe2f",
            },
            [`.${gridClasses.cell}.medium`]: {
              backgroundColor: "#0B37D6",
            },
            [`.${gridClasses.cell}.low`]: {
              backgroundColor: "#4A7C0B",
            },
            [`.${gridClasses.cell}.empty`]: {
              backgroundColor: "#808080",
            },
            height: 650,
          }}>
        <DataGrid
          rows={goalAssessmentData}
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
          getCellClassName={(params) => {
            const value = params.value;
            if (value === "pending ...") {
              return "empty";
            }
            if (typeof value === "number") {
              if (value >= 80) {
                return "low";
              } else if (value >= 50) {
                return "medium";
              } else if (value >= 20) {
                return "veryhigh";
              } else {
                return "high";
              }
            }
          }}
        />
        </Box>
      </div>
    </div>
  );
}

export function TopDepartmentTable() {
  const { departmentgoaltable } = useGoalRouteData();
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
          getRowId={(row) => row.userId}
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

export function TopGoalTable() {
  const { topGoal } = useTopGoalsRouteData();
  return (
    <div>
      <div>
      <Box
          sx={{
            [`.${gridClasses.cell}.veryhigh`]: {
              backgroundColor: "#F84626",
            },
            [`.${gridClasses.cell}.high`]: {
              backgroundColor: "#ecbe2f",
            },
            [`.${gridClasses.cell}.medium`]: {
              backgroundColor: "#0B37D6",
            },
            [`.${gridClasses.cell}.low`]: {
              backgroundColor: "#4A7C0B",
            },
            [`.${gridClasses.cell}.empty`]: {
              backgroundColor: "#808080",
            },
            height: 650,
          }}>
        <DataGrid
          rows={topGoal}
          columns={topgoalcolumn}
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
          getCellClassName={(params) => {
            const value = params.value;
            if (value === "pending ...") {
              return "empty";
            }
            if (typeof value === "number") {
              if (value >= 80) {
                return "low";
              } else if (value >= 50) {
                return "medium";
              } else if (value >= 20) {
                return "veryhigh";
              } else {
                return "high";
              }
            }
          }}
        />
        </Box>
      </div>
    </div>
  );
}

export function OperationalEffeciencyTable() {
  const { departmentgoaltable } = useGoalRouteData();
  return (
    <div>
      <div>
        <Box
          sx={{
            [`.${gridClasses.cell}.veryhigh`]: {
              backgroundColor: "#F84626",
            },
            [`.${gridClasses.cell}.high`]: {
              backgroundColor: "#ecbe2f",
            },
            [`.${gridClasses.cell}.medium`]: {
              backgroundColor: "#0B37D6",
            },
            [`.${gridClasses.cell}.low`]: {
              backgroundColor: "#4A7C0B",
            },
            [`.${gridClasses.cell}.empty`]: {
              backgroundColor: "#808080",
            },
            height: 650,
          }}>
          <DataGrid
            rows={departmentgoaltable}
            columns={operationaleffeciencycolumn}
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
            getCellClassName={(params) => {
              const value = params.value;
              if (value === "pending ...") {
                return "empty";
              }
              if (typeof value === "number") {
                if (value >= 80) {
                  return "low";
                } else if (value >= 50) {
                  return "medium";
                } else if (value >= 20) {
                  return "veryhigh";
                } else {
                  return "high";
                }
              }
            }}
          />
        </Box>
      </div>
    </div>
  );
}

export function SystemGoalTable() {
  const { departmentgoaltable } = useGoalRouteData();
  return (
    <div>
      <div>
        <Box
          sx={{
            [`.${gridClasses.cell}.veryhigh`]: {
              backgroundColor: "#F84626",
            },
            [`.${gridClasses.cell}.high`]: {
              backgroundColor: "#ecbe2f",
            },
            [`.${gridClasses.cell}.medium`]: {
              backgroundColor: "#0B37D6",
            },
            [`.${gridClasses.cell}.low`]: {
              backgroundColor: "#4A7C0B",
            },
            [`.${gridClasses.cell}.empty`]: {
              backgroundColor: "#808080",
            },
            height: 650,
          }}>
          <DataGrid
            rows={departmentgoaltable}
            columns={systemcolumn}
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
            getCellClassName={(params) => {
              const value = params.value;
              if (value === "pending ...") {
                return "empty";
              }
              if (typeof value === "number") {
                if (value >= 80) {
                  return "low";
                } else if (value >= 50) {
                  return "medium";
                } else if (value >= 20) {
                  return "veryhigh";
                } else {
                  return "high";
                }
              }
            }}
          />
        </Box>
      </div>
    </div>
  );
}

export function BalaceScorecardTable() {
  const { departmentgoaltable } = useGoalRouteData();
  return (
    <div>
      <div>
        <DataGrid
          rows={departmentgoaltable}
          columns={balancescorecardcolumn}
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
