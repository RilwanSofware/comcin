import React from "react";
import { BiSupport } from "react-icons/bi";
import SupportForm from "../Component/Support/SupportForm";
import ContactCard from "../Component/Support/ContactCard";
import SupportTicket from "../Component/Support/SupportTicket";
import { useGetMemberDashboardTicketsQuery } from "@/services/members/dashboardmember";
import Loader from "@/Component/Loader";

export default function Support() {
  const { data, refetch, isLoading } = useGetMemberDashboardTicketsQuery();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        {/* Header */}
        <div className="flex gap-5 items-center mb-4 px-4">
          <BiSupport className="text-2xl" />
          <h1 className="text-2xl font-maven font-bold text-gray-800">
            Support Center
          </h1>
        </div>
        <div className="grid [grid-template-columns:3fr_2fr] gap-6 mt-6">
          <div className="w-full">
            <SupportForm refetch={refetch} />
          </div>
          <div className="w-full">
            <ContactCard />
          </div>
        </div>
        <SupportTicket tickets={data} />
      </div>
    </div>
  );
}
