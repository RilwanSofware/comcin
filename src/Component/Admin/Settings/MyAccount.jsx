import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineSave } from "react-icons/ai";
import {
  useGetAdminSettingsAccountQuery,
  useUpdateSettingAccountMutation,
} from "@/services/admin-dashboard/dashboard";
import toast from "react-hot-toast";

export default function MyAccount() {
  const [updateSettingAccount, { isLoading }] =
    useUpdateSettingAccountMutation();
  const { data } = useGetAdminSettingsAccountQuery();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  // Prefill email when data loads
  useEffect(() => {
    if (data && data.data && data.data.email) {
      reset({ email: data.data.email });
    }
  }, [data, reset]);

  const password = watch("password");

  const onSubmit = async (data) => {
    if (data.password !== data.password_confirmation) {
      toast.error("Passwords do not match!");
      return;
    }

    // Prepare FormData for file upload
    const form = new FormData();
    if (data.profile_picture && data.profile_picture[0]) {
      form.append("profile_picture", data.profile_picture[0]);
    }
    if (data.email) form.append("email", data.email);
    if (data.password) form.append("password", data.password);
    if (data.password_confirmation)
      form.append("password_confirmation", data.password_confirmation);

    try {
      await updateSettingAccount(form).unwrap();
      toast.success("Account updated successfully!");
    } catch (err) {
      toast.error("Failed to update account!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-6">
      {/* Profile Picture Upload */}
      <div className="space-y-2">
        <label htmlFor="profilePicture" className="text-sm font-medium">
          Profile Picture
        </label>
        <input
          type="file"
          id="profile_picture"
          {...register("profile_picture")}
          className="block w-full md:w-1/2 border text-sm rounded px-3 py-2"
        />
      </div>

      {/* Email and Password side-by-side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Update Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Update Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            placeholder="e.g. yourname@example.com"
            className="w-full text-sm border rounded px-3 py-2 focus:outline-none"
          />
        </div>

        {/* Change Password */}
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Change Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password")}
            placeholder="••••••••"
            className="w-full border text-sm rounded px-3 py-2 focus:outline-none"
          />
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <label
            htmlFor="password_confirmation"
            className="text-sm font-medium"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="password_confirmation"
            {...register("password_confirmation", {
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            placeholder="••••••••"
            className="w-full border text-sm rounded px-3 py-2 focus:outline-none"
          />
          {errors.password_confirmation && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password_confirmation.message}
            </p>
          )}
        </div>
      </div>

      {/* Save Button */}
      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-[#0A8625] hover:bg-green-700 text-white px-5 py-2 rounded flex items-center gap-2"
        >
          <AiOutlineSave className="w-5 h-5" />
          {isLoading ? "Saving..." : "Save Details"}
        </button>
      </div>
    </form>
  );
}
