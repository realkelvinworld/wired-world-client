"use client";

import { useState } from "react";

import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogClose,
  MorphingDialogImage,
  MorphingDialogContainer,
} from "@/components/motion-primitives/morphing-dialog";
import { XIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({
  images,
  productName,
}: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(images?.[0]);

  return (
    <div className="space-y-4">
      {/* Main image with MorphingDialog zoom */}
      <MorphingDialog transition={{ duration: 0.3, ease: "easeInOut" }}>
        <MorphingDialogTrigger className="block w-full">
          <MorphingDialogImage
            src={activeImage}
            alt={productName}
            className="aspect-square w-full rounded-2xl border bg-muted/20 object-contain p-6"
          />
        </MorphingDialogTrigger>
        <MorphingDialogContainer>
          <MorphingDialogContent className="relative">
            <MorphingDialogImage
              src={activeImage}
              alt={productName}
              className="h-auto w-full max-w-[90vw] rounded-lg object-contain lg:h-[90vh]"
            />
          </MorphingDialogContent>
          <MorphingDialogClose
            className="fixed right-6 top-6 h-fit w-fit rounded-full bg-background p-2 shadow-md"
            variants={{
              initial: { opacity: 0 },
              animate: {
                opacity: 1,
                transition: { delay: 0.3, duration: 0.1 },
              },
              exit: { opacity: 0, transition: { duration: 0 } },
            }}
          >
            <XIcon className="size-5" />
          </MorphingDialogClose>
        </MorphingDialogContainer>
      </MorphingDialog>

      {/* Thumbnail strip */}
      {images?.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(img)}
              className={cn(
                "shrink-0 size-20 rounded-lg border-2 bg-muted/20 p-1.5 transition-colors",
                activeImage === img
                  ? "border-primary"
                  : "border-transparent hover:border-muted-foreground/30",
              )}
            >
              <img
                src={img}
                alt={`${productName} ${idx + 1}`}
                className="size-full object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
