"use client";
import { useEffect, useState } from "react";

import { LoadingAnimation } from "../animations/loading";

export default function LoadingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000); // Adjust the duration as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        // Render only the loading animation during the loading phase
        <div className="fixed inset-0 z-[9999999] flex items-center justify-center bg-white">
          <LoadingAnimation />
        </div>
      ) : (
        // Render the children after loading is complete
        <div>{children}</div>
      )}
    </>
  );
}
