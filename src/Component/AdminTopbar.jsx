import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiBell, FiMenu, FiSearch } from "react-icons/fi";
import { HiChevronDown } from "react-icons/hi";
import logo from "../assets/logo.png";
import { CgMenuLeft } from "react-icons/cg";
import { getInitials } from "@/utils";
import {
  useGetAdminNotificationQuery,
  useGetAdminSettingsAccountQuery,
} from "@/services/admin-dashboard/dashboard";

export default function AdminTopbar() {
  const { data } = useGetAdminSettingsAccountQuery();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const navigate = useNavigate();

  const { data: notifications } = useGetAdminNotificationQuery({
    user_id: data?.data?.id,
  });

  const unreadCount = notifications?.notifications?.filter(
    (n) => n.view_status === false
  ).length;

  console.log(notifications);

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
          {/* Notification bell */}
          <div
            className="relative border rounded border-[#E9EEEA] p-1 cursor-pointer"
            onClick={() => setIsNotifOpen(!isNotifOpen)}
          >
            <FiBell className="text-xl text-[#0A8625]" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>

          {isNotifOpen && (
            <div className="absolute right-16 top-12 w-80 bg-white rounded-md shadow-lg py-2 z-20 border border-gray-100 max-h-96 overflow-y-auto">
              <h4 className="px-4 py-2 text-sm font-semibold border-b">
                Notifications
              </h4>
              {notifications?.notifications?.length > 0 ? (
                notifications.notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="px-4 py-2 text-sm hover:bg-gray-50 border-b last:border-none"
                  >
                    <p className="font-medium">{notif.title}</p>
                    <p className="text-gray-600 text-xs">{notif.content}</p>
                    <span className="text-gray-400 text-[10px]">
                      {new Date(notif.created_at).toLocaleString()}
                    </span>
                  </div>
                ))
              ) : (
                <p className="px-4 py-2 text-sm text-gray-500">
                  No notifications
                </p>
              )}
            </div>
          )}

          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex border rounded border-[#E9EEEA] p-1 items-center gap-2"
          >
            <div className="p-1 rounded-full bg-[#0A8625] flex items-center justify-center text-white font-medium">
              {getInitials(data?.data?.name)}
            </div>
            <span className="text-gray-700 text-sm">{data?.data?.name}</span>
            <HiChevronDown
              className={`w-5 h-5 text-gray-500 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 top-12 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-100">
              {/* <DropdownLink to="/profile">Profile</DropdownLink> */}
              <DropdownLink to="/admin-dashboard/settings">
                Settings
              </DropdownLink>
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
