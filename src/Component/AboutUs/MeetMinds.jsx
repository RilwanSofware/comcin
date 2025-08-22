import React, { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import micheal from "@/assets/micheal.jpg";
import salami from "@/assets/salami.jpg";
import chukwudi from "@/assets/chukwudi.jpg";
import afolabi from "@/assets/afolabi.png";
import iredele from "@/assets/iredele.jpeg";

import { Link } from "react-router-dom";

const members = [
  {
    id: 1,
    name: "Iredele Oyedele",
    role: "Founder",
    image: iredele,
    description:
      "An astute qualified chartered accountant with over 30 years’ experience rising to the position of Chief Financial Officer in multinational and international organisations in Nigeria and United Kingdom respectively...",
    details: `FCCA, FCA, FCIT, MBA, PGD Finance (University of Oxford), Fintech (University of Oxford), Cert. IRM, UK, Prince 2 Practitioner.

An astute qualified chartered accountant with over 30 years’ experience rising to the position of Chief Financial Officer in multinational and international organisations in Nigeria and United Kingdom respectively. His experience spans across various business sectors including oil and gas, manufacturing, marketing, public sector, utilities etc.

He holds the fellowship status of the Association of Chartered Certified Accountants (ACCA), the Institute of Chartered Accountants of Nigeria (ICAN) and The Chartered Institute of Taxation Nigeria (CITN).

In addition, he holds a Master’s in Business Administration (MBA) with specialisation in General Management and Post Graduate Degree in Strategic Finance from the University of Oxford, the same University where he also attended a Certificate in Fintech where his interest in microfinance began to develop.

He also holds a Bachelor of Science in Applied Accounting from Oxford Brookes University, United Kingdom and Bachelor of Science (BSc) in accounting from the University of Lagos, Nigeria.

He has attended various management, core finance and microfinance training in United Kingdom and Africa.

He leads the vision SBS Credits. He is a fintech enthusiast. He is an alumnus of The Microfinance Association, UK.

He is a Senior Pastor of The Redeemed Christian Church of God, Great High Place, West Thamesmead, United Kingdom.`,
  },
  {
    id: 2,
    name: "Michael Ogbaa",
    role: "Secretary",
    image: micheal,
    description:
      "Michael Ogbaa is The Co-founder, Chief Executive Officer and Managing Director of Sytamo Technology Limited, a Micro Lending Institution. He’s a Composite Banker, Economist, Strat...",
    details: `Michael Ogbaa is The Co-founder, Chief Executive Officer and Managing Director of Sytiamo Technology Limited, a Micro Lending Institution. He’s a Composite Banker, Economist, Strategist, Former Head, Agency Banking in Africa's Biggest Retail Bank and The World's Most Respected African Bank - Access Bank Group. With twenty-two years of banking history that covers Strategy and Business Planning, General Administration and Resources Management, Retail Channels Management, Marketing and Sales, Strategic and Reputational Risk Management, Team Building, Management, and Financial Risk. Michael Ogbaa is an astute banking and finance professional with a Executive Middle Management Training focused in Strategic Leadership from University of Pennsylvania - The Wharton School and an MBA from the prestigious University of Liverpool, U.K.`,
  },

  {
    id: 3,
    name: "Omoniyi Salami",
    role: "Board Member",
    image: salami,
    description:
      "He is a graduate of Marketing of Kaduna Polytechnic. He is a certified microfinance professional by the Chartered Institute of Banking of Nigeria. He is an experienced Banker,...",

    details: `He is a graduate of Marketing of Kaduna Polytechnic. He is a certified microfinance professional by the Chartered Institute of Banking of Nigeria. He is an experienced Banker, having worked with a leading commercial bank in Nigeria for 10 years. 
He is a visionary entrepreneur and he is passionate about youth and women development. He is the CEO of NEAT Microcredit and the Chairman of The Neat Place Hotel.`,
  },
  {
    id: 4,
    name: "Okanya Chukwudi Amaechi",
    role: "Board Member",
    image: chukwudi,
    description:
      "Okanya Chukwudi Amaechi. Founder OASIS LOGISTICS AND TRUST LTD (OASIS MFI). GREEN Harvest MCS LTD, Kings Multi-purpose Farmers Cooperative Society, Cooperative C...",
    details: `Okanya Chukwudi Amaechi. Founder OASIS LOGISTICS AND TRUST LTD (OASIS MFI). GREEN Harvest MCS LTD, Kings Multi-purpose Farmers Cooperative Society, Cooperative Consultant. Obtained Certificate from Integrated Institute of Professional Management (IIPM) Abuja in the following areas: Vocational/ Entrepreneurship Consultant, Microfinance and Risk Management, Strategic Planning and Development, Training and Development Professional and a B.Sc. from UNN. `,
  },
  {
    id: 5,
    name: "Afolabi Hassan",
    role: "Board Member",
    image: afolabi,
    description:
      "Afolabi Hassan is a Strategic Credit Risk and Financial Inclusion Advocate with over 18 years of experience spanning Nigeria’s banking and microfinance sectors, as well as the co...",

    details: `Afolabi Hassan is a Strategic Credit Risk and Financial Inclusion Advocate with over 18 years of experience spanning Nigeria’s banking and microfinance sectors, as well as the cooperative finance space in the United Kingdom. He is a pioneering member of COMCIN, where his expertise in grassroots lending and institutional development directly supports the coalition’s mission to expand financial access across Nigeria.
Afolabi began his career with one of Nigeria’s leading commercial banks, then deepened his microlending expertise during six years at AB Microfinance Bank, where he worked across both micro and SME segments. He later served as Credit Team Lead at a microfinance bank and as Credit Risk Manager at a fintech-driven lending company, where he oversaw credit operations and risk strategy.
He is the co-founder of IHINE Microfinance Institution and IHINE SENSE Cooperative Society, both of which focus on empowering communities through inclusive, cooperative finance. Internationally, Afolabi also serves on the Supervisory Committee of Unify Credit Union (UK).
He holds a Postgraduate Diploma in Finance and Risk Management, is a Microfinance Certified Practitioner (CIBN), and a professional member of the Chartered Institute of Credit Management (UK).`,
  },
];

export default function MeetMinds() {
  const [selectedMember, setSelectedMember] = useState(null);

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
                <button
                  onClick={() => setSelectedMember(member)}
                  className="mt-2 text-[#0A8625] text-sm font-medium hover:underline self-end"
                >
                  Read more
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white max-w-lg w-full rounded-lg shadow-lg p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black text-lg font-bold"
            >
              ✕
            </button>

            {/* Member Info */}
            <div className="flex items-center gap-4 mb-4">
              <img
                src={selectedMember.image}
                alt={selectedMember.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="font-bold text-xl text-gray-900">
                  {selectedMember.name}
                </h3>
                <p className="text-gray-600 text-sm">{selectedMember.role}</p>
              </div>
            </div>

            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line max-h-80 overflow-y-auto pr-2">
              {selectedMember.details || selectedMember.description}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
