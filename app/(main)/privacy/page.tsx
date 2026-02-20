"use client";

import LoadingLayout from "@/components/animations/loading-layout";
import ComingSoon from "@/components/ux/coming-soon";

export default function PrivacyPage() {
  return (
    <LoadingLayout>
      <ComingSoon title="Privacy Policy" description="Our privacy policy will be available here shortly." />
    </LoadingLayout>
  );
}
