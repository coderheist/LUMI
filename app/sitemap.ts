import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/brand";
import { POSTS } from "@/lib/data";

const BASE = BRAND.domain;

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", priority: 1 },
    { path: "/features", priority: 0.9 },
    { path: "/use-cases", priority: 0.9 },
    { path: "/integrations", priority: 0.8 },
    { path: "/pricing", priority: 0.9 },
    { path: "/about", priority: 0.6 },
    { path: "/blog", priority: 0.7 },
    { path: "/changelog", priority: 0.5 },
    { path: "/contact", priority: 0.6 },
    { path: "/docs", priority: 0.5 },
    { path: "/privacy", priority: 0.3 },
    { path: "/terms", priority: 0.3 },
  ];

  return [
    ...routes.map((route) => ({
      url: `${BASE}${route.path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: route.priority,
    })),
    ...POSTS.map((post) => ({
      url: `${BASE}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
