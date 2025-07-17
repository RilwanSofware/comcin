import React from "react";
import { SlCloudUpload } from "react-icons/sl";

export default function CustomFileUpload({
  label,
  name,
  register,
  required,
  accept = ".jpg,.jpeg,.png,.pdf",
  errors,
}) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer bg-gray-50 hover:border-[#0A8625] transition">
        <div className="flex flex-col items-center justify-center space-y-2">
          <SlCloudUpload className="text-3xl text-[#0A8625]" />
          <p className="text-sm text-gray-600 font-medium">
            Upload a file or drag and drop
          </p>
          <p className="text-xs text-gray-400">
            PDF, JPG, PNG up to 10MB
          </p>
        </div>

        <input
          type="file"
          {...register(name, { required })}
          accept={accept}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>

      {errors[name] && (
        <p className="text-xs text-red-500 mt-1">This file is required</p>
      )}
    </div>
  );
}
