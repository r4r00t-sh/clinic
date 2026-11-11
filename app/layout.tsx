import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { CookieNotice } from "@/components/layout/CookieNotice";
import { GTM, GTMNoscript } from "@/components/layout/GTM";
import { Providers } from "@/components/layout/Providers";
import { JsonLd } from "@/components/seo/JsonLd";
import { site, seo } from "@/lib/content/site";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: seo.home.title,
    template: `%s | ${site.name}`,
  },
  description: seo.home.description,
  metadataBase: new URL("https://www.ayurvediccentre.ae"),
  openGraph: {
    title: seo.home.title,
    description: seo.home.description,
    locale: "en_AE",
    type: "website",
    siteName: site.name,
  },
  verification: site.googleVerification
    ? { google: site.googleVerification }
    : undefined,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${dmSans.variable} h-full antialiased`}
    >
      <head>
        <JsonLd />
      </head>
      <body className="flex min-h-full flex-col bg-bg text-ink pb-mobile-bar">
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(new URLSearchParams(location.search).get("motion")==="off")document.documentElement.dataset.motion="off"}catch(e){}`,
          }}
        />
        <GTM />
        <GTMNoscript />
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppFab />
          <CookieNotice />
        </Providers>
      </body>
    </html>
  );
}
