import { TbNotes } from "react-icons/tb";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { IoTimeOutline } from "react-icons/io5";
import { GoCheckCircle } from "react-icons/go";
import { FaCommentsDollar } from "react-icons/fa";

export default function AdminFinanceStatCard() {
  const stats = [
    {
      label: "Total Revenue",
      value: "₦847,250,000",
      change: "+12%",
      icon: <RiMoneyDollarCircleLine />,
      bgColor: "#DCFCE7",
      textColor: "#16A34A",
    },
    {
      label: "Levies Collected",
      value: "₦234,800,000",
      change: "+8%",
      icon: <FaCommentsDollar />,
      bgColor: "#DBEAFE",
      textColor: "#2563EB",
    },
    {
      label: "Pending Dues",
      value: "₦45,600,000",
      change: "+15%",
      icon: <IoTimeOutline />,
      bgColor: "#FFEDD5",
      textColor: "#EA580C",
    },
    {
      label: "Active Invoices",
      value: "₦45,600,000",
      change: "5",
      icon: <TbNotes />,
      bgColor: "#F3E8FF",
      textColor: "#9333EA",
    },
    {
      label: "Payment Success Rate",
      value: "94.8%",
      change: "+22%",
      icon: <GoCheckCircle />,
      bgColor: "#D1FAE5",
      textColor: "#059669",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  xl:grid-cols-5 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-lg shadow-[0_1px_2px_0_#0000000D]"
        >
          <div className="flex justify-between">
            <div
              className="p-2 rounded-lg text-xl mb-2"
              style={{
                backgroundColor: stat.bgColor,
                color: stat.textColor,
              }}
            >
              {stat.icon}
            </div>
            <p className="text-xs" style={{ color: stat.textColor }}>
              {stat.change}
            </p>
          </div>
          <div className="flex justify-between items-start">
            <div className="flex flex-col justify-between">
              <h2 className="text-xl font-bold">{stat.value}</h2>
              <p className="text-xs text-[#4B5563]">{stat.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
