"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform, useInView, useSpring } from "framer-motion"
import Image from "next/image"
import { ChevronRight } from "lucide-react"

const whyChooseContent = [
  {
    title: "Locally Owned & Community-Focused",
    desc: "Bishops Waltham Pharmacy offers fast, friendly service for your everyday health needs.",
    features: [
      "Prescription Fulfilment: Quick and efficient dispensing of your medications.",
      "Minor Ailment Treatments: Advice and remedies for common health issues.",
      "NHS & Private Vaccinations: Get your annual NHS flu jab conveniently, alongside NHS and private COVID-19 and flu vaccinations."
    ],
    image: "/assets/communityImg.jpg",
  },
  {
    title: "Simplify Your Healthcare at Bishops Waltham's Pharmacy",
    desc: "At Bishops Waltham Pharmacy, we make your healthcare simpler and more convenient. You'll benefit from.",
    features: [
      "Faster access to NHS services.",
      "Expert healthcare support right when you need it.",
      "The ease of managing all your prescriptions in one place.",
      "From travel advice to private treatments, we're dedicated to making your healthcare experience as seamless as possible."
    ],
    image: "/assets/whychoseus8.avif",
  },
  {
    title: "Expert Care You Can Trust",
    desc: "Our team is dedicated to providing professional healthcare with a personal touch because you're not just a customer, you're our neighbour.",
    features: [
      "Qualified, experienced pharmacists",
      "Support managing long-term conditions",
      "Trusted health partner for your family",
      "Personalized medication consultations"
    ],
    image: "/assets/expertCare.jpg",
  },
]

export default function WhyChooseUs() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState(1)
  const [isLoaded, setIsLoaded] = useState(false)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.1 })

  // Initialize component after mount to prevent initial lag
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Smoother scroll-based animations with reduced workload
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const springConfig = { stiffness: 50, damping: 20, restDelta: 0.001 }
  const smoothProgress = useSpring(scrollYProgress, springConfig)

  const titleY = useTransform(smoothProgress, [0, 0.5], [50, 0])
  const titleOpacity = useTransform(smoothProgress, [0, 0.5], [0, 1])
  const imageScale = useTransform(smoothProgress, [0.1, 0.6], [0.9, 1])
  const contentX = useTransform(smoothProgress, [0.2, 0.7], [50, 0])
  const contentOpacity = useTransform(smoothProgress, [0.2, 0.7], [0, 1])

  // Ultra-smooth slide transition variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: {
          type: "tween",
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94]
        },
        opacity: { duration: 0.5, ease: "easeOut" },
        scale: { duration: 0.5, ease: "easeOut" },
      },
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { duration: 0.5, ease: "easeIn" },
        opacity: { duration: 0.4, ease: "easeIn" },
        scale: { duration: 0.4, ease: "easeIn" },
      },
    }),
  }

  // Simplified content animations
  const contentVariants = {
    enter: {
      opacity: 0,
      y: 20,
    },
    center: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.4,
        ease: "easeIn",
      },
    },
  }

  // Lighter feature animations
  const featureVariants = {
    hidden: { opacity: 0, x: -5 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1 + i * 0.05,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  }

  // Smoother auto-slide with performance optimization
  useEffect(() => {
    if (!isLoaded) return

    const interval = setInterval(() => {
      if (!isAnimating) {
        setIsAnimating(true)
        setDirection(1)

        setTimeout(() => {
          setCurrentSlide((prev) => (prev + 1) % whyChooseContent.length)
          setIsAnimating(false)
        }, 500)
      }
    }, 7000)

    return () => clearInterval(interval)
  }, [currentSlide, isAnimating, isLoaded])

  const handleDotClick = (index) => {
    if (currentSlide !== index && !isAnimating && isLoaded) {
      setDirection(index > currentSlide ? 1 : -1)
      setIsAnimating(true)

      setCurrentSlide(index)
      setTimeout(() => {
        setIsAnimating(false)
      }, 500)
    }
  }

  // Reduced particle effects for better performance
  const particles = [
    { y: [0, -15, 0], x: [0, 10, 0], scale: 1.2, duration: 4, className: "top-1/4 left-1/4 w-6 h-6 bg-blue-200/20" },
    { y: [0, 20, 0], x: [0, -15, 0], scale: 0.8, duration: 5, className: "bottom-1/3 right-1/4 w-4 h-4 bg-purple-200/20" },
  ]

  if (!isLoaded) {
    return (
      <div
        ref={containerRef}
        className="w-full flex justify-center items-center bg-white font-average overflow-hidden min-h-[600px]"
      >
        <div className="relative max-w-full w-[90%] rounded-3xl">
          <div className="px-6 sm:px-8 lg:px-12 py-10">
            {/* Simple skeleton loader */}
            <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="h-[350px] sm:h-[450px] md:h-[500px] bg-gray-100 rounded-2xl animate-pulse"></div>
              <div className="space-y-6">
                <div className="h-8 bg-gray-100 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-100 rounded animate-pulse"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-100 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-100 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-100 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="w-full flex justify-center items-center bg-white font-average overflow-hidden"
      ref={containerRef}
    >
      <div className="relative max-w-full w-[90%] rounded-3xl">
        <div className="px-6 sm:px-8 lg:px-12 py-10">
          <motion.div className="text-center mb-12 lg:mb-16" style={{ y: titleY, opacity: titleOpacity }}>
            <motion.div
              className="inline-block border border-[#F2F2F2] rounded-full px-6 py-2 mb-4 bg-white shadow-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            >
              <p className="text-xs tracking-wide uppercase font-medium font-average bg-gradient-to-r from-[#3498db] via-[#9B59B6] to-[#E74C3C] text-transparent bg-clip-text">
                Why Choose Us
              </p>
            </motion.div>

            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            >
              <span className="text-[#5BB9EC]">Why Bishops Pharmacy </span>
              <span className="text-[#004488]"> Stands Out?</span>
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Image section */}
            <motion.div
              className="flex flex-col order-1 md:order-none"
              style={{ scale: imageScale }}
            >
              <div className="relative overflow-hidden rounded-2xl w-full h-[350px] sm:h-[450px] md:h-[500px] mx-auto shadow-lg">
                <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-purple-50">
                  <AnimatePresence mode="wait" custom={direction} initial={false}>
                    <motion.div
                      key={`image-${currentSlide}`}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="absolute inset-0 w-full h-full"
                    >
                      <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/10 to-purple-100/10 rounded-2xl" />
                      <Image
                        src={whyChooseContent[currentSlide].image || "/placeholder.svg"}
                        alt={whyChooseContent[currentSlide].title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-contain object-center p-4 rounded-2xl"
                        priority={currentSlide === 0}
                      />

                      {/* Minimal particles for performance */}
                      {particles.map((particle, index) => (
                        <motion.div
                          key={index}
                          className={`absolute rounded-full ${particle.className}`}
                          animate={{
                            y: particle.y,
                            x: particle.x,
                            scale: [1, particle.scale, 1],
                            opacity: [0.2, 0.5, 0.2],
                          }}
                          transition={{
                            duration: particle.duration,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Simplified dot navigation */}
              <div className="flex justify-center mt-6">
                <div className="flex items-center space-x-3">
                  {whyChooseContent.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleDotClick(index)}
                      className={`relative h-3 w-3 rounded-full transition-all duration-300 ${currentSlide === index
                        ? "bg-cyan-500 scale-125"
                        : currentSlide > index
                          ? "bg-cyan-400"
                          : "bg-gray-300"
                        }`}
                      aria-label={`Go to slide ${index + 1}`}
                    >
                      {currentSlide === index && (
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-cyan-500"
                          layoutId="activeDot"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Text content section */}
            <div className="flex flex-col">
              <motion.div
                className="flex flex-col justify-center relative"
                style={{ x: contentX, opacity: contentOpacity }}
              >
                <AnimatePresence mode="wait" custom={direction} initial={false}>
                  <motion.div
                    key={`content-${currentSlide}`}
                    custom={direction}
                    variants={contentVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="space-y-6 md:space-y-7"
                  >
                    <motion.h3
                      className="text-2xl md:text-3xl font-semibold text-gray-800 leading-tight"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                    >
                      {whyChooseContent[currentSlide].title}
                    </motion.h3>

                    <motion.p
                      className="text-gray-600 text-base md:text-lg leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                    >
                      {whyChooseContent[currentSlide].desc}
                    </motion.p>

                    <motion.ul className="space-y-3 md:space-y-3 mt-4">
                      {whyChooseContent[currentSlide].features.map((feature, index) => (
                        <motion.li
                          key={index}
                          custom={index}
                          variants={featureVariants}
                          initial="hidden"
                          animate="visible"
                          className="flex items-start gap-3"
                        >
                          <motion.span
                            className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 mt-2 flex-shrink-0"
                            animate={{
                              scale: [1, 1.2, 1],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                              delay: index * 0.3,
                              ease: "easeInOut",
                            }}
                          />
                          <span className="text-gray-700 text-base md:text-lg leading-relaxed">{feature}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* <motion.button
                className="flex items-center mt-6 text-sm md:text-base font-medium text-black border border-gray-300 rounded-full px-6 py-2.5 transition-all hover:border-gray-400 overflow-hidden group cursor-pointer w-fit"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                whileHover={{
                  scale: 1.02,
                  y: -1,
                  boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)"
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const blogsSection = document.getElementById('blogs');
                  if (blogsSection) {
                    blogsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <span className="pr-3 relative z-10">See How it Works</span>
                <span className="bg-[#8DBBFF] p-1.5 rounded-full flex items-center justify-center relative z-10">
                  <ChevronRight size={14} className="text-white" />
                </span>
              </motion.button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}