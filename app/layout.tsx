import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

import Announcements from "@/components/ux/nav/announcements";
import QuickNav from "@/components/ux/nav/quick-nav";
import TrustBar from "@/components/ux/trust-bar";
import Footer from "@/components/ux/footer";
import AppProvider from "@/providers/app";
import Navbar from "@/components/ux/nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://wiredworldgh.com";

export const metadata: Metadata = {
  title: {
    default: "WiredWorld — Electronics, Home Appliances & More",
    template: "%s | WiredWorld",
  },
  description:
    "Ghana's premier online electronics store. Shop TVs, home appliances, audio systems, kitchen gadgets, laptops & air conditioning from Samsung, LG, Sony, TCL, Midea, Nasco & more. Nationwide delivery, competitive pricing & B2B support since 2020.",
  keywords: [
    "electronics store Ghana",
    "home appliances Accra",
    "smart TVs",
    "4K UHD TVs",
    "OLED TVs",
    "refrigerators",
    "washing machines",
    "soundbars",
    "headphones",
    "laptops",
    "air conditioners",
    "kitchen appliances",
    "LG",
    "Samsung",
    "Sony",
    "TCL",
    "Midea",
    "Nasco",
    "Electrolux",
    "Bruhm",
    "Ariston",
    "JBL",
    "WiredWorld",
    "Wired World Limited",
    "buy electronics online Ghana",
    "B2B electronics Ghana",
    "bulk electronics orders Accra",
  ],
  authors: [{ name: "WiredWorld" }],
  creator: "WiredWorld",
  publisher: "WiredWorld",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "WiredWorld",
    title: "WiredWorld — Electronics, Home Appliances & More | Accra, Ghana",
    description:
      "Ghana's premier online electronics destination since 2020. Authentic products from Samsung, LG, Sony & more — nationwide delivery, competitive pricing & world-class service.",
    images: [
      {
        url: "/logos/WIRED-WORLD-2.png",
        width: 512,
        height: 512,
        alt: "WiredWorld Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WiredWorld — Electronics, Home Appliances & More | Ghana",
    description:
      "Ghana's premier online electronics destination since 2020. Authentic products from Samsung, LG, Sony & more — nationwide delivery, competitive pricing & world-class service.",
    images: ["/logos/WIRED-WORLD-2.png"],
  },
  icons: {
    icon: "/logos/WIRED-WORLD-2.png",
    apple: "/logos/WIRED-WORLD-2.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <AppProvider>
          <Announcements />
          <Navbar />
          {children}
          <QuickNav />
          <TrustBar />
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
