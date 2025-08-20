import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import micheal from "@/assets/micheal.jpg";
import salami from "@/assets/salami.jpg";
import chukwudi from "@/assets/chukwudi.jpg";
import afolabi from "@/assets/afolabi.png";
import { Link } from "react-router-dom";

const members = [
  {
    id: 1,
    name: "Michael Ogbaa",
    role: "President",
    image: micheal,
    description:
      "Michael Ogbaa is The Co-founder, Chief Executive Officer and Managing Director of Sytamo Technology Limited, a Micro Lending Institution. He’s a Composite Banker, Economist, Strat...",
  },
  {
    id: 2,
    name: "Omoniyi Salami",
    role: "Vice Chairman",
    image: salami,
    description:
      "He is a graduate of Marketing of Kaduna Polytechnic. He is a certified microfinance professional by the Chartered Institute of Banking of Nigeria. He is an experienced Banker,...",
  },
  {
    id: 3,
    name: "Okanya Chukwudi Amaechi",
    role: "Director of Cooperative Development",
    image: chukwudi,
    description:
      "Okanya Chukwudi Amaechi. Founder OASIS LOGISTICS AND TRUST LTD (OASIS MFI). GREEN Harvest MCS LTD, Kings Multi-purpose Farmers Cooperative Society, Cooperative C...",
  },
  {
    id: 4,
    name: "Afolabi Hassan",
    role: "Director of Credit Risk & Financial Strategy",
    image: afolabi,
    description:
      "Afolabi Hassan is a Strategic Credit Risk and Financial Inclusion Advocate with over 18 years of experience spanning Nigeria’s banking and microfinance sectors, as well as the co...",
  },
];

export default function MeetMinds() {
  return (
    <section className="">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h2 className="font-maven text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              Meet The Minds
              <br /> Behind the Mission
            </h2>
            <p className="mt-2 text-gray-600 max-w-2xl">
              Visionary leaders driving cooperative transformation meet the
              board members guiding COMCIN&apos;s strategic direction.
            </p>
          </div>

          <Link
            to="/members"
            className="mt-4 md:mt-0 inline-flex items-center bg-[#0A8625] text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition"
          >
            View All Membership Directory{" "}
            <FaArrowRightLong className="ml-2 w-4 h-4" />
          </Link>
        </div>

        {/* Members List */}
        <div className="space-y-6">
          {members.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-lg shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between p-4"
            >
              {/* Left: Avatar + Name + Role */}
              <div className="flex items-center gap-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-bold text-lg text-gray-900">
                    {member.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{member.role}</p>
                </div>
              </div>

              {/* Right: Description */}
              <div className="mt-3 md:mt-0 md:flex-1 md:ml-6 flex flex-col justify-between">
                <p className="text-gray-600 text-sm">{member.description}</p>
                <button className="mt-2 text-[#0A8625] text-sm font-medium hover:underline self-end">
                  Read more
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
