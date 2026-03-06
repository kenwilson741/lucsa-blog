import type { Metadata } from "next";
import { Inter, Open_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SessionProvider } from "@/components/SessionProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const openSans = Open_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "LUCSA - Laikipia University Communication Students' Association",
    template: "%s | LUCSA",
  },
  description:
    "Official platform for LUCSA members. Join us to develop journalistic skills, network with industry professionals, and speak with conviction.",
  keywords: [
    "LUCSA",
    "Laikipia University",
    "Communication Students",
    "Journalism",
    "Media",
    "Nyahururu",
    "Kenya",
    "Student Association",
  ],
  authors: [{ name: "LUCSA Executive Committee" }],
  openGraph: {
    title: "LUCSA - Speak with Conviction",
    description:
      "Official Laikipia University Communication Students' Association platform",
    url: "https://lucsa.com",
    siteName: "LUCSA",
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LUCSA",
    description: "Speak with Conviction - Join LUCSA today",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const t = localStorage.getItem('lucsa-theme');
                if (t === 'dark' || (!t && matchMedia('(prefers-color-scheme:dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${openSans.variable} antialiased`}>
        <SessionProvider>
          <ThemeProvider>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
