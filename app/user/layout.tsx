import DashboardShell from "@/app/user/(components)/dashboard-shell";
import AuthWrapper from "@/providers/auth-wrapper";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthWrapper>
      <DashboardShell>{children}</DashboardShell>
    </AuthWrapper>
  );
}
