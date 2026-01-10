import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const restaurantsDirectory = path.join(process.cwd(), 'content/restaurants');

export interface Restaurant {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  lightColor: string;
  darkColor: string;
  readingTime: string;
  notionPageId?: string;
}

function extractExcerpt(content: string, maxLength: number = 150): string {
  // 마크다운 문법 제거
  const plainText = content
    .replace(/^#+\s+.*/gm, '') // 헤더 제거
    .replace(/!\[.*?\]\(.*?\)/g, '') // 이미지 제거
    .replace(/\[.*?\]\(.*?\)/g, '') // 링크 제거
    .replace(/[*_~`]/g, '') // 강조 문법 제거
    .replace(/\n+/g, ' ') // 줄바꿈을 공백으로
    .trim();

  if (plainText.length <= maxLength) {
    return plainText;
  }

  return plainText.substring(0, maxLength).trim() + '...';
}

export function getSortedPropertiesData(): Restaurant[] {
  if (!fs.existsSync(restaurantsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(restaurantsDirectory);
  const allPropertiesData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(restaurantsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      const excerpt = data.excerpt || extractExcerpt(content);

      return {
        slug,
        title: data.title || '',
        date: data.date || '',
        excerpt,
        content,
        lightColor: data.lightColor || 'lab(62.926 59.277 -1.573)',
        darkColor: data.darkColor || 'lab(80.993 32.329 -7.093)',
        readingTime: readingTime(content).text,
        notionPageId: data.notionPageId,
      };
    });

  return allPropertiesData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getRestaurantBySlug(slug: string): Restaurant | null {
  const decodedSlug = decodeURIComponent(slug);
  const fullPath = path.join(restaurantsDirectory, `${decodedSlug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const excerpt = data.excerpt || extractExcerpt(content);

  return {
    slug: decodedSlug,
    title: data.title || '',
    date: data.date || '',
    excerpt,
    content,
    lightColor: data.lightColor || 'lab(62.926 59.277 -1.573)',
    darkColor: data.darkColor || 'lab(80.993 32.329 -7.093)',
    readingTime: readingTime(content).text,
    notionPageId: data.notionPageId,
  };
}
