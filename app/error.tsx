"use client";

import * as Icon from "@phosphor-icons/react";
import Link from "next/link";

import { UiButton, UiSeparator, UiItem } from "@/components/ui";
import { routes } from "@/routes";

const quickLinks = [
  {
    href: routes.home,
    icon: Icon.HouseIcon,
    title: "Home",
    description: "Return to the WiredWorld homepage",
  },
  {
    href: routes.shop,
    icon: Icon.ShoppingBagIcon,
    title: "Store",
    description: "Browse our full catalogue of products",
  },
  {
    href: routes.products,
    icon: Icon.PackageIcon,
    title: "Products",
    description: "Explore our product lines and features",
  },
  {
    href: routes.brands,
    icon: Icon.TagIcon,
    title: "Brands",
    description: "Discover the brands we carry",
  },
  {
    href: routes.about,
    icon: Icon.UsersIcon,
    title: "About",
    description: "Learn more about WiredWorld",
  },
  {
    href: routes.contact,
    icon: Icon.EnvelopeSimpleIcon,
    title: "Contact",
    description: "Get in touch with our support team",
  },
];

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <Icon.WarningCircleIcon className="h-8 w-8 text-destructive" />
          </div>
        </div>

        <h1 className="text-4xl font-bold tracking-tight">
          Something went wrong
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          An unexpected error occurred
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {error.message ||
            "We ran into a problem loading this page. This could be a temporary issue — try refreshing, or use the links below to get back on track."}
        </p>

        {error.digest && (
          <p className="mt-2 font-mono text-xs text-muted-foreground/60">
            Error ID: {error.digest}
          </p>
        )}

        <div className="mt-6 flex items-center flex-wrap justify-center gap-3">
          <UiButton.Button variant="outline" onClick={reset}>
            <Icon.ArrowCounterClockwiseIcon />
            Try again
          </UiButton.Button>
          <UiButton.Button variant="outline" asChild>
            <Link href={routes.home}>
              <Icon.ArrowLeftIcon />
              Go back home
            </Link>
          </UiButton.Button>
          <UiButton.Button asChild>
            <Link href={routes.shop}>Visit the store</Link>
          </UiButton.Button>
        </div>

        <UiSeparator.Separator className="my-8" />

        <div className="text-left">
          <p className="mb-3 text-sm font-medium">
            Here are some helpful links
          </p>
          <UiItem.ItemGroup className="rounded-lg border">
            {quickLinks.map((link, index) => (
              <div key={link.href}>
                {index > 0 && <UiItem.ItemSeparator />}
                <UiItem.Item variant="default" size="sm" asChild>
                  <Link href={link.href}>
                    <UiItem.ItemMedia variant="icon">
                      <link.icon className="text-muted-foreground" />
                    </UiItem.ItemMedia>
                    <UiItem.ItemContent>
                      <UiItem.ItemTitle>{link.title}</UiItem.ItemTitle>
                      <UiItem.ItemDescription>
                        {link.description}
                      </UiItem.ItemDescription>
                    </UiItem.ItemContent>
                  </Link>
                </UiItem.Item>
              </div>
            ))}
          </UiItem.ItemGroup>
        </div>

        <p className="mt-8 text-xs text-muted-foreground">
          If this keeps happening, please{" "}
          <Link
            href={routes.contact}
            className="underline underline-offset-4 hover:text-primary"
          >
            contact us
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
