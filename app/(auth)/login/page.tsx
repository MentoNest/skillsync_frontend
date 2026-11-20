import Link from "next/link";

const input =
  "mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200";

/** Login form UI (#1361). */
export default function LoginPage() {
  return (
    <form className="space-y-4" aria-labelledby="login-title">
      <h1 id="login-title" className="text-2xl font-semibold">Welcome back</h1>
      <label className="block text-sm font-medium">
        Email
        <input type="email" name="email" autoComplete="email" required className={input} />
      </label>
      <label className="block text-sm font-medium">
        Password
        <input type="password" name="password" autoComplete="current-password" required className={input} />
      </label>
      <div className="text-right text-sm">
        <Link href="/forgot-password" className="text-purple-700 hover:underline">Forgot password?</Link>
      </div>
      <button type="submit" className="w-full rounded-lg bg-purple-700 py-2 font-medium text-white hover:bg-purple-800">
        Log in
      </button>
      <p className="text-center text-sm">
        No account? <Link href="/register" className="text-purple-700 hover:underline">Register</Link>
      </p>
    </form>
  );
}
