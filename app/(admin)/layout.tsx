import { RoleGuard } from "@/components/auth/AuthProvider";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard role="admin">
      <div className="min-h-screen bg-slate-100">
        <main>{children}</main>
      </div>
    </RoleGuard>
  );
}
