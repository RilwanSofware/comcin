import React from "react";
import { FaRegAddressCard } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import bgImage from "../../assets/welcomebg.png";

export default function MemberStatusCard({
  institutionName,
  membershipId,
  status,
  operatingState,
  category,
}) {
  return (
    <div
      className="p-6 h-full flex flex-col justify-between rounded-lg bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-semibold">Welcome Back,</h1>
          <h1 className="text-lg font-normal">{institutionName}</h1>
          <span className="text-[#3B9E51] ">#{membershipId}</span>
        </div>
        <button className="border bg-white border-[#0A8625] z-10 p-2 rounded text-xs font-bold text-[#0A8625] ">
          {status}
        </button>
      </div>

      <div className="flex justify-between p-2 rounded border divide-x divide-[#E7F3E9] text-[#4B4B4B] border-[#E7F3E9]">
        <p className=" flex items-center gap-2">
          <FiMapPin />
          {operatingState} State
        </p>
        <p className=" flex items-center gap-2 pl-2">
          {" "}
          <FaRegAddressCard />
          {category}{" "}
        </p>
      </div>
    </div>
  );
}
