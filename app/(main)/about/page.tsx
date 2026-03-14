"use client";

import * as Icon from "@phosphor-icons/react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

import {
  KitchenThree,
  SamsungPhones,
  WiredImage10,
  WiredImage8,
} from "@/public/images";
import { TextEffect } from "@/components/motion-primitives/text-effect";
import LoadingLayout from "@/components/animations/loading-layout";
import { UiBadge, UiButton, UiSeparator } from "@/components/ui";
import BrandsSlider from "@/components/ux/brands-slider";
import { routes } from "@/routes";

const stats = [
  { value: "2020", label: "Year Founded" },
  { value: "16+", label: "Trusted Brands" },
  { value: "6+", label: "Product Categories" },
  { value: "100%", label: "Authentic Products" },
];

const values = [
  {
    icon: Icon.ShieldCheckIcon,
    title: "Integrity",
    description:
      "Every product is 100% genuine, sourced directly from authorized distributors and brand partners.",
  },
  {
    icon: Icon.HeartIcon,
    title: "Customer First",
    description:
      "Dedicated world-class customer service for pre-purchase guidance, warranty claims, and technical support.",
  },
  {
    icon: Icon.LightbulbIcon,
    title: "Innovation",
    description:
      "We combine global e-commerce best practices with deep local knowledge to deliver a seamless experience.",
  },
  {
    icon: Icon.FlagIcon,
    title: "Ghanaian Pride",
    description:
      "A proudly Ghanaian business committed to demonstrating that African-owned companies compete at the highest level.",
  },
];

const whyChooseUs = [
  {
    icon: Icon.ShieldCheckIcon,
    title: "Authentic Products Only",
    description:
      "Every product is 100% genuine, sourced directly from authorized distributors and brand partners.",
  },
  {
    icon: Icon.PackageIcon,
    title: "Nationwide Delivery",
    description:
      "Fast, reliable delivery to every region of Ghana with real-time order tracking and dedicated logistics.",
  },
  {
    icon: Icon.TrendUpIcon,
    title: "Competitive Pricing",
    description:
      "Our lean online model eliminates high overhead costs, passing genuine savings on to every customer.",
  },
  {
    icon: Icon.HandshakeIcon,
    title: "B2B & Bulk Orders",
    description:
      "Specialized corporate procurement for businesses, schools, hotels, and government institutions.",
  },
];

const audiences = [
  {
    icon: Icon.UsersIcon,
    title: "Individual Consumers",
    description:
      "Tech-savvy Ghanaians seeking quality electronics at competitive prices with home delivery.",
  },
  {
    icon: Icon.BuildingsIcon,
    title: "Businesses & SMEs",
    description:
      "Companies requiring appliances, televisions, audio, and office technology at scale.",
  },
  {
    icon: Icon.GlobeIcon,
    title: "Corporate & Institutional",
    description:
      "Large companies, banks, multinationals, schools, and government agencies procuring in bulk.",
  },
  {
    icon: Icon.RocketIcon,
    title: "Hospitality Sector",
    description:
      "Hotels, restaurants, and entertainment venues needing appliances and entertainment systems.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 sm:py-24">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <UiBadge.Badge
              variant="outline"
              className="mb-6 uppercase tracking-widest text-xs"
            >
              About Us
            </UiBadge.Badge>
          </motion.div>

          <TextEffect
            preset="fade-in-blur"
            speedReveal={1.1}
            speedSegment={0.3}
            as="h1"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
          >
            Your Trusted Online Electronics Destination
          </TextEffect>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed"
          >
            Wired World Limited is a premier online retail electronics company
            based in Accra, Ghana, dedicated to bringing the latest and most
            innovative consumer electronics directly to customers across Ghana
            since 2020.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-8 sm:grid-cols-4"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold tracking-tight">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Who We Are — Split */}
      <section className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center py-16">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <Image
            src={WiredImage8}
            alt="WiredWorld premium kitchen appliances showcase"
            className="w-full rounded-2xl object-cover object-center lg:h-125 h-80 bg-muted"
            placeholder="blur"
          />
          <UiBadge.Badge className="absolute top-4 left-4 bg-primary text-white font-semibold">
            Who We Are
          </UiBadge.Badge>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Connecting Ghana to the{" "}
            <span className="text-primary">World&apos;s Best</span> Technology
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            We operate a fully digital retail model, offering a seamless,
            convenient, and secure shopping experience for individuals,
            businesses, educational institutions, and hospitality operators.
          </p>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            At Wired World Limited, we understand that technology is no longer a
            luxury &mdash; it is the infrastructure of modern life, modern
            business, and modern ambition. Our mission is to ensure that every
            Ghanaian has access to the best technology the world offers, at
            competitive prices, with the service and support they deserve.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border p-4">
              <h3 className="text-sm font-semibold">Our Vision</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                To be the most trusted and accessible online electronics
                retailer, empowering individuals and businesses through
                technology.
              </p>
            </div>
            <div className="rounded-xl border p-4">
              <h3 className="text-sm font-semibold">Our Mission</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                To deliver a world-class electronics shopping experience through
                an extensive product range, competitive pricing, and reliable
                service.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      <UiSeparator.Separator />

      {/* Why Choose Us */}
      <section className="py-16 sm:py-24">
        <div className="text-center">
          <UiBadge.Badge
            variant="outline"
            className="mb-4 uppercase tracking-widest text-xs"
          >
            Why Choose Us
          </UiBadge.Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Built different. Built for Ghana.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            From authentic products and nationwide delivery to competitive
            pricing and dedicated B2B support.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseUs.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="rounded-2xl border p-6 transition-colors hover:bg-muted/50"
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                <item.icon className="size-5 text-foreground" />
              </div>
              <h3 className="mt-4 text-sm font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Highlight Banner */}
      <section className="rounded-2xl bg-primary text-primary-foreground p-8 sm:p-12 lg:p-16">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
              More than a retailer.
              <br />
              <span className="text-primary-foreground/70">
                A Ghanaian business committed to growth.
              </span>
            </h2>
            <p className="mt-4 text-primary-foreground/80 leading-relaxed max-w-lg">
              We actively invest in building local capability &mdash; training
              our team, developing local logistics partnerships, and
              contributing to the digital literacy of our customer base. Every
              sale we make is a reinvestment in Ghana&apos;s technological
              future.
            </p>
          </div>
          <div className="flex justify-center">
            <Image
              src={WiredImage10}
              alt="Soundbars available at WiredWorld Ghana"
              className="max-h-80 w-full rounded-2xl object-cover object-center"
              placeholder="blur"
            />
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-16 sm:py-24">
        <div className="text-center">
          <UiBadge.Badge
            variant="outline"
            className="mb-4 uppercase tracking-widest text-xs"
          >
            Who We Serve
          </UiBadge.Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Built for every customer.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            From individual consumers to corporate procurement &mdash; we serve
            a broad and growing customer base across Ghana.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {audiences.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-start gap-4 rounded-2xl border p-6"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                <item.icon className="size-5 text-foreground" />
              </div>
              <div>
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <UiSeparator.Separator />

      {/* Our Values */}
      <section className="py-16 sm:py-24">
        <div className="text-center">
          <UiBadge.Badge
            variant="outline"
            className="mb-4 uppercase tracking-widest text-xs"
          >
            Our Values
          </UiBadge.Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            What drives everything we do.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="rounded-2xl border p-6 text-center"
            >
              <div className="mx-auto flex size-10 items-center justify-center rounded-lg bg-muted">
                <item.icon className="size-5 text-foreground" />
              </div>
              <h3 className="mt-4 text-sm font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Brand Slider */}
      <BrandsSlider />

      <UiSeparator.Separator />

      {/* CTA */}
      <section className="py-16 sm:py-24">
        <div className="rounded-2xl bg-muted/50 p-8 sm:p-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Ready to experience WiredWorld?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            Browse our full catalogue or get in touch for bulk orders,
            partnerships, and corporate procurement.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <UiButton.Button size="lg" asChild>
              <Link href={routes.shop.shop}>Shop Now</Link>
            </UiButton.Button>
            <UiButton.Button size="lg" variant="outline" asChild>
              <Link href={routes.contact}>Contact Sales</Link>
            </UiButton.Button>
          </div>
        </div>
      </section>
    </div>
  );
}
