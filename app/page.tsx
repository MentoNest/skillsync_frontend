import { redirect } from "next/navigation";

// Root redirects to the public landing page served by the (public) route group
export default function RootPage() {
  redirect("/");
}
