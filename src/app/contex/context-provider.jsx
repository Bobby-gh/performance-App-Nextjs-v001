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
          email: savedEmail ? savedEmail : null,
          token: savedToken ? savedToken : null,
          name: savedName ? savedName : null,
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