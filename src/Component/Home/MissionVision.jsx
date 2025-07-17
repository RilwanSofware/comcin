import { useState } from "react";
import card from "../../assets/card.svg";
import states from "../../assets/states.svg";
import nigerian from "../../assets/nigerian.svg";
import years from "../../assets/years.svg";
import aboutImage from "../../assets/green.png";
import { ImStatsDots } from "react-icons/im";
import { TbBulb } from "react-icons/tb";
import { FiPlus, FiMinus } from "react-icons/fi";

export default function MissionVision() {
  const [activeTab, setActiveTab] = useState("mission");

  return (
    <section id="about" className="py-16">
      <div className="container mx-auto px-4">
        {/* Impact Counters */}
        <div className="bg-white rounded-lg grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="p-6 text-center flex flex-col items-center justify-center">
            <img
              src={card}
              alt="Member Institutions"
              className="h-12 w-auto mb-2"
            />
            <h3 className="text-3xl font-bold text-primary">287+</h3>
            <p className="text-gray-600">Member Institutions</p>
          </div>
          <div className="p-6 text-center flex flex-col items-center justify-center">
            <img
              src={states}
              alt="States Covered"
              className="h-12 w-auto mb-2"
            />
            <h3 className="text-3xl font-bold text-primary">36</h3>
            <p className="text-gray-600">States Covered</p>
          </div>
          <div className="p-6 text-center flex flex-col items-center justify-center">
            <img
              src={nigerian}
              alt="Nigerians Served"
              className="h-12 w-auto mb-2"
            />
            <h3 className="text-3xl font-bold text-primary">1.2M+</h3>
            <p className="text-gray-600">Nigerians Served</p>
          </div>
          <div className="p-6 text-center flex flex-col items-center justify-center">
            <img
              src={years}
              alt="Years of Impact"
              className="h-12 w-auto mb-2"
            />
            <h3 className="text-3xl font-bold text-primary">15+</h3>
            <p className="text-gray-600">Years of Impact</p>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
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
            {/* Green Banner */}
            <div className="inline-flex bg-[#0A8625] text-white p-3 rounded-lg">
              <h2 className="text-base font-bold">We are United for Impact</h2>
            </div>

            {/* Description Text */}
            <div className=" p-3 mb-4">
              <p className="text-gray-700">
                COMCIN has managed a high potential to develop impact on the
                business. The executive instructions, including Cognitive &
                Designing Awards, when funded by the company, and economic
                empowerment in Nigeria.
              </p>
            </div>

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
      </div>
    </section>
  );
}
