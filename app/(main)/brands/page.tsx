"use client";

import LoadingLayout from "@/components/animations/loading-layout";
import ComingSoon from "@/components/ux/coming-soon";

export default function BrandsPage() {
  return (
    <LoadingLayout>
      <ComingSoon title="Brands" description="Explore our curated collection of trusted electronics brands." />
    </LoadingLayout>
  );
}
