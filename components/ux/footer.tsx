"use client";
import Link from "next/link";
import {
  XLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
  YoutubeLogoIcon,
} from "@phosphor-icons/react";

import { UiButton, UiInput } from "@/components/ui";
import { routes } from "@/routes";

const footerSections = [
  {
    title: "Shop",
    links: [
      { label: "Store", href: routes.shop },
      { label: "Products", href: routes.products },
      { label: "Brands", href: routes.brands },
      { label: "Pricing", href: routes.pricing },
    ],
  },
  {
    title: "Categories",
    links: [
      { label: "Televisions", href: routes.shop },
      { label: "Home Appliances", href: routes.shop },
      { label: "Audio & Sound", href: routes.shop },
      { label: "Kitchen", href: routes.shop },
      { label: "Air Conditioning", href: routes.shop },
      { label: "Computing", href: routes.shop },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: routes.about },
      { label: "Blog", href: routes.blog },
      { label: "Careers", href: routes.careers },
      { label: "Contact Sales", href: routes.contact },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms & Conditions", href: routes.terms },
      { label: "Privacy Policy", href: routes.privacy },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: routes.help },
      { label: "Contact Us", href: routes.contact },
      { label: "FAQ", href: routes.help },
    ],
  },
];

const socialLinks = [
  { label: "X (fka Twitter)", href: "#", icon: XLogoIcon },
  { label: "Instagram", href: "#", icon: InstagramLogoIcon },
  { label: "LinkedIn", href: "#", icon: LinkedinLogoIcon },
  { label: "YouTube", href: "#", icon: YoutubeLogoIcon },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8">
        {/* CTA Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">
            Stay in the loop.{" "}
            <span className="text-primary-foreground/50">
              Get the latest deals and updates from{" "}
              <span className="text-white">wiredworld.</span>
            </span>
          </h2>
          <form className="mt-6 flex gap-3">
            <UiInput.Input
              type="email"
              placeholder="you@example.com"
              className="h-10 max-w-[280px] rounded-full border-primary-foreground/20 bg-primary-foreground/10 px-4 text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:border-primary-foreground/40 focus-visible:ring-primary-foreground/20"
            />
            <UiButton.Button
              size="sm"
              className="h-10 rounded-full bg-primary-foreground px-5 text-primary hover:bg-primary-foreground/90"
            >
              Subscribe
            </UiButton.Button>
          </form>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm text-primary-foreground/50">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors hover:text-primary-foreground/70"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Large brand wordmark */}
        <div className="mt-16 select-none">
          <span className="block text-[clamp(4rem,15vw,12rem)] leading-none font-bold tracking-tighter text-primary-foreground">
            wiredworld.
          </span>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary-foreground/50 transition-colors hover:text-primary-foreground"
              >
                {social.label}
              </a>
            ))}
          </div>
          <p className="text-sm text-primary-foreground/50">
            &copy; {new Date().getFullYear()} WiredWorld. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
