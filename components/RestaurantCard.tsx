import Link from "./Link";

interface RestaurantCardProps {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  lightColor: string;
  darkColor: string;
}

function formatDisplayDate(isoDate: string): string {
  // ISO 날짜 문자열에서 직접 YYYY-MM-DD 추출 (timezone 변환 방지)
  if (isoDate.includes('T')) {
    return isoDate.split('T')[0];
  }
  return isoDate.slice(0, 10);
}

export default function RestaurantCard({
  title,
  date,
  excerpt,
  slug,
  lightColor,
}: RestaurantCardProps) {
  return (
    <Link
      className="block py-4"
      href={`/${slug}`}
    >
      <article>
        <h2
          className="text-[28px] font-black leading-none mb-2 text-gray-900"
        >
          {title}
        </h2>
        <time dateTime={date} className="text-[13px] text-gray-700">{formatDisplayDate(date)}</time>
        <p className="mt-1">{excerpt}</p>
      </article>
    </Link>
  );
}
