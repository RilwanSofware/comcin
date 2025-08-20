import React, { useState } from "react";
import logo from "../../assets/logogreen.png";

import Integrity from "../../assets/Integrity.svg";
import Inclusiveness from "../../assets/Inclusiveness.svg";
import Innovation from "../../assets/Innovation.svg";
import Collaboration from "../../assets/Collaboration.svg";
import Sustainability from "../../assets/Sustainability.svg";

import aboutImage from "../../assets/green.png";
import { ImStatsDots } from "react-icons/im";
import { TbBulb } from "react-icons/tb";
import { FiPlus, FiMinus } from "react-icons/fi";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function AboutFirstSection() {
  const [activeTab, setActiveTab] = useState("mission");

  return (
    <section id="about" className="">
      <div className="container mx-auto px-4">
        <div className="my-2 md:my-10 flex flex-col md:flex-row justify-between gap-8">
          {/* Left column */}
          <div className="flex-1">
            <p className="bg-white text-sm text-[#0A8625] inline-flex gap-2 items-center rounded-full py-1 px-4">
              <img src={logo} alt="logo" className="h-5 w-auto mb-2" />{" "}
              Introducing COMCIN
            </p>
            <h2 className="text-[#1E1E1E] font-maven font-bold text-4xl mt-4">
              Empowering Institutions,
              <br /> Transforming Lives
            </h2>
          </div>

          {/* Right column */}
          <div className="flex-1">
            {/* Description Text */}
            <div className="mb-4">
              <p className="text-gray-700">
                COMCIN has managed a high potential to develop impact on the
                business. The executive instructions, including Cognitive &
                Designing Awards, when funded by the company, and economic
                empowerment in Nigeria.
              </p>
            </div>

            <div className="inline-flex bg-[#0A8625] text-white p-3 rounded-lg">
              <Link
                to="/register"
                className="flex items-center gap-2 text-base font-bold"
              >
                Become a member now <FaArrowRightLong />
              </Link>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-12 items-start mt-5">
          {/* Left Column - Image */}
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img
              src={aboutImage}
              alt="COMCIN in Action"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Right Column - Accordion */}
          <div>
            {/* Accordion */}
            <div className="">
              {/* Mission Accordion Item */}
              <div className="bg-white">
                <button
                  className={`w-full text-left p-6 flex justify-between items-center gap-4 `}
                  onClick={() =>
                    setActiveTab(activeTab === "mission" ? null : "mission")
                  }
                >
                  <div className="flex items-center gap-3">
                    <ImStatsDots className="text-primary text-xl" />
                    <h3 className="text-xl font-bold text-primary">
                      Our Mission
                    </h3>
                  </div>
                  {activeTab === "mission" ? (
                    <FiMinus className="text-gray-500 text-xl" />
                  ) : (
                    <FiPlus className="text-gray-500 text-xl" />
                  )}
                </button>
                {activeTab === "mission" && (
                  <div className=" px-6 pb-6">
                    <p className="text-gray-600">
                      To unite and strengthen microlending institutions through
                      collaboration, standardization, and advocacy, ensuring
                      sustainable growth and positive impact across Nigeria's
                      communities.
                    </p>
                  </div>
                )}
              </div>

              {/* Vision Accordion Item */}
              <div className="bg-white mt-6 rounded-md">
                <button
                  className={`w-full text-left p-6 flex justify-between items-center gap-4 `}
                  onClick={() =>
                    setActiveTab(activeTab === "vision" ? null : "vision")
                  }
                >
                  <div className="flex items-center gap-3">
                    <TbBulb className="bg-primary text-white p-1 rounded-md text-2xl" />
                    <h3 className="text-xl font-bold text-primary">
                      Our Vision
                    </h3>
                  </div>
                  {activeTab === "vision" ? (
                    <FiMinus className="text-gray-500 text-xl" />
                  ) : (
                    <FiPlus className="text-gray-500 text-xl" />
                  )}
                </button>
                {activeTab === "vision" && (
                  <div className=" px-6 pb-6">
                    <p className="text-gray-600">
                      To be the leading coalition driving financial inclusion,
                      transparency, and economic empowerment through a united
                      network of microlending and cooperative institutions in
                      Nigeria.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="text-center my-10">
            <h2 className="text-3xl font-maven font-bold">Our Core Values</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              At COMCIN, we are driven by integrity, inclusiveness, and
              accountability. Our values shape every decision we make and every
              service we provide empowering grass-roots financial institutions
              for greater impact.
            </p>
          </div>
          <div className="bg-white rounded-lg grid grid-cols-2 md:grid-cols-5 gap-6 mb-16">
            <div className="p-6 text-center flex flex-col items-center justify-center">
              <img
                src={Integrity}
                alt="Member Institutions"
                className="h-12 w-auto mb-2"
              />
              <p className="text-gray-600">Integrity</p>
            </div>
            <div className="p-6 text-center flex flex-col items-center justify-center">
              <img
                src={Inclusiveness}
                alt="States Covered"
                className="h-12 w-auto mb-2"
              />
              <p className="text-gray-600">Inclusiveness</p>
            </div>
            <div className="p-6 text-center flex flex-col items-center justify-center">
              <img
                src={Innovation}
                alt="Nigerians Served"
                className="h-12 w-auto mb-2"
              />
              <p className="text-gray-600">Innovation</p>
            </div>
            <div className="p-6 text-center flex flex-col items-center justify-center">
              <img
                src={Collaboration}
                alt="Years of Impact"
                className="h-12 w-auto mb-2"
              />
              <p className="text-gray-600">Collaboration</p>
            </div>
            <div className="p-6 text-center flex flex-col items-center justify-center">
              <img
                src={Sustainability}
                alt="Years of Impact"
                className="h-12 w-auto mb-2"
              />
              <p className="text-gray-600">Sustainability</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
