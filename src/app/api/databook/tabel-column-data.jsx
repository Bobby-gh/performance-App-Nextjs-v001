import { AssessGoal, AssignGoal } from "@/app/components/tableDetails";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export const useGoalSettingColumn = () => {
  const { t } = useTranslation();

  return [
    {
      accessorKey: "goalTitle",
      header: t("goalTitle"),
    },
    {
      accessorKey: "goalType",
      header: t("goalCategory"),
    },
    {
      accessorKey: "taskAssignedTo",
      header: t("department"),
    },
    {
      accessorKey: "goalDeadline",
      header: t("endDate"),
    },
    {
      accessorKey: "status",
      header: t("goalStatus"),
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
      accessorKey: "taskAssignedTo",
      header: t("department"),
    },
    {
      accessorKey: "goalTitle",
      header: t("goalName"),
    },
    {
      accessorKey: "goalDeadline",
      header: t("endDate"),
    },
    {
      accessorKey: "performancePercent",
      header: t("scorePercentage"),
    },
    {
      accessorKey: "comment",
      header: t("remark"),
    },
  ];
};

export const useUserColumn = () => {
  const { t } = useTranslation();

  return [
    {
      accessorKey: "name",
      header: t("firstName"),
      flex: 1,
      headerClassName: "header-table",
    },
    {
      accessorKey: "email",
      header: t("email"),
      flex: 1,
      headerClassName: "header-table",
    },
    {
      accessorKey: "department",
      header: t("department"),
      flex: 1,
      headerClassName: "header-table",
    },
    {
      accessorKey: "role",
      header: t("role"),
      flex: 0.5,
      headerClassName: "header-table",
    },
  ];
};

export const useDepartmentColumn = () => {
  const { t } = useTranslation();

  return [
    {
      accessorKey: "departmentName",
      header: t("departmentName"),
    },
    {
      accessorKey: "manager",
      header: t("departmentManager"),
    },
    {
      accessorKey: "numberOfStaff",
      header: t("numberOfStaff"),
    },
  ];
};
