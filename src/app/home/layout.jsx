'use client'
import { useContext, useEffect, useState } from "react";
import React from "react";
import { Sidebar } from "../components/sidebar";
import { Navbar } from "../components/navbar";
import { AuthContext } from "../contex/context-context";
import NotAuthorized from "../page-not-authorized/page";
import SystemDown from "../system-down/page";
import { LoadingPage } from "../components/loading";
import { ToastProvider } from "../components/notification";

export default function Layout({ children }) {
  const [validated, setValidated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [systemDown, setSystemDown] = useState(false);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    try {
      if (!auth) {
        setValidated(true);
      } else {
        setValidated(false);
      }
    } catch (err) {
      if (err.response?.status === 500 || err.response?.status === 400) {
        setSystemDown(true);
      }
      console.error("Validation failed:", err.response || err.message || err);
    } finally {
      setIsCheckingAuth(false);
    }
  }, []);

  if (isCheckingAuth) {
    return <LoadingPage />;
  }

  return (
    <div>
      <div>
        {validated ? (
          <main className="flex h-screen bg-[#EFF1F9] p-4">
            <ToastProvider />
            <div>
              <Sidebar />
            </div>
            <div className="flex-1 overflow-auto px-4 space-y-4">
              <div>
                <Navbar />
              </div>
              <div>{children}</div>
            </div>
          </main>
        ) : systemDown ? (
          <SystemDown />
        ) : (
          <NotAuthorized />
        )}
      </div>
    </div>
  );
}
