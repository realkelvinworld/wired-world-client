import { redirect } from "next/navigation";
import React from "react";

import { requireAuthentication } from "./auth-check";

export default async function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const redirectTo = await requireAuthentication();
  if (redirectTo) {
    redirect(redirectTo);
  }
  console.log(redirectTo);

  return <>{children}</>;
}
