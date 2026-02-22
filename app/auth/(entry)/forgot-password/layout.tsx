import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Reset your WiredWorld account password.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
