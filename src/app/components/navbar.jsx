"use client"
import React from "react";
import { IoNotifications } from "react-icons/io5";
import { LogOut } from "./modals";
import { AuthContext } from "../contex/context-context";
import { useTranslation } from "react-i18next";


export function Navbar() {
  const { t } = useTranslation();
  const {auth} = React.useContext(AuthContext)
  console.log({"navbar auth": auth})
  return (
    <nav className="h-16 flex justify-between items-center card rounded-lg p-4">
      <div className="flex flex-row items-center"><span className="text-lg font-bold">{t("welcomeBack")}</span ><span className="ml-2 text-lg font-bold text-blue-900">{auth.name}</span></div>
      <div className="flex items-center">
        <LogOut/>
        <IoNotifications className="ml-6"/>
      </div>
    </nav>
  );
}
