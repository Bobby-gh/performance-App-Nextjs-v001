"use client";
import * as React from "react";
import { useState, useContext } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { AuthContext } from "../contex/context-context";
import { LOGIN_URL } from "../api/routes";
import axios from "../api/axios";

export function LoginForm() {
  const [isLoading, setLoading] = useState(false);
  const { auth, setAuth } = React.useContext(AuthContext);
  const [userDetails, setUserDetails] = useState({
    email: "",
    passowrd: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.request.status === 200) {
        setAuth({
          token: response.data.response.token,
          role: response.data.response.userRole,
        });

        if (token && role) {
          navigate("/dashboard", { replace: true });
        } else {
          alert("LogIn Unsuccessful");
        }
      }
    } catch (err) {
      if (err.message.includes("Network Error")) {
        alert("Network Error");
      } else if (err.request.status === 401) {
        alert(err.request.status);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-96">
      <div>
        <div className="flex justify-center p-8">
          <img
            src="https://afriquetek.com/wp-content/uploads/2023/07/afriquetek-logo-1.png"
            alt="Paris"
            className="w-55 h-20"
          />
        </div>
        <form autoComplete="off">
          <div className="flex flex-col">
            <label>Email</label>
            <input
              placeholder="Type email here"
              autoComplete="off"
              type="email"
              value={userDetails.email}
              onChange={(e) => setUserDetails({ email: e.target.value })}
              className="border border-blue-500 rounded-lg p-4 my-2"
            />
          </div>
          <div className="flex flex-col">
            <label>Password</label>
            <input
              placeholder="Enter password"
              autoComplete="off"
              type="password"
              value={userDetails.passowrd}
              onChange={(e) => setUserDetails({ password: e.target.value })}
              className="border border-blue-500 rounded-lg p-4 my-2"></input>
          </div>
          <div className="flex justify-center p-4 text-white rounded-lg mt-8 bg-blue-950">
            <button type="submit" onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? (
                <div className="flex flex-row justify-center">
                  <p className="text-sm pr-2">Loading</p>
                  <CircularProgress size={27} thickness={6} color="primary" />
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
