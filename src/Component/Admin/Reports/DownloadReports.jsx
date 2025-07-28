import React from "react";
import { BiArrowToBottom } from "react-icons/bi";
import {
  FaChartLine,
  FaDownload,
  FaEye,
  FaFilePdf,
  FaPlus,
  FaRegFileAlt,
} from "react-icons/fa";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { RiGroupLine, RiMoneyDollarCircleLine } from "react-icons/ri";
import { TbInfoTriangle } from "react-icons/tb";

export default function DownloadReports() {
  const reports = [
    {
      id: 1,
      title: "Membership Report",
      description:
        "Complete list of all registered institutions with status and details",
      lastUpdated: "2024-01-15",
      size: "2.4 MB",
      type: "PDF",
      icon: <RiGroupLine />,
      bgColor: "#DBEAFE",
      textColor: "#2563EB",
    },
    {
      id: 2,
      title: "Financial Summary",
      description: "Revenue, payments, and financial performance overview",
      lastUpdated: "2024-01-14",
      size: "1.8 MB",
      type: "Excel",
      icon: <RiMoneyDollarCircleLine />,
      bgColor: "#DCFCE7",
      textColor: "#16A34A",
    },
    {
      id: 3,
      title: "Payment Defaulters",
      description: "List of institutions with overdue payments and penalties",
      lastUpdated: "2024-01-13",
      size: "956 KB",
      type: "PDF",
      icon: <TbInfoTriangle />,
      bgColor: "#FEE2E2",
      textColor: "#DC2626",
    },
    {
      id: 4,
      title: "Application History",
      description: "Historical data of membership applications and processing",
      lastUpdated: "2024-01-12",
      size: "3.2 MB",
      type: "Excel",
      icon: <FaRegFileAlt />,
      bgColor: "#F3E8FF",
      textColor: "#9333EA",
    },

    {
      id: 5,
      title: "Compliance Report",
      description: "Regulatory compliance status and documentation tracking",
      lastUpdated: "2024-01-11",
      size: "1.5 MB",
      type: "PDF",
      icon: <IoShieldCheckmarkOutline />,
      bgColor: "#FFEDD5",
      textColor: "#EA580C",
    },

    {
      id: 6,
      title: "Performance Analytics",
      description: "Key performance indicators and growth metrics",
      lastUpdated: "2024-01-10",
      size: "2.1 MB",
      type: "Excel",
      icon: <FaChartLine />,
      bgColor: "",
      textColor: "",
    },
  ];

  const getTypeStyle = (type) => {
    if (type === "PDF") {
      return {
        backgroundColor: "#FEE2E2",
        color: "#DC2626",
      };
    } else if (type === "Excel") {
      return {
        backgroundColor: "#DCFCE7",
        color: "#0A8625",
      };
    } else {
      return {
        backgroundColor: "#E5E7EB",
        color: "#6B7280",
      };
    }
  };

  return (
    <div className="bg-white rounded-lg border border-[#E5E7EB] shadow-sm">
      <div className="flex p-6 justify-between items-center mb-6 border-b">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Downloadable Reports
          </h2>
          <p className="text-sm text-gray-500">
            Generate and download comprehensive reports
          </p>
        </div>
        <button className="flex items-center gap-2 border border-[#D1D5DB] text-black px-4 py-2 rounded-lg text-sm">
          <FaPlus className="text-xs" />
          <span>Generate New</span>
        </button>
      </div>

      {/* Grid layout for cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
        {reports.map((report) => {
          const typeStyle = getTypeStyle(report.type);
          return (
            <div
              key={report.id}
              className="border border-gray-100 rounded-lg p-4 shadow-sm relative"
            >
              {/* Top Icon and Checkbox */}
              <div className="flex justify-between items-start mb-2">
                <div
                  className="p-2 rounded-lg text-xl mb-2"
                  style={{
                    backgroundColor: report.bgColor,
                    color: report.textColor,
                  }}
                >
                  {report.icon}
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="form-checkbox accent-green-600"
                  />
                  <span
                    className="text-xs font-medium px-2 py-0.5 rounded-full"
                    style={typeStyle}
                  >
                    {report.type}
                  </span>{" "}
                </div>
              </div>

              <h3 className="font-medium text-gray-800">{report.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{report.description}</p>
              <div className="flex justify-between items-center gap-2 mt-2 text-xs text-gray-400">
                <span>Last updated: {report.lastUpdated}</span>
                <span>•</span>
                <span>{report.size}</span>
              </div>

              {/* Buttons */}
              <div className="flex justify-between gap-2 mt-4">
                <button className="w-full flex items-center justify-center gap-1 text-sm bg-[#16A34A] text-white px-3 py-1.5 rounded-lg">
                  <BiArrowToBottom className="text-sm" />
                  <span>Download</span>
                </button>
                <button className="w-full flex items-center justify-center gap-1 text-sm text-gray-600 hover:text-gray-700 px-3 py-1.5 border border-gray-300 rounded-md">
                  <FaEye className="text-sm" />
                  <span>Preview</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
