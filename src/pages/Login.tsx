import { useState } from "react";
import { EnvelopeIcon, ShieldCheckIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import image1 from "../assets/image1.png";
import "../login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string[]>([]);


  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors: string[] = [];
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if (!email) {
      errors.push("Email must be entered before submission.");
    } else if (!emailRegex.test(email)) {
      errors.push("Email format validation.");
    }
  
    if (!password) {
      errors.push("Password must be entered before submission."); 
    }
  
    if (errors.length > 0) {
      setError(errors);
      return;
    }
  
    setError([]);
    console.log("Form submitted:", { email, password });
  };
  
  return (

 <div>
    <h2 className="login  hidden lg:block lg:text-[#ccc9c9] lg:ml-24">Login</h2>

    <div className="container flex flex-col md:flex-row lg:flex-col justify-center items-center mb-12">
      <div className="main  mt-14 w-[380px]">
        <img src={logo} alt="SkillSync Logo" className="logo" />
        <h2 className="text-[#05283E]">Welcome Back,</h2>
        <p className=" text-[color: #667085;]">Elevate Your Student Commerce Experience!</p>



        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="email-container relative  w-full mb-4">
            <EnvelopeIcon className="envelope-icon absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 " />

            <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
             className="input  w-[87%] border border-gray-300 pl-9 pr-3 py-2 rounded outline-none text-[#879196]"/>
          </div>

         <div className="password-container relative  w-full mb-5">
           <ShieldCheckIcon className="shieldcheck-icon  absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

            <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="password-input" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="eye-toggle-btn  bg-none border-none cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 p-0">
              {showPassword ? (
              <EyeSlashIcon className="eye-icon w-5 h-5 text-gray-400" />
              ) : (
              <EyeIcon className="eye-icon" />
              )}
           </button>
          </div>

          {error.length > 0 && (
              <div className="error-messages">
                {error.map((err, index) => (
                  <p key={index}>{err}</p>
                ))}
              </div>
            )} 

          <div className="flex justify-end">
            <Link to="/forgot-password" className="forget text-[#0E78B9] no-underline ml-64">
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className="login-button bg-[#0E78B9] w-full h-12 text-white pt-2 pb-2 mt-5 rounded border-none">
            Login
          </button>

          <p className="account text-[#667085] text-center mt-4 text-sm">
            Don’t have an account?{" "}
            <Link to="/register" className="register text-[#0E78B9] underline font-bold">
              Sign Up
            </Link>
          </p>
          <div className="note flex flex-col items-center justify-center text-center text-[#667085] text-[12px] mb-12 mt-10 sm:hidden">
            <h3>By clicking on the “Create Account” button, you <br />
            indicate that you agree to the 

            <Link to="/ Terms of Service" className="underline decoration-[#667085]"> Terms of Service
            </Link>  and
            <Link to="/ Privacy policy" className=" underline decoration-[#667085]">  Privacy  <br />Policy
            </Link>
            </h3>
          </div>
        </form>

      </div>

      <div>
         <img src={image1} alt="" className="image1 hidden sm:block lg:w-[380px] lg:h-[32rem]" />
       </div>

    </div>
        
          
  </div>
    
 
   
  );
};




export default Login