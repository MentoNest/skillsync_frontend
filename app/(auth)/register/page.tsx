"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api-client";
import { Loader2 } from "lucide-react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "mentee" // Default role
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await apiRequest("/auth/register", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      
      // Redirect to login after successful registration
      router.push("/login?registered=true");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center">Create an Account</h1>
        
        {error && <p className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">{error}</p>}
        
        <input
          placeholder="Full Name"
          required
          className="w-full p-2 border rounded-lg"
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
        
        <input
          type="email"
          placeholder="Email Address"
          required
          className="w-full p-2 border rounded-lg"
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />

        <input
          type="password"
          placeholder="Password"
          required
          className="w-full p-2 border rounded-lg"
          onChange={(e) => setFormData({...formData, password: e.target.value})}
        />

        <select 
          className="w-full p-2 border rounded-lg"
          onChange={(e) => setFormData({...formData, role: e.target.value})}
        >
          <option value="mentee">I want to be a Mentee</option>
          <option value="mentor">I want to be a Mentor</option>
        </select>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white p-2 rounded-lg font-medium flex items-center justify-center gap-2"
        >
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          {isLoading ? "Creating Account..." : "Register"}
        </button>
      </form>
    </div>
  );
}
