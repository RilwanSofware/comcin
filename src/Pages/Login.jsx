import React, { useState, useEffect } from "react";
import logo from "../assets/logogreen.png";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "@/services/auth";
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

export default function Login() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();



  // Auto-slide every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);



  const onSubmit = async (data) => {
    try {
      const result = await login({
        email: data.email,
        password: data.password,
      }).unwrap();
      sessionStorage.setItem("token", result.token);
      sessionStorage.setItem("user", JSON.stringify(result.user));
      console.log(result)
      toast.success(result?.message);
      if (result.user.role === "admin") {
        window.location.href = "/admin-dashboard";
      } else {
        window.location.href = "/dashboard";
      }
    } catch (err) {
      console.error("Login failed:", err);
      toast.error(err?.data?.message)
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
                className={`w-2 h-2 rounded-full ${currentSlide === index ? "bg-white" : "bg-white/50"
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
                Not a Member?
                <Link to="/register" className="text-[#0A8625] font-bold">
                  Register here{" "}
                </Link>
              </p>
            </div>
            <div className="mb-6 text-start">
              <h1 className="font-maven text-2xl font-semibold text-[#1E1E1E] mb-2">
                Welcome back to COMCIN Portal!
              </h1>
              <p className="text-sm font-normal text-[#686868]">
                Please enter your details to access your profile
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}

              className=" w-full lg:w-2/3 border border-[#E9EEEA] rounded-md p-4 space-y-5">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Registration ID
                </label>
                <input
                  type="text"
                  placeholder="Enter your registration ID"
                  {...register("email", {
                    required: "Email is required",
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-2">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="********"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-2">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember-me"
                  {...register("rememberMe")}
                  className="h-4 w-4 text-[#064A14] border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 text-sm text-gray-700"
                >
                  Remember Me
                </label>
              </div>


              <button
                type="submit"
                disabled={isLoading}
                className="cursor-pointer w-full bg-[#0A8625] mb-4 hover:bg-[#053710] border border-[#8EC79B] text-white font-semibold py-2 px-4 rounded-md transition"
              >
                {isLoading ? "Logging in..." : "Log In"}
              </button>
              <div className="flex justify-center">
                <Link
                  to="/forgot-password"
                  className="text-[#0A8625] underline text-sm font-semibold"
                >
                  Forgot Password?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
