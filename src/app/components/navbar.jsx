"use client";
import React from "react";
import { IoNotifications } from "react-icons/io5";
import { LogOut } from "./modals";
import { AuthContext } from "../contex/context-context";
import { useTranslation } from "react-i18next";
import { MdAccountCircle } from "react-icons/md";
import { CgMenuGridR } from "react-icons/cg";
import { InnerLanguageButton } from "../language/language_switcher";

export function Navbar() {
  const { t } = useTranslation();
  const { auth } = React.useContext(AuthContext);
  return (
    <nav className="flex justify-end items-center ">
      {/* <div className="flex flex-row items-center"><span className="text-lg font-bold">{t("welcomeBack")}</span ><span className="ml-2 text-lg font-bold text-blue-900">{auth.name}</span></div> */}
      <div className="flex cursor-pointer space-x-4 items-center">
        <LogOut />
        <div className="flex text-lg cursor-pointer">
          <InnerLanguageButton/>
        </div>
        <div className="flex text-lg cursor-pointer">
          <MdAccountCircle />
        </div>
        <div className="flex text-lg cursor-pointer">
          <CgMenuGridR />
        </div>
      </div>
    </nav>
  );
}
