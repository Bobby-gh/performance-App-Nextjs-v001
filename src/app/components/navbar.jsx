import React from "react";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { IoNotifications } from "react-icons/io5";

export function Navbar() {
  return (
    <nav className="h-16 flex justify-end items-center card rounded-lg">
      <div className="flex items-center">
        <button className="flex items-center">
          <RiLogoutCircleRLine />
          <span className="ml-2">sign out</span>
        </button>
        <IoNotifications className="ml-6"/>
      </div>
    </nav>
  );
}
