"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      } else {
        // Precise redirection logic as per #811
        switch (user.role) {
          case "mentor":
            router.push("/mentor");
            break;
          case "admin":
            router.push("/admin");
            break;
          case "mentee":
          default:
            router.push("/mentee");
            break;
        }
      }
    }
  }, [user, loading, router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-gray-500 animate-pulse">Redirecting to your dashboard...</p>
    </div>
  );
}
