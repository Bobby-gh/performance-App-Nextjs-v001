import React from "react";
import { Sidebar } from "../components/sidebar";
import { Navbar } from "../components/navbar";

export default function Layout({ children }) {
  return (
    
      <main className="flex bg-slate-100 h-screen overflow-hidden">
        <div className="border border-2 border-r-slate-400 ">
          <Sidebar />
        </div>
        <div className="flex-1 scroll-smooth overflow-auto">
          <div className="border border-2 border-b-slate-400 ">
            <Navbar />
          </div>
          {children}
        </div>
      </main>
    
  );
}
