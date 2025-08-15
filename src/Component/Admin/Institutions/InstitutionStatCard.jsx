import { HiOutlineUserGroup } from "react-icons/hi";
import { TbUserCheck } from "react-icons/tb";
import { LiaUserClockSolid, LiaUserTimesSolid } from "react-icons/lia";

export default function InstitutionStatCard({ cardData }) {
  const stats = [
    {
      label: "Total Institutions",
      value: cardData?.total_institutions,
      change: cardData?.total_institutions_percentage_increase,
      icon: <HiOutlineUserGroup />,
      bgColor: "#DBEAFE", // Light Blue
      textColor: "#141B34", // Dark Blue
    },
    {
      label: "Federal",
      value: cardData?.total_federal_institutions,
      change: cardData?.total_federal_institutions_percentage_increase,
      icon: <HiOutlineUserGroup />,
      bgColor: "#DCFCE7", // Light Green
      textColor: "#0A8625", // Dark Green
    },
    {
      label: "State",
      value: cardData?.total_state_institutions,
      change: cardData?.total_state_institutions_percentage_increase,
      icon: <HiOutlineUserGroup />,
      bgColor: "#FFEDD5", // Light Orange
      textColor: "#9A3412", // Dark Orange
    },
    {
      label: "Unit",
      value: cardData?.total_unit_institutions,
      change: cardData?.total_unit_institutions_percentage_increase,
      icon: <HiOutlineUserGroup />,
      bgColor: "#DBEAFE", // Light Purple
      textColor: "#1D4ED8", // Dark Purple
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
