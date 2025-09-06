import React, { useState } from "react";
import KeyContactPersonModal from "./KeyContactPersonModal";
import CustomInput from "../CustomInput";
import CustomFileUpload from "../CustomFileUpload";
import { useForm } from "react-hook-form";

export default function KeyContactPerson({ data }) {
  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "Joshua Clifford",
    },
  });

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
        <div className="mb-2">
          <label className="block text-sm text-gray-700 mb-1">Full Name</label>
          <input
            className="border border-[#E9E9E9] outline-none rounded px-3 py-2 text-sm w-full"
            value={data?.user?.name || ""}
            readOnly
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm text-gray-700 mb-1">Position</label>
          <input
            className="border border-[#E9E9E9] outline-none rounded px-3 py-2 text-sm w-full"
            value={data?.user?.designation || ""}
            readOnly
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm text-gray-700 mb-1">
            Official Email
          </label>
          <input
            className="border border-[#E9E9E9] outline-none rounded px-3 py-2 text-sm w-full"
            value={data?.user?.email || ""}
            readOnly
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm text-gray-700 mb-1">
            ID Card Type
          </label>
          <input
            className="border border-[#E9E9E9] outline-none rounded px-3 py-2 text-sm w-full"
            value={data?.user?.id_card || "N/A"}
            readOnly
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            className="border border-[#E9E9E9] outline-none rounded px-3 py-2 text-sm w-full"
            value={data?.user?.phone_number || "N/A"}
            readOnly
          />
        </div>
      </form>
      {showModal && (
        <KeyContactPersonModal onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
