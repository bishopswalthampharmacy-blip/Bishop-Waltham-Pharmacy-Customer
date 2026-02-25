"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { useRef } from "react"
import { useRouter } from "next/navigation"
import { ArrowRightCircle } from "lucide-react"

export default function TravelClinic() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const router = useRouter()

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -30])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -20])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -30])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
        when: "beforeChildren",
      },
    },
  }

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
    },
  }

  const leftImageVariants = {
    hidden: { opacity: 0, x: -40, rotate: -5 },
    visible: {
      opacity: 1,
      x: 0,
      rotate: -3,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], opacity: { duration: 0.6 } },
    },
  }

  const centerCardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], opacity: { duration: 0.6 } },
    },
  }

  const rightImageVariants = {
    hidden: { opacity: 0, x: 40, rotate: 5 },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 3,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], opacity: { duration: 0.6 } },
    },
  }

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, transition: { type: "spring", stiffness: 400, damping: 10 } },
    tap: { scale: 0.98, transition: { type: "spring", stiffness: 500, damping: 10 } },
  }

  const decorElements = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.5, transition: { delay: 0.8, duration: 1.2 } },
  }

  return (
    <div
      ref={sectionRef}
      className="max-w-full w-full sm:w-[90%] md:w-[85%] mx-auto bg-white flex flex-col items-center justify-center py-8 sm:py-10 md:py-12 px-5 sm:px-6 md:px-10 lg:px-20 overflow-hidden relative font-average"
    >
      {/* Decorative background elements */}
      <motion.div
        className="absolute top-10 sm:top-20 left-4 sm:left-10 w-20 sm:w-32 h-20 sm:h-32 rounded-full bg-blue-50 blur-xl sm:blur-3xl opacity-0"
        variants={decorElements}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      />
      <motion.div
        className="absolute bottom-10 sm:bottom-20 right-4 sm:right-10 w-24 sm:w-40 h-24 sm:h-40 rounded-full bg-blue-50 blur-xl sm:blur-3xl opacity-0"
        variants={decorElements}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      />

      <motion.div
        className="text-center w-full max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.h3
          variants={textVariants}
          className="inline-block border border-[#F2F2F2] rounded-full px-6 py-2 mb-4 bg-white shadow-sm"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <p className="text-sm tracking-wide uppercase font-medium bg-gradient-to-r from-[#4A9CEE] via-[#5CB85C] to-[#8E44AD] text-transparent bg-clip-text">
            Travel Clinic
          </p>
        </motion.h3>

        <motion.h1 variants={textVariants} className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-1 sm:mb-2">
          <span className="text-[#5BB9EC]">Prepare Smart, Schedule</span>
        </motion.h1>

        <motion.h2
          variants={textVariants}
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#004488] mb-2 sm:mb-3 md:mb-4"
        >
          Your Travel Vaccinations Today
        </motion.h2>

        <motion.p
          variants={textVariants}
          className="text-md sm:text-md text-black max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-12 leading-relaxed px-1"
        >
          Planning a trip? Stay safe and healthy with our travel vaccination services. Get tailored advice, essential vaccines, and up-to-date health tips for your destination. Prepare smart schedule your travel health appointment now.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8 w-full">
          {/* Left Image */}
          <motion.div
            style={{ y: y1 }}
            variants={leftImageVariants}
            className="hidden md:block rounded-2xl sm:rounded-3xl overflow-hidden h-60 sm:h-72 md:h-80 relative md:top-8 lg:top-10 flex-shrink-0"
            whileHover={{ rotate: -4, scale: 1.03, transition: { duration: 0.3, ease: "easeOut" } }}
          >
            <Image
              src="/assets/travelclinic.webp"
              alt="Traveler looking at mountain view"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              priority
            />
          </motion.div>

          {/* Center Card */}
          <motion.div
            style={{ y: y2 }}
            variants={centerCardVariants}
            className="rounded-xl sm:rounded-2xl md:rounded-3xl shadow-md sm:shadow-lg md:shadow-xl z-10 flex flex-col justify-between border border-gray-100 bg-white p-5 sm:p-6 md:p-6 h-auto min-h-[12rem] sm:min-h-[14rem] md:h-64 lg:h-72"
            whileHover={{
              y: -5,
              boxShadow: "0 15px 30px -8px rgba(0, 0, 0, 0.15)",
              transition: { duration: 0.3, ease: "easeOut" },
            }}
          >
            <div className="text-left space-y-3 sm:space-y-4 flex-1 flex flex-col justify-center">
              <div className="space-y-1 sm:space-y-1">
                <p className="text-black font-semibold text-sm md:text-md">Travel Health Services</p>
                <p className="text-[#818183] font-semibold text-sm md:text-md">Comprehensive Care for</p>
                <p className="text-black font-semibold text-sm md:text-md">Your Journey</p>
              </div>
            </div>

            <div className="mt-6 sm:mt-auto">
              {/* Single Button with Redirect */}
              <motion.button
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                onClick={() => router.push("/booking")}
                className="w-full py-6 sm:py-7 md:py-8 bg-[#004488]  text-white cursor-pointer text-lg sm:text-xl font-bold shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-600/60 hover:from-[#004488] hover:to-[#5BB9EC] transition-all duration-300 rounded-tl-[0.75rem] sm:rounded-tl-[1rem] md:rounded-tl-[1.5rem] rounded-br-[0.75rem] sm:rounded-br-[1rem] md:rounded-br-[1.5rem]"
              >
                Book an Appointment <ArrowRightCircle className="inline-block w-5 h-5 ml-2 -mt-1" />
              </motion.button>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            style={{ y: y3 }}
            variants={rightImageVariants}
            className="hidden md:block rounded-2xl sm:rounded-3xl overflow-hidden h-60 sm:h-72 md:h-80 relative md:top-8 lg:top-10 flex-shrink-0"
            whileHover={{ rotate: 4, scale: 1.03, transition: { duration: 0.3, ease: "easeOut" } }}
          >
            <Image
              src="/assets/travelclinic2.webp"
              alt="Traveler taking photos in mountains"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              priority
            />
          </motion.div>
        </div>

        {/* Mobile Images - Significantly improved */}
        <div className="md:hidden grid grid-cols-2 gap-4 mt-8">
          <motion.div
            style={{ y: y1 }}
            variants={leftImageVariants}
            className="rounded-xl overflow-hidden aspect-[4/5] w-full relative flex-shrink-0"
          >
            <Image
              src="/assets/travelclinic.webp"
              alt="Traveler looking at mountain view"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
          <motion.div
            style={{ y: y3 }}
            variants={rightImageVariants}
            className="rounded-xl overflow-hidden aspect-[4/5] w-full relative flex-shrink-0"
          >
            <Image
              src="/assets/travelclinic2.webp"
              alt="Traveler taking photos in mountains"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
