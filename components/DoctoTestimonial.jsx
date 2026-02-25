"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { useRef, useState } from "react"
import { MapPin, Phone, Mail } from "lucide-react"
import Link from "next/link"

export default function DoctorTestimonial() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.15, margin: "-10% 0px -10% 0px" })
  const [isHovered, setIsHovered] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -20])
  const y2 = useTransform(scrollYProgress, [0, 0.5, 1], [80, 0, -30])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.8])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
        when: "beforeChildren",
        duration: 1,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.2,
      },
    },
  }

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 0.7,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  }

  const contactVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        delay: 0.6,
      },
    },
  }

  return (
    <div className="w-full py-10 px-2 sm:px-6 md:px-8 lg:px-10 flex justify-center items-center font-average">
      <motion.div
        ref={sectionRef}
        className="max-w-full w-full sm:w-[90%] md:w-[80%] bg-[#2D4356] rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg md:shadow-xl lg:shadow-2xl relative"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        style={{ opacity }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="p-3 sm:p-6 md:p-8 lg:p-10 flex flex-col lg:flex-row gap-6 relative z-10">
          {/* Left content */}
          <motion.div className="w-full lg:w-1/2 flex flex-col justify-center p-2 sm:p-4" style={{ y: y1 }}>
            <motion.p variants={textVariants} className="text-white/80 text-sm uppercase tracking-wide mb-1">
              Book a Consultation
            </motion.p>

            <motion.h2 variants={textVariants} className="text-white text-3xl sm:text-4xl md:text-5xl mb-3">
              The Best Pharmacy
              <br />
              in Bishop&apos;s Waltham
            </motion.h2>

            {/* Intro paragraph */}
            <motion.p
              variants={textVariants}
              className="text-white/80 text-sm mb-4 leading-relaxed max-w-xl"
            >
              At Bishop’s Waltham pharmacy we’re proud to serve our local community with
              trusted, high-quality healthcare services. Located on Bishop’s Waltham high
              street, our pharmacy has been a cornerstone of the neighbourhood for years
              supporting generations of families with their health and wellbeing.
            </motion.p>

            {/* Contact info block (moved outside p) */}
            <motion.div
              variants={textVariants}
              className="text-base text-white space-y-2 mb-4"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-white" />
                High St, Bishop&apos;s Waltham, Southampton SO32 1AB, United Kingdom
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-white" />
                <p className="font-medium">01489892599</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-white" />
                pharmacy.frn21@nhs.net
              </div>
            </motion.div>

            {/* Closing paragraph */}
            <motion.p
              variants={textVariants}
              className="text-white/80 text-sm mb-4 leading-relaxed max-w-xl"
            >
              We also offer a range of NHS and private services.
              <br />
              <br />
              Stop by and say hello – we look forward to welcoming you!
            </motion.p>

            {/* Button */}
            <motion.div variants={buttonVariants} whileHover="hover" className="mt-2">
              <Link href="/booking">
                <motion.button className="bg-white/20 hover:bg-white/30 text-white py-2.5 px-6 rounded-full text-sm transition-colors duration-300">
                  Book A Consultation Now
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right content - Doctor image */}
          <motion.div
            variants={imageVariants}
            style={{ y: y2 }}
            className="w-full lg:w-1/2 flex flex-col items-center justify-center relative mt-6 lg:mt-0"
          >
            <div className="text-white/20 text-center text-base sm:text-lg mb-2 lg:mb-4 lg:static lg:text-center lg:text-2xl">
              Experts at<br />Bishops Waltham Pharmacy
            </div>
            <div className="relative w-full mx-auto flex justify-center">
              <div className="relative w-full max-w-[360px] h-[240px] sm:max-w-[400px] sm:h-[270px] md:max-w-[440px] md:h-[300px] lg:max-w-[480px] lg:h-[330px] xl:max-w-[520px] xl:h-[360px] 2xl:max-w-[560px] 2xl:h-[390px]">
                <Image
                  src="/assets/doctestomonial.webp"
                  alt="Doctors at Bishop's Waltham Pharmacy"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 420px"
                  className="object-cover object-center rounded-xl"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Contact information footer */}
        <motion.div
          className="w-full lg:w-1/2 bg-white/10 text-white py-2 px-3 sm:px-6 text-xs sm:text-sm rounded-tr-lg backdrop-blur-sm"
          variants={contactVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              <p className="mr-2 text-white/70 whitespace-nowrap">Contact No.:</p>
              <p className="font-medium">01489892599</p>
            </div>
            <div className="flex items-center">
              <p className="mr-2 text-white/70 whitespace-nowrap">Email Id:</p>
              <p className="font-medium">pharmacy.frn21@nhs.net</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
