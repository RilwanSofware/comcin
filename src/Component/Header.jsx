import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

export default function Header() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-white text-black rounded-md container mx-auto px-8 py-3 flex items-center">
      {/* Logo and Navigation Container */}
      <div className="flex items-center space-x-8">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src={logo}
            alt="COMCIN Logo"
            className="h-10" // Adjust height as needed
          />
        </div>

        {/* Main Navigation - now positioned right next to logo */}
        <nav className="hidden md:flex space-x-8 items-center">
          <button
            onClick={() => scrollTo("about")}
            className="text-navtext hover:text-gray-500 transition-colors text-sm font-medium"
          >
            About
          </button>
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

      {/* Action Buttons - pushed to the right */}
      <div className="flex-1 flex justify-end items-center space-x-6">
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
    </div>
  );
}
