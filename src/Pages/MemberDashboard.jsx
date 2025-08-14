import React from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import SummaryCardGrid from "../Component/Dashboard/SummaryCardGrid";
import MemberStatusCard from "../Component/Dashboard/MemberStatusCard";
import PendingLevies from "../Component/Dashboard/PendingLevies";
import NotificationsList from "../Component/Dashboard/NotificationsList";
import { useGetMemberDashboardQuery } from "@/services/members/dashboardmember";

export default function MemberDashboard() {
  const { data:lekan, error, isLoading } = useGetMemberDashboardQuery();
  console.log({ lekan, error, isLoading });

  const pendingLevies = Array(4).fill({
    name: "Annual Membership Levy",
    amount: "5000.00",
    dueDate: "15 JUNE 2025",
    status: "UNPAID",
  });

  const notifications = [
    { sender: "COMCIN ADMIN", type: "Upcoming Event" },
    { sender: "Paystack", type: "Payment Failed" },
    { sender: "Security", type: "Password Reset" },
    { sender: "COMCIN ADMIN", type: "Due Payment" },
    { sender: "COMCIN ADMIN", type: "Upcoming Event" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto  py-8">
        <div className="flex gap-5 items-center">
          <LuLayoutDashboard className="text-2xl" />
          <h1 className="text-2xl font-maven font-bold text-gray-800">
            Member Dashboard
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="md:col-span-1">
            <MemberStatusCard />
          </div>
          <div className="md:col-span-2">
            <SummaryCardGrid />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Make PendingLevies take 2/3 width */}
          <div className="md:col-span-2">
            <PendingLevies levies={pendingLevies} />
          </div>

          {/* Make NotificationsList take 1/3 width */}
          <div className="md:col-span-1">
            <NotificationsList notifications={notifications} />
          </div>
        </div>
      </div>
    </div>
  );
}
