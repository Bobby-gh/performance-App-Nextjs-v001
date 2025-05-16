'use client'
import React, { useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { AuthContext } from "../contex/context-context";
import { useTranslation } from "react-i18next";
import { adminMenuItems, employeeMenuItems, managerMenuItems } from "./menuitems";


export function Sidebar() {
  const { t } = useTranslation();

  const currentPathname = usePathname()
  const {auth} = useContext(AuthContext)


  if (auth.refNum === "ref?1!" ) {
    menuItems = adminMenuItems;
  } else if (auth.refNum === "ref?2!") {
    menuItems = managerMenuItems;
  } else if (auth.refNum === "ref?3!") {
    menuItems = employeeMenuItems;
  } else {
    menuItems = []; // or some default menu
  }

  return (

    <main className="w-24 h-full bg-[#0b1558]  rounded-lg">
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
      <div className="flex flex-col items-center text-center">
        <ul className="w-full">
          {menuItems.map((item) => (
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
