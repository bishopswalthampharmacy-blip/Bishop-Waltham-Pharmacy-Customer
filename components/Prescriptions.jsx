"use client";

import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const weightLossCards = [
  {
    title: "Travel Clinic & Vaccinations",
    subheading: "Comprehensive travel health services.",
    desc: "Planning a trip abroad? Our GPhC-registered pharmacists provide personalised travel health consultations including Yellow Fever, Typhoid, Hepatitis A & B, Meningitis ACWY, and antimalarial prescriptions. We follow the latest NaTHNaC guidelines. Same-week appointments available.",
    image: "/w2travelClinic.webp",
    link: "/travel-clinic",
  },
   {
    title: "Vaccination Clinic",
    subheading: "Trusted local vaccination services for all ages.",
    desc: "From seasonal flu jabs to private vaccinations not available on the NHS, our GPhC-registered pharmacists offer safe, professional vaccinations close to home. Catch up on missed doses or get advice on which vaccines are right for you.",
      image: "/assets/communityImg.jpg",
    link: "/vaccination-clinic",
  },
  {
    title: "Weight Loss Injections",
    subheading: "Clinically supported weight management solutions.",
    desc: "Achieve your weight loss goals with professional support at Bishops Waltham Pharmacy. Access clinically approved weight loss injections, personalised consultations, ongoing monitoring, and expert lifestyle guidance to help you achieve sustainable results.",
    image: "/vaccinating.webp",
    link: "/weight-loss-injections",
  },
  {
    title: "Ear Microsuction",
    subheading: "Safe and effective ear wax removal service.",
    desc: "Professional ear wax removal using microsuction at Bishops Waltham Pharmacy. Our trained healthcare professionals safely remove excess ear wax to help restore hearing, relieve discomfort, and improve ear health. Quick appointments available in a comfortable clinical setting.",
    image: "/earwaxi.webp",
    link: "/ear-microsuction",
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
};

// Reusable card button row
function CardButtons({ link }) {
  return (
    <div className="pt-2 mt-auto flex gap-2">
      <Link
        href={link}
        className="flex-1 bg-white text-black rounded-full px-1.5 py-1 flex items-center justify-center shadow hover:bg-gray-100 transition cursor-pointer whitespace-nowrap text-[11px] font-semibold"
      >
        Learn More
      </Link>
      <Link
        href="/booking?st=1"
        className="flex-1 bg-[#034F96] text-white rounded-full px-1.5 py-1 flex items-center justify-between px-3 shadow hover:bg-[#023d75] transition cursor-pointer whitespace-nowrap text-[11px] font-semibold"
      >
        <span>Book Now</span>
        <span className="bg-[#8DBBFF] p-0.5 rounded-full flex items-center justify-center ml-2">
          <ArrowRight size={10} className="text-white" />
        </span>
      </Link>
    </div>
  );
}

export default function WeightLossCards() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="bg-white py-12 px-4 sm:px-6 lg:px-20"
      ref={containerRef}
    >
      <motion.h2
        className="text-3xl sm:text-4xl md:text-5xl text-center mt-5 mb-5"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: -30 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <span className="text-[#5BB9EC]">Our Healthcare Services in </span>
        <span className="text-[#004488]">Bishops Waltham</span>
      </motion.h2>

      {/* Desktop grid */}
      <div className="hidden md:grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {weightLossCards.map((item, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className="group bg-[#F5F9FF] rounded-2xl p-2.5 shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 flex flex-col"
          >
            <Image
              src={item.image}
              alt={`${item.title} - Travel vaccination consultation at Bishops Waltham Pharmacy`}
              width={500}
              height={300}
              className="w-full h-36 object-cover rounded-lg mb-1.5"
            />
            <h3 className="text-xs font-semibold text-[#034F96] mb-0.5 line-clamp-2" title={item.title}>
              {item.title}
            </h3>
            <p className="text-xs text-gray-500 mb-1 line-clamp-1" title={item.subheading}>
              {item.subheading}
            </p>
            <p
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 5,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
              className="text-[12px] text-gray-600 mb-1 mt-1 text-justify"
              title={item.desc}
            >
              {item.desc}
            </p>
            <CardButtons link={item.link} />
          </motion.div>
        ))}
      </div>

      {/* Mobile: horizontal scroll — scrollbar hidden, peek card hints more content */}
      <div
        className="md:hidden -mx-4 px-4"
        style={{ overflowX: "auto", scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <style>{`.mobile-scroll::-webkit-scrollbar { display: none; }`}</style>
        <div className="mobile-scroll flex gap-4 pb-2" style={{ width: "max-content" }}>
          {weightLossCards.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              // Last card is slightly narrower so it peeks, hinting there's more to scroll
              className="group bg-[#F5F9FF] rounded-2xl p-2.5 shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 flex flex-col flex-shrink-0 w-[72vw]"
            >
              <Image
                src={item.image}
                alt={`${item.title} - Flu vaccination service at Bishops Waltham Pharmacy Hampshire`}
                width={500}
                height={300}
                className="w-full h-36 object-cover rounded-lg mb-1.5"
              />
              <h3 className="text-xs font-semibold text-[#034F96] mb-0.5 line-clamp-2" title={item.title}>
                {item.title}
              </h3>
              <p className="text-xs text-gray-500 mb-1 line-clamp-1" title={item.subheading}>
                {item.subheading}
              </p>
              <p
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 5,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
                className="text-[12px] text-gray-600 mb-1 mt-1 text-justify"
                title={item.desc}
              >
                {item.desc}
              </p>
              <CardButtons link={item.link} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Dot indicators for mobile */}
      <div className="md:hidden flex justify-center gap-1.5 mt-3">
        {weightLossCards.map((_, i) => (
          <span
            key={i}
            className={`block rounded-full transition-all ${i === 0 ? "w-4 h-1.5 bg-[#034F96]" : "w-1.5 h-1.5 bg-gray-300"}`}
          />
        ))}
      </div>
    </motion.div>
  );
}