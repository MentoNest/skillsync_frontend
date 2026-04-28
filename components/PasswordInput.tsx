'use client';

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export interface PasswordInputProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  autoComplete?: string;
  className?: string;
}

export default function PasswordInput({
  id,
  name,
  label,
  value,
  onChange,
  error,
  placeholder,
  autoComplete,
  className = '',
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={showPassword ? 'text' : 'password'}
          autoComplete={autoComplete}
          value={value}
          onChange={onChange}
          className={`appearance-none block w-full px-3 py-2 pr-10 border ${
            error ? 'border-red-300' : 'border-gray-300'
          } rounded-lg placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm`}
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={togglePassword}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-md"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Eye className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}