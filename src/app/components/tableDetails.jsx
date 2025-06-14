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
  TeamModalModification,
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
  const { auth, triggerComponent } = useContext(AuthContext);
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
    goalType: data.goalType,
  });

  const [editMode, setEditMode] = useState(false);

  const handleChange = (key, value) => {
    setEditableFields((prev) => ({ ...prev, [key]: value }));
  };

  const updateData = {
  goalTitle: editableFields.goalTitle,
  goalDescription: editableFields.goalDescription,
  goalStatus: editableFields.goalStatus,
  taskAssignedTo: editableFields.assignedTo,
  goalDeadline: editableFields.deadline,
  target: editableFields.target,
  priority: "",
  goalType: editableFields.goalType,
  ...(auth?.refNum === "ref?2!" && { mainGoal: data.mainGoal }),
};

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const name = "goal";
      const id = editableFields.goalId;
      const response = await editFunction(updateData, id, name);

      if (response?.status === 200) {
        showToast("Edit Saved successfully", "success");
        triggerComponent();
        onClose();
      } else {
        showToast("Edit failed to save. Try again later.", "error");
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
                          value={formattedDate(editableFields.deadline) || ""}
                          onChange={(e) =>
                            handleChange("deadline", e.target.value)
                          }
                        />
                      ) : (
                        formattedDate(editableFields.deadline)
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
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <FormInputField
                      label={t("goalTitle")}
                      id="goalTitle"
                      value={editableFields.goalTitle}
                      onChange={(e) =>
                        handleChange("goalTitle", e.target.value)
                      }
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
                      onChange={(e) =>
                        handleChange("goalDescription", e.target.value)
                      }
                    />

                    <ModalFormSelect
                      id="assignedTo"
                      label={t("assignedTo")}
                      value={editableFields.assignedTo}
                      options={departmenttable.map((department) => ({
                        value: department.departmentId,
                        label: department.departmentName,
                      }))}
                      onChange={(selected) =>
                        handleChange("assignedTo", selected)
                      }
                      required
                    />

                    <FormInputField
                      label={t("assignedBy")}
                      id="assignedBy"
                      value={data.taskAssignedById}
                      disabled
                    />

                    <ModalFormSelect
                      id="goalType"
                      label={t("goalType")}
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
                      onChange={(selected) =>
                        handleChange("goalType", selected)
                      }
                      required
                    />

                    <FormInputField
                      label="Target"
                      id="target"
                      value={editableFields.target}
                      onChange={(e) => handleChange("target", e.target.value)}
                    />

                    <FormInputField
                      label={t("date")}
                      id="goalDeadline"
                      type="date"
                      value={formattedDate(editableFields.deadline)}
                      onChange={(e) => handleChange("deadline", e.target.value)}
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
                  <p className="text-sm pr-2">Loading...</p>
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
  const { triggerComponent, auth } = useContext(AuthContext);

  const formattedDate = (dateString) =>
    dateString ? new Date(dateString).toISOString().split("T")[0] : "";

  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [editableFields, setEditableFields] = useState({
    goalId: data?._id,
    goalTitle: data?.goalTitle,
    goalStatus: data?.status,
    assignedTo: data?.taskAssignedTo,
    deadline: data?.goalDeadline,
    performancePercent: data?.performancePercent,
    workQuality: data?.workQuality,
    productivity: data?.productivity,
    communication: data?.communication,
    proceduralKnowledge: data?.proceduralKnowledge,
    reliability: data?.reliability,
    teamwork: data?.teamwork,
    creativity: data?.creativity,
    comment: data?.comment,
    rating: data?.rating,
  });

  const handleChange = (key, value) => {
    setEditableFields((prev) => ({ ...prev, [key]: value }));
  };

  const updateData = {
    goalTitle: editableFields.goalTitle,
    goalStatus: editableFields.goalStatus,
    taskAssignedTo: editableFields.assignedTo,
    goalDeadline: editableFields.deadline,
    performancePercent: editableFields.performancePercent,
    workQuality: editableFields.workQuality,
    productivity: editableFields.productivity,
    communication: editableFields.communication,
    proceduralKnowledge: editableFields.proceduralKnowledge,
    reliability: editableFields.reliability,
    teamwork: editableFields.teamwork,
    creativity: editableFields.creativity,
    comment: editableFields.comment,
    rating: editableFields.rating,
    ...(auth?.refNum === "ref?2!" && { mainGoal: data.mainGoal }),
  };
  console.log("Sending rating:", updateData.rating);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const name = "accessGoal";
      const id = editableFields.goalId;
      const response = await editFunction(updateData, id, name);

      if (response?.status === 200) {
        showToast("Edit Saved successfully", "success");
        triggerComponent();
        onClose();
      } else {
        showToast("Edit failed to save. Try again later.", "error");
      }
    } catch (error) {
      console.log("Edit error:", error);
    } finally {
      setIsLoading(false);
      setEditMode(false);
    }
  };

  const performanceOptions = [
    { value: "1", label: t("weak") },
    { value: "2", label: t("average") },
    { value: "3", label: t("good") },
    { value: "4", label: t("veryGood") },
  ];

  const ratingOptions = [
    { value: "Below Expectations", label: t("belowExpectations") },
    { value: "Meets Expectations", label: t("meetsExpectations") },
    { value: "Exceeds Expectations", label: t("exceedsExpectations") },
    { value: "Outstanding", label: t("outstanding") },
  ];

  const assignedToLabel =
    departmenttable.find((d) => d.departmentId === editableFields.assignedTo)
      ?.departmentName || "";

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={ModalModification}>
        <div className="flex absolute top-2 right-2 text-gray-500 hover:text-gray-700 space-x-2">
          <button onClick={onClose}>
            <IoClose size={24} />
          </button>
        </div>

        <div className="mb-6 p-4 bg-[#D7E7FA] rounded">
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-semibold mb-2">
              {editMode ? (
                <input
                  className="w-full font-semibold text-lg bg-transparent outline-none border-b border-gray-300 focus:border-blue-500"
                  value={editableFields.goalTitle}
                  onChange={(e) => handleChange("goalTitle", e.target.value)}
                />
              ) : (
                editableFields.goalTitle
              )}
            </h2>

            <button
              onClick={() => setEditMode((prev) => !prev)}
              className="text-sm text-blue-500 underline hover:text-blue-700"
            >
              {editMode ? t("cancelEdit") : t("edit")}
            </button>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-gray-700">
            <div>
              <span className="font-semibold">{t("assignedTo")}: </span>
              <span>{assignedToLabel}</span>
            </div>
            <div>
              <span className="font-semibold">{t("performancePercent")}: </span>
              <span>{editableFields.performancePercent}%</span>
            </div>
            <div className="flex items-center text-red-600">
              <IoCalendarClearOutline className="mr-1" />
              <span>
                {t("dueDate")}: {formattedDate(editableFields.deadline)}
              </span>
            </div>
            <div className="text-blue-600 font-semibold ml-auto">
              {editableFields.goalStatus}
            </div>
          </div>
        </div>

        <form onSubmit={handleEditSubmit}>
          <FormControl fullWidth>
            <div className="grid grid-cols-3 gap-6 max-h-[65vh] overflow-y-auto">
              {[
                "workQuality",
                "productivity",
                "communication",
                "proceduralKnowledge",
                "reliability",
                "teamwork",
                "creativity",
              ].map((key) => (
                <div key={key}>
                  {editMode ? (
                    <ModalFormSelect
                      id={key}
                      label={t(key)}
                      value={editableFields[key]}
                      options={performanceOptions}
                      onChange={(option) => handleChange(key, option)}
                      required
                    />
                  ) : (
                    <>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t(key)}
                      </label>
                      <div className="text-gray-800">{editableFields[key]}</div>
                    </>
                  )}
                </div>
              ))}

              <div className="col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("goalRating")}
                </label>
                {editMode ? (
                  <ModalFormSelect
                    id="rating"
                    label={t("goalRating")}
                    value={editableFields.rating}
                    options={ratingOptions}
                    onChange={(option) => handleChange("rating", option)}
                    required
                  />
                ) : (
                  <div className="text-gray-800">{editableFields.rating}</div>
                )}
              </div>

              <div className="col-span-3">
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                  {t("comment")}
                </label>
                {editMode ? (
                  <textarea
                    id="comment"
                    rows={4}
                    value={editableFields.comment || ""}
                    onChange={(e) => handleChange("comment", e.target.value)}
                    className="w-full rounded border border-gray-300 p-2 resize-y"
                  />
                ) : (
                  <p className="text-gray-800 whitespace-pre-line">{editableFields.comment}</p>
                )}
              </div>
            </div>

            {editMode && (
              <div className="flex justify-end mt-6">
                <CustomButton
                  label={isLoading ? t("saving") : t("save")}
                  type="submit"
                  disabled={isLoading}
                  className="custom-class"
                />
              </div>
            )}
          </FormControl>
        </form>
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
      <Box sx={TeamModalModification}>
        <div className="flex absolute top-2 right-2 text-gray-500 hover:text-gray-700 space-x-2">
          <button onClick={() => setEditMode(!editMode)}>
            <FaRegEdit className="text-blue-500" size={20} />
          </button>
          <button onClick={onClose}>
            <IoClose size={24} />
          </button>
        </div>

        <main className="flex text-black p-6 bg-white rounded-lg mt-6">
          {/* Left: Avatar (1/3 width) */}
          <div className="w-1/3 flex flex-col items-center pr-6 border-r border-gray-300">
            <Image
              src={avatar}
              alt="User Avatar"
              className="rounded-full border-2 mb-4"
              width={150}
              height={150}
            />
            {/* <h6 className="text-sm mb-2">{t("uploadImage")}</h6> */}
          </div>

          {/* Right: Form Fields (2/3 width) */}
          <div className="w-2/3 pl-6">
            <div className="space-y-8">
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
