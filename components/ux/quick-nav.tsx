"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { UiCard, UiSeparator, UiTooltip } from "@/components/ui";
import { quicknavlinks } from "@/db-locale";

export default function QuickNav() {
  /**
   * State
   */
  const [scrolled, setScrolled] = useState(false);

  //   check for the scroll position and show the quick nav if scrolled more than 100px, hide it otherwise
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <UiCard.Card
      className={`fixed bottom-5 right-5 z-50  px-2.5 py-4 backdrop-blur-sm bg-background/90 transition-all duration-500 ${
        scrolled
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <TooltipProvider delayDuration={100}>
        <div className="flex flex-col items-center gap-1">
          {quicknavlinks.map((q, index) => (
            <div key={q.name} className="flex flex-col items-center">
              <UiTooltip.Tooltip>
                <UiTooltip.TooltipTrigger asChild>
                  <Link
                    href={q.url}
                    className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    <q.icon className="size-4.5" weight="regular" />
                  </Link>
                </UiTooltip.TooltipTrigger>
                <TooltipContent side="left" className="text-xs">
                  {q.name}
                </TooltipContent>
              </UiTooltip.Tooltip>

              {index < quicknavlinks.length - 1 && (
                <UiSeparator.Separator className="my-0.5 w-5" />
              )}
            </div>
          ))}
        </div>
      </TooltipProvider>
    </UiCard.Card>
  );
}
