import type { Metadata } from "next";

import { Product } from "@/models/product";

type Props = {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const siteUrl = "https://wiredworldgh.com";

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/inventory/items/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ type: "item", id: Number(id) }),
        next: { revalidate: 3600 },
      },
    );

    const data = await res.json();
    const product: Product = data?.info;

    if (!product) {
      return {
        title: "Product Not Found",
        description: "This product could not be found at WiredWorld Ghana.",
      };
    }

    const title = product.name;
    const description = `Buy the ${product.name} by ${product.brand__name} in Ghana. Category: ${product.category__main_category__name} › ${product.category__name}. Authentic product with manufacturer warranty. Nationwide delivery & Mobile Money accepted. Shop at WiredWorld.`;
    const image = product.images?.[0];

    return {
      title,
      description,
      openGraph: {
        type: "website",
        url: `${siteUrl}/shop/${id}`,
        title: `${product.name} | WiredWorld Ghana`,
        description,
        images: image
          ? [
              {
                url: image,
                alt: `${product.name} — available at WiredWorld Ghana`,
              },
            ]
          : [
              {
                url: `${siteUrl}/images/HOME-BANNER-3.jpg`,
                width: 1200,
                height: 630,
                alt: "WiredWorld Ghana — Electronics & Home Appliances",
              },
            ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${product.name} | WiredWorld Ghana`,
        description,
        images: image ? [image] : [`${siteUrl}/images/HOME-BANNER-3.jpg`],
      },
    };
  } catch {
    return {
      title: "Product",
      description:
        "Shop electronics and home appliances at WiredWorld Ghana. Authentic products, nationwide delivery, Mobile Money accepted.",
    };
  }
}

export default function ProductDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
