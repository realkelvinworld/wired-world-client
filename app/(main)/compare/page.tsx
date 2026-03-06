"use client";

import LoadingLayout from "@/components/animations/loading-layout";
import ComingSoon from "@/components/ux/coming-soon";

export default function ComparePage() {
  return (
    <LoadingLayout>
      <ComingSoon
        title="Compare Products"
        description="Comparing products will be available here shortly."
      />
    </LoadingLayout>
  );
}
