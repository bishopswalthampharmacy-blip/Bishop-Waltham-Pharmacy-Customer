import {
  Instrument_Sans,
  Average_Sans,
  Plus_Jakarta_Sans,
} from "next/font/google";
import Header from "@/components/Header";
import ChatbotWidget from "@/components/ChatbotWidget";
import Canonical from "@/components/Canonical";
import "./globals.css";
import { AuthProvider } from "@/src/contexts/AuthContext";
import { CartProvider } from "@/src/contexts/CartContext";
import { AppProvider } from "@/src/contexts/AppContext";

// Load fonts
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
});

const averageSans = Average_Sans({
  subsets: ["latin"],
  weight: ["400"], // Check available weights
  variable: "--font-average",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plusjakarta",
});

export const metadata = {
  title:
    "Bishops Waltham Pharmacy – Travel Clinic, Vaccinations & Healthcare Services",
  description:
    "Bishops Waltham Pharmacy offers professional healthcare services including travel clinic vaccinations, ear wax removal, weight loss injections, and health consultations. Visit our pharmacy in Bishop's Waltham today.",
  keywords: [
    "pharmacy",
    "travel clinic",
    "vaccinations",
    "ear wax removal",
    "weight loss injections",
    "Bishop's Waltham",
  ],
  authors: [{ name: "Bishops Waltham Pharmacy" }],
  viewport: "width=device-width, initial-scale=1",
  verification: {
    google: "N5qS3a-TougGoHsPOCr5PYxaQ5sI-JJm592dXQVOC3A",
  },
  openGraph: {
    title: "Bishops Waltham Pharmacy – Travel Clinic & Healthcare Services",
    description:
      "Professional pharmacy services in Bishop's Waltham including vaccinations, travel health, and healthcare consultations.",
    url: "https://bishopswalthampharmacy.co.uk",
    siteName: "Bishops Waltham Pharmacy",
    type: "website",
  },
  robots: "index, follow",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`!scroll-smooth ${instrumentSans.variable} ${averageSans.variable} ${plusJakarta.variable}`}
    >
      <body suppressHydrationWarning={true}>
        <Canonical />
        <AppProvider>
          <AuthProvider>
            <CartProvider>
              <Header />
              {/* Server-rendered H1 for SEO */}
              <h1 className="sr-only">
                Bishops Waltham Pharmacy - Professional Healthcare Services,
                Travel Clinic & Vaccinations
              </h1>
              {children}
              <ChatbotWidget />
            </CartProvider>
          </AuthProvider>
        </AppProvider>
      </body>
    </html>
  );
}
