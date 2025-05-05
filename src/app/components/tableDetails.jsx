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
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-black p-2 hover:bg-gray-400">
            ✖
          </button>

          {/* Header */}
          {/*<div className="font-bold text-3xl flex items-center text-[#04B1C4] justify-center mb-6">
            GRC Risk Management
          </div>*/}

          {/* Scrollable Body */}
          <div className="overflow-y-auto max-h-[70vh] p-4">
            <div className="grid grid-cols-6 bg-gray-300 mb-16 p-6 rounded-lg shadow-md">
              {/* Left Section: Risk Cards */}
              <div className="col-span-2 grid grid-cols-2 gap-4">
                <div className="bg-blue-700 text-white h-48 w-40 p-5 flex flex-col items-center justify-center rounded-lg shadow-md">
                  <p className="text-lg font-semibold">Inherent Risk</p>
                  <p className="text-7xl font-bold">32</p>
                  <p className="text-2xl font-bold">Very High</p>
                </div>
                <div className="bg-blue-700 text-white h-48 w-40 p-5 flex flex-col items-center justify-center rounded-lg shadow-md">
                  <p className="text-lg font-semibold">Residual Risk</p>
                  <p className="text-7xl font-bold">32</p>
                  <p className="text-2xl font-bold">Very High</p>
                </div>
              </div>

              {/* Right Section: Details */}
              <div className="col-span-4 flex flex-col py-10">
                <div className="flex  space-x-6 items-center justify-between w-full text-lg font-medium pb-4">
                  <div className="text-gray-700">
                    ID: <span className="font-semibold text-blue-700">{monitorInfo.riskId}</span>
                  </div>
                  <div className="text-gray-700">
                    STATUS:{" "}
                    <span className="font-semibold text-blue-700">
                      {monitorInfo.status?.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-gray-700">
                    CATEGORY:{" "}
                    <span className="font-semibold text-blue-700">
                      {monitorInfo.riskCategory?.toUpperCase()}
                    </span>
                  </div>
                </div>
                <hr className="my-4 w-full border-gray-400" />
                <div className="text-gray-700 text-lg font-medium">
                  SUBJECT:{" "}
                  <span className="font-semibold text-blue-700">
                    {monitorInfo.riskName?.toUpperCase()}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800"></h3>
              </div>
            </div>
            <div>
            <FormControl fullWidth>
            <div className=" px-10 py-10">
              <div className="grid grid-cols-4 gap-3 mb-6">
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <TextField
                    label="Goal ID"
                    value={assignGoal.goalId}
                    autoComplete="off"
                    //   onChange={(e) => setRiskID(e.target.value)}
                    disabled
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <TextField
                    label={t("goalTitle")}
                    value={assignGoal.goalTitle}
                    autoComplete="off"
                    //   onChange={(e) => setRiskName(e.target.value)}
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <TextField
                    label="status"
                    value={assignGoal.goalStatus}
                    multiline
                    autoComplete="off"
                    //   onChange={(e) => setChallenges(e.target.value)}
                    required
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <TextField
                    label="Description"
                    value={assignGoal.goalDescription}
                    multiline
                    autoComplete="off"
                    //   onChange={(e) => setChallenges(e.target.value)}
                    required
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3 mb-6">
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <Select
                    label="Assinged To"
                    value={assignGoal.assignedTo}
                    autoComplete="off"
                    //   onChange={(e) => setMitigationOwner(e.target.value)}
                    required
                    style={{ width: "100%" }}>
                    {departmenttable.map((department) => (
                      <MenuItem
                        key={department.departmentId}
                        value={department.departmentId}>
                        {department.departmentName}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <TextField
                    type="date"
                    label="Created At"
                    value={formattedDate(assignGoal.deadline)}
                    autoComplete="off"
                    //   onChange={(e) => {
                    //     const selectedDate = e.target.value;
                    //     const dateObj = new Date(selectedDate);

                    //     // Extract year, month, and day components
                    //     const year = dateObj.getFullYear();
                    //     const month = String(dateObj.getMonth() + 1).padStart(
                    //       2,
                    //       "0"
                    //     );
                    //     const day = String(dateObj.getDate()).padStart(2, "0");

                    //     // Format the date as "yyyy-MM-dd"
                    //     const formattedDate = `${year}-${month}-${day}`;
                    //     // Set the formatted date to state
                    //     setRiskCreatedAt(formattedDate);
                    //   }}
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-row pb-3 pt-2 px-2 flex-row-reverse items-center">
              <button
                className="flex flex row items-center p-3 m-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                type="submit"
                onClick={handleEditSubmit}>
                <FaSave className="icons" />
                Save
              </button>
            </div>
          </FormControl>
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
        aria-describedby="modal-modal-description">
        <Box sx={ModalStyle}>
          <FormControl fullWidth>
            <div className="px-10 py-10">
              <div className="grid grid-cols-4 gap-3 mb-6">
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <TextField
                    label="Goal ID"
                    value={assessGoal.goalId}
                    autoComplete="off"
                    disabled
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <TextField
                    label={t("goalTitle")}
                    value={assessGoal.goalTitle}
                    autoComplete="off"
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <TextField
                    label="Status"
                    value={assessGoal.goalStatus}
                    multiline
                    autoComplete="off"
                    required
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <TextField
                    label="Description"
                    value={assessGoal.goalDescription}
                    multiline
                    autoComplete="off"
                    required
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3 mb-6">
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <Select
                    label="Assigned To"
                    value={assessGoal.assignedTo}
                    autoComplete="off"
                    required
                    style={{ width: "100%" }}>
                    {departmenttable.map((department) => (
                      <MenuItem
                        key={department.departmentId}
                        value={department.departmentId}>
                        {department.departmentName}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <TextField
                    type="date"
                    label="Created At"
                    value={formattedDate(assessGoal.deadline)}
                    autoComplete="off"
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <TextField
                    label="Goal Type"
                    value={assessGoal.goalType}
                    autoComplete="off"
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <TextField
                    label="Performance Percent"
                    type="number"
                    value={assessGoal.performancePercent}
                    autoComplete="off"
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3 mb-6">
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <Select
                    label="Reviewed"
                    value={assessGoal.reviewed}
                    autoComplete="off"
                    required
                    style={{ width: "100%" }}>
                    <MenuItem value={true}>Yes</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
                </div>
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <TextField
                    label="Assigned By"
                    value={assessGoal.assignedBy}
                    autoComplete="off"
                    disabled
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-row pb-3 pt-2 px-2 flex-row-reverse items-center">
              <button
                className="flex flex-row items-center p-3 m-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                type="submit"
                onClick={handleEditSubmit}>
                <FaSave className="icons" />
                Save
              </button>
            </div>
          </FormControl>
        </Box>
      </Modal>
    </>
  );
}


