import React, { useState } from "react";
import KeyContactPersonModal from "./KeyContactPersonModal";
import CustomInput from "../CustomInput";
import CustomFileUpload from "../CustomFileUpload";
import { useForm } from "react-hook-form";

export default function KeyContactPerson() {
  const [showModal, setShowModal] = useState(false);

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
    <div className="bg-white rounded-lg p-6">
      <div className="flex justify-between border-b border-[#E9EEEA] items-center pb-2 mb-4">
        <h3 className="text-lg font-maven font-semibold text-gray-800">
          Key Contact Person
        </h3>
        <button
          onClick={() => setShowModal(true)}
          className="text-sm text-white bg-[#0A8625] px-4 py-1 rounded hover:bg-green-700 transition"
        >
          Edit
        </button>
      </div>

      <form>
        <CustomInput
          label="Full Name"
          name="fullName"
          register={register}
          required={true}
          placeholder="Enter full name"
          errors={errors}
        />

        <CustomInput
          label="Position"
          name="position"
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
          label="ID Card Type"
          name="address"
          register={register}
          required={true}
          placeholder="Full address"
          errors={errors}
        />

        <CustomInput
          label="Phone Number"
          name="phone"
          type="tel"
          register={register}
          required={true}
          placeholder="+234 801 234 5678"
          errors={errors}
        />
        
      </form>
      {showModal && (
        <KeyContactPersonModal onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
