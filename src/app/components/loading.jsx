'use client';
import { Backdrop, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";

export const LoadingPopup = () => {
  const [isLoading, setLoading] = useState(true);
  try {
    useEffect(() => {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }, []);
  } catch (err) {
    console.log(err);
  }

  return (
    <Backdrop open={isLoading} style={{ zIndex: 9999, color: "#fff" }}>
      <CircularProgress />
    </Backdrop>
  );
};


export function LoadingPage () {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {/* Loading Container */}
      <div className="flex flex-col items-center space-y-5">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        {/* Loading Text */}
        <p className="text-lg font-medium text-gray-700 animate-pulse">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};

