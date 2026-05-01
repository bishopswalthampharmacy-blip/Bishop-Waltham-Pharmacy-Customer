"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Hero = ({ onHeroLoaded }) => {
  const [index, setIndex] = useState(0);
  const [services, setServices] = useState([]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [heroReady, setHeroReady] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/service.json");
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Failed to fetch services:", error);
        setServices([
          {
            service: "Health Services",
            heading: "Your Health",
            subheading: "Professional healthcare services",
            imageUrl: "/api/placeholder/800/600",
          },
        ]);
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    if (services.length > 0 && !heroReady) {
      const fallbackTimer = setTimeout(() => {
        if (!heroReady) {
          setHeroReady(true);
        }
      }, 1500);

      if (imageLoaded) {
        clearTimeout(fallbackTimer);
        setHeroReady(true);
      }
      return () => clearTimeout(fallbackTimer);
    }
  }, [services, imageLoaded, heroReady]);

  useEffect(() => {
    if (heroReady && onHeroLoaded && services.length > 0) {
      const timer = setTimeout(() => {
        onHeroLoaded();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [heroReady, onHeroLoaded, services]);

  useEffect(() => {
    if (services.length > 1) {
      const interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % services.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [services.length]);

  if (!services.length) return null;

  const current = services[index];

  return (
    <div className="w-full flex justify-center items-center py-2 md:py-5 font-average">
      <div
        className="relative w-[95%] md:w-[97%] rounded-xl md:rounded-3xl overflow-hidden border border-gray-200 shadow-md bg-black"
        style={{ height: "90vh", minHeight: "700px", maxHeight: "1000px" }}
      >
        {/* Background Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 z-0"
          >
            <Image
              src={current.imageUrl}
              alt="Welcome to Bishop's Waltham Pharmacy - Your trusted local pharmacy for travel vaccines, health services, and expert medical advice"
              fill
              className="object-cover object-bottom"
              priority
              onLoad={() => {
                setImageLoaded(true);
              }}
              onError={() => {
                console.log("Hero image failed to load, proceeding anyway");
                setImageLoaded(true); // Still mark as loaded to prevent blocking
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/70 to-black/40 z-10" />
          </motion.div>
        </AnimatePresence>

        {/* Overlay Content */}
        <div className="relative z-20 w-full h-full flex flex-col md:flex-row justify-center md:justify-between px-4 md:px-10 py-6 md:py-10 text-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="flex flex-col justify-end max-w-xl space-y-3 md:space-y-5 pb-4 md:pb-6"
            >
              <div className="flex justify-between items-center bg-white text-black rounded-lg w-[180px] md:w-[225px] p-1 shadow-md">
                <div className="px-3 md:px-4 py-1 md:py-2">
                  <p className="text-xs font-semibold text-[#434242] leading-tight">
                    Patients Treated
                  </p>
                  <p className="text-xs font-semibold text-[#434242] leading-tight">
                    Till Date
                  </p>
                </div>
                <div className="bg-[#F4A300] px-3 md:px-4 py-1 md:py-2 rounded-md flex flex-col justify-center items-center">
                  <span className="text-xl md:text-2xl font-bold leading-none">
                    10K +
                  </span>
                  {/* <span className="text-xs font-semibold"></span> */}
                </div>
              </div>

              <h2 className="text-4xl sm:text-5xl md:text-6xl leading-tight font-average">
                {current.heading}
                <br />
              </h2>

              <p className="text-sm md:text-base text-gray-100 font-light max-w-md font-average">
                {current.subheading}
              </p>

              <div>
                <Link
                  href={{
                    pathname: "/booking",
                    query: { st: "1", service: current.service },
                  }}
                  as={`/booking?st=1&service=${encodeURIComponent(
                    current.service
                  )}`}
                  className="bg-white text-black rounded-full px-3 py-2 flex items-center shadow hover:bg-gray-100 transition w-fit cursor-pointer"
                >
                  <span className="pl-3 pr-4 text-sm font-semibold">
                    Book An Appointment
                  </span>
                  <span className="bg-[#8DBBFF] p-1.5 rounded-full flex items-center justify-center">
                    <ArrowRight size={14} className="text-white" />
                  </span>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Right Labels */}
          <div className="hidden md:flex flex-col justify-center gap-4 text-right">
            {services.map((labelItem, i) => {
              const isActive = i === index;
              return (
                <motion.button
                  key={`service-${i}-${labelItem.service}`}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 50, opacity: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.15 }}
                  className="flex items-center justify-end gap-3 bg-transparent border-0 outline-none cursor-pointer focus:outline-none"
                  style={{ background: "none", padding: 0 }}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to service ${labelItem.service}`}
                  tabIndex={0}
                >
                  <motion.span
                    animate={{
                      scale: isActive ? 1.15 : 1,
                      opacity: isActive ? 1 : 0.6,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`text-lg ${isActive
                        ? "font-semibold text-white"
                        : "font-normal text-white/60"
                      }`}
                  >
                    {labelItem.service}
                  </motion.span>
                  <div className="h-0.5 bg-white w-16"></div>
                </motion.button>
              );
            })}
          </div>

          {/* Mobile Indicators */}
          <div className="flex justify-center items-center md:hidden absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="flex justify-center gap-2 mt-4">
              {services.map((_, i) => (
                <button
                  key={`indicator-${i}`}
                  onClick={() => setIndex(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${i === index ? "bg-white" : "bg-white/50"
                    }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
