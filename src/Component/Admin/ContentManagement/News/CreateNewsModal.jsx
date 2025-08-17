import CustomFileUpload from "@/Component/CustomFileUpload";
import CustomInput from "@/Component/CustomInput";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { BsPatchCheck, BsBookmarkDash } from "react-icons/bs";
import { FaRegTimesCircle } from "react-icons/fa";
import { MdOutlineCancelPresentation } from "react-icons/md";

export default function CreateNewsModal({
  onClose,
  mode = "create",
  initialData,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (mode === "edit" && initialData) {
      reset(initialData); // prefill form fields
    }
  }, [mode, initialData, reset]);

  const onSubmit = (data) => {
    if (mode === "edit") {
      console.log("Updated Data:", data);
    } else {
      console.log("Created Data:", data);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-center px-4">
      <div className="bg-white rounded-2xl border border-[#E9EEEA] w-full max-w-2xl max-h-[90vh] overflow-y-auto p-4 relative shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-maven font-semibold">
            {mode === "edit" ? "Edit Content" : "Create New Content"}
          </h3>
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
            required={mode === "create"} // only required when creating
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
              {mode === "edit" ? "Update Draft" : "Save as Draft"}{" "}
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 bg-[#0A8625] text-white px-6 py-2 rounded hover:bg-green-700"
            >
              <BsPatchCheck size={18} />
              {mode === "edit" ? "Update Content" : "Publish Content"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
