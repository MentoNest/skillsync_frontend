'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import PasswordInput from './PasswordInput';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log('Login:', data);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
      <p className="text-gray-500 mb-8">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="text-cyan-600 hover:underline font-medium">
          Sign up
        </Link>
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
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
            className={`border rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 transition ${
              errors.email
                ? 'border-red-400 focus:ring-red-300 focus:border-red-400'
                : 'border-gray-300 focus:ring-cyan-500 focus:border-cyan-500'
            }`}
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

        <button
          type="submit"
          disabled={isDirty && !isValid}
          className="bg-cyan-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-cyan-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Login
        </button>
      </form>
    </div>
  );
}
