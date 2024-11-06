"use client";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contex/context-context";
import axios from "../axios";
import {
  CREATE_DEPRATMENT,
  DEPARTMENTS_URL,
  DEPARTMENT_GOAL_ASSESSMENT_URL,
  EMPLOYEES_GOALS_URL,
  EMPLOYEES_URL,
  GENERAL_PERFORMANCE_CHART_URL,
  GOALS_URL,
  GOAL_COUNT_URL,
  ORGANIZATIONAL_CHART_URL,
  PERFORMANCE_MATRIX_CHART_URL,
} from "../routes";

/************************************************Get ROutes*************************************/

export function useGoalRouteData() {
  const { auth } = useContext(AuthContext);
  const [departmentgoal, setDepartmenttable] = useState([]);
  const departmentgoaltable = departmentgoal.map((departmentgoal) => ({
    ...departmentgoal,
    taskAssignedTo: departmentgoal.taskAssignedTo.departmentName,
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
        setDepartmenttable(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [auth]);

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

export function useDepartmentGoalAccessmentRouteData() {
  const { auth } = useContext(AuthContext);
  const [departassessment, setDepartAssessment] = useState([]);
  const departassessmenttable = departassessment.map((departassessment) => ({
    _id: data._id,
    taskAssignedTo: departassessment.goalAssessed.taskAssignedTo.departmentName,
    goalTitle: departassessment.goalAssessed.goalTitle,
    goalDeadline: departassessment.goalAssessed.goalDeadline,
    performancePercent: departassessment.averageRating.performancePercent,
    rating: departassessment.rating.toUpperCase(),
  }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(DEPARTMENT_GOAL_ASSESSMENT_URL, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          withCredentials: true,
        });
        setDepartAssessment(response.data.assessments);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [auth]);

  return { departassessmenttable};
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

export function useOrganizationalChartRouteData() {
  const { auth } = useContext(AuthContext);
  const [organizationaldata, setOrganizationalChart] = useState([]);
  const organizationalChart = [
    { month: "0", average_performance: 0 },
    ...organizationaldata,
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(ORGANIZATIONAL_CHART_URL, {
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
        setGoalCount(response.data.goalRatings);
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