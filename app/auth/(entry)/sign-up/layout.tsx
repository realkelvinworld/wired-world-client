import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description:
    "Create a Wired World (WiredWorld) account to shop Ghana's premier online electronics store. Track orders, save wishlists, and enjoy a seamless checkout experience.",
  robots: { index: false, follow: false },
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
