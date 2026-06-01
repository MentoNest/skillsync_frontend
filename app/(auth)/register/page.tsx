"use client";
import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormValues } from "@/lib/validations/auth";
import FormField from "@/components/auth/FormField";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isDirty },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const password = watch("password", "");

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    try {
      // TODO: wire up to your auth service
      console.log("Register data:", data);
      await new Promise((r) => setTimeout(r, 1200));
    } finally {
      setIsLoading(false);
    }
  };

  // Password strength indicator
  const getPasswordStrength = (pw: string) => {
    if (!pw) return 0;
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
  };

  const strength = getPasswordStrength(password);
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = ["", "bg-red-400", "bg-amber-400", "bg-yellow-400", "bg-emerald-500"][strength];

  const EyeToggle = ({
    visible,
    onToggle,
  }: {
    visible: boolean;
    onToggle: () => void;
  }) => (
    <button
      type="button"
      onClick={onToggle}
      className="focus:outline-none hover:text-violet-600 transition-colors"
      aria-label={visible ? "Hide" : "Show"}
    >
      {visible ? (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )}
    </button>
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Create your account
        </h1>
        <p className="text-gray-500 text-sm mt-1.5">
          Join thousands of learners and mentors on SkillSync
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
        <FormField
          id="fullName"
          label="Full name"
          placeholder="Jane Doe"
          error={errors.fullName}
          registration={register("fullName")}
        />

        <FormField
          id="email"
          label="Email address"
          type="email"
          placeholder="you@example.com"
          error={errors.email}
          registration={register("email")}
        />

        {/* Role selector */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">I want to join as</label>
          <div className="grid grid-cols-2 gap-3">
            {(["mentee", "mentor"] as const).map((role) => (
              <label
                key={role}
                className="flex items-center gap-3 p-3 rounded-xl border cursor-pointer
                  border-gray-200 hover:border-violet-400 hover:bg-violet-50/50
                  has-[:checked]:border-violet-500 has-[:checked]:bg-violet-50
                  transition-all duration-150"
              >
                <input
                  type="radio"
                  value={role}
                  className="accent-violet-600"
                  {...register("role")}
                />
                <div>
                  <p className="text-sm font-medium text-gray-800 capitalize">{role}</p>
                  <p className="text-xs text-gray-400">
                    {role === "mentee" ? "Find & learn from mentors" : "Share your expertise"}
                  </p>
                </div>
              </label>
            ))}
          </div>
          {errors.role && (
            <p role="alert" className="text-xs text-red-500 flex items-center gap-1 mt-0.5">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.role.message}
            </p>
          )}
        </div>

        <div>
          <FormField
            id="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Min. 8 characters"
            error={errors.password}
            registration={register("password")}
            rightElement={
              <EyeToggle visible={showPassword} onToggle={() => setShowPassword((v) => !v)} />
            }
          />
          {/* Strength meter */}
          {password && (
            <div className="mt-2 flex items-center gap-2">
              <div className="flex gap-1 flex-1">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                      i <= strength ? strengthColor : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className={`text-xs font-medium ${
                strength <= 1 ? "text-red-500" :
                strength === 2 ? "text-amber-500" :
                strength === 3 ? "text-yellow-600" : "text-emerald-600"
              }`}>
                {strengthLabel}
              </span>
            </div>
          )}
        </div>

        <FormField
          id="confirmPassword"
          label="Confirm password"
          type={showConfirm ? "text" : "password"}
          placeholder="Repeat your password"
          error={errors.confirmPassword}
          registration={register("confirmPassword")}
          rightElement={
            <EyeToggle visible={showConfirm} onToggle={() => setShowConfirm((v) => !v)} />
          }
        />

        <button
          type="submit"
          disabled={!isDirty || !isValid || isLoading}
          className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-white
            bg-violet-600 hover:bg-violet-700 active:scale-[0.98]
            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-violet-600
            transition-all duration-150 flex items-center justify-center gap-2 shadow-sm shadow-violet-200"
        >
          {isLoading ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Creating account…
            </>
          ) : (
            "Create account"
          )}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-8">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-violet-600 font-semibold hover:text-violet-700 transition-colors"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}