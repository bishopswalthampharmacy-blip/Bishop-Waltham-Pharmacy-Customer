"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchVaccines, fetchSlotsForDay } from "@/lib/utils";
import { useCart } from "@/src/contexts/index";
import VaccineTopBar from "@/components/vaccines/VaccineTopBar";
import VaccineTable from "@/components/vaccines/VaccineTable";

const formatCategoryLabel = (categoryKey) => {
  const specialCases = {
    Other: "Other Vaccines",
    travel: "Travel Vaccines",
    weightloss: "Weight Loss Service",
    covid: "COVID-19 Vaccines",
    flu: "Flu Vaccines",
    hpv: "HPV Vaccines",
  };

  if (specialCases[categoryKey]) {
    return specialCases[categoryKey];
  }

  return categoryKey
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")
    .trim();
};

export default function VaccinesPage() {
  const [vaccines, setVaccines] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const { cart, grandTotal } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);

    const loadVaccines = async () => {
      try {
        const response = await fetchVaccines();

        if (response && response.vaccineList) {
          const vaccineList = response.vaccineList;

          const filterType = searchParams.get("filterType");


          if (filterType === "vaccination") {

            const travelVaccines = vaccineList["Travel vaccines"] || [];
            const otherVaccines = vaccineList["Other"] || [];
            const mergedVaccines = [...travelVaccines, ...otherVaccines];


            const mergedList = {
              "All Vaccines": mergedVaccines
            };

            setVaccines(mergedList);
            setCategories([{ value: "All Vaccines", label: "All Vaccines" }]);
            setSelectedCategory("All Vaccines");
          } else {

            setVaccines(vaccineList);

            const dynamicCategories = Object.keys(vaccineList)
              .filter(
                (categoryKey) =>
                  Array.isArray(vaccineList[categoryKey]) &&
                  vaccineList[categoryKey].length > 0
              )
              .map((categoryKey) => ({
                value: categoryKey,
                label: formatCategoryLabel(categoryKey),
              }));

            setCategories(dynamicCategories);

            const requestedCategory = searchParams.get("category");
            if (requestedCategory) {
              setSelectedCategory(requestedCategory);
            } else if (dynamicCategories.length > 0) {
              setSelectedCategory(dynamicCategories[0].value);
            }
          }
        } else {
          setVaccines({});
          setCategories([]);
          setSelectedCategory("");
        }
      } catch (error) {
        setVaccines({});
        setCategories([]);
        setSelectedCategory("");
      } finally {
        setLoading(false);
      }
    };

    loadVaccines();
  }, [searchParams]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleBooking = async () => {
    if (cart.length > 0) {
      setBookingLoading(true);
      try {
        const today = new Date();
        const formattedDate = `${today.getFullYear()}-${String(
          today.getMonth() + 1
        ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

        const slotsResult = await fetchSlotsForDay(formattedDate);

        if (slotsResult.success && slotsResult.data) {
          if (typeof window !== "undefined") {
            localStorage.setItem(
              "prefetchedSlots",
              JSON.stringify({
                date: formattedDate,
                slotsData: slotsResult.data,
                timestamp: new Date().getTime(),
              })
            );
          }
        }

        router.push("/booking");
      } catch (error) {
        console.error("Failed to prefetch slots:", error);
        router.push("/booking");
      } finally {
        setBookingLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0B5C64]"></div>
      </div>
    );
  }

  // Show message when no categories are available
  if (categories.length === 0) {
    return (
      <div className="min-h-screen bg-white font-average">
        <div className="max-w-7xl mx-auto px-4 py-6 md:px-8 md:py-10">
          <div className="mb-6">
            <Link
              href="/"
              className="text-gray-600 hover:text-[#0B5C64] flex items-center mb-4 transition-colors duration-200 font-instrument cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Home
            </Link>
            <div className="text-center space-y-3 mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-[#0B5C64] font-instrument">
                Vaccines Currently Unavailable
              </h1>
              <p className="text-gray-600 text-sm max-w-xl mx-auto font-instrument leading-relaxed">
                No vaccine categories are currently available. Please check back
                later or contact us for more information.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
            <div className="text-gray-500 text-lg font-instrument mb-2">
              No vaccines available at this time
            </div>
            <div className="text-gray-400 text-sm font-instrument">
              Our vaccine inventory is currently being updated.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-average">
      <div className="max-w-7xl mx-auto px-4 py-6 md:px-8 md:py-10">
        <div className="mb-6">
          <Link
            href="/"
            className="text-gray-600 hover:text-[#0B5C64] flex items-center mb-4 transition-colors duration-200 font-instrument cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Home
          </Link>
          <div className="text-center space-y-3 mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-[#0B5C64] font-instrument">
              List Provided
            </h1>
            <p className="text-gray-600 text-sm max-w-xl mx-auto font-instrument leading-relaxed">
              Choose from our comprehensive range of vaccines and health
              services.
            </p>
          </div>
        </div>

        {/* Enhanced Top Bar with Category and Cart */}
        <VaccineTopBar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          cart={cart}
          grandTotal={grandTotal}
          bookingLoading={bookingLoading}
          onBooking={handleBooking}
        />

        {/* Vaccine Table */}
        <VaccineTable vaccines={vaccines} selectedCategory={selectedCategory} />
      </div>
    </div>
  );
}
