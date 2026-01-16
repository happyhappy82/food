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
  readingTime: string;
  notionPageId?: string;
}

function extractExcerpt(content: string, maxLength: number = 150): string {
  const plainText = content
    .replace(/^#+\s+.*/gm, '')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[.*?\]\(.*?\)/g, '')
    .replace(/[*_~`]/g, '')
    .replace(/\n+/g, ' ')
    .trim();

  if (plainText.length <= maxLength) {
    return plainText;
  }

  return plainText.substring(0, maxLength).trim() + '...';
}

export function getSortedRestaurants(): Restaurant[] {
  if (!fs.existsSync(restaurantsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(restaurantsDirectory);
  const allData = fileNames
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
        readingTime: readingTime(content).text,
        notionPageId: data.notionPageId,
      };
    });

  return allData.sort((a, b) => (a.date < b.date ? 1 : -1));
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
    readingTime: readingTime(content).text,
    notionPageId: data.notionPageId,
  };
}

export function formatDisplayDate(isoDate: string): string {
  if (isoDate.includes('T')) {
    return isoDate.split('T')[0];
  }
  return isoDate.slice(0, 10);
}
