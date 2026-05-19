import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/blog", "/calculators", "/comparisons", "/reviews", "/about", "/contact"];
  return routes.map((route) => ({ url: `https://rupeeorbit.in${route}`, lastModified: new Date(), changeFrequency: "weekly", priority: route === "" ? 1 : 0.7 }));
}
