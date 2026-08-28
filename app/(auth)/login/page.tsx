import type { Metadata } from "next";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Log in | SkillSync",
  description: "Log in to your SkillSync account.",
};

export default function LoginPage() {
  return (
    <div className="w-full">
      <LoginForm />
    </div>
  );
}