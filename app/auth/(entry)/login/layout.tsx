import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log-in",
  description: "Account authentication will be available soon.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
