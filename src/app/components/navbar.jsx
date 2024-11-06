import React from "react";
import { IoNotifications } from "react-icons/io5";
import { LogOut } from "./modals";

export function Navbar() {
  return (
    <nav className="h-16 flex justify-end items-center card rounded-lg">
      <div className="flex items-center">
        <LogOut/>
        <IoNotifications className="ml-6"/>
      </div>
    </nav>
  );
}
