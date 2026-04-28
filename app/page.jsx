"use client"

import { useState, useEffect, useCallback, Suspense } from "react"
import { motion, AnimatePresence } from "framer-motion"
import AboutUs from "@/components/AboutUs"
import BlogResources from "@/components/Blogs"
import DoctorTestimonial from "@/components/DoctoTestimonial"
import FAQComponent from "@/components/Faq"
import Footer from "@/components/Footer"
import Hero from "@/components/Hero"
import SmartPrescriptionSection from "@/components/Prescriptions"
import TravelClinic from "@/components/TravelClinic"
import VaccinationComponent from "@/components/Vaccination"
import WhyChooseUs from "@/components/WhyChooseUs"
import LoadingAnimation from "@/components/LoadingAnimation"
import { useAuth, useCart, useApp } from "@/src/contexts/index"
import { useSearchParams } from 'next/navigation'

function SearchParamHandler() {
  const searchParams = useSearchParams()
  const status = searchParams.get('status')

  useEffect(() => {
    if (status) {
      console.log("object", status)
    }
  }, [status])

  return null
}

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [heroLoaded, setHeroLoaded] = useState(false)
  const { user } = useAuth()
  const { cart } = useCart()
  const { addNotification } = useApp()

  // Handle loading completion when hero is ready
  useEffect(() => {
    if (heroLoaded) {
      const hasVisited = sessionStorage.getItem("hasVisited")
      if (!hasVisited) {
        sessionStorage.setItem("hasVisited", "true")
      }
      // Don't immediately set loading to false, let LoadingAnimation handle it
    }
  }, [heroLoaded])

  // Handle welcome notification
  useEffect(() => {
    if (user && !sessionStorage.getItem("welcomeNotificationShown")) {
      addNotification({
        title: "Welcome back!",
        message: `Good to see you again, ${user.name || "valued customer"}!`,
        type: "success"
      })
      sessionStorage.setItem("welcomeNotificationShown", "true")
    }
  }, [user, addNotification])

  // Callback functions for loading management
  const handleHeroLoaded = useCallback(() => {
    setHeroLoaded(true)
  }, [])

  const handleLoadingComplete = useCallback(() => {
    setLoading(false)
  }, [])

  return (
    <>
      {loading && <LoadingAnimation onComplete={handleLoadingComplete} heroLoaded={heroLoaded} />}

      <AnimatePresence>
        {!loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            <Suspense fallback={null}>
              <SearchParamHandler />
            </Suspense>

            <section id="home"><Hero onHeroLoaded={handleHeroLoaded} /></section>
            <section id="services"><SmartPrescriptionSection /></section>
            <WhyChooseUs />
            <section id="about"><AboutUs /></section>
            <section id="locations"><TravelClinic /></section>
            <DoctorTestimonial />
            <section id="vaccination"><VaccinationComponent /></section>
            <section id="faq"><FAQComponent /></section>
            {/* <section id="blogs"><BlogSection /></section> */}
            {/* <section id="blogs"><BlogResources /></section> */}
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}