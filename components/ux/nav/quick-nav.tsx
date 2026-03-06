"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { UiCard, UiSeparator, UiTooltip } from "@/components/ui";
import { useCategories } from "@/hooks/use-categories";
import { routes } from "@/routes";

export default function QuickNav() {
  const { data } = useCategories();
  const categories = data?.info;

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!categories || categories.length === 0) return null;

  return (
    <UiCard.Card
      className={`fixed bottom-5 right-5 z-50 px-2.5 py-4 backdrop-blur-sm bg-background/90 transition-all duration-500  hidden lg:flex md:flex ${
        scrolled
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <TooltipProvider delayDuration={100}>
        <div className="flex flex-col items-center gap-1">
          {categories.map((cat, index) => (
            <div key={cat.id} className="flex flex-col items-center">
              <UiTooltip.Tooltip>
                <UiTooltip.TooltipTrigger asChild>
                  <Link
                    href={`${routes.shop.shop}?filters=${encodeURIComponent(JSON.stringify({ filters: { main_category_id: cat.id } }))}`}
                    className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    {cat.icon ? (
                      <img
                        src={cat.icon}
                        alt={cat.name}
                        width={18}
                        height={18}
                        loading="lazy"
                        className="size-4.5 object-contain"
                      />
                    ) : (
                      <span className="text-xs font-bold">
                        {cat.name.charAt(0)}
                      </span>
                    )}
                  </Link>
                </UiTooltip.TooltipTrigger>
                <TooltipContent side="left" className="text-xs">
                  {cat.name}
                </TooltipContent>
              </UiTooltip.Tooltip>

              {index < categories.length - 1 && (
                <UiSeparator.Separator className="my-0.5 w-5" />
              )}
            </div>
          ))}
        </div>
      </TooltipProvider>
    </UiCard.Card>
  );
}
