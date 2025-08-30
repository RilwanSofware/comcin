import React, { useState } from "react";
import InstitutionalInformationModal from "./InstitutionalInformationModal";

export default function InstitutionalInformation({
  institution,
  personalInfo,
}) {
  const [showModal, setShowModal] = useState(false);
console.log(institution);
  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-maven font-semibold text-gray-800">
          Institutional Information
        </h3>
        <button
          onClick={() => setShowModal(true)}
          className="text-sm text-white bg-[#0A8625] px-4 py-1 rounded hover:bg-green-700 transition"
        >
          Edit
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Legal Name */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Full Legal Name
          </label>
          <input
            className="border border-[#E9E9E9] outline-none rounded px-3 py-2 text-sm w-full"
            value={institution?.institution_name || ""}
            readOnly
          />
        </div>

        {/* Date of Registration */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Date of Registration
          </label>
          <input
            className="border border-[#E9E9E9] outline-none  rounded px-3 py-2 text-sm w-full"
            value={
              institution?.date_of_establishment
                ? new Date(
                    institution.date_of_establishment
                  ).toLocaleDateString()
                : ""
            }
            readOnly
          />
        </div>

        {/* Registration Number */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Registration Number
          </label>
          <input
            className="border border-[#E9E9E9] outline-none  rounded px-3 py-2 text-sm w-full"
            value={institution?.registration_number || ""}
            readOnly
          />
        </div>

        {/* Registration Type */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Registration Type
          </label>
          <input
            className="border border-[#E9E9E9] outline-none  rounded px-3 py-2 text-sm w-full"
            value={institution?.institution_type || ""}
            readOnly
          />
        </div>

        {/* State */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">State</label>
          <input
            className="border border-[#E9E9E9] outline-none  rounded px-3 py-2 text-sm w-full"
            value={institution?.operating_state || ""}
            readOnly
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            className="border border-[#E9E9E9] outline-none  rounded px-3 py-2 text-sm w-full"
            value={personalInfo?.user?.phone_number || "N/A"}
            readOnly
          />
        </div>
          {/* Phone Number */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Email
          </label>
          <input
            className="border border-[#E9E9E9] outline-none  rounded px-3 py-2 text-sm w-full"
            value={personalInfo?.user?.email || "N/A"}
            readOnly
          />
        </div>

        {/* Website */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Website (if available)
          </label>
          <input
            className="border border-[#E9E9E9] outline-none  rounded px-3 py-2 text-sm w-full"
            value={institution?.website_url || ""}
            readOnly
          />
        </div>

        {/* Head Office Address */}
        <div className="col-span-2">
          <label className="block text-sm text-gray-700 mb-1">
            Head Office Address
          </label>
          <input
            className="border border-[#E9E9E9] outline-none  rounded px-3 py-2 text-sm w-full"
            value={institution?.head_office || ""}
            readOnly
          />
        </div>

        {/* Description */}
        <div className="col-span-2">
          <label className="block text-sm text-gray-700 mb-1">
            Institution’s Mission & Services
          </label>
          <textarea
            className="border border-[#E9E9E9] outline-none rounded px-3 py-2 text-sm w-full"
            rows="3"
            value={institution?.descriptions || ""}
            readOnly
          />
        </div>
      </div>

      {showModal && (
        <InstitutionalInformationModal
          initialData={institution}
          personalInfo={personalInfo}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
