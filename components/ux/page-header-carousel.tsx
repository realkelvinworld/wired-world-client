import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import { useEffect, useState, useCallback } from "react";
import Autoplay from "embla-carousel-autoplay";

import { UiBadge, UiButton, UiCarousel } from "../ui";

export default function PageHeaderCarousel({
  img,
  title,
  badge,
}: {
  img?: string[];
  title?: string;
  badge?: string;
}) {
  const images = img?.length ? img : defaultImg;
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

  return (
    <div className="relative">
      <div className="relative">
        <UiCarousel.Carousel
          opts={{ loop: true, align: "center" }}
          plugins={[Autoplay({ delay: 6000, stopOnInteraction: false })]}
          setApi={setApi}
          className="lg:w-full w-full"
        >
          <UiCarousel.CarouselContent>
            {images.map((i, index) => (
              <UiCarousel.CarouselItem key={index}>
                <div className="relative flex justify-center items-center">
                  <img
                    src={i}
                    alt="Image Tile"
                    className="w-full object-cover object-center lg:h-100 h-100 rounded-2xl bg-gray-100"
                  />
                  <div className="absolute inset-0 bg-black/60 rounded-2xl" />
                </div>
              </UiCarousel.CarouselItem>
            ))}
          </UiCarousel.CarouselContent>
        </UiCarousel.Carousel>
        <UiBadge.Badge className="absolute top-4 left-4 font-semibold bg-primary text-white">
          {badge ? badge : "wiredworld."}
        </UiBadge.Badge>
        {title && (
          <p className="block text-[clamp(1rem,8vw,10rem)] leading-none font-bold tracking-tighter text-primary-foreground/40 absolute lg:bottom-1 bottom-2 lg:left-2 right-2">
            {title}
          </p>
        )}
        <div className="absolute bottom-3 left-3 sm:left-auto sm:right-3 flex items-center gap-2 z-50">
          {count > 1 && (
            <div className="hidden items-center gap-1 sm:flex mr-1">
              {images.map((_, index) => (
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
          <UiButton.Button
            onClick={scrollPrev}
            className="shrink-0 w-8 h-8 opacity-70 transition-opacity hover:opacity-100 rounded-full p-2"
            aria-label="Previous announcement"
            size={"xs"}
          >
            <CaretLeftIcon className="size-3.5" />
          </UiButton.Button>
          <UiButton.Button
            onClick={scrollNext}
            size={"xs"}
            className="shrink-0 w-8 h-8 opacity-70 transition-opacity hover:opacity-100 rounded-full"
            aria-label="Next announcement"
          >
            <CaretRightIcon className="size-3.5" />
          </UiButton.Button>
        </div>
      </div>
    </div>
  );
}

const defaultImg = [
  "/images/SAMSUNG-PHONES.jpg",
  "/images/SONY-IMAGE.jpg",
  "images/TCL-IMAGE.jpg",
];
