"use client";

import * as Icon from "@phosphor-icons/react";
import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";

import { mobileLinks, socialLinks } from "@/db-locale";
import { useNavBar } from "@/hooks/use-navbar";
import { useUserStore } from "@/store/user";
import { routes } from "@/routes";
import {
  UiAspectRatio,
  UiButton,
  UiNavigationMenu,
  UiSeparator,
  UiSheet,
  UiSpinner,
} from "@/components/ui";

import { SearchProducts } from "./nav/search-products";
import { Wishlist } from "./nav/wishlist";
import { Cart } from "./nav/cart";

const navLinkClass =
  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none bg-transparent";

export default function Navbar() {
  // hooks
  const { data } = useNavBar();

  // state
  const [activeCategory, setActiveCategory] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const hydrated = useSyncExternalStore(
    (cb) => useUserStore.persist.onFinishHydration(cb),
    () => useUserStore.persist.hasHydrated(),
    () => false,
  );
  const { user } = useUserStore();

  // Variables
  const userInitials = user
    ? `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`.toUpperCase()
    : null;

  const navcategories = data?.info.main_categories;
  const brands = data?.info.brands;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 max-w-7xl mx-auto items-center lg:justify-between md:justify-evenly justify-evenly px-2">
        {/* Logo */}
        <Link href={routes.home} className=" flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
            <span className="text-sm font-bold text-background">W</span>
          </div>
          <span className="hidden text-lg leading-none font-bold tracking-tighter text-primary lg:block">
            wiredworld.
          </span>
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
                  href={routes.shop.shop}
                  className={navLinkClass}
                >
                  Shop
                </UiNavigationMenu.NavigationMenuLink>
              </UiNavigationMenu.NavigationMenuItem>

              {/* Brands Dropdown */}
              <UiNavigationMenu.NavigationMenuItem>
                <UiNavigationMenu.NavigationMenuTrigger className="bg-transparent">
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
                              unoptimized
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
                                className="rounded-full text-sm group-hover:underline"
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
                      {brands?.slice(0, 6).map((brand) => (
                        <Link
                          key={brand.name}
                          href={`${routes.brands}?brand=${brand.name.toLowerCase().replace(/\s+/g, "-")}`}
                          className="flex items-center gap-3 rounded-lg border border-transparent p-3 transition-all hover:border-border hover:bg-accent"
                        >
                          <div className="flex h-12 w-16 shrink-0 items-center justify-center rounded-md bg-muted/50 p-1.5">
                            <Image
                              src={brand.logo}
                              alt={brand.name}
                              width={56}
                              height={40}
                              unoptimized
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
                <UiNavigationMenu.NavigationMenuTrigger className="bg-transparent">
                  Categories
                </UiNavigationMenu.NavigationMenuTrigger>
                <UiNavigationMenu.NavigationMenuContent>
                  <div className="grid w-[700px] grid-cols-[1fr_1fr] p-4 ">
                    {/* Left - Categories */}
                    <div className="pr-4 max-h-120 overflow-auto">
                      <p className="mb-3 text-xs font-medium text-muted-foreground">
                        Categories
                      </p>
                      <div className="space-y-1">
                        {navcategories?.map((cat, index) => (
                          <Link
                            key={cat.name}
                            href={routes.category(
                              cat.name.toLowerCase().replace(/\s+/g, "-"),
                            )}
                            className={`flex items-start gap-3 rounded-md p-3 transition-colors ${activeCategory === index ? "bg-accent" : "hover:bg-accent"}`}
                            onMouseEnter={() => setActiveCategory(index)}
                          >
                            {cat.icon && (
                              <Image
                                src={cat.icon}
                                alt="Category Logo"
                                className="mt-0.5 size-5 shrink-0 text-muted-foreground"
                                width={100}
                                height={100}
                              />
                            )}
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
                        {navcategories && navcategories[activeCategory]?.name}
                      </p>
                      <div className="space-y-1">
                        {navcategories &&
                          navcategories[activeCategory].sub_categories.map(
                            (item) => (
                              <Link
                                key={item.name}
                                href={routes.category(
                                  item.name.toLowerCase().replace(/\s+/g, "-"),
                                )}
                                className="flex items-center justify-between rounded-md px-3 py-2.5 text-sm transition-colors hover:bg-background"
                              >
                                {item.name}
                                <Icon.CaretRightIcon className="size-3.5 text-muted-foreground" />
                              </Link>
                            ),
                          )}
                      </div>
                    </div>
                  </div>
                </UiNavigationMenu.NavigationMenuContent>
              </UiNavigationMenu.NavigationMenuItem>

              <UiButton.Button
                variant="ghost"
                size="sm"
                className="hidden lg:inline-flex "
                asChild
              >
                <Link href={routes.showrooms}>
                  Showrooms{" "}
                  <Icon.SlideshowIcon
                    weight="fill"
                    className="text-primary ml-1 size-4"
                  />
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
              <Link href={routes.contact}>
                Contact{" "}
                <Icon.LifebuoyIcon
                  weight="fill"
                  className="text-primary ml-1 size-4"
                />
              </Link>
            </UiButton.Button>
            {!user && (
              <UiButton.Button
                variant="ghost"
                size="sm"
                className="hidden lg:inline-flex"
                asChild
              >
                <Link href={routes.auth.signUp.signUpVerify}>
                  Sign up{" "}
                  <Icon.LockKeyIcon
                    weight="fill"
                    className="text-primary ml-1 size-4"
                  />
                </Link>
              </UiButton.Button>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <SearchProducts />
          <Wishlist />
          {!hydrated ? (
            <UiSpinner.Spinner className="size-5" />
          ) : user ? (
            <Link
              href={routes.user.dashboard}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-background"
            >
              {userInitials}
            </Link>
          ) : (
            <UiButton.Button
              className="rounded-full border border-primary/10"
              variant="outline"
              asChild
            >
              <Link href={routes.auth.login.login}>
                Login <Icon.UserIcon />
              </Link>
            </UiButton.Button>
          )}
          <Cart />
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
            className="flex w-full flex-col overflow-y-auto sm:max-w-md px-4"
          >
            <UiSheet.SheetHeader>
              <UiSheet.SheetTitle className="text-left">
                Menu
              </UiSheet.SheetTitle>
            </UiSheet.SheetHeader>

            <div className="flex flex-1 flex-col gap-6 py-4">
              {/* User Info */}
              {!hydrated ? (
                <div className="flex justify-center py-4">
                  <UiSpinner.Spinner className="size-5" />
                </div>
              ) : user ? (
                <Link
                  href={routes.user.dashboard}
                  className="flex items-center gap-3 rounded-md px-3 py-2.5 hover:bg-accent"
                  onClick={() => setMobileOpen(false)}
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-background">
                    {userInitials}
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {user.first_name} {user.last_name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </Link>
              ) : null}

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
                  {brands?.slice(0, 6).map((brand) => (
                    <Link
                      key={brand.name}
                      href={`${routes.brands}?brand=${brand.name.toLowerCase().replace(/\s+/g, "-")}`}
                      className="flex flex-col items-center gap-1.5 rounded-lg p-3 text-center hover:bg-accent"
                      onClick={() => setMobileOpen(false)}
                    >
                      <div className="flex h-10 w-14 items-center justify-center rounded-md bg-muted/50 p-1">
                        <Image
                          src={brand.logo}
                          alt={brand.name}
                          width={48}
                          height={32}
                          unoptimized
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
              <div className="space-y-3 ">
                <p className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Categories
                </p>
                <div className="flex flex-col gap-1 max-h-60 overflow-auto">
                  {navcategories?.map((cat) => (
                    <Link
                      key={cat.name}
                      href={routes.category(
                        cat.name.toLowerCase().replace(/\s+/g, "-"),
                      )}
                      className="flex items-center gap-3 rounded-md px-3 py-2.5 hover:bg-accent"
                      onClick={() => setMobileOpen(false)}
                    >
                      {cat.icon && (
                        <Image
                          src={cat.icon}
                          alt={cat.name}
                          width={16}
                          height={16}
                          unoptimized
                          className="size-4 shrink-0"
                        />
                      )}
                      <span className="text-sm font-medium">{cat.name}</span>
                      <Icon.CaretRightIcon className="ml-auto size-4 text-muted-foreground" />
                    </Link>
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
                    <span>support@wireworldgh.com</span>
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
                {!user && (
                  <div className="flex flex-col gap-2">
                    <UiButton.Button className="w-full" asChild>
                      <Link
                        href={routes.auth.signUp.signUpVerify}
                        onClick={() => setMobileOpen(false)}
                      >
                        Sign up
                        <Icon.CaretRightIcon className="ml-1 size-4" />
                      </Link>
                    </UiButton.Button>
                    <UiButton.Button
                      variant="outline"
                      className="w-full"
                      asChild
                    >
                      <Link
                        href={routes.auth.login.login}
                        onClick={() => setMobileOpen(false)}
                      >
                        Log in
                      </Link>
                    </UiButton.Button>
                  </div>
                )}
              </div>
            </div>
          </UiSheet.SheetContent>
        </UiSheet.Sheet>
      </div>
    </header>
  );
}
