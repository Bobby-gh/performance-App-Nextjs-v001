import { FaHome } from "react-icons/fa";
import { GoGoal } from "react-icons/go";
import { MdOutlineAssessment, MdGroups2, MdOutlineAssignment } from "react-icons/md";
import { PiChartDonut } from "react-icons/pi";
import { IoPerson } from "react-icons/io5";


export const MenuItems = [
    {
        title: "Dashboard",
        path: "/home/",
        icon: <FaHome/>
    },
    {
        title: "Projects",
        path: "/home/goals/",
        icon: <GoGoal/>
    },
    {
        title: "assignGoals",
        path: "/home/goal-setting/",
        icon: <MdOutlineAssignment/>
    },
    {
        title: "goalAssessment",
        path: "/home/goal-assessment/",
        icon: <MdOutlineAssessment/>
    },
    {
        title: "department",
        path: "/home/department/",
        icon: <MdGroups2/>
    },
    {
        title: "employees",
        path: "/home/employees/",
        icon: <IoPerson/>
    },
    {
        title: "reports",
        path: "/home/reports/",
        icon: <PiChartDonut/>
    }
]