import { FaEdit, FaTrash } from "react-icons/fa";

export const goalsettingcolumn = [
  { field: "taskAssignedTo", headerName: "Department ", flex: 1,},
  { field: "goalTitle", headerName: "Goal Title", flex: 1,},
  { field: "goalDeadline", headerName: "End Date", flex: 0.5,},
  {
    field: "reviewed",
    headerName: "Goal Status",flex: 0.5,
    
    renderCell: (params) => {
      const statusText = params.value ? 'Reviewed' : 'Not Reviewed';
      return <span>{statusText}</span>;
    }
  },
  {
    field: "detail",
    headerName: "Detail",
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
  { field: "taskAssignedTo", headerName: "Department", flex: 1 },
  { field: "goalTitle", headerName: "Goal Name", flex: 1 },
  { field: "goalDeadline", headerName: "End Date", flex: 1 },

  { field: "performancePercent", headerName: "Score(%)", flex: 0.5 },
  { field: "rating", headerName: "Remark", flex: 0.5 },
  {
    field: "detail",
    headerName: "Detail",
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
export const usercolumns = [
  { field: "fullName", headerName: "First Name", flex: 1 },
  { field: "email", headerName: "Email", flex: 1},
  {field: "department", headerName: "Department", flex: 1},
  { field: "role", headerName: "Role", flex: 0.5 },
  {
    field: "edit",
    headerName: "Edit",
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
export const deptcolumn = [
  { field: "departmentName", headerName: "Department Name", flex: 1 },
  { field: "manager", headerName: "Department Manager", flex: 1},
  { field: "numberOfStaff", headerName: "Number of Staff", flex: 1},
  {
    field: "edit",
    headerName: "Edit",
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
