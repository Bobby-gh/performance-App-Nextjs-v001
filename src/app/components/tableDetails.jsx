"use client";
import React, { useContext, useState } from "react";
import { AuthContext } from "../contex/context-context";
import { FaEye, FaSave } from "react-icons/fa";
import { Box, FormControl, MenuItem, Modal, Select, TextField } from "@mui/material";
import { useDepartmentRouteData } from "../api/databook/route-data";
import { useTranslation } from "react-i18next";



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
        </Box>
      </Modal>
    </>
  );
}
