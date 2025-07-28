import React from "react";
import { useForm } from "react-hook-form";
import { AiOutlineCheckCircle } from "react-icons/ai";

export default function SecuritySettings() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      enable2FA: false,
      passwordMinLength: 8,
      alertOnFailedLogin: false,
    },
  });

  const onSubmit = (data) => {
    console.log("Security Settings:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
      <div className="space-y-4">
        {/* Enable Two-Factor Authentication */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="enable2FA"
            {...register("enable2FA")}
            className="w-3 h-3 text-green-600"
          />
          <label htmlFor="enable2FA" className="text-sm font-medium">
            Enable Two Factor Authentication
          </label>
        </div>

        {/* Password Minimum Length */}
        <div>
          <label htmlFor="passwordMinLength" className="block text-sm font-medium mb-1">
            Password Minimum Length
          </label>
          <input
            type="number"
            id="passwordMinLength"
            {...register("passwordMinLength", {
              required: "Password length is required",
              min: { value: 6, message: "Minimum length is 6" },
            })}
            className="w-full md:w-1/2 border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
            min={6}
          />
          {errors.passwordMinLength && (
            <p className="text-red-500 text-sm mt-1">
              {errors.passwordMinLength.message}
            </p>
          )}
        </div>

        {/* Alert on Failed Login */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="alertOnFailedLogin"
            {...register("alertOnFailedLogin")}
            className="w-3 h-3 text-green-600"
          />
          <label htmlFor="alertOnFailedLogin" className="text-sm font-medium">
            Alert on Failed Login
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="bg-[#0A8625] hover:bg-green-700 text-white px-5 py-2 rounded flex items-center gap-2"
        >
          <AiOutlineCheckCircle className="w-5 h-5" />
          Save Details
        </button>
      </div>
    </form>
  );
}
