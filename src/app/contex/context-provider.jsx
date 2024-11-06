'use client'
import { useEffect, useState } from "react";
import { AuthContext } from "./context-context";
import Cookies from 'js-cookie';



export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        role: "",
        token: "",
        email: "",
        password: "",
    });

    console.log(auth)
    useEffect(() => {
      const savedEmail = Cookies.get('email');
      const savedToken = Cookies.get('token');
      if (savedEmail || savedToken) {
        setAuth({
          email: savedEmail ? JSON.stringify(savedEmail) : null,
          token: savedToken ? JSON.stringify(savedToken) : null,
        });
      }
    }, []);
    console.log(token)
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