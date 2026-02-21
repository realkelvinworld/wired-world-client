"use client";

import LoadingLayout from "@/components/animations/loading-layout";
import ComingSoon from "@/components/ux/coming-soon";

export default function UserPage() {
  return (
    <LoadingLayout>
      <ComingSoon
        title="My Account"
        description="Manage your account, orders, and preferences."
      />
    </LoadingLayout>
  );
}
