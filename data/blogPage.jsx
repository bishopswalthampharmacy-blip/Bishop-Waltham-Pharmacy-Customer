"use client";

import { motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import { Plane, Globe, Hospital, Shield } from "lucide-react";

export default function TravelClinicPage() {
  return (
    <>
      {/* SEO Meta */}
      <Head>
        <title>Travel Clinic & Vaccinations | Bishops Waltham Pharmacy</title>
        <meta
          name="description"
          content="Stay safe while travelling abroad with Bishops Waltham Pharmacy. NHS and private travel vaccines, malaria prevention, and expert travel health advice."
        />
        <meta
          name="keywords"
          content="Travel Clinic Bishops Waltham, NHS travel vaccines UK, malaria tablets, yellow fever vaccination, travel health advice Hampshire"
        />
      </Head>

      {/* Hero */}
      <section
        className="relative bg-[url('/assets/book.jpg')] bg-center bg-cover bg-no-repeat text-white py-20 text-center font-sans"
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto px-6"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Travel Health Clinic
          </h1>
          <p className="text-sm md:text-base font-light leading-relaxed">
            NHS and private travel vaccinations, malaria prevention and expert advice
            to keep you healthy on your journey abroad.
          </p>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-12 font-sans text-gray-800 leading-relaxed">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-semibold text-[#034F96] mb-4">
              About Our Travel Clinic
            </h2>
            <p className="text-sm">
              At Bishops Waltham Pharmacy, we offer a comprehensive NHS and private travel
              health service. Our qualified team will assess your travel plans, provide
              tailored advice, and administer the vaccines you need. Whether it’s a family
              holiday, business trip or adventure travel – we’re here to help you travel safe.
            </p>
          </div>
          <div className="relative h-64 w-full rounded-lg overflow-hidden shadow-md">
            <Image
              src="/assets/booknow.webp"
              alt="Professional travel health consultation with experienced pharmacist at Bishop's Waltham Pharmacy travel clinic"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>




      {/* Malaria */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-12 font-sans">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative h-64 w-full rounded-lg overflow-hidden shadow-md">
            <Image src="/assets/bbh.jpg" alt="Malaria prevention medication and antimalarial tablets available at Bishop's Waltham Pharmacy travel clinic" fill className="object-cover" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-[#034F96] mb-4">Malaria Prevention</h2>
            <p className="text-sm mb-3">
              Malaria is a serious illness spread by mosquitoes in many parts of the world.
              Our pharmacists provide antimalarial medication (Atovaquone-Proguanil, Doxycycline,
              Mefloquine) and expert prevention advice.
            </p>
            <blockquote className="border-l-4 border-[#034F96] pl-4 italic text-sm">
              NHS Fit for Travel recommends starting malaria tablets before departure to ensure
              you don’t suffer side effects while abroad.
            </blockquote>
          </div>
        </div>
      </section>



      {/* Health Tips Section (Full Width NHS Style Table) */}
      <section className="w-full bg-white py-20 font-sans">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <h2 className="text-3xl font-semibold text-[#034F96] mb-10 text-center">
            Travel Health Advice
          </h2>

          <div className="overflow-x-auto shadow-lg rounded-2xl">
            <table className="w-full text-sm text-left border border-gray-200">
              <thead className=" bg-[#3770a5]  text-white">
                <tr>
                  <th className="px-6 py-4 w-1/4 font-semibold text-sm uppercase tracking-wide">
                    Stage
                  </th>
                  <th className="px-6 py-4 font-semibold text-sm uppercase tracking-wide">
                    Key Recommendations
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {/* Before Travel */}
                <tr className="hover:bg-[#EAF4FF] transition">
                  <td className="px-6 py-6 font-medium text-[#034F96] text-base flex items-center gap-2">
                    <Plane size={20} /> Before You Travel
                  </td>
                  <td className="px-6 py-6 leading-relaxed">
                    Book vaccinations <span className="font-semibold">6–8 weeks before departure</span>,
                    check <a href="https://www.fitfortravel.nhs.uk" target="_blank" className="text-[#5BB9EC] underline">NHS Fit for Travel</a>,
                    review destination-specific risks, arrange travel insurance with medical cover,
                    and pack medicines in original packaging.
                  </td>
                </tr>

                {/* While Abroad */}
                <tr className="bg-gray-50 hover:bg-[#EAF4FF] transition">
                  <td className="px-6 py-6 font-medium text-[#034F96] text-base flex items-center gap-2">
                    <Globe size={20} /> While Abroad
                  </td>
                  <td className="px-6 py-6 leading-relaxed">
                    Drink only <span className="font-semibold">bottled, boiled, or filtered water</span>,
                    eat freshly cooked food, carry a personal first aid kit,
                    use DEET-based repellents, and sleep under mosquito nets in malaria-risk areas.
                  </td>
                </tr>

                {/* Returning Home */}
                <tr className="hover:bg-[#EAF4FF] transition">
                  <td className="px-6 py-6 font-medium text-[#034F96] text-base flex items-center gap-2">
                    <Hospital size={20} /> Returning Home
                  </td>
                  <td className="px-6 py-6 leading-relaxed">
                    Watch for fever, diarrhoea, or unusual symptoms.
                    Seek urgent medical advice if unwell within <span className="font-semibold">3 weeks</span> of travel,
                    and inform your GP about your destinations.
                    Continue malaria tablets for the recommended period after return.
                  </td>
                </tr>

                {/* General Safety */}
                <tr className="bg-gray-50 hover:bg-[#EAF4FF] transition">
                  <td className="px-6 py-6 font-medium text-[#034F96] text-base flex items-center gap-2">
                    <Shield size={20} /> General Safety
                  </td>
                  <td className="px-6 py-6 leading-relaxed">
                    Keep photocopies of passports and documents,
                    use SPF 30+ sun protection, stay hydrated in hot climates,
                    avoid animal contact to reduce rabies risk,
                    and note local emergency numbers and hospitals.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>


      {/* Vaccination Cards */}
      <section className="bg-gray-50 py-12 font-sans">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <h2 className="text-2xl font-semibold text-[#034F96] mb-6 text-center">
            Travel Vaccinations We Provide
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white shadow-sm rounded-xl p-4 text-base">
              <div className="relative h-48 w-full mb-3 rounded-lg overflow-hidden">
                <Image src="/assets/heroimage1.webp" alt="Private travel vaccination service with professional healthcare staff at Bishop's Waltham Pharmacy" fill className="object-cover" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-xl mb-2 text-[#034F96]">Private Vaccines</h3>
                <ul className="list-disc list-outside pl-4 text-gray-700 text-base space-y-1 text-left">
                  <li>Yellow Fever</li>
                  <li>Rabies</li>
                  <li>Japanese Encephalitis</li>
                </ul>
              </div>
            </div>

            <div className="bg-white shadow-sm rounded-xl p-4 text-base">
              <div className="relative h-48 w-full mb-3 rounded-lg overflow-hidden">
                <Image src="/vaccinating.webp" alt="Specialist travel vaccines and immunizations administered by qualified healthcare professionals" fill className="object-cover" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-xl mb-2 text-[#034F96]">Specialist Vaccines</h3>
                <ul className="list-disc list-outside pl-4 text-gray-700 text-base space-y-1 text-left">
                  <li>Meningitis ACWY</li>
                  <li>Cholera</li>
                  <li>Japanese Encephalitis</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Checklist */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-12 font-sans">
        <h2 className="text-2xl font-semibold text-[#034F96] mb-4">
          What to Bring to Your Appointment
        </h2>
        <div className="bg-[#EAF4FF] p-6 rounded-lg border-l-4 border-[#034F96] text-sm">
          <ul className="list-disc list-inside">
            <li>Your full travel itinerary (destinations & dates)</li>
            <li>Previous vaccination records</li>
            <li>Medical history & prescriptions</li>
            <li>Details of any allergies</li>
            <li>Pregnancy/breastfeeding information (if relevant)</li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section
        className="relative bg-[url('/assets/foot.jpg')] bg-center bg-cover bg-no-repeat text-white py-20 text-center font-sans"
      >
        <h2 className="text-3xl font-semibold mb-4 text-[#034F96]">Book Your Travel Health Appointment</h2>
        <p className="max-w-2xl mx-auto text-sm mb-6">
          Protect yourself before your trip. Book your travel health appointment today and get NHS-approved vaccinations, malaria prevention and expert advice.
        </p>
        <a
          href="/booking"
          className="inline-block bg-white text-[#034F96] font-medium px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition"
        >
          Book Now
        </a>
      </section>
    </>
  );
}
