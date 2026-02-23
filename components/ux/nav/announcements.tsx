"use client";

import { useCallback, useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import * as Icon from "@phosphor-icons/react";

import { useAnnouncements } from "@/hooks/use-announcements";
import { UiCarousel } from "@/components/ui";

export default function Announcements() {
  const { data } = useAnnouncements();
  const announcements = data?.info;

  const [api, setApi] = useState<UiCarousel.CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = useCallback(() => api?.scrollNext(), [api]);

  if (!announcements || announcements.length === 0) return null;

  return (
    <div className="bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5">
        <button
          onClick={scrollPrev}
          className="shrink-0 p-1 opacity-70 transition-opacity hover:opacity-100"
          aria-label="Previous announcement"
        >
          <Icon.CaretLeftIcon className="size-3.5" />
        </button>

        <UiCarousel.Carousel
          opts={{ loop: true, align: "center" }}
          plugins={[Autoplay({ delay: 4000, stopOnInteraction: false })]}
          setApi={setApi}
          className="mx-4 flex-1 overflow-hidden"
        >
          <UiCarousel.CarouselContent className="ml-0">
            {announcements.map((item) => (
              <UiCarousel.CarouselItem
                key={item.id}
                className="flex items-center justify-center pl-0"
              >
                <p className="text-center text-xs font-medium sm:text-sm">
                  {item.content}
                </p>
              </UiCarousel.CarouselItem>
            ))}
          </UiCarousel.CarouselContent>
        </UiCarousel.Carousel>

        <div className="flex shrink-0 items-center gap-1.5">
          {count > 1 && (
            <div className="mr-2 hidden items-center gap-1 sm:flex">
              {announcements.map((_, index) => (
                <span
                  key={index}
                  className={`block size-1.5 rounded-full transition-colors ${
                    current === index
                      ? "bg-primary-foreground"
                      : "bg-primary-foreground/30"
                  }`}
                />
              ))}
            </div>
          )}
          <button
            onClick={scrollNext}
            className="shrink-0 p-1 opacity-70 transition-opacity hover:opacity-100"
            aria-label="Next announcement"
          >
            <Icon.CaretRightIcon className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
