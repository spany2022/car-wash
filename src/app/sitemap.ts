import type { MetadataRoute } from "next";
import { business } from "@/content/business";
import { services } from "@/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = business.siteUrl;
  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    ...services.map((s) => ({
      url: `${base}/services/${s.slug}`,
      changeFrequency: "monthly" as const,
      priority: s.featured ? 0.9 : 0.7,
    })),
    { url: `${base}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/terms`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
