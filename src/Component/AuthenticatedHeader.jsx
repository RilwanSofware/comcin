import React, { useState } from "react";
import { Link, NavLink as RouterNavLink, useNavigate } from "react-router-dom";
import { FiBell, FiChevronDown, FiMenu } from "react-icons/fi";
import logo from "../assets/logo.png";
import { HiChevronDown } from "react-icons/hi";
import {
  useGetMemberDashboardQuery,
  useGetMemberDashboardNotificationQuery,
  useReadNotificationMutation,
} from "@/services/members/dashboardmember";
import { getInitials } from "@/utils";

export default function AuthenticatedHeader() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const { data } = useGetMemberDashboardQuery();
  const { data: notifications, refetch } =
    useGetMemberDashboardNotificationQuery();
  const [readNotification] = useReadNotificationMutation();
  console.log(notifications);

  const navigate = useNavigate();

  // unread count (check view_status OR read_at)
  const unreadCount = notifications?.filter(
    (n) => n.view_status === false
  ).length;

  // Mark as read when clicked
  const handleNotificationClick = async (notif) => {
    try {
      await readNotification({ notification_id: notif.id }).unwrap();
      refetch();
      // optionally: refetch notifications if your hook supports it
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <header className="bg-white text-black rounded-lg container mx-auto px-5 py-3">
      <div className="max-w-7xl w-full">
        <div className="flex justify-between items-center">
          {/* Logo and Nav */}
          <div className="flex items-center gap-10">
            <Link to="/dashboard">
              <img src={logo} alt="COMCIN Logo" className="h-12" />
            </Link>
            <nav className="hidden md:flex gap-6">
              <NavLink to="/dashboard" exact={true}>
                Dashboard
              </NavLink>
              <NavLink to="/dashboard/institution">My Institution</NavLink>
              <NavLink to="/dashboard/finacials">Financials</NavLink>
              <NavLink to="/dashboard/certificates">Certificates</NavLink>
              <NavLink to="/dashboard/support">Support</NavLink>
            </nav>
          </div>

          {/* Notification and Profile */}
          <div className="flex items-center gap-4 relative">
            {/* Notifications */}
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
              <div className="absolute right-0 top-12 w-80 bg-white rounded-md shadow-lg py-2 z-20 border border-gray-100 max-h-96 overflow-y-auto">
                {notifications?.length > 0 ? (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`px-4 py-2 text-sm cursor-pointer ${
                        notif.view_status === false
                          ? "bg-gray-50 font-semibold"
                          : "bg-white"
                      } hover:bg-gray-100`}
                      onClick={() => handleNotificationClick(notif)}
                    >
                      <p className="text-gray-800">{notif.title}</p>
                      <p className="text-xs text-gray-500">{notif.content}</p>
                      <p className="text-[10px] text-gray-400">
                        {new Date(notif.created_at).toLocaleString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-sm text-gray-500 py-4">
                    No notifications
                  </p>
                )}
              </div>
            )}
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex border rounded border-[#E9EEEA] p-1 items-center gap-2 focus:outline-none"
              aria-label="User menu"
              aria-expanded={isDropdownOpen}
            >
              <div className=" p-1 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                {getInitials(data?.user?.name)}
              </div>
              <span className="hidden md:inline text-gray-700 text-sm">
                {data?.user?.name}
              </span>
              <HiChevronDown
                className={`w-5 h-5 text-gray-500 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isDropdownOpen && (
              <div
                className="absolute right-0 top-12 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-100"
                onClick={(e) => e.stopPropagation()}
              >
                {/* <DropdownLink to="/profile">Profile</DropdownLink>
                <DropdownLink to="/settings">Settings</DropdownLink> */}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex justify-end">
          <button className="text-gray-500 hover:text-gray-600">
            <FiMenu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
}

const NavLink = ({ to, children, exact = false }) => (
  <RouterNavLink
    to={to}
    end={exact} // Only enable for exact matches like /dashboard
    className={({ isActive }) =>
      `relative pb-1 text-base font-normal transition-colors ${
        isActive
          ? "text-[#0A8625] after:opacity-100"
          : "text-[#4B4B4B] after:opacity-0"
      } hover:text-[#0A8625] after:content-[''] after:absolute after:left-0 after:bottom-[-6px] after:w-full after:h-[2px] after:bg-[#0A8625] after:transition-opacity after:duration-300`
    }
  >
    {children}
  </RouterNavLink>
);

const DropdownLink = ({ to, children }) => (
  <Link
    to={to}
    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
  >
    {children}
  </Link>
);
