import React from "react";

export default function StepFormLayout({ step, children }) {
  return (
    <div className="w-full border border-[#E9EEEA] rounded-md p-6 space-y-4">
      {/* Stepper Line with Circles and Full Width Lines */}
      <div className="relative mb-6 flex items-center w-full">
        {[1, 2, 3].map((num, index) => (
          <div key={num} className="flex-1 flex items-center">
            {/* Line - behind the circle */}
            {index > 0 && (
              <div
                className={`flex-1 h-[4px] ${
                  step > num - 1 ? "bg-[#0A8625]" : "bg-[#E9EEEA]"
                }`}
              />
            )}

            {/* Step Circle */}
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center z-10 text-sm font-semibold
              ${step >= num ? "bg-[#0A8625] text-white" : "bg-[#E9EEEA] text-gray-600"}`}
            >
              {num}
            </div>

            {/* Final line after last step not needed */}
            {index < 2 && (
              <div
                className={`flex-1 h-[4px] ${
                  step > num ? "bg-[#0A8625]" : "bg-[#E9EEEA]"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Form content area */}
      <div className="max-h-[450px] overflow-y-auto pr-2 space-y-6">
        {children}
      </div>
    </div>
  );
}
