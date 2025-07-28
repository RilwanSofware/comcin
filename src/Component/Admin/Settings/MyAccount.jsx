import React from "react";
import { useForm } from "react-hook-form";
import { AiOutlineSave } from "react-icons/ai";

export default function MyAccount() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("My Account Data:", data);
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
          id="profilePicture"
          {...register("profilePicture")}
          className="block w-full  md:w-1/2 border  text-sm rounded px-3 py-2"
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
            className="w-full text-sm  border rounded px-3 py-2 focus:outline-none"
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
      </div>

      {/* Save Button */}
      <div>
        <button
          type="submit"
          className="bg-[#0A8625] hover:bg-green-700 text-white px-5 py-2 rounded flex items-center gap-2"
        >
          <AiOutlineSave className="w-5 h-5" />
          Save Details
        </button>
      </div>
    </form>
  );
}
