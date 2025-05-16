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

  return (
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
  );
}
