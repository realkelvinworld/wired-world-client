"use client";

import LoadingLayout from "@/components/animations/loading-layout";
import ComingSoon from "@/components/ux/coming-soon";

export default function TermsPage() {
  return (
    <LoadingLayout>
      <ComingSoon title="Terms & Conditions" description="Our terms and conditions will be available here shortly." />
    </LoadingLayout>
  );
}
