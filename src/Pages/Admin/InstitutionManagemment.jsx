import InstitutionStatCard from "@/Component/Admin/Institutions/InstitutionStatCard";
import InstitutionTable from "@/Component/Admin/Institutions/InstitutionTable";
import MembershipTable from "@/Component/Admin/Membership/MembershipTable";
import MemberStatCard from "@/Component/Admin/Membership/MemberStatCard";
import React from "react";
import { LuArrowDownToLine } from "react-icons/lu";
import { useGetAdminInstitutionQuery } from "@/services/admin-dashboard/dashboard";
import Loader from "@/Component/Loader";

export default function InstitutionManagemment() {
  const {data, isLoading} = useGetAdminInstitutionQuery();

   if (isLoading) {
      return <Loader />;
    }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-start sm:justify-between sm:items-center">
        <div className="block gap-5 items-center mb-4 px-4">
          <h1 className="text-2xl font-maven font-bold text-gray-800">
            Institutions Management
          </h1>
          <p className="text-sm text-gray-500">
            Review and manage membership applications from institutions acress
            Nigeria.
          </p>
        </div>
        <button className="flex items-center bg-[#0A8625] hover:bg-green-700 text-white text-sm px-4 py-2 rounded">
          <LuArrowDownToLine /> Export Report
        </button>
      </div>

      <InstitutionStatCard cardData={data?.data} />
      <InstitutionTable membersList={data?.data?.members_list} />
    </div>
  );
}
