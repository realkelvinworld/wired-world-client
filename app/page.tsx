"use client";
import { Airconditioner, SamsungOledTv } from "@/public/images";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-center items-center my-10 sm:my-14 relative">
          <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center leading-tight tracking-tighter px-2 sm:px-0">
            Building{" "}
            <span className="text-blue-500">Tomorrow&#39;s Digital</span> <br />{" "}
            Landscape
            <span> One Step at a Time</span>
          </h1>

          <Image
            src={SamsungOledTv}
            alt="Samsung OLED TV"
            className="absolute hidden lg:block lg:-top-16 lg:-right-20 rotate-12 lg:w-87.5 -z-50 animate-[bounce_15s_linear_infinite]"
            width={350}
          />
          <Image
            src={Airconditioner}
            alt="Air Conditioner"
            className="absolute hidden lg:block lg:-top-4 lg:-left-18 -rotate-12 lg:w-87.5 -z-50 animate-[bounce_14s_linear_infinite]"
            width={350}
          />
        </div>
      </motion.div>
    </div>
  );
}
