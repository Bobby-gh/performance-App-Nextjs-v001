"use client";

import { DataGrid, GridToolbar, gridClasses } from "@mui/x-data-grid";
import { Box, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import {
  useAccessingGoalColumn,
  useGoalSettingColumn,
  useBalanceScoreCardColumn,
  useOperationalEffeciencyColumn,
  useSystemColumn,
  useTopGoalColumn,
  useUserColumn, 
  useDepartmentColumn,

} from "../api/databook/tabel-column-data";
import {
  useDepartmentRouteData,
  useEmployeesRouteData,
  useGoalAccessmentRouteData,
  useGoalRouteData,
  useTopGoalsRouteData,
} from "../api/databook/route-data";

import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useEffect, useMemo } from "react";
import { MdEditNotifications } from "react-icons/md";
import { IoNotificationsCircleOutline } from "react-icons/io5";



export  function GoalTable() {
  const { departmentgoaltable } = useGoalRouteData();
  const departmentGoal = departmentgoaltable? departmentgoaltable : []
  const goalsettingcolumn = useGoalSettingColumn();

 

  const data = useMemo(() => departmentGoal, [departmentGoal]);
  const columns = useMemo(() => goalsettingcolumn, []);
   useEffect(() => {
  console.log("Data changed", data);
}, [data]);

  const handleEdit = (row) => {
    console.log("Edit", row);
  };

  const handleNotifications = (row) => {
    console.log("Notifications", row);
  };


 

  const table = useMaterialReactTable({
    muiTableHeadCellProps: {
      sx: {
        fontWeight: "normal",
        fontSize: "14px",
        background: "#08376B",
        color: "white",
      },
    },
     muiTablePaperProps: {
      elevation: 0,
      sx: {
        borderRadius: "10",
      },
    },
    muiTableBodyProps: {
      sx: {
        "& tr:nth-of-type(even) > td": {
          backgroundColor: "#f5f5f5",
        },
      },
    },
    columns,
    data,
    enableColumnOrdering: true,
    enableRowSelection: true,
    enablePagination: true, 
    enableRowActions: true,
    positionActionsColumn: "last",
    renderRowActionMenuItems: ({ closeMenu, row }) => [
      <MenuItem
        key="edit"
        onClick={() => {
          handleEdit(row);
          closeMenu();
        }}>
        <ListItemIcon>
          <MdEditNotifications fontSize="small" />
        </ListItemIcon>
        <ListItemText>Edit</ListItemText>
      </MenuItem>,
      <MenuItem
        key="notifications"
        onClick={() => {
          handleNotifications(row);
          closeMenu();
        }}>
        <ListItemIcon>
          <IoNotificationsCircleOutline fontSize="small" />
        </ListItemIcon>
        <ListItemText>Notifications</ListItemText>
      </MenuItem>,
    ],
  });

  return <MaterialReactTable table={table} />;
}

export  function AccessGoalTable() {
  const { goalAssessmentData } = useGoalAccessmentRouteData();
  const accessinggoalcolumn = useAccessingGoalColumn();

  
  const data = useMemo(() => goalAssessmentData, [goalAssessmentData]);
  const columns = useMemo(() => accessinggoalcolumn, []);

  const handleEdit = (row) => {
    console.log("Edit", row);
  };

  const handleNotifications = (row) => {
    console.log("Notifications", row);
  };


 

  const table = useMaterialReactTable({
    muiTableHeadCellProps: {
      sx: {
        fontWeight: "normal",
        fontSize: "14px",
        background: "#08376B",
        color: "white",
      },
    },
     muiTablePaperProps: {
      elevation: 0,
      sx: {
        borderRadius: "10",
      },
    },
    muiTableBodyProps: {
      sx: {
        "& tr:nth-of-type(even) > td": {
          backgroundColor: "#f5f5f5",
        },
      },
    },
    columns,
    data,
    enableColumnOrdering: true,
    enableRowSelection: true,
    enablePagination: true, 
    enableRowActions: true,
    positionActionsColumn: "last",
    renderRowActionMenuItems: ({ closeMenu, row }) => [
      <MenuItem
        key="edit"
        onClick={() => {
          handleEdit(row);
          closeMenu();
        }}>
        <ListItemIcon>
          <MdEditNotifications fontSize="small" />
        </ListItemIcon>
        <ListItemText>Edit</ListItemText>
      </MenuItem>,
      <MenuItem
        key="notifications"
        onClick={() => {
          handleNotifications(row);
          closeMenu();
        }}>
        <ListItemIcon>
          <IoNotificationsCircleOutline fontSize="small" />
        </ListItemIcon>
        <ListItemText>Notifications</ListItemText>
      </MenuItem>,
    ],
  });

  return <MaterialReactTable table={table} />;
}

export  function DepartmentTable() {
  const { departmenttable } = useDepartmentRouteData();
  const departmentcolumn = useDepartmentColumn();

  
  const data = useMemo(() => departmenttable, [departmenttable]);
  const columns = useMemo(() => departmentcolumn, []);

  const handleEdit = (row) => {
    console.log("Edit", row);
  };

  const handleNotifications = (row) => {
    console.log("Notifications", row);
  };


 

  const table = useMaterialReactTable({
    muiTableHeadCellProps: {
      sx: {
        fontWeight: "normal",
        fontSize: "14px",
        background: "#08376B",
        color: "white",
      },
    },
     muiTablePaperProps: {
      elevation: 0,
      sx: {
        borderRadius: "10",
      },
    },
    muiTableBodyProps: {
      sx: {
        "& tr:nth-of-type(even) > td": {
          backgroundColor: "#f5f5f5",
        },
      },
    },
    columns,
    data,
    enableColumnOrdering: true,
    enableRowSelection: true,
    enablePagination: true, 
    enableRowActions: true,
    positionActionsColumn: "last",
    renderRowActionMenuItems: ({ closeMenu, row }) => [
      <MenuItem
        key="edit"
        onClick={() => {
          handleEdit(row);
          closeMenu();
        }}>
        <ListItemIcon>
          <MdEditNotifications fontSize="small" />
        </ListItemIcon>
        <ListItemText>Edit</ListItemText>
      </MenuItem>,
      <MenuItem
        key="notifications"
        onClick={() => {
          handleNotifications(row);
          closeMenu();
        }}>
        <ListItemIcon>
          <IoNotificationsCircleOutline fontSize="small" />
        </ListItemIcon>
        <ListItemText>Notifications</ListItemText>
      </MenuItem>,
    ],
  });

  return <MaterialReactTable table={table} />;
}

export  function EmployeeTable() {
  const { employeetable } = useEmployeesRouteData();
  const usercolumn = useUserColumn();

  
  const data = useMemo(() => employeetable, [employeetable]);
  const columns = useMemo(() => usercolumn, []);

  const handleEdit = (row) => {
    console.log("Edit", row);
  };

  const handleNotifications = (row) => {
    console.log("Notifications", row);
  };


 

  const table = useMaterialReactTable({
    muiTableHeadCellProps: {
      sx: {
        fontWeight: "normal",
        fontSize: "14px",
        background: "#08376B",
        color: "white",
      },
    },
     muiTablePaperProps: {
      elevation: 0,
      sx: {
        borderRadius: "10",
      },
    },
    muiTableBodyProps: {
      sx: {
        "& tr:nth-of-type(even) > td": {
          backgroundColor: "#f5f5f5",
        },
      },
    },
    columns,
    data,
    enableColumnOrdering: true,
    enableRowSelection: true,
    enablePagination: true, 
    enableRowActions: true,
    positionActionsColumn: "last",
    renderRowActionMenuItems: ({ closeMenu, row }) => [
      <MenuItem
        key="edit"
        onClick={() => {
          handleEdit(row);
          closeMenu();
        }}>
        <ListItemIcon>
          <MdEditNotifications fontSize="small" />
        </ListItemIcon>
        <ListItemText>Edit</ListItemText>
      </MenuItem>,
      <MenuItem
        key="notifications"
        onClick={() => {
          handleNotifications(row);
          closeMenu();
        }}>
        <ListItemIcon>
          <IoNotificationsCircleOutline fontSize="small" />
        </ListItemIcon>
        <ListItemText>Notifications</ListItemText>
      </MenuItem>,
    ],
  });

  return <MaterialReactTable table={table} />;
}

export function TopDepartmentTable() {
  const { departmentgoaltable } = useGoalRouteData();
  const accessinggoalcolumn = useAccessingGoalColumn();
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



export function TopGoalTable() {
  const { topGoal } = useTopGoalsRouteData();
    const topgoalcolumn = useTopGoalColumn();

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
  const operationaleffeciencycolumn = useOperationalEffeciencyColumn();

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
    const systemcolumn = useSystemColumn();

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
  const balancescorecardcolumn = useBalanceScoreCardColumn();

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
