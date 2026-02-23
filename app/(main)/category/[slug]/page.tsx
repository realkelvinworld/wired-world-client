"use client";

import LoadingLayout from "@/components/animations/loading-layout";
import ComingSoon from "@/components/ux/coming-soon";

export default function PrivacyPage() {
  return (
    <LoadingLayout>
      <ComingSoon
        title="Product category"
        description="Our product category will be available here shortly."
      />
    </LoadingLayout>
  );
}
