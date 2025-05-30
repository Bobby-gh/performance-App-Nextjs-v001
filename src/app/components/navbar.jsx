"use client"
import React from "react";
import { IoNotifications } from "react-icons/io5";
import { LogOut } from "./modals";
import { AuthContext } from "../contex/context-context";
import { useTranslation } from "react-i18next";
import { MdAccountCircle } from "react-icons/md";
import { CgMenuGridR } from "react-icons/cg";


export function Navbar() {
  const { t } = useTranslation();
  const {auth} = React.useContext(AuthContext)
  return (
     <nav className="flex justify-between">
      <div className="flex flex-row items-center"><span className="text-lg font-bold">{t("welcomeBack")}</span ><span className="ml-2 text-lg font-bold text-blue-900">{auth.name}</span></div>
      <div className="flex cursor-pointer space-x-4 item-center">
        <LogOut/>
        <div className="flex text-2xl cursor-pointer">
          <MdAccountCircle/>
        </div>
        <div className="flex text-2xl cursor-pointer">
          <CgMenuGridR/>
        </div>
      </div>
    </nav>
  );
}
