import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alex Carter — Full-Stack Developer Portfolio",
  description:
    "Interactive portfolio showcasing skills, projects and the learning journey of Alex Carter, a full-stack developer. Built with Next.js, TypeScript, Tailwind CSS and Framer Motion.",
  keywords: [
    "portfolio",
    "full-stack developer",
    "Next.js",
    "TypeScript",
    "React",
    "projects",
    "skills",
  ],
  authors: [{ name: "Alex Carter" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Alex Carter — Full-Stack Developer Portfolio",
    description:
      "Skills, projects and learning journey with interactive visual effects.",
    siteName: "Alex Carter Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
