import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { UiButton } from "@/components/ui";
import { routes } from "@/routes";

interface ComingSoonProps {
  title: string;
  description?: string;
}

export default function ComingSoon({
  title,
  description = "We're working hard to bring this page to life. Check back soon!",
}: ComingSoonProps) {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md text-center">
        <p className="text-sm font-medium text-primary">Coming Soon</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-muted-foreground">{description}</p>
        <div className="mt-8">
          <UiButton.Button variant="outline" asChild>
            <Link href={routes.home}>
              <ArrowLeft className="size-4" />
              Back to Home
            </Link>
          </UiButton.Button>
        </div>
      </div>
    </main>
  );
}
