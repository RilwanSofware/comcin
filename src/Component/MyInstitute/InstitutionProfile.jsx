import React, { useState } from "react";
import profile from "@/assets/profile.png";
import category from "@/assets/neat.png";
import { FiEdit3 } from "react-icons/fi";
import EditInstitutionMediaModal from "@/Component/MyInstitute/EditInstitutionMediaModal";

export default function InstitutionProfile({ personalInfo, refetch }) {
  const [showModal, setShowModal] = useState(false);

  const institution = personalInfo?.user?.institution;

  // Fallbacks
  const coverImage = profile;
  const logoImage = institution?.institution_logo || category;

  return (
    <>
      <div className="bg-white rounded-t-lg border-b border-[#E9EEEA] overflow-hidden">
        {/* Cover Image */}
        <div className="w-full h-40">
          <img
            src={coverImage}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Logo + Details */}
        <div className="flex items-start gap-4 p-4">
          <img
            src={logoImage}
            alt="Category Logo"
            className="w-20 h-20 object-contain rounded-full border-4 border-white bg-white -mt-10"
          />

          <div className="flex justify-between items-start w-full">
            <div>
              <h2 className="text-xl font-medium text-[#1E1E1E]">
                {institution?.institution_name || "Unnamed Institution"}
              </h2>
              <p className="text-sm text-[#1E1E1E]">
                #{institution?.registration_number}
              </p>
              {institution?.is_approved ? (
                <span className="text-xs inline-block mt-2 px-3 py-1 border border-[#8EC79B] rounded bg-[#0A8625] text-white font-medium">
                  Active Membership
                </span>
              ) : (
                <span className="text-xs inline-block mt-2 px-3 py-1 border border-yellow-400 rounded bg-yellow-100 text-yellow-800 font-medium">
                  Pending Approval
                </span>
              )}
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="text-sm text-green-600 hover:underline flex items-center gap-1"
            >
              Edit <FiEdit3 />
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <EditInstitutionMediaModal refetch={refetch} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
