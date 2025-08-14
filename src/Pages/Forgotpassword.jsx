import React, { useState, useEffect } from "react";
import logo from "../assets/logogreen.png";
import lock from "../assets/lock.svg";
import mail from "../assets/mailconfirm.svg";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useForgotPasswordMutation } from "@/services/auth";

import { Link } from "react-router-dom";

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

export default function ForgotPassword() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [forgotPassword] = useForgotPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  // Auto-slide every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const onSubmit = async (formData) => {
    try {
      setSubmittedEmail(formData.email);

      const response = await forgotPassword(formData).unwrap();
      console.log(response)
      toast.success(response.message);
      setShowConfirmation(true);
      reset();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to send reset email");
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
                  Go Back to Homepage
                </Link>
              </p>
            </div>
            {!showConfirmation ? (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className=" w-full lg:w-2/3 border border-[#E9EEEA] rounded-md p-4 space-y-5"
              >
                <img src={lock} alt="COMCIN Logo" className="h-20 mb-4" />

                <div className="mb-6 text-start">
                  <h1 className="font-maven text-2xl font-semibold text-[#1E1E1E] mb-2">
                    Password Reset{" "}
                  </h1>
                  <p className="text-sm font-normal text-[#686868]">
                    Please enter your email to reset your password.
                  </p>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Registration Email
                  </label>
                  <input
                    type="email"
                    placeholder="example@email.com"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                      },
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#0A8625] mb-4 hover:bg-[#053710] border border-[#8EC79B] text-white font-semibold py-2 px-4 rounded-md transition disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Reset Password"}
                </button>
              </form>
            ) : (
              <div className="w-full lg:w-2/3 border border-[#E9EEEA] rounded-md p-6  space-y-4">
                <img src={mail} alt="COMCIN Logo" className="h-20 mb-2" />
                <h2 className="text-xl font-maven font-semibold text-[#1E1E1E]">
                  Email Confirmation!
                </h2>
                <p className="text-sm text-[#686868]">
                  We have sent an email to{" "}
                  <span className="font-semibold">{submittedEmail}</span> to
                  reset your password. Please click on the link in the email to
                  proceed.
                </p>
                <hr className="bg-[#E9EEEA]" />
                <p className="text-sm text-[#686868]">
                  Click on resend email if you do not get an email!
                </p>

                <div className="flex justify-evenly">
                  <button
                    onClick={() => setShowConfirmation(false)}
                    className="text-[#0A8625] rounded px-6 py-2 border border-[#0A8625] text-sm font-semibold"
                  >
                    Resend Email
                  </button>
                  <p className="text-sm mt-2">
                    <Link
                      to="/login"
                      className="bg-[#0A8625] text-white rounded px-6 py-2 border border-[#0A8625] font-semibold"
                    >
                      Go back to Login
                    </Link>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
