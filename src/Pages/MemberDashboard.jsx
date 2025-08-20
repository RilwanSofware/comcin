import React from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import SummaryCardGrid from "../Component/Dashboard/SummaryCardGrid";
import MemberStatusCard from "../Component/Dashboard/MemberStatusCard";
import PendingLevies from "../Component/Dashboard/PendingLevies";
import NotificationsList from "../Component/Dashboard/NotificationsList";
import {
  useGetMemberDashboardQuery,
  useGetMemberDashboardFinacialsQuery,
  useGetMemberDashboardNotificationQuery,
} from "@/services/members/dashboardmember";
import Loader from "@/Component/Loader";

export default function MemberDashboard() {
  const { data, isLoading } = useGetMemberDashboardQuery();
  const { data: notification } = useGetMemberDashboardNotificationQuery();
  const { data: leviesData, isLoading: isLeviesLoading } =
    useGetMemberDashboardFinacialsQuery();

  console.log(notification);

  const memberData = data?.user || {};
  const institutionData = data?.user?.institution || {};

  if (isLoading || isLeviesLoading) {
    return <Loader />;
  }

  const pendingLevies =
    leviesData?.pending_charges?.map((item) => ({
      name: item.title,
      amount: item.amount,
      dueDate: new Date(item.due_date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      status: item.status.toUpperCase(),
    })) || [];

  const notifications =
    notification?.map((item) => ({
      sender: item.title, // use title as sender
      type: item.category, // or item.type if you prefer
      content: item.content,
      time: new Date(item.created_at).toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      read: !!item.read_at,
    })) || [];

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
            <MemberStatusCard
              institutionName={institutionData.institution_name}
              membershipId={institutionData.registration_number}
              status={institutionData.is_approved ? "Active Member" : "Pending"}
              operatingState={institutionData.operating_state}
              category={institutionData.category_type}
            />
          </div>
          <div className="md:col-span-2">
            <SummaryCardGrid
              pendingChargesCount={data?.pending_charges_count || 0}
              nextPayment={data?.next_payment_charges?.[0]}
              certificateCount={data?.certificate_count || 0}
              latestCertificate={data?.latest_certificate}
            />
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
