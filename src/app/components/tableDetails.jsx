"use client";
import React, { useContext, useState } from "react";
import { AuthContext } from "../contex/context-context";
import { FaEye, FaSave } from "react-icons/fa";
import { Box, FormControl, IconButton, MenuItem, Modal, Select, TextField } from "@mui/material";
import { useDepartmentRouteData } from "../api/databook/route-data";
import { useTranslation } from "react-i18next";
import { Delete } from "./widgets";



const ModalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "#FFFFFF",
    boxShadow: 24,
    p: 4,
    borderRadius: 1,
    width: 1200,
  };


export function AssignGoal(params) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const { departmenttable } = useDepartmentRouteData();
  const formattedDate = (dateString) => new Date(dateString).toISOString().split("T")[0];
  const [assignGoal, setAssignedGoal] = useState({
    goalId: params.row._id,
    goalTitle: params.row.goalTitle,
    goalDescription: params.row.goalDescription,
    goalStatus: params.row.status,
    assignedTo: params.row.taskAssignedTo,
    deadline: params.row.goalDeadline,
  });

  function handleOpen() {
    setOpen(!open);
  }

  function handleClose() {
    setOpen(false);
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <div>
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <IconButton onClick={handleOpen} color="primary">
        <FaEye />
      </IconButton>
        <Delete
          data = {assignGoal.goalId}
          message = "Are you sure you want to delete Goal?"
          name = "assignGoal"
        />
    </div>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          width: '90%',
          maxWidth: '1000px',
          margin: 'auto',
          marginTop: '5%',
          borderRadius: 3,
          bgcolor: '#ffffff',
          color: '#1f2937',
          boxShadow: 24,
          border: '1px solid #e5e7eb',
          p: 0,
          overflow: 'hidden',
        }}
      >
        {/* Modal Header */}
        <div className="bg-gray-900 text-blue-400 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Edit Assigned Goal</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-red-500 text-xl transition"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
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
                displayEmpty
              >
                {departmenttable.map((department) => (
                  <MenuItem
                    key={department.departmentId}
                    value={department.departmentId}
                  >
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
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300"
              >
                <FaSave className="text-lg" />
                Save
              </button>
            </div>
          </FormControl>
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
  const formattedDate = (dateString) => new Date(dateString).toISOString().split("T")[0];
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
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            width: '90%',
            maxWidth: '1000px',
            margin: 'auto',
            marginTop: '5%',
            borderRadius: 3,
            bgcolor: '#ffffff', // white background
            color: '#1f2937', // slate-800 for general text
            boxShadow: 24,
            border: '1px solid #e0e0e0',
            p: 0, // remove default padding
            overflow: 'hidden',
          }}
        >
          <FormControl fullWidth>

            {/* Header */}
            <div className="bg-gray-900 text-blue-400 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Edit Assessed Goal</h2>
              <button
                onClick={close}
                className="text-gray-400 hover:text-red-500 text-xl transition"
              >
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
                  label={t('goalTitle')}
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
                  displayEmpty
                >
                  {departmenttable.map((department) => (
                    <MenuItem
                      key={department.departmentId}
                      value={department.departmentId}
                    >
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
                  displayEmpty
                >
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
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300"
                >
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


