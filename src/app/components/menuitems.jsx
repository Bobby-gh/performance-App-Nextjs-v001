import { FaHome } from "react-icons/fa";
import { GoGoal } from "react-icons/go";
import { MdOutlineAssessment, MdGroups2, MdOutlineAssignment } from "react-icons/md";
import { LuUser2 } from "react-icons/lu";


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
        title: "Assign Goals",
        path: "/home/goal-setting",
        icon: <MdOutlineAssignment/>
    },
    {
        title: "Goal Assessment",
        path: "/home/goal-assessment",
        icon: <MdOutlineAssessment/>
    },
    {
        title: "Department",
        path: "/home/department",
        icon: <MdGroups2/>
    },
    {
        title: "Employees",
        path: "/home/employees",
        icon: <LuUser2/>
    }
]