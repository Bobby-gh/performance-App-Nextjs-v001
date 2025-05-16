"use client";
import React from "react";
import { Sidebar } from "../components/sidebar";
import { ToastProvider } from "../components/notification";
import { Navbar } from "../components/navbar";
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
