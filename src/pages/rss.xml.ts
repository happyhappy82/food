import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getSortedRestaurants } from '@/utils/restaurants';

export async function GET(context: APIContext) {
  const restaurants = getSortedRestaurants();

  return rss({
    title: '테이스트 가이드',
    description: '한국의 지역별 맛집정보, 가격정보 등을 전달해드리는 곳입니다.',
    site: context.site || 'https://www.tasteguide.xyz',
    items: restaurants.map((restaurant) => ({
      title: restaurant.title,
      pubDate: new Date(restaurant.date),
      description: restaurant.excerpt,
      link: `/${restaurant.slug}`,
    })),
    customData: `<language>ko</language>`,
  });
}
