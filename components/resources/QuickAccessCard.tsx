import Link from "next/link";
import QuickAccessCardSkeleton from "@/components/skeleton/QuickAccessCardSkeleton";

export interface QuickAccessCardProps {
  title: string;
  description?: string;
  href?: string;
  loading?: boolean;
}

export default function QuickAccessCard({
  title,
  description,
  href = "#",
  loading = false,
}: QuickAccessCardProps) {
  if (loading) return <QuickAccessCardSkeleton />;

  return (
    <Link
      href={href}
      className="block rounded-lg bg-white p-4 shadow-sm hover:shadow-md transition"
    >
      <h3 className="text-base font-medium">{title}</h3>
      {description && <p className="mt-1 text-sm text-gray-600">{description}</p>}
    </Link>
  );
}
