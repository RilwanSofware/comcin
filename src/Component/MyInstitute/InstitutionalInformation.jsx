import React, { useState } from "react";
import InstitutionalInformationModal from "./InstitutionalInformationModal";

export default function InstitutionalInformation() {
  const [showModal, setShowModal] = useState(false);
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
        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Full Legal Name
          </label>
          <input
            className="border border-[#E9E9E9] outline-none rounded px-3 py-2 text-sm w-full"
            placeholder="Enter your institution’s full legal name"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Date of Registration
          </label>
          <input
            className="border border-[#E9E9E9] outline-none  rounded px-3 py-2 text-sm w-full"
            placeholder="dd/mm/yyyy"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Registration Number
          </label>
          <input
            className="border border-[#E9E9E9] outline-none  rounded px-3 py-2 text-sm w-full"
            value="RG123987654"
            readOnly
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Registration Type
          </label>
          <input
            className="border border-[#E9E9E9] outline-none  rounded px-3 py-2 text-sm w-full"
            value="CAC"
            readOnly
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">State</label>
          <select className="border border-[#E9E9E9] outline-none  rounded px-3 py-2 text-sm w-full">
            <option>Select State</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Phone Number
          </label>
          <div className="flex gap-2">
            <select className="border border-[#E9E9E9] outline-none  rounded px-3 py-2 text-sm w-24">
              <option>+234</option>
            </select>
            <input
              className="border border-[#E9E9E9] outline-none  rounded px-3 py-2 text-sm w-full"
              placeholder="80978654321"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Email</label>
          <input
            className="border border-[#E9E9E9] rounded outline-none  px-3 py-2 text-sm w-full"
            placeholder="Enter email"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Website (if available)
          </label>
          <div className="flex rounded overflow-hidden border border-[#E9E9E9]">
            <span className="bg-gray-100 px-3 py-2 text-sm text-gray-500 flex items-center">
              http://
            </span>
            <input
              className="px-3 py-2 text-sm w-full  focus:outline-none"
              placeholder="Website URL"
            />
          </div>
        </div>

        <div className="col-span-2">
          <label className="block text-sm text-gray-700 mb-1">
            Head Office Address
          </label>
          <input
            className="border border-[#E9E9E9] outline-none  rounded px-3 py-2 text-sm w-full"
            placeholder="Enter address"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm text-gray-700 mb-1">
            Institution’s Mission & Services
          </label>
          <textarea
            className="border border-[#E9E9E9] outline-none rounded px-3 py-2 text-sm w-full"
            rows="3"
            placeholder="Provide a brief description (max 500 characters)"
          />
        </div>
      </div>
      {showModal && (
        <InstitutionalInformationModal onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
