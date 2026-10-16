import type { Metadata, Viewport } from "next";
import { Sora, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { business } from "@/content/business";
import { media } from "@/content/media";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import MobileActionBar from "@/components/MobileActionBar";
import SmoothScroll from "@/components/SmoothScroll";
import { BookingProvider } from "@/components/BookingContext";
import StructuredData from "@/components/StructuredData";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  title: {
    default: `${business.name} — Car Detailing, Ceramic Coating & PPF`,
    template: `%s | ${business.name}`,
  },
  description: business.description,
  openGraph: {
    type: "website",
    siteName: business.name,
    title: `${business.name} — Beyond Clean. Into Perfection.`,
    description: business.description,
    images: [{ url: `${media.heroCoupe.src}?auto=format&fit=crop&w=1200&h=630&q=75`, width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#08090B",
  colorScheme: "dark",
};

// Runs before paint: enables JS-only animation states and shows the intro once per session.
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{if(sessionStorage.getItem('od-intro')){d.classList.add('skip-loader')}else{sessionStorage.setItem('od-intro','1')}}catch(e){d.classList.add('skip-loader')}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sora.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <Loader />
        <BookingProvider>
          <SmoothScroll />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <MobileActionBar />
        </BookingProvider>
        <StructuredData />
      </body>
    </html>
  );
}
