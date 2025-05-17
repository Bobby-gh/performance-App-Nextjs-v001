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
import { CustomSelect, FormInputField } from "./widgets";

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
      triggerComponent();
      handleClose();
      reload();
    } catch (error) {
      alert(error);
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
          <div className="px-10 py-12">
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
              id="startDate"
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
              id="startDate"
              onChange={handleInputChange}
              value={formData.target}
            />
            <CustomSelect
              id="category"
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
              id="startDate"
              onChange={handleInputChange}
              value={formData.description}
            />
            <FormInputField
              label={t("endDate")}
              id="startDate"
              onChange={handleInputChange}
              value={formData.endDate}
            />
          </div>

          <div className="px-10">
            <button
              className="inline-block w-full rounded bg-[#000c8e] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-[#2a36b8] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading} // Disable the button while loading
            >
              {isLoading ? (
                <div className="flex flex-row justify-center">
                  <p className="text-sm pr-2">{t("loading")}</p>
                  <CircularProgress size={27} thickness={6} color="primary" />
                </div>
              ) : (
                t("submit")
              )}
            </button>
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
    const { name, value } = e.target;
    setAssessData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

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
      triggerComponent();
      handleClose();
      reload();
    } catch (error) {
      alert(error);
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
          <div className="flex flex-col px-10 py-8 space-y-4">
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
              label={t("goal")}
              value={assessData.workQuality}
              onChange={assessmentFormHandler}
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
              onChange={assessmentFormHandler}
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
              value={assessData.communication}
              onChange={assessmentFormHandler}
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
              onChange={assessmentFormHandler}
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
              onChange={assessmentFormHandler}
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
              onChange={assessmentFormHandler}
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
              onChange={assessmentFormHandler}
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
              onChange={assessmentFormHandler}
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
              onChange={assessmentFormHandler}
              options={[
                { value: "Below Expectations", label: t("belowExpectations") },
                { value: "Meets Expectations", label: t("meetsExpectations") },
                { value: "Exceeds Expectations", label: t("exceedsExpectations") },
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
            <button
              className="inline-block w-full rounded bg-[#000c8e] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-[#2a36b8] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading} // Disable the button while loading
            >
              {isLoading ? (
                <div className="flex flex-row justify-center">
                  <p className="text-sm pr-2">{t("loading")} </p>
                  <CircularProgress size={27} thickness={6} color="primary" />
                </div>
              ) : (
                t("submit")
              )}
            </button>
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
      triggerComponent();
      handleClose();
      reload();
    } catch (error) {
      alert(error);
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
    const { name, value } = e.target;
    setUserFormData((prevData) => ({
      ...prevData,
      [name]: value,
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
                <button
                  className="inline-block w-full rounded bg-[#000c8e] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-[#2a36b8] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex flex-row justify-center">
                      <p className="text-sm pr-2">{t("loading")}</p>
                      <CircularProgress size={27} thickness={6} color="primary" />
                    </div>
                  ) : (
                    t("submit")
                  )}
                </button>
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
      handleClose();
      triggerComponent();
      reload();
    } catch (error) {
      alert(error);
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
            <div className="relative mb-6" data-te-input-wrapper-init>
              <input
                type="text"
                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline-none transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                name="departmentName"
                value={name}
                autoComplete="off"
                onChange={(e) => setName(e.target.value)}
                required
                placeholder=" " // triggers the floating label
              />
              <label className="before:content-[' '] after:content-[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                {t("departmentName")}
              </label>
            </div>
          </div>

          <div className="px-10">
            <button
              className="inline-block w-full rounded bg-[#000c8e] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-[#2a36b8] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-[#2a36b8] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-[#1f2d8c] active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex flex-row justify-center items-center">
                  <p className="text-sm pr-2">{t("loading")}</p>
                  <CircularProgress size={20} thickness={6} color="primary" />
                </div>
              ) : (
                t("submit")
              )}
            </button>
          </div>
        </form>
      </Drawer>
    </>
  );
}
