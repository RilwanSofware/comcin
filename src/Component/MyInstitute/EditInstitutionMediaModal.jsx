import React, { useRef } from "react";
import { FiX, FiEdit3 } from "react-icons/fi";
import { VscCloudUpload } from "react-icons/vsc";
import category from "@/assets/neat.png";
import profile from "@/assets/profile.png";
import { MdOutlineCancelPresentation } from "react-icons/md";

export default function EditInstitutionMediaModal({ onClose }) {
  const bannerInputRef = useRef(null);
  const categoryInputRef = useRef(null);

  const handleBannerClick = () => {
    bannerInputRef.current?.click();
  };

  const handleCategoryClick = () => {
    categoryInputRef.current?.click();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-center px-4">
      <div className="bg-white rounded-lg w-full max-w-2xl p-8 relative shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-red-600 hover:scale-110 transition"
        >
          <MdOutlineCancelPresentation size={20} />
        </button>

        {/* Banner */}
        <div className="w-full rounded overflow-hidden">
          <img
            src={profile}
            alt="Banner"
            className="w-full h-32 sm:h-40 object-cover rounded"
          />
        </div>

        {/* Category image and Replace button */}
        <div className="inline-flex flex-col items-start gap-2 -mt-10 ml-6">
          <img
            src={category}
            alt="Category Logo"
            className="w-20 h-20 rounded-full object-contain border-4 border-white bg-white"
          />
          <button
            onClick={handleCategoryClick}
            className="text-green-600 text-sm font-medium flex items-center gap-1"
          >
            Replace <FiEdit3 size={14} />
          </button>
          <input
            ref={categoryInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              // Handle category image change
              const file = e.target.files[0];
              console.log("Category image selected:", file);
            }}
          />
        </div>

        {/* Instructions + Upload for Banner */}
        <div
          className="inline-flex flex-col mt-4 ml-24 items-center cursor-pointer"
          onClick={handleBannerClick}
        >
          <VscCloudUpload />
          <p className="text-green-700 text-sm font-medium">
            Add a banner <span className="text-gray-600 font-normal">or drag and drop</span>
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Optimal dimensions 763 × 120px
          </p>
          <input
            ref={bannerInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              // Handle banner image change
              const file = e.target.files[0];
              console.log("Banner image selected:", file);
            }}
          />
        </div>
      </div>
    </div>
  );
}
