import CustomInput from "@/Component/CustomInput";
import React from "react";
import { useForm } from "react-hook-form";
import { BsCheck2Circle } from "react-icons/bs";
import { FaRegTimesCircle } from "react-icons/fa";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { useCreateAdminMutation } from "@/services/admin-dashboard/dashboard";
import toast from "react-hot-toast";

export default function CreateUserModal({ onClose, refetch }) {
  const [createAdmin, { isLoading }] = useCreateAdminMutation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    if (data.password !== data.password_confirmation) {
      toast.error("Passwords do not match!");
      return;
    }
    try {
      await createAdmin(data).unwrap();
      toast.success("Admin created successfully!");
      onClose();
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to create admin");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-center px-4">
      <div className="bg-white rounded-2xl border border-[#E9EEEA] w-full max-w-xl max-h-[90vh] overflow-y-auto p-4 relative shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-maven font-semibold">Create New Admin</h3>
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
          {/* Full Name */}
          <div className="grid grid-cols-1">
            <CustomInput
              label="Full Name"
              name="name"
              register={register}
              required={true}
              placeholder="Enter full name"
              errors={errors}
            />
          </div>

          {/* Email */}
          <div className="grid grid-cols-1">
            <CustomInput
              label="Email"
              name="email"
              type="email"
              register={register}
              required={true}
              placeholder="e.g. contact@institution.com"
              errors={errors}
            />
          </div>

          {/* Role Dropdown */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Role</label>
              <select
                {...register("role", { required: true })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none "
              >
                <option value="">Select role</option>
                <option value="Admin">Admin</option>
                <option value="Supervisor">Supervisor</option>
                <option value="Manager">Manager</option>
              </select>
              {errors.role && (
                <span className="text-red-500 text-sm">Role is required</span>
              )}
            </div>
          </div>

          {/* Password */}
          <CustomInput
            label="Password"
            name="password"
            type="password"
            register={register}
            required={true}
            placeholder="Enter password"
            errors={errors}
          />

          {/* Password Confirmation */}
          <CustomInput
            label="Confirm Password"
            name="password_confirmation"
            type="password"
            register={register}
            required={true}
            placeholder="Re-enter password"
            errors={errors}
          />
          {errors.password_confirmation && (
            <span className="text-red-500 text-sm">
              Password confirmation is required
            </span>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-2 px-4 py-2 rounded bg-[#B20B0B] text-white border border-[#FFB2B2] transition"
            >
              <FaRegTimesCircle size={18} />
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2  bg-[#0A8625] text-white px-6 py-2 rounded border border-[#B3D9BB] hover:bg-green-700 transition"
            >
              <BsCheck2Circle size={18} />
              {isLoading ? "Creating..." : "Create Admin"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
