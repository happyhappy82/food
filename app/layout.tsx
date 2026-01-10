import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "테이스트 가이드",
  description: "한국의 지역별 맛집정보, 가격정보 등을 전달해드리는 곳입니다. 여행갈때, 나들이갈때 맛집정보를 테이스트 가이드에서 확인하세요.",
  metadataBase: new URL("https://foodreviewlab.xyz"),
  keywords: ["맛집 정보", "지역별 맛집", "맛집 가격", "여행 맛집", "나들이 맛집"],
  authors: [{ name: "테이스트 가이드" }],
  creator: "테이스트 가이드",
  publisher: "테이스트 가이드",
  openGraph: {
    title: "테이스트 가이드",
    description: "한국의 지역별 맛집정보, 가격정보 등을 전달해드리는 곳입니다. 여행갈때, 나들이갈때 맛집정보를 테이스트 가이드에서 확인하세요.",
    type: "website",
    locale: "ko_KR",
    url: "https://foodreviewlab.xyz",
    siteName: "테이스트 가이드",
  },
  twitter: {
    card: "summary_large_image",
    title: "테이스트 가이드",
    description: "한국의 지역별 맛집정보, 가격정보 등을 전달해드리는 곳입니다. 여행갈때, 나들이갈때 맛집정보를 테이스트 가이드에서 확인하세요.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "테이스트 가이드",
    "alternateName": "Taste Guide",
    "url": "https://foodreviewlab.xyz",
    "description": "한국의 지역별 맛집정보, 가격정보 등을 전달해드리는 곳입니다. 여행갈때, 나들이갈때 맛집정보를 테이스트 가이드에서 확인하세요.",
  };

  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="mx-auto max-w-2xl bg-white px-5 py-12 text-black">
        {children}
      </body>
    </html>
  );
}
