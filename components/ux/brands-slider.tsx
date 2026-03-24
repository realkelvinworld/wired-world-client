import React from "react";
import { InfiniteSlider } from "@/components/motion-primitives/infinite-slider";

import { BekoLogo, BinatoneLogo, BruhmLogo, CromptonLogo, DecakilaLogo, GreeLogo, HavellsLogo, HpLogo, InnovaLogo, KenwoodLogo, LgLogo, MdvLogo, MideaLogo, NascoLogo, NovoLogo, PearlLogo, PhilipsLogo, SamsungLogo, SonyLogo, SyinixLogo, TclLogo,
} from "@/public/logos"; //prettier-ignore
import Image from "next/image";

export default function BrandsSlider() {
  const allBrands = [
    { name: "Samsung", logo: SamsungLogo },
    { name: "LG", logo: LgLogo },
    { name: "Sony", logo: SonyLogo },
    { name: "TCL", logo: TclLogo },
    { name: "Midea", logo: MideaLogo },
    { name: "Nasco", logo: NascoLogo },
    { name: "Bruhm", logo: BruhmLogo },
    { name: "Beko", logo: BekoLogo },
    { name: "Philips", logo: PhilipsLogo },
    { name: "Kenwood", logo: KenwoodLogo },
    { name: "Gree", logo: GreeLogo },
    { name: "HP", logo: HpLogo },
    { name: "Innova", logo: InnovaLogo },
    { name: "Pearl", logo: PearlLogo },
    { name: "MDV", logo: MdvLogo },
    { name: "Havells", logo: HavellsLogo },
    { name: "Binatone", logo: BinatoneLogo },
    { name: "Crompton", logo: CromptonLogo },
    { name: "Decakila", logo: DecakilaLogo },
    { name: "Novo", logo: NovoLogo },
    { name: "Syinix", logo: SyinixLogo },
  ];

  const topRow = allBrands.slice(0, 11);
  const bottomRow = allBrands.slice(11);
  return (
    <div>
      {" "}
      <section className="py-12">
        <h2 className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Trusted Brand Partners
        </h2>
        <div className="space-y-6">
          <InfiniteSlider gap={48} speed={30}>
            {topRow.map((brand) => (
              <Image
                key={brand.name}
                src={brand.logo}
                alt={brand.name}
                width={80}
                height={80}
                className="h-12 w-auto object-contain opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0"
              />
            ))}
          </InfiniteSlider>
          <InfiniteSlider gap={48} speed={30} reverse>
            {bottomRow.map((brand) => (
              <Image
                key={brand.name}
                src={brand.logo}
                alt={brand.name}
                width={80}
                height={80}
                className="h-12 w-auto object-contain opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0"
              />
            ))}
          </InfiniteSlider>
        </div>
      </section>
    </div>
  );
}
