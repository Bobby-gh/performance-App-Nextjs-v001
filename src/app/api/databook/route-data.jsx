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
  ORGANIZATIONAL_AVERAGE_PER_MONTH_CHART_URL ,
  PERFORMANCE_MATRIX_CHART_URL,
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
        console.log(response.data)
        setDepartmenttable(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [auth]);
  console.log({'number of goals resposne': departmentgoal})
  console.log({"number of goal": departmentgoaltable})
  return { departmentgoaltable};
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
        setEmployeetable(response.data.users);
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
  
  return { departmenttable};
}

export function useGoalAccessmentRouteData() {
  const { auth } = useContext(AuthContext);
  const [goalAssessment, setGoalAssessment] = useState([]);
  const goalAssessmentData = goalAssessment.map((goalAssessment) => ({
    _id: data._id,
    taskAssignedTo: goalAssessment.goalAssessed.taskAssignedTo.departmentName,
    goalTitle: goalAssessment.goalAssessed.goalTitle,
    goalDeadline: goalAssessment.goalAssessed.goalDeadline,
    performancePercent: goalAssessment.averageRating.performancePercent,
    rating: goalAssessment.rating.toUpperCase(),
  }));

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
        setGoalAssessment(response);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [auth]);
  console.log({"goal accessed": goalAssessment})
  return { goalAssessmentData};
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
  console.log({'General performance': generalPerformance})
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
        const response = await axios.get(ORGANIZATIONAL_AVERAGE_PER_MONTH_CHART_URL  , {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          withCredentials: true,
        });
        setOrganizationalChart(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [auth]);
  
  console.log({'Average performance': organizationalChart})
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
  return { goalCount};
}

/************************************************Post ROutes*************************************/

export function useCreateDepartment() {
  const { auth } = useContext(AuthContext);

    const createDepartment = async (departmentName) => {
      console.log(departmentName)
      try {
        const response = await axios.post(
          CREATE_DEPRATMENT,
          JSON.stringify({
            departmentName
          }),
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + auth.token,
            },
            withCredentials: true,
          }
        );
        return response
      } catch (err) {
        console.log(err);
      }
    };

  return { createDepartment};
}