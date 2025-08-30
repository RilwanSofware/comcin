import React, { useState, useEffect } from "react";
import logo from "../assets/logogreen.png";
import lock from "../assets/lock.svg";
import success from "../assets/success.svg";

import { Link, useParams } from "react-router-dom";
import { useResetPasswordMutation } from "@/services/auth";
import toast from "react-hot-toast";

const slides = [
  {
    title: "Empowering Institutions",
    subtitle: "Financial Inclusion",
    description: "Join COMCIN to access resources, tools, and updates.",
  },
  {
    title: "Empowering Institutions",
    subtitle: "Financial Inclusion",
    description: "Join COMCIN to access resources, tools, and updates.",
  },
  {
    title: "Empowering Institutions",
    subtitle: "Financial Inclusion",
    description: "Join COMCIN to access resources, tools, and updates.",
  },
];

export default function ResetPassword() {
  const { id, code } = useParams();
  const [resetPassword] = useResetPasswordMutation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    password_confirmation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Reset error on typing
    setError("");
  };

  // Validation function
  const validatePasswords = () => {
    if (!formData.password || !formData.password_confirmation) {
      setError("Both fields are required.");
      return false;
    }
    if (formData.password !== formData.password_confirmation) {
      setError("Passwords do not match.");
      return false;
    }
    return true;
  };

  // Auto-slide every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validatePasswords()) {
      setIsSubmitting(false);
      return;
    }
    try {
      const response = await resetPassword({
        uuid: id,
        otp: code,
        ...formData,
      }).unwrap();
      setShowConfirmation(true); // show confirmation card
      setIsSubmitting(false);
    } catch (error) {
      toast.error(error.data.message || "Failed to reset password");
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-[#064A14] flex items-center justify-center min-h-screen p-4">
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-8xl">
        {/* Left Column with Gradient and Slide */}
        <div
          className="w-full md:w-1/2 rounded-xl text-white p-10 flex flex-col justify-center min-h-[750px]"
          style={{
            background: "linear-gradient(to left, #0A8625, #2B5F25)",
          }}
        >
          <div className="text-center w-full flex flex-col items-center justify-center">
            <img src={logo} alt="COMCIN Logo" className="h-20 mb-4" />

            <h1 className="font-maven text-3xl font-semibold mb-2">
              {slides[currentSlide].title}
            </h1>
            <p className="font-maven text-3xl font-semibold mb-4">
              {slides[currentSlide].subtitle}
            </p>
            <p className="text-base font-normal">
              {slides[currentSlide].description}
            </p>
          </div>

          {/* Slide Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {slides.map((_, index) => (
              <span
                key={index}
                className={`w-2 h-2 rounded-full ${
                  currentSlide === index ? "bg-white" : "bg-white/50"
                }`}
              ></span>
            ))}
          </div>
        </div>

        {/* Right Column - Login Form */}
        <div className="w-full md:w-1/2 bg-white rounded-xl p-10 flex  min-h-[750px] shadow-lg">
          <div className="w-full">
            <div className="flex justify-between mb-6 text-center">
              <img src={logo} alt="COMCIN Logo" className="h-10 mb-4" />

              <p className="flex gap-3 text-base font-normal text-[#1E1E1E]">
                <Link
                  to="/"
                  className="text-[#0A8625] underline text-sm font-semibold"
                >
                  Explore COMCIN Websiste{" "}
                </Link>
              </p>
            </div>
            {!showConfirmation ? (
              <form
                onSubmit={onSubmit}
                className=" w-full lg:w-2/3 border border-[#E9EEEA] rounded-md p-4 space-y-5"
              >
                <img src={lock} alt="COMCIN Logo" className="h-20 mb-4" />

                <div className="mb-6 text-start">
                  <h1 className="font-maven text-2xl font-semibold text-[#1E1E1E] mb-2">
                    Reset Password!{" "}
                  </h1>
                  <p className="text-sm font-normal text-[#686868]">
                    Please enter your details to access your profile{" "}
                  </p>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Enter New Password
                  </label>
                  <input
                    type="new_password"
                    placeholder="********"
                    value={formData.password}
                    name="password"
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 outline-none rounded-md"
                  />
                  <p className="text-xs text-red-500">{error}</p>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="confirmPassword"
                    placeholder="********"
                    value={formData.password_confirmation}
                    name="password_confirmation"
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 outline-none rounded-md"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#0A8625] mb-4 hover:bg-[#053710] border border-[#8EC79B] text-white font-medium py-2 px-4 rounded-md transition"
                >
                  {isSubmitting ? "Reseting..." : " Reset Password"}
                </button>
              </form>
            ) : (
              <div className="w-full lg:w-2/3 border border-[#E9EEEA] rounded-md p-6  space-y-4">
                <img src={success} alt="COMCIN Logo" className="h-20 mb-2" />
                <h2 className="text-xl font-maven font-semibold text-[#1E1E1E]">
                  Password Reset Successfully!{" "}
                </h2>
                <p className="text-sm text-[#686868]">
                  Please Login to manage your institution’s membership and
                  activities.{" "}
                </p>

                <p className="w-full text-sm mt-2">
                  <Link
                    to="/login"
                    className="block w-full bg-[#0A8625] mt-3 text-center text-white rounded px-6 py-2 border border-[#0A8625] font-semibold text-sm"
                  >
                    Login
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
