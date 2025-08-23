import React, { useState } from "react";

import AdminFinanceTable from "@/Component/Admin/AdminFinance/AdminFinanceTable";
import ReportsStatCard from "@/Component/Admin/Reports/ReportsStatCard";
import { LuArrowDownToLine } from "react-icons/lu";
import { TbQuote } from "react-icons/tb";
import { RiCustomerServiceLine } from "react-icons/ri";
import { LuNewspaper } from "react-icons/lu";
import NewsCard from "@/Component/Admin/ContentManagement/News/NewsCard";
import NewsTable from "@/Component/Admin/ContentManagement/News/NewsTable";
import TestimonialsCard from "@/Component/Admin/ContentManagement/Testimonials/TestimonialsCard";
import TestimonialsTable from "@/Component/Admin/ContentManagement/Testimonials/TestimonialsTable";
import SupportCard from "@/Component/Admin/ContentManagement/Support/SupportCard";
import SupportTable from "@/Component/Admin/ContentManagement/Support/SupportTable";
import {
  useGetAdminSupportQuery,
  useGetAdminTestimonialQuery,
  useGetAdminContentQuery
} from "@/services/admin-dashboard/dashboard";

export default function ContentManagement() {
  const [activeTab, setActiveTab] = useState("News");

  const { data: supportData } = useGetAdminSupportQuery();
  const { data: testimonialData } = useGetAdminTestimonialQuery();
  const { data: contentData } = useGetAdminContentQuery();

  console.log(contentData, "contentData");

  const tabs = [
    { label: "News & Announcements", value: "News", icon: <LuNewspaper /> },
    {
      label: "Testimonials",
      value: "Testimonials",
      icon: <TbQuote size={20} />,
    },
    {
      label: "Support Management",
      value: "Support",
      icon: <RiCustomerServiceLine />,
    },
  ];
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-start sm:justify-between sm:items-center">
        <div className="block gap-5 items-center mb-4 px-4">
          <h1 className="text-2xl font-maven font-bold text-gray-800">
            Content Management
          </h1>
          <p className="text-sm text-gray-500">
            Manage news, testimonials, and support requests
          </p>
        </div>
        <button className="flex items-center bg-[#0A8625] hover:bg-green-700 text-white text-sm px-4 py-2 rounded">
          <LuArrowDownToLine /> Export Report
        </button>
      </div>

      <div className="flex gap-4 bg-white rounded p-1">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`flex items-center gap-2 px-4 py-2 font-medium ${
              activeTab === tab.value
                ? "bg-[#0A8625] text-white rounded"
                : "text-[#4B4B4B]"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "News" && (
        <>
          <NewsCard />
          <NewsTable />
        </>
      )}

      {activeTab === "Testimonials" && (
        <>
          <TestimonialsCard testimonialData={testimonialData} />
          <TestimonialsTable testimonialData={testimonialData} />
        </>
      )}

      {activeTab === "Support" && (
        <>
          <SupportCard supportData={supportData} />
          <SupportTable supportData={supportData?.data} />
        </>
      )}
    </div>
  );
}
