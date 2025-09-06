import React, { useEffect, useState } from "react";
import CustomInput from "../CustomInput";
import CustomFileUpload from "../CustomFileUpload";
import { BsShieldLock } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { useEditProfileDashboardMutation } from "@/services/members/dashboardmember";
import toast from "react-hot-toast";

export default function KeyContactPersonModal({ onClose }) {
  const [editProfileDashboard, { isLoading }] =
    useEditProfileDashboardMutation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const file =
      typeof data.id_card == "string" ? data.id_card : data.id_card?.[0]; // File object

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    ``;
    formData.append("phone_number", data.phone_number);
    formData.append("designation", data.designation);
    if (file) {
      formData.append("id_card", file);
    }

    try {
      await editProfileDashboard(formData).unwrap();
      toast.success("Profile Edited Successfully!");
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const [preview, setPreview] = useState(null);
  // Watch the file input
  const watchFile = watch("id_card");

  // Update preview when file changes
  useEffect(() => {
    if (watchFile && watchFile.length > 0) {
      const file = watchFile[0];
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      // cleanup old objectURL to avoid memory leaks
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [watchFile]);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-center px-4">
      <div className="bg-white rounded-2xl border border-[#E9EEEA]  w-full max-w-xl max-h-[90vh] overflow-y-auto p-4 relative shadow-lg">
        <div className=" rounded-2xl border border-[#E9EEEA] p-6 relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-red-600 hover:scale-110 transition"
          >
            <MdOutlineCancelPresentation size={20} />
          </button>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-maven font-semibold">
              Key Contact Person{" "}
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              Please provide your institution's registration information.
            </p>

            <div className="mb-6">
              <p className="inline-flex gap-2 bg-[#F4FBF5] items-center rounded-full p-2 text-[#0A8625] font-normal text-[12px]">
                <BsShieldLock />
                Your information is secure and encrypted. We maintain strict
                privacy standards.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <CustomInput
              label="Full Name"
              name="name"
              register={register}
              required={true}
              placeholder="Enter full name"
              errors={errors}
            />

            <CustomInput
              label="Position"
              name="designation"
              register={register}
              required={true}
              placeholder="e.g. Managing Director"
              errors={errors}
            />

            <CustomInput
              label="Official Email"
              name="email"
              type="email"
              register={register}
              required={true}
              placeholder="e.g. contact@institution.com"
              errors={errors}
            />

            <CustomInput
              label="Phone Number"
              name="phone_number"
              type="tel"
              register={register}
              required={true}
              placeholder="+234 801 234 5678"
              errors={errors}
            />

            <CustomFileUpload
              label="Upload Means of ID"
              name="id_card"
              register={register}
              required={true}
              errors={errors}
              preview={preview}
            />

            <div className="flex justify-end gap-4 pt-4">
              <button
                type="submit"
                className="flex items-center gap-2 bg-[#0A8625] text-white px-6 py-2 rounded hover:bg-green-700"
              >
                {isLoading ? "Updating..." : " Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
