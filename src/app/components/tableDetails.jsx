"use client";
import React, { useContext, useState } from "react";
import { AuthContext } from "../contex/context-context";
import { FaEye, FaSave } from "react-icons/fa";
import {
  Box,
  FormControl,
  IconButton,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import { useDepartmentRouteData } from "../api/databook/route-data";
import { useTranslation } from "react-i18next";
import { ModalModification } from "./widgets";
import { FiEdit } from "react-icons/fi";
import { IoCalendarClearOutline, IoClose } from "react-icons/io5";

export function AssignGoal({ data, open, onClose }) {
  const { t } = useTranslation();
  const { departmenttable } = useDepartmentRouteData();
  const formattedDate = (dateString) =>
    new Date(dateString).toISOString().split("T")[0];
  const [assignGoal, setAssignedGoal] = useState({
    goalId: data._id,
    goalTitle: data.goalTitle,
    goalDescription: data.goalDescription,
    goalStatus: data.status,
    assignedTo: data.taskAssignedTo,
    deadline: data.goalDeadline,
  });
  const [editableFields, setEditableFields] = useState({ ...assignGoal });
  const [editMode, setEditMode] = useState(false);

  const handleChange = (key, value) => {
    setEditableFields((prev) => ({ ...prev, [key]: value }));
  };

  console.log({ editableFields: editableFields });
  const handleEditSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={ModalModification}>
          {/* Modal Header */}
          <div className="flex absolute top-2 right-2 text-gray-500 hover:text-gray-700 space-x-2">
            <div className="flex absolute top-2 right-2 text-gray-500 hover:text-gray-700 space-x-2">
              <button onClick={() => setEditMode(!editMode)}>
                {editMode ? (
                  <FiEdit color="blue" size={20} />
                ) : (
                  <FiEdit size={20} />
                )}
              </button>
              <button onClick={onClose}>
                <IoClose size={24} />
              </button>
            </div>
          </div>

          {/* Modal Body */}

          <div className="p-6 space-y-2 mt-2 bg-[#D7E7FA] max-h-[90vh] rounded-lg">
            <div className="flex justify-between mb-6">
              <div className="gap-4">
                <div className="font-semibold text-lg mb-2">
                  {editMode ? (
                    <input
                      className="w-full bg-transparent outline-none focus:ring-0 focus:border-transparent"
                      value={editableFields.goalTitle || ""}
                      onChange={(e) =>
                        handleChange("actionItem", e.target.value)
                      }
                    />
                  ) : (
                    editableFields.goalTitle
                  )}
                </div>

                <div className="flex flex-wrap space-x-4 w-full items-center text-sm">
                  <div className="flex items-center space-x-2">
                    <IoCalendarClearOutline color="red" />
                    <span className="text-red-500">
                      Due Date:{" "}
                      {editMode ? (
                        <input
                          type="date"
                          className="border px-2 py-1 rounded"
                          value={convertDate(editableFields.deadline) || ""}
                          onChange={(e) =>
                            handleChange(
                              "expectedCompletionDate",
                              e.target.value
                            )
                          }
                        />
                      ) : (
                        editableFields.deadline
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-blue-500 font-semibold text-sm whitespace-nowrap">
                {editableFields.goalStatus}
              </div>
            </div>
            <div className="my-6 bg-white p-4 rounded-lg max-h-[65vh] overflow-y-auto">
              <div className="overflow-y-auto max-h-[70vh] p-6">
                <FormControl fullWidth>
                  {/* Form Fields */}
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <TextField
                      label="Goal ID"
                      value={assignGoal.goalId}
                      disabled
                      fullWidth
                    />
                    <TextField
                      label={t("goalTitle")}
                      value={assignGoal.goalTitle}
                      fullWidth
                    />
                    <TextField
                      label="Status"
                      value={assignGoal.goalStatus}
                      multiline
                      required
                      fullWidth
                    />
                    <TextField
                      label="Description"
                      value={assignGoal.goalDescription}
                      multiline
                      required
                      fullWidth
                    />
                    <Select
                      label="Assigned To"
                      value={assignGoal.assignedTo}
                      required
                      fullWidth
                      displayEmpty>
                      {departmenttable.map((department) => (
                        <MenuItem
                          key={department.departmentId}
                          value={department.departmentId}>
                          {department.departmentName}
                        </MenuItem>
                      ))}
                    </Select>
                    <TextField
                      type="date"
                      label="Created At"
                      value={formattedDate(assignGoal.deadline)}
                      fullWidth
                    />
                  </div>
                  {/* Save Button */}
                  <div className="flex justify-end mt-4">
                    <button
                      type="submit"
                      onClick={handleEditSubmit}
                      className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300">
                      <FaSave className="text-lg" />
                      Save
                    </button>
                  </div>
                </FormControl>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
export function AssessGoal({ data, open, onClose }) {
  const { t } = useTranslation();
  const { departmenttable } = useDepartmentRouteData();
  const formattedDate = (dateString) =>
    new Date(dateString).toISOString().split("T")[0];
  const [assessGoal, setAssessGoal] = useState({
    goalId: data.row._id,
    goalTitle: data.row.goalTitle,
    goalDescription: data.row.goalDescription,
    goalStatus: data.row.status,
    assignedTo: data.row.taskAssignedTo,
    deadline: data.row.goalDeadline,
    goalType: data.row.goalType,
    performancePercent: data.row.performancePercent,
    reviewed: data.row.reviewed,
    assignedBy: data.row.taskAssignedBy,
  });

  const [editableFields, setEditableFields] = useState({ ...assessGoal });
  const [editMode, setEditMode] = useState(false);

  const handleChange = (key, value) => {
    setEditableFields((prev) => ({ ...prev, [key]: value }));
  };

  console.log({ editableFields: editableFields });
  const handleEditSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div>
      
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={ModalModification}>
          {/* Modal Header */}
          <div className="flex absolute top-2 right-2 text-gray-500 hover:text-gray-700 space-x-2">
            <button onClick={onClose}>
              <IoClose size={24} />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 space-y-2 mt-2 bg-[#D7E7FA] max-h-[90vh] rounded-lg">
            <div className="flex justify-between mb-6">
              <div className="gap-4">
                <div className="font-semibold text-lg mb-2">
                  {editMode ? (
                    <input
                      className="w-full bg-transparent outline-none focus:ring-0 focus:border-transparent"
                      value={editableFields.goalTitle || ""}
                      onChange={(e) =>
                        handleChange("goalTitle", e.target.value)
                      }
                    />
                  ) : (
                    editableFields.goalTitle
                  )}
                </div>

                <div className="flex flex-wrap space-x-4 w-full items-center text-sm">
                  <div className="flex items-center space-x-2">
                    <IoCalendarClearOutline color="red" />
                    <span className="text-red-500">
                      Due Date:{" "}
                      {editMode ? (
                        <input
                          type="date"
                          className="border px-2 py-1 rounded"
                          value={convertDate(editableFields.deadline) || ""}
                          onChange={(e) =>
                            handleChange("deadline", e.target.value)
                          }
                        />
                      ) : (
                        editableFields.deadline
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-blue-500 font-semibold text-sm whitespace-nowrap">
                {editableFields.goalStatus}
              </div>
            </div>

            <div className="my-6 bg-white p-4 rounded-lg max-h-[65vh] overflow-y-auto">
              <div className="overflow-y-auto max-h-[70vh] p-6">
                <FormControl fullWidth>
                  {/* Form Fields */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                    <TextField
                      label="Goal ID"
                      value={assessGoal.goalId}
                      disabled
                      fullWidth
                    />
                    <TextField
                      label={t("goalTitle")}
                      value={assessGoal.goalTitle}
                      onChange={(e) =>
                        handleChange("goalTitle", e.target.value)
                      }
                      disabled={!editMode}
                      fullWidth
                    />
                    <TextField
                      label="Status"
                      value={assessGoal.goalStatus}
                      onChange={(e) =>
                        handleChange("goalStatus", e.target.value)
                      }
                      multiline
                      required
                      disabled={!editMode}
                      fullWidth
                    />
                    <TextField
                      label="Description"
                      value={assessGoal.goalDescription}
                      onChange={(e) =>
                        handleChange("goalDescription", e.target.value)
                      }
                      multiline
                      required
                      disabled={!editMode}
                      fullWidth
                    />
                    <Select
                      label="Assigned To"
                      value={assessGoal.assignedTo}
                      onChange={(e) =>
                        handleChange("assignedTo", e.target.value)
                      }
                      disabled={!editMode}
                      required
                      fullWidth
                      displayEmpty>
                      {departmenttable.map((department) => (
                        <MenuItem
                          key={department.departmentId}
                          value={department.departmentId}>
                          {department.departmentName}
                        </MenuItem>
                      ))}
                    </Select>
                    <TextField
                      type="date"
                      label="Created At"
                      value={formattedDate(assessGoal.deadline)}
                      onChange={(e) =>
                        handleChange("deadline", e.target.value)
                      }
                      disabled={!editMode}
                      fullWidth
                    />
                    <TextField
                      label="Goal Type"
                      value={assessGoal.goalType}
                      onChange={(e) =>
                        handleChange("goalType", e.target.value)
                      }
                      disabled={!editMode}
                      fullWidth
                    />
                    <TextField
                      label="Performance Percent"
                      type="number"
                      value={assessGoal.performancePercent}
                      onChange={(e) =>
                        handleChange("performancePercent", e.target.value)
                      }
                      disabled={!editMode}
                      fullWidth
                    />
                    <Select
                      label="Reviewed"
                      value={assessGoal.reviewed}
                      onChange={(e) =>
                        handleChange("reviewed", e.target.value)
                      }
                      required
                      disabled={!editMode}
                      fullWidth
                      displayEmpty>
                      <MenuItem value={true}>Yes</MenuItem>
                      <MenuItem value={false}>No</MenuItem>
                    </Select>
                    <TextField
                      label="Assigned By"
                      value={assessGoal.assignedBy}
                      disabled
                      fullWidth
                    />
                  </div>

                  {/* Save Button */}
                  {editMode && (
                    <div className="flex justify-end mt-4">
                      <button
                        type="submit"
                        onClick={handleEditSubmit}
                        className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300">
                        <FaSave className="text-lg" />
                        Save
                      </button>
                    </div>
                  )}
                </FormControl>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
