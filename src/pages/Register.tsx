import { useState, ChangeEvent, FormEvent } from "react";
import image from "../assets/auth-image.png"
import logo from "../assets/skillsync.png"
import flag from "../assets/flag.png"
import password from "../assets/shield.png"
import referral from "../assets/referral.png"
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

interface FirstFormState {
  firstName: string;
  lastName: string;
  schoolName: string;
  email: string;
  department: string;
  year: string;

}

interface SecondFormState {
  phoneNumber: string;
  whatsapp: string;
   password: string;
  referralCode: string;
}

interface FormErrors {
  [key: string]: string | undefined;
}

const Register: React.FC = () => {
  
  const initialState: FirstFormState = {
    firstName: "",
    lastName: "",
    schoolName:"",
    email: "",
    department: "",
     year:"",
  
  };

  const secondFormState: SecondFormState = {
    phoneNumber: "",
    whatsapp: "",
    password: "",
    referralCode:"",
  };

  const [formData, setFormData] = useState<FirstFormState>(initialState);
  const [secondFormData, setSecondFormData] = useState<SecondFormState>(secondFormState);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showSecondForm, setShowSecondForm] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const validateFirstForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName) newErrors.firstName = "First name is required.";
    if (!formData.lastName) newErrors.lastName = "Last name is required.";
    if (!formData.schoolName) newErrors.schoolName = "School name is required.";
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid.";
    }
    // if (!formData.department) newErrors.department = "Department is required.";
    // if (!formData.year) newErrors.year = "Year is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFirstFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateFirstForm()) {
      setShowSecondForm(true);
    }
  };

  const validateSecondForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!secondFormData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required.";
    } else if (!/^\+?\d+$/.test(secondFormData.phoneNumber) || secondFormData.phoneNumber.replace(/^\+/, "").length < 11) {
      newErrors.phoneNumber = "Phone number must be at least 11 digits long and may start with a '+'";
    }
    if (!secondFormData.whatsapp) {
      newErrors.whatsapp = "Whatsapp number is required.";
    } else if (!/^\+?\d+$/.test(secondFormData.whatsapp) || secondFormData.whatsapp.replace(/^\+/, "").length < 11) {
      newErrors.whatsapp = "Whatsapp number must be at least 11 digits long and may start with a '+'";
    }
 if (!secondFormData.password) {
      newErrors.password = "Password is required.";
    } else if (secondFormData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSecondFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateSecondForm()) return;

    const combinedFormData = { ...formData, ...secondFormData };
    console.log("Form submitted successfully:", combinedFormData);

    setFormData(initialState);
    setSecondFormData(secondFormState);

  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));

    if (name === "phoneNumber" || name === "whatsapp") {
      const NumberValue = value.replace(/[^0-9+]/g, "");
      setSecondFormData((prevData) => ({ ...prevData, [name]: NumberValue }));
    } else if (name in secondFormData) {
      setSecondFormData((prevData) => ({ ...prevData, [name]: value }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  return (
      <main className="flex h-[100vh] w-[95%] mx-auto">
          
          {/* form section */}
      <div className="md:w-[50%]">
        <div className="flex flex-col mx-auto w-[90%] md:w-[80%] my-14">
          <a href="/signup-guardian" className="text-right text-primary mb-5">
            Already have an account? Sign In
          </a>

          <img src={logo} alt="skillsync" width={100} className="mb-3" />
          <h1 className="text-[28px] my-2 font-[600] text-[#05283E]">Get Started,</h1>
          <p className="text-[#667085] text-[16px]">Join the Student Commerce Revolution!</p>
          <form
              className="text-sm text-gray-800"
              onSubmit={
                showSecondForm ? handleSecondFormSubmit : handleFirstFormSubmit
              }
            >
              {!showSecondForm ? (
                <>
                  {/* Name */}
                  <div className="flex gap-3 my-3">
                    <div className="w-[50%]">
                      {" "}
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        className="border border-gray-300 py-2 px-1 rounded-md outline-none w-full"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-xs">
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    <div className="w-[50%]">
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        className="border border-gray-300 py-2 px-1 rounded-md outline-none w-full"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-xs">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>
                  {/* School */}
                  <div className="flex w-full items-center gap-2 border border-gray-300 py-2 px-1 rounded-md my-3">
                    <input
                      type="text"
                      name="schoolName"
                      placeholder="School"
                      className="w-full outline-none"
                      value={formData.schoolName}
                      onChange={handleChange}
                    />
                </div>
                    {errors.schoolName && (
                    <p className="text-red-500 text-xs">{errors.schoolName}</p>
                )}
                 
                
                 {/* Email */}
                  <div className="flex items-center gap-1 border border-gray-300 py-2 px-1 rounded-md my-3">
                    {/* <img src={mail} alt="" /> */}
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      className="w-full outline-none"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-xs">{errors.email}</p>
                )}
                 
                 
                <div className="flex gap-3 my-3">
                     <div className="w-[50%]">
                      <select
                        name="department"
                        className="border border-gray-300 py-3 px-2 rounded-md outline-none w-full text-gray-600 bg-white"
                        value={formData.department}
                        onChange={handleChange}
                      >
                        <option value="" disabled>
                          Department
                        </option>
                       
                      </select>
                      {errors.department && (
                        <p className="text-red-500 text-xs">
                          {errors.department}
                        </p>
                      )}
                    </div>
                <div className="w-[50%]">
                      <select
                        name="year"
                        className="border border-gray-300 py-3 px-2 rounded-md outline-none w-full text-gray-600 bg-white"
                        value={formData.year}
                        onChange={handleChange}
                      >
                        <option value="" disabled>
                          Year of study
                        </option>

                      </select>
                      {errors.department && (
                        <p className="text-red-500 text-xs">
                          {errors.department}
                        </p>
                      )}
                    </div>
                 </div>
                 
                
                  {/* Button */}
                  <button
                    type="submit"
                    className="flex justify-center mx-auto bg-[#0E78B9] text-white py-2 text-sm rounded my-5 w-full"
                  >
                    Continue
                  </button>
                </>
              ) : (
                <>
                  {/* Second Form Fields with Dropdowns */}
                  <>
                    <div className="flex items-center gap-1 border border-gray-300 py-2 px-1 rounded-md my-3">
                       <img src={flag} alt="" />
                   
                    <input
                      type="text"
                      name="phoneNumber"
                      placeholder="Enter Phone Number"
                      className="w-full outline-none"
                      value={secondFormData.phoneNumber}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-xs">{errors.phoneNumber}</p>
                )}
                    {/*  */}
                    <div className="flex items-center gap-1 border border-gray-300 py-2 px-1 rounded-md my-3">
                       <img src={flag} alt="" />
                 
                    <input
                      type="text"
                      name="whatsapp"
                      placeholder="Enter Whatsapp Number"
                      className="w-full outline-none"
                      value={secondFormData.whatsapp}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.whatsapp && (
                    <p className="text-red-500 text-xs">{errors.whatsapp}</p>
                    )}
                    {/*  */}

                      {/* Password */}
                    <div className="flex justify-between items-center border border-gray-300 py-2 px-1 rounded-md my-3">
                      <div className="flex items-center gap-1">
                      <img src={password} alt="" />
                      <input
                        className="outline-none"
                        name="password"
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                        value={secondFormData.password}
                        onChange={handleChange}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleTogglePasswordVisibility}
                    >
                      {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-xs">{errors.password}</p>
                  )}
                    
                    {/*  */}
                     {/* Referral code */}
                  <div className="flex w-full items-center gap-2 border border-gray-300 py-2 px-1 rounded-md my-3">
                    <img src={referral} alt="" />
                    <input
                      type="text"
                      name="referral"
                      placeholder="Referral Code"
                      className="w-full outline-none"
                      value={secondFormData.referralCode}
                      onChange={handleChange}
                    />
                    </div>
                    
                  {/* Submit Button for Second Form */}
                  <button
                    type="submit"
                    className="flex justify-center mx-auto bg-[#0E78B9] text-white py-2 text-sm rounded my-5 w-full "
                  >
                    Create Account
                  </button>
                  </>
                </>
              )}
                  </form>
                    
            <div className="text-center w-[90%] text-primary flex mx-auto text-sm my-4">
              <p>
                By clicking on the &quot;Create Account&quot; button, you
                indicate that you agree to the{" "}
                <a href={""} className="underline">Terms of Service</a> and{" "}
                <a href={""} className="underline">Privacy Policy</a>
              </p>
            </div>
          </div>
          </div>
          

          {/* Image section*/}
          <div className="hidden md:flex"><img src={image} alt="image"/></div>
    </main>
  );
};

export default Register;



