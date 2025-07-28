import React from "react";
import { useForm } from "react-hook-form";
import { AiOutlineCheckCircle } from "react-icons/ai";

export default function Notification() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      newMemberApplication: false,
      paymentConfirmation: false,
      complianceReminder: false,
    },
  });

  const onSubmit = (data) => {
    console.log("Notification Settings:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-6">
      <div className="space-y-4">
        {/* New Member Application */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="newMemberApplication"
            {...register("newMemberApplication")}
            className="w-3 h-3 text-green-600"
          />
          <label htmlFor="newMemberApplication" className="text-sm font-medium">
            New Member Application
          </label>
        </div>

        {/* Payment Confirmation */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="paymentConfirmation"
            {...register("paymentConfirmation")}
            className="w-3 h-3 text-green-600"
          />
          <label htmlFor="paymentConfirmation" className="text-sm font-medium">
            Payment Confirmation
          </label>
        </div>

        {/* Compliance Reminder */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="complianceReminder"
            {...register("complianceReminder")}
            className="w-3 h-3 text-green-600"
          />
          <label htmlFor="complianceReminder" className="text-sm font-medium">
            Compliance Reminder
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
