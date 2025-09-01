import CustomFileUpload from "@/Component/CustomFileUpload";
import CustomInput from "@/Component/CustomInput";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsPatchCheck, BsBookmarkDash } from "react-icons/bs";
import { FaRegTimesCircle } from "react-icons/fa";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { useApproveRequestSuportMutation } from "@/services/admin-dashboard/dashboard";
import toast from "react-hot-toast";

export default function SupportRequestModal({
  onClose,
  mode = "create",
  initialData,
}) {
  const [approveRequestSuport, { isLoading }] =
    useApproveRequestSuportMutation();

  // Map API fields to form fields
  const defaultValues = {
    title: initialData?.subject || "",
    description: initialData?.message || "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  useEffect(() => {
    if (mode === "edit" && initialData) {
      reset(defaultValues); // prefill form fields
    }
  }, [mode, initialData, reset]);

  // Format date
  const formattedDate = initialData?.created_at
    ? new Date(initialData.created_at).toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  // console.log("initialData:", initialData);

  // Handle submit
  const onSubmit = async (data) => {
    if (mode === "edit") {
      try {
        await approveRequestSuport({
          user_id: initialData?.user_id,
          data: { action: "approve" },
        }).unwrap();
        toast.success("Support request marked as resolved!");
        onClose();
      } catch (error) {
        toast.error(
          error?.data?.message || "Failed to resolve support request"
        );
      }
    } else {
      // Handle create mode if needed
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-center px-4">
      <div className="bg-white rounded-2xl border border-[#E9EEEA] w-full max-w-2xl max-h-[90vh] overflow-y-auto p-4 relative shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-maven font-semibold">Support Request</h3>
          <button
            onClick={onClose}
            className="text-red-600 hover:scale-110 transition"
          >
            <MdOutlineCancelPresentation size={24} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded border border-[#E9EEEA] p-4 space-y-4"
        >
          {/* Avatar + name/email + date */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-200 flex items-center justify-center text-lg font-bold text-green-800">
                {initialData?.name?.[0] || "A"}
              </div>
              <div>
                <p className="font-semibold text-gray-800">
                  {initialData?.name}
                </p>
                <p className="text-sm text-gray-500">{initialData?.email}</p>
              </div>
            </div>
            <span className="text-sm text-gray-400">{formattedDate} </span>
          </div>

          {/* Title */}
          <CustomInput
            label="Subject"
            name="title"
            required={true}
            register={register}
            placeholder="Enter Content Title"
            errors={errors}
          />

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Brief Description <span className="text-red-600">*</span>
            </label>
            <textarea
              {...register("description", { required: true })}
              rows={4}
              placeholder="Stay updated with the latest developments in the Nigerian microfinance sector and COMCIN activities."
              className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2"
            />
            {errors.description && (
              <span className="text-red-500 text-sm">
                Description is required
              </span>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            {/* {mode === "edit" && (
              <button
                type="button"
                onClick={onClose}
                className="flex items-center gap-2 px-4 py-2 rounded bg-[#B20B0B] text-white"
              >
                <FaRegTimesCircle size={18} />
                Delete Support
              </button>
            )} */}
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-2 px-4 py-2 rounded bg-[#FFEDD5] text-[#C2410C] transition"
            >
              <BsBookmarkDash size={18} />
              {mode === "edit" ? "Keep as Pending" : "Save as Draft"}
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 bg-[#0A8625] text-white px-6 py-2 rounded hover:bg-green-700"
            >
              <BsPatchCheck size={18} />
              {mode === "edit" ? "Mark as Resolved" : "Publish Content"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
