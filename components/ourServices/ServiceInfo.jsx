"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    BadgeCheck,
    Star,
    CheckCircle,
    ArrowRight,
    Phone,
    Calendar,
} from "lucide-react";

export default function ServiceInfo({ service }) {
    if (!service) return null;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    };

    return (
        <section className="py-8 sm:py-12 md:py-16 px-4 bg-gradient-to-br from-[#F6FAFF] to-white">
            <motion.div
                className="max-w-[1600px] mx-auto"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 gap-6 sm:gap-8 xl:gap-12">
                    {/* Main Content - Left Side */}
                    <div className="xl:col-span-3 lg:col-span-2 space-y-4 sm:space-y-6">
                        {/* Service Overview */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-6 md:p-8"
                        >
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0B5C64] mb-3 sm:mb-4 font-average">
                                {service.title}
                            </h2>
                            <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg mb-4 sm:mb-6 font-average">
                                {service.description}
                            </p>

                            {/* Service Image */}
                            <div className="w-full rounded-xl overflow-hidden shadow-md mb-4 sm:mb-6">
                                <Image
                                    src={service?.images?.main || service.image}
                                    alt={service.title + " Service"}
                                    width={800}
                                    height={500}
                                    className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover"
                                />
                            </div>
                        </motion.div>

                        {/* Dynamic Content Sections */}
                        {service.content && (
                            <>
                                {/* Travel Clinic Sections */}
                                {service.content.whyChoose && (
                                    <>
                                        {/* Why Choose Us */}
                                        <motion.div
                                            variants={itemVariants}
                                            className="bg-white rounded-xl shadow-md border border-gray-100 p-6 md:p-8"
                                        >
                                            <h3 className="text-xl md:text-2xl font-bold text-[#0B5C64] mb-4 font-average">
                                                {service.content.whyChoose.title}
                                            </h3>
                                            <p className="text-gray-700 leading-relaxed mb-6 text-base font-average">
                                                {service.content.whyChoose.intro}
                                            </p>
                                            <div className="space-y-4">
                                                {service.content.whyChoose.points.map((point, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="border-l-4 border-[#037F91] pl-4"
                                                    >
                                                        <h4 className="font-bold text-[#0B5C64] mb-2 font-average">
                                                            {point.title}:
                                                        </h4>
                                                        <p className="text-gray-700 leading-relaxed font-average">
                                                            {point.detail}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>

                                        {/* Travel Vaccines Info - Only for travel clinic */}
                                        {service.content.travelVaccines && (
                                            <>
                                                <motion.div
                                                    variants={itemVariants}
                                                    className="bg-white rounded-xl shadow-md border border-gray-100 p-6 md:p-8"
                                                >
                                                    <h3 className="text-xl md:text-2xl font-bold text-[#0B5C64] mb-4 font-average">
                                                        {service.content.travelVaccines.title}
                                                    </h3>
                                                    <p className="text-gray-700 leading-relaxed mb-6 font-average">
                                                        {service.content.travelVaccines.intro}
                                                    </p>
                                                    <div className="space-y-4">
                                                        {service.content.travelVaccines.points.map(
                                                            (point, idx) => (
                                                                <div
                                                                    key={idx}
                                                                    className="border-l-4 border-[#037F91] pl-4"
                                                                >
                                                                    <h4 className="font-bold text-[#0B5C64] mb-2 font-average">
                                                                        {point.title}:
                                                                    </h4>
                                                                    <p className="text-gray-700 leading-relaxed font-average">
                                                                        {point.detail}
                                                                    </p>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </motion.div>
                                            </>
                                        )}

                                        {/* Importance of Vaccination - Only for travel clinic */}
                                        {service.content.importance && (
                                            <>
                                                {service?.images?.vaccines && (
                                                    <motion.div
                                                        variants={itemVariants}
                                                        className="w-full rounded-xl overflow-hidden shadow-md mb-6"
                                                    >
                                                        <Image
                                                            src={service.images.vaccines}
                                                            alt="Travel Vaccines"
                                                            width={800}
                                                            height={400}
                                                            className="w-full h-48 sm:h-64 md:h-72 lg:h-80 object-cover"
                                                        />
                                                    </motion.div>
                                                )}
                                                <motion.div
                                                    variants={itemVariants}
                                                    className="bg-white rounded-xl shadow-md border border-gray-100 p-6 md:p-8"
                                                >
                                                    <h3 className="text-xl md:text-2xl font-bold text-[#0B5C64] mb-4 font-average">
                                                        {service.content.importance.title}
                                                    </h3>
                                                    <p className="text-gray-700 leading-relaxed mb-6 font-average">
                                                        {service.content.importance.intro}
                                                    </p>
                                                    <div className="space-y-4">
                                                        {service.content.importance.points.map(
                                                            (point, idx) => (
                                                                <div
                                                                    key={idx}
                                                                    className="border-l-4 border-[#037F91] pl-4"
                                                                >
                                                                    <h4 className="font-bold text-[#0B5C64] mb-2 font-average">
                                                                        {point.title}:
                                                                    </h4>
                                                                    <p className="text-gray-700 leading-relaxed font-average">
                                                                        {point.detail}
                                                                    </p>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </motion.div>
                                            </>
                                        )}

                                        {/* Popular Destinations - Only for travel clinic */}
                                        {service.content.destinations && (
                                            <motion.div
                                                variants={itemVariants}
                                                className="bg-white rounded-xl shadow-md border border-gray-100 p-6 md:p-8"
                                            >
                                                <h3 className="text-xl md:text-2xl font-bold text-[#0B5C64] mb-4 font-average">
                                                    {service.content.destinations.title}
                                                </h3>
                                                <p className="text-gray-700 leading-relaxed mb-6 font-average">
                                                    {service.content.destinations.intro}
                                                </p>
                                                <div className="space-y-4">
                                                    {service.content.destinations.points.map(
                                                        (point, idx) => (
                                                            <div
                                                                key={idx}
                                                                className="border-l-4 border-[#037F91] pl-4"
                                                            >
                                                                <h4 className="font-bold text-[#0B5C64] mb-2 font-average">
                                                                    {point.title}:
                                                                </h4>
                                                                <p className="text-gray-700 leading-relaxed font-average">
                                                                    {point.detail}
                                                                </p>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}

                                        {/* Visit Our Clinic - Only for travel clinic */}
                                        {service.content.visitClinic && (
                                            <motion.div
                                                variants={itemVariants}
                                                className="bg-white rounded-xl shadow-md border border-gray-100 p-6 md:p-8"
                                            >
                                                <h3 className="text-xl md:text-2xl font-bold text-[#0B5C64] mb-4 font-average">
                                                    {service.content.visitClinic.title}
                                                </h3>
                                                <p className="text-gray-700 leading-relaxed font-average">
                                                    {service.content.visitClinic.content}
                                                </p>
                                            </motion.div>
                                        )}
                                    </>
                                )}

                                {/* Vaccination Clinic Sections */}
                                {service.content.specialistVaccinations && (
                                    <>
                                        {/* Specialist Vaccinations */}
                                        <motion.div
                                            variants={itemVariants}
                                            className="bg-white rounded-xl shadow-md border border-gray-100 p-6 md:p-8"
                                        >
                                            <h3 className="text-xl md:text-2xl font-bold text-[#0B5C64] mb-4 font-average">
                                                {service.content.specialistVaccinations.title}
                                            </h3>
                                            <p className="text-gray-700 leading-relaxed mb-6 font-average">
                                                {service.content.specialistVaccinations.intro}
                                            </p>
                                            <div className="space-y-4">
                                                {service.content.specialistVaccinations.vaccines.map(
                                                    (vaccine, idx) => (
                                                        <div
                                                            key={idx}
                                                            className="border-l-4 border-[#037F91] pl-4"
                                                        >
                                                            <h4 className="font-bold text-[#0B5C64] mb-2 font-average">
                                                                {vaccine.title}:
                                                            </h4>
                                                            <p className="text-gray-700 leading-relaxed font-average">
                                                                {vaccine.detail}
                                                            </p>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </motion.div>

                                        {/* Vaccination Process */}
                                        {service.content.process && (
                                            <motion.div
                                                variants={itemVariants}
                                                className="bg-white rounded-xl shadow-md border border-gray-100 p-6 md:p-8"
                                            >
                                                <h3 className="text-xl md:text-2xl font-bold text-[#0B5C64] mb-4 font-average">
                                                    {service.content.process.title}
                                                </h3>
                                                <p className="text-gray-700 leading-relaxed mb-6 font-average">
                                                    {service.content.process.intro}
                                                </p>
                                                <div className="space-y-3">
                                                    {service.content.process.steps.map((step, idx) => (
                                                        <div
                                                            key={idx}
                                                            className="flex gap-3 p-3 rounded-lg bg-gray-50"
                                                        >
                                                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-[#037F91] to-[#0B5C64] flex items-center justify-center text-white font-bold text-sm">
                                                                {idx + 1}
                                                            </div>
                                                            <p className="text-gray-700 font-average">
                                                                {step}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}

                                        {/* Vaccination Benefits */}
                                        {service.content.benefits && (
                                            <>
                                                {service?.images?.vaccines && (
                                                    <motion.div
                                                        variants={itemVariants}
                                                        className="w-full rounded-xl overflow-hidden shadow-md mb-6"
                                                    >
                                                        <Image
                                                            src={service.images.vaccines}
                                                            alt="Travel Vaccines"
                                                            width={800}
                                                            height={400}
                                                            className="w-full h-48 sm:h-64 md:h-72 lg:h-80 object-cover"
                                                        />
                                                    </motion.div>
                                                )}
                                                <motion.div
                                                    variants={itemVariants}
                                                    className="bg-white rounded-xl shadow-md border border-gray-100 p-6 md:p-8"
                                                >
                                                    <h3 className="text-xl md:text-2xl font-bold text-[#0B5C64] mb-4 font-average">
                                                        {service.content.benefits.title}
                                                    </h3>
                                                    <p className="text-gray-700 leading-relaxed mb-6 font-average">
                                                        {service.content.benefits.intro}
                                                    </p>
                                                    <div className="space-y-3">
                                                        {service.content.benefits.points.map((point, idx) => (
                                                            <div key={idx} className="flex items-start gap-3">
                                                                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                                                                <p className="text-gray-700 font-average">
                                                                    {point}
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            </>
                                        )}
                                    </>
                                )}

                                {/* Weight Loss Sections */}
                                {service.content.howItWorks && (
                                    <>
                                        {/* How It Works */}
                                        <motion.div
                                            variants={itemVariants}
                                            className="bg-white rounded-xl shadow-md border border-gray-100 p-6 md:p-8"
                                        >
                                            <h3 className="text-xl md:text-2xl font-bold text-[#0B5C64] mb-4 font-average">
                                                {service.content.howItWorks.title}
                                            </h3>
                                            <p className="text-gray-700 leading-relaxed font-average">
                                                {service.content.howItWorks.content}
                                            </p>
                                        </motion.div>

                                        {/* Why It Matters */}
                                        <motion.div
                                            variants={itemVariants}
                                            className="bg-white rounded-xl shadow-md border border-gray-100 p-6 md:p-8"
                                        >
                                            <h3 className="text-xl md:text-2xl font-bold text-[#0B5C64] mb-4 font-average">
                                                {service.content.whyItMatters.title}
                                            </h3>
                                            <p className="text-gray-700 leading-relaxed font-average">
                                                {service.content.whyItMatters.content}
                                            </p>
                                        </motion.div>

                                        {/* What We Offer */}
                                        <motion.div
                                            variants={itemVariants}
                                            className="bg-white rounded-xl shadow-md border border-gray-100 p-6 md:p-8"
                                        >
                                            <h3 className="text-xl md:text-2xl font-bold text-[#0B5C64] mb-4 font-average">
                                                {service.content.whatWeOffer.title}
                                            </h3>
                                            <p className="text-gray-700 leading-relaxed mb-6 font-average">
                                                {service.content.whatWeOffer.intro}
                                            </p>
                                            <ul className="space-y-3 mb-6">
                                                {service.content.whatWeOffer.services.map(
                                                    (item, idx) => (
                                                        <li key={idx} className="flex items-start gap-3">
                                                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                                                            <span className="text-gray-700 font-average">
                                                                {item}
                                                            </span>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </motion.div>

                                        {/* Weight Loss Medications Image */}
                                        {service?.images?.vaccines && (
                                            <motion.div
                                                variants={itemVariants}
                                                className="w-full rounded-xl overflow-hidden shadow-md mb-6"
                                            >
                                                <Image
                                                    src={service.images.vaccines}
                                                    alt="Weight Loss Medications"
                                                    width={800}
                                                    height={400}
                                                    className="w-full h-48 sm:h-64 md:h-72 lg:h-80 object-cover"
                                                />
                                            </motion.div>
                                        )}

                                        {/* How Medications Work */}
                                        <motion.div
                                            variants={itemVariants}
                                            className="bg-white rounded-xl shadow-md border border-gray-100 p-6 md:p-8"
                                        >
                                            <h3 className="text-xl md:text-2xl font-bold text-[#0B5C64] mb-4 font-average">
                                                {service.content.howMedicationsWork.title}
                                            </h3>
                                            <p className="text-gray-700 leading-relaxed mb-6 font-average">
                                                {service.content.howMedicationsWork.intro}
                                            </p>
                                            <ul className="space-y-3">
                                                {service.content.howMedicationsWork.points.map(
                                                    (point, idx) => (
                                                        <li key={idx} className="flex items-start gap-3">
                                                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                                                            <span className="text-gray-700 font-average">
                                                                {point}
                                                            </span>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </motion.div>

                                        {/* Who Is This For */}
                                        <motion.div
                                            variants={itemVariants}
                                            className="bg-white rounded-xl shadow-md border border-gray-100 p-6 md:p-8"
                                        >
                                            <h3 className="text-xl md:text-2xl font-bold text-[#0B5C64] mb-4 font-average">
                                                {service.content.whoIsThisFor.title}
                                            </h3>
                                            <p className="text-gray-700 leading-relaxed mb-6 font-average">
                                                {service.content.whoIsThisFor.intro}
                                            </p>
                                            <div className="space-y-4 mb-6">
                                                {service.content.whoIsThisFor.criteria.map(
                                                    (criterion, idx) => (
                                                        <div
                                                            key={idx}
                                                            className="border-l-4 border-[#037F91] pl-4"
                                                        >
                                                            <p className="text-gray-700 font-average">
                                                                {criterion}
                                                            </p>
                                                        </div>
                                                    )
                                                )}
                                                <div className="ml-8">
                                                    <ul className="space-y-2">
                                                        {service.content.whoIsThisFor.conditions.map(
                                                            (condition, idx) => (
                                                                <li
                                                                    key={idx}
                                                                    className="flex items-start gap-3"
                                                                >
                                                                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                                                                    <span className="text-gray-700 font-average text-sm">
                                                                        {condition}
                                                                    </span>
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                                                <p className="text-blue-800 font-average text-sm">
                                                    <strong>Note:</strong>{" "}
                                                    {service.content.whoIsThisFor.note}
                                                </p>
                                            </div>
                                        </motion.div>

                                        {/* Appointment Process */}
                                        <motion.div
                                            variants={itemVariants}
                                            className="bg-white rounded-xl shadow-md border border-gray-100 p-6 md:p-8"
                                        >
                                            <h3 className="text-xl md:text-2xl font-bold text-[#0B5C64] mb-4 font-average">
                                                {service.content.appointmentProcess.title}
                                            </h3>
                                            <p className="text-gray-700 leading-relaxed mb-6 font-average">
                                                {service.content.appointmentProcess.intro}
                                            </p>
                                            <ul className="space-y-3 mb-6">
                                                {service.content.appointmentProcess.process.map(
                                                    (step, idx) => (
                                                        <li key={idx} className="flex items-start gap-3">
                                                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                                                            <span className="text-gray-700 font-average">
                                                                {step}
                                                            </span>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                            <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                                                <p className="text-green-800 font-average">
                                                    <strong>Ongoing Support:</strong>{" "}
                                                    {service.content.appointmentProcess.support}
                                                </p>
                                            </div>
                                        </motion.div>

                                        {/* Why Choose Us - Weight Loss */}
                                        <motion.div
                                            variants={itemVariants}
                                            className="bg-white rounded-xl shadow-md border border-gray-100 p-6 md:p-8"
                                        >
                                            <h3 className="text-xl md:text-2xl font-bold text-[#0B5C64] mb-6 font-average">
                                                {service.content.whyChooseUs.title}
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {service.content.whyChooseUs.benefits.map(
                                                    (benefit, idx) => (
                                                        <div
                                                            key={idx}
                                                            className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                                                        >
                                                            <span className="text-2xl">{benefit.icon}</span>
                                                            <div>
                                                                <h4 className="font-bold text-[#0B5C64] mb-2 font-average">
                                                                    {benefit.title}
                                                                </h4>
                                                                <p className="text-gray-700 font-average text-sm">
                                                                    {benefit.detail}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </motion.div>
                                    </>
                                )}
                            </>
                        )}

                        {/* Non-Travel Clinic Content */}
                        {!service.content && (
                            <>
                                {/* How It Works - Only for non-travel services */}
                                {service.steps && (
                                    <motion.div
                                        variants={itemVariants}
                                        className="bg-white rounded-xl shadow-md border border-gray-100 p-6 md:p-8"
                                    >
                                        <h3 className="text-xl md:text-2xl font-bold text-[#0B5C64] mb-6 font-average flex items-center gap-3">
                                            <CheckCircle className="w-6 h-6 text-[#037F91]" />
                                            How the Procedure Works
                                        </h3>
                                        <div className="space-y-4">
                                            {service.steps.map((step, idx) => (
                                                <div
                                                    key={idx}
                                                    className="flex gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                                                >
                                                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-[#037F91] to-[#0B5C64] flex items-center justify-center text-white font-bold text-sm">
                                                        {idx + 1}
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="text-base sm:text-lg font-semibold text-[#0B5C64] mb-2 font-average">
                                                            {step.title}
                                                        </h4>
                                                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base font-average">
                                                            {step.detail}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Benefits - Only for non-travel services */}
                                {service.benefits && (
                                    <motion.div
                                        variants={itemVariants}
                                        className="bg-white rounded-xl shadow-md border border-gray-100 p-6 md:p-8"
                                    >
                                        <h3 className="text-xl md:text-2xl font-bold text-[#0B5C64] mb-6 font-average flex items-center gap-3">
                                            <Star className="w-6 h-6 text-[#037F91]" />
                                            Key Benefits
                                        </h3>
                                        <div className="grid grid-cols-1 gap-3">
                                            {service.benefits.map((benefit, idx) => (
                                                <div
                                                    key={idx}
                                                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                                                >
                                                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                                                    <p className="text-gray-700 font-average">
                                                        {benefit}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </>
                        )}

                        {/* FAQs */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-white rounded-xl shadow-md border border-gray-100 p-6 md:p-8"
                        >
                            <h3 className="text-xl md:text-2xl font-bold text-[#0B5C64] mb-6 font-average">
                                Frequently Asked Questions
                            </h3>
                            <div className="space-y-4">
                                {service.faqs.map((faq, idx) => (
                                    <div
                                        key={idx}
                                        className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                                    >
                                        <h4 className="font-bold text-base md:text-lg text-[#0B5C64] mb-3 font-average">
                                            {faq.q}
                                        </h4>
                                        <p className="text-gray-700 leading-relaxed font-average text-sm md:text-base">
                                            {faq.a}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Enhanced Contact Us Section - Moved to End */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-gradient-to-br from-[#037F91] to-[#0B5C64] rounded-2xl shadow-2xl p-6 text-white relative overflow-hidden"
                        >
                            {/* Background Pattern */}
                            <div className="absolute inset-0 opacity-10">
                                <div className="absolute top-0 left-0 w-40 h-40 rounded-full bg-white/20 -translate-x-20 -translate-y-20"></div>
                                <div className="absolute bottom-0 right-0 w-60 h-60 rounded-full bg-white/10 translate-x-30 translate-y-30"></div>
                                <div className="absolute top-1/2 left-1/2 w-32 h-32 rounded-full bg-white/15 -translate-x-16 -translate-y-16"></div>
                            </div>

                            <div className="relative z-10">
                                <div className="text-center mb-6">
                                    <h3 className="text-xl lg:text-2xl font-bold mb-2 font-average">
                                        Ready to Get Started?
                                    </h3>
                                    <p className="text-white/90 font-average text-base">
                                        Contact us today to book your appointment or ask any
                                        questions
                                    </p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4 mb-6">
                                    {/* Phone Contact */}
                                    <motion.div
                                        whileHover={{ scale: 1.02, y: -2 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                    >
                                        <Link
                                            href="tel:+447912982016"
                                            className="flex items-center gap-3 p-4 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 group border border-white/30"
                                        >
                                            <div className="w-12 h-12 rounded-xl bg-white/30 group-hover:bg-white/40 flex items-center justify-center flex-shrink-0 transition-colors">
                                                <Phone className="w-6 h-6 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-bold text-white text-base font-average">
                                                    Call Us Now
                                                </p>
                                                <p className="text-white/90 font-average">
                                                 01489892599
                                                </p>
                                                <p className="text-white/70 font-average text-sm mt-1">
                                                    Mon-Fri: 9AM-6PM | Sat: 9AM-5PM
                                                </p>
                                            </div>
                                            <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </motion.div>

                                    {/* Address */}
                                    <motion.div
                                        whileHover={{ scale: 1.02, y: -2 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                    >
                                        <div className="flex items-center gap-3 p-4 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30">
                                            <div className="w-12 h-12 rounded-xl bg-white/30 flex items-center justify-center flex-shrink-0">
                                                <Calendar className="w-6 h-6 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-bold text-white text-base font-average">
                                                    Visit Our Pharmacy
                                                </p>
                                                <p className="text-white/90 font-average">
                                                    High Street, Bishop Waltham
                                                </p>
                                                <p className="text-white/70 font-average text-sm mt-1">
                                                    Hampshire, United Kingdom
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Enhanced Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <motion.div whileTap={{ scale: 0.98 }} className="flex-1">
                                        <Link
                                            href={`/booking?service=${encodeURIComponent(
                                                service.title
                                            )}`}
                                            className="group relative inline-flex items-center justify-center gap-2 bg-white text-[#037F91] px-6 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all duration-300 w-full font-average text-base overflow-hidden"
                                        >
                                            <motion.div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            <Calendar className="w-4 h-4 relative z-10" />
                                            <span className="relative z-10">
                                                Book {service.title} Appointment
                                            </span>
                                        </Link>
                                    </motion.div>
                                    <motion.div whileTap={{ scale: 0.98 }}>
                                        <Link
                                            href="/#services"
                                            className="inline-flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm border-2 border-white/40 text-white px-5 py-3 rounded-xl font-bold hover:bg-white/30 hover:border-white/60 transition-all duration-300 font-average"
                                        >
                                            <Star className="w-4 h-4" />
                                            More Services
                                        </Link>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Sidebar - Right Side */}
                    <div className="xl:col-span-1 lg:col-span-1 space-y-4 lg:space-y-6 order-first lg:order-last">
                        {/* Our Services */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-white rounded-xl shadow-md border border-gray-100 p-4 lg:p-6"
                        >
                            <h3 className="text-lg lg:text-xl font-bold text-[#0B5C64] mb-4 font-average flex items-center gap-2">
                                <BadgeCheck className="w-4 h-4 lg:w-5 lg:h-5" />
                                Our Services
                            </h3>
                            <ul className="space-y-2 lg:space-y-3">
                                {[
                                    "Weight Loss Injections",
                                    "Travel Clinic",
                                    "Ear Wax Removal",
                                    "Vaccination Clinic",
                                ].map((serviceName, index) => {
                                    const serviceLinks = {
                                        "Weight Loss Injections":
                                            "/our-services/weight-loss-injections",
                                        "Travel Clinic": "/our-services/travel-clinic",
                                        "Ear Wax Removal": "/our-services/ear-wax-removal",
                                        "Vaccination Clinic": "/our-services/vaccination-clinic",
                                    };

                                    return (
                                        <li
                                            key={index}
                                            className={`group ${serviceName === service.title
                                                ? "bg-gradient-to-r from-[#037F91]/10 to-[#0B5C64]/10 border-l-4 border-[#037F91] font-semibold text-[#037F91]"
                                                : "hover:bg-gray-50 text-gray-700"
                                                }`}
                                        >
                                            <Link
                                                href={serviceLinks[serviceName]}
                                                className="flex items-center gap-2 lg:gap-3 px-2 lg:px-3 py-2 rounded-lg transition-all cursor-pointer"
                                            >
                                                <BadgeCheck
                                                    size={14}
                                                    className={
                                                        serviceName === service.title
                                                            ? "text-[#037F91]"
                                                            : "text-gray-400 group-hover:text-[#037F91]"
                                                    }
                                                />
                                                <span className="font-average text-xs lg:text-sm">
                                                    {serviceName}
                                                </span>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </motion.div>

                        {/* Book Appointment */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-gradient-to-br from-[#037F91] to-[#0B5C64] rounded-xl shadow-md p-4 lg:p-6 text-white"
                        >
                            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3 lg:mb-4">
                                <Calendar className="w-5 h-5 lg:w-6 lg:h-6" />
                            </div>
                            <h3 className="text-lg lg:text-xl font-bold mb-2 lg:mb-3 font-average">
                                Ready to Book?
                            </h3>
                            <p className="mb-4 lg:mb-6 text-white/90 font-average text-sm lg:text-base">
                                Schedule your {service.title.toLowerCase()} appointment today.
                            </p>
                            <Link
                                href={`/booking?service=${encodeURIComponent(service.title)}`}
                                className="group inline-flex items-center justify-center gap-2 bg-white text-[#037F91] px-4 lg:px-6 py-2 lg:py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all w-full font-average text-sm lg:text-base"
                            >
                                <Calendar className="w-4 h-4 lg:w-5 lg:h-5" />
                                Book Appointment
                                <ArrowRight className="w-3 h-3 lg:w-4 lg:h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
