import { getSortedPropertiesData } from "@/lib/restaurants";

const SITE_URL = "https://www.tasteguide.xyz";
const SITE_NAME = "테이스트 가이드";
const SITE_DESCRIPTION = "한국의 지역별 맛집정보, 가격정보 등을 전달해드리는 곳입니다.";

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const restaurants = getSortedPropertiesData();

  const itemsXml = restaurants
    .map(
      (restaurant) => `
    <item>
      <title>${escapeXml(restaurant.title)}</title>
      <link>${SITE_URL}/${encodeURIComponent(restaurant.slug)}</link>
      <guid isPermaLink="true">${SITE_URL}/${encodeURIComponent(restaurant.slug)}</guid>
      <description>${escapeXml(restaurant.excerpt)}</description>
      <pubDate>${new Date(restaurant.date).toUTCString()}</pubDate>
    </item>`
    )
    .join("");

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>ko</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    ${itemsXml}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
