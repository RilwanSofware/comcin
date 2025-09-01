import CustomFileUpload from "@/Component/CustomFileUpload";
import CustomInput from "@/Component/CustomInput";
import UploadedFiles from "@/Component/MyInstitute/UploadedFiles";
import {
  useCreateContentMutation,
  useUpdateContentMutation,
} from "@/services/admin-dashboard/dashboard";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BsPatchCheck, BsBookmarkDash } from "react-icons/bs";
import { FaRegTimesCircle } from "react-icons/fa";
import { MdOutlineCancelPresentation } from "react-icons/md";

export default function ViewIntituition({ onClose, initialData }) {
  console.log(initialData);
  const [createContent, { isLoading: createLoading }] =
    useCreateContentMutation();
  const [updateContent, { isLoading: updateLoading }] =
    useUpdateContentMutation();
  console.log(initialData);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const [preview, setPreview] = useState(null);
  // Watch the file input
  const watchFile = watch("image");

  // Update preview when file changes
  useEffect(() => {
    if (watchFile && watchFile.length > 0 && mode === "create") {
      const file = watchFile[0];
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      // cleanup old objectURL to avoid memory leaks
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [watchFile]);

  const onSubmit = async (data) => {
    const file = typeof data.image == "string" ? data.image : data.image?.[0]; // File object

    const formData = new FormData();
    formData.append("status", data.status);
    formData.append("content", data.content);
    formData.append("category", data.category);
    formData.append("summary", data.summary);
    formData.append("title", data.title);
    if (file) {
      formData.append("image", file);
    }

    // 🔥 Properly inspect FormData
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    if (mode === "edit") {
      try {
        console.log("Updated Data ✅");
        await updateContent({ id: initialData?.id, formData }).unwrap();
        toast.success("Content updated successfully");
        refetch();
      } catch (error) {
        console.log(error);
        toast.error(error?.data?.message || "Update failed");
      }
    } else {
      try {
        const res = await createContent(formData);
        console.log(res, "Create Content Response");
        toast.success("Content created successfully");
        refetch();
      } catch (error) {
        console.log(error);
        toast.error(error?.data?.message || "Creation failed");
      }
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-center px-4">
      <div className="bg-white rounded-2xl border border-[#E9EEEA] w-full max-w-2xl max-h-[90vh] overflow-y-auto p-4 relative shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-maven font-semibold">Instituition</h3>
          <button
            onClick={onClose}
            className="text-red-600 hover:scale-110 transition"
          >
            <MdOutlineCancelPresentation size={24} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded border border-[#E9EEEA] p-4 space-y-2"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomInput
              label="Instituition Name"
              name="institution_name"
              register={register}
              placeholder="Enter Content Title"
              errors={errors}
              value={initialData?.institution_name}
              disabled
            />

            <CustomInput
              label="Instituition Type"
              name="institution_type"
              register={register}
              errors={errors}
              value={initialData?.institution_type}
              disabled
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomInput
              label="Date of Establishment Name"
              name="date_of_establishment
"
              register={register}
              errors={errors}
              value={new Date(
                initialData?.date_of_establishment
              ).toDateString()}
              disabled
            />

            <CustomInput
              label="Description"
              name="descriptions"
              register={register}
              errors={errors}
              value={initialData?.descriptions}
              disabled
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomInput
              label="Business Operation Address"
              name="business_operation_address
"
              register={register}
              errors={errors}
              value={initialData?.business_operation_address}
              disabled
            />

            <CustomInput
              label="Operating State"
              name="operating_state"
              register={register}
              errors={errors}
              value={initialData?.operating_state}
              disabled
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomInput
              label="Head Office Address"
              name="head_office
"
              register={register}
              errors={errors}
              value={initialData?.head_office}
              disabled
            />

            <CustomInput
              label="Approval"
              name="is_approved"
              register={register}
              errors={errors}
              value={initialData?.is_approved ? "Approved" : "Not Approved"}
              disabled
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomInput
              label="Regulatory Body"
              name="regulatory_body
"
              register={register}
              errors={errors}
              value={initialData?.regulatory_body}
              disabled
            />

            <CustomInput
              label="Registration Number"
              name="registration_number"
              register={register}
              errors={errors}
              value={initialData?.registration_number}
              disabled
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomInput
              label="Status"
              name="status
"
              register={register}
              errors={errors}
              value={initialData?.status}
              disabled
            />

            <CustomInput
              label="Website URL"
              name="website_url
"
              register={register}
              errors={errors}
              value={initialData?.website_url}
              disabled
            />
          </div>

          {/* File Upload */}
         <UploadedFiles files={initialData} />
          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-2 px-4 py-2 rounded bg-[#B20B0B] text-white"
            >
              <FaRegTimesCircle size={18} />
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
