import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FiPhoneCall } from "react-icons/fi";
import { RiSearch2Line } from "react-icons/ri";
import logoIMG from "../assets/image.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full bg-white shadow-md">
      <div className="container flex justify-between items-center py-4 px-4 mx-auto lg:px-8">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logoIMG} alt="SkillSync" className="h-8" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden items-center space-x-6 lg:flex">
          <div className="flex relative items-center py-2 px-4 bg-blue-50 rounded-lg">
            <span className="font-medium text-blue-600">Mentorship</span>
            <RiArrowDropDownLine className="ml-1 text-3xl text-blue-600" />
          </div>
          <div className="w-1 h-8 bg-gray-500" />
          <div className="flex items-center space-x-4 text-gray-600">
            <FiPhoneCall className="text-2xl" />
            <span>Contact us</span>
            <RiSearch2Line className="ml-4 text-2xl" />
            <span>Find Mentor</span>
          </div>
          <button className="py-2 px-6 text-gray-700 bg-blue-50 rounded-lg">
            Login
          </button>
          <button className="py-2 px-6 text-white bg-blue-600 rounded-lg">
            Sign up
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="p-4 bg-white shadow-md lg:hidden">
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center p-2 bg-blue-50 rounded-lg">
              <span className="font-medium text-blue-600">Mentorship</span>
              <RiArrowDropDownLine className="text-blue-600" />
            </div>
            <div className="my-2 border-t border-gray-300" />
            <div className="flex items-center space-x-2 text-gray-600">
              <FiPhoneCall className="text-blue-600" />
              <span>Contact us</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <RiSearch2Line className="text-1xl" />
              <span>Find Mentor</span>
            </div>
            <button className="py-2 px-4 text-gray-700 bg-blue-50 rounded-lg">
              Login
            </button>
            <button className="py-2 px-4 text-white bg-blue-600 rounded-lg">
              Sign up
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
