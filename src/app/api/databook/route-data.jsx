import { AuthContext } from "@/app/contex/context-context";
import axios from "../axios";
import {
  DEPARTMENTS_URL,
  DEPARTMENT_GOALS_URL,
  DEPARTMENT_GOAL_ASSESSMENT_URL,
  EMPLOYEES_GOALS_URL,
  GENERAL_PERFORMANCE_CHART_URL,
  GOAL_COUNT_URL,
  ORGANIZATIONAL_CHART_URL,
} from "../routes";
import React from "react";


/************************************************Get ROutes*************************************/

export async function GetDepartmentGoalRouteData() {
  const fetchData = async () => {
    try {
      const response = await axios.get(DEPARTMENT_GOALS_URL, {
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

export async function GetEmployeesRouteData() {
  const fetchData = async () => {
    try {
      const response = await axios.get(EMPLOYEES_URL, {
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

export async function GetEmployeesGoalRouteData() {
  const fetchData = async () => {
    try {
      const response = await axios.get(EMPLOYEES_GOALS_URL, {
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

export async function GetDepartmentRouteData() {
  const fetchData = async () => {
    try {
      const response = await axios.get(DEPARTMENTS_URL, {
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

export async function GetGeneralPerformanceChartRouteData() {
  const fetchData = async () => {
    try {
      const response = await axios.get(GENERAL_PERFORMANCE_CHART_URL, {
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

export async function GetOrganizationalChartRouteData() {
  const fetchData = async () => {
    try {
      const response = await axios.get(ORGANIZATIONAL_CHART_URL, {
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

export async function GetGoalCountRouteData() {
  const { auth } = React.useContext(AuthContext);
  alert(auth);
  const fetchData = async () => {
    try {
      const response = await axios.get(GOAL_COUNT_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
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

/************************************************Post ROutes*************************************/
