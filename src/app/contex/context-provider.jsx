'use client'
import { useEffect, useState } from "react";
import { AuthContext } from "./context-context";
import Cookies from 'js-cookie';



export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        name: "",
        token: "",
        email: "",
        password: "",
    });

    console.log(auth)
    useEffect(() => {
      const savedEmail = Cookies.get('email');
      const savedToken = Cookies.get('token');
      const savedName = Cookies.get('name');
      if (savedEmail || savedToken) {
        setAuth({
          email: savedEmail ? JSON.parse(savedEmail) : null,
          token: savedToken ? JSON.parse(savedToken) : null,
          name: savedName ? JSON.parse(savedName) : null,
        });
      }
    }, []);
    const clearAuth = () => {
      setAuth({
        name: "",
        token: "",
        email: "",
        password: "",
      });
    };
  
    return (
      <AuthContext.Provider value={{ auth, setAuth, clearAuth }}>
        {children}
      </AuthContext.Provider>
    );
  };