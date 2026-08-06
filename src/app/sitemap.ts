import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://kwkang.net";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${base}/profile`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];
}
