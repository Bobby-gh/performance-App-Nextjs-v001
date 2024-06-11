'use client'
import React from "react";
import { MenuItems } from "./menuitems";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { LoadingPopup } from "../api/sessions";

export function Sidebar() {
  const currentPathname = usePathname()
  return (
   
    <main className="w-32 sm:w-72 ">
       <LoadingPopup/>
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
            {MenuItems.map((item) => (
              <li
                key={item.title}>
                <Link href={item.path} className={classNames({
                  "flex items-center text-md p-4 m-2 hover:bg-slate-400 rounded-lg": true,
                  "bg-slate-400 rounded-lg": currentPathname === item.path
                })}>
                  {item.icon} <span className="ml-2 hidden transition duration-300 ease-out sm:block">{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
