"use client";
import { AnimatePresence, motion } from "motion/react";
import { useState, useEffect } from "react";
import Image from "next/image";

import {
  MideaLogo,
  NascoLogo,
  SamsungLogo,
  SonyLogo,
  TclLogo,
} from "@/public/logos";

import { TextEffect } from "../motion-primitives/text-effect";

export function LoadingAnimation() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const allBrands = [
    { name: "Samsung", logo: SamsungLogo },
    { name: "Sony", logo: SonyLogo },
    { name: "TCL", logo: TclLogo },
    { name: "Midea", logo: MideaLogo },
    { name: "Nasco", logo: NascoLogo },
  ];

  // Images
  const topRow = allBrands.slice(0, 11);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="h-dvh w-dvw fixed top-0 left-0 bg-primary z-[999999] overflow-hidden flex flex-col items-center justify-center"
          initial={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(30px)" }}
          transition={{
            duration: 1.8,
            ease: "easeInOut",
          }}
        >
          <section className="flex flex-col space-y-4 items-center justify-center">
            <h2 className="lg:text-[9rem] md:text-[6rem] text-4xl  text-center">
              <TextEffect
                per="char"
                as="span"
                speedReveal={0.7}
                preset="fade"
                className="text-white text-center font-bold tracking-tighter"
              >
                wiredworld.
              </TextEffect>
            </h2>
            <p className="text-white text-left font-bold tracking-tighter">
              <TextEffect
                per="char"
                as="span"
                speedReveal={0.7}
                preset="fade"
                className="text-white text-left font-bold tracking-tighter"
              >
                Your Trusted Online Electronics Destination
              </TextEffect>
            </p>

            {/* Images */}
            <section className="z-50 flex flex-wrap items-center justify-center gap-8 mt-8">
              {topRow.map((brand) => (
                <Image
                  key={brand.name}
                  src={brand.logo}
                  alt={brand.name}
                  width={80}
                  height={80}
                  className="h-12 w-auto object-contain opacity-70"
                />
              ))}
            </section>
            <p className="text-white font-bold tracking-tighter">
              and many more ...
            </p>
          </section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
