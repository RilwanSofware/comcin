import CustomFileUpload from "@/Component/CustomFileUpload";
import CustomInput from "@/Component/CustomInput";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { BsPatchCheck, BsBookmarkDash } from "react-icons/bs";
import { FaRegTimesCircle } from "react-icons/fa";
import { MdOutlineCancelPresentation } from "react-icons/md";
import coverImage from "@/assets/profile.png";
import { useGetAdminSingleApplicationQuery } from "@/services/admin-dashboard/dashboard";

export default function ApplicationModal({ onClose, initialData }) {
  const { data: singleApp } = useGetAdminSingleApplicationQuery({
    user_id: initialData?.user_id,
  });
  console.log("singleApp", singleApp);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);
  console.log("initialData", initialData);

  const onSubmit = (data) => {
    console.log("Sumitting", data);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-center px-4">
      <div className="bg-white rounded-2xl border border-[#E9EEEA] w-full max-w-2xl max-h-[90vh] overflow-y-auto p-4 relative shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-maven font-semibold">
            Registration Details{" "}
          </h3>
          <button
            onClick={onClose}
            className="text-red-600 hover:scale-110 transition"
          >
            <MdOutlineCancelPresentation size={24} />
          </button>
        </div>

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
              src={coverImage}
              alt="Category Logo"
              className="w-20 h-20 object-contain rounded-full border-4 border-white bg-white -mt-10"
            />

            <div className="flex justify-between items-start w-full">
              <div>
                <h2 className="text-xl font-medium text-[#1E1E1E]">
                  {"Unnamed Institution"}
                </h2>
                {/* {institution?.is_approved ? (
                  <span className="text-xs inline-block mt-2 px-3 py-1 border border-[#8EC79B] rounded bg-[#0A8625] text-white font-medium">
                    Active Membership
                  </span>
                ) : (
                  <span className="text-xs inline-block mt-2 px-3 py-1 border border-yellow-400 rounded bg-yellow-100 text-yellow-800 font-medium">
                    Pending Approval
                  </span>
                )} */}
              </div>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded border border-[#E9EEEA] p-4 space-y-2"
        >
          {/* Title */}
          <CustomInput
            label="Content Title"
            name="title"
            register={register}
            placeholder="Enter Content Title"
            errors={errors}
          />

          {/* Category & Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                {...register("type", { required: true })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="">Select type</option>
                <option value="Cooperative Society">Cooperative Society</option>
                <option value="Microfinance Bank">Microfinance Bank</option>
              </select>
              {errors.type && (
                <span className="text-red-500 text-sm">
                  Category is required
                </span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input
                type="date"
                {...register("date", { required: true })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
              {errors.date && (
                <span className="text-red-500 text-sm">Date is required</span>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              {...register("description", { required: true })}
              rows={4}
              placeholder="Enter content description"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
            {errors.description && (
              <span className="text-red-500 text-sm">
                Description is required
              </span>
            )}
          </div>

          {/* File Upload */}
          <CustomFileUpload
            label="Upload Image/Poster *"
            name="posterImage"
            register={register}
            required={true}
            errors={errors}
          />

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
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-2 px-4 py-2 rounded bg-[#FFEDD5] text-[#C2410C] transition"
            >
              {" "}
              <BsBookmarkDash size={18} />
              Reject{" "}
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 bg-[#0A8625] text-white px-6 py-2 rounded hover:bg-green-700"
            >
              <BsPatchCheck size={18} />
              Approve
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
