import React, { InputHTMLAttributes, forwardRef } from "react"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
  showPasswordToggle?: boolean
  onPasswordToggle?: () => void
  showPassword?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, showPasswordToggle, onPasswordToggle, showPassword, ...props }, ref) => {
    const isPasswordType = type === "password"
    
    return (
      <div className="relative">
        <input
          type={isPasswordType && showPasswordToggle && showPassword ? "text" : type}
          className={cn(
            "flex h-12 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:border-purple-500 disabled:cursor-not-allowed disabled:opacity-50 pr-12",
            error && "border-red-500 focus-visible:ring-red-500 focus-visible:border-red-500",
            className
          )}
          ref={ref}
          {...props}
        />
        {isPasswordType && showPasswordToggle && (
          <button
            type="button"
            onClick={onPasswordToggle}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-full p-1 transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff size={20} className="text-gray-500" />
            ) : (
              <Eye size={20} className="text-gray-500" />
            )}
          </button>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

export { Input }
