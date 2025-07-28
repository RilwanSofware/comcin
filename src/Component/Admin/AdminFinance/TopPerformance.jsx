import React from "react";

const institutions = [
  {
    id: 1,
    name: "Lagos State Microfinance Bank",
    location: "Lagos",
    since: "2019",
    revenue: "₦2,450,000",
    growth: "+24%",
    compliance: "98%",
    level: "National Level",
    status: "Active",
  },
  {
    id: 2,
    name: "Unity Cooperative Society",
    location: "Kano",
    since: "2020",
    revenue: "₦1,850,000",
    growth: "+18%",
    compliance: "95%",
    level: "State Level",
    status: "Active",
  },
  {
    id: 3,
    name: "First City Microfinance Bank",
    location: "Rivers",
    since: "2018",
    revenue: "₦1,650,000",
    growth: "+15%",
    compliance: "92%",
    level: "National Level",
    status: "Active",
  },
  {
    id: 4,
    name: "Zenith Cooperative Initiative",
    location: "Oyo",
    since: "2021",
    revenue: "₦1,420,000",
    growth: "+12%",
    compliance: "90%",
    level: "State Level",
    status: "Active",
  },
  {
    id: 5,
    name: "ABC Microfinance Limited",
    location: "Kaduna",
    since: "2020",
    revenue: "₦1,280,000",
    growth: "+10%",
    compliance: "88%",
    level: "Unit Level",
    status: "Active",
  },
  {
    id: 6,
    name: "Northern States Cooperative",
    location: "Abuja FCT",
    since: "2019",
    revenue: "₦1,150,000",
    growth: "+8%",
    compliance: "85%",
    level: "State Level",
    status: "Active",
  },
  {
    id: 7,
    name: "Delta Community Bank",
    location: "Delta",
    since: "2022",
    revenue: "₦980,000",
    growth: "+6%",
    compliance: "82%",
    level: "Unit Level",
    status: "Active",
  },
  {
    id: 8,
    name: "Ogun State Microfinance",
    location: "Ogun",
    since: "2021",
    revenue: "₦850,000",
    growth: "+4%",
    compliance: "78%",
    level: "State Level",
    status: "Under Review",
  },
];

export default function TopPerformance() {
  return (
    <div className=" bg-white border border-[#E5E7EB] rounded-lg">
      <div className="p-6 border-b ">
        <h2 className="text-xl font-semibold">Top Performing Institutions</h2>
        <p className="text-gray-500 text-sm">
          Ranked by revenue contribution and performance metrics
        </p>
      </div>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {institutions.map((item, index) => (
          <div
            key={item.id}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold bg-green-100 text-green-700 px-2 py-1 rounded-full">
                #{index + 1}
              </span>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  item.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-orange-100 text-orange-700"
                }`}
              >
                {item.status}
              </span>
            </div>
            <h3 className="text-base font-semibold text-[#1F2937]">
              {item.name}
            </h3>
            <p className="text-sm font-normal text-[#4B5563] mb-2">
              {item.location} • Since {item.since}
            </p>
            <div className="flex justify-between font-normal text-xs text-[#4B5563] mb-1">
              <span>Revenue:</span>
              <span className="text-base font-medium text-[#1F2937]">
                {item.revenue}
              </span>
            </div>

            <div className="flex justify-between font-normal text-xs text-[#4B5563] mb-1">
              <span>Growth:</span>
              <span className="text-sm font-medium text-[#16A34A]">
                {item.growth}
              </span>
            </div>
            <div className="flex justify-between font-normal text-xs text-[#4B5563] mb-1">
              <span>Compliance:</span>
              <span className="text-base font-medium text-[#1F2937]">
                {item.compliance}
              </span>
            </div>

            <div className="flex justify-between items-center mt-2">
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  item.level === "National Level"
                    ? "bg-purple-100 text-purple-700"
                    : item.level === "State Level"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {item.level}
              </span>
              <button className="text-sm font-medium text-green-600 hover:underline">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
