import { FaHome } from "react-icons/fa";
import { GoGoal } from "react-icons/go";
import { MdAssessment, MdGroups2, MdAssignment } from "react-icons/md";
import { PiChartDonutFill } from "react-icons/pi";
import { IoPerson } from "react-icons/io5";


export const MenuItems = [
    {
        title: "Dashboard",
        path: "/home",
        icon: <FaHome/>
    },
    {
        title: "Projects",
        path: "/home/goals",
        icon: <GoGoal/>
    },
    {
        title: "assignGoals",
        path: "/home/goal-setting",
        icon: <MdAssignment/>
    },
    {
        title: "goalAssessment",
        path: "/home/goal-assessment",
        icon: <MdAssessment/>
    },
    {
        title: "department",
        path: "/home/department",
        icon: <MdGroups2/>
    },
    {
        title: "employees",
        path: "/home/employees",
        icon: <IoPerson/>
    },
    {
        title: "reports",
        path: "/home/reports",
        icon: <PiChartDonutFill/>
    }
]