import { HiOutlineUserGroup } from "react-icons/hi";
import { TbUserCheck } from "react-icons/tb";
import { LiaUserClockSolid, LiaUserTimesSolid } from "react-icons/lia";

export default function MemberStatCard({ cardsData }) {
  const stats = [
    {
      label: "Total Application",
      value: cardsData?.total_applications,
      change: cardsData?.total_applications_percentage_increase,
      icon: <HiOutlineUserGroup />,
      bgColor: "#DBEAFE", // Light Blue
      textColor: "#141B34", // Dark Blue
    },
    {
      label: "Approved Members",
      value: cardsData?.total_approved_members,
      change: cardsData?.total_approved_members_percentage_increase,
      icon: <TbUserCheck />,
      bgColor: "#DCFCE7", // Light Green
      textColor: "#0A8625", // Dark Green
    },
    {
      label: "Pending",
      value: cardsData?.pending_members,
      change: cardsData?.pending_members_percentage_increase,
      icon: <LiaUserClockSolid />,
      bgColor: "#FFEDD5", // Light Orange
      textColor: "#9A3412", // Dark Orange
    },
    {
      label: "Rejected",
      value: cardsData?.total_rejected,
      change: cardsData?.total_rejected_percentage_increase,
      icon: <LiaUserTimesSolid />,
      bgColor: "#FFE8E5", // Light Purple
      textColor: "#EF4444", // Dark Purple
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
