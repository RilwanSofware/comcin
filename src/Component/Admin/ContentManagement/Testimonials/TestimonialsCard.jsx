import { RiBuildingLine } from "react-icons/ri";
import { GoPerson } from "react-icons/go";
import { LuFileText } from "react-icons/lu";


export default function TestimonialsCard() {
  const stats = [
    {
      label: "Total Testimonials",
      value: "1,247",
      change: "+3",
      icon: <RiBuildingLine />,
      bgColor: "#DBEAFE", // Light Blue
      textColor: "#2563EB", // Dark Blue
    },
    {
      label: "Published",
      value: "89",
      change: "+8",
      icon: <GoPerson />,
      bgColor: "#DCFCE7", // Light Green
      textColor: "#047857", // Dark Green
    },
    {
      label: "Pending",
      value: "15",
      change: "",
      icon: <LuFileText />,
      bgColor: "#FFEDD5", // Light Orange
      textColor: "#EA580C", // Dark Orange
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
