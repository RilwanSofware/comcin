import React from "react";
import { BiBuildings } from "react-icons/bi";
import InstitutionProfile from "@/Component/MyInstitute/InstitutionProfile";
import InstitutionalInformation from "@/Component/MyInstitute/InstitutionalInformation";
import KeyContactPerson from "@/Component/MyInstitute/KeyContactPerson";
import UploadedFiles from "@/Component/MyInstitute/UploadedFiles";
import {
  useGetMemberDashboardInstitutionQuery,
  useGetMemberDashboardQuery,
  useGetMemberDashboardEditUserQuery,
} from "@/services/members/dashboardmember";
import Loader from "@/Component/Loader";

export default function MyInstitution() {
  const { data, isLoading } = useGetMemberDashboardInstitutionQuery();
  const { data: personalInfo , refetch} = useGetMemberDashboardQuery();
  const { data: edituser } = useGetMemberDashboardEditUserQuery();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        {/* Page Header */}
        <div className="flex gap-5 items-center mb-4 px-4">
          <BiBuildings className="text-2xl" />
          <h1 className="text-2xl font-maven font-bold text-gray-800">
            My Institution
          </h1>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6 mt-6 px-4">
          {/* Left Column: Profile + Institutional Info */}
          <div className="flex flex-col">
            <InstitutionProfile personalInfo={personalInfo} refetch={refetch} />
            <InstitutionalInformation
              institution={data?.institution}
              personalInfo={personalInfo}
            />
          </div>

          {/* Right Column: Key Contact + Uploaded Files */}
          <div className="flex flex-col gap-6">
            <KeyContactPerson />
            <UploadedFiles files={data?.institution} />
          </div>
        </div>
      </div>
    </div>
  );
}
