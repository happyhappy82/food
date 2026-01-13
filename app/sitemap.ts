import type { MetadataRoute } from "next";
import { getSortedPropertiesData } from "@/lib/restaurants";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.tasteguide.xyz";
  const restaurants = getSortedPropertiesData();

  const restaurantUrls: MetadataRoute.Sitemap = restaurants.map((restaurant) => ({
    url: `${baseUrl}/${restaurant.slug}`,
    lastModified: new Date(restaurant.date),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...restaurantUrls,
  ];
}
