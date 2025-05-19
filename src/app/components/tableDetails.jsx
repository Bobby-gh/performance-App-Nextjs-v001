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
import { useDepartmentRouteData, useEdit } from "../api/databook/route-data";
import { useTranslation } from "react-i18next";
import {
  CustomButton,
  CustomSelect,
  FormInputField,
  ModalFormSelect,
  ModalModification,
} from "./widgets";
import { IoCalendarClearOutline, IoClose, IoPerson } from "react-icons/io5";
import Image from "next/image";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import avatar from "../images/avatar.jpg";
import { showToast } from "./notification";

export function AssignGoal({ data, open, onClose }) {
  const { t } = useTranslation();
  const {triggerComponent} = useContext(AuthContext)
  const { departmenttable } = useDepartmentRouteData();
  const { editFunction } = useEdit();
  const formattedDate = (dateString) =>
    new Date(dateString).toISOString().split("T")[0];
  const [isLoading, setIsLoading] = useState(false);
  const [assignGoal] = useState({
    goalId: data._id,
    goalTitle: data.goalTitle,
    goalDescription: data.goalDescription,
    goalStatus: data.status,
    assignedTo: data.taskAssignedTo,
    deadline: data.goalDeadline,
    target: data.target
  });
  const [editableFields, setEditableFields] = useState({ ...assignGoal });
  const [editMode, setEditMode] = useState(false);

  const handleChange = (key, value) => {
    setEditableFields((prev) => ({ ...prev, [key]: value }));
  };

  const updateData = {
    goalTitle: editableFields.goalTitle,
    goalDescription: data.goalDescription,
    goalStatus: data.status,
    taskAssignedTo: data.taskAssignedTo,
    goalDeadline: data.goalDeadline,
    target: editableFields.target
  };
  
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    console.log("Update Data:", updateData);
    try {
      const name = "goal";
      const id = editableFields.goalId;
      const response = await editFunction(updateData, id, name);

      if (response?.status === 200) {
        showToast("Edit Saved successful:", "success");
        triggerComponent();
        onClose();
      } else {
        console.error("Edit Save failed:", response);
        showToast("Edit failed to Save, kindly Try Again Later:", "error");
      }
    } catch (error) {
      console.error("Edit error:", error);
    } finally {
      setIsLoading(false);
      setEditMode(false);
    }
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
                      {t("dueDate")}:{" "}
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
                    <FormInputField
                      label={t("goalTitle")}
                      id="goalTitle"
                      value={editableFields.goalTitle}
                    />
                    <FormInputField
                      label={t("status")}
                      id="goalStatus"
                      value={editableFields.goalStatus}
                    />
                    <FormInputField
                      label={t("description")}
                      id="goalDescription"
                      value={editableFields.goalDescription}
                    />
                    <ModalFormSelect
                      id="assignedTO"
                      label={t("assignedTo")}
                      value={editableFields.assignedTo}
                      options={departmenttable.map((department) => ({
                        value: department.departmentId,
                        label: department.departmentName,
                      }))}
                      required
                    />
                    
                    <FormInputField
                      label="target"
                      id="target"
                      value={editableFields.target}
                    />
                    <FormInputField
                      label={t("date")}
                      id="goalDescription"
                      type="date"
                      value={formattedDate(editableFields.deadline)}
                    />
                  </div>
                  {/* Save Button */}
                  <div className="flex justify-end mt-4">
                    <CustomButton
                      label="Submit"
                      onClick={handleEditSubmit}
                      type="submit"
                      className="custom-class"
                      loading={isLoading}
                    />
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
    goalId: data?._id,
    goalTitle: data?.goalTitle,
    goalDescription: data?.goalDescription,
    goalStatus: data?.status,
    assignedTo: data?.taskAssignedTo,
    deadline: data?.goalDeadline,
    goalType: data?.goalType,
    performancePercent: data?.performancePercent,
    reviewed: data?.reviewed,
    assignedBy: data?.taskAssignedBy,
  });
  console.log({ "data coming from table": data });
  const [editableFields, setEditableFields] = useState({ ...assessGoal });
  const [editMode, setEditMode] = useState(false);

  const handleChange = (key, value) => {
    setEditableFields((prev) => ({ ...prev, [key]: value }));
  };

  const updateData = {
    goalTitle: editableFields.goalTitle,
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    console.log("Update Data:", updateData);
    try {
      const name = "accessGoal";
      const id = editableFields.goalId;
      const response = await editFunction(updateData, id, name);

      if (response?.status === 200) {
        showToast("Edit Saved successful:", "success");
        triggerComponent();
        onClose();
      } else {
        console.error("Edit Save failed:", response);
        showToast("Edit failed to Save, kindly Try Again Later:", "error");
      }
    } catch (error) {
      console.error("Edit error:", error);
    } finally {
      setIsLoading(false);
      setEditMode(false);
    }
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
                      {t("dueDate")}:{" "}
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
                    <FormInputField
                      label={t("goalId")}
                      id="goalId"
                      value={editableFields.goalId}
                    />
                    <FormInputField
                      label={t("goalTitle")}
                      id="goalTitle"
                      value={editableFields.goalTitle}
                    />
                    <FormInputField
                      label={t("status")}
                      id="goalStatus"
                      value={editableFields.goalStatus}
                    />
                    <FormInputField
                      label={t("description")}
                      id="goalDescription"
                      value={editableFields.goalDescription}
                    />
                    <ModalFormSelect
                      id="assignedTO"
                      label={t("assignedTo")}
                      value={editableFields.assignedTo}
                      options={departmenttable.map((department) => ({
                        value: department.departmentId,
                        label: department.departmentName,
                      }))}
                      required
                    />
                    <FormInputField
                      label={t("deadline")}
                      type="date"
                      id="deadline"
                      value={formattedDate(editableFields.deadline)}
                    />
                    <FormInputField
                      label={t("goalType")}
                      id="goalType"
                      value={editableFields.goalType}
                    />
                    <FormInputField
                      label={t("performancePercent")}
                      id="performancePercent"
                      value={editableFields.performancePercent}
                    />
                    <ModalFormSelect
                      id="Reviewed"
                      label={t("reviewed")}
                      value={editableFields.reviewed}
                      options={[
                        { value: true, label: "Yes" },
                        { value: false, label: "No" },
                      ]}
                      required
                    />
                    <FormInputField
                      label={t("assignedBy")}
                      id="assignedBy"
                      value={editableFields.assignedBy}
                    />
                  </div>

                  {/* Save Button */}
                  {editMode && (
                    <div className="flex justify-end mt-4">
                      <CustomButton
                        label="Save"
                        onClick={handleEditSubmit}
                        type="submit"
                        className="custom-class"
                      />
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

export function EmployeeDetails({ data, open, onClose }) {
  const { t } = useTranslation();
  const { departmenttable } = useDepartmentRouteData();
  const formattedDate = (dateString) =>
    new Date(dateString).toISOString().split("T")[0];
  const [assessGoal, setAssessGoal] = useState({
    goalId: data?._id,
    goalTitle: data?.goalTitle,
    goalDescription: data?.goalDescription,
    goalStatus: data?.status,
    assignedTo: data?.taskAssignedTo,
    deadline: data?.goalDeadline,
    goalType: data?.goalType,
    performancePercent: data?.performancePercent,
    reviewed: data?.reviewed,
    assignedBy: data?.taskAssignedBy,
  });
  console.log({ "data coming from table": data });
  const [editableFields, setEditableFields] = useState({ ...assessGoal });
  const [editMode, setEditMode] = useState(false);

  const handleChange = (key, value) => {
    setEditableFields((prev) => ({ ...prev, [key]: value }));
  };

  console.log({ editableFields: editableFields });
  
   const updateData = {
    goalTitle: editableFields.goalTitle,
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    console.log("Update Data:", updateData);
    try {
      const name = "accessGoal";
      const id = editableFields.goalId;
      const response = await editFunction(updateData, id, name);

      if (response?.status === 200) {
        showToast("Edit Saved successful:", "success");
        triggerComponent();
        onClose();
      } else {
        console.error("Edit Save failed:", response);
        showToast("Edit failed to Save, kindly Try Again Later:", "error");
      }
    } catch (error) {
      console.error("Edit error:", error);
    } finally {
      setIsLoading(false);
      setEditMode(false);
    }
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

          <main className="flex text-black card bg-white p-4 justify-center rounded-lg">
            <div className="flex-[1] border-r-2 border-r-[#cbd5e1] p-6 flex flex-col space-y-6">
              <div className="flex flex-col items-center">
                <Image
                  src={avatar}
                  alt="Paris"
                  className="rounded-full border-2 mb-4"
                  width={156}
                  height={156}
                />
                <h6 className="mb-12 text-sm">{t("uploadImage")}</h6>
              </div>
              <div className="mb-4 flex flex-row items-center">
                <span className="mr-4">
                  <IoPerson color="blue" />
                </span>
                <span>Robert Knaihv</span>
              </div>
              <div className="mb-2 flex flex-row items-center">
                <span className="mr-4">
                  <MdOutlineMarkEmailRead color="blue" />
                </span>
                <span>knaihv@ymail.com</span>
              </div>
            </div>
            <div className="flex-[2]">
              <div className="grid grid-cols-2 gap-8 p-4">
                <FormInputField
                  label={t("fullname")}
                  type="text"
                  id="name"
                  // value={formData.name}
                  // onChange={handleInputChange}
                  placeholder="Full name"
                  required
                  // error={error && !email ? "Email is required" : ""}
                />
                <FormInputField
                  label={t("email")}
                  type="email"
                  id="email"
                  // value={formData.name}
                  // onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                  // error={error && !email ? "Email is required" : ""}
                />
                <FormInputField
                  label={t("department")}
                  id="department"
                  // value={formData.name}
                  // onChange={handleInputChange}
                  placeholder="Department"
                  required
                  // error={error && !email ? "Email is required" : ""}
                />
                <CustomSelect
                  id="role"
                  label={t("role")}
                  // value={role}
                  // onChange={setRole}
                  options={[
                    { value: "General Manager", label: "generalManager" },
                    { value: "Manager", label: "manager" },
                    { value: "Junior Staff", label: "staff" },
                  ]}
                  required
                  searchable={true}
                  group={false}
                />
              </div>
              <div className="px-16 mt-8">
                <CustomButton
                  label={t("submit")}
                  // onClick={handleSubmit}
                  type="submit"
                  className="custom-class"
                  // loading={isSubmitting}
                />
              </div>
            </div>
          </main>
        </Box>
      </Modal>
    </div>
  );
}
