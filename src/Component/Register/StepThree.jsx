import React from "react";
import CustomFileUpload from "../CustomFileUpload";
import { BsShieldLock } from "react-icons/bs";
import CustomInput from "../CustomInput";

export default function StepThree({ register, errors, watch }) {
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
        name="certificate_of_registration"
        register={register}
        required={true}
        errors={errors}
      />

      <CustomFileUpload
        label="Operational Licence"
        name="operational_license"
        register={register}
        required={true}
        errors={errors}
      />

      <CustomFileUpload
        label="Constitution / Bye-laws"
        name="constitution"
        register={register}
        required={false}
        errors={errors}
      />

      <CustomFileUpload
        label="Latest Annual Report or Financial Statement (last 1 year)"
        name="latest_annual_report"
        register={register}
        required={false}
        errors={errors}
      />

      <div className="relative">
        <CustomFileUpload
          label="Letter of Intent / Interest to join COMCIN"
          name="letter_of_intent"
          register={register}
          required={false}
          errors={errors}
        />
        <p className="text-right text-sm italic text-gray-500">
          On letterhead and signed by a top executive
        </p>
      </div>

      <CustomFileUpload
        label="Board Resolution Approving Membership Application (if applicable)"
        name="board_resolution"
        register={register}
        required={false}
        errors={errors}
      />

      <CustomFileUpload
        label="Passport Photograph of Key Contact Person"
        name="passport_photograph"
        register={register}
        required={false}
        errors={errors}
      />

      <CustomFileUpload
        label="Other Supporting Documents (if any)"
        name="other_supporting_document"
        register={register}
        required={false}
        errors={errors}
      />

      {/* Bank details section */}
      <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
        <h4 className="text-lg font-maven font-semibold mb-2">
          Bank Payment Details
        </h4>
        <p className="text-sm text-gray-700">
          <span className="font-medium">Account Name:</span> COMCIN
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-medium">Account Number:</span> 0427663684
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-medium">Bank Name:</span> WEMA
        </p>
        <p className="text-xs text-gray-500 mt-2 italic">
          Please make payment to the above account and upload your receipt
          below.
        </p>
      </div>

      {/* Payment Receipt Upload */}
      <CustomFileUpload
        label="Payment Receipt"
        name="payment_receipt"
        register={register}
        required={true}
        errors={errors}
      />

      {/* Category Type */}
      <div className="mt-6">
        <h4 className="text-lg font-maven font-semibold mb-2">Category Type</h4>
        <div className="space-y-2 text-sm text-gray-700">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="unit"
              {...register("category_type", { required: true })}
            />
            Unit member – based and operating within a local government –
            ₦20,000.00
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="state"
              {...register("category_type", { required: true })}
            />
            State member – based and operating within a state government –
            ₦50,000.00
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="federal"
              {...register("category_type", { required: true })}
            />
            National member – based and operating within a state government –
            ₦100,000.00
          </label>
          {errors.category_type && (
            <p className="text-xs text-red-500">
              Please select a category type.
            </p>
          )}
        </div>
      </div>
      {/* Password */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          placeholder="Enter password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          className="outline-none mt-1 block w-full border border-gray-300 text-xs rounded-md p-2"
        />
        {errors.password && (
          <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <input
          type="password"
          placeholder="Re-enter password"
          {...register("password_confirmation", {
            required: "Please confirm your password",
            validate: (value) =>
              value === watch("password") || "Passwords do not match",
          })}
          className="outline-none  mt-1 block w-full border border-gray-300 ro text-xs unded-md p-2"
        />
        {errors.password_confirmation && (
          <p className="text-xs text-red-500 mt-1">
            {errors.password_confirmation.message}
          </p>
        )}
      </div>

      {/* Agreement checkboxes */}
      <div className="mt-6 space-y-3">
        <label className="flex items-start gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            {...register("membership_agreement", { required: true })}
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
        {errors.membership_agreement && (
          <p className="text-xs text-red-500 -mt-2">
            You must agree to this statement.
          </p>
        )}

        <label className="flex items-start gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            {...register("terms_agreement", { required: true })}
            className="mt-1"
          />
          <span>I agree to the COMCIN Membership Terms and Conditions.</span>
        </label>
        {errors.terms_agreement && (
          <p className="text-xs text-red-500 -mt-2">
            You must agree to this statement.
          </p>
        )}
      </div>
    </>
  );
}
