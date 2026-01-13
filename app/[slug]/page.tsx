import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Header from "@/components/Header";
import TableOfContents from "@/components/TableOfContents";
import QnA from "@/components/QnA";
import { getRestaurantBySlug, getSortedPropertiesData } from "@/lib/restaurants";
import { extractQnA, removeQnASection } from "@/lib/qna-utils";
import type { Metadata } from "next";

const SITE_URL = "https://www.tasteguide.xyz";
const SITE_NAME = "테이스트 가이드";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const restaurants = getSortedPropertiesData();
  return restaurants.map((property) => ({
    slug: property.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const property = getRestaurantBySlug(slug);

  if (!property) {
    return {
      title: "Not Found",
    };
  }

  const url = `${SITE_URL}/${slug}`;

  return {
    title: property.title,
    description: property.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: property.title,
      description: property.excerpt,
      url: url,
      siteName: SITE_NAME,
      locale: "ko_KR",
      type: "article",
      publishedTime: property.date,
      modifiedTime: property.date,
      authors: [SITE_NAME],
      images: [
        {
          url: `${SITE_URL}/opengraph-image.png`,
          width: 1200,
          height: 630,
          alt: property.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: property.title,
      description: property.excerpt,
      images: [`${SITE_URL}/twitter-image.png`],
    },
  };
}

export default async function RestaurantPage({ params }: Props) {
  const { slug } = await params;
  const property = getRestaurantBySlug(slug);

  if (!property) {
    notFound();
  }

  const qnaItems = extractQnA(property.content);
  const contentWithoutQnA = removeQnASection(property.content);
  const articleUrl = `${SITE_URL}/${slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${articleUrl}/#article`,
    headline: property.title,
    description: property.excerpt,
    image: `${SITE_URL}/opengraph-image.png`,
    author: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
        width: 180,
        height: 40,
      },
    },
    datePublished: property.date,
    dateModified: property.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    inLanguage: "ko-KR",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "홈",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: property.title,
        item: articleUrl,
      },
    ],
  };

  const faqSchema = qnaItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qnaItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  } : null;

  return (
    <>
      <Header />
      <article className="relative">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        {faqSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          />
        )}

        <div className="mb-8">
          <h1
            className="text-[42px] font-black leading-tight mb-4"
            style={{ color: property.lightColor }}
          >
            {property.title}
          </h1>
          <div className="flex gap-4 text-sm text-gray-600">
            <time dateTime={property.date}>{property.date}</time>
            <span>{property.readingTime}</span>
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h2: ({ node, ...props }) => {
                const text = props.children?.toString() || "";
                const id = text.toLowerCase().replace(/\s+/g, "-");
                return <h2 id={id} {...props} />;
              },
              h3: ({ node, ...props }) => {
                const text = props.children?.toString() || "";
                const id = text.toLowerCase().replace(/\s+/g, "-");
                return <h3 id={id} {...props} />;
              },
            }}
          >
            {contentWithoutQnA}
          </ReactMarkdown>
        </div>

        <QnA items={qnaItems} />
        <TableOfContents />
      </article>
    </>
  );
}
