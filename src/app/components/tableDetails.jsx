"use client";
import React, { useContext, useState } from "react";
import { AuthContext } from "../contex/context-context";
import { FaEye, FaSave, FaSitemap, FaUser } from "react-icons/fa";
import {
  Box,
  FormControl,
  IconButton,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer, 
  BarChart,
  Bar,
  XAxis,
} from "recharts";
import { useDepartmentRouteData, useEdit } from "../api/databook/route-data";
import { useTranslation } from "react-i18next";
import {
  CustomButton,
  CustomSelect,
  FormInputField,
  ModalFormSelect,
  ModalModification,
} from "./widgets";
import {
  IoCalendarClearOutline,
  IoClose,
  IoPerson,
  IoTrophy,
} from "react-icons/io5";
import Image from "next/image";
import { MdOutlineMarkEmailRead, MdVerifiedUser } from "react-icons/md";
import avatar from "../images/avatar.jpg";
import { showToast } from "./notification";
import { Star } from "@mui/icons-material";

export function AssignGoal({ data, open, onClose }) {
  const { t } = useTranslation();
  const { triggerComponent } = useContext(AuthContext);
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
    target: data.target,
  });
  const [editableFields, setEditableFields] = useState({ ...assignGoal });
  const [editMode, setEditMode] = useState(false);

  const handleChange = (key, value) => {
    setEditableFields((prev) => ({ ...prev, [key]: value }));
  };

  const updateData = {
    goalTitle: editableFields.goalTitle,
    goalDescription: editableFields.goalDescription,
    goalStatus: editableFields.status,
    taskAssignedTo: editableFields.assignedTo,
    goalDeadline: editableFields.deadline,
    target: editableFields.target,
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
                      onChange={handleChange}
                    />
                    <FormInputField
                      label={t("status")}
                      id="goalStatus"
                      value={editableFields.goalStatus}
                      onChange={handleChange}
                    />
                    <FormInputField
                      label={t("description")}
                      id="goalDescription"
                      value={editableFields.goalDescription}
                      onChange={handleChange}
                    />
                    <ModalFormSelect
                      id="assignedTO"
                      label={t("assignedTo")}
                      value={editableFields.assignedTo}
                      options={departmenttable.map((department) => ({
                        value: department.departmentId,
                        label: department.departmentName,
                      }))}
                      onChange={(selectedOptions) => {
                        setEditableFields((prev) => ({
                          ...prev,
                          workQuality: selectedOptions,
                        }));
                      }}
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
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <FormInputField
                      label={t("goalTitle")}
                      id="goalTitle"
                      value={editableFields.goalTitle}
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

  const [editableFields, setEditableFields] = useState({ ...assessGoal });
  const [isLoading, setIsLoading] = useState(false);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const name = "accessGoal";
      const id = editableFields.goalId;
      const response = await editFunction(
        { goalTitle: editableFields.goalTitle },
        id,
        name
      );
      if (response?.status === 200) {
        showToast("Edit Saved successful:", "success");
        triggerComponent();
        onClose();
      } else {
        showToast("Edit failed to Save, kindly Try Again Later:", "error");
      }
    } catch (error) {
      console.error("Edit error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={ModalModification}>
        <div className="flex absolute top-2 right-2 text-gray-500 hover:text-gray-700 space-x-2">
          <button onClick={onClose}>
            <IoClose size={24} />
          </button>
        </div>

        <main className="flex flex-row gap-6 text-black p-6 bg-white rounded-lg">
          {/* Left Section */}
          <div className="flex-[1] bg-gray-50 p-6 rounded shadow space-y-4">
            <div className="flex flex-col items-center">
              <Image
                src={avatar}
                alt="User Avatar"
                className="rounded-full border-2 mb-4"
                width={120}
                height={120}
              />
              <h6 className="text-sm mb-2">{t("uploadImage")}</h6>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <IoPerson color="blue" />
                <span className="font-medium">{data?.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MdOutlineMarkEmailRead color="blue" />
                <span>{data?.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaSitemap color="blue" />
                <span>{data?.department}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MdVerifiedUser color="blue" />
                <span>{data?.role}</span>
              </div>
              <div className="pt-4">
                <CustomButton
                  label={t("submit")}
                  type="submit"
                  className="custom-class"
                  loading={isLoading}
                  onClick={handleEditSubmit}
                />
              </div>
            </div>
          </div>
        </main>
      </Box>
    </Modal>
  );
}


export const EmployeeRating = ({
  data,
  onRate,
  open,
  onClose,
}) => {
  const { t } = useTranslation();

  const dummyChartData = [
    { name: "Completed", value: 100 },
    { name: "In Progress", value: 5 },
    { name: "Not Started", value: 20 },
  ];

  const COLORS = ["#015720", "#3300d9", "#800101"];
  const currentRating = "gold"; // Ideally dynamic in future

  let ratingLabel = "";
  let ratingMessage = "";
  let starIcon = "";

  if (currentRating === "gold") {
    ratingLabel = "Gold Star";
    ratingMessage = "Awarded a Gold Star for outstanding performance.";
    starIcon = "🥇";
  } else if (currentRating === "silver") {
    ratingLabel = "Silver Star";
    ratingMessage =
      "Awarded a Silver Star for great performance and strong consistency.";
    starIcon = "🥈";
  } else {
    ratingLabel = "Bronze Star";
    ratingMessage =
      "Awarded a Bronze Star. Improvement is needed, but potential is visible.";
    starIcon = "🥉";
  }

  const kpiData = [
    { name: "Jan", value: 40 },
    { name: "Feb", value: 55 },
    { name: "Mar", value: 85 },
    { name: "Apr", value: 95 },
    { name: "May", value: 70 },
    { name: "Jun", value: 50 },
  ];

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={ModalModification}>
        {/* Close Button */}
        <div className="flex absolute top-2 right-2 text-gray-500 hover:text-gray-700 space-x-2">
          <button onClick={onClose}>
            <IoClose size={24} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="bg-gray-50 p-6 rounded-xl shadow max-h-[78vh] overflow-y-auto space-y-6">
          {/* Header with employee info */}
          <div className="space-y-1">
            <h4 className="text-xl font-bold text-gray-800">
              Employee Appraisal Summary
            </h4>
            <p className="text-sm text-gray-600">
              <span className="font-medium">{t("name")}:</span> {data?.name}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">{t("department")}:</span> {data?.department}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">{t("role")}:</span> {data?.role}
            </p>
          </div>

          {/* Layout */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* KPI Card */}
            <div className="flex-1 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h5 className="text-sm font-semibold text-gray-600 mb-1">
                KPI Performance
              </h5>
              <div className="text-xl font-bold text-gray-900">90.75%</div>
              <div className="text-green-600 text-sm mb-4">
                +20% vs last month
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart
                  data={kpiData}
                  margin={{ top: 10, right: 20, left: -10, bottom: 20 }}
                >
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(99, 102, 241, 0.1)" }}
                    formatter={(value) => [`${value}%`, "Performance"]}
                  />
                  <Bar
                    dataKey="value"
                    fill="#6366f1"
                    radius={[6, 6, 0, 0]}
                    barSize={30}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Right Side */}
            <div className="w-full lg:w-1/3 flex flex-col gap-6">
              {/* Goal Status */}
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h5 className="text-lg font-semibold text-gray-700 mb-4">
                  Goal Status Overview
                </h5>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={dummyChartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={70}
                      dataKey="value"
                      nameKey="name"
                      label
                    >
                      {dummyChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Rating */}
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h5 className="text-lg font-semibold text-gray-700 mb-2">
                  Current Rating
                </h5>
                <div className="flex items-center space-x-4">
                  <div className="text-yellow-400 text-3xl">{starIcon}</div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {ratingLabel}
                    </p>
                    <p className="text-xs text-gray-500">{ratingMessage}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Appraisal Selector */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <label
              htmlFor="appraisal"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Appraisal Category
            </label>
            <select
              id="appraisal"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
              defaultValue=""
            >
              <option value="" disabled>
                Select appraisal level
              </option>
              <option value="gold">Gold - Exceptional Performance</option>
              <option value="silver">Silver - Above Expectations</option>
              <option value="bronze">Bronze - Meets Expectations</option>
            </select>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

