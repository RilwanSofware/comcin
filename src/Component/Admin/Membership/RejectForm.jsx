import React, { useState } from "react";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { useForm } from "react-hook-form";

export default function RejectForm({ onClose, onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [charCount, setCharCount] = useState(0);

  const handleDescriptionChange = (e) => {
    setCharCount(e.target.value.length);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-center px-4">
      <div className="bg-white rounded-2xl border border-[#E9EEEA] w-full max-w-xl max-h-[90vh] overflow-y-auto p-4 relative shadow-lg">
        <div className="rounded-2xl border border-[#E9EEEA] p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-red-600 hover:scale-110 transition"
          >
            <MdOutlineCancelPresentation size={20} />
          </button>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                {...register("status", { required: true })}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">Select status</option>
                <option value="reject">Reject</option>
              </select>
              {errors.status && (
                <p className="text-xs text-red-500 mt-1">
                  Status is required
                </p>
              )}
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reason for Rejection <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("rejection_reason", {
                  required: true,
                  maxLength: 500,
                  onChange: handleDescriptionChange,
                })}
                placeholder="State reason for rejection (max 500 characters)"
                className="w-full border text-sm border-gray-300 rounded-md px-3 py-2 resize-none"
                rows={4}
              />
              <div className="text-sm text-gray-500 mt-1 text-right">
                {charCount}/500 characters
              </div>
              {errors.rejection_reason && (
                <p className="text-xs text-red-500 mt-1">
                  This field is required
                </p>
              )}
            </div>
            <div className="col-span-2 flex justify-end mt-4">
              <button
                type="submit"
                className="bg-[#0A8625] text-white px-6 py-2 text-sm rounded hover:bg-green-700 transition"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}