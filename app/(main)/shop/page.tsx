"use client";

import LoadingLayout from "@/components/animations/loading-layout";
import ComingSoon from "@/components/ux/coming-soon";

export default function ShopPage() {
  return (
    <LoadingLayout>
      <ComingSoon title="Shop" description="Browse our full catalogue of electronics and home appliances." />
    </LoadingLayout>
  );
}
