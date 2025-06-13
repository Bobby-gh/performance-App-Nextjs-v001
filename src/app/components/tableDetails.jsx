"use client";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contex/context-context";
import { FaEye, FaRegEdit, FaSave, FaSitemap, FaUser } from "react-icons/fa";
import {
  Box,
  Button,
  CircularProgress,
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
import {
  useDepartmentRouteData,
  useEdit,
  useUserGoalRatingByID,
  useUserRating,
} from "../api/databook/route-data";
import { useTranslation } from "react-i18next";
import {
  CategoryType,
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

export function AssignGoal({ data, open, onClose }) {
  const { t } = useTranslation();
  const { triggerComponent } = useContext(AuthContext);
  const { departmenttable } = useDepartmentRouteData();
  const { editFunction } = useEdit();
  const formattedDate = (dateString) =>
    new Date(dateString).toISOString().split("T")[0];
  const [isLoading, setIsLoading] = useState(false);
  const [editableFields, setEditableFields] = useState({ 
    goalId: data._id,
    taskAssignedToId: data.taskAssignedToId,
    goalTitle: data.goalTitle,
    goalDescription: data.goalDescription,
    goalStatus: data.status,
    assignedTo: data.taskAssignedTo,
    deadline: data.goalDeadline,
    target: data.target,
    goalType: data.goalType
   });
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
    priority: "",
    goalType: editableFields.goalType
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
        console.log("Edit Save failed:", response);
        showToast("Edit failed to Save, kindly Try Again Later:", "error");
      }
    } catch (error) {
      console.log("Edit error:", error);
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
                    {/*<ModalFormSelect
                      id="assignedTo"
                      label={t("assignedTo")}
                      value={editableFields.assignedTo}
                      options={auth.refNum === "ref?1!"
                        ? departmenttable.map((department) => ({
                            value: department.departmentId,
                            label: department.departmentName,
                          }))
                        : employeetable.map((employee) => ({
                            value: employee.employeeId,
                            label: employee.employeeName,
                          }))
                      }
                      onChange={(selectedOptions) => {
                        setEditableFields((prev) => ({
                          ...prev,
                          workQuality: selectedOptions,
                        }));
                      }}
                      
                    />*/}
                    <ModalFormSelect
                      id="assignedTo"
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
                      label={t("assignedBy")}
                      id="assignedBy"
                      value={data.taskAssignedById}
                      onChange={handleChange}
                    />

                    <ModalFormSelect
                      id="goalType"
                      label="Goal Type"
                      value={editableFields.goalType}
                      options={[
                        {
                          value: "human relationship",
                          label: t("humanRelationship"),
                        },
                        { value: "financial", label: t("financial") },
                        {
                          value: "customer centred",
                          label: t("customerCentred"),
                        },
                        {
                          value: "innovation",
                          label: t("internalProcessingAndInnovation"),
                        },
                      ]}
                      onChange={(selectedOptions) => {
                        setEditableFields((prev) => ({
                          ...prev,
                          goalType: selectedOptions,
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
                </FormControl>
              </div>
            </div>
            <button
              onClick={handleEditSubmit}
              className="text-sm text-blue-500 hover:text-blue-700 px-4 py-1 rounded"
              disabled={isLoading}>
              {isLoading ? (
                <div className="flex flex-row justify-center items-center">
                  <p className="text-sm pr-2">loading...</p>
                  <CircularProgress size={27} thickness={6} color="primary" />
                </div>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export function AssessGoal({ data, open, onClose }) {
  const { t } = useTranslation();
  const { departmenttable } = useDepartmentRouteData();
  const { editFunction } = useEdit();
  const { triggerComponent } = useContext(AuthContext);

  const formattedDate = (dateString) =>
    new Date(dateString).toISOString().split("T")[0];

  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [editableFields, setEditableFields] = useState({
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

  const handleChange = (key, value) => {
    setEditableFields((prev) => ({ ...prev, [key]: value }));
  };

  const updateData = {
    goalTitle: editableFields.goalTitle,
    goalDescription: editableFields.goalDescription,
    goalStatus: editableFields.goalStatus,
    taskAssignedTo: editableFields.assignedTo,
    goalDeadline: editableFields.deadline,
    goalType: editableFields.goalType,
    performancePercent: editableFields.performancePercent,
    reviewed: editableFields.reviewed,
    taskAssignedBy: editableFields.assignedBy,
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const name = "accessGoal";
      const id = editableFields.goalId;
      const response = await editFunction(updateData, id, name);

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
      setEditMode(false);
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

        <div className="p-6 space-y-2 mt-2 bg-[#D7E7FA] max-h-[90vh] rounded-lg">
          <div className="flex justify-between mb-6">
            <div className="gap-4">
              <div className="font-semibold text-lg mb-2">
                {editMode ? (
                  <input
                    className="w-full bg-transparent outline-none"
                    value={editableFields.goalTitle || ""}
                    onChange={(e) => handleChange("goalTitle", e.target.value)}
                  />
                ) : (
                  editableFields.goalTitle
                )}
              </div>

              <div className="flex items-center space-x-2 text-sm">
                <IoCalendarClearOutline color="red" />
                <span className="text-red-500">
                  {t("dueDate")}:{" "}
                  {editMode ? (
                    <input
                      type="date"
                      className="border px-2 py-1 rounded"
                      value={formattedDate(editableFields.deadline)}
                      onChange={(e) => handleChange("deadline", e.target.value)}
                    />
                  ) : (
                    formattedDate(editableFields.deadline)
                  )}
                </span>
              </div>
            </div>

            <div className="text-blue-500 font-semibold text-sm">
              {editableFields.goalStatus}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg max-h-[65vh] overflow-y-auto">
            <FormControl fullWidth>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <FormInputField
                  label={t("goalTitle")}
                  id="goalTitle"
                  value={editableFields.goalTitle}
                  onChange={handleChange}
                />
                <ModalFormSelect
                  id="assignedTo"
                  label={t("assignedTo")}
                  value={editableFields.assignedTo}
                  options={departmenttable.map((d) => ({
                    value: d.departmentId,
                    label: d.departmentName,
                  }))}
                  onChange={(option) => handleChange("assignedTo", option)}
                  required
                />
                <FormInputField
                  label={t("deadline")}
                  type="date"
                  id="deadline"
                  value={formattedDate(editableFields.deadline)}
                  onChange={handleChange}
                />
                <FormInputField
                  label={t("performancePercent")}
                  id="performancePercent"
                  value={editableFields.performancePercent}
                  onChange={handleChange}
                />
                <ModalFormSelect
                  id="reviewed"
                  label={t("reviewed")}
                  value={editableFields.reviewed}
                  options={[
                    { value: true, label: "Yes" },
                    { value: false, label: "No" },
                  ]}
                  onChange={(option) => handleChange("reviewed", option)}
                  required
                />
              </div>

              <div className="flex justify-end mt-4">
                <CustomButton
                  label={isLoading ? "Saving..." : "Save"}
                  onClick={handleEditSubmit}
                  type="submit"
                  className="custom-class"
                  disabled={isLoading}
                />
              </div>
            </FormControl>
          </div>
        </div>
      </Box>
    </Modal>
  );
}



export function EmployeeDetails({ data, open, onClose }) {
  const { t } = useTranslation();
  const { triggerComponent } = useContext(AuthContext);
  const { editFunction } = useEdit();
  const formattedDate = (dateString) =>
    new Date(dateString).toISOString().split("T")[0];

  const [editableFields, setEditableFields] = useState({
    employeeId: data?.userId,
    name: data?.name,
    email: data?.email,
    department: data?.department,
    role: data?.role,
  });

  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (key, value) => {
    setEditableFields((prev) => ({ ...prev, [key]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const name = "user";
      const id = editableFields.employeeId;
      const updateData = {
        name: editableFields.name,
        email: editableFields.email,
        department: editableFields.department,
        role: editableFields.role,
      };
      const response = await editFunction(updateData, id, name);

      if (response?.status === 200) {
        showToast("Edit Saved successful:", "success");
        triggerComponent();
        onClose();
      } else {
        showToast("Edit failed to Save, kindly Try Again Later:", "error");
      }
    } catch (error) {
      console.log("Edit error:", error);
    } finally {
      setIsLoading(false);
      setEditMode(false);
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

            <div className="flex justify-end mb-2">
              <button onClick={() => setEditMode(!editMode)}>
                <FaRegEdit className="text-blue-500" size={20} />
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <IoPerson color="blue" />
                {editMode ? (
                  <input
                    className="border rounded px-2 py-1 w-full"
                    value={editableFields.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                  />
                ) : (
                  <span className="font-medium">{data?.name}</span>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <MdOutlineMarkEmailRead color="blue" />
                {editMode ? (
                  <input
                    readOnly
                    className="border rounded px-2 py-1 w-full"
                    value={editableFields.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                ) : (
                  <span>{data?.email}</span>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <FaSitemap color="blue" />
                {editMode ? (
                  <input
                    readOnly
                    className="border rounded px-2 py-1 w-full"
                    value={editableFields.department}
                    onChange={(e) => handleChange("department", e.target.value)}
                  />
                ) : (
                  <span>{data?.department}</span>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <MdVerifiedUser color="blue" />
                {editMode ? (
                  <input
                    className="border rounded px-2 py-1 w-full"
                    value={editableFields.role}
                    onChange={(e) => handleChange("role", e.target.value)}
                  />
                ) : (
                  <span>{data?.role}</span>
                )}
              </div>

              {editMode && (
                <div className="pt-4">
                  <CustomButton
                    label={t("submit")}
                    type="submit"
                    className="custom-class"
                    loading={isLoading}
                    onClick={handleEditSubmit}
                  />
                </div>
              )}
            </div>
        </main>
      </Box>
    </Modal>
  );
}



export const EmployeeRating = ({ open, onClose, data }) => {
  const { createUserRating } = useUserRating();
  const { getUserRatingById } = useUserGoalRatingByID();
  const [isLoading, setLoading] = useState(false);
  const [rating, setRating] = useState("");
  const [pieData, setPieData] = useState("");
  const [barData, setBarData] = useState([]);
  const [recentRating, setCurrentRating] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    const fetchUserRating = async () => {
      try {
        const res = await getUserRatingById(data?.userId);
        console.log({ res: res });
        setPieData(res?.data.goalStatus);
        setBarData(res?.data.performance);
        setCurrentRating(res?.data.ratings);
      } catch (error) {
        console.error("Failed to fetch user rating:", error);
      }
    };

    if (data?.userId) {
      fetchUserRating();
    }
  }, [data?.userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await createUserRating(data?.userId, rating);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const pieChartData = [
    { name: "Completed", value: pieData.completed },
    { name: "In Progress", value: pieData.inProgress },
    { name: "Not Started", value: pieData.notStarted },
  ];

  const COLORS = ["#015720", "#3300d9", "#800101"];
  const currentRating = recentRating;

  let ratingLabel = "";
  let ratingMessage = "";
  let starIcon = "";

  if (currentRating === "Outstanding") {
    ratingLabel = t("outstanding");
    ratingMessage = t("messageOutstanding");
    starIcon = "🥇";
  } else if (currentRating === "Exceeds Expectations") {
    ratingLabel = t("exceedsExpectations");
    ratingMessage = t("messageExceedExpectation");
  } else if (currentRating === "Meets Expectations") {
    ratingLabel = t("meetsExpectations");
    ratingMessage = t("messageMeetExpectation");
    starIcon = "🥉";
  }

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
        <div className="bg-gray-50 p-6 rounded-xl shadow max-h-[78vh] overflow-y-auto space-y-2">
          {/* Employee Info Section (formatted like EmployeeDetails) */}
          <div className="space-y-1">
            <h4 className="text-xl font-bold text-gray-800">
              {t("employeeAppraisalSummary")}
            </h4>
            <div className="text-sm">{data?.name}</div>
            <div className="text-sm">{data?.department}</div>
          </div>

          {/* KPI Performance & Rating */}
          <div className="flex flex-col lg:flex-row gap-2">
            {/* KPI Performance */}
            <div className="flex-1 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h5 className="text-sm font-semibold text-gray-600 mb-1">
                {t("kpiPerformance")}
              </h5>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart
                  data={barData}
                  margin={{ top: 10, right: 20, left: -10, bottom: 5 }}>
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 15 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(99, 102, 241, 0.1)" }}
                    formatter={(value) => [`${value}%`, "Performance"]}
                  />
                  <Bar
                    dataKey="performance"
                    fill="#6366f1"
                    radius={[6, 6, 0, 0]}
                    barSize={30}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Right Panel */}
            <div className="w-full lg:w-1/3 flex flex-col gap-2">
              {/* Goal Status Overview */}
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h5 className="text-lg font-semibold text-gray-700 mb-4">
                  {t("goalStatusOverview")}
                </h5>
                <div className="flex">
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        outerRadius={70}
                        dataKey="value"
                        nameKey="name">
                        {pieChartData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Rating */}
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h5 className="text-lg font-semibold text-gray-700 mb-2">
                  {t("currentRating")}
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
              className="block mb-2 text-sm font-medium text-gray-700">
              {t("appraisalCategory")}
            </label>
            <select
              id="appraisal"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
              value={rating}
              onChange={(e) => setRating(e.target.value)}>
              <option value="" disabled>
                {t("selectAppraisalLevel")}
              </option>
              <option value="Outstanding">{t("outstanding")}</option>
              <option value="Exceeds Expectations">
                {t("exceedsExpectations")}
              </option>
              <option value="Meets Expectations">
                {t("meetsExpectations")}
              </option>
              <option value="Below Expectations">
                {t("belowExpectations")}
              </option>
            </select>
          </div>
        </div>
        <div className="flex justify-end mt-3">
          <Button type="text" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? t("saving") : t("save")}
          </Button>
        </div>
      </Box>
    </Modal>
  );
};
