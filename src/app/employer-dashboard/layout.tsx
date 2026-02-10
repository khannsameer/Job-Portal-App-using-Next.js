import EmployersSidebar from "@/features/employers/components/employers-sidebar";
import { getCurrentUser } from "@/features/server/auth.queries";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();
  // console.log("users data", user);

  if (!user) return redirect("/login");

  if (user.role !== "employer") return redirect("/dashboard");

  return (
    <div className="flex min-h-screen bg-background">
      <EmployersSidebar />
      <main className="container mx-auto mt-5 ml-70 mr-5">{children}</main>
    </div>
  );
}
