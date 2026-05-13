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
    title: "NHS Pharmacy First Service",
    subheading: "No need to wait weeks for a GP appointment.",
    desc: "Under the NHS Pharmacy First scheme, our trained pharmacists can assess and treat 7 common conditions — including ear infections, sore throat, sinusitis, UTIs, impetigo, infected insect bites and shingles — at no cost to NHS patients. Just walk in.",
    image: "/assets/communityImg.jpg",
    link: "/pharmacy-first",
  },
  {
    title: "Flu Jab & Seasonal Vaccinations",
    subheading: "Evidence-based vaccinations for all ages.",
    desc: "Protect yourself and your family with our annual flu vaccination service. Available to eligible NHS patients and as a private service. We also offer blood pressure checks, Covid-19 boosters and other seasonal health services — all under one roof at our High Street location.",
    image: "/vaccinating.webp",
    link: "/flu-jab",
  },
  {
    title: "NHS & Private Prescriptions",
    subheading: "Get NHS and private prescriptions quickly.",
    desc: "We dispense NHS and private prescriptions quickly and accurately. We accept the Electronic Prescription Service (EPS) — your GP sends your prescription directly to us. Prescription collection from local GP practices available. New Medicine Service (NMS) for patients starting new medications.",
    image: "/earwaxi.webp",
    link: "/prescriptions",
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

const textVariants = {
  hidden: { opacity: 0, y: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

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

      <div className="hidden md:grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {weightLossCards.map((item, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className="group bg-[#F5F9FF] rounded-2xl p-3 shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 h-[400px] flex flex-col"
          >
            <Image
              src={item.image}
              alt={`${item.title} -  Travel vaccination consultation at Bishops Waltham Pharmacy`}
              width={500}
              height={300}
              className="w-full h-40 object-cover rounded-xl mb-2"
            />
            <h3
              className="text-sm font-semibold text-[#034F96] mb-1 line-clamp-1"
              title={item.title}
            >
              {item.title}
            </h3>
            <p
              className="text-xs text-gray-500 mb-2 line-clamp-1"
              title={item.subheading}
            >
              {item.subheading}
            </p>
            <p
              className="text-[13px] text-gray-600 mb-2 mt-2 flex-1 text-justify"
              title={item.desc}
            >
              {item.desc}
            </p>

            <div className="flex items-center justify-between mt-auto gap-1">
              <Link
                href={item.link}
                className="bg-white text-black rounded-full px-2 py-1.5 flex items-center shadow hover:bg-gray-100 transition w-fit cursor-pointer whitespace-nowrap"
              >
                <span className="pl-1 pr-2 text-xs font-semibold">Learn More</span>
              </Link>

              <Link
                href={{
                  pathname: "/booking",
                  query: { st: "1", service: item.title },
                }}
                as={`/booking?st=1&service=${encodeURIComponent(item.title)}`}
                className="bg-white text-black rounded-full px-2 py-1.5 flex items-center shadow hover:bg-gray-100 transition w-fit cursor-pointer whitespace-nowrap"
              >
                <span className="pl-1 pr-2 text-xs font-semibold">
                  Book an Appointment
                </span>
                <span className="bg-[#8DBBFF] p-1 rounded-full flex items-center justify-center ml-1">
                  <ArrowRight size={12} className="text-white" />
                </span>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4">
        <div className="flex gap-4 w-max">
          {weightLossCards.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group bg-[#F5F9FF] rounded-2xl p-3 shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 h-[400px] flex flex-col flex-shrink-0 w-72"
            >
              <Image
                src={item.image}
                alt={`${item.title} -  Flu vaccination service at Bishops Waltham Pharmacy Hampshire`}
                width={500}
                height={300}
                className="w-full h-40 object-cover rounded-xl mb-2"
              />
              <h3
                className="text-sm font-semibold text-[#034F96] mb-1 line-clamp-1"
                title={item.title}
              >
                {item.title}
              </h3>
              <p
                className="text-xs text-gray-500 mb-2 line-clamp-1"
                title={item.subheading}
              >
                {item.subheading}
              </p>
              <p
                className="text-[13px] text-gray-600 mb-2 mt-2 flex-1 text-justify"
                title={item.desc}
              >
                {item.desc}
              </p>

              <div className="flex items-center justify-between mt-auto gap-1">
                <Link
                  href={item.link}
                  className="bg-white text-black rounded-full px-2 py-1.5 flex items-center shadow hover:bg-gray-100 transition w-fit cursor-pointer whitespace-nowrap"
                >
                  <span className="pl-1 pr-2 text-xs font-semibold">Learn More</span>
                </Link>

                <Link
                  href={{
                    pathname: "/booking",
                    query: { st: "1", service: item.title },
                  }}
                  as={`/booking?st=1&service=${encodeURIComponent(item.title)}`}
                  className="bg-white text-black rounded-full px-2 py-1.5 flex items-center shadow hover:bg-gray-100 transition w-fit cursor-pointer whitespace-nowrap"
                >
                  <span className="pl-1 pr-2 text-xs font-semibold">
                    Book an Appointment
                  </span>
                  <span className="bg-[#8DBBFF] p-1 rounded-full flex items-center justify-center ml-1">
                    <ArrowRight size={12} className="text-white" />
                  </span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
