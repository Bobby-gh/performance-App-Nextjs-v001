'use client';
import { AssessGoal, AssignGoal } from "@/app/components/tableDetails";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { AuthContext } from "@/app/contex/context-context";
import { useContext } from "react";

export const useGoalSettingColumn = () => {
  const { t } = useTranslation();
  const {auth} = useContext(AuthContext);
  const isManager = auth?.refNum;

  // Helper to translate goal category
  const translateCategory = (category) => {
    if (!category) return "";
    const categoryLower = category.toLowerCase();
    if (categoryLower.includes("financial")) return t("financial");
    if (categoryLower.includes("human")) return t("humanRelationship");
    if (categoryLower.includes("customer")) return t("customerCentred");
    if (categoryLower.includes("innovation") || categoryLower.includes("process")) return t("processAndInnovation");
    return category;
  };

  // Helper to translate goal status
  const translateStatus = (status) => {
    if (!status) return "";
    const statusLower = status.toLowerCase();
    if (statusLower === "completed") return t("completed");
    if (statusLower === "in progress" || statusLower === "in-progress") return t("inProgress");
    if (statusLower === "not started" || statusLower === "not-started") return t("notStarted");
    if (statusLower === "pending") return t("pending");
    return status;
  };

  // Helper to format date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      return date.toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  return [
    {
      accessorKey: "goalTitle",
      header: t("goalTitle"),
    },
    {
      accessorKey: "goalType",
      header: t("goalCategory"),
      Cell: ({ cell }) => translateCategory(cell.getValue()),
    },
    {
      accessorKey: "taskAssignedToId",
      header: (isManager === "ref?2!") ? t("employee") : t("department"),
    },
    {
      accessorKey: "goalDeadline",
      header: t("endDate"),
      Cell: ({ cell }) => formatDate(cell.getValue()),
    },
    {
      accessorKey: "status",
      header: t("goalStatus"),
      Cell: ({ cell }) => translateStatus(cell.getValue()),
    },
  ];
};


export const useEmployeeRatingColumn = () => {
  const { t } = useTranslation();

  return [
    {
      accessorKey: "name",
      header: t("fullName"),
    },
    {
      accessorKey: "department",
      header: t("department"),
    },
    {
      accessorKey: "performance",
      header: t("performanceScore"),
    },
    {
      accessorKey: "badge",
      header: t("badges"),
    },
  ];
};

export const useBalanceScoreCardColumn = () => {
  const { t } = useTranslation();

  // Helper to translate goal category
  const translateCategory = (category) => {
    if (!category) return "";
    const categoryLower = category.toLowerCase();
    if (categoryLower.includes("financial")) return t("financial");
    if (categoryLower.includes("human")) return t("humanRelationship");
    if (categoryLower.includes("customer")) return t("customerCentred");
    if (categoryLower.includes("innovation") || categoryLower.includes("process")) return t("processAndInnovation");
    return category;
  };

  // Helper to format date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      return date.toLocaleDateString();
    } catch {
      return dateString;
    }
  };

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
      renderCell: (params) => translateCategory(params.value),
    },
    {
      field: "taskAssignedToId",
      headerName: t("department"),
      flex: 1,
      headerClassName: "header-table",
    },
    {
      field: "goalDeadline",
      headerName: t("endDate"),
      flex: 0.5,
      headerClassName: "header-table",
      renderCell: (params) => formatDate(params.value),
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
      field: "taskAssignedToId",
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
  const { auth } = useContext(AuthContext);
  const isManager = auth?.refNum === "ref?2!";

  const columns = [
    ...(isManager
      ? [
          {
            accessorKey: "mainGoal",
            header: t("mainGoal"),
          },
        ]
      : []),
    {
      accessorKey: "goalTitle",
      header: t("goalName"),
    },
    {
      accessorKey: "taskAssignedTo",
      header: isManager ? t("employee") : t("department"),
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

  return columns;
};


export const useUserColumn = () => {
  const { t } = useTranslation();

  return [
    {
      accessorKey: "name",
      header: t("firstName"),
    },
    {
      accessorKey: "email",
      header: t("email"),
    },
    {
      accessorKey: "department",
      header: t("department"),
    },
    {
      accessorKey: "role",
      header: t("role"),
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

export const useBadgesTable = () => {
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


export const BadgesTable = [
  {
    name: "Emmanuel",
    department: "Finance",
    performanceScore: 87,
    badge: "Exceptionnel"
  },
  {
    name: "Bob",
    department: "Finance",
    performanceScore: 75,
    badge: "DEPASSE LES ATTENTES"
  },
  {
    name: "Alexader",
    department: "Finance",
    performanceScore: 92,
    badge: "Exceptionnel"
  },
  {
    name: "Ishmael",
    department: "Finance",
    performanceScore: 68,
    badge: "Atteint les objectifs"
  },
  {
    name: "Edmond",
    department: "Finance",
    performanceScore: 81,
    badge: "Exceptionnel"
  },
  {
    name: "Luis",
    department: "Finance",
    performanceScore: 54,
    badge: "En dessous des attentes"
  }
]
