"use client";
import { useState, useEffect, useContext } from "react";
import { AuthContext, Modaltrigger } from "../../contex/context-context";
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
  GOAL_CATEGORY_COUNT,
  GOAL_BADGES,
  GET_CATEGORY_ACHIEVED,
  ACTION_ITEMS,
  USER_RATING,
  USER_RATING_BY_ID,
  USER_BADGES_TABLE,
} from "../routes";

/************************************************Get ROutes*************************************/

export function useGoalRouteData() {
  const { auth } = useContext(AuthContext);
  const [departmentgoaltable, setDepartmenttable] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(GOALS_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        withCredentials: true,
      });
      setDepartmenttable(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [auth]);

  return { departmentgoaltable, fetchData };
}

export function useMyGoalRouteData() {
  const { auth } = useContext(AuthContext);
  const [mygoals, setMygoal] = useState([]);

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

  useEffect(() => {
    fetchData();
  }, [auth]);

  const mygoal = mygoals.map((goal) => ({
    ...goal,
    goalDeadline: new Date(goal.goalDeadline).toLocaleDateString(),
  }));

  console.log({ "personal goals": mygoal });

  return { mygoal, fetchData };
}
export function useMyGoalBadgesData() {
  const { auth } = useContext(AuthContext);
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(GOAL_BADGES, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          withCredentials: true,
        });
        setBadges(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [auth]);

  console.log({ "badges goals": badges });
  return { badges };
}

export function useAchievedGoalsData() {
  const { auth } = useContext(AuthContext);
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(GET_CATEGORY_ACHIEVED, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          withCredentials: true,
        });
        setTrends(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [auth]);

  return { trends };
}

export function useUnassessedGoalRouteData() {
  const { auth } = useContext(AuthContext);
  const [unaccessedgoal, setUnaccessedGoal] = useState([]);

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

        setUnaccessedGoal(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [auth]);

  return { unaccessedgoal };
}

export function useEmployeesRouteData() {
  const { auth } = useContext(AuthContext);
  const [employeetable, setEmployeetable] = useState([]);
  const { trigger, resettriggerComponent } = useContext(Modaltrigger);

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

  useEffect(() => {
    fetchData();
  }, [auth]);

  useEffect(() => {
    if (trigger) {
      console.log("Trigger is active, fetching data...");
      fetchData();
      resettriggerComponent();
    }
  }, [trigger]);

  return { employeetable };
}

export function useDepartmentRouteData() {
  const { auth } = useContext(AuthContext);
  const [departmenttable, setDepartmenttable] = useState([]);
  const { trigger, resettriggerComponent } = useContext(Modaltrigger);

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

  useEffect(() => {
    fetchData();
  }, [auth]);

  useEffect(() => {
    if (trigger) {
      console.log("Trigger is active, fetching data...");
      fetchData();
      resettriggerComponent();
    }
  }, [trigger]);

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
  const { trigger, resettriggerComponent } = useContext(Modaltrigger);

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

  useEffect(() => {
    fetchData();
  }, [auth]);

  useEffect(() => {
    if (trigger) {
      console.log("Trigger is active, fetching data...");
      fetchData();
      resettriggerComponent();
    }
  }, [trigger]);

  return { goalAssessment };
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
  const organizationalChart = [...organizationaldata];

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

export function useGoalCategoryCountRouteData() {
  const { auth } = useContext(AuthContext);
  const [goalCateoryCount, setGoalCount] = useState({
    Human: "",
    Financial: "",
    Customer: "",
    Inovation: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(GOAL_CATEGORY_COUNT, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          withCredentials: true,
        });
        const value = response.data;
        const customerValue = value.find((item) => item.Customer);
        const HumanValue = value.find((item) => item.Human);
        const financialValue = value.find((item) => item.financial);
        const inovationValue = value.find((item) => item.Innovation);
        setGoalCount({
          Human: HumanValue,
          Financial: financialValue,
          Customer: customerValue,
          Inovation: inovationValue,
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [auth]);
  return { goalCateoryCount };
}

export function useGetActionItems() {
  const { auth } = useContext(AuthContext);
  const [actionItem, setActionItem] = useState([]);
  const token = auth.token?.trim();

  const getActionItems = async () => {
    try {
      const response = await axios.get(ACTION_ITEMS, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        withCredentials: true,
      });

      console.log("Main Goal respomce", response.data);

      if (Array.isArray(response.data)) {
        response.data.forEach((item, i) => {
          console.log(`Item ${i}:`, {
            label: item.label,
            value: item.value,
            mainTarget: item.mainTarget,
            remainingTarget: item.remainingTarget,
          });
        });
      }

      setActionItem(response.data);
    } catch (error) {
      console.error("Failed to fetch action items:", error);
    }
  };

  useEffect(() => {
    getActionItems();
  }, [auth]);

  return { actionItem };
}



export function useUserGoalRatingByID() {
  const { auth } = useContext(AuthContext);

  const getUserRatingById = async (userId) => {
    try {
      const response = await axios.get(
        `${USER_RATING_BY_ID}/${userId}`,
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

  return { getUserRatingById };

}



export function useUserGoalBadgesTableData() {
  const { auth } = useContext(AuthContext);
  const [getallUserBadges, setUserBadgesTable] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(USER_BADGES_TABLE, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        withCredentials: true,
      });
      setUserBadgesTable(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [auth]);

  return { getallUserBadges, fetchData };
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


export function useUserRating() {
  const { auth } = useContext(AuthContext);

  const createUserRating = async (userId,rating) => {
    try {
      const response = await axios.patch(
        USER_RATING,
        JSON.stringify({
          userId,
          rating
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

  return { createUserRating };

}


/****************Delete Routes*************** */

export function useDelete() {
  const { auth } = useContext(AuthContext);
  const routeToUrl = {
    goal: GOALS_URL,
    accessGoal: GOAL_ASSESSMENT_URL,
    department: DEPARTMENTS_URL,
    user: EMPLOYEES_URL,
  };

  const deleteFunction = async (id, routeName) => {
    const endpoint = routeToUrl[routeName];
    if (!endpoint) throw new Error(`Invalid routeName: ${routeName}`);

    const response = await axios.delete(`${endpoint}/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth.token,
      },
      withCredentials: true,
    });

    return response;
  };

  return { deleteFunction };
}

/****************Patch Routes*************** */

export function useEdit() {
  const { auth } = useContext(AuthContext);

  const routeToUrl = {
    goal: GOALS_URL,
    accessGoal: GOAL_ASSESSMENT_URL,
    user: EMPLOYEES_URL,
  };

  const editFunction = async (updateData, id, routeName) => {
    const endpoint = routeToUrl[routeName];

    if (!endpoint) throw new Error(`Invalid routeName: ${routeName}`);

    const response = await axios.patch(
      `${endpoint}/${id}`,
      JSON.stringify({ updateData }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        withCredentials: true,
      }
    );

    return response;
  };

  return { editFunction };
}
