"use client";
import Link from "next/link";
import {
  XLogoIcon,
  GithubLogoIcon,
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
    title: "Company",
    links: [
      { label: "About", href: routes.about },
      { label: "Blog", href: routes.blog },
      { label: "Careers", href: routes.careers },
      { label: "Contact", href: routes.contact },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: routes.help },
      { label: "Contact Us", href: routes.contact },
      { label: "Privacy Policy", href: routes.privacy },
      { label: "Terms of Service", href: routes.terms },
    ],
  },
];

const socialLinks = [
  { label: "Twitter", href: "#", icon: XLogoIcon },
  { label: "GitHub", href: "#", icon: GithubLogoIcon },
  { label: "Instagram", href: "#", icon: InstagramLogoIcon },
  { label: "LinkedIn", href: "#", icon: LinkedinLogoIcon },
  { label: "YouTube", href: "#", icon: YoutubeLogoIcon },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
        {/* Top section */}
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand column */}
          <div className="space-y-6">
            <Link href={routes.home} className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground">
                <span className="text-sm font-bold text-primary">W</span>
              </div>
              <span className="font-semibold">WiredWorld</span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-primary-foreground/70">
              Building the future of connected experiences. We provide tools,
              platforms, and solutions that empower businesses to thrive in a
              wired world.
            </p>

            {/* Newsletter */}
            <div className="space-y-3">
              <p className="text-sm font-medium">Stay in the loop</p>
              <form className="flex gap-2">
                <UiInput.Input
                  type="email"
                  placeholder="you@example.com"
                  className="h-9 max-w-[220px] border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:border-primary-foreground/40 focus-visible:ring-primary-foreground/20"
                />
                <UiButton.Button
                  size="sm"
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                >
                  Subscribe
                </UiButton.Button>
              </form>
              <p className="text-xs text-primary-foreground/50">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>

          {/* Link columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold">{section.title}</h3>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-primary-foreground/15" />

        {/* Bottom section */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-primary-foreground/50">
            &copy; {new Date().getFullYear()} WiredWorld. All rights reserved.
          </p>

          {/* Legal links */}
          <div className="flex items-center gap-4">
            <Link
              href={routes.privacy}
              className="text-xs text-primary-foreground/50 transition-colors hover:text-primary-foreground"
            >
              Privacy
            </Link>
            <Link
              href={routes.terms}
              className="text-xs text-primary-foreground/50 transition-colors hover:text-primary-foreground"
            >
              Terms
            </Link>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-1">
            {socialLinks.map((social) => (
              <UiButton.Button
                key={social.label}
                variant="ghost"
                size="icon-sm"
                className="text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                asChild
              >
                <a
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="size-4" />
                </a>
              </UiButton.Button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
