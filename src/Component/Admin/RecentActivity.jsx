// components/RecentActivity.jsx
import { BsFileEarmarkPlus } from "react-icons/bs";
import {
  FaCheckCircle,
  FaRegClock,
  FaMoneyCheckAlt,
  FaBell,
} from "react-icons/fa";
import { IoCheckmarkOutline, IoWarningOutline } from "react-icons/io5";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

export default function RecentActivity() {
  const activities = [
    {
      title: "Lagos State Cooperative approved",
      time: "2 hours ago",
      icon: "approved",
    },
    {
      title: "New application from Zenith MFB",
      time: "4 hours ago",
      icon: "application",
    },
    {
      title: "Payment received from ABC Coop",
      time: "6 hours ago",
      icon: "payment",
    },
    {
      title: "Compliance deadline reminder sent",
      time: "1 day ago",
      icon: "reminder",
    },
    {
      title: "Lagos State Cooperative approved",
      time: "2 hours ago",
      icon: "approved",
    },
    {
      title: "New application from Zenith MFB",
      time: "4 hours ago",
      icon: "application",
    },
    {
      title: "Payment received from ABC Coop",
      time: "6 hours ago",
      icon: "payment",
    },
    {
      title: "Compliance deadline reminder sent",
      time: "1 day ago",
      icon: "reminder",
    },
  ];

  const getIcon = (iconType) => {
    const baseStyle = "rounded-full w-8 h-8 flex items-center justify-center";

    switch (iconType) {
      case "approved":
        return (
          <div className={`${baseStyle} bg-[#DCFCE7]`}>
            <IoCheckmarkOutline className="text-[#0A8625] text-lg" />
          </div>
        );
      case "application":
        return (
          <div className={`${baseStyle} bg-[#DBEAFE]`}>
            <BsFileEarmarkPlus className="text-[#2563EB] text-lg" />
          </div>
        );
      case "payment":
        return (
          <div className={`${baseStyle} bg-[#DCFCE7]`}>
            <RiMoneyDollarCircleLine className="text-[#0A8625] text-lg" />
          </div>
        );
      case "reminder":
        return (
          <div className={`${baseStyle} bg-[#FFEDD5]`}>
            <IoWarningOutline className="text-[#EA580C] text-lg" />
          </div>
        );
      default:
        return (
          <div className={`${baseStyle} bg-gray-200`}>
            <FaRegClock className="text-gray-600 text-lg" />
          </div>
        );
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-[0_1px_2px_0_#0000000D]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-medium text-[#1E1E1E]">
          Recent Activity
        </h3>
        <button className="text-sm text-green-700 hover:underline flex items-center gap-1">
          View All
        </button>
      </div>
      <ul className="space-y-3">
        {activities.map((activity, idx) => (
          <li key={idx} className="flex items-start gap-2">
            {getIcon(activity.icon)}
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-800">
                {activity.title}
              </span>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
