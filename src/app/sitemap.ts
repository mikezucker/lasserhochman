import type { MetadataRoute } from "next";
import { origin } from "@/lib/seo";
import { attorneys } from "@/data/attorneys";
import { practices } from "@/data/practices";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/about",
    "/attorneys",
    "/practice",
    "/contact",
    "/privacy",
    ...attorneys.map((a) => `/${a.slug}`),
    ...practices.map((p) => `/practice/${p.slug}`),
  ].map((path) => ({
    url: origin + path,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
