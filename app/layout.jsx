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
  metadataBase: new URL("https://bishopswalthampharmacy.co.uk"),

  title: {
    default: "Bishops Waltham Pharmacy | Travel Clinic & Healthcare",
    template: "%s | Bishops Waltham Pharmacy",
  },

  description:
    "Your local pharmacy in Bishops Waltham offering travel vaccinations, Pharmacy First, flu jabs and NHS prescriptions.",

  authors: [{ name: "Bishops Waltham Pharmacy" }],

  formatDetection: {
    email: false,
    telephone: false,
  },

  verification: {
    google: "N5qS3a-TougGoHsPOCr5PYxaQ5sI-JJm592dXQVOC3A",
  },

  alternates: {
    canonical: "https://bishopswalthampharmacy.co.uk/",
  },

  openGraph: {
    title:
      "Bishops Waltham Pharmacy | Travel Clinic & Vaccinations",

    description:
      "Expert travel vaccinations, Pharmacy First, flu jabs and NHS prescriptions in Bishops Waltham, Hampshire.",

    url: "https://bishopswalthampharmacy.co.uk/",

    siteName: "Bishops Waltham Pharmacy",

    locale: "en_GB",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1a56db",
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
