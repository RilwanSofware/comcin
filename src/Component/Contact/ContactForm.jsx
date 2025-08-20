import React from "react";
import {
  FaFacebookF,
  FaXTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa6";
import { MdOutlineAttachEmail } from "react-icons/md";
import { PiMapPinAreaLight } from "react-icons/pi";
import { BiSupport } from "react-icons/bi";

export default function ContactForm() {
  return (
    <div className="container mx-auto my-20 px-4 max-w-screen-lg">
      <div className="rounded-lg overflow-hidden grid md:grid-cols-2 shadow-lg">
        {/* Left Panel */}
        <div
          className="text-white flex flex-col justify-evenly p-12 space-y-6"
          style={{
            backgroundImage:
              "linear-gradient(to bottom right, #0A8625, #2B5F25)",
          }}
        >
          <h2 className="text-4xl font-bold font-maven">Contact Us</h2>
          <p className="text-base mb-8 text-white max-w-md">
            Have a question about membership, registration, or technical
            support? We’re here to help.
          </p>

          <div className="border border-[#E9EEEA] rounded-md divide-y divide-white/30">
            <div className="flex items-center space-x-3 p-6">
              <MdOutlineAttachEmail className="bg-[#B3D9BB3D] rounded-md p-1 text-white text-3xl" />
              <span className="text-base font-normal">
                Email: support@comcin.org
              </span>
            </div>
            <div className="flex items-center space-x-3 p-6">
              <BiSupport className="bg-[#B3D9BB3D] rounded-md p-1 text-white text-3xl" />
              <span className="text-base font-normal">
                Phone: +234 800 000 0000
              </span>
            </div>
            <div className="flex items-center space-x-3 p-6">
              <PiMapPinAreaLight className="bg-[#B3D9BB3D] rounded-md p-1 text-white text-3xl" />
              <span className="text-base font-normal">
                Address: COMCIN Secretariat, Abuja, Nigeria
              </span>
            </div>
          </div>

          <div>
            <p className="mb-2">Socials:</p>
            <div className="flex space-x-4">
              <a
                href="https://web.facebook.com/comcinigeria/"
                className="text-white p-2 bg-white/10 hover:bg-white/20 rounded"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://x.com/Comcinigeria/"
                className="text-white p-2 bg-white/10 hover:bg-white/20 rounded"
              >
                <FaXTwitter />
              </a>
              <a
                href="https://www.linkedin.com/in/comcin"
                className="text-white p-2 bg-white/10 hover:bg-white/20 rounded"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://www.instagram.com/comcinnigeria"
                className="text-white p-2 bg-white/10 hover:bg-white/20 rounded"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="bg-white text-black p-8">
          <h3 className="text-3xl font-semibold mb-2 font-maven">
            Send Us a Message
          </h3>
          <p className="text-gray-500 text-sm mb-6">
            Reach out to us and get a response in 24 hours!
          </p>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Full name
              </label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border rounded-md px-4 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border rounded-md px-4 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Subject</label>
              <input
                type="text"
                placeholder="subject of your message"
                className="w-full border rounded-md px-4 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                placeholder="Write your message here..."
                className="w-full border rounded-md px-4 py-2 text-sm h-28"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-[#0A8625] text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
