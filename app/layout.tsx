import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#0C0A17" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Shashidhar P C | Senior Fullstack Engineer & Distributed Systems",
    template: "%s | Shashidhar P C",
  },
  description:
    "Production-grade personal portfolio and technical workspace of Shashidhar P C, Senior Fullstack Engineer specializing in Next.js 15, TypeScript, cloud architecture, and design systems.",
  keywords: [
    "Fullstack Engineer",
    "Next.js 15",
    "React",
    "TypeScript",
    "Software Architect",
    "Design Systems",
    "Prisma",
  ],
  authors: [{ name: "Shashidhar P C" }],
  creator: "Shashidhar P C",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "http://localhost:3000",
    title: "Shashidhar P C | Senior Fullstack Engineer",
    description:
      "Crafting resilient cloud architectures, high-performance web applications, and intuitive developer experiences.",
    siteName: "Shashidhar P C Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shashidhar P C | Senior Fullstack Engineer",
    description:
      "Crafting resilient cloud architectures, high-performance web applications, and intuitive developer experiences.",
    creator: "@shashidharpc",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${jakarta.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased selection:bg-[#7C3AED]/20 selection:text-[#7C3AED]">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-[#14122B] focus:shadow-md focus:rounded-md focus:ring-2 focus:ring-[#7C3AED]"
          >
            Skip to main content
          </a>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
