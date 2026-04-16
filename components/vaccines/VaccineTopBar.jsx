"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShoppingCart } from "lucide-react";


export default function VaccineTopBar({
    categories,
    selectedCategory,
    onCategoryChange,
    cart,
    grandTotal,
    bookingLoading,
    onBooking
}) {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm border">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                {/* Spacer to push cart to the right */}
                <div className="flex-1"></div>

                {/* Cart Summary and Book Button - Always Show */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full lg:w-auto">
                    {/* Cart Summary */}
                    <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                        <ShoppingCart className="w-4 h-4 text-[#0B5C64]" />
                        <span className="text-sm text-gray-700 font-instrument">
                            {totalItems} item{totalItems !== 1 ? 's' : ''}
                        </span>
                        <span className="text-sm font-bold text-[#0B5C64] font-instrument">
                            £{grandTotal.toFixed(2)}
                        </span>
                    </div>

                    {/* Book Now Button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-[#0B5C64] text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 hover:bg-[#094a52] font-instrument cursor-pointer"
                        disabled={cart.length === 0 || bookingLoading}
                        onClick={onBooking}
                    >
                        {bookingLoading ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                                <span>Preparing...</span>
                            </>
                        ) : (
                            <>
                                <span>Book Now</span>
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </motion.button>
                </div>
            </div>
        </div>
    );
}