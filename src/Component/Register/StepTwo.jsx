import React from "react";
import CustomInput from "../CustomInput";
import CustomFileUpload from "../CustomFileUpload";
import { BsShieldLock } from "react-icons/bs";

export default function StepTwo({ register, errors }) {
  return (
    <>
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
            Your information is secure and encrypted. We maintain strict privacy
            standards.
          </p>
        </div>

        <h3 className="text-lg font-maven font-semibold">
          Key Contact Person{" "}
        </h3>
      </div>

      <CustomInput
        label="Full Name"
        name="full_name"
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
        name="official_email"
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
      />
    </>
  );
}
