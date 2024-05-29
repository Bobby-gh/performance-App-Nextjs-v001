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
  
    return (
      <AuthContext.Provider value={{ auth, setAuth }}>
        {children}
      </AuthContext.Provider>
    );
  };