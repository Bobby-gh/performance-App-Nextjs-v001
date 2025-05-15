import { AssessGoal, AssignGoal } from "@/app/components/tableDetails";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export const useGoalSettingColumn = () => {
  const { t } = useTranslation();

  return [
    {
      accessorKey: "goalTitle",
      header: t("goalTitle"),
      flex: 1,
      headerClassName: "header-table",
    },
    {
      accessorKey: "goalType",
      header: t("goalCategory"),
      flex: 1,
      headerClassName: "header-table",
    },
    {
      accessorKey: "taskAssignedTo",
      header: t("department"),
      flex: 1,
      headerClassName: "header-table",
    },
    {
      accessorKey: "goalDeadline",
      header: t("endDate"),
      flex: 0.5,
      headerClassName: "header-table",
    },
    {
      accessorKey: "status",
      header: t("goalStatus"),
      flex: 0.5,
      headerClassName: "header-table",
    },
    {
      accessorKey: "detail",
      header: t("detail"),
      headerClassName: "header-table",
      flex: 0.5,
      renderCell: (params) => AssignGoal(params),
    },
  ];
};

export const useBalanceScoreCardColumn = () => {
  const { t } = useTranslation();

  return [
    {
      field: "goalTitle",
      headerName: t("goalTitle"),
      flex: 1,
      headerClassName: "header-table",
    },
    {
      field: "goalType",
      headerName: t("goalCategory"),
      flex: 1,
      headerClassName: "header-table",
    },
    {
      field: "taskAssignedTo",
      headerName: t("department"),
      flex: 1,
      headerClassName: "header-table",
    },
    {
      field: "goalDeadline",
      headerName: t("endDate"),
      flex: 0.5,
      headerClassName: "header-table",
    },
    {
      field: "detail",
      headerName: t("detail"),
      headerClassName: "header-table",
      flex: 0.5,
      renderCell: (params) => AssignGoal(params),
    },
  ];
};

export const useOperationalEffeciencyColumn = () => {
  const { t } = useTranslation();

  return [
    {
      field: "goalTitle",
      headerName: t("goalTitle"),
      flex: 1,
      headerClassName: "header-table",
    },
    {
      field: "taskAssignedTo",
      headerName: t("department"),
      flex: 1,
      headerClassName: "header-table",
    },
    {
      field: "performancePercent",
      headerName: t("scorePercentage"),
      flex: 1,
      headerClassName: "header-table",
    },
    {
      field: "goalDeadline",
      headerName: t("endDate"),
      flex: 0.5,
      headerClassName: "header-table",
    },
    {
      field: "detail",
      headerName: t("detail"),
      headerClassName: "header-table",
      flex: 0.5,
      renderCell: (params) => AssignGoal(params),
    },
  ];
};

export const useSystemColumn = () => {
  const { t } = useTranslation();

  return [
    {
      field: "goalTitle",
      headerName: t("goalTitle"),
      flex: 1,
      headerClassName: "header-table",
    },
    {
      field: "taskAssignedTo",
      headerName: t("department"),
      flex: 1,
      headerClassName: "header-table",
    },
    {
      field: "performancePercent",
      headerName: t("scorePercentage"),
      flex: 1,
      headerClassName: "header-table",
    },
    {
      field: "goalDeadline",
      headerName: t("endDate"),
      flex: 0.5,
      headerClassName: "header-table",
    },
    {
      field: "status",
      headerName: t("goalStatus"),
      flex: 0.5,
      headerClassName: "header-table",
    },
    {
      field: "detail",
      headerName: t("detail"),
      headerClassName: "header-table",
      flex: 0.5,
      renderCell: (params) => AssignGoal(params),
    },
  ];
};

export const useTopGoalColumn = () => {
  const { t } = useTranslation();

  return [
    {
      field: "goalTitle",
      headerName: t("goalTitle"),
      flex: 1,
      headerClassName: "header-table",
    },
    {
      field: "departmentName",
      headerName: t("department"),
      flex: 1,
      headerClassName: "header-table",
    },
    {
      field: "dateAssigned",
      headerName: t("assignedDate"),
      flex: 0.5,
      headerClassName: "header-table",
    },
    {
      field: "performancePercent",
      headerName: t("goalScorePercentage"),
      flex: 0.5,
      headerClassName: "header-table",
    },
    {
      field: "goalDeadline",
      headerName: t("endDate"),
      flex: 0.5,
      headerClassName: "header-table",
    },
    {
      field: "detail",
      headerName: t("detail"),
      headerClassName: "header-table",
      flex: 0.5,
      renderCell: (params) => {
        const handleEditClick = () => {
          console.log(`Editing row with ID: ${params.row._id}`);
        };

        return (
          <>
            <button onClick={handleEditClick} className="px-2">
              <FaEdit className="icons" />
            </button>
          </>
        );
      },
    },
  ];
};

export const useAccessingGoalColumn = () => {
  const { t } = useTranslation();

  return [
    {
      field: "taskAssignedTo",
      headerName: t("department"),
      flex: 1,
      headerClassName: "header-table",
    },
    {
      field: "goalTitle",
      headerName: t("goalName"),
      flex: 1,
      headerClassName: "header-table",
    },
    {
      field: "goalDeadline",
      headerName: t("endDate"),
      flex: 1,
      headerClassName: "header-table",
    },
    {
      field: "performancePercent",
      headerName: t("scorePercentage"),
      flex: 0.5,
      headerClassName: "header-table",
    },
    {
      field: "comment",
      headerName: t("remark"),
      flex: 0.5,
      headerClassName: "header-table",
    },
    {
      field: "detail",
      headerName: t("detail"),
      headerClassName: "header-table",
      flex: 0.5,
      renderCell: (params) => AssessGoal(params)
    },
  ];
};

export const useUserColumn = () => {
  const { t } = useTranslation();

  return [
    {
      field: "name",
      headerName: t("firstName"),
      flex: 1,
      headerClassName: "header-table",
    },
    {
      field: "email",
      headerName: t("email"),
      flex: 1,
      headerClassName: "header-table",
    },
    {
      field: "department",
      headerName: t("department"),
      flex: 1,
      headerClassName: "header-table",
    },
    {
      field: "role",
      headerName: t("role"),
      flex: 0.5,
      headerClassName: "header-table",
    },
    {
      field: "edit",
      headerName: t("edit"),
      headerClassName: "header-table",
      flex: 0.5,
      renderCell: (params) => {
        const handleEditClick = () => {
          console.log(`Editing row with ID: ${params.row.id}`);
        };

        return (
          <>
            <button onClick={handleEditClick} className="px-2">
              <FaEdit className="icons" />
            </button>
          </>
        );
      },
    },
    {
      field: "delete",
      headerName: t("delete"),
      headerClassName: "header-table",
      renderCell: (params) => {
        const handleDeleteClick = () => {
          console.log(`Editing row with ID: ${params.row.id}`);
        };

        return (
          <button onClick={handleDeleteClick} className="px-2">
            <FaTrash className="icons" />
          </button>
        );
      },
    },
  ];
};

export const useDepartmentColumn = () => {
  const { t } = useTranslation();

  return [
    {
      field: "departmentName",
      headerName: t("departmentName"),
      flex: 1,
      headerClassName: "header-table",
    },
    {
      field: "manager",
      headerName: t("departmentManager"),
      flex: 1,
      headerClassName: "header-table",
    },
    {
      field: "numberOfStaff",
      headerName: t("numberOfStaff"),
      flex: 1,
      headerClassName: "header-table",
    },
    {
      field: "edit",
      headerName: t("edit"),
      headerClassName: "header-table",
      flex: 0.5,
      renderCell: (params) => {
        const handleEditClick = () => {
          console.log(`Editing row with ID: ${params.row.departmentId}`);
        };

        return (
          <>
            <button onClick={handleEditClick} className="px-2">
              <FaEdit className="icons" />
            </button>
          </>
        );
      },
    },
    {
      field: "delete",
      headerName: t("delete"),
      headerClassName: "header-table",
      flex: 0.5,
      renderCell: (params) => {
        const handleDeleteClick = () => {
          console.log(`Editing row with ID: ${params.row.departmentId}`);
        };

        return (
          <button onClick={handleDeleteClick} className="px-2">
            <FaTrash className="icons" />
          </button>
        );
      },
    },
  ];
};
