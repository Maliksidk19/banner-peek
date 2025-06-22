import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Script from "next/script";
import {
  ServiceWorkerProvider,
  OfflineIndicator,
} from "@/components/ServiceWorker";
import { OfflineStorageInfo } from "@/components/OfflineStorageInfo";

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL! ?? "https://bannerpeek.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "BannerPeek",
  title: {
    default: "BannerPeek - Preview Your Social Profile before Going Live",
    template: "%s | BannerPeek",
  },
  description:
    "Free tool to preview how your LinkedIn and Twitter banners and profile photos will look on desktop and mobile before going live. No registration required.",
  keywords: [
    "LinkedIn banner preview",
    "Twitter banner preview",
    "social media profile preview",
    "banner dimensions",
    "profile photo preview",
    "LinkedIn profile optimization",
    "Twitter profile optimization",
    "social media branding",
    "professional headshot preview",
  ],
  authors: [{ name: "Saad", url: "https://saadx.com" }],
  creator: "Saad",
  publisher: "Saad",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "BannerPeek - Preview Your Social Profile before Going Live",
    description:
      "Free tool to preview how your LinkedIn and Twitter banners and profile photos will look on desktop and mobile before going live.",
    siteName: "BannerPeek",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BannerPeek - Social Media Banner Preview Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BannerPeek - Preview Your Social Profile before Going Live",
    description:
      "Free tool to preview how your LinkedIn and Twitter banners and profile photos will look on desktop and mobile before going live.",
    images: ["/og-image.png"],
    creator: "@maliksidk19",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "android-chrome",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
      },
      {
        rel: "android-chrome",
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
      },
    ],
  },
};

const inter = Inter({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: "BannerPeek",
        description:
          "Free tool to preview how your LinkedIn and Twitter banners and profile photos will look on desktop and mobile before going live. No registration required.",
        url: siteUrl,
        inLanguage: "en-US",
        author: {
          "@id": "https://saadx.com/#person",
        },
        creator: {
          "@id": "https://saadx.com/#person",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${siteUrl}/?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Person",
        "@id": "https://saadx.com/#person",
        name: "Saad",
        url: "https://saadx.com",
        sameAs: [
          "https://twitter.com/maliksidk19",
          "https://linkedin.com/in/maliksidk19",
          "https://github.com/maliksidk19",
        ],
      },
    ],
  };
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/favicon-32x32.png"
          as="image"
          type="image/png"
        />
        <link
          rel="preload"
          href="/android-chrome-192x192.png"
          as="image"
          type="image/png"
        />
        <script
          defer
          src="https://analytics-setup.vercel.app/script.js"
          data-website-id="b72de011-996c-4def-aa6b-d869ec322563"
        ></script>
      </head>
      <body
        suppressHydrationWarning
        className={`antialiased ${inter.className}`}
      >
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <ServiceWorkerProvider>
          <OfflineIndicator />
          {children}
          <OfflineStorageInfo />
        </ServiceWorkerProvider>
      </body>
    </html>
  );
}
