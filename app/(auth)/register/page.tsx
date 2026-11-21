import Link from "next/link";

const input =
  "mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200";

const fields = [
  { name: "fullName", label: "Full name", type: "text", auto: "name" },
  { name: "email", label: "Email", type: "email", auto: "email" },
  { name: "password", label: "Password", type: "password", auto: "new-password" },
  { name: "confirmPassword", label: "Confirm password", type: "password", auto: "new-password" },
];

/** Registration form UI (#1360). */
export default function RegisterPage() {
  return (
    <form className="space-y-4" aria-labelledby="register-title">
      <h1 id="register-title" className="text-2xl font-semibold">Create your account</h1>
      {fields.map((f) => (
        <label key={f.name} className="block text-sm font-medium">
          {f.label}
          <input type={f.type} name={f.name} autoComplete={f.auto} required className={input} />
        </label>
      ))}
      <button type="submit" className="w-full rounded-lg bg-purple-700 py-2 font-medium text-white hover:bg-purple-800">
        Create Account
      </button>
      <p className="text-center text-sm">
        Already have an account? <Link href="/login" className="text-purple-700 hover:underline">Log in</Link>
      </p>
    </form>
  );
}
