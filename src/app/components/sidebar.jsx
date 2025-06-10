'use client'
import React, { useContext } from "react";
import { MenuItems } from "./menuitems";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { AuthContext } from "../contex/context-context";
import { useTranslation } from "react-i18next";
import Link from "next/link";


export function Sidebar() {
  const { t } = useTranslation();
  const currentPathname = usePathname().replace(/\/+$/, "");
  const {auth} = useContext(AuthContext)



   const filteredMenuItems = MenuItems.filter((item) => {
    if (auth.refNum === "ref?1!") {
      return !["/home/goals"].includes(item.path);
    }
    if (auth.refNum === "ref?2!") {
      return !["/home/department"].includes(item.path);
    }
    if (auth.refNum === "ref3!") {
      return !["/home/department", "/home/employees", "/home/goal-setting", "/home/goal-assessment"].includes(item.path);
    }
    return ![""].includes(item.path);
  });

  return (
    // <main className="w-24 h-full bg-[#0b1558]  rounded-lg">
    //   {/* Logo */}
    //   <div className="flex justify-center p-2 mb-1">
    //     {/* Logo image */}
    //     <img
    //       src="https://afriquetek.com/wp-content/uploads/2023/07/afriquetek-logo-1.png"
    //       alt="Paris"
    //       className="w-16 h-auto"
    //     />
    //   </div>

    //   {/* Menu Items */}
    //   <div className="flex flex-col items-center text-center">
    //     <ul className="w-full">
    //       {filteredMenuItems.map((item) => (
    //         <li key={item.title} className="flex flex-col items-center mb-2">
    //           <Link
    //             href={item.path}
    //             onClick={()=>{
    //               console.log({path: item.path})
    //             }}
    //             className="flex flex-col items-center w-full p-1 rounded-lg">
    //             {/* Icon with hover and focus effects */}
    //             <div
    //               className={classNames(
    //                 "text-lg p-2 text-white rounded-lg transition-colors duration-200",
    //                 {
    //                   "bg-[#08397e] text-white": currentPathname === item.path, // Focused state
    //                   "hover:bg-[#08397e] hover:text-white": currentPathname !== item.path, // Hover effect only on the icon
    //                 }
    //               )}>
    //               {item.icon}
    //             </div>
    //             {/* Title (beneath icon, unaffected by focus or hover) */}
    //             <span className="text-xs mt-1 text-white ">{t(item.title)}</span>
    //           </Link>
    //         </li>
    //       ))}
    //     </ul>
    //   </div>
    // </main>

    <main className="w-24 h-full rounded-lg">
      <div className="flex justify-center p-4 mb-6">
        {/* Logo image */}
        <img
          src="https://afriquetek.com/wp-content/uploads/2023/07/afriquetek-logo-1.png"
          alt="Paris"
          className="w-16 h-auto"
        />
      </div>

      {/* Menu Items */}
      <div className="flex flex-col items-center justify-center text-center">
        <ul className="w-full">
          {filteredMenuItems.map((item) => (
            <li key={item.title} className="flex flex-col items-center mb-2">
              <Link
                href={item.path}
                className="flex flex-col items-center w-full p-1 rounded-lg">
                {/* Icon with hover and focus effects */}
                <div
                  className={classNames(
                    "text-xl p-2 rounded-lg transition-colors text-[#08376B] duration-200",
                    {
                      "bg-[#08376B] text-white": currentPathname === item.path, // Focused state
                      "hover:bg-[#08376B] hover:text-white": currentPathname !== item.path, // Hover effect only on the icon
                    }
                  )}>
                  {item.icon}
                </div>

                {/* Title (beneath icon, unaffected by focus or hover) */}
                <span className="text-xs mt-1 text-white font-bold">{t(item.title)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
