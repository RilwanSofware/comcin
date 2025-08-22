import { RiBuildingLine } from "react-icons/ri";
import { GoPerson } from "react-icons/go";
import { LuFileText } from "react-icons/lu";

export default function SupportCard({ supportData }) {
  const stats = [
    {
      label: "Total Tickets",
      value: supportData?.stats?.total,
      change: +supportData?.growth?.total,
      icon: <LuFileText />,
      bgColor: "#DBEAFE", // Light Blue
      textColor: "#2563EB", // Dark Blue
    },
    {
      label: "Resolved",
      value: supportData?.stats?.resolved,
      change: +supportData?.growth?.resolved,
      icon: <LuFileText />,
      bgColor: "#DCFCE7", // Light Green
      textColor: "#047857", // Dark Green
    },
    {
      label: "Pending",
      value: supportData?.stats?.pending,
      change: +supportData?.growth?.pending,
      icon: <LuFileText />,
      bgColor: "#FFEDD5", // Light Orange
      textColor: "#EA580C", // Dark Orange
    },
    {
      label: "Rejected",
      value: supportData?.stats?.cancelled,
      change: +supportData?.growth?.cancelled,
      icon: <LuFileText />,
      bgColor: "#FEE2E2", // Light Orange
      textColor: "#B20B0B", // Dark Orange
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-lg shadow-[0_1px_2px_0_#0000000D]"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-semibold text-[#686868]">
                {stat.label}
              </p>
              <h2 className="text-xl font-bold">{stat.value}</h2>
              {stat.change ? (
                <p className="text-xs" style={{ color: stat.textColor }}>
                  {stat.change}{" "}
                  <span className="text-[#686868]">this week</span>
                </p>
              ) : (
                <p className="text-xs text-gray-400 italic">
                  Nothing posted yet
                </p>
              )}
            </div>
            <div
              className="p-2 rounded-lg text-xl"
              style={{
                backgroundColor: stat.bgColor,
                color: stat.textColor,
              }}
            >
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
