import React, { useState, useEffect } from "react";
import logo from "../assets/logogreen.png";
import mail from "../assets/mailconfirm.svg";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useLazyVerifyAccountQuery } from "@/services/auth";

const slides = [
  { title: "Empowering Institutions", subtitle: "Financial Inclusion", description: "Join COMCIN to access resources, tools, and updates." },
  { title: "Empowering Institutions", subtitle: "Financial Inclusion", description: "Join COMCIN to access resources, tools, and updates." },
  { title: "Empowering Institutions", subtitle: "Financial Inclusion", description: "Join COMCIN to access resources, tools, and updates." },
];

export default function Verify() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [status, setStatus] = useState("loading"); // loading | success | error
  const { id, code } = useParams();

  const [triggerVerify, { data, isLoading, isError }] = useLazyVerifyAccountQuery();

  // Trigger verification
  useEffect(() => {
    if (id && code) {
      setStatus("loading");
      triggerVerify({ user_uuid: id, otp: code });
    }
  }, [id, code, triggerVerify]);

  // Slide rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Watch for request state changes
  useEffect(() => {
    if (!isLoading) {
      if (data) {
        setStatus("success");
        toast.success(data.message || "Account verified successfully!");
      } else if (isError) {
        setStatus("error");
        toast.error("Account verification failed");
      }
    }
  }, [isLoading, data, isError]);

  return (
    <section className="bg-[#064A14] flex items-center justify-center min-h-screen p-4">
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-8xl">
        {/* Left Column */}
        <div
          className="w-full md:w-1/2 rounded-xl text-white p-10 flex flex-col justify-center min-h-[750px]"
          style={{ background: "linear-gradient(to left, #0A8625, #2B5F25)" }}
        >
          <div className="text-center w-full flex flex-col items-center justify-center">
            <img src={logo} alt="COMCIN Logo" className="h-20 mb-4" />
            <h1 className="font-maven text-3xl font-semibold mb-2">{slides[currentSlide].title}</h1>
            <p className="font-maven text-3xl font-semibold mb-4">{slides[currentSlide].subtitle}</p>
            <p className="text-base font-normal">{slides[currentSlide].description}</p>
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {slides.map((_, index) => (
              <span
                key={index}
                className={`w-2 h-2 rounded-full ${currentSlide === index ? "bg-white" : "bg-white/50"}`}
              ></span>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full md:w-1/2 bg-white rounded-xl p-10 flex min-h-[750px] shadow-lg">
          <div className="w-full">
            <div className="flex justify-between mb-6 text-center">
              <img src={logo} alt="COMCIN Logo" className="h-10 mb-4" />
              <p className="flex gap-3 text-base font-normal text-[#1E1E1E]">
                <Link to="/" className="text-[#0A8625] underline text-sm font-semibold">
                  Go Back to Homepage
                </Link>
              </p>
            </div>

            <div className="w-full lg:w-2/3 border border-[#E9EEEA] rounded-md p-6 space-y-4 text-center">
              {status === "loading" && (
                <p className="text-sm text-[#686868]">Verifying your account...</p>
              )}

              {status === "success" && (
                <>
                  <img src={mail} alt="COMCIN Logo" className="h-20 mb-2" />
                  <h2 className="text-xl font-maven font-semibold text-[#1E1E1E]">
                    Account Verified
                  </h2>
                  <p className="text-sm text-[#686868]">
                    Your account has been successfully verified. You can now log in.
                  </p>
                  <Link
                    to="/login"
                    className="bg-[#0A8625] text-white rounded px-6 py-2 border border-[#0A8625] font-semibold inline-block mt-4"
                  >
                    Go to Login
                  </Link>
                </>
              )}

              {status === "error" && (
                <>
                  <img src={mail} alt="COMCIN Logo" className="h-20 mb-2" />
                  <h2 className="text-xl font-maven font-semibold text-red-600">
                    Account Verification Failed ❌
                  </h2>
                  <p className="text-sm text-[#686868]">
                    The verification link is invalid or expired.
                  </p>
                  <Link
                    to="/resend-verification"
                    className="bg-[#0A8625] text-white rounded px-6 py-2 border border-[#0A8625] font-semibold inline-block mt-4"
                  >
                    Resend Verification Email
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
