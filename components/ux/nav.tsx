"use client";

import * as Icon from "@phosphor-icons/react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  UiAspectRatio,
  UiButton,
  UiNavigationMenu,
  UiSeparator,
  UiSheet,
} from "@/components/ui";
import { routes } from "@/routes";

import { SearchProducts } from "./nav/search-products";
import { Wishlist } from "./nav/wishlist";

const brandLogos = [
  {
    name: "LG",
    logo: "/logos/LG-LOGO.svg",
    description: "Premium home electronics & appliances",
  },
  {
    name: "Sony",
    logo: "/logos/SONY-LOGO.png",
    description: "Entertainment, gaming & audio systems",
  },
  {
    name: "Samsung",
    logo: "/logos/SAMSUNG-LOGO.avif",
    description: "Smart devices & home innovation",
  },
  {
    name: "Midea",
    logo: "/logos/MIDEA-LOGO.png",
    description: "Affordable home & kitchen appliances",
  },
  {
    name: "Nasco",
    logo: "/logos/NASCO-LOGO.png",
    description: "Reliable everyday electronics",
  },
  {
    name: "TCL",
    logo: "/logos/TCL-LOGO.png",
    description: "Smart TVs & display technology",
  },
];

const categories = [
  {
    name: "Televisions",
    description: "Smart TVs & displays",
    icon: Icon.MonitorIcon,
    items: [
      { name: "UHD 4K TVs", href: "#" },
      { name: "QHD TVs", href: "#" },
      { name: "OLED TVs", href: "#" },
      { name: "Smart TVs", href: "#" },
      { name: "LED TVs", href: "#" },
    ],
  },
  {
    name: "Home Appliances",
    description: "Fridges, washers & more",
    icon: Icon.HouseIcon,
    items: [
      { name: "Refrigerators", href: "#" },
      { name: "Washing Machines", href: "#" },
      { name: "Dryers", href: "#" },
      { name: "Vacuum Cleaners", href: "#" },
      { name: "Irons", href: "#" },
    ],
  },
  {
    name: "Audio & Sound",
    description: "Speakers & headphones",
    icon: Icon.SpeakerHighIcon,
    items: [
      { name: "Soundbars", href: "#" },
      { name: "Headphones", href: "#" },
      { name: "Bluetooth Speakers", href: "#" },
      { name: "Home Theater Systems", href: "#" },
      { name: "Earbuds", href: "#" },
    ],
  },
  {
    name: "Kitchen",
    description: "Cooking & kitchen electronics",
    icon: Icon.CookingPotIcon,
    items: [
      { name: "Microwaves", href: "#" },
      { name: "Blenders", href: "#" },
      { name: "Air Fryers", href: "#" },
      { name: "Electric Kettles", href: "#" },
      { name: "Rice Cookers", href: "#" },
    ],
  },
  {
    name: "Air Conditioning",
    description: "ACs, fans & cooling",
    icon: Icon.WindIcon,
    items: [
      { name: "Split ACs", href: "#" },
      { name: "Portable ACs", href: "#" },
      { name: "Standing Fans", href: "#" },
      { name: "Ceiling Fans", href: "#" },
      { name: "Air Purifiers", href: "#" },
    ],
  },
  {
    name: "Computing",
    description: "Laptops, monitors & accessories",
    icon: Icon.LaptopIcon,
    items: [
      { name: "Laptops", href: "#" },
      { name: "Monitors", href: "#" },
      { name: "Printers", href: "#" },
      { name: "Keyboards & Mice", href: "#" },
      { name: "Storage Devices", href: "#" },
    ],
  },
];

const mobileLinks = [
  { label: "Home", href: routes.home },
  { label: "Shop", href: routes.shop },
  { label: "Showrooms", href: routes.shop },
  { label: "Pricing", href: routes.pricing },
];

const socialLinks = [
  { label: "Twitter", href: "#", icon: Icon.XLogoIcon },
  { label: "Instagram", href: "#", icon: Icon.InstagramLogoIcon },
  { label: "LinkedIn", href: "#", icon: Icon.LinkedinLogoIcon },
  { label: "YouTube", href: "#", icon: Icon.YoutubeLogoIcon },
];

const navLinkClass =
  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 max-w-7xl mx-auto items-center justify-between px-6">
        {/* Logo */}
        <Link href={routes.home} className="mr-8 flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
            <span className="text-sm font-bold text-background">W</span>
          </div>
          <span className="hidden font-bold sm:inline-block">WiredWorld</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="flex items-center justify-between space-x-2 md:justify-end">
          <UiNavigationMenu.NavigationMenu className="hidden lg:flex">
            <UiNavigationMenu.NavigationMenuList>
              <UiNavigationMenu.NavigationMenuItem>
                <UiNavigationMenu.NavigationMenuLink
                  href={routes.home}
                  className={navLinkClass}
                >
                  Home
                </UiNavigationMenu.NavigationMenuLink>
              </UiNavigationMenu.NavigationMenuItem>

              <UiNavigationMenu.NavigationMenuItem>
                <UiNavigationMenu.NavigationMenuLink
                  href={routes.shop}
                  className={navLinkClass}
                >
                  Shop
                </UiNavigationMenu.NavigationMenuLink>
              </UiNavigationMenu.NavigationMenuItem>

              {/* Brands Dropdown */}
              <UiNavigationMenu.NavigationMenuItem>
                <UiNavigationMenu.NavigationMenuTrigger>
                  Brands
                </UiNavigationMenu.NavigationMenuTrigger>
                <UiNavigationMenu.NavigationMenuContent>
                  <div className="w-[800px] p-4">
                    <div className="mb-4">
                      <Link
                        href={routes.brands}
                        className="group relative block overflow-hidden rounded-lg"
                      >
                        <UiAspectRatio.AspectRatio ratio={16 / 9}>
                          <div className="absolute inset-0 bg-linear-to-br from-blue-50 via-neutral-500 to-neutral-700">
                            <Image
                              src="/images/HOME-BANNER.avif"
                              alt="Home Banner"
                              fill
                              quality={100}
                              className="object-cover object-center opacity-30"
                            />
                          </div>
                          <div className="relative flex h-full flex-col justify-between p-6">
                            <div>
                              <h3 className="text-xl font-semibold text-white">
                                Top Brands You Love
                              </h3>
                              <p className="mt-1 max-w-xs text-sm text-white/80">
                                Explore our curated collection of trusted
                                electronics brands
                              </p>
                            </div>
                            <div>
                              <UiButton.Button
                                size="sm"
                                variant="secondary"
                                className="rounded-full"
                              >
                                See All Brands
                                <Icon.CaretRightIcon className="ml-1 size-4" />
                              </UiButton.Button>
                            </div>
                          </div>
                        </UiAspectRatio.AspectRatio>
                      </Link>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {brandLogos.map((brand) => (
                        <Link
                          key={brand.name}
                          href={routes.brands}
                          className="flex items-center gap-3 rounded-lg border border-transparent p-3 transition-all hover:border-border hover:bg-accent"
                        >
                          <div className="flex h-12 w-16 shrink-0 items-center justify-center rounded-md bg-muted/50 p-1.5">
                            <Image
                              src={brand.logo}
                              alt={brand.name}
                              width={56}
                              height={40}
                              className="h-9 w-auto object-contain"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium leading-none">
                              {brand.name}
                            </p>
                            <p className="mt-1 text-xs leading-snug text-muted-foreground">
                              {brand.description}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </UiNavigationMenu.NavigationMenuContent>
              </UiNavigationMenu.NavigationMenuItem>

              {/* Categories Dropdown */}
              <UiNavigationMenu.NavigationMenuItem>
                <UiNavigationMenu.NavigationMenuTrigger>
                  Categories
                </UiNavigationMenu.NavigationMenuTrigger>
                <UiNavigationMenu.NavigationMenuContent>
                  <div className="grid w-[700px] grid-cols-[1fr_1fr] p-4">
                    {/* Left - Categories */}
                    <div className="pr-4">
                      <p className="mb-3 text-xs font-medium text-muted-foreground">
                        Categories
                      </p>
                      <div className="space-y-1">
                        {categories.map((cat, index) => (
                          <Link
                            key={cat.name}
                            href="#"
                            className={`flex items-start gap-3 rounded-md p-3 transition-colors ${activeCategory === index ? "bg-accent" : "hover:bg-accent"}`}
                            onMouseEnter={() => setActiveCategory(index)}
                          >
                            <cat.icon className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
                            <div>
                              <div className="text-sm font-medium">
                                {cat.name}
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {cat.description}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Right - Sub-items on hover */}
                    <div className="rounded-lg bg-muted/50 p-4">
                      <p className="mb-3 text-xs font-medium text-muted-foreground">
                        {categories[activeCategory].name}
                      </p>
                      <div className="space-y-1">
                        {categories[activeCategory].items.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center justify-between rounded-md px-3 py-2.5 text-sm transition-colors hover:bg-background"
                          >
                            {item.name}
                            <Icon.CaretRightIcon className="size-3.5 text-muted-foreground" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </UiNavigationMenu.NavigationMenuContent>
              </UiNavigationMenu.NavigationMenuItem>

              <UiButton.Button
                variant="ghost"
                size="sm"
                className="hidden lg:inline-flex"
                asChild
              >
                <Link href={routes.login}>
                  Showrooms <Icon.CaretRightIcon className="ml-1 size-4" />
                </Link>
              </UiButton.Button>
            </UiNavigationMenu.NavigationMenuList>
          </UiNavigationMenu.NavigationMenu>

          {/* Sign Up + Mobile Toggle */}
          <div className="flex items-center gap-2">
            <UiButton.Button
              variant="ghost"
              size="sm"
              className="hidden lg:inline-flex"
              asChild
            >
              <Link href={routes.login}>
                Sign up <Icon.CaretRightIcon className="ml-1 size-4" />
              </Link>
            </UiButton.Button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <SearchProducts />
          <Wishlist />
          <UiButton.Button className="rounded-full border" variant="secondary">
            Login <Icon.UserIcon />
          </UiButton.Button>
          <UiButton.Button className="rounded-full">
            Cart <Icon.ShoppingCartIcon />
          </UiButton.Button>
        </div>
        {/* Mobile Menu */}
        <UiSheet.Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <UiSheet.SheetTrigger asChild>
            <UiButton.Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label="Toggle menu"
            >
              <Icon.ListIcon className="size-5" />
            </UiButton.Button>
          </UiSheet.SheetTrigger>
          <UiSheet.SheetContent
            side="right"
            className="flex w-full flex-col overflow-y-auto sm:max-w-md"
          >
            <UiSheet.SheetHeader>
              <UiSheet.SheetTitle className="text-left">
                Menu
              </UiSheet.SheetTitle>
            </UiSheet.SheetHeader>

            <div className="flex flex-1 flex-col gap-6 py-4">
              {/* Navigation Links */}
              <nav className="flex flex-col gap-1">
                {mobileLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium hover:bg-accent"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                    <Icon.CaretRightIcon className="size-4 text-muted-foreground" />
                  </Link>
                ))}
              </nav>

              <UiSeparator.Separator />

              {/* Brands */}
              <div className="space-y-3">
                <div className="flex items-center justify-between px-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Brands
                  </p>
                  <Link
                    href={routes.brands}
                    className="text-xs text-primary hover:underline"
                    onClick={() => setMobileOpen(false)}
                  >
                    View all
                  </Link>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {brandLogos.map((brand) => (
                    <Link
                      key={brand.name}
                      href={routes.brands}
                      className="flex flex-col items-center gap-1.5 rounded-lg p-3 text-center hover:bg-accent"
                      onClick={() => setMobileOpen(false)}
                    >
                      <div className="flex h-10 w-14 items-center justify-center rounded-md bg-muted/50 p-1">
                        <Image
                          src={brand.logo}
                          alt={brand.name}
                          width={48}
                          height={32}
                          className="h-7 w-auto object-contain"
                        />
                      </div>
                      <span className="text-xs font-medium">{brand.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <UiSeparator.Separator />

              {/* Categories */}
              <div className="space-y-3">
                <p className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Categories
                </p>
                <div className="flex flex-col gap-1">
                  {categories.map((cat) => (
                    <a
                      key={cat.name}
                      href="#"
                      className="flex items-center gap-3 rounded-md px-3 py-2.5 hover:bg-accent"
                      onClick={() => setMobileOpen(false)}
                    >
                      <cat.icon className="size-4 shrink-0 text-muted-foreground" />
                      <span className="text-sm font-medium">{cat.name}</span>
                      <Icon.CaretRightIcon className="ml-auto size-4 text-muted-foreground" />
                    </a>
                  ))}
                </div>
              </div>

              <UiSeparator.Separator />

              {/* Useful Info */}
              <div className="space-y-3">
                <p className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Get in Touch
                </p>
                <div className="flex flex-col gap-2.5 px-3">
                  <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <Icon.PhoneIcon className="size-4 shrink-0" />
                    <span>+233 (0) 302 123 456</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <Icon.EnvelopeSimpleIcon className="size-4 shrink-0" />
                    <span>support@wiredworld.com</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <Icon.ClockIcon className="size-4 shrink-0" />
                    <span>Mon – Sat: 9am – 6pm</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <Icon.MapPinIcon className="size-4 shrink-0" />
                    <span>Accra, Ghana</span>
                  </div>
                </div>
              </div>

              {/* Bottom section pushed down */}
              <div className="mt-auto space-y-4">
                <UiSeparator.Separator />

                {/* Social Links */}
                <div className="flex items-center justify-center gap-1">
                  {socialLinks.map((social) => (
                    <UiButton.Button
                      key={social.label}
                      variant="ghost"
                      size="icon"
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

                {/* Auth Buttons */}
                <div className="flex flex-col gap-2">
                  <UiButton.Button className="w-full" asChild>
                    <Link
                      href={routes.signup}
                      onClick={() => setMobileOpen(false)}
                    >
                      Sign up
                      <Icon.CaretRightIcon className="ml-1 size-4" />
                    </Link>
                  </UiButton.Button>
                  <UiButton.Button variant="outline" className="w-full" asChild>
                    <Link
                      href={routes.login}
                      onClick={() => setMobileOpen(false)}
                    >
                      Log in
                    </Link>
                  </UiButton.Button>
                </div>
              </div>
            </div>
          </UiSheet.SheetContent>
        </UiSheet.Sheet>
      </div>
    </header>
  );
}
