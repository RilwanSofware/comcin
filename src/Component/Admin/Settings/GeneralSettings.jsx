import CustomInput from "@/Component/CustomInput";
import React from "react";
import { useForm } from "react-hook-form";
import { AiOutlineCheckCircle } from "react-icons/ai";

export default function GeneralSettings() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Submitted Data:", data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CustomInput
          label="Organization Name"
          name="name"
          register={register}
          placeholder="Enter Organization Name"
          errors={errors}
        />
        <div>
          <label className="block text-sm font-medium mb-1">Logo</label>
          <input
            type="file"
            {...register("logo")}
            className={`w-full border border-gray-300 text-sm rounded-md px-3 py-2 focus:outline-none`}
          />
        </div>

        <CustomInput
          label="Contact Email"
          name="email"
          type="email"
          register={register}
          placeholder="Enter Email"
          errors={errors}
        />
        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <div className="flex">
            <select
              {...register("phoneCode")}
              defaultValue="+234"
              className="border border-gray-300 rounded-l px-3 py-2 focus:outline-none"
            >
              <option value="+234">+234</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
            </select>
            <input
              type="tel"
              {...register("phoneNumber", { required: true })}
              placeholder="Enter phone number"
              className="w-full border border-gray-300 border-l-0 rounded-r px-3 py-2 focus:outline-none"
            />
          </div>
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm mt-1">
              Phone number is required
            </p>
          )}
        </div>
      </div>
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
