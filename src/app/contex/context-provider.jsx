'use client'
import { useState } from "react";
import { AuthContext } from "./context-context";


export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        role: "",
        token: "",
        email: "",
        password: "",
    });

    const clearAuth = () => {
      setAuth({
        token: "",
        role: "",
        departmentID: "",
      });
    };
  
    return (
      <AuthContext.Provider value={{ auth, setAuth, clearAuth }}>
        {children}
      </AuthContext.Provider>
    );
  };