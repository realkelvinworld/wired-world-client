import {
  HeadsetIcon,
  PackageIcon,
  ArrowsCounterClockwiseIcon,
  ShieldCheckIcon,
} from "@phosphor-icons/react/dist/ssr";

import { UiSeparator } from "@/components/ui";

const features = [
  {
    icon: HeadsetIcon,
    title: "Customer Service",
    description: "Dedicated world-class customer service available 24/7",
  },
  {
    icon: PackageIcon,
    title: "Fast Free Shipping",
    description: "Get free shipping on orders of \u20B510,000 or more",
  },
  {
    icon: ArrowsCounterClockwiseIcon,
    title: "Returns & Exchanges",
    description: "Free returns and exchanges within 30 days of purchase",
  },
  {
    icon: ShieldCheckIcon,
    title: "Secure Payment",
    description:
      "Secured and fast payment options from all Mobile Money Networks",
  },
];

export default function TrustBar() {
  return (
    <section className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div key={feature.title} className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                <feature.icon className="size-5 text-foreground" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold">{feature.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-snug">
                  {feature.description}
                </p>
              </div>
              {index < features.length - 1 && (
                <UiSeparator.Separator
                  orientation="vertical"
                  className="hidden lg:block ml-auto h-12 self-center"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
