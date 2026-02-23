import Link from "next/link";
import {
  Home,
  ShoppingBag,
  Users,
  Mail,
  Tag,
  ArrowLeft,
  SearchX,
} from "lucide-react";

import { UiButton, UiSeparator, UiItem } from "@/components/ui";
import { routes } from "@/routes";

const quickLinks = [
  {
    href: routes.home,
    icon: Home,
    title: "Home",
    description: "Return to the WiredWorld homepage",
  },
  {
    href: routes.shop.shop,
    icon: ShoppingBag,
    title: "Store",
    description: "Browse our full catalogue of products",
  },
  {
    href: routes.brands,
    icon: Tag,
    title: "Brands",
    description: "Discover the brands we carry",
  },
  {
    href: routes.about,
    icon: Users,
    title: "About",
    description: "Learn more about WiredWorld",
  },
  {
    href: routes.contact,
    icon: Mail,
    title: "Contact",
    description: "Get in touch with our support team",
  },
];

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <SearchX className="h-8 w-8 text-muted-foreground" />
          </div>
        </div>

        <h1 className="text-4xl font-bold tracking-tight">404</h1>
        <p className="mt-2 text-lg text-muted-foreground">Page not found</p>
        <p className="mt-1 text-sm text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or may have been
          moved.
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <UiButton.Button variant="outline" asChild>
            <Link href={routes.home}>
              <ArrowLeft />
              Go back home
            </Link>
          </UiButton.Button>
          <UiButton.Button asChild>
            <Link href={routes.shop.shop}>Visit the store</Link>
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
          If you believe this is an error, please{" "}
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
