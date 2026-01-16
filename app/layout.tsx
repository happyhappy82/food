import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = "https://www.tasteguide.xyz";
const SITE_NAME = "테이스트 가이드";
const SITE_DESCRIPTION = "한국의 지역별 맛집정보, 가격정보 등을 전달해드리는 곳입니다. 여행갈때, 나들이갈때 맛집정보를 테이스트 가이드에서 확인하세요.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  verification: {
    google: "sUqWsAvcwgNpd8rOL89tdHIAhTykv68Sc9gXXRuMnSE",
    other: {
      "naver-site-verification": ["f195db2afb063f002b33fcdac086cd356b5db778"],
    },
  },
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  keywords: ["맛집 정보", "지역별 맛집", "맛집 가격", "여행 맛집", "나들이 맛집", "맛집 추천", "맛집 리뷰"],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - 한국 맛집 정보`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/twitter-image.png`],
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
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    alternateName: "Taste Guide",
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    inLanguage: "ko-KR",
  };

  const organizationSchema = {
    "@context": "https://schema.org",
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
    description: SITE_DESCRIPTION,
  };

  return (
    <html lang="ko">
      <head>
        {/* Preconnect & DNS Prefetch for external resources */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* RSS Feed */}
        <link rel="alternate" type="application/rss+xml" title={`${SITE_NAME} RSS Feed`} href={`${SITE_URL}/rss.xml`} />

        {/* GA/GTM Deferred Load - loads after window.onload for better performance */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}

              function loadGA() {
                var script = document.createElement('script');
                script.src = 'https://www.googletagmanager.com/gtag/js?id=G-EY70J0X7MT';
                script.async = true;
                document.head.appendChild(script);
                gtag('js', new Date());
                gtag('config', 'G-EY70J0X7MT');
              }

              function loadGTM() {
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-P8CB3VNV');
              }

              if (window.requestIdleCallback) {
                requestIdleCallback(function() {
                  loadGA();
                  loadGTM();
                });
              } else {
                window.addEventListener('load', function() {
                  setTimeout(function() {
                    loadGA();
                    loadGTM();
                  }, 0);
                });
              }
            `,
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="mx-auto max-w-2xl bg-white px-5 py-12 text-black">
        {/* Skip to content link for accessibility */}
        <a href="#main-content" className="skip-link">
          본문으로 바로가기
        </a>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P8CB3VNV"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <div id="main-content">
          {children}
        </div>
      </body>
    </html>
  );
}
