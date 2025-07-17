import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { LuPhone } from "react-icons/lu";
import { FiMapPin } from "react-icons/fi";
import { MdOutlineAttachEmail } from "react-icons/md";

import { RiTwitterXLine } from "react-icons/ri";
import partnerBadge from "../assets/partner-badge.png";
import { useLocation } from "react-router-dom";

import logo from "../assets/logogreen.png";
import { BsStarFill } from "react-icons/bs";

export default function Footer() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  return (
    <footer
      className={`${isHome ? " pt-40" : "pt-20"} pb-8 relative text-white`}
      style={{
        backgroundImage:
          "radial-gradient(circle at top left, rgba(0, 172, 70, 0.2) 0%, #041030 20%)",
        backgroundColor: "#041030", // Fallback
      }}
    >
      {/* Join CTA Section */}
      {isHome && (
        <div className="absolute -top-28 inset-x-4 md:inset-x-10 lg:inset-x-20">
          <div
            className="rounded-xl p-8 md:p-12 border-2 border-white text-center text-white max-w-4xl mx-auto"
            style={{
              backgroundImage:
                "linear-gradient(to bottom right, #0A8625, #2B5F25)",
            }}
          >
            <h2 className="font-maven text-2xl md:text-3xl font-bold mb-4">
              Ready to Join Nigeria's Premier <br /> Microfinance Coalition?
            </h2>
            <p className="text-base text-white/90 max-w-2xl mx-auto">
              Our streamlined application process ensures that qualified
              institutions can quickly become part of our growing coalition.
            </p>

            <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-4">
              <button className="bg-white text-base text-green-700 font-bold px-6 py-3 rounded-md hover:bg-gray-100 transition">
                Join COMCIN Now!
              </button>

              {/* Partner Logos */}
              <div className="flex items-center space-x-2">
                <img
                  src={partnerBadge}
                  alt="Trusted Partner Badge"
                  className="h-12 w-auto object-contain"
                />
              </div>

              {/* Stars & Trust */}
              <div className="flex items-center text-white text-sm gap-1">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <BsStarFill key={i} className="text-yellow-400 text-lg" />
                  ))}
                <span className="ml-1">Trusted Partner</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Content */}
      <div
        className={`container mx-auto px-4 md:px-8 ${
          isHome ? "mt-20" : "mt-0"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo and Social */}
          <div>
            <img src={logo} alt="COMCIN Logo" className="h-20 mb-4" />
            <p className="text-sm text-white/70 mb-4">
              Coalition of Microlending and Cooperative Institutions in Nigeria
            </p>
            <div className="flex space-x-4">
              <FaFacebookF className="w-5 h-5 p-1 text-3xl rounded-full bg-[#B3D9BB3D] text-white/80 hover:text-white cursor-pointer" />
              <RiTwitterXLine className="w-5 h-5 p-1 text-3xl rounded-full bg-[#B3D9BB3D] text-white/80 hover:text-white cursor-pointer" />
              <FaLinkedinIn className="w-5 h-5 p-1 text-3xl rounded-full bg-[#B3D9BB3D] text-white/80 hover:text-white cursor-pointer" />
              <FaInstagram className="w-5 h-5 p-1 text-3xl rounded-full bg-[#B3D9BB3D] text-white/80 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-white/70 text-sm">
              <li>About Us</li>
              <li>Member Directory</li>
              <li>News & Events</li>
              <li>Resources</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-white/70 text-sm">
              <li className="flex items-start gap-2">
                <MdOutlineAttachEmail className="mt-1" />
                12 Broad Street, Lagos Island, Lagos, Nigeria
              </li>
              <li className="flex items-center gap-2">
                <LuPhone />
                +234 1 234 5678
              </li>
              <li className="flex items-center gap-2">
                <FiMapPin />
                info@comcin.org
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-sm text-white/70 mb-4">
              Subscribe to our newsletter for updates on microfinance trends and
              COMCIN activities.
            </p>
            <div className="flex items-center mb-2">
              <input
                type="email"
                placeholder="Your Email"
                className="px-4 py-2  bg-[#B3D9BB40] rounded-l-md text-black w-full text-base"
              />
              <button className="bg-[#0A8625] border border-[#8EC79B] px-4 py-2 rounded-md font-medium text-white">
                Subscribe
              </button>
            </div>
            <label className="flex items-center space-x-2 text-sm text-white/70">
              <input type="checkbox" className="accent-green-600" />
              <span>I agree to receive emails from COMCIN</span>
            </label>
          </div>
        </div>
      </div>
    </footer>
  );
}
