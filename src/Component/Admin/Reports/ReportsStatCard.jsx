import { HiOutlineUserGroup } from "react-icons/hi";
import { TbFileAnalytics, TbUserCheck } from "react-icons/tb";
import { LiaUserClockSolid, LiaUserTimesSolid } from "react-icons/lia";
import { MdOutlineAnalytics, MdOutlineCloudUpload } from "react-icons/md";
import { BsSpeedometer } from "react-icons/bs";


export default function ReportsStatCard() {
  const stats = [
    {
      label: "Total Reports Generated",
      value: "1,247",
      change: "+12%",
      icon: <TbFileAnalytics />,
      bgColor: "#DBEAFE", // Light Blue
      textColor: "#2563EB", // Dark Blue
    },
    {
      label: "Data Points Analyzed",
      value: "89.2K",
      change: "+8%",
      icon: <MdOutlineAnalytics />,
      bgColor: "#F3E8FF", // Light Green
      textColor: "#9333EA", // Dark Green
    },
    {
      label: "Active Dashboards",
      value: "15",
      change: "+15",
      icon: <BsSpeedometer />,
      bgColor: "#FFEDD5", // Light Orange
      textColor: "#EA580C", // Dark Orange
    },
    {
      label: "Export Downloads",
      value: "432",
      change: "+22%",
      icon: <MdOutlineCloudUpload />,
      bgColor: "#DCFCE7", // Light Purple
      textColor: "#16A34A", // Dark Purple
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
              <p className="text-xs" style={{ color: stat.textColor }}>
                {stat.change}{" "}
                <span className="text-[#686868]">vs last month</span>
              </p>
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
