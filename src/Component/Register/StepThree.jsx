import React from "react";
import CustomFileUpload from "../CustomFileUpload";
import { BsShieldLock } from "react-icons/bs";
import CustomInput from "../CustomInput";

export default function StepThree({ register, errors, watch }) {
  const certificate_of_registration = watch("certificate_of_registration");
  const cof = certificate_of_registration?.[0];

  const operational_license = watch("operational_license");
  const ol = operational_license?.[0];

  const constitution = watch("constitution");
  const c = constitution?.[0];

  const latest_annual_report = watch("latest_annual_report");
  const lar = latest_annual_report?.[0];

  const letter_of_intent = watch("letter_of_intent");
  const loi = letter_of_intent?.[0];

  const board_resolution = watch("board_resolution");
  const brr = board_resolution?.[0];

  const passport_photograph = watch("passport_photograph");
  const pp = passport_photograph?.[0];

  const other_supporting_document = watch("other_supporting_document");
  const osd = other_supporting_document?.[0];

  const payment_receipt = watch("payment_receipt");
  const pr = payment_receipt?.[0];
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
        preview={
          certificate_of_registration && certificate_of_registration.length > 0
            ? URL.createObjectURL(certificate_of_registration[0])
            : null
        }
        fileType={cof ? cof.type : null}
        fileName={cof ? cof.name : null}
      />

      <CustomFileUpload
        label="Operational Licence"
        name="operational_license"
        register={register}
        required={true}
        errors={errors}
        preview={
          operational_license && operational_license.length > 0
            ? URL.createObjectURL(operational_license[0])
            : null
        }
        fileType={ol ? ol.type : null}
        fileName={ol ? ol.name : null}
      />

      <CustomFileUpload
        label="Constitution / Bye-laws"
        name="constitution"
        register={register}
        required={false}
        errors={errors}
        preview={
          constitution && constitution.length > 0
            ? URL.createObjectURL(constitution[0])
            : null
        }
        fileType={c ? c.type : null}
        fileName={c ? c.name : null}
      />

      <CustomFileUpload
        label="Latest Annual Report or Financial Statement (last 1 year)"
        name="latest_annual_report"
        register={register}
        required={false}
        errors={errors}
        preview={
          latest_annual_report && latest_annual_report.length > 0
            ? URL.createObjectURL(latest_annual_report[0])
            : null
        }
        fileType={lar ? lar.type : null}
        fileName={lar ? lar.name : null}
      />

      <div className="relative">
        <CustomFileUpload
          label="Letter of Intent / Interest to join COMCIN"
          name="letter_of_intent"
          register={register}
          required={false}
          errors={errors}
          preview={
            letter_of_intent && letter_of_intent.length > 0
              ? URL.createObjectURL(letter_of_intent[0])
              : null
          }
          fileType={loi ? loi.type : null}
          fileName={loi ? loi.name : null}
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
        preview={
          board_resolution && board_resolution.length > 0
            ? URL.createObjectURL(board_resolution[0])
            : null
        }
        fileType={brr ? brr.type : null}
        fileName={brr ? brr.name : null}
      />

      <CustomFileUpload
        label="Passport Photograph of Key Contact Person"
        name="passport_photograph"
        register={register}
        required={false}
        errors={errors}
        preview={
          passport_photograph && passport_photograph.length > 0
            ? URL.createObjectURL(passport_photograph[0])
            : null
        }
        fileType={pp ? pp.type : null}
        fileName={pp ? pp.name : null}
      />

      <CustomFileUpload
        label="Other Supporting Documents (if any)"
        name="other_supporting_document"
        register={register}
        required={false}
        errors={errors}
        preview={
          other_supporting_document && other_supporting_document.length > 0
            ? URL.createObjectURL(other_supporting_document[0])
            : null
        }
        fileType={osd ? osd.type : null}
        fileName={osd ? osd.name : null}
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
        preview={
          payment_receipt && payment_receipt.length > 0
            ? URL.createObjectURL(payment_receipt[0])
            : null
        }
        fileType={pr ? pr.type : null}
        fileName={pr ? pr.name : null}
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
