import { DOMAIN_URL } from "@/constants/common";
import { getArticlesPaths } from "@/lib/articles/list";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const articlePaths = getArticlesPaths();

  const articleSitemaps = articlePaths.map((article) => {
    return {
      url: `${DOMAIN_URL}${article.route}`,
    };
  });

  return [{ url: DOMAIN_URL, lastModified: new Date() }, ...articleSitemaps];
}
