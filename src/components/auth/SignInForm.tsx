import { useState } from "react";
import { SvgIcons } from "../../assets/svg/svg";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

type FormData = yup.InferType<typeof schema>;

export const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleTogglePasswordVisibilty = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    // Handle sign-in logic here
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <div>
            <div className="relative md:max-w-[25.75rem]">
              <input
                type="text"
                placeholder="Email Address"
                className="rounded border border-[rgba(234,236,240,0.7)] bg-[#FFFFFF] h-12 outline-none w-full px-11 focus:border-[#0E78B9] text-[#161616be] hover:bg-[rgba(89,89,90,0.05)] focus:bg-[rgba(89,89,90,0.05)] focus:border transition duration-100 ease-in-out placeholder:font-normal placeholder:text-[0.81rem] placeholder:text-[#879196]"
                {...register("email")}
              />
              <div className="absolute left-[1.125rem] top-1/2 -translate-y-1/2">
                {SvgIcons.mailIcon()}
              </div>
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <div className="relative md:max-w-[25.75rem]">
              <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Password"
                className="rounded border border-[rgba(234,236,240,0.7)] bg-[#FFFFFF] h-12 outline-none w-full px-11 focus:border-[#0E78B9] text-[#161616e0] hover:bg-[rgba(89,89,90,0.05)] focus:bg-[rgba(89,89,90,0.05)] focus:border transition duration-100 ease-in-out placeholder:font-normal placeholder:text-[0.81rem] placeholder:text-[#879196]"
                {...register("password")}
              />
              <div className="absolute left-[1.125rem] top-1/2 -translate-y-1/2">
                {SvgIcons.sheidIcon()}
              </div>
              <div
                onClick={handleTogglePasswordVisibilty}
                role="button"
                aria-label="Toggle password visibility"
                className="absolute right-[1.125rem] top-1/2 -translate-y-1/2 cursor-pointer"
              >
                {isPasswordVisible ? SvgIcons.eyeOn() : SvgIcons.eyeOff()}
              </div>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1 relative">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <div className="pt-[10px] flex items-end justify-end pb-8">
          <a
            href="#"
            className="text-sm font-semibold text-[#0E78B9] leading-6 hover:text-[#0e77b9d5] transition ease-in-out duration-75"
          >
            Forgot Password?
          </a>
        </div>

        <div className="space-y-[1rem]">
          <button
            type="submit"
            className="outline-none border-0 text-[0.81rem] rounded bg-[#0E78B9] h-12 w-full text-center text-white font-medium leading-[1.125rem] hover:bg-[rgba(14,119,185,0.9)] transition ease-in-out duration-75"
          >
            Login
          </button>
          <p className="text-sm font-normal leading-[1.375rem] flex items-center justify-center text-[#667085]">
            Don’t have an account?
            <a
              href="#"
              className="font-semibold text-[#0E78B9] pl-1 underline underline-offset-4"
            >
              Register
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};
