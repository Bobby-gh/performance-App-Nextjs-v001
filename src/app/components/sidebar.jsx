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

    <main className="w-24 h-full bg-[#91a0fd]  rounded-lg">
      {/* Logo */}
      <div className="flex justify-center p-2 mb-4">
        {/* Logo image */}
        <img
          src="https://afriquetek.com/wp-content/uploads/2023/07/afriquetek-logo-1.png"
          alt="Paris"
          className="w-16 h-auto"
        />
      </div>

      {/* Menu Items */}
      <div className="flex flex-col items-center">
        <ul className="w-full">
          {filteredMenuItems.map((item) => (
            <li key={item.title} className="flex flex-col items-center mb-2">
              <a
                href={item.path}
                className="flex flex-col items-center w-full p-1 rounded-lg">
                {/* Icon with hover and focus effects */}
                <div
                  className={classNames(
                    "text-lg p-2 text-white rounded-lg transition-colors duration-200",
                    {
                      "bg-[#08397e] text-white": currentPathname === item.path, // Focused state
                      "hover:bg-[#08397e] hover:text-white": currentPathname !== item.path, // Hover effect only on the icon
                    }
                  )}>
                  {item.icon}
                </div>

                {/* Title (beneath icon, unaffected by focus or hover) */}
                <span className="text-xs mt-1 text-white ">{t(item.title)}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
