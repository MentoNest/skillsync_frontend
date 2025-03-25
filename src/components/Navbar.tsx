import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FiPhoneCall } from "react-icons/fi";
import { RiSearch2Line } from "react-icons/ri";
import logoIMG from "../assets/image.png";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md w-full fixed top-0 z-50">
      <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center py-4">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logoIMG} alt="SkillSync" className="h-8" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-6">
          <div className="relative flex items-center bg-blue-50 px-4 py-2 rounded-lg">
            <span className="text-blue-600 font-medium">Mentorship</span>
            <RiArrowDropDownLine className="ml-1 text-blue-600 text-3xl" />
          </div>
          <div className="h-8 w-1 bg-gray-500" />
          <div className="flex items-center space-x-4 text-gray-600">
            <FiPhoneCall className="text-2xl" />
            <span>Contact us</span>
            <RiSearch2Line className="ml-4 text-2xl" />
            <span>Find Mentor</span>
          </div>
          <button className="bg-blue-50 px-6 py-2 rounded-lg text-gray-700">Login</button>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg">Sign up</button>
        </div>

        {/* Mobile Menu Button */}
        <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white shadow-md p-4">
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center bg-blue-50 p-2 rounded-lg">
              <span className="text-blue-600 font-medium">Mentorship</span>
              <RiArrowDropDownLine className="text-blue-600" />
            </div>
            <div className="border-t border-gray-300 my-2" />
            <div className="flex items-center space-x-2 text-gray-600">
              <FiPhoneCall className="text-blue-600" />
              <span>Contact us</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <RiSearch2Line className="text-1xl" />
              <span>Find Mentor</span>
            </div>
            <button className="bg-blue-50 px-4 py-2 rounded-lg text-gray-700">Login</button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Sign up</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
