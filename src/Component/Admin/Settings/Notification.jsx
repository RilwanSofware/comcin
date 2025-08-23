import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineCheckCircle } from "react-icons/ai";
import {
  useGetAdminSettingsNotificationQuery,
  useUpdateSettingNotificationMutation,
} from "@/services/admin-dashboard/dashboard";
import toast from "react-hot-toast";

export default function Notification() {
  const { data } = useGetAdminSettingsNotificationQuery();
  const [updateSettingNotification, { isLoading }] =
    useUpdateSettingNotificationMutation();

console.log("Sata", data)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      new_member: false,
      payment_confirmation: false,
      compliance_reminder: false,
    },
  });

  // Prefill form with GET data
  useEffect(() => {
    if (data && data.data) {
      reset({
        new_member: !!data.data.new_member,
        payment_confirmation: !!data.data.payment_confirmation,
        compliance_reminder: !!data.data.compliance_reminder,
      });
    }
  }, [data, reset]);

  const onSubmit = async (formData) => {
    const payload = {
      new_member: !!formData.new_member,
      payment_confirmation: !!formData.payment_confirmation,
      compliance_reminder: !!formData.compliance_reminder,
    };
    try {
      await updateSettingNotification(payload).unwrap();
      toast.success("Notification settings updated!");
    } catch (err) {
      toast.error("Failed to update notification settings!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-6">
      <div className="space-y-4">
        {/* New Member Application */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="new_member"
            {...register("new_member")}
            className="w-3 h-3 text-green-600"
          />
          <label htmlFor="new_member" className="text-sm font-medium">
            New Member Application
          </label>
        </div>

        {/* Payment Confirmation */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="payment_confirmation"
            {...register("payment_confirmation")}
            className="w-3 h-3 text-green-600"
          />
          <label htmlFor="payment_confirmation" className="text-sm font-medium">
            Payment Confirmation
          </label>
        </div>

        {/* Compliance Reminder */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="compliance_reminder"
            {...register("compliance_reminder")}
            className="w-3 h-3 text-green-600"
          />
          <label htmlFor="compliance_reminder" className="text-sm font-medium">
            Compliance Reminder
          </label>
        </div>
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
