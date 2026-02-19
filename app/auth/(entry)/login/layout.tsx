import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log-in",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
