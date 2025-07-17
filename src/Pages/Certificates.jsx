import React from "react";
import { TbCertificate2 } from "react-icons/tb";

export default function Certificates() {
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

        {/* Summary + Cards */}
        <div className="bg-white rounded-lg mb-6 px-4 pt-4 pb-6">
          {/* Summary Header */}
          <div className="border-b border-[#E9EEEA] pb-4">
            <h3 className="text-lg font-maven font-medium text-[#1E1E1E]">
              Issued Certificates
            </h3>
            <p className="text-sm text-[#686868]">2/3 Available</p>
          </div>

          {/* Certificate Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
            {/* Card 1 */}
            <div className="bg-[#F9FEFA] rounded-lg border border-[#E9EEEA] p-5 flex flex-col justify-between h-48">
              <div>
                <h4 className="text-lg font-semibold text-[#0A8625]">
                  Annual Membership Certificate
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  Issued: July 1, 2025
                </p>
                <p className="text-sm text-gray-600">
                  Valid Until: June 30, 2026
                </p>
              </div>
              <div className="flex justify-end mt-4">
                <button className="bg-[#0A8625] text-white text-sm px-4 py-2 rounded hover:bg-green-700 transition">
                  Download
                </button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#F9FEFA] rounded-lg border border-[#E9EEEA] p-5 flex flex-col justify-between h-48">
              <div>
                <h4 className="text-lg font-semibold text-[#0A8625]">
                  Compliance Certificate
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  Issued: April 10, 2025
                </p>
                <p className="text-sm text-gray-600">
                  Valid Until: April 9, 2026
                </p>
              </div>
              <div className="flex justify-end mt-4">
                <button className="bg-[#0A8625] text-white text-sm px-4 py-2 rounded hover:bg-green-700 transition">
                  Download
                </button>
              </div>
            </div>

            {/* Card 3 - Not Yet Available */}
            <div className="bg-[#F9FEFA] border border-[#E9EEEA] rounded-lg p-5 flex flex-col justify-between h-48 opacity-60">
              <div>
                <h4 className="text-lg font-semibold text-gray-500">
                  Operational License
                </h4>
                <p className="text-sm text-gray-500 mt-1">Not Yet Issued</p>
                <p className="text-sm text-gray-500">Valid Until: --</p>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  disabled
                  className="bg-gray-400 text-white text-sm px-4 py-2 rounded cursor-not-allowed"
                >
                  Not Yet Available
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
