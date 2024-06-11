'use client'
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contex/context-context";
import axios from "../axios";
import {
  DEPARTMENTS_URL,
  DEPARTMENT_GOALS_URL,
  DEPARTMENT_GOAL_ASSESSMENT_URL,
  EMPLOYEES_GOALS_URL,
  EMPLOYEES_URL,
  GENERAL_PERFORMANCE_CHART_URL,
  GOAL_COUNT_URL,
  ORGANIZATIONAL_CHART_URL,
  PERFORMANCE_MATRIX_CHART_URL,
} from "../routes";





/************************************************Get ROutes*************************************/

export function useDepartmentGoalRouteData() {
  const { auth } = useContext(AuthContext);
  const [departmentgoal, setDepartmenttable] = useState([]);
  const [error, setError] = useState(null);
  const departmentgoaltable = departmentgoal.map((departmentgoal) => ({
    ...departmentgoal,
    taskAssignedTo: departmentgoal.taskAssignedTo.departmentName,
    dateAssigned: new Date(departmentgoal.dateAssigned).toLocaleDateString(),
    goalDeadline: new Date(departmentgoal.goalDeadline).toLocaleDateString(),
  }));
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching goal count data...');
        const response = await axios.get(DEPARTMENT_GOALS_URL, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          withCredentials: true,
        });
        setDepartmenttable(response.data);
      } catch (err) {
        setError(err);
      }
    };
  
    fetchData();
  }, [auth]);
  
  return { departmentgoaltable, error };
  }

export function useEmployeesRouteData() {
const { auth } = useContext(AuthContext);
const [employeetable, setEmployeetable] = useState([]);
const [error, setError] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      console.log('Fetching goal count data...');
      const response = await axios.get(EMPLOYEES_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        withCredentials: true,
      });
      console.log(response)
      setEmployeetable(response.data.users);
    } catch (err) {
      console.log(err);
    }
  };

  fetchData();
}, [auth]);

return { employeetable, error };
};

export function useEmployeesGoalRouteData() {
const { auth } = useContext(AuthContext);
const [employeetable, setEmployeetable] = useState([]);
const [error, setError] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      console.log('Fetching goal count data...');
      const response = await axios.get(EMPLOYEES_GOALS_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        withCredentials: true,
      });
      setEmployeetable(response.data.users);
    } catch (err) {
      setError(err);
    }
  };

  fetchData();
}, [auth]);

return { employeetable, error };
};

export function useDepartmentRouteData() {
const { auth } = useContext(AuthContext);
const [departmenttable, setDepartmenttable] = useState([]);
const [error, setError] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      console.log('Fetching goal count data...');
      const response = await axios.get(DEPARTMENTS_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        withCredentials: true,
      });
      console.log(response)
      setDepartmenttable(response.data.departments);
    } catch (err) {
      setError(err);
    }
  };

  fetchData();
}, [auth]);

return { departmenttable, error };
}

export async function GetDepartmentGoalAccessmentRouteData() {
  const fetchData = async () => {
    try {
      const response = await axios.get(DEPARTMENT_GOAL_ASSESSMENT_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  try {
    const data = await fetchData();
    return data;
  } catch (error) {
    console.error("Error in trying function:", error);
  }
}

export function useGeneralPerformanceChartRouteData() {
  const { auth } = useContext(AuthContext);
  const [generalPerformance, setGeneralPerformance] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching goal count data...');
        const response = await axios.get(GENERAL_PERFORMANCE_CHART_URL, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          withCredentials: true,
        });
        setGeneralPerformance(response.data.overallAverage);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, [auth]);

  return { generalPerformance, error };
};

export function useOrganizationalChartRouteData() {
  const { auth } = useContext(AuthContext);
  const [organizationalChart, setOrganizationalChart] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching goal count data...');
        const response = await axios.get(ORGANIZATIONAL_CHART_URL, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          withCredentials: true,
        });
        setOrganizationalChart(response.data.departmentAverages);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, [auth]);

  return { organizationalChart, error };
};
export function usePerformanceMatrixChartRouteData() {
  const { auth } = useContext(AuthContext);
  const [performanceMatrixChart, setPerformanceMatrixChart] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching goal count data...');
        const response = await axios.get(PERFORMANCE_MATRIX_CHART_URL, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          withCredentials: true,
        });
        setPerformanceMatrixChart(response.data.groupedAssessments);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, [auth]);

  return { performanceMatrixChart, error };
};

export function useGoalCountRouteData(){
  const { auth } = useContext(AuthContext);
  const [goalCount, setGoalCount] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching goal count data...');
        const response = await axios.get(GOAL_COUNT_URL, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          withCredentials: true,
        });
        setGoalCount(response.data.goalRatings);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, [auth]);

  return { goalCount, error };
};


/************************************************Post ROutes*************************************/
