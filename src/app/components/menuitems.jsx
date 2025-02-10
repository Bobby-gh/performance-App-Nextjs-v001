import { FaHome } from "react-icons/fa";
import { GoGoal } from "react-icons/go";
import { MdOutlineAssessment, MdGroups2, MdOutlineAssignment } from "react-icons/md";
import { LuUser2 } from "react-icons/lu";
import { PiChartDonut } from "react-icons/pi";


export const MenuItems = [
    {
        title: "dashboard",
        path: "/home",
        icon: <FaHome/>
    },
    {
        title: "projects",
        path: "/home/goals",
        icon: <GoGoal/>
    },
    {
        title: "assignGoals",
        path: "/home/goal-setting",
        icon: <MdOutlineAssignment/>
    },
    {
        title: "goalAssessment",
        path: "/home/goal-assessment",
        icon: <MdOutlineAssessment/>
    },
    {
        title: "department",
        path: "/home/department",
        icon: <MdGroups2/>
    },
    {
        title: "employees",
        path: "/home/employees",
        icon: <LuUser2/>
    },
    {
        title: "reports",
        path: "/home/reports",
        icon: <PiChartDonut/>
    }
]