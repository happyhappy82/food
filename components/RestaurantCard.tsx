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
  const date = new Date(isoDate);
  return date.toISOString().split('T')[0];
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
