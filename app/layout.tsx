import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { PageTransitionWrapper } from "@/components/portfolio/page-transition";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FDFDFE" },
    { media: "(prefers-color-scheme: dark)", color: "#090812" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://shashidharpc.vercel.app"),
  title: {
    default: "Shashidhar P C | Full Stack Software Engineer",
    template: "%s | Shashidhar P C",
  },
  description:
    "Portfolio of Shashidhar P C, Full Stack Software Engineer experienced in developing secure, database-driven web applications using Python, Flask, JavaScript, PHP, MySQL, and MongoDB.",
  keywords: [
    "Shashidhar P C",
    "Full Stack Software Engineer",
    "Python",
    "Flask",
    "JavaScript",
    "PHP",
    "MySQL",
    "MongoDB",
    "REST APIs",
    "Role Based Access Control",
    "Bengaluru",
    "MCA",
  ],
  authors: [{ name: "Shashidhar P C" }],
  creator: "Shashidhar P C",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "http://localhost:3000",
    title: "Shashidhar P C | Full Stack Software Engineer",
    description:
      "Developing secure, database-driven web applications using Python, Flask, JavaScript, and PHP. Skilled in REST APIs, RBAC, MySQL, and MongoDB.",
    siteName: "Shashidhar P C Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shashidhar P C | Full Stack Software Engineer",
    description:
      "Developing secure, database-driven web applications using Python, Flask, JavaScript, and PHP.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
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
      className="light"
    >
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased selection:bg-[#FF5722]/20 selection:text-[#FF5722]">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#FF5722] focus:text-white focus:shadow-lg focus:rounded-md"
          >
            Skip to main content
          </a>

          {/* Page Transition Wrapper */}
          <PageTransitionWrapper>{children}</PageTransitionWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
