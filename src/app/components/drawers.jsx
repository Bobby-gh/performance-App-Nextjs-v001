"use client";
import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import axios from "../api/axios";
import { useState, useContext } from "react";
import { MdOutlineAddToPhotos } from "react-icons/md";
import CircularProgress from "@mui/material/CircularProgress";
import {
  useDepartmentRouteData,
  useEmployeesRouteData,
  useUnassessedGoalRouteData,
} from "../api/databook/route-data";
import {
  CREATE_DEPRATMENT,
  CREATE_EMPLOYEES_URL,
  GOAL_ASSESSMENT_URL,
  GOALS_URL,
} from "../api/routes";
import { AuthContext, Modaltrigger } from "../contex/context-context";
import { useTranslation } from "react-i18next";
import { CustomButton, CustomSelect, FormInputField } from "./widgets";
import { showToast } from "./notification";

export function CreateGoal() {
  const { t } = useTranslation();
  const { triggerComponent } = useContext(Modaltrigger);
  const { auth } = useContext(AuthContext);
  const { departmenttable } = useDepartmentRouteData();
  const { employeetable } = useEmployeesRouteData();
  const [departments, setDepartments] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [isLoading, setLoading] = useState(false);
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    target: "",
    endDate: "",
    department: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        GOALS_URL,
        JSON.stringify({
          goalTitle: formData.title,
          goalDescription: formData.description,
          goalDeadline: formData.endDate,
          taskAssignedTo: departments,
          target: formData.target,
          priority: priority,
          goalType: category,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      showToast("Action Item Created Successfully", "success");
      triggerComponent();
      handleClose();
      reload();
    } catch (error) {
      if (error.response.status === 400) {
        showToast("Kindly check Input details", "error");
      } else if (error.response.status === 500) {
        showToast("Server is currently down Contact your admin", "error");
      }
      handleClose();
      reload();
    } finally {
      setLoading(false);
    }
  };
  const reload = () => {
    setDepartments("");
    setPriority("");
    setCategory("");
    setFormData({
      title: "",
      description: "",
      target: "",
      endDate: "",
      department: "",
    });
  };

  function handleOpen() {
    setOpen(!open);
  }

  function handleClose() {
    setOpen(false);
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
    // setError((prevError) => ({ ...prevError, [id]: "" }));
  };
  return (
    <>
      <Button
        className="flex flex-row items-center text-blue-500 bg-blue-100"
        onClick={handleOpen}
        size="large"
        variant="outlined">
        <div className="px-6 text-sm">{t("assignGoal")}</div>
        <MdOutlineAddToPhotos size={25} />
      </Button>
      <Drawer anchor={"right"} open={open} onClose={handleClose}>
        <div className="flex justify-center font-bold py-5  text-black">
          {t("assignNewGoal")}
        </div>
        <hr />
        <form className="w-96">
          <div className="px-10 py-12 space-y-2">
            {auth.refNum === "ref?1!" || auth.refNum === "ref?1!" ? (
              <CustomSelect
                id="departmentName"
                label={t("department")}
                value={departments}
                onChange={setDepartments}
                options={departmenttable.map((department) => ({
                  value: department.departmentId,
                  label: department.departmentName,
                }))}
                searchable={true}
                required
                group={false}
              />
            ) : (
              <CustomSelect
                id="departmentName"
                label={t("staff")}
                value={departments}
                onChange={setDepartments}
                options={employeetable.map((department) => ({
                  value: department.userId,
                  label: department.name,
                }))}
                searchable={true}
                required
                group={false}
              />
            )}
            <FormInputField
              label={t("goalName")}
              id="title"
              onChange={handleInputChange}
              value={formData.title}
            />
            <CustomSelect
              id="category"
              value={category}
              label={t("goalCategory")}
              onChange={setCategory}
              options={[
                { value: "human relationship", label: t("humanRelationship") },
                { value: "financial", label: t("financial") },
                { value: "customer centred", label: t("customerCentred") },
                {
                  value: "innovation",
                  label: t("internalProcessingAndInnovation"),
                },
              ]}
              searchable={true}
              required
              group={false}
            />
            <FormInputField
              label={t("target")}
              id="target"
              onChange={handleInputChange}
              value={formData.target}
            />
            <CustomSelect
              id="priority"
              value={priority}
              label={t("priorityLevel")}
              onChange={setPriority}
              options={[
                { value: "low", label: t("low") },
                { value: "medium", label: t("medium") },
                { value: "high", label: t("high") },
              ]}
              searchable={true}
              required
              group={false}
            />
            <FormInputField
              label={t("description")}
              id="description"
              onChange={handleInputChange}
              value={formData.description}
            />
            <FormInputField
              label={t("endDate")}
              id="endDate"
              type="date"
              onChange={handleInputChange}
              value={formData.endDate}
            />
          </div>
          <div className="px-10 my-4">
             <CustomButton
              label="Submit"
              onClick={handleSubmit}
              type="submit"
              className="custom-class"
              loading={isLoading}
            />
          </div>
        </form>
      </Drawer>
    </>
  );
}
export function AccessGoal() {
  const { t } = useTranslation();
  const { triggerComponent } = useContext(Modaltrigger);
  const { auth } = useContext(AuthContext);
  const { unaccessedgoal } = useUnassessedGoalRouteData();
  const [goal, setGoal] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [assessData, setAssessData] = useState({
    workQuality: "",
    productivity: "",
    communication: "",
    proceduralKnowledge: "",
    reliability: "",
    teamWork: "",
    creativity: "",
    rating: "",
    comment: "",
    category: "",
  });
  const assessmentFormHandler = (e) => {
    const { id, value } = e.target;
    setAssessData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log({goalId: goal,
          workQuality: assessData.workQuality,
          productivity: assessData.productivity,
          communication: assessData.communication,
          proceduralKnowledge: assessData.proceduralKnowledge,
          reliability: assessData.reliability,
          teamwork: assessData.teamWork,
          creativity: assessData.creativity,
          rating: assessData.rating,
          comment: assessData.comment,})
    try {
      await axios.post(
        GOAL_ASSESSMENT_URL,
        JSON.stringify({
          goalId: goal,
          workQuality: assessData.workQuality,
          productivity: assessData.productivity,
          communication: assessData.communication,
          proceduralKnowledge: assessData.proceduralKnowledge,
          reliability: assessData.reliability,
          teamwork: assessData.teamWork,
          creativity: assessData.creativity,
          rating: assessData.rating,
          comment: assessData.comment,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          withCredentials: true,
        }
      );
      showToast("Task Assessed Successfuly", "success");
      triggerComponent();
      handleClose();
      reload();
    } catch (error) {
      if (error.response.status === 400) {
        showToast("Kindly check Input details", "error");
      } else if (error.response.status === 500) {
        showToast("Server is currently down Contact your admin", "error");
      }
      console.log(error);
      handleClose();
      reload();
    } finally {
      setLoading(false);
    }
  };
  const reload = () => {
    setGoal("");
    setAssessData({
      workQuality: "",
      productivity: "",
      communication: "",
      proceduralKnowledge: "",
      reliability: "",
      teamWork: "",
      creativity: "",
      rating: "",
      comment: "",
      category: "",
    });
  };

  const [open, setOpen] = React.useState(false);

  function handleOpen() {
    setOpen(!open);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <>
      <Button
        className="flex flex-row items-center text-blue-500 bg-blue-100"
        onClick={handleOpen}
        size="large"
        variant="outlined">
        <div className="px-6 text-sm">{t("access")}</div>
        <MdOutlineAddToPhotos size={25} />
      </Button>
      <Drawer anchor={"right"} open={open} onClose={handleClose}>
        <div className="flex justify-center font-bold py-5  text-black">
          {t("assessingRatingGoal")}
        </div>
        <hr />
        <form className="w-96">
          <div className="flex flex-col px-10 py-8 space-y-2">
            <CustomSelect
              id="goal"
              label={t("goal")}
              value={goal}
              onChange={setGoal}
              options={unaccessedgoal.map((goals) => ({
                value: goals._id,
                label: goals.goalTitle,
              }))}
              searchable={true}
              required
              group={false}
            />
            <CustomSelect
              id="workQuality"
              label={t("qualityOfWork")}
              value={assessData.workQuality}
              onChange={(selectedOptions) => {
                setAssessData((prev) => ({
                  ...prev,
                  workQuality: selectedOptions,
                }));
              }}
              options={[
                { value: "1", label: t("weak") },
                { value: "2", label: t("average") },
                { value: "3", label: t("good") },
                { value: "4", label: t("veryGood") },
              ]}
              searchable={true}
              required
              group={false}
            />
            <CustomSelect
              id="productivity"
              label={t("productivity")}
              value={assessData.productivity}
              onChange={(selectedOptions) => {
                setAssessData((prev) => ({
                  ...prev,
                  productivity: selectedOptions,
                }));
              }}
              options={[
                { value: "1", label: t("weak") },
                { value: "2", label: t("average") },
                { value: "3", label: t("good") },
                { value: "4", label: t("veryGood") },
              ]}
              searchable={true}
              required
              group={false}
            />
            <CustomSelect
              id="communication"
              label={t("communication")}
              value={assessData.communication}
              onChange={(selectedOptions) => {
                setAssessData((prev) => ({
                  ...prev,
                  communication: selectedOptions,
                }));
              }}
              options={[
                { value: "1", label: t("weak") },
                { value: "2", label: t("average") },
                { value: "3", label: t("good") },
                { value: "4", label: t("veryGood") },
              ]}
              searchable={true}
              required
              group={false}
            />
            <CustomSelect
              id="proceduralKnowledge"
              label={t("procedure")}
              value={assessData.proceduralKnowledge}
              onChange={(selectedOptions) => {
                setAssessData((prev) => ({
                  ...prev,
                  proceduralKnowledge: selectedOptions,
                }));
              }}
              options={[
                { value: "1", label: t("weak") },
                { value: "2", label: t("average") },
                { value: "3", label: t("good") },
                { value: "4", label: t("veryGood") },
              ]}
              searchable={true}
              required
              group={false}
            />
            <CustomSelect
              id="reliability"
              label={t("reliability")}
              value={assessData.reliability}
              onChange={(selectedOptions) => {
                setAssessData((prev) => ({
                  ...prev,
                  reliability: selectedOptions,
                }));
              }}
              options={[
                { value: "1", label: t("weak") },
                { value: "2", label: t("average") },
                { value: "3", label: t("good") },
                { value: "4", label: t("veryGood") },
              ]}
              searchable={true}
              required
              group={false}
            />
            <CustomSelect
              id="teamWork"
              label={t("teamWork")}
              value={assessData.teamWork}
              onChange={(selectedOptions) => {
                setAssessData((prev) => ({
                  ...prev,
                  teamWork: selectedOptions,
                }));
              }}
              options={[
                { value: "1", label: t("weak") },
                { value: "2", label: t("average") },
                { value: "3", label: t("good") },
                { value: "4", label: t("veryGood") },
              ]}
              searchable={true}
              required
              group={false}
            />
            <CustomSelect
              id="creativity"
              label={t("creativity")}
              value={assessData.creativity}
              onChange={(selectedOptions) => {
                setAssessData((prev) => ({
                  ...prev,
                  creativity: selectedOptions,
                }));
              }}
              options={[
                { value: "1", label: t("weak") },
                { value: "2", label: t("average") },
                { value: "3", label: t("good") },
                { value: "4", label: t("veryGood") },
              ]}
              searchable={true}
              required
              group={false}
            />
            <CustomSelect
              id="rating"
              label={t("goalRating")}
              value={assessData.rating}
              onChange={(selectedOptions) => {
                setAssessData((prev) => ({
                  ...prev,
                  rating: selectedOptions,
                }));
              }}
              options={[
                { value: "Below Expectations", label: t("belowExpectations") },
                { value: "Meets Expectations", label: t("meetsExpectations") },
                {
                  value: "Exceeds Expectations",
                  label: t("exceedsExpectations"),
                },
                { value: "Outstanding", label: t("outstanding") },
              ]}
              searchable={true}
              required
              group={false}
            />

            <FormInputField
              label={t("comment")}
              id="comment"
              onChange={assessmentFormHandler}
              value={assessData.comment}
            />
          </div>
          <div className="px-10">
             <CustomButton
              label="Submit"
              onClick={handleSubmit}
              type="submit"
              className="custom-class"
              loading={isLoading}
            />
          </div>
        </form>
      </Drawer>
    </>
  );
}
export function Userforms() {
  const { t } = useTranslation();
  const { triggerComponent } = useContext(Modaltrigger);
  const { auth } = useContext(AuthContext);
  const [departments, setDepartments] = useState("");
  const { departmenttable } = useDepartmentRouteData();
  const [role, setRole] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [userFormData, setUserFormData] = useState({
    fullName: "",
    email: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        CREATE_EMPLOYEES_URL,
        {
          fullName: userFormData.fullName,
          department: departments,
          email: userFormData.email,
          role: role,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      showToast("User Ssaved Successfully", "success");
      triggerComponent();
      handleClose();
      reload();
    } catch (error) {
      if (error.response.status === 400) {
        showToast("Kindly check Input details", "error");
      } else if (error.response.status === 500) {
        showToast("Server is currently down Contact your admin", "error");
      }
      console.log(error);
      handleClose();
      reload();
    } finally {
      setLoading(false);
    }
  };
  const reload = () => {
    setUserFormData({
      fullName: "",
      email: "",
    });
    setDepartments("");
    setRole("");
  };

  const handleUserFormDataChange = (e) => {
    const { id, value } = e.target;
    setUserFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const [open, setOpen] = React.useState(false);

  function handleOpen() {
    setOpen(!open);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <>
      {auth.refNum !== "ref?2!" && (
        <>
          <Button
            className="flex flex-row items-center text-blue-500 bg-blue-100"
            onClick={handleOpen}
            size="large"
            variant="outlined">
            <div className="px-6 text-sm">{t("employee")}</div>
            <MdOutlineAddToPhotos size={25} />
          </Button>
          <Drawer anchor={"right"} open={open} onClose={handleClose}>
            <div className="flex justify-center font-bold py-5 text-black">
              {t("addNewEmployee")}
            </div>
            <hr />
            <form className="w-96">
              <div className="px-10 py-8 space-y-6">
                <FormInputField
                  label={t("fullName")}
                  id="fullName"
                  name="fullName"
                  value={userFormData.fullName}
                  onChange={handleUserFormDataChange}
                  required
                />
                <FormInputField
                  label={t("emailAddress")}
                  id="email"
                  name="email"
                  type="email"
                  value={userFormData.email}
                  onChange={handleUserFormDataChange}
                  required
                />
                <CustomSelect
                  id="role"
                  label={t("role")}
                  value={role}
                  onChange={setRole}
                  options={[
                    { value: "General Manager", label: t("generalManager") },
                    { value: "Manager", label: t("manager") },
                    { value: "Junior Staff", label: t("staff") },
                  ]}
                  required
                  searchable={true}
                  group={false}
                />
                <CustomSelect
                  id="department"
                  label={t("department")}
                  value={departments}
                  onChange={setDepartments}
                  options={departmenttable.map((d) => ({
                    value: d.departmentId,
                    label: d.departmentName,
                  }))}
                  required
                  searchable={true}
                  group={false}
                />
              </div>

              <div className="px-10">
                <CustomButton
                  label="Submit"
                  onClick={handleSubmit}
                  type="submit"
                  className="custom-class"
                  loading={isLoading}
                />
              </div>
            </form>
          </Drawer>
        </>
      )}
    </>
  );
}

export function Departmentforms() {
  const { t } = useTranslation();
  const { triggerComponent } = useContext(Modaltrigger);
  const { auth } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        CREATE_DEPRATMENT,
        JSON.stringify({
          departmentName: name,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          withCredentials: true,
        }
      );
      showToast("Department Created Successfully", "success");
      handleClose();
      triggerComponent();
      reload();
    } catch (error) {
      if (error.response.status === 400) {
        showToast("Kindly check Input details", "error");
      } else if (error.response.status === 500) {
        showToast("Server is currently down Contact your admin", "error");
      }
      console.log(error);
      handleClose();
      reload();
    } finally {
      setLoading(false);
    }
  };

  const reload = () => {
    setName("");
  };

  function handleOpen() {
    setOpen(!open);
  }

  function handleClose() {
    setOpen(false);
  }
  return (
    <>
      <Button
        className="flex flex-row items-center text-blue-500 bg-blue-100"
        onClick={handleOpen}
        size="large"
        variant="outlined">
        <div className="px-6 text-sm">{t("department")}</div>
        <MdOutlineAddToPhotos size={25} />
      </Button>
      <Drawer anchor="right" open={open} onClose={handleClose}>
        <div className="flex justify-center font-bold py-5 text-black">
          {t("newDepartment")}
        </div>
        <hr />
        <form className="w-96">
          <div className="px-10 py-10">
            <FormInputField
              label={t("departmentName")}
              id="departmentName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="px-10">
            <CustomButton
              label="Submit"
              onClick={handleSubmit}
              type="submit"
              className="custom-class"
              loading={isLoading}
            />
          </div>
        </form>
      </Drawer>
    </>
  );
}
