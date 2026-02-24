"use client";

import { SVGProps, useCallback, useEffect, useState } from "react";

import { Cursor } from "@/components/motion-primitives/cursor";

const POINTER_SELECTOR =
  'a[href], button, [role="button"], input[type="submit"], input[type="button"], select, summary, label[for], [tabindex]:not([tabindex="-1"])';

function CursorIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={26}
      height={31}
      fill="none"
      {...props}
    >
      <g clipPath="url(#cursor-icon)">
        <path
          fill="currentColor"
          fillRule="evenodd"
          stroke="#fff"
          strokeLinecap="square"
          strokeWidth={2}
          d="M21.993 14.425 2.549 2.935l4.444 23.108 4.653-10.002z"
          clipRule="evenodd"
        />
      </g>
      <defs>
        <clipPath id="cursor-icon">
          <path fill="currentColor" d="M0 0h26v31H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

function PointerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 256 256"
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        stroke="#fff"
        strokeWidth={12}
        strokeLinejoin="round"
        d="M224,104v50.93c0,46.2-36.85,84.55-83,85.06A83.71,83.71,0,0,1,80.6,215.4C58.79,192.33,34.15,136,34.15,136a16,16,0,0,1,6.53-22.23c7.66-4,17.1-.84,21.4,6.62l21,36.44a6.09,6.09,0,0,0,6,3.09l.12,0A8.19,8.19,0,0,0,96,151.74V32a16,16,0,0,1,16.77-16c8.61.4,15.23,7.82,15.23,16.43V104a8,8,0,0,0,8.53,8,8.17,8.17,0,0,0,7.47-8.25V88a16,16,0,0,1,16.77-16c8.61.4,15.23,7.82,15.23,16.43V112a8,8,0,0,0,8.53,8,8.17,8.17,0,0,0,7.47-8.25v-7.28c0-8.61,6.62-16,15.23-16.43A16,16,0,0,1,224,104Z"
      />
    </svg>
  );
}

export default function GlobalCursor() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setIsDesktop(mq.matches);

    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handlePositionChange = useCallback((_x: number, _y: number) => {
    const el = document.elementFromPoint(_x, _y) as HTMLElement | null;
    if (!el) return;
    const pointer = !!(
      el.closest(POINTER_SELECTOR) ||
      el.closest(".cursor-pointer")
    );
    setIsPointer(pointer);
  }, []);

  if (!isDesktop) return null;

  return (
    <Cursor
      variants={{
        initial: { scale: 0.3, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0.3, opacity: 0 },
      }}
      transition={{
        ease: "easeInOut",
        duration: 0.15,
      }}
      onPositionChange={handlePositionChange}
    >
      {isPointer ? (
        <PointerIcon className="size-6 text-primary" />
      ) : (
        <CursorIcon className="size-6 text-primary" />
      )}
    </Cursor>
  );
}
