import { RoleGuard } from "@/components/auth/AuthProvider";

export default function MentorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard role="mentor">
      <div className="min-h-screen bg-slate-50">
        <main>{children}</main>
      </div>
    </RoleGuard>
  );
}
