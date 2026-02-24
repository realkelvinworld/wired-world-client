"use client";

import { KitchenOne } from "@/public/images";
import { UiBadge } from "@/components/ui";
import Image from "next/image";

import { TransitionPanel } from "@/components/motion-primitives/transition-panel";
import LoadingLayout from "@/components/animations/loading-layout";
import ContactForm from "@/components/forms/contact/contact-form";
import { useState } from "react";

const TABSANDCONTENT = [
  {
    key: "accra-newtown",
    title: "Accra Newtown",
    url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d917.3281280534882!2d-0.20874299048751724!3d5.585528398965061!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9a3f01f15ab5%3A0x5e552083a132ac4e!2sAccra%20New%20Town%20TotalEnergies%20Service%20Station!5e0!3m2!1sen!2sgh!4v1771594598972!5m2!1sen!2sgh",
  },
  {
    key: "east-legon",
    title: "East Legon",
    url: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d63528.99739277116!2d-0.2326606!3d5.6314307!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9b94acd5665b%3A0xc85bc0ec5903dd85!2sThe%20UnderBridge%20by%20Accra%20Luxury%20Apartments!5e0!3m2!1sen!2sgh!4v1771595916057!5m2!1sen!2sgh",
  },
  {
    key: "kasoa",
    title: "Kasoa",
    url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15884.77477466756!2d-0.43969933957460544!3d5.538267710700377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdfbac05ccbf34f%3A0x948ca3d357f334e3!2sMelcom%20Kasoa%20branch!5e0!3m2!1sen!2sgh!4v1771595398083!5m2!1sen!2sgh",
  },
  {
    key: "warehouse",
    title: " Our Warehouse",
    url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.8480509819856!2d-0.2065021881498515!3d5.589462494367855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9084b2b7a773%3A0x96dc3765b235c1df!2sHQQW%2BQCP%2C%20Accra!5e0!3m2!1sen!2sgh!4v1771595521924!5m2!1sen!2sgh",
  },
];

export default function ContactPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <LoadingLayout>
      <div className="min-h-screen max-w-7xl mx-auto px-4 py-12">
        <section className="grid lg:grid-cols-2 grid-cols-1 gap-x-10 ">
          <div className="relative">
            <Image
              src={KitchenOne}
              alt="Wired world Kitchen setup"
              unoptimized
              quality={100}
              className="object-cover object-center lg:h-200 h-100 rounded-xl bg-gray-100"
            />
            <UiBadge.Badge className="absolute top-4 left-4 font-semibold bg-primary text-white">
              wiredworld.
            </UiBadge.Badge>
            <p className="block text-[clamp(1rem,8vw,10rem)] leading-none font-bold tracking-tighter text-primary-foreground/40 absolute lg:bottom-14 bottom-2 lg:left-2 right-2">
              contact.
            </p>
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl lg:m-0 mt-10 font-bold tracking-tight">
              Let&#39;s Start a <br />
              <span className="text-primary">Conversation</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-md">
              Have a question, need a quote, or want to explore a bulk order?
              We&#39;d love to hear from you. Our team typically responds within
              24 hours.
            </p>
            {/* Form */}
            <ContactForm />
          </div>
        </section>

        {/* Location */}
        <div className="lg:mt-20 mt-10">
          <h2 className="lg:text-4xl sm:text-3xl font-bold tracking-tight">
            Come Say <span className="text-primary">Hello</span>
          </h2>
          <p className="mt-2 text-muted-foreground max-w-xl">
            Prefer to see things in person? Stop by our showroom in / at{" "}
            <span className="text-primary">
              {" "}
              {TABSANDCONTENT[activeIndex].title}{" "}
            </span>{" "}
            — our doors are always open.
          </p>
          <div>
            <div className="mb-4 flex space-x-2 overflow-auto">
              {TABSANDCONTENT.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`hover:cursor-pointer px-4 py-1 text-sm font-medium hover:bg-none ${
                    activeIndex === index
                      ? "border-b-2 border-primary text-primary  "
                      : " text-neutral-800"
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </div>
            <div className="overflow-hidden border-t border-zinc-200 dark:border-zinc-700">
              <TransitionPanel
                activeIndex={activeIndex}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                variants={{
                  enter: { opacity: 0, x: -50, filter: "blur(4px)" },
                  center: { opacity: 1, x: 0, filter: "blur(0px)" },
                  exit: { opacity: 0, x: 50, filter: "blur(4px)" },
                }}
              >
                {TABSANDCONTENT.map((item, index) => (
                  <div key={index} className="py-2">
                    <div className="relative h-64 rounded-xl overflow-hidden border border-gray-200 bg-gray-100">
                      {
                        <iframe
                          src={item.url}
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          className="absolute inset-0"
                        />
                      }
                    </div>
                  </div>
                ))}
              </TransitionPanel>
            </div>
          </div>
        </div>
      </div>
    </LoadingLayout>
  );
}
