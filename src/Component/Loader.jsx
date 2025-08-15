import React from "react";

export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="relative w-16 h-16">
        {/* Outer ring */}
        <div
          className="absolute w-full h-full rounded-full border-4 border-t-transparent animate-spin"
          style={{ borderColor: "#0A8625", borderTopColor: "transparent" }}
        ></div>

        {/* Inner ring */}
        <div
          className="absolute inset-2 rounded-full border-4 border-b-transparent animate-spin-slow"
          style={{ borderColor: "#2c5282", borderBottomColor: "transparent" }}
        ></div>
      </div>
    </div>
  );
}
