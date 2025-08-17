import React, { useState, useEffect } from "react";
import logo from "../assets/logogreen.png";
import lock from "../assets/lock.svg";
import success from "../assets/success.svg";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import StepFormLayout from "../Component/Register/StepFormLayout";
import StepOne from "../Component/Register/StepOne";
import StepTwo from "../Component/Register/StepTwo";
import StepThree from "../Component/Register/StepThree";
import { useCreateAccountMutation } from "@/services/auth";
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

export default function Register() {
  const [Register, { isLoading }] = useCreateAccountMutation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [step, setStep] = useState(1);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formDataToSend = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (value instanceof FileList) {
          Array.from(value).forEach((file) => {
            formDataToSend.append(key, file);
          });
        } else {
          formDataToSend.append(key, value);
        }
      });

      await Register(formDataToSend).unwrap();

      toast.success(
        "Registration successful! Please check your email to confirm."
      );
      setShowConfirmation(true);
    } catch (err) {
      console.error("API Error:", err);
      toast.error(
        err?.data?.message ||
          err?.message ||
          "Something went wrong while registering."
      );
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrev = () => setStep((prev) => prev - 1);

  // Auto-slide every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

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
                Already a Member?{" "}
                <Link to="/login" className="text-[#0A8625] font-bold">
                  Login here{" "}
                </Link>
              </p>
            </div>

            <div className="mb-6 text-start">
              <h1 className="font-maven text-2xl font-semibold text-[#1E1E1E] mb-2">
                COMCIN Membership Application{" "}
              </h1>
              <p className="text-sm font-normal text-[#686868]">
                Complete your membership application process in just three
                Steps.{" "}
              </p>
            </div>

            {!showConfirmation ? (
              <form onSubmit={handleSubmit(onSubmit)} className="min-h-[400px]">
                <StepFormLayout step={step}>
                  {step === 1 && (
                    <StepOne
                      register={register}
                      errors={errors}
                      watch={watch}
                    />
                  )}
                  {step === 2 && (
                    <StepTwo
                      register={register}
                      errors={errors}
                      watch={watch}
                    />
                  )}
                  {step === 3 && (
                    <StepThree
                      register={register}
                      errors={errors}
                      watch={watch}
                    />
                  )}

                  <div
                    className={`flex ${
                      step > 1 ? "justify-between" : "justify-end"
                    } mt-4`}
                  >
                    {step > 1 && (
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="text-sm px-4 py-2 border border-gray-300 rounded"
                      >
                        Back
                      </button>
                    )}

                    {step === 1 && (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="bg-[#0A8625] text-white px-6 py-2 rounded"
                      >
                        Proceed to Contact Person
                      </button>
                    )}

                    {step === 2 && (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="bg-[#0A8625] text-white px-6 py-2 rounded"
                      >
                        Proceed to Registration Details
                      </button>
                    )}

                    {step === 3 && (
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-[#0A8625] text-white px-6 py-2 rounded"
                      >
                        {isLoading
                          ? "Completing Registration..."
                          : "Complete Registration"}
                      </button>
                    )}
                  </div>
                </StepFormLayout>
              </form>
            ) : (
              <div className="w-full lg:w-2/3 border border-[#E9EEEA] rounded-md p-6  space-y-4">
                <img src={success} alt="COMCIN Logo" className="h-20 mb-2" />
                <h2 className="text-xl font-maven font-semibold text-[#1E1E1E]">
                  Registration Completed!{" "}
                </h2>
                <p className="text-sm text-[#686868]">
                  We have sent email to galynaurdya@belugateam.info to confirm
                  the validity of your email address. After receiving the email
                  follow the link provided to proceed.
                </p>
                <hr className="bg-[#E9EEEA]" />
                <p className="text-sm text-[#686868]">
                  Click on resend email if you do not get an email!
                </p>

                <div className="flex justify-around mt-2">
                  <button
                    onClick={() => setShowConfirmation(false)}
                    className="text-[#0A8625] rounded px-4 py-2 border border-[#0A8625] text-sm font-semibold"
                  >
                    Resend Email
                  </button>
                  <Link
                    to="/login"
                    className="bg-[#0A8625] text-sm  text-white rounded px-4 py-2 border border-[#0A8625] font-semibold"
                  >
                    Explore COMCIN Website{" "}
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
