import { getArticleAllSlug } from "@/actions/article.action";
import { getBusinessAllSlug } from "@/actions/business-profile.action";
import { getCategories } from "@/actions/category.action";
import { getPageAllSlug } from "@/actions/page.action";
import { getServiceAllSlug } from "@/actions/service.action";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  
  if (process.env.SKIP_DB === "true") {
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1,
      },
    ];
  }

  const category = (await getCategories()).map((item) => ({
    url: `${baseUrl}/category/${item.slug}`,
    lastModified: item.updatedAt ?? new Date(),
    changeFrequency: "weekly" as MetadataRoute.Sitemap[0]["changeFrequency"],
    priority: 0.7,
  }));

  const service = (await getServiceAllSlug()).map((item) => ({
    url: `${baseUrl}/jasa/${item.slug}`,
    lastModified: item.updatedAt ?? new Date(),
    changeFrequency: "weekly" as MetadataRoute.Sitemap[0]["changeFrequency"],
    priority: 0.8,
  }));

  const articles = (await getArticleAllSlug()).map((item) => ({
    url: `${baseUrl}/article/${item.slug}`,
    lastModified: item.updatedAt ?? new Date(),
    changeFrequency: "weekly" as MetadataRoute.Sitemap[0]["changeFrequency"],
    priority: 0.6,
  }));

  const business = (await getBusinessAllSlug()).map((item) => ({
    url: `${baseUrl}/penyedia-jasa/${item.slug}`,
    lastModified: item.updatedAt ?? new Date(),
    changeFrequency: "weekly" as MetadataRoute.Sitemap[0]["changeFrequency"],
    priority: 0.8,
  }));

  const pages = (await getPageAllSlug()).map((item) => ({
    url: `${baseUrl}/page/${item.slug}`,
    lastModified: item.updatedAt ?? new Date(),
    changeFrequency: "weekly" as MetadataRoute.Sitemap[0]["changeFrequency"],
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...service,
    ...business,
    ...pages,
    ...category,
    ...articles,
  ];
}
