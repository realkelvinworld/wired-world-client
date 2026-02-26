import Image, { StaticImageData } from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState, useCallback } from "react";

import { UiBadge, UiCarousel } from "../ui";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";

export default function PageHeaderCarousel({
  img,
  title,
  badge,
}: {
  img?: string[] | StaticImageData[];
  title?: string;
  badge?: string;
}) {
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
    <div>
      <button
        onClick={scrollPrev}
        className="shrink-0 p-1 opacity-70 transition-opacity hover:opacity-100"
        aria-label="Previous announcement"
      >
        <CaretLeftIcon className="size-3.5" />
      </button>
      <div className="relative">
        <UiCarousel.Carousel
          opts={{ loop: true, align: "center" }}
          plugins={[Autoplay({ delay: 4000, stopOnInteraction: false })]}
          setApi={setApi}
          className="lg:w-full w-full"
        >
          <UiCarousel.CarouselContent>
            {img?.map((i, index) => (
              <UiCarousel.CarouselItem key={index}>
                <div className="relative flex justify-center items-center">
                  <Image
                    src={i}
                    alt="Image Tile"
                    unoptimized
                    quality={100}
                    className="object-cover object-center lg:h-100 h-100 rounded-xl mb-20 bg-gray-100"
                  />

                  <div className="absolute inset-0 bg-black/60 backdrop-filter"></div>
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
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        {count > 1 && (
          <div className="mr-2 hidden items-center gap-1 sm:flex">
            {img?.map((_, index) => (
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
          <CaretRightIcon className="size-3.5" />
        </button>
      </div>
    </div>
  );
}

const defaultImg = [""];
