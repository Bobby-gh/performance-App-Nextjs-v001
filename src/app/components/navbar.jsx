import React from "react";
import { IoNotifications } from "react-icons/io5";
import { LogOut } from "./modals";
import { AuthContext } from "../contex/context-context";

export function Navbar() {
  const {role} = React.useContext(AuthContext)
  return (
    <nav className="h-16 flex justify-between items-center card rounded-lg">
      <div className="flex flex-row items-center"><span className="text-sm font-bold">Welcome Back</span>{role}</div>
      <div className="flex items-center">
        <LogOut/>
        <IoNotifications className="ml-6"/>
      </div>
    </nav>
  );
}
