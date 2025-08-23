import CustomInput from "@/Component/CustomInput";
import React from "react";
import { useForm } from "react-hook-form";
import { BsCheck2Circle } from "react-icons/bs";
import { FaRegTimesCircle } from "react-icons/fa";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { useUpdateAdminMutation } from "@/services/admin-dashboard/dashboard";

export default function EditUserModals({ onClose, user, refetch }) {
  const [updateAdmin, { isLoading }] = useUpdateAdminMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: user.name?.split(" ")[0] || "",
      lastName: user.name?.split(" ").slice(1).join(" ") || "",
      username: user.name?.toLowerCase().replace(/\s/g, "") || "",
      email: user.email || "",
      phone: "+2348012345678",
      role: user.role || "",
      status: user.status || "",
    },
  });

  const onSubmit = (data) => {
    console.log("Edited Data:", data);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-center px-4">
      <div className="bg-white rounded-2xl border border-[#E9EEEA] w-full max-w-xl max-h-[90vh] overflow-y-auto p-4 relative shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-maven font-semibold">Admin Details</h3>
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
          {/* Full Name & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomInput
              label="Full Name"
              name="fullName"
              register={register}
              required
              placeholder="Enter full name"
              errors={errors}
            />
            <CustomInput
              label="Last Name"
              name="lastName"
              register={register}
              required
              placeholder="Enter last name"
              errors={errors}
            />
          </div>

          {/* Username */}
          <CustomInput
            label="Username"
            name="username"
            register={register}
            required
            placeholder="Enter username"
            errors={errors}
          />

          {/* Email & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomInput
              label="Email"
              name="email"
              type="email"
              register={register}
              required
              placeholder="e.g. contact@institution.com"
              errors={errors}
            />
            <CustomInput
              label="Phone Number"
              name="phone"
              type="tel"
              register={register}
              required
              placeholder="+234 801 234 5678"
              errors={errors}
            />
          </div>

          {/* Role & Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Role</label>
              <select
                {...register("role", { required: true })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="">Select role</option>
                <option value="Admin">Admin</option>
                <option value="Supervisor">Supervisor</option>
                <option value="Manager">Manager</option>
                <option value="Super Admin">Super Admin</option>
                <option value="Membership Review">Membership Review</option>
                <option value="Cooperative Society">Cooperative Society</option>
              </select>
              {errors.role && (
                <span className="text-red-500 text-sm">Role is required</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                {...register("status", { required: true })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="">Select status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Suspended">Suspended</option>
              </select>
              {errors.status && (
                <span className="text-red-500 text-sm">Status is required</span>
              )}
            </div>
          </div>

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
              type="submit"
              className="flex items-center gap-2 bg-[#0A8625] text-white px-6 py-2 rounded"
            >
              <BsCheck2Circle size={18} />
              Confirm{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
