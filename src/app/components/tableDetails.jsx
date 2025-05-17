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
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
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
                </FormControl>
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
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
export function AssessGoal(params) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const { departmenttable } = useDepartmentRouteData();
  const formattedDate = (dateString) =>
    new Date(dateString).toISOString().split("T")[0];
  const [assessGoal, setAssessGoal] = useState({
    goalId: params.row._id,
    goalTitle: params.row.goalTitle,
    goalDescription: params.row.goalDescription,
    goalStatus: params.row.status,
    assignedTo: params.row.taskAssignedTo,
    deadline: params.row.goalDeadline,
    goalType: params.row.goalType,
    performancePercent: params.row.performancePercent,
    reviewed: params.row.reviewed,
    assignedBy: params.row.taskAssignedBy,
  });

  function handleOpen() {
    setOpen(!open);
  }

  function handleClose() {
    setOpen(false);
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    // Add any submit logic you need here
  };

  return (
    <>
      <button onClick={handleOpen} className="px-2">
        <FaEye className="icons" />
      </button>
      <Modal
        open={open}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box
          sx={{
            width: "90%",
            maxWidth: "1000px",
            margin: "auto",
            marginTop: "5%",
            borderRadius: 3,
            bgcolor: "#ffffff", // white background
            color: "#1f2937", // slate-800 for general text
            boxShadow: 24,
            border: "1px solid #e0e0e0",
            p: 0, // remove default padding
            overflow: "hidden",
          }}>
          <FormControl fullWidth>
            {/* Header */}
            <div className="bg-gray-900 text-blue-400 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Edit Assessed Goal</h2>
              <button
                onClick={close}
                className="text-gray-400 hover:text-red-500 text-xl transition">
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <TextField
                  label="Goal ID"
                  value={assessGoal.goalId}
                  disabled
                  fullWidth
                />
                <TextField
                  label={t("goalTitle")}
                  value={assessGoal.goalTitle}
                  fullWidth
                />
                <TextField
                  label="Status"
                  value={assessGoal.goalStatus}
                  multiline
                  required
                  fullWidth
                />
                <TextField
                  label="Description"
                  value={assessGoal.goalDescription}
                  multiline
                  required
                  fullWidth
                />
                <Select
                  label="Assigned To"
                  value={assessGoal.assignedTo}
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
                  fullWidth
                />
                <TextField
                  label="Goal Type"
                  value={assessGoal.goalType}
                  fullWidth
                />
                <TextField
                  label="Performance Percent"
                  type="number"
                  value={assessGoal.performancePercent}
                  fullWidth
                />
                <Select
                  label="Reviewed"
                  value={assessGoal.reviewed}
                  required
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
              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  onClick={handleEditSubmit}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300">
                  <FaSave className="text-lg" />
                  Save
                </button>
              </div>
            </div>
          </FormControl>
        </Box>
      </Modal>
    </>
  );
}
