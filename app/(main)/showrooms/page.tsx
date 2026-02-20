"use client";

import LoadingLayout from "@/components/animations/loading-layout";
import ComingSoon from "@/components/ux/coming-soon";

export default function ShowroomsPage() {
  return (
    <LoadingLayout>
      <ComingSoon title="Showrooms" description="Visit our showrooms to experience products in person." />
    </LoadingLayout>
  );
}
