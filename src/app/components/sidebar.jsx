'use client'
import React, { useContext } from "react";
import { MenuItems } from "./menuitems";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { AuthContext } from "../contex/context-context";
import { useTranslation } from "react-i18next";


export function Sidebar() {
  const { t } = useTranslation();

  const currentPathname = usePathname()
  const {auth} = useContext(AuthContext)
  console.log({"refnum": auth.refNum})

   const filteredMenuItems = MenuItems.filter((item) => {
    if (auth.refNum === "ref?1!" || auth.role === "ref?1!") {
      return !["/home/goals"].includes(item.path);
    }
    if (auth.refNum === "ref?2!") {
      return !["/home/department"].includes(item.path);
    }
    if (auth.refNum === "ref?3!") {
      return !["/home/department", "/home/employees", "/home/goal-setting", "/home/goal-assessment"].includes(item.path);
    }
    return ![""].includes(item.path);
  });

  return (
   
    <main className="w-32 sm:w-72 ">
      <div className="hidden sm:block lg:flex sm:justify-center sm:p-8">
        <img
          src="https://afriquetek.com/wp-content/uploads/2023/07/afriquetek-logo-1.png"
          alt="Paris"
          className="w-55 h-20"
        />
      </div>
      <div>
        <div className="flex flex-col justify-center p-6">
          <ul>
            {filteredMenuItems.map((item) => (
              <li
                key={item.title}>
                <Link href={item.path} className={classNames({
                  "flex items-center text-md p-4 m-2 hover:bg-blue-900 hover:text-white rounded-lg": true,
                  "bg-blue-900 rounded-lg text-white": currentPathname === item.path
                })}>
                  {item.icon} <span className="ml-2 hidden transition duration-300 ease-out sm:block">{t(item.title)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
