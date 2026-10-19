import { RoleGuard } from "@/components/auth/AuthProvider";

export default function MenteeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard role="mentee">
      <div className="min-h-screen bg-slate-50">
        <main>{children}</main>
      </div>
    </RoleGuard>
  );
}
