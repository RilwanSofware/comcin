import React from "react";
import { useForm } from "react-hook-form";
import CustomInput from "../CustomInput";
import CustomFileUpload from "../CustomFileUpload";

export default function SupportForm() {
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
    <div className="bg-white rounded-lg mb-6 px-4 pt-4 pb-20">
      <div className="border-b border-[#E9EEEA] pb-4">
        <h3 className="text-lg font-maven font-medium text-[#1E1E1E]">
          Submit a Support Request
        </h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
        <CustomInput
          label="Subject"
          name="Subject"
          register={register}
          required={false}
          placeholder="Title of your request"
          errors={errors}
        />

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            {...register("message", {
              required: true,
            })}
            placeholder="Write your message here..."
            className="w-full border border-gray-300 text-sm rounded-md px-3 py-2 resize-none"
            rows={4}
          />

          {errors.message && (
            <p className="text-xs text-red-500 mt-1">This field is required</p>
          )}
        </div>

        <CustomFileUpload
          label="Attach File (optional)"
          name="file"
          register={register}
          required={false}
          errors={errors}
        />
        <button
          type="submit"
          className="bg-[#0A8625] w-full text-white px-6 py-2 rounded"
        >
          Send Request
        </button>
      </form>
    </div>
  );
}
