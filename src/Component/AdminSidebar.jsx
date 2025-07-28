import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

import { MdOutlineDashboard } from "react-icons/md";
import { SiSimpleanalytics } from "react-icons/si";
import { BsPersonAdd, BsPersonLock } from "react-icons/bs";
import {
  RiBuildingLine,
  RiMoneyDollarCircleLine,
  RiSettings3Line,
} from "react-icons/ri";
import { LuNotebookPen } from "react-icons/lu";

const getNavLinkClass = ({ isActive }) =>
  `flex items-center p-3 rounded-lg text-sm transition-all ${
    isActive
      ? "border-r-[3px] bg-[#DCFCE7] border-[#0A8625] text-green-600"
      : "text-gray-700 hover:border-r-[3px] hover:bg-[#DCFCE7] hover:border-[#0A8625] hover:text-green-600"
  }`;

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-white border-r h-full">
      <div className="flex items-center gap-3 p-5 border-b mb-4">
        <img
          src={logo}
          alt="COMCIN Logo"
          className="w-12 h-12 object-contain"
        />
        <div>
          <div className="text-xl font-bold text-[#1E1E1E]">COMCIN</div>
          <div className="text-sm text-[#686868]">Admin Panel</div>
        </div>
      </div>
      <nav className="space-y-1 px-4 py-2">
        <NavLink to="/admin-dashboard" end className={getNavLinkClass}>
          <MdOutlineDashboard className="inline mr-2" /> Dashboard
        </NavLink>
        <NavLink to="/admin-dashboard/memberships" className={getNavLinkClass}>
          <BsPersonAdd className="inline mr-2" /> Membership Applications
        </NavLink>
        <NavLink to="/admin-dashboard/institutions" className={getNavLinkClass}>
          <RiBuildingLine className="inline mr-2" /> Institutions Management
        </NavLink>
        <NavLink to="/admin-dashboard/financials" className={getNavLinkClass}>
          <RiMoneyDollarCircleLine className="inline mr-2" /> Financials &
          Levies
        </NavLink>
        <NavLink to="/admin-dashboard/reports" className={getNavLinkClass}>
          <SiSimpleanalytics className="inline mr-2" /> Reports & Analytics
        </NavLink>
        <NavLink to="/admin-dashboard/content" className={getNavLinkClass}>
          <LuNotebookPen className="inline mr-2" /> Content Management
        </NavLink>
        <NavLink to="/admin-dashboard/users" className={getNavLinkClass}>
          <BsPersonLock className="inline mr-2" /> Admin Users
        </NavLink>
        <NavLink to="/admin-dashboard/settings" className={getNavLinkClass}>
          <RiSettings3Line className="inline mr-2" /> Settings
        </NavLink>
      </nav>
    </aside>
  );
}
