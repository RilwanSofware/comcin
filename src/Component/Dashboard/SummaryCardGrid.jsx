import React from "react";
import active from "../../assets/active.svg";
import levy from "../../assets/levy.svg";
import donation from "../../assets/donation.svg";
import earned from "../../assets/earned.svg";

export default function SummaryCardGrid() {
  return (
    <div className="bg-white p-6 rounded-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Card 1 - Membership Status */}
        <div className="flex justify-between items-end p-2 rounded border border-[#E7F3E9]">
          <div>
            <h4 className="text-sm font-normal text-[#686868]">
              Membership Status
            </h4>
            <p className="text-lg font-semibold text-[#075F1A] mt-1">Active</p>
            <p className="text-xs text-[#B20B0B] mt-1">Due in 14 days</p>
          </div>
          <img
            src={active}
            alt="active"
            className="h-8 w-auto object-contain"
          />{" "}
        </div>

        {/* Card 2 */}
        <div className="flex justify-between items-end p-2 rounded border border-[#E7F3E9]">
          <div>
            <h4 className="text-sm font-normal text-[#686868]">Next Payment</h4>
            <p className="text-lg font-semibold text-[#1E1E1E] mt-1">
              COMCIN Group Donation
            </p>
            <p className="text-xs text-[#0A8625] mt-1">
              payment due on 17/07/2025
            </p>
          </div>
          <img
            src={donation}
            alt="donation"
            className="h-8 w-auto object-contain"
          />{" "}
        </div>

        {/* Card 3 */}
        <div className="flex justify-between items-end p-2 rounded border border-[#E7F3E9]">
          <div>
            <h4 className="text-sm font-normal text-[#686868]">
              {" "}
              Pending Levies
            </h4>
            <p className="text-lg font-semibold text-[#F3AB11] mt-1">4</p>
            <p className="text-xs text-gray-500 mt-1">
              Last payment due since 17/05/2025
            </p>
          </div>
          <img src={levy} alt="levy" className="h-8 w-auto object-contain" />{" "}
        </div>

        {/* Card 4 */}
        <div className="flex justify-between items-end p-2 rounded border border-[#E7F3E9]">
          <div>
            <h4 className="text-sm font-normal text-[#686868]">
              Total Certificate Earned
            </h4>
            <p className="text-lg font-semibold text-[#075F1A] mt-1">14</p>
            <p className="text-xs text-[#0A8625] mt-1">
              Latest Certificate: Compliance and support
            </p>
          </div>

          <img
            src={earned}
            alt="earned"
            className="h-8 w-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
}
