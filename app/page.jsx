export const metadata = {
  title: "Bishop's Waltham Pharmacy | Trusted Healthcare Services",
  description: "Order medicines and access healthcare services at Bishop's Waltham Pharmacy with fast and reliable support.",
};

import { Suspense } from "react"
import { promises as fs } from "fs"
import path from "path"
import AboutUs from "@/components/AboutUs"
import DoctorTestimonial from "@/components/DoctoTestimonial"
import FAQComponent from "@/components/Faq"
import Footer from "@/components/Footer"
import SmartPrescriptionSection from "@/components/Prescriptions"
import TravelClinic from "@/components/TravelClinic"
import VaccinationComponent from "@/components/Vaccination"
import WhyChooseUs from "@/components/WhyChooseUs"
import HomeClient from "@/components/HomeClient"

async function getServices() {
  try {
    const filePath = path.join(process.cwd(), "public", "service.json")
    const fileContents = await fs.readFile(filePath, "utf8")
    return JSON.parse(fileContents)
  } catch (error) {
    console.error("Failed to fetch services:", error)
    return [
      {
        service: "Health Services",
        heading: "Your Health",
        subheading: "Professional healthcare services",
        imageUrl: "/api/placeholder/800/600",
      },
    ]
  }
}

export default async function Home() {
  const services = await getServices()
  const mainHeading = services[0]?.heading || "Bishop's Waltham Pharmacy - Your Trusted Local Healthcare Provider"

  return (
    <>
      {/* Server-rendered H1 for SEO - visually hidden but accessible to crawlers */}
      <h1 className="sr-only">{mainHeading}</h1>

      <Suspense fallback={null}>
        <HomeClient services={services} />
      </Suspense>

      <section id="services"><SmartPrescriptionSection /></section>
      <WhyChooseUs />
      <section id="about"><AboutUs /></section>
      <section id="locations"><TravelClinic /></section>
      <DoctorTestimonial />
      <section id="vaccination"><VaccinationComponent /></section>
      <section id="faq"><FAQComponent /></section>
      <Footer />
    </>
  )
}
