import logo from "../assets/logo.png";
import { useState } from "react";
import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import image1 from "../assets/image1.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic form validation
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setError("");
    // Handle form submission logic here
    console.log("Login submitted:", { email, password });
  };

  return (
    
      <div>
        <h2 className="hidden md:block text-[#d4d1ce] ml-[9rem] text-2xl" >Login</h2>

        <div className=" md:fixed inset-0 flex flex-col md:flex-row justify-center items-center gap-10 p-10">
          <div className="mb-5">
            <img src={logo} alt="SkillSync Logo" className=" md:w-32 mb-12 self-center" />
             <h2 className="text-[#05283E] font-bold text-[25px]">Welcome Back,</h2>
            <p className="text-[#667085] mb-[2rem]">Elevate Your Student Commerce Experience!</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <EnvelopeIcon className="absolute w-5 h-5 text-gray-400 left-3 top-3.5" />
                <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 pl-10 pr-4 py-2 rounded focus:outline-[#EAECF0B2]"
                />
             </div>

             <div className="relative">
                <LockClosedIcon className="absolute w-5 h-5 text-gray-400 left-3 top-3.5" />
                <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 pl-10 pr-10 py-2 rounded focus:outline-blue-500"
                />
               <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3"
                  >
                  {showPassword ? (
                  <EyeSlashIcon className="w-5 h-5 text-gray-400" />
                   ) : (
                  <EyeIcon className="w-5 h-5 text-gray-400" />
                  )}
                </button>
             </div>

              <div className="flex justify-end text-sm">
                <Link to="/forgot-password" className="text-[#0E78B9] hover:underline">
                   Forgot Password?
                </Link>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

             <button type="submit" className="w-full bg-[#0E78B9] text-white py-2 rounded ">
               Login
              </button>
           </form>

            <p className="text-center text-[#667085] text-1xl mt-10">
              Don’t have an account?{" "}
              <Link to="/register" className="text-[#0E78B9] hover:underline">
                 Register
              </Link>
           </p>


          </div>     
          <div>
            <img src={image1} alt="" className="hidden  md:block w-[25rem] h-[33rem] mb-[4rem] " />
          </div>
       </div>
        <p className="text-[#667085] text-center px-1 md:hidden mt-[-5rem]">
          By clicking on the “Create Account” button, you <br  /> indicate that you agree to the <Link to="/Terms of Service"  className="text-[#667085] underline">Terms of Service  </Link> and <Link to="/register"  className="text-[#667085]  underline">Privacy <br /> Policy </Link>
         
        </p>

      </div>
    
  );
};

export default Login;
