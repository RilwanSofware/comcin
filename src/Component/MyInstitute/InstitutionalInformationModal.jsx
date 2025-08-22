import React, { useState } from "react";
import { BsShieldLock } from "react-icons/bs";
import { FiX } from "react-icons/fi";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { useForm } from "react-hook-form";
import CustomInput from "../CustomInput";

const states = ["Lagos", "Abuja", "Kano", "Enugu", "Oyo", "Kaduna"];

export default function InstitutionalInformationModal({
  onClose,
  initialData,
  personalInfo,
}) {
  const mappedDefaults = initialData
    ? {
        institutionName: initialData.institution_name || "",
        institutionType: initialData.institution_type || "",
        dateOfEstablishment: initialData.date_of_establishment
          ? initialData.date_of_establishment.split("T")[0] // format to yyyy-mm-dd
          : "",
        regNumber: initialData.registration_number || "",
        regBody: initialData.regulatory_body || "",
        operatingState: initialData.operating_state || "",
        officeAddress: initialData.head_office || "",
        phoneNumber: personalInfo?.user.phone_number || "",
        email: personalInfo?.user.email || "",
        website: initialData.website_url || "",
        briefDescription: initialData.descriptions || "",
      }
    : {};

  const [charCount, setCharCount] = useState(
    mappedDefaults.briefDescription?.length || 0
  );

  console.log(initialData, "latest");

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setCharCount(value.length);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: mappedDefaults,
  });

  const onSubmit = (data) => {
    console.log("Submitted Data:", data);
  };

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

          {/* Title */}
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-maven font-semibold">
              Institutional Information
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              Please provide basic information about your institution.
            </p>

            <div className="mb-6">
              <p className="inline-flex gap-2 bg-[#F4FBF5] items-center rounded-full p-2 text-[#0A8625] font-normal text-[12px]">
                <BsShieldLock />
                Your information is secure and encrypted. We maintain strict
                privacy standards.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            {/* Full Legal Name */}
            <CustomInput
              label="Institution Name"
              name="institutionName"
              register={register}
              required
              placeholder="Enter your institution’s full legal name"
              errors={errors}
            />
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Institution Type <span className="text-red-500">*</span>
              </label>
              <div className="flex space-x-4">
                {["Microfinance", "Cooperative", "Other"].map((type) => (
                  <label key={type} className="flex items-center gap-2">
                    <input
                      type="radio"
                      value={type}
                      {...register("institutionType", { required: true })}
                    />
                    {type}
                  </label>
                ))}
              </div>
              {errors.institutionType && (
                <p className="text-xs text-red-500 mt-1">
                  Institution type is required
                </p>
              )}
            </div>

            <CustomInput
              label="Date of Establishment"
              name="dateOfEstablishment"
              type="date"
              register={register}
              required
              errors={errors}
            />

            <CustomInput
              label="Registration Number (CAC/Regulatory Authority)"
              name="regNumber"
              register={register}
              required
              errors={errors}
              placeholder="e.g RG123987654"
            />
            <CustomInput
              label="Regulatory Body (CBN, CAC, State Money Lender, etc.)"
              name="regBody"
              register={register}
              required
              errors={errors}
              placeholder="e.g CAC"
            />

            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Operating State <span className="text-red-500">*</span>
              </label>
              <select
                {...register("operatingState", { required: true })}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              {errors.operatingState && (
                <p className="text-xs text-red-500 mt-1">
                  Please select a state
                </p>
              )}
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Head Office Address <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("officeAddress", {
                  required: true,
                  maxLength: 500,
                  onChange: handleDescriptionChange,
                })}
                placeholder="Full Address"
                className="w-full border border-gray-300 text-sm rounded-md px-3 py-2 resize-none"
                rows={2}
              />

              {errors.officeAddress && (
                <p className="text-xs text-red-500 mt-1">
                  This field is required
                </p>
              )}
            </div>

            <CustomInput
              label="Head Office Address"
              name="officeAddress"
              register={register}
              required
              errors={errors}
              placeholder="Enter office address"
            />

            <CustomInput
              label="Phone Number"
              name="phoneNumber"
              register={register}
              required
              errors={errors}
              placeholder="+234 8012345678"
            />

            <CustomInput
              label="Email Address"
              name="email"
              register={register}
              required
              errors={errors}
              type="email"
              placeholder="example@institution.com"
            />

            <CustomInput
              label="Website URL (if available)"
              name="website"
              register={register}
              required={false}
              errors={errors}
              type="url"
              placeholder="https://example.com"
            />
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Brief Description <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("briefDescription", {
                  required: true,
                  maxLength: 500,
                  onChange: handleDescriptionChange,
                })}
                placeholder="Provide a brief description of your institution's mission and services (max 500 characters)"
                className="w-full border text-sm border-gray-300 rounded-md px-3 py-2 resize-none"
                rows={4}
              />
              <div className="text-sm text-gray-500 mt-1 text-right">
                {charCount}/500 characters
              </div>
              {errors.briefDescription && (
                <p className="text-xs text-red-500 mt-1">
                  This field is required
                </p>
              )}
            </div>

            {/* Save Button */}
            <div className="col-span-2 flex justify-end mt-4">
              <button
                type="submit"
                className="bg-[#0A8625] text-white px-6 py-2 text-sm rounded hover:bg-green-700 transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
