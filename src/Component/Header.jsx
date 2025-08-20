import { useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false); // close menu on click
  };

  return (
    <div className="bg-white text-black rounded-md container mx-auto px-8 py-3 flex items-center">
      {/* Logo and Navigation Container */}
      <div className="flex items-center space-x-8">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="COMCIN Logo" className="h-10" />
        </Link>

        {/* Main Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          <Link
            to="/about"
            className="text-navtext hover:text-gray-500 transition-colors text-sm font-medium"
          >
            About
          </Link>
          <Link
            to="/members"
            className="text-navtext hover:text-gray-500 transition-colors text-sm font-medium"
          >
            Members
          </Link>
          <button
            onClick={() => scrollTo("benefits")}
            className="text-navtext hover:text-gray-500 transition-colors text-sm font-medium"
          >
            Benefits
          </button>
          <Link
            to="/news"
            className="text-navtext hover:text-gray-500 transition-colors text-sm font-medium"
          >
            News
          </Link>
          <Link
            to="/contact"
            className="text-navtext hover:text-gray-500 transition-colors text-sm font-medium"
          >
            Contact
          </Link>
        </nav>
      </div>

      {/* Actions + Mobile Toggle (pushed right) */}
      <div className="ml-auto flex items-center space-x-6">
        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/login"
            className="bg-white border border-green-700 text-green-700 px-6 py-2 rounded-md hover:bg-green-100 transition-colors text-sm font-medium"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-white bg-green-700 hover:bg-green-800 text-sm rounded-md font-medium py-2 px-6"
          >
            Become a Member
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-gray-200">
          <nav className="flex flex-col space-y-4 p-4">
            <Link
              to="/about"
              className="text-navtext hover:text-green-700 text-sm font-medium"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              to="/members"
              className="text-navtext hover:text-green-700 text-sm font-medium"
              onClick={() => setIsOpen(false)}
            >
              Members
            </Link>
            <button
              onClick={() => scrollTo("benefits")}
              className="text-navtext hover:text-green-700 text-sm font-medium text-left"
            >
              Benefits
            </button>
            <Link
              to="/news"
              className="text-navtext hover:text-green-700 text-sm font-medium"
              onClick={() => setIsOpen(false)}
            >
              News
            </Link>
            <Link
              to="/contact"
              className="text-navtext hover:text-green-700 text-sm font-medium"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>

            {/* Mobile Actions */}
            <Link
              to="/login"
              className="bg-white border border-green-700 text-green-700 px-6 py-2 rounded-md hover:bg-green-100 transition-colors text-sm font-medium"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-white bg-green-700 hover:bg-green-800 text-sm rounded-md font-medium py-2 px-6"
              onClick={() => setIsOpen(false)}
            >
              Become a Member
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
