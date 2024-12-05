"use client";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contex/context-context";
import axios from "../axios";
import {
  CREATE_DEPRATMENT,
  DEPARTMENTS_URL,
  GOAL_ASSESSMENT_URL,
  EMPLOYEES_GOALS_URL,
  EMPLOYEES_URL,
  GENERAL_PERFORMANCE_CHART_URL,
  GOALS_URL,
  GOAL_COUNT_URL,
  GOAL_STATUS_COUNT,
  ORGANIZATIONAL_AVERAGE_PER_MONTH_CHART_URL,
  PERFORMANCE_MATRIX_CHART_URL,
  TOP_GOALS,
  UNACCESSED_GOALS_URL,
  MY_GOALS_URL,
} from "../routes";

/************************************************Get ROutes*************************************/

export function useGoalRouteData() {
  const { auth } = useContext(AuthContext);
  const [departmentgoal, setDepartmenttable] = useState([]);
  const departmentgoaltable = departmentgoal.map((departmentgoal) => ({
    ...departmentgoal,
    taskAssignedTo: departmentgoal.taskAssignedTo,
    dateAssigned: new Date(departmentgoal.dateAssigned).toLocaleDateString(),
    goalDeadline: new Date(departmentgoal.goalDeadline).toLocaleDateString(),
  }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(GOALS_URL, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          withCredentials: true,
        });
        console.log(response.data);
        setDepartmenttable(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [auth]);

  return { departmentgoaltable };
}

import axios from 'axios';
import { AuthContext } from './AuthContext'; // Update the import path as necessary

export function useMyGoalRouteData() {
  const { auth } = useContext(AuthContext);
  const [mygoals, setMygoal] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(MY_GOALS_URL, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          withCredentials: true,
        });
        console.log(response.data);
        setMygoal(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [auth]);

  const mygoal = mygoals.map((goal) => ({
    ...goal,
    taskAssignedTo: goal.taskAssignedTo,
    dateAssigned: new Date(goal.dateAssigned).toLocaleDateString(),
    goalDeadline: new Date(goal.goalDeadline).toLocaleDateString(),
  }));

  console.log({ "personal goals": mygoal });
  return { mygoal };
}


export function useUnassessedGoalRouteData() {
  const { auth } = useContext(AuthContext);
  const [departmentgoal, setDepartmenttable] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(UNACCESSED_GOALS_URL, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          withCredentials: true,
        });

        setDepartmenttable(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [auth]);

  return { departmentgoal };
}

export function useEmployeesRouteData() {
  const { auth } = useContext(AuthContext);
  const [employeetable, setEmployeetable] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching goal count data...");
        const response = await axios.get(EMPLOYEES_URL, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          withCredentials: true,
        });
        setEmployeetable(response.data.usersResponse);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [auth]);

  
  return { employeetable };
}

export function useDepartmentRouteData() {
  const { auth } = useContext(AuthContext);
  const [departmenttable, setDepartmenttable] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(DEPARTMENTS_URL, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          withCredentials: true,
        });
        setDepartmenttable(response.data.departments);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [auth]);

  return { departmenttable };
}

export function useTopGoalsRouteData() {
  const { auth } = useContext(AuthContext);
  const [topGoal, setTopGoal] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(TOP_GOALS, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          withCredentials: true,
        });
        setTopGoal(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    
    fetchData();
  }, [auth]);
  
  return { topGoal };
}

export function useGoalAccessmentRouteData() {
  const { auth } = useContext(AuthContext);
  const [goalAssessment, setGoalAssessment] = useState([]);

  const goalAssessmentData = goalAssessment.map((goal) => ({
    _id: goal._id,
    taskAssignedTo: goal.goalAssessed?.taskAssignedTo?.departmentName || "",
    goalTitle: goal.goalAssessed?.goalTitle || "",
    goalDeadline: goal.goalAssessed?.goalDeadline || "",
    performancePercent: goal.averageRating?.performancePercent || 0,
    rating: goal.rating?.toUpperCase() || "",
    comment: goal.comment || "",
  }));

  useEffect(() => {
    const fetchData = async () => {
      if (!auth?.token) {
        console.warn("Authorization token is missing.");
        return;
      }
      try {
        const response = await axios.get(GOAL_ASSESSMENT_URL, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          withCredentials: true,
        });
        setGoalAssessment(response.data);
      } catch (err) {
        console.error(
          "Error fetching goal assessments:",
          err.response || err.message || err
        );
      }
    };

    fetchData();
  }, [auth]);


  return { goalAssessmentData };
}

export function useGeneralPerformanceChartRouteData() {
  const { auth } = useContext(AuthContext);
  const [generalPerformance, setGeneralPerformance] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(GENERAL_PERFORMANCE_CHART_URL, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          withCredentials: true,
        });
        setGeneralPerformance(response.data.overallAverage);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [auth]);
  
  return { generalPerformance };
}

export function useOrganizationalAveragePerMonthChartRouteData() {
  const { auth } = useContext(AuthContext);
  const [organizationaldata, setOrganizationalChart] = useState([]);
  const organizationalChart = [
    { month: "0", average_performance: 0 },
    ...organizationaldata,
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          ORGANIZATIONAL_AVERAGE_PER_MONTH_CHART_URL,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth.token}`,
            },
            withCredentials: true,
          }
        );
        setOrganizationalChart(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [auth]);

  console.log({ "Average performance": organizationalChart });
  return { organizationalChart };
}
export function usePerformanceMatrixChartRouteData() {
  const { auth } = useContext(AuthContext);
  const [performanceMatrixChart, setPerformanceMatrixChart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(PERFORMANCE_MATRIX_CHART_URL, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          withCredentials: true,
        });
        setPerformanceMatrixChart(response.data.groupedAssessments);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [auth]);

  return { performanceMatrixChart };
}

export function useGoalStatus() {
  const { auth } = useContext(AuthContext);
  const [goalStatus, setGoalStatus] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(GOAL_STATUS_COUNT, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          withCredentials: true,
        });
        setGoalStatus(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [auth]);

  return { goalStatus };
}

export function useGoalCountRouteData() {
  const { auth } = useContext(AuthContext);
  const [goalCount, setGoalCount] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(GOAL_COUNT_URL, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          withCredentials: true,
        });
        setGoalCount(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [auth]);
  return { goalCount };
}

/************************************************Post ROutes*************************************/

export function useCreateDepartment() {
  const { auth } = useContext(AuthContext);

  const createDepartment = async (departmentName) => {
    console.log(departmentName);
    try {
      const response = await axios.post(
        CREATE_DEPRATMENT,
        JSON.stringify({
          departmentName,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          },
          withCredentials: true,
        }
      );
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  return { createDepartment };
}
