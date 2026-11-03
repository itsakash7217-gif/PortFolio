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
  title: "Akash Kushwaha — Full-Stack Developer Portfolio",
  description:
    "Portfolio of Akash Kushwaha — a Computer Science (AI) undergrad at NIET with 400+ LeetCode problems solved in Java. Full-stack projects with React, Next.js, Node.js, MongoDB, TensorFlow and the Gemini API.",
  keywords: [
    "Akash Kushwaha",
    "portfolio",
    "full-stack developer",
    "artificial intelligence",
    "LeetCode",
    "DSA",
    "React",
    "Next.js",
    "MERN",
  ],
  authors: [{ name: "Akash Kushwaha" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Akash Kushwaha — Full-Stack Developer Portfolio",
    description:
      "Skills, projects and learning journey of an AI-focused full-stack developer.",
    siteName: "Akash Kushwaha Portfolio",
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
