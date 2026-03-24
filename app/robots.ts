import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/user/", "/auth/", "/checkout/"],
      },
    ],
    sitemap: "https://wiredworldgh.com/sitemap.xml",
  };
}
