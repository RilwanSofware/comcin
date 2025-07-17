import React from "react";
import { FiBell } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function NotificationsList({ notifications }) {
  return (
    <div className="bg-white rounded-lg">
      <div className="flex items-center justify-between  p-4 pb-1 border-b border-[#E9EEEA] ">
        <h3 className="text-lg font-medium text-gray-800">Notifications</h3>
        <Link to="/notifications" className="text-xs font-bold text-[#0A8625] ">
          View all
        </Link>
      </div>
      <div className="space-y-4 p-4">
        {notifications.map((notification, index) => (
          <NotificationItem key={index} notification={notification} />
        ))}
      </div>
    </div>
  );
}

const NotificationItem = ({ notification }) => (
    <div className="border-b flex items-start gap-2 border-gray-200 pb-4 last:border-0 last:pb-0">
      <FiBell className="text-xl text-[#0A8625] cursor-pointer" />
  
      <div className="flex flex-col items-start w-full">
        <div className="flex justify-between w-full">
          <div className="flex flex-col">
            <strong className="text-gray-800">{notification.sender}</strong>
            <span className="text-sm text-gray-500">{notification.type}</span>
          </div>
          <span className="text-sm text-gray-500">5min ago</span>
        </div>
        <p className="text-gray-600 text-sm mt-1">
          Stay updated with the latest developments in t...
        </p>
      </div>
    </div>
  );
  
