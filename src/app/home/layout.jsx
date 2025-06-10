"use client";
import { useContext, useEffect, useState } from "react";
import React from "react";
import { Sidebar } from "../components/sidebar";
import { Navbar } from "../components/navbar";
import { AuthContext } from "../contex/context-context";
import { LoadingPage } from "../components/loading";
import { ToastProvider } from "../components/notification";
import SystemDown from "../system-down/page";
import NotAuthorized from "../page-not-authorized/page";
import Cookies from "js-cookie";

export default function Layout({ children }) {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [validated, setValidated] = useState(false)
  const { setAuth } = useContext(AuthContext);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setAuth((prev) => ({
        ...prev,
        token: token,
      }));
    }
    setValidated(true)
    setIsCheckingAuth(false);
  }, []);

  if (isCheckingAuth) {
    return <LoadingPage />;
  }

  return (
    <div>
      {validated ? (
        <main className="flex h-screen bg-[#d9e0fd] p-4">
          <ToastProvider />
          <div>
            <Sidebar />
          </div>
          <div className="flex-1 overflow-auto p-4 bg-white rounded-lg space-y-4">
            <div>
              <Navbar />
            </div>
            <div>{children}</div>
          </div>
        </main>
      ) : (
        <NotAuthorized />
      )}
    </div>
  );
}
