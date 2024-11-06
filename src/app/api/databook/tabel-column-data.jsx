import { FaEdit, FaTrash } from "react-icons/fa";

export const goalsettingcolumn = [
  { field: "taskAssignedTo", headerName: "Department ", flex: 1, headerClassName: "header-table"},
  { field: "goalTitle", headerName: "Goal Title", flex: 1, headerClassName: "header-table"},
  { field: "goalDeadline", headerName: "End Date", flex: 0.5, headerClassName: "header-table"},
  {
    field: "reviewed",
    headerName: "Goal Status",flex: 0.5,
    headerClassName: "header-table",    
    renderCell: (params) => {
      const statusText = params.value ? 'Reviewed' : 'Not Reviewed';
      return <span>{statusText}</span>;
    }
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
  { field: "taskAssignedTo", headerName: "Department", flex: 1, headerClassName: "header-table" },
  { field: "goalTitle", headerName: "Goal Name", flex: 1, headerClassName: "header-table" },
  { field: "goalDeadline", headerName: "End Date", flex: 1, headerClassName: "header-table" },

  { field: "performancePercent", headerName: "Score(%)", flex: 0.5, headerClassName: "header-table" },
  { field: "rating", headerName: "Remark", flex: 0.5, headerClassName: "header-table" },
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
  { field: "fullName", headerName: "First Name", flex: 1, headerClassName: "header-table" },
  { field: "email", headerName: "Email", flex: 1, headerClassName: "header-table"},
  {field: "department", headerName: "Department", flex: 1, headerClassName: "header-table"},
  { field: "role", headerName: "Role", flex: 0.5, headerClassName: "header-table" },
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
  { field: "departmentName", headerName: "Department Name", flex: 1, headerClassName: "header-table" },
  { field: "manager", headerName: "Department Manager", flex: 1, headerClassName: "header-table"},
  { field: "numberOfStaff", headerName: "Number of Staff", flex: 1, headerClassName: "header-table"},
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
    flex: 0.5,
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
