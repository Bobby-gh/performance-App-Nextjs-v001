import { FaEdit, FaTrash } from "react-icons/fa";

export const goalsettingcolumn = [
  {
    field: "goalTitle",
    headerName: "Goal Title",
    flex: 1,
    headerClassName: "header-table",
  },
  {
    field: "taskAssignedTo",
    headerName: "Department ",
    flex: 1,
    headerClassName: "header-table",
  },
  {
    field: "goalDeadline",
    headerName: "End Date",
    flex: 0.5,
    headerClassName: "header-table",
  },
  {
    field: "status",
    headerName: "Goal Status",
    flex: 0.5,
    headerClassName: "header-table",
  },
  {
    field: "detail",
    headerName: "Detail",
    headerClassName: "header-table",
    flex: 0.5,
    renderCell: (params) => {
      const handleEditClick = () => {
        // Implement the edit logic here
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

export const topgoalcolumn = [
  {
    field: "goalTitle",
    headerName: "Goal Title",
    flex: 1,
    headerClassName: "header-table",
  },
  {
    field: "departmentName",
    headerName: "Department ",
    flex: 1,
    headerClassName: "header-table",
  },
  {
    field: "dateAssigned",
    headerName: "Assigned Date",
    flex: 0.5,
    headerClassName: "header-table",
  },
  {
    field: "performancePercent",
    headerName: "Goal Score (%)",
    flex: 0.5,
    headerClassName: "header-table",
  },
  {
    field: "goalDeadline",
    headerName: "End Date",
    flex: 0.5,
    headerClassName: "header-table",
  },
  {
    field: "detail",
    headerName: "Detail",
    headerClassName: "header-table",
    flex: 0.5,
    renderCell: (params) => {
      const handleEditClick = () => {
        // Implement the edit logic here
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

export const accessinggoalcolumn = [
  {
    field: "taskAssignedTo",
    headerName: "Department",
    flex: 1,
    headerClassName: "header-table",
  },
  {
    field: "goalTitle",
    headerName: "Goal Name",
    flex: 1,
    headerClassName: "header-table",
  },
  {
    field: "goalDeadline",
    headerName: "End Date",
    flex: 1,
    headerClassName: "header-table",
  },

  {
    field: "performancePercent",
    headerName: "Score(%)",
    flex: 0.5,
    headerClassName: "header-table",
  },
  {
    field: "comment",
    headerName: "Remark",
    flex: 0.5,
    headerClassName: "header-table",
  },
  {
    field: "detail",
    headerName: "Detail",
    headerClassName: "header-table",
    flex: 0.5,
    renderCell: (params) => {
      const handleEditClick = () => {
        // Implement your edit logic here
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
];
export const usercolumn = [
  {
    field: "name",
    headerName: "First Name",
    flex: 1,
    headerClassName: "header-table",
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
    headerClassName: "header-table",
  },
  {
    field: "department",
    headerName: "Department",
    flex: 1,
    headerClassName: "header-table",
  },
  {
    field: "role",
    headerName: "Role",
    flex: 0.5,
    headerClassName: "header-table",
  },
  {
    field: "edit",
    headerName: "Edit",
    headerClassName: "header-table",
    flex: 0.5,
    renderCell: (params) => {
      const handleEditClick = () => {
        // Implement the edit logic here
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
    headerName: "delete",
    headerClassName: "header-table",
    renderCell: (params) => {
      const handleDeleteClick = () => {
        // Implement the delete logic here
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
export const departmentcolumn = [
  {
    field: "departmentName",
    headerName: "Department Name",
    flex: 1,
    headerClassName: "header-table",
  },
  {
    field: "manager",
    headerName: "Department Manager",
    flex: 1,
    headerClassName: "header-table",
  },
  {
    field: "numberOfStaff",
    headerName: "Number of Staff",
    flex: 1,
    headerClassName: "header-table",
  },
  {
    field: "edit",
    headerName: "Edit",
    headerClassName: "header-table",
    flex: 0.5,
    renderCell: (params) => {
      const handleEditClick = () => {
        // Implement the edit logic here
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
    headerName: "delete",
    headerClassName: "header-table",
    flex: 0.5,
    renderCell: (params) => {
      const handleDeleteClick = () => {
        // Implement the delete logic here
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
