import logoIMG from "../assets/image.png";
import { FaFacebook, FaTwitterSquare, FaLinkedin } from "react-icons/fa";
export default function Footer() {
  return (
    <footer className="py-8 mt-32 border-t border-gray-200">
      <div className="w-[90%] mx-auto flex md:flex-row flex-col gap-8 md:justify-between">
        <div className="flex flex-col gap-4 text-sm text-gray-600">
          <div className="flex flex-col gap-3">
            <img src={logoIMG} alt="SkillSync" className="h-8 w-fit" />
            <p>© Copyright 2022 Bluepreent - Mentors for Mentees</p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-gray-600">Quick Links</h3>
            <ul className="flex flex-col gap-1 text-[#969696]">
              <li>
                {" "}
                <a className="hover:text-gray-500" href="/ ">
                  Home{" "}
                </a>{" "}
              </li>
              <li>
                <a className="hover:text-gray-500" href="/ ">
                  {" "}
                  About{" "}
                </a>{" "}
              </li>
              <li>
                <a className="hover:text-gray-500" href="/ ">
                  Become a mentor{" "}
                </a>{" "}
              </li>
              <li>
                <a className="hover:text-gray-500" href="/ ">
                  Contact
                </a>{" "}
              </li>
              <li>
                <a className="hover:text-gray-500" href="/ ">
                  Find a mentor
                </a>{" "}
              </li>
              <li>
                <a className="hover:text-gray-500" href="/ ">
                  Help
                </a>{" "}
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-4 text-sm">
          <div className="flex flex-col">
            <h3 className="text-sm text-gray-600">Phone</h3>
            <a href="" className="text-gray-800 hover:text-gray-600">
              +234 8029 290 1100
            </a>
          </div>

          <div className="flex flex-col">
            <h3 className="text-sm text-gray-600">Email</h3>
            <a href="" className="text-[#0E78B9]">
              support@bluepreent.com
            </a>
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="text-sm text-gray-600">Social</h3>
            <div className="flex gap-3 text-gray-800">
              <a href=" ">
                {" "}
                <FaFacebook />{" "}
              </a>
              <a href=" ">
                {" "}
                <FaLinkedin />{" "}
              </a>
              <a href=" ">
                {" "}
                <FaTwitterSquare />{" "}
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col text-sm">
          <h3 className="text-sm text-gray-600">Lagos, Nigeria</h3>
          <p className="text-gray-800">
            Gabriel House, Victoria Island 1102, NG
          </p>
        </div>
      </div>
    </footer>
  );
}
