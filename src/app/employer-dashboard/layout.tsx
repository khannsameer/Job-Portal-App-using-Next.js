import { getCurrentUser } from "@/features/server/auth.queries";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();
  console.log("users data", user);

  if (!user) return redirect("/login");

  if (user.role !== "employer") return redirect("/dashboard");

  return <>{children}</>;
}
