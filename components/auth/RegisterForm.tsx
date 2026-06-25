'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import PasswordInput from './PasswordInput';

const registerSchema = z
  .object({
    name: z.string().min(1, 'Full name is required'),
    email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: 'onTouched',
  });

  const onSubmit = (data: RegisterFormValues) => {
    console.log('Register:', data);
  };

  const fieldClass = (hasError: boolean) =>
    `border rounded-lg px-3 py-2.5 text-sm w-full outline-none focus:ring-2 transition ${
      hasError
        ? 'border-red-400 focus:ring-red-300 focus:border-red-400'
        : 'border-gray-300 focus:ring-cyan-500 focus:border-cyan-500'
    }`;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Create an account</h1>
      <p className="text-gray-500 mb-8">
        Already have an account?{' '}
        <Link href="/login" className="text-cyan-600 hover:underline font-medium">
          Login
        </Link>
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
        {/* Full Name */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Jane Doe"
            {...register('name')}
            aria-invalid={!!errors.name}
            className={fieldClass(!!errors.name)}
          />
          {errors.name && (
            <p role="alert" className="text-xs text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            {...register('email')}
            aria-invalid={!!errors.email}
            className={fieldClass(!!errors.email)}
          />
          {errors.email && (
            <p role="alert" className="text-xs text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">
            Password
          </label>
          <PasswordInput
            id="password"
            placeholder="••••••••"
            {...register('password')}
            aria-invalid={!!errors.password}
            className={errors.password ? 'border-red-400 focus:ring-red-300 focus:border-red-400' : ''}
          />
          {errors.password && (
            <p role="alert" className="text-xs text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <PasswordInput
            id="confirmPassword"
            placeholder="••••••••"
            {...register('confirmPassword')}
            aria-invalid={!!errors.confirmPassword}
            className={errors.confirmPassword ? 'border-red-400 focus:ring-red-300 focus:border-red-400' : ''}
          />
          {errors.confirmPassword && (
            <p role="alert" className="text-xs text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isDirty && !isValid}
          className="bg-cyan-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-cyan-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}
