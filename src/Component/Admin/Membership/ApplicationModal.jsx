import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { BsPatchCheck, BsBookmarkDash } from "react-icons/bs";
import { FaRegTimesCircle } from "react-icons/fa";
import { MdOutlineCancelPresentation } from "react-icons/md";
import coverImage from "@/assets/profile.png";
import {
  useGetAdminSingleApplicationQuery,
  useApproveRequestMutation,
} from "@/services/admin-dashboard/dashboard";
import RejectForm from "./RejectForm";
import toast from "react-hot-toast";

export default function ApplicationModal({ onClose, initialData, refetch }) {
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [approveRequest, { isLoading }] = useApproveRequestMutation();




  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  // Approve handler
  const handleApprove = async () => {
    try {
      await approveRequest({
        user_id: initialData?.user_id,
        data: {
          user_id: initialData?.user_id,
          action: "approve",
        },
      }).unwrap();
      toast.success("Application approved successfully");
      onClose();
      refetch();
    } catch (error) {
      console.error(error);

      toast.error(error?.data?.message || "Failed to approve application");
    }
  };

  // Reject handler (opens reject form)
  const handleReject = () => {
    setShowRejectForm(true);
  };

  // Callback for reject form
  const handleRejectSubmit = async (data) => {
    try {
      await approveRequest({
        user_id: initialData?.user_id,
        data: {
          user_id: initialData?.user_id,
          action: "reject",
          rejection_reason: data.rejection_reason,
        },
      }).unwrap();
      toast.success("Application rejected successfully");
      setShowRejectForm(false);
      onClose();
      refetch();
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || "Failed to reject application");
    }
  };

  // console.log(initialData);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-center px-4">
      <div className="bg-white rounded-2xl border border-[#E9EEEA] w-full max-w-2xl max-h-[90vh] overflow-y-auto p-4 relative shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-maven font-semibold">
            Registration Details{" "}
          </h3>
          <button
            onClick={onClose}
            className="text-red-600 hover:scale-110 transition"
          >
            <MdOutlineCancelPresentation size={24} />
          </button>
        </div>

        <form
          // onSubmit={handleSubmit(onSubmit)}
          className="rounded border border-[#E9EEEA] p-4 space-y-2"
        >
          <div className="bg-white rounded-t-lg border-[#E9EEEA] overflow-hidden">
            {/* Cover Image */}
            <div className="w-full h-40">
              <img
                src={coverImage}
                alt="Cover"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Logo + Details */}
            <div className="flex items-start gap-4 p-4">
              <img
                src={coverImage}
                alt="Category Logo"
                className="w-20 h-20 object-contain rounded-full border-4 border-white bg-white -mt-10"
              />

              <div className="flex justify-between items-start w-full">
                <div>
                  <h2 className="text-xl font-medium text-[#1E1E1E]">
                    {initialData?.institution_name}
                  </h2>
                </div>
                {initialData?.status === "pending" && (
                  <span className="text-xs inline-block mt-2 px-3 py-1 rounded bg-[#FFEDD5] text-[#C2410C] font-medium">
                    Pending Review
                  </span>
                )}

                {initialData?.status === "approved" && (
                  <span className="text-xs inline-block mt-2 px-3 py-1 border border-[#8EC79B] rounded bg-[#0A8625] text-white font-medium">
                    Approved
                  </span>
                )}

                {initialData?.status === "rejected" && (
                  <span className="text-xs inline-block mt-2 px-3 py-1 border border-red-400 rounded bg-red-100 text-red-700 font-medium">
                    Rejected
                  </span>
                )}
              </div>
            </div>
          </div>
          <hr />
          {/* Payment Info Section */}
          <div className="my-4">
            <h4 className="text-2xl font-maven font-medium mb-3">
              Payment Info
            </h4>
            <div className="overflow-x-auto border-[0.5px] border-[#B9B9B9] rounded-md">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="text-sm text-[#1E1E1E] font-medium text-left">
                    <th className="p-2">#ID</th>
                    <th className="p-2 ">Category Plan</th>
                    <th className="p-2 ">Amount (₦)</th>
                    <th className="p-2 ">Tax (₦)</th>
                    <th className="p-2 ">Date</th>
                    <th className="p-2 ">Status</th>
                  </tr>
                </thead>
                <tbody className="border-t">
                  <tr className="text-sm">
                    <td className="p-2">INV215654</td>
                    <td className="p-2">State</td>
                    <td className="p-2 ">50,000.00</td>
                    <td className="p-2 ">50.00</td>
                    <td className="p-2 ">25 Jan 2025</td>
                    <td className="p-2">
                      <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-600 font-medium">
                        Paid
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="my-4">
            <h4 className="text-2xl font-maven font-medium mb-3">
              Institutional Information
            </h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Institution Type */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Institution Type
              </label>
              <input
                className="border border-[#E9E9E9] outline-none rounded px-3 py-2 text-sm w-full"
                value={initialData?.institution_type || ""}
                readOnly
              />
            </div>

            {/* Date of Establishment */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Date of Establishment
              </label>
              <input
                className="border border-[#E9E9E9] outline-none rounded px-3 py-2 text-sm w-full"
                value={
                  initialData?.date_of_establishment
                    ? new Date(
                        initialData?.date_of_establishment
                      ).toLocaleDateString()
                    : ""
                }
                readOnly
              />
            </div>

            {/* Registration Number */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Registration Number
              </label>
              <input
                className="border border-[#E9E9E9] outline-none rounded px-3 py-2 text-sm w-full"
                value={initialData?.registration_number || ""}
                readOnly
              />
            </div>

            {/* Registration Body */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Registration Body
              </label>
              <input
                className="border border-[#E9E9E9] outline-none rounded px-3 py-2 text-sm w-full"
                value={initialData?.regulatory_body || ""}
                readOnly
              />
            </div>

            {/* Operating State */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Operating State
              </label>
              <input
                className="border border-[#E9E9E9] outline-none rounded px-3 py-2 text-sm w-full"
                value={initialData?.operating_state || ""}
                readOnly
              />
            </div>

            {/* Membership Type */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Membership Type
              </label>
              <input
                className="border border-[#E9E9E9] outline-none rounded px-3 py-2 text-sm w-full"
                value={initialData?.category_type || ""}
                readOnly
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                className="border border-[#E9E9E9] outline-none rounded px-3 py-2 text-sm w-full"
                value={
                  initialData?.phone_number ||
                  initialData?.user?.phone_number ||
                  "N/A"
                }
                readOnly
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Email Address
              </label>
              <input
                className="border border-[#E9E9E9] outline-none rounded px-3 py-2 text-sm w-full"
                value={initialData?.user?.email || "N/A"}
                readOnly
              />
            </div>

            {/* Head Office Address */}
            <div className="col-span-2">
              <label className="block text-sm text-gray-700 mb-1">
                Head Office Address
              </label>
              <input
                className="border border-[#E9E9E9] outline-none rounded px-3 py-2 text-sm w-full"
                value={initialData?.head_office || ""}
                readOnly
              />
            </div>

            {/* Business Operational Address */}
            <div className="col-span-2">
              <label className="block text-sm text-gray-700 mb-1">
                Business Operational Address
              </label>
              <input
                className="border border-[#E9E9E9] outline-none rounded px-3 py-2 text-sm w-full"
                value={initialData?.business_operation_address || ""}
                readOnly
              />
            </div>

            {/* Brief Description */}
            <div className="col-span-2">
              <label className="block text-sm text-gray-700 mb-1">
                Brief Description
              </label>
              <textarea
                className="border border-[#E9E9E9] outline-none rounded px-3 py-2 text-sm w-full"
                rows="3"
                value={initialData?.descriptions || ""}
                readOnly
              />
            </div>
          </div>
          <div className="my-4">
            <h4 className="text-2xl font-maven font-medium mb-3">
              Key Contact Person
            </h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Institution Type */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Full Name
              </label>
              <input
                className="border border-[#E9E9E9] outline-none rounded px-3 py-2 text-sm w-full"
                value={initialData?.institution_type || ""}
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Position
              </label>
              <input
                className="border border-[#E9E9E9] outline-none rounded px-3 py-2 text-sm w-full"
                value={initialData?.institution_type || ""}
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Email Address
              </label>
              <input
                className="border border-[#E9E9E9] outline-none rounded px-3 py-2 text-sm w-full"
                value={initialData?.user?.email || "N/A"}
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                className="border border-[#E9E9E9] outline-none rounded px-3 py-2 text-sm w-full"
                value={initialData?.institution_type || ""}
                readOnly
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={handleReject}
              className="flex items-center gap-2 px-4 py-2 rounded bg-[#B20B0B] text-white"
            >
              <FaRegTimesCircle size={18} />
              Reject Request{" "}
            </button>

            <button
              type="button"
              onClick={handleApprove}
              className="flex items-center gap-2 bg-[#0A8625] text-white px-6 py-2 rounded hover:bg-green-700"
            >
              <BsPatchCheck size={18} />
              {isLoading ? "Approving..." : "Approve Member"}
            </button>
          </div>
        </form>
      </div>

      {showRejectForm && (
        <RejectForm
          onClose={() => setShowRejectForm(false)}
          onSubmit={handleRejectSubmit}
        />
      )}
    </div>
  );
}
