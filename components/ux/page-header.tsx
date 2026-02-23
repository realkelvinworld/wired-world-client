import Image, { StaticImageData } from "next/image";

import { UiBadge } from "../ui";

export default function PageHeader({
  img,
  title,
  badge,
}: {
  img?: string | StaticImageData;
  title?: string;
  badge?: string;
}) {
  return (
    <div>
      <div className="relative">
        {img && (
          <Image
            src={img ? img : ""}
            alt="Wired world"
            unoptimized
            quality={100}
            className="object-cover object-center lg:h-100 h-100 rounded-xl mb-20"
          />
        )}
        <UiBadge.Badge className="absolute top-4 left-4 font-semibold bg-primary text-white">
          {badge ? badge : "wiredworld."}
        </UiBadge.Badge>
        {title && (
          <p className="block text-[clamp(1rem,8vw,10rem)] leading-none font-bold tracking-tighter text-primary-foreground/40 absolute lg:bottom-1 bottom-2 lg:left-2 right-2">
            {title}
          </p>
        )}
      </div>
    </div>
  );
}
