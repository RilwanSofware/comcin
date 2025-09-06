import React, { useRef, useState } from "react";
import { FiX, FiEdit3 } from "react-icons/fi";
import { VscCloudUpload } from "react-icons/vsc";
import category from "@/assets/neat.png";
import profile from "@/assets/profile.png";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { useEditMemberDashboardMutation } from "@/services/members/dashboardmember";
import toast from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";

export default function EditInstitutionMediaModal({
  onClose,
  logoImage,
  coverImage,
  refetch,
}) {
  const [editMemberDashboard] = useEditMemberDashboardMutation();
  const [isLoading, setIsLoading] = useState(false);
  const bannerInputRef = useRef(null);
  const categoryInputRef = useRef(null);

  const [bannerPreview, setBannerPreview] = useState(null);
  const [categoryPreview, setCategoryPreview] = useState(null);

  // Trigger file inputs
  const handleBannerClick = () => bannerInputRef.current?.click();
  const handleCategoryClick = () => categoryInputRef.current?.click();

  // Handle file changes
  const handleFileChange = async (file, type) => {
    setIsLoading(true);
    if (!file) return;

    // Preview
    const previewUrl = URL.createObjectURL(file);
    if (type === "institution_banner") setBannerPreview(previewUrl);
    if (type === "institution_logo") setCategoryPreview(previewUrl);

    // Send to backend
    const formData = new FormData();
    formData.append(type, file);

    try {
      await editMemberDashboard(formData).unwrap();
      toast.success(
        `${
          type == "institution_logo" ? "Logo" : "Banner"
        } uploaded successfully`
      );
      refetch();
    } catch (error) {
      console.error(`Error uploading ${type}:`, error);
    } finally {
      setIsLoading(false);
    }
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
            src={bannerPreview || coverImage} // fallback
            alt="Banner"
            className="w-full h-32 sm:h-40 object-cover rounded"
          />
        </div>

        {/* Category image and Replace button */}
        <div className="inline-flex flex-col items-start gap-2 -mt-10 ml-6">
          <img
            src={categoryPreview || logoImage} // fallback
            alt="Logo"
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
            onChange={(e) =>
              handleFileChange(e.target.files?.[0], "institution_logo")
            }
          />
        </div>

        {/* Instructions + Upload for Banner */}
        <div
          className="inline-flex flex-col mt-4 ml-24 items-center cursor-pointer"
          onClick={handleBannerClick}
        >
          {isLoading ? (
            <span className="flex text-yellow-600 text-sm items-center space-x-4">
              <CgSpinner size={25} className="rotate animate-spin" />{" "}
              Uploading...
            </span>
          ) : (
            <VscCloudUpload size={25} />
          )}
          <p className="text-green-700 text-sm font-medium">
            Add a banner{" "}
            <span className="text-gray-600 font-normal">or drag and drop</span>
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Optimal dimensions 763 × 120px
          </p>
          <input
            ref={bannerInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) =>
              handleFileChange(e.target.files?.[0], "institution_banner")
            }
          />
        </div>
      </div>
    </div>
  );
}
