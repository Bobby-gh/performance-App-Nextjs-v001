"use client";
import * as React from "react";
import { useState} from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { AuthContext } from "../contex/context-context";
import { LOGIN_URL } from "../api/routes";
import axios from "../api/axios";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter()
  const [isLoading, setLoading] = useState(false);
  const { auth, setAuth } = React.useContext(AuthContext);
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({
          email: userDetails.email,
          password: userDetails.password,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response.request.status === 200) {
        setAuth({
          token: response.data.token,
        });
      }
    } catch (err) {
      alert(err)
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
              onChange={(e) => setUserDetails(prevDetails => ({
                ...prevDetails,
                email: e.target.value
              }))}
              className="border border-blue-500 rounded-lg p-4 my-2"
            />
          </div>
          <div className="flex flex-col">
            <label>Password</label>
            <input
              placeholder="Enter password"
              autoComplete="off"
              type="password"
              value={userDetails.password}
              onChange={(e) => setUserDetails(prevDetails => ({
                ...prevDetails,
                password: e.target.value
              }))}
              className="border border-blue-500 rounded-lg p-4 my-2"></input>
          </div>
          <div className="flex justify-center p-4 text-white rounded-lg mt-8 bg-slate-500" onClick={handleSubmit}>
            <button type="submit"  disabled={isLoading} className="px-16">
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
        {auth.token && router.push('/home', { scroll: false })}
      </div>
    </main>
  );
}
