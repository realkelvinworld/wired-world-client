import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log In",
  description:
    "Sign in to your Wired World (WiredWorld) account to access your orders, wishlist, and saved addresses.",
  robots: { index: false, follow: false },
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
