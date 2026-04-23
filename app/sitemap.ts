import type { MetadataRoute } from "next";

import type { Product } from "@/models/product";

const baseUrl = "https://wiredworldgh.com";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const now = new Date();

const staticRoutes: MetadataRoute.Sitemap = [
  {
    url: baseUrl,
    lastModified: now,
    changeFrequency: "daily",
    priority: 1,
  },
  {
    url: `${baseUrl}/shop`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.95,
  },
  {
    url: `${baseUrl}/brands`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  },
  {
    url: `${baseUrl}/showrooms`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75,
  },
  {
    url: `${baseUrl}/contact`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: `${baseUrl}/about`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.65,
  },
  {
    url: `${baseUrl}/privacy`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    url: `${baseUrl}/terms`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.3,
  },
];

async function fetchProductPage(page: number, drop: number): Promise<Product[]> {
  if (!apiUrl) return [];

  try {
    const response = await fetch(`${apiUrl}/inventory/items/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        type: "list",
        page,
        drop,
      }),
    });

    if (!response.ok) return [];

    const data = (await response.json()) as {
      success?: boolean;
      info?: Product[];
    };

    if (!data.success || !Array.isArray(data.info)) return [];

    return data.info;
  } catch {
    return [];
  }
}

async function fetchAllProducts(): Promise<Product[]> {
  const products: Product[] = [];
  const pageSize = 200;
  let page = 1;

  while (page <= 50) {
    const pageProducts = await fetchProductPage(page, pageSize);

    if (pageProducts.length === 0) break;

    products.push(...pageProducts);

    if (pageProducts.length < pageSize) break;

    page += 1;
  }

  return products;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const products = await fetchAllProducts();
    const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
      url: `${baseUrl}/shop/${product.id}`,
      lastModified: new Date(product.created || now),
      changeFrequency: "daily",
      priority: product.on_promotion ? 0.9 : 0.8,
    }));

    return [...staticRoutes, ...productRoutes];
  } catch {
    return staticRoutes;
  }
}
