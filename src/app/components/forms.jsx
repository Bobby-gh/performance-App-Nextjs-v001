"use client";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

export function LoginForm() {
  const [isLoading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: "",
    passowrd: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    
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
        <div className="flex flex-col">
          <label>Email</label>
          <input
            type="email"
            value={userDetails.email}
            onChange={(e) => setUserDetails.email(e.target.value)}
            className="border border-blue-500 rounded-lg p-4 my-2"
          />
        </div>
        <div className="flex flex-col">
          <label>Password</label>
          <input
            type="password"
            value={userDetails.passowrd}
            onChange={(e) => setUserDetails.passowrd(e.target.value)}
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
      </div>
    </main>
  );
}

