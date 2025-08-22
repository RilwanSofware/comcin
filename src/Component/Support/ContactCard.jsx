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

export default function ContactCard() {
  return (
    <div
      className="text-white rounded-lg flex flex-col border border-[#E9EEEA] justify-evenly p-12 space-y-6"
      style={{
        backgroundImage: "linear-gradient(to bottom right, #0A8625, #2B5F25)",
      }}
    >
      <h2 className="text-4xl font-bold font-maven">Contact Us</h2>
      <p className="text-base mb-8 text-white max-w-md">
        Have a question about membership, registration, or technical support?
        We’re here to help.
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
  );
}
