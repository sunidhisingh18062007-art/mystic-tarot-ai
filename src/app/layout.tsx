import type { Metadata, Viewport } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "Mystic Tarot AI — AI-Powered Tarot Readings",
    template: "%s | Mystic Tarot AI",
  },
  description:
    "Discover your future with AI-powered tarot readings. Get personalized insights for love, career, finance, and life with our complete 78-card Rider-Waite deck and advanced AI interpretations.",
  keywords: [
    "tarot",
    "tarot reading",
    "AI tarot",
    "mystic tarot",
    "fortune telling",
    "divination",
    "tarot cards",
    "psychic reading",
    "love reading",
    "career reading",
    "celtic cross",
    "daily tarot",
  ],
  authors: [{ name: "Mystic Tarot AI" }],
  creator: "Mystic Tarot AI",
  publisher: "Mystic Tarot AI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Mystic Tarot AI",
    title: "Mystic Tarot AI — AI-Powered Tarot Readings",
    description:
      "Discover your future with AI-powered tarot readings. Personalized insights for love, career, and life.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mystic Tarot AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mystic Tarot AI — AI-Powered Tarot Readings",
    description:
      "Discover your future with AI-powered tarot readings. Personalized insights for love, career, and life.",
    images: ["/og-image.png"],
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
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#030014",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#a855f7",
          colorBackground: "#0a0520",
          borderRadius: "0.75rem",
        },
        elements: {
          formButtonPrimary:
            "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-500/20",
          card: "bg-[#0a0520] border border-white/10 shadow-xl",
          headerTitle: "text-foreground",
          headerSubtitle: "text-muted-foreground",
          socialButtonsBlockButton:
            "bg-white/5 border-white/10 hover:bg-white/10 text-foreground",
          formFieldInput:
            "bg-white/5 border-white/10 text-foreground",
          footerActionLink: "text-purple-400 hover:text-purple-300",
        },
      } as any}
    >
      <html lang="en" className="dark" suppressHydrationWarning>
        <body
          className={`${inter.variable} font-sans antialiased min-h-screen bg-background text-foreground`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
