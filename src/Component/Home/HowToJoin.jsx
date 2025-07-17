import { useState } from "react";
import application from "../../assets/Application.svg";
import verification from "../../assets/verification.svg";
import approval from "../../assets/approval.svg";
import onboarding from "../../assets/onboarding.svg";

import app from "../../assets/app2.png";
import verification2 from "../../assets/verification.png";
import approval2 from "../../assets/approval.png";
import onboarding2 from "../../assets/onboarding.png";

export default function HowToJoin() {
  const [activeTab, setActiveTab] = useState(0);

  const steps = [
    {
      title: "Application",
      description:
        "Complete our online application form with your institution's details and documentation.",
      icon: application,
      image: app,
    },
    {
      title: "Verification",
      description:
        "Complete our online application form with your institution's details and documentation.",
      icon: verification,
      image: verification2,
    },
    {
      title: "Approval",
      description:
        "Upon approval, you'll receive an official invitation to join the coalition.",
      icon: approval,
      image: approval2,
    },
    {
      title: "Onboarding",
      description:
        "Complete the membership process and gain access to all COMCIN resources and benefits.",
      icon: onboarding,
      image: onboarding2,
    },
  ];

  const colors = [
    { bg: "#BDCEFA", border: "#BDCEFA" },
    { bg: "#0A8625", border: "#0A8625" },
    { bg: "#041030", border: "#041030" },
    { bg: "#075F1A", border: "#075F1A" },
  ];

  return (
    <section id="join" className="py-16 ">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-left mb-12">
          <h2 className="font-maven text-3xl font-bold text-gray-900">
            How to Join COMCIN
          </h2>
          <p className="text-gray-600 max-w-md mt-2">
            Our streamlined application process ensures that qualified
            institutions can quickly become part of our growing coalition.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-start mb-8">
          <div className="flex space-x-4">
            {steps.map((step, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                style={{
                  background:
                    activeTab === index ? `${colors[index].border}` : "none",
                  color:
                    activeTab === index
                      ? index === 0
                        ? "#041030" // black for first tab
                        : "#FFFFFF" // white for others
                      : "#1E1E1E", // gray-500 for inactive
                }}
                className={`py-2 px-4 rounded-md transition-all duration-300 text-sm font-medium ${
                  activeTab === index ? "bg-white" : "hover:bg-gray-100"
                }`}
              >
                {step.title}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="flex gap-2 w-full min-h-[350px]">
          {steps.map((step, index) => {
            const isActive = index === activeTab;
            const currentColor = colors[index];

            return (
              <div
                key={index}
                onMouseEnter={() => setActiveTab(index)}
                style={{
                  backgroundColor: !isActive ? currentColor.bg : "white",
                  borderLeft: isActive
                    ? `24px solid ${currentColor.border}`
                    : "none",
                }}
                className={`transition-all duration-300 ease-in-out flex-shrink-0 rounded-lg 
                  ${isActive ? "w-full lg:w-[50%]" : "w-[180px]"} 
                  cursor-pointer overflow-hidden flex flex-col`}
              >
                {isActive ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                    <div className="p-6 flex flex-col justify-center h-full">
                      <div className="w-20 h-20 mb-4">
                        <img
                          src={step.icon}
                          alt={step.title}
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      </div>{" "}
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-base text-gray-600 mb-4">
                        {step.description}
                      </p>
                    </div>
                    {/* Image */}
                    <div className="h-auto">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ) : (
                  // Collapsed View
                  <div className="flex flex-col items-center justify-evenly h-full px-2 text-white">
                    <div
                      className={`bg-white text-3xl font-bold w-9 h-9 rounded-full flex items-center justify-center mb-2 ${
                        index === 1 ? "text-green-600" : "text-black"
                      }`}
                    >
                      {index + 1}
                    </div>

                    <div
                      className={`transform -rotate-90 text-3xl font-medium text-center leading-none ${
                        index === 0 ? "text-black" : "text-white"
                      }`}
                    >
                      {step.title}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
