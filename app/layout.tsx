import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";

import "./globals.css";

import Announcements from "@/components/ux/nav/announcements";
import WhatsAppButton from "@/components/ux/whatsapp-button";
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
    default:
      "Wired World (WiredWorld) — Electronics, Home Appliances & More | Ghana",
    template: "%s | WiredWorld",
  },
  description:
    "Wired World Limited (WiredWorld) — Ghana's premier online electronics store. Shop TVs, home appliances, audio systems, gaming consoles, wearables & smart home devices from Samsung, LG, Sony, TCL, Midea, Nasco, Bruhm, JBL, Ariston & 15+ trusted brands. Nationwide delivery, Mobile Money accepted, B2B corporate procurement since 2020.",
  keywords: [
    "Wired World",
    "WiredWorld",
    "Wired World Limited",
    "Wired World Ghana",
    "Wired World Accra",
    "Wired World electronics",
    "Wired World online store",
    "wiredworldgh",
    "electronics store Ghana",
    "online electronics store Ghana",
    "buy electronics online Ghana",
    "home appliances Accra",
    "home appliances Ghana",
    "buy TV online Ghana",
    "buy fridge online Ghana",
    "buy washing machine Ghana",
    "buy air conditioner Ghana",
    "smart TVs Ghana",
    "4K UHD TVs",
    "OLED TVs",
    "QLED TVs",
    "soundbars Ghana",
    "headphones Ghana",
    "refrigerators Ghana",
    "washing machines Ghana",
    "air conditioners Ghana",
    "kitchen appliances Ghana",
    "gaming consoles Ghana",
    "gaming accessories Ghana",
    "smartwatches Ghana",
    "fitness trackers Ghana",
    "printers Ghana",
    "projectors Ghana",
    "networking equipment Ghana",
    "office IT equipment Ghana",
    "Samsung",
    "LG",
    "Sony",
    "TCL",
    "Midea",
    "Nasco",
    "Sigma",
    "Electrolux",
    "MDV",
    "Audiio",
    "Bruhm",
    "Pearl",
    "Innova",
    "Ariston",
    "Tesla",
    "JBL",
    "Harman",
    "B2B electronics Ghana",
    "bulk electronics orders Ghana",
    "corporate electronics procurement Ghana",
    "electronics for schools Ghana",
    "electronics for hotels Ghana",
    "government electronics supply Ghana",
    "authorized electronics distributor Ghana",
    "authentic electronics Ghana",
    "Mobile Money electronics Ghana",
    "MTN MoMo electronics",
    "pay on delivery Ghana",
    "WiredWorld WhatsApp",
    "WhatsApp WiredWorld Ghana",
    "contact WiredWorld WhatsApp",
    "+233551105055",
  ],
  authors: [
    {
      name: "Kelvin Kumordzi",
      url: "https://kelvinworld.com",
    },
    {
      name: "Joel Aryetey",
      url: "https://damtetechnologies.com",
    },
  ],
  creator: "Damte Technologies",
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
    title:
      "Wired World Limited (WiredWorld) — Electronics, Home Appliances & More | Accra, Ghana",
    description:
      "Ghana's premier online electronics destination since 2020. Authentic products from Samsung, LG, Sony & 15+ brands — nationwide delivery, Mobile Money accepted, competitive pricing & dedicated B2B and corporate procurement.",
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
    title: "Wired World (WiredWorld) — Electronics & Home Appliances | Ghana",
    description:
      "Ghana's premier online electronics destination since 2020. Authentic products from Samsung, LG, Sony & 15+ brands — nationwide delivery, Mobile Money accepted, competitive pricing & dedicated B2B and corporate procurement.",
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
  other: {
    "application-name": "WiredWorld",
    "developed-by":
      "Kelvin Kumordzi & Joel Aryetey — Damte Technologies (https://damtetechnologies.com)",
    "development-agency": "Damte Technologies",
    "agency-url": "https://damtetechnologies.com",
    "engineer-1": "Kelvin Kumordzi",
    "engineer-2": "Joel Aryetey",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "WiredWorld",
  alternateName: "Wired World Limited",
  url: "https://wiredworldgh.com",
  logo: "https://wiredworldgh.com/logos/WIRED-WORLD-2.png",
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+233-55-110-5055",
      contactType: "customer service",
      availableLanguage: "English",
      areaServed: "GH",
      contactOption: "WhatsApp",
    },
  ],
  sameAs: [
    "https://www.facebook.com/share/183BWcSS9A/?mibextid=wwXIfr",
    "https://www.instagram.com/wiredworldltd?igsh=MXIyNGM4ajNqaGVydw==",
    "https://www.tiktok.com/@wiredworldltd?_r=1&_t=ZS-94aFyBVYaAP",
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <AppProvider>
          <Announcements />
          <Navbar />
          {children}
          <WhatsAppButton />
          <QuickNav />
          <TrustBar />
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
