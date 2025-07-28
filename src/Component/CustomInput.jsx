import React from "react";

export default function CustomInput({
  label,
  name,
  register,
  required,
  type = "text",
  placeholder,
  errors,
  className = "",
  ...rest
}) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        {...register(name, { required })}
        placeholder={placeholder}
        className={`w-full border border-gray-300 text-sm rounded-md px-3 py-2 focus:outline-none ${className}`}
        {...rest}
      />
      {errors[name] && (
        <p className="text-xs text-red-500 mt-1">This field is required</p>
      )}
    </div>
  );
}
