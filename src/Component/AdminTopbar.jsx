import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiBell, FiMenu, FiSearch } from "react-icons/fi";
import { HiChevronDown } from "react-icons/hi";
import logo from "../assets/logo.png";
import { CgMenuLeft } from "react-icons/cg";
import { getInitials } from "@/utils";

export default function AdminTopbar() {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // console.log("Logging out...");
    sessionStorage.removeItem("token");
    sessionStorage.clear();
    navigate("/login");
  };


  return (
    <header className="bg-white w-full px-4 py-3 shadow-sm mt-5">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Desktop: Search Bar */}
        <div className="hidden md:flex relative w-full max-w-xs">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
            <FiSearch />
          </span>
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Mobile: Logo only */}
        <div className="flex items-center md:hidden">
          <img src={logo} alt="Logo" className="h-8" />
        </div>

        {/* Right side: Desktop only */}
        <div className="hidden md:flex items-center gap-4 relative">
          <div className="border rounded border-[#E9EEEA] p-1">
            <FiBell className="text-xl text-[#0A8625] cursor-pointer" />
          </div>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex border rounded border-[#E9EEEA] p-1 items-center gap-2"
          >
            <div className="w-6 h-6 rounded-full bg-[#0A8625] flex items-center justify-center text-white font-medium">
              A
            </div>
            <span className="text-gray-700 text-sm">Admin User</span>
            <HiChevronDown
              className={`w-5 h-5 text-gray-500 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 top-12 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-100">
              <DropdownLink to="/profile">Profile</DropdownLink>
              <DropdownLink to="/settings">Settings</DropdownLink>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile: Menu Icon */}
        <div className="md:hidden">
          <button className="text-gray-600">
            <CgMenuLeft className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
}

const DropdownLink = ({ to, children }) => (
  <Link
    to={to}
    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
  >
    {children}
  </Link>
);
