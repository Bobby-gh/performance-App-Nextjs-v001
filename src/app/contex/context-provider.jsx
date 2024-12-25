"use client";
import { useEffect, useState } from "react";
import { AuthContext, GoalSelectContext } from "./context-context";
import Cookies from "js-cookie";

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    name: "",
    token: "",
    email: "",
    refNum: "",
  });
  console.log({"auth": auth})

  useEffect(() => {
    const savedEmail = Cookies.get("email");
    const savedToken = Cookies.get("token");
    const savedName = Cookies.get("name");
    const savedRef = Cookies.get("refNum");
    if (savedEmail || savedToken) {
      setAuth({
        email: savedEmail ? savedEmail : null,
        token: savedToken ? savedToken : null,
        name: savedName ? savedName : null,
        refNum: savedRef ? savedRef : null,
      });
    }
  }, []);
  const clearAuth = () => {
    setAuth({
      name: "",
      token: "",
      email: "",
      refNum: "",
    });
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, clearAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const GoalProvider = ({children}) => {
  const [goal, setGoal] = useState("")

return(
  <GoalSelectContext.Provider value={{goal, setGoal}}>
    {children}
  </GoalSelectContext.Provider>
)
}


export const ModaltriggerProvider =({children}) => {
  const [trigger, setTrigger] = useState(false)

  const triggerComponent = () => {
    setTrigger(true);
  };

  const resettriggerComponent = () => {
    setTrigger(false);
  };


  return (
    <Modaltrigger.Provider value={{ trigger, triggerComponent, resettriggerComponent }}>
      {children}
    </Modaltrigger.Provider>
  );
}