import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineCheckCircle } from "react-icons/ai";
import {
  useGetAdminSecurityQuery,
  useUpdateSecurityMutation,
} from "@/services/admin-dashboard/dashboard";
import toast from "react-hot-toast";

export default function SecuritySettings() {
  const { data , refetch} = useGetAdminSecurityQuery();
  const [updateSecurity, { isLoading }] = useUpdateSecurityMutation();


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      enable_2fa: false,
      min_password_length: 8,
      alert_failed_attempt: false,
    },
  });

  useEffect(() => {
    if (data && data.data) {
      reset({
        enable_2fa: !!data.data.enable_2fa,
        min_password_length: data.data.min_password_length || 8,
        alert_failed_attempt: !!data.data.alert_failed_attempt,
      });
    }
  }, [data, reset]);

  const onSubmit = async (formData) => {
    const payload = {
      enable_2fa: !!formData.enable_2fa,
      min_password_length: Number(formData.min_password_length),
      alert_failed_attempt: !!formData.alert_failed_attempt,
    };
    try {
      await updateSecurity(payload).unwrap();
      // Show success message here if needed
      toast.success("Security settings updated successfully!");
      refetch();
    } catch (err) {
      // Show error message here if needed
      toast.error("Failed to save security settings!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
      <div className="space-y-4">
        {/* Enable Two-Factor Authentication */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="enable_2fa"
            {...register("enable_2fa")}
            className="w-3 h-3 text-green-600"
          />
          <label htmlFor="enable_2fa" className="text-sm font-medium">
            Enable Two Factor Authentication
          </label>
        </div>

        {/* Password Minimum Length */}
        <div>
          <label
            htmlFor="min_password_length"
            className="block text-sm font-medium mb-1"
          >
            Password Minimum Length
          </label>
          <input
            type="number"
            id="min_password_length"
            {...register("min_password_length", {
              required: "Password length is required",
              min: { value: 6, message: "Minimum length is 6" },
            })}
            className="w-full md:w-1/2 border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
            min={6}
          />
          {errors.min_password_length && (
            <p className="text-red-500 text-sm mt-1">
              {errors.min_password_length.message}
            </p>
          )}
        </div>

        {/* Alert on Failed Login */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="alert_failed_attempt"
            {...register("alert_failed_attempt", { required: true })}
            className="w-3 h-3 text-green-600"
          />
          <label htmlFor="alert_failed_attempt" className="text-sm font-medium">
            Alert on Failed Login
          </label>
        </div>
        {errors.alert_failed_attempt && (
          <p className="text-red-500 text-sm mt-1">This field is required</p>
        )}
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-[#0A8625] hover:bg-green-700 text-white px-5 py-2 rounded flex items-center gap-2"
        >
          <AiOutlineCheckCircle className="w-5 h-5" />
          {isLoading ? "Saving..." : "Save Details"}
        </button>
      </div>
    </form>
  );
}
