"use client";
import { motion } from "framer-motion";
import { Plus, Minus, Check } from "lucide-react";
import { useCart } from "@/src/contexts/index";

const formatBackendVaccine = (vaccine) => ({
    name: vaccine.name,
    course: vaccine.course || vaccine.dosage || "1 dose",
    price: `£${vaccine.price}/dose`,
    apiVaccine: vaccine,
});

const getVaccinesForCategory = (selectedCategory, backendVaccines = {}) => {
    if (
        backendVaccines[selectedCategory] &&
        Array.isArray(backendVaccines[selectedCategory])
    ) {
        return backendVaccines[selectedCategory].map(formatBackendVaccine);
    }

    return [];
};

export default function VaccineTable({ vaccines = {}, selectedCategory }) {
    const {
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
    } = useCart();

    const currentVaccines = getVaccinesForCategory(selectedCategory, vaccines);

    const getCartItem = (vaccineName) => {
        return cart.find((item) => item.name === vaccineName);
    };

    const handleAddToCart = (vaccine) => {
        const cartItem = {
            name: vaccine.name,
            price: parseFloat(vaccine.price.replace("£", "").split("/")[0]),
            quantity: 1,
            ...(vaccine.apiVaccine
                ? {
                    compositions: vaccine.apiVaccine.compositions,
                    status: vaccine.apiVaccine.status,
                    vaccineID:
                        vaccine.apiVaccine.vaccineID ||
                        `api_${vaccine.name.toLowerCase().replace(/\s+/g, "_")}`,
                    description: vaccine.apiVaccine.description,
                    pictureUrl: vaccine.apiVaccine.pictureUrl,
                }
                : {
                    compositions: vaccine.name,
                    status: "Available",
                    vaccineID: `custom_${vaccine.name
                        .toLowerCase()
                        .replace(/\s+/g, "_")}`,
                }),
        };
        addToCart(cartItem);
    };

    const handleRemoveFromCart = (vaccineName) => {
        removeFromCart(vaccineName);
    };

    const handleIncreaseQuantity = (vaccineName) => {
        increaseQuantity(vaccineName);
    };

    const handleDecreaseQuantity = (vaccineName) => {
        decreaseQuantity(vaccineName);
    };

    return (
        <div className="w-full">
            {/* Empty state */}
            {currentVaccines.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                    <div className="text-gray-500 text-lg font-instrument mb-2">
                        No vaccines available
                    </div>
                    <div className="text-gray-400 text-sm font-instrument">
                        No vaccines found for the selected category.
                    </div>
                </div>
            ) : (
                /* Vaccine Table */
                <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-gradient-to-r from-[#0B5C64] to-[#094a52] text-white">
                                <th className="py-3 px-4 text-left font-semibold font-instrument text-sm">
                                    Vaccines
                                </th>
                                <th className="py-3 px-4 text-left font-semibold font-instrument text-sm">
                                    Course
                                </th>
                                <th className="py-3 px-4 text-left font-semibold font-instrument text-sm">
                                    Price/Dose
                                </th>
                                <th className="py-3 px-4 text-center font-semibold font-instrument text-sm">
                                    Quantity
                                </th>
                                <th className="py-3 px-4 text-center font-semibold font-instrument text-sm">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentVaccines.map((vaccine, idx) => {
                                const cartItem = getCartItem(vaccine.name);
                                const isInCart = !!cartItem;

                                return (
                                    <motion.tr
                                        key={`${vaccine.name}-${idx}`}
                                        className={`${idx % 2 === 0
                                                ? "bg-white"
                                                : "bg-gradient-to-r from-gray-50 to-slate-50"
                                            } hover:bg-gradient-to-r hover:from-[#0B5C64]/5 hover:to-[#094a52]/5 transition-all duration-200 border-b border-gray-100 cursor-pointer`}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.02 }}
                                    >
                                        <td className="py-3 px-4 text-[#2d3748] font-medium font-instrument text-sm">
                                            {vaccine.name}
                                        </td>
                                        <td className="py-3 px-4 text-gray-600 font-instrument text-sm">
                                            {vaccine.course}
                                        </td>
                                        <td className="py-3 px-4 text-[#0B5C64] font-semibold font-instrument text-sm">
                                            {vaccine.price}
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            {isInCart ? (
                                                <div className="flex items-center justify-center gap-2">
                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => handleDecreaseQuantity(vaccine.name)}
                                                        className="w-7 h-7 rounded-full bg-[#0B5C64] text-white flex items-center justify-center hover:bg-[#094a52] transition-colors shadow-sm cursor-pointer"
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </motion.button>
                                                    <span className="w-8 text-center font-semibold text-[#0B5C64] font-instrument text-sm">
                                                        {cartItem.quantity}
                                                    </span>
                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => handleIncreaseQuantity(vaccine.name)}
                                                        className="w-7 h-7 rounded-full bg-[#0B5C64] text-white flex items-center justify-center hover:bg-[#094a52] transition-colors shadow-sm cursor-pointer"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </motion.button>
                                                </div>
                                            ) : (
                                                <span className="text-gray-400 font-instrument text-sm">
                                                    0
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            {isInCart ? (
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => handleRemoveFromCart(vaccine.name)}
                                                    className="px-3 py-1.5 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 transition-colors font-instrument shadow-sm cursor-pointer"
                                                >
                                                    Remove
                                                </motion.button>
                                            ) : (
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => handleAddToCart(vaccine)}
                                                    className="px-3 py-1.5 bg-[#0B5C64] text-white text-xs rounded-lg hover:bg-[#094a52] transition-colors flex items-center gap-1 mx-auto font-instrument shadow-sm cursor-pointer"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                    Add
                                                </motion.button>
                                            )}
                                        </td>
                                    </motion.tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
