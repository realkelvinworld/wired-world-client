"use client";

import { SVGProps } from "react";

import { Cursor } from "@/components/motion-primitives/cursor";

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

export default function GlobalCursor() {
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
    >
      <CursorIcon className="size-6 text-primary" />
    </Cursor>
  );
}
