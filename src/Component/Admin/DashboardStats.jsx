import { FaUserTie, FaMoneyBillWave } from "react-icons/fa";
import { AiOutlineHourglass } from "react-icons/ai";
import { RiBuildingLine, RiMoneyDollarCircleLine } from "react-icons/ri";
import { GoPerson } from "react-icons/go";
import { LuFileText } from "react-icons/lu";

export default function DashboardStats({ cardsStat }) {
  const stats = [
    {
      label: "Total Institutions",
      value: cardsStat?.totals.institutions,
      change: cardsStat?.totals.institutions_percentage_increase,
      icon: <RiBuildingLine />,
      bgColor: "#DBEAFE", // Light Blue
      textColor: "#1D4ED8", // Dark Blue
    },
    {
      label: "Active Members",
      value: cardsStat?.totals.active_members,
      change: cardsStat?.totals.active_members_percentage_increase,
      icon: <GoPerson />,
      bgColor: "#DCFCE7", // Light Green
      textColor: "#047857", // Dark Green
    },
    {
      label: "Pending Applications",
      value: cardsStat?.totals.pending_applications,
      change: cardsStat?.totals.pending_applications_percentage_increase,
      icon: <LuFileText />,
      bgColor: "#FFEDD5", // Light Orange
      textColor: "#C2410C", // Dark Orange
    },
    {
      label: "Revenue (₦)",
      value: cardsStat?.totals.revenue,
      change: cardsStat?.totals.revenue_percentage_increase,
      icon: <RiMoneyDollarCircleLine />,
      bgColor: "#F3E8FF", // Light Purple
      textColor: "#7E22CE", // Dark Purple
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-lg shadow-[0_1px_2px_0_#0000000D]"
        >
          <div className="flex justify-between items-start">
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
