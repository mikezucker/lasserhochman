import type { MetadataRoute } from "next";
import { canIndex, origin } from "@/lib/seo";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(canIndex ? { allow: "/" } : { disallow: "/" }),
    },
    ...(canIndex ? { sitemap: `${origin}/sitemap.xml` } : {}),
  };
}
