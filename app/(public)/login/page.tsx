import AuthLayout from '@/components/auth/AuthLayout';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <AuthLayout>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
        <p className="text-gray-500 mb-8">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-cyan-600 hover:underline font-medium">
            Sign up
          </Link>
        </p>

        <form className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
            />
          </div>

          <button
            type="submit"
            className="bg-cyan-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-cyan-700 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </AuthLayout>
  );
}
