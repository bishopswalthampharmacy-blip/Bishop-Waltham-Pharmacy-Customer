"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AboutUs from "@/components/AboutUs";
import BlogSection from "@/components/BlogSection";
import DoctorTestimonial from "@/components/DoctoTestimonial";
import FAQComponent from "@/components/Faq";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import SmartPrescriptionSection from "@/components/Prescriptions";
import TravelClinic from "@/components/TravelClinic";
import VaccinationComponent from "@/components/Vaccination";
import WhyChooseUs from "@/components/WhyChooseUs";
import LoadingAnimation from "@/components/LoadingAnimation";
import { useAuth, useCart, useApp } from "@/src/contexts/index";
import { useSearchParams } from "next/navigation";

function SearchParamHandler() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  useEffect(() => {
    if (status) {
      console.log("object", status);
    }
  }, [status]);

  return null;
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const { user } = useAuth();
  const { cart } = useCart();
  const { addNotification } = useApp();

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Bishop's Waltham Pharmacy",
    telephone: "+44 1489 892499",
    email: "pharmacy.frn21@nhs.net",
    address: {
      "@type": "PostalAddress",
      streetAddress: "10-12 High St",
      addressLocality: "Bishop's Waltham",
      addressRegion: "Hampshire",
      postalCode: "SO32 1AA",
      addressCountry: "UK",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 50.954602981609135,
      longitude: -1.2122092309991204,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:30",
      },
    ],
  };

  // Handle loading completion when hero is ready
  useEffect(() => {
    if (heroLoaded) {
      const hasVisited = sessionStorage.getItem("hasVisited");
      if (!hasVisited) {
        sessionStorage.setItem("hasVisited", "true");
      }
    }
  }, [heroLoaded]);

  // Handle welcome notification
  useEffect(() => {
    if (user && !sessionStorage.getItem("welcomeNotificationShown")) {
      addNotification({
        title: "Welcome back!",
        message: `Good to see you again, ${user.name || "valued customer"}!`,
        type: "success",
      });
      sessionStorage.setItem("welcomeNotificationShown", "true");
    }
  }, [user, addNotification]);

  // Callback functions for loading management
  const handleHeroLoaded = useCallback(() => {
    setHeroLoaded(true);
  }, []);

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />

      {loading && (
        <LoadingAnimation
          onComplete={handleLoadingComplete}
          heroLoaded={heroLoaded}
        />
      )}

      <AnimatePresence>
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Suspense fallback={null}>
              <SearchParamHandler />
            </Suspense>

            <section id="home">
              <Hero onHeroLoaded={handleHeroLoaded} />
            </section>
            <section id="services">
              <SmartPrescriptionSection />
            </section>
            <WhyChooseUs />
            <section id="about">
              <AboutUs />
            </section>
            <section id="blog">
              <BlogSection />
            </section>
            <section id="locations">
              <TravelClinic />
            </section>
            <DoctorTestimonial />
            <section id="vaccination">
              <VaccinationComponent />
            </section>
            <section id="faq">
              <FAQComponent />
            </section>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
