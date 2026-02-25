"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Shield, Clock, Star } from "lucide-react"

export default function Hero({ service }) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
        }
    }

    const floatingVariants = {
        animate: {
            y: [-15, 15, -15],
            scale: [1, 1.05, 1],
            rotate: [0, 2, 0],
            transition: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    }

    const pulseVariants = {
        animate: {
            scale: [1, 1.1, 1],
            opacity: [0.7, 0.9, 0.7],
            transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    }

    return (
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
            {/* Enhanced Background with Multiple Gradients */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={service?.images?.hero || service?.image || "/Earwaxremoval.webp"}
                    alt={service?.title || "Service Background"}
                    fill
                    className="object-cover scale-110"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#0B5C64]/95 via-[#037F91]/85 to-[#0B5C64]/95"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#037F91]/20 via-transparent to-[#0B5C64]/20"></div>
            </div>

            {/* Enhanced Animated Background Elements */}
            <motion.div
                className="absolute top-20 left-20 w-72 h-72 rounded-full bg-gradient-to-br from-white/15 to-[#037F91]/10 blur-3xl"
                variants={floatingVariants}
                animate="animate"
            ></motion.div>
            <motion.div
                className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-gradient-to-br from-[#037F91]/25 to-white/5 blur-3xl"
                variants={pulseVariants}
                animate="animate"
            ></motion.div>
            <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-white/8 to-[#0B5C64]/10 blur-3xl"
                variants={floatingVariants}
                animate="animate"
                transition={{ delay: 2 }}
            ></motion.div>
            <motion.div
                className="absolute top-10 right-1/3 w-48 h-48 rounded-full bg-gradient-to-br from-[#037F91]/20 to-transparent blur-2xl"
                variants={pulseVariants}
                animate="animate"
                transition={{ delay: 1 }}
            ></motion.div>

            {/* Main Content */}
            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
                    {/* Left Content */}
                    <motion.div
                        className="text-left"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Enhanced Service Badge */}
                        <motion.div
                            variants={itemVariants}
                            whileHover={{ scale: 1.05, y: -2 }}
                            className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-white/25 backdrop-blur-md border border-white/40 text-white text-xs sm:text-sm font-semibold mb-6 sm:mb-6 shadow-lg"
                        >
                            <Shield className="w-5 h-5" />
                            Professional Healthcare Service
                        </motion.div>

                        {/* Enhanced Title with Text Animation */}
                        <motion.h1
                            variants={itemVariants}
                            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-6 text-white leading-tight font-average"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <motion.span
                                initial={{ backgroundPosition: "0% 50%" }}
                                animate={{ backgroundPosition: "100% 50%" }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="bg-gradient-to-r from-white via-white/90 to-white/80 bg-[length:200%_100%] bg-clip-text text-transparent"
                            >
                                {service?.title || "Professional Service"}
                            </motion.span>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            variants={itemVariants}
                            className="text-sm md:text-base text-white/90 leading-relaxed max-w-2xl font-average"
                        >
                            {service?.subtitle || "Expert healthcare services tailored to your needs with professional care and attention."}
                        </motion.p>

                        {/* Features Grid */}
                        <motion.div
                            variants={itemVariants}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 sm:mb-6"
                        >
                            <div className="flex items-center gap-2 text-white/90">
                                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                    <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                                </div>
                                <span className="font-medium text-sm">Efficient</span>
                            </div>
                            <div className="flex items-center gap-2 text-white/90">
                                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                    <Star className="w-3 h-3 sm:w-4 sm:h-4" />
                                </div>
                                <span className="font-medium text-sm">Professional Care</span>
                            </div>
                        </motion.div>

                        {/* Enhanced CTA Buttons */}
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col sm:flex-row gap-3 mb-6"
                        >
                            <motion.div
                                whileHover={{ scale: 1.05, y: -3 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                                <Link
                                    href={`/booking?service=${encodeURIComponent(service?.title || "Service")}`}
                                    className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#037F91] to-[#0B5C64] text-white px-3 py-2 rounded-full font-semibold text-sm overflow-hidden shadow-lg font-average w-full sm:w-auto"
                                >
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-[#0B5C64] to-[#037F91] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    />
                                    <motion.div
                                        className="relative z-10"
                                    >
                                        <Calendar className="w-6 h-6" />
                                    </motion.div>
                                    <span className="relative z-10">Book Appointment</span>
                                    <motion.div
                                        className="absolute inset-0 opacity-20"
                                        animate={{
                                            background: [
                                                "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)",
                                                "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)"
                                            ],
                                            transform: ["translateX(-100%)", "translateX(300%)"]
                                        }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    />
                                </Link>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                                <Link
                                    href="/#services"
                                    className="inline-flex items-center justify-center gap-2 bg-white/25 backdrop-blur-md border border-white/40 text-white px-3 py-2 rounded-full font-semibold hover:bg-white/35 hover:border-white/60 transition-all duration-300 shadow-lg font-average text-sm w-full sm:w-auto"
                                >
                                    <Star className="w-5 h-5" />
                                    View All Services
                                </Link>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Right Content - Service Preview Card */}
                    <motion.div
                        variants={itemVariants}
                        className="hidden lg:block"
                    >
                        <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-4 sm:p-6 shadow-2xl border border-white/50">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-white/30 rounded-3xl"></div>
                            <div className="relative z-10">
                                <div className="w-full h-48 sm:h-64 rounded-2xl overflow-hidden mb-4 sm:mb-6">
                                    <Image
                                        src={service?.images?.hero || service?.image || "/Earwaxremoval.webp"}
                                        alt={service?.title || "Service"}
                                        width={400}
                                        height={300}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="text-lg font-bold text-[#0B5C64] mb-4 font-average">
                                    Why Choose Our {service?.title}?
                                </h3>
                                <p className="text-gray-700 mb-6 leading-relaxed font-average text-base">
                                    {service?.description?.substring(0, 150)}...
                                </p>
                                <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-[#037F91] font-medium flex-wrap">
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                                        Cost Efficient
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                                        Safe & Professional
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Breadcrumbs */}
                <motion.nav
                    variants={itemVariants}
                    className="flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white font-medium w-fit mx-auto lg:mx-0 text-sm"
                >
                    <Link href="/" className="hover:text-white/70 transition-colors font-average">
                        Home
                    </Link>
                    <span className="text-white/60">›</span>
                    <Link href="/#services" className="hover:text-white/70 transition-colors font-average">
                        Services
                    </Link>
                    <span className="text-white/60">›</span>
                    <span className="text-white/90 font-average">{service?.title || "Service"}</span>
                </motion.nav>
            </div>
        </section>
    )
}
