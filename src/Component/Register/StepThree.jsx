import React from "react";
import CustomFileUpload from "../CustomFileUpload";
import { BsShieldLock } from "react-icons/bs";

export default function StepThree({ register, errors }) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-maven font-semibold">
          Documentation and Terms of Service{" "}
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

        <h3 className="text-lg font-maven font-semibold">Upload and Terms </h3>
      </div>

      <CustomFileUpload
        label="Certificate of Registration / Business Name (CAC/State)"
        name="certificate"
        register={register}
        required
        errors={errors}
      />

      <CustomFileUpload
        label="Operational Licence"
        name="license"
        register={register}
        required
        errors={errors}
      />

      <CustomFileUpload
        label="Constitution / Bye-laws"
        name="byelaws"
        register={register}
        required
        errors={errors}
      />

      <CustomFileUpload
        label="Latest Annual Report or Financial Statement (last 1 year)"
        name="financialReport"
        register={register}
        required
        errors={errors}
      />

      <div className="relative">
        <CustomFileUpload
          label="Letter of Intent / Interest to join COMCIN"
          name="intentLetter"
          register={register}
          required
          errors={errors}
        />
        <p className="text-right text-sm italic text-gray-500">
          On letterhead and signed by a top executive
        </p>
      </div>

      <CustomFileUpload
        label="Board Resolution Approving Membership Application (if applicable)"
        name="boardResolution"
        register={register}
        required
        errors={errors}
      />

      <CustomFileUpload
        label="Passport Photograph of Key Contact Person"
        name="passport"
        register={register}
        required
        errors={errors}
      />

      <CustomFileUpload
        label="Other Supporting Documents (if any)"
        name="otherDocuments"
        register={register}
        required={false}
        errors={errors}
      />

      {/* Agreement checkboxes */}
      <div className="mt-6 space-y-3">
        <label className="flex items-start gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            {...register("membershipAgreement", { required: true })}
            className="mt-1"
          />
          <span>
            We hereby apply for membership in COMCIN and agree to abide by the
            rules, code of conduct, and obligations outlined in the COMCIN
            Membership Policy. We confirm that the information provided is
            accurate and complete. We are committed to upholding the coalition's
            values and actively participating in its programs. I give my consent
            for credit checks to be conducted on the owner(s)/operator(s) of the
            institution.
          </span>
        </label>
        {errors.membershipAgreement && (
          <p className="text-xs text-red-500 -mt-2">
            You must agree to this statement.
          </p>
        )}

        <label className="flex items-start gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            {...register("termsAgreement", { required: true })}
            className="mt-1"
          />
          <span>I agree to the COMCIN Membership Terms and Conditions.</span>
        </label>
        {errors.termsAgreement && (
          <p className="text-xs text-red-500 -mt-2">
            You must agree to this statement.
          </p>
        )}
      </div>
    </>
  );
}
