import React from "react";
import { TbCertificate2 } from "react-icons/tb";
import { useGetMemberDashboardCertQuery } from "@/services/members/dashboardmember";
import Loader from "@/Component/Loader";

export default function Certificates() {
  const { data, isLoading } = useGetMemberDashboardCertQuery();

  if (isLoading) {
    return <Loader />;
  }

  // Handle "No certificates found"
  if (!data || (data.message && data.message === "No certificates found")) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto py-8 text-center">
          <TbCertificate2 className="text-5xl mx-auto text-gray-400 mb-4" />
          <h1 className="text-xl font-semibold text-gray-700">
            No Certificates Found
          </h1>
          <p className="text-gray-500 mt-2">
            Once certificates are issued, they will appear here.
          </p>
        </div>
      </div>
    );
  }

  // If it's an array of certificates
  const certificates = Array.isArray(data) ? data : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        {/* Header */}
        <div className="flex gap-5 items-center mb-4 px-4">
          <TbCertificate2 className="text-2xl" />
          <h1 className="text-2xl font-maven font-bold text-gray-800">
            Membership Certificates
          </h1>
        </div>

        {/* Certificates List */}
        <div className="bg-white rounded-lg mb-6 px-4 pt-4 pb-6">
          <div className="border-b border-[#E9EEEA] pb-4">
            <h3 className="text-lg font-maven font-medium text-[#1E1E1E]">
              Issued Certificates
            </h3>
            <p className="text-sm text-[#686868]">
              {certificates.length} Available
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="bg-[#F9FEFA] rounded-lg border border-[#E9EEEA] p-5 flex flex-col justify-between h-48"
              >
                <div>
                  <h4 className="text-lg font-semibold text-[#0A8625]">
                    {cert.title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Issued:{" "}
                    {new Date(cert.issued_at).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-sm text-gray-600">
                    Valid Until:{" "}
                    {new Date(cert.expires_at).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex justify-end mt-4">
                  <a
                    href={cert.file_path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#0A8625] text-white text-sm px-4 py-2 rounded hover:bg-green-700 transition"
                  >
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
