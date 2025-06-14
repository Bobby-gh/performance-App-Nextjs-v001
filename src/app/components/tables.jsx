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
  useEmployeeRatingColumn,
  BadgesTable,
} from "../api/databook/tabel-column-data";
import {
  useDepartmentRouteData,
  useEmployeesRouteData,
  useGoalAccessmentRouteData,
  useGoalRouteData,
  useTopGoalsRouteData,
  useUserGoalBadgesTableData,
} from "../api/databook/route-data";

import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useContext, useEffect, useMemo, useState } from "react";
import {
  MdDelete,
  MdEditNotifications,
  MdOutlineGeneratingTokens,
} from "react-icons/md";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { Modaltrigger } from "../contex/context-context";
import {
  AssessGoal,
  AssignGoal,
  EmployeeDetails,
  EmployeeRating,
} from "./tableDetails";
import { Delete } from "./widgets";
import { useTranslation } from "react-i18next";
import { FaRegEdit } from "react-icons/fa";

export function GoalTable() {
  const { departmentgoaltable, fetchData } = useGoalRouteData();
  const { t } = useTranslation();
  const goalsettingcolumn = useGoalSettingColumn();
  const { trigger, resettriggerComponent } = useContext(Modaltrigger);
  const [open, setOpen] = useState(false);
  const [deleteRow, setDeleteRow] = useState(false);
  const [deleteItem, setDeleteItem] = useState("");
  const [assignGoalInfo, setAssignGoalInfo] = useState("");
  const rawData = departmentgoaltable?.data || [];
  const data = useMemo(() => rawData, [rawData]);
  const columns = useMemo(() => goalsettingcolumn, []);

  const handleClose = () => {
    setOpen(false);
    setAssignGoalInfo("");
  };

  useEffect(() => {
    const fetchAndReset = async () => {
      if (!trigger) return;
      try {
        await fetchData();
      } finally {
        resettriggerComponent();
      }
    };

    fetchAndReset();
  }, [trigger]);

  const handleEdit = (row) => {
    console.log("Edit", row);
    setAssignGoalInfo(row.original);
    setOpen(true);
  };

  const handleCloseDelete = (row) => {
    setDeleteRow(false);
    setDeleteItem("");
  };

  const handleDelete = (row) => {
    console.log("Notifications", row);
    setDeleteItem(row.original._id);
    setDeleteRow(true);
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
        <ListItemText>{t("edit")}</ListItemText>
      </MenuItem>,
      <MenuItem
        key="notifications"
        onClick={() => {
          handleDelete(row);
          closeMenu();
        }}>
        <ListItemIcon>
          <MdDelete fontSize="small" />
        </ListItemIcon>
        <ListItemText>{t("delete")}</ListItemText>
      </MenuItem>,
    ],
  });

  return (
    <div>
      <MaterialReactTable table={table} />
      {open && assignGoalInfo && (
        <AssignGoal data={assignGoalInfo} open={open} onClose={handleClose} />
      )}
      {deleteRow && (
        <Delete
          data={deleteItem}
          message="Are you sure you want to delete Goal?"
          name="goal"
          open={deleteItem}
          onClose={handleCloseDelete}
        />
      )}
    </div>
  );
}


export function EmployeeBadgeTable() {
  const { t } = useTranslation();
  const { getallUserBadges } = useUserGoalBadgesTableData();
  const rawData = getallUserBadges?.data?.usersResponse || [];
  const data = useMemo(() => rawData, [rawData]);

  const columns = useMemo(() => {
    return [
      {
        accessorKey: "name",
        header: t("name"),
      },
      {
        accessorKey: "department",
        header: t("department"),
      },
      {
        accessorKey: "performance",
        header: t("performance"),
      },
      {
        accessorKey: "badge",
        header: t("badge"),
        Cell: ({ cell }) => {
          const rawValue = cell.getValue();
          const lower = typeof rawValue === "string" ? rawValue.toLowerCase() : "";

          const translatedValue = (() => {
            switch (lower) {
              case "outstanding":
                return t("outstanding");
              case "exceeds expectations":
                return t("exceedsExpectations");
              case "meets expectations":
                return t("meetsExpectations");
              case "below expectations":
                return t("belowExpectations");
              case "pending ...":
                return t("pending");
              default:
                return rawValue || "-";
            }
          })();

          return <span>{translatedValue}</span>;
        },
      },
    ];
  }, [t]);

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

    muiTableBodyCellProps: ({ cell }) => {
      if (cell.column.id === "badge") {
        const rawValue = cell.getValue();
        const value = typeof rawValue === "string" ? rawValue.toLowerCase() : "";
        let bgColor = "";
        let color = "#fff";

        switch (value) {
          case "outstanding":
            bgColor = "#FFD700"; // Gold
            color = "#000";
            break;
          case "exceeds expectations":
            bgColor = "#CD7F32"; // Bronze
            break;
          case "meets expectations":
            bgColor = "#C0C0C0"; // Silver
            color = "#000";
            break;
          case "below expectations":
            bgColor = "#F84626"; // Red
            break;
          case "pending ...":
            bgColor = "#808080"; // Gray
            break;
          default:
            bgColor = "#e0e0e0"; // Fallback
            color = "#000";
        }

        return {
          sx: {
            backgroundColor: `${bgColor} !important`,
            color: `${color} !important`,
            fontWeight: "bold",
            textTransform: "capitalize",
          },
        };
      }

      return {};
    },
  });

  return (
    <div>
      <MaterialReactTable table={table} />
    </div>
  );
}


export function AccessGoalTable() {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const {auth} = useContext(Modaltrigger);
  const isManager = auth?.refNum === "ref?2!";
  const [assessGoalInfo, setAssessGoalInfo] = useState("");
  const { goalAssessment } = useGoalAccessmentRouteData();
  const accessinggoalcolumn = useAccessingGoalColumn(isManager);
  const [deleteRow, setDeleteRow] = useState(false);
  const [deleteItem, setDeleteItem] = useState("");

  const handleClose = () => {
    setOpen(false);
    setAssessGoalInfo("");
  };

  const handleCloseDelete = () => {
    setDeleteRow(false);
    setDeleteItem("");
  };

  const handleEdit = (row) => {
    console.log("Edit", row);
    setAssessGoalInfo(row.original);
    setOpen(true);
  };

  const handleDelete = (row) => {
    setDeleteItem(row.original._id);
    setDeleteRow(true);
  };

    const goalAssessmentData = goalAssessment.map((goal) => ({
    _id: goal._id,
    goalTitle: goal.goalAssessed?.goalTitle || "",
    goalStatus: goal.goalAssessed?.status || "",
    taskAssignedTo: goal.goalAssessed?.taskAssignedTo?.departmentName || "",
    fullName: goal.goalAssessed?.taskAssignedTo?.fullName || "",
    goalDeadline: new Date(goal.goalAssessed?.goalDeadline).toLocaleDateString() || "",
    performancePercent: goal.averageRating?.performancePercent || 0,
    workQuality: goal.workQuality ?? 0,
    productivity: goal.productivity ?? 0,
    communication: goal.communication ?? 0,
    proceduralKnowledge: goal.proceduralKnowledge ?? 0,
    reliability: goal.reliability ?? 0,
    teamwork: goal.teamwork ?? 0,
    creativity: goal.creativity ?? 0,
    comment: goal.comment || "",
    rating: goal.rating || "",
  }));


  const data = useMemo(
    () => (goalAssessment ? goalAssessmentData : []),
    [goalAssessment]
  );

 

  // Inject MRN column override
const columns = useMemo(() => {
  return accessinggoalcolumn.filter((col) => {
    if (isManager) {
      return col.accessorKey !== "taskAssignedTo"; // hide taskAssignedTo for managers
    } else {
      return col.accessorKey !== "mainGoal"; // hide mainGoal for non-managers
    }
  });
}, [accessinggoalcolumn, isManager]);

  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnOrdering: true,
    enableRowSelection: true,
    enablePagination: true,
    enableRowActions: true,
    positionActionsColumn: "last",

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
        borderRadius: "10px",
      },
    },
    muiTableBodyProps: {
      sx: {
        "& tr:nth-of-type(even) > td": {
          backgroundColor: "#f5f5f5",
        },
      },
    },

    muiTableBodyCellProps: ({ cell }) => {
      if (cell.column.id === "performancePercent") {
        const value = cell.getValue();
        let bgColor = "";
        let color = "#fff";

        if (value === "pending ...") {
          bgColor = "#808080";
        } else if (typeof value === "number") {
          if (value >= 80) {
            bgColor = "#4A7C0B";
          } else if (value >= 50) {
            bgColor = "#0B37D6";
          } else if (value >= 20) {
            bgColor = "#F84626";
          } else {
            bgColor = "#ecbe2f";
            color = "#000"; // improve contrast
          }
        }

        return {
          sx: {
            backgroundColor: `${bgColor} !important`,
            color: `${color} !important`,
            fontWeight: "bold",
          },
        };
      }

      return {};
    },

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
        <ListItemText>{t("edit")}</ListItemText>
      </MenuItem>,
      <MenuItem
        key="delete"
        onClick={() => {
          handleDelete(row);
          closeMenu();
        }}>
        <ListItemIcon>
          <MdDelete fontSize="small" />
        </ListItemIcon>
        <ListItemText>{t("delete")}</ListItemText>
      </MenuItem>,
    ],
  });

  return (
    <div>
      <MaterialReactTable table={table} />
      {open && assessGoalInfo && (
        <AssessGoal data={assessGoalInfo} open={open} onClose={handleClose} />
      )}
      {deleteRow && (
        <Delete
          data={deleteItem}
          message="Are you sure you want to delete Assessment?"
          name="accessGoal"
          open={deleteItem}
          onClose={handleCloseDelete}
        />
      )}
    </div>
  );
}

export function DepartmentTable() {
  const { departmenttable } = useDepartmentRouteData();
  const { t } = useTranslation();
  const departmentcolumn = useDepartmentColumn();
  const [deleteRow, setDeleteRow] = useState(false);
  const [deleteItem, setDeleteItem] = useState("");

  const data = useMemo(() => departmenttable, [departmenttable]);
  const columns = useMemo(() => departmentcolumn, []);

  const handleCloseDelete = (row) => {
    setDeleteRow(false);
    setDeleteItem("");
  };

  const handleDelete = (row) => {
    console.log("Notifications", row);
    setDeleteItem(row.original.departmentId);
    setDeleteRow(true);
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
        key="delete"
        onClick={() => {
          handleDelete(row);
          closeMenu();
        }}>
        <ListItemIcon>
          <MdDelete fontSize="small" />
        </ListItemIcon>
        <ListItemText>{t("delete")}</ListItemText>
      </MenuItem>,
    ],
  });

  return (
    <>
      <MaterialReactTable table={table} />
      {deleteRow && (
        <Delete
          data={deleteItem}
          message="Are you sure you want to delete Department?"
          name="department"
          open={deleteItem}
          onClose={handleCloseDelete}
        />
      )}
    </>
  );
}

export function EmployeeTable() {
  const { employeetable } = useEmployeesRouteData();
  const { t } = useTranslation();
  const usercolumn = useUserColumn();
  const [open, setOpen] = useState(false);
  const [employeeInfo, setEmployeeInfo] = useState("");
  const [employeeRating, setEmployeeRating] = useState("");
  const [deleteRow, setDeleteRow] = useState(false);
  const [ratingRow, setRatingRow] = useState(false);
  const [deleteItem, setDeleteItem] = useState("");

  const data = useMemo(() => employeetable, [employeetable]);
  const columns = useMemo(() => usercolumn, []);

  const handleClose = () => {
    setOpen(false);
    setEmployeeInfo("");
  };

  const handleEdit = (row) => {
    console.log("Edit", row);
    setEmployeeInfo(row.original);
    setOpen(true);
  };

  const handleRating = (row) => {
    console.log("row", row);
    setEmployeeRating(row.original);
    setRatingRow(true);
  };

  const handleCloseDelete = (row) => {
    setDeleteRow(false);
    setDeleteItem("");
  };

  const handleDelete = (row) => {
    console.log("Notifications", row);
    setDeleteItem(row.original.userId);
    setDeleteRow(true);
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
          <FaRegEdit fontSize="small" />
        </ListItemIcon>
        <ListItemText>{t("edit")}</ListItemText>
      </MenuItem>,
      <MenuItem
        key="rating"
        onClick={() => {
          handleRating(row);
          closeMenu();
        }}>
        <ListItemIcon>
          <MdOutlineGeneratingTokens fontSize="small" />
        </ListItemIcon>
        <ListItemText>{t("ratings")}</ListItemText>
      </MenuItem>,
      <MenuItem
        key="delete"
        onClick={() => {
          handleDelete(row);
          closeMenu();
        }}>
        <ListItemIcon>
          <MdDelete fontSize="small" />
        </ListItemIcon>
        <ListItemText>{t("delete")}</ListItemText>
      </MenuItem>,
    ],
  });

  return (
    <>
      <MaterialReactTable table={table} />
      {open && employeeInfo && (
        <EmployeeDetails
          data={employeeInfo}
          open={open}
          onClose={handleClose}
        />
      )}
      {deleteRow && (
        <Delete
          data={deleteItem}
          message="Are you sure you want to delete User?"
          name="user"
          open={deleteItem}
          onClose={handleCloseDelete}
        />
      )}

      {ratingRow && (
        <EmployeeRating
          open={ratingRow}
          onClose={() => setRatingRow(false)}
          data={employeeRating}
        />
      )}
    </>
  );
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
