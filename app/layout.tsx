import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "BannerPeek",
  description:
    "BannerPeek lets you preview how your LinkedIn and Twitter banners and profile photos will look on both desktop and mobile, before you go live.",
};

const inter = Inter({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
