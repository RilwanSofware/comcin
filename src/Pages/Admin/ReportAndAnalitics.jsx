import AdminFinanceStatCard from "@/Component/Admin/AdminFinance/AdminFinanceStatCard";
import AdminFinanceTable from "@/Component/Admin/AdminFinance/AdminFinanceTable";
import AdminFinanceTrends from "@/Component/Admin/AdminFinance/AdminFinanceTrends";
import TopPerformance from "@/Component/Admin/AdminFinance/TopPerformance";
import MembershipTable from "@/Component/Admin/Membership/MembershipTable";
import MemberStatCard from "@/Component/Admin/Membership/MemberStatCard";
import DownloadReports from "@/Component/Admin/Reports/DownloadReports";
import GroupAnalysis from "@/Component/Admin/Reports/GroupAnalysis";
import ReportsStatCard from "@/Component/Admin/Reports/ReportsStatCard";
import React from "react";
import { HiOutlineArrowPathRoundedSquare } from "react-icons/hi2";

export default function ReportAndAnalitics() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-start sm:justify-between sm:items-center">
        <div className="block gap-5 items-center mb-4 px-4">
          <h1 className="text-2xl font-maven font-bold text-[#1F2937]">
            Reports & Analytics
          </h1>
          <p className="text-sm text-[#4B5563]">
            Monitor performance metrics and generate comprehensive reports
          </p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center text-black border border-[#D1D5DB] text-sm px-4 py-2 rounded-lg">
            Monthly{" "}
          </button>
          <button className="flex items-center gap-2 bg-[#0A8625] hover:bg-green-700 text-white text-sm px-4 py-2 rounded-lg">
            <HiOutlineArrowPathRoundedSquare className="text-xl" /> Refresh Data
          </button>
        </div>
      </div>

      <ReportsStatCard />
      <DownloadReports />
      <GroupAnalysis />
      <TopPerformance />
    </div>
  );
}
