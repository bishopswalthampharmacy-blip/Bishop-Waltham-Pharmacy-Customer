"use client";

import { Suspense, useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchVaccines, fetchSlotsForDay } from "@/lib/utils";
import { useCart } from "@/src/contexts/index";
import VaccineTopBar from "@/components/vaccines/VaccineTopBar";
import VaccineTable from "@/components/vaccines/VaccineTable";

// ─── Constants (defined once, outside components) ────────────────────────────

const CATEGORY_LABELS = {
  Other: "Other Vaccines",
  travel: "Travel Vaccines",
  weightloss: "Weight Loss Service",
  covid: "COVID-19 Vaccines",
  flu: "Flu Vaccines",
  hpv: "HPV Vaccines",
};

const HIDDEN_CATEGORIES = new Set(["EarMicrosuction", "Consultation"]);

const VACCINATION_MERGE_KEYS = ["Travel vaccines", "Other"];

// ─── Pure helpers (no closures over component state) ─────────────────────────

const formatCategoryLabel = (key) =>
  CATEGORY_LABELS[key] ??
  key
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]/g, " ")
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ")
    .trim();

const normalizeKey = (value = "") =>
  value.toLowerCase().replace(/[^a-z0-9]/g, "");

const resolveCategory = (requested, vaccineList) => {
  if (!requested) return "";
  if (Object.prototype.hasOwnProperty.call(vaccineList, requested))
    return requested;

  const norm = normalizeKey(requested);
  return (
    Object.keys(vaccineList).find((k) => normalizeKey(k) === norm) ?? requested
  );
};

const buildVaccinationOnlyList = (vaccineList) => {
  const merged = VACCINATION_MERGE_KEYS.flatMap((k) => vaccineList[k] ?? []);
  return {
    list: { "All Vaccines": merged },
    categories: [{ value: "All Vaccines", label: "All Vaccines" }],
  };
};

const buildFullList = (vaccineList, requestedCategory) => {
  const showHidden =
    requestedCategory &&
    HIDDEN_CATEGORIES.has(resolveCategory(requestedCategory, vaccineList));

  const list = Object.fromEntries(
    Object.entries(vaccineList).filter(
      ([k]) => showHidden || !HIDDEN_CATEGORIES.has(k),
    ),
  );

  const categories = Object.entries(list)
    .filter(([, v]) => Array.isArray(v) && v.length > 0)
    .map(([k]) => ({ value: k, label: formatCategoryLabel(k) }));

  return { list, categories };
};

const getTodayFormatted = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

// ─── Custom hook: data fetching ───────────────────────────────────────────────

function useVaccines(searchParams) {
  const [state, setState] = useState({
    vaccines: {},
    categories: [],
    selectedCategory: "",
    loading: true,
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    let cancelled = false;

    const load = async () => {
      try {
        const response = await fetchVaccines();
        if (cancelled) return;

        const vaccineList = response?.vaccineList;
        if (!vaccineList) throw new Error("Empty response");

        const filterType = searchParams.get("filterType");
        const requestedCategory = searchParams.get("category");

        const { list, categories } =
          filterType === "vaccination"
            ? buildVaccinationOnlyList(vaccineList)
            : buildFullList(vaccineList, requestedCategory);

        // Resolve initial selected category
        let selectedCategory = categories[0]?.value ?? "";
        if (requestedCategory && filterType !== "vaccination") {
          const resolved = resolveCategory(requestedCategory, list);
          if (Object.prototype.hasOwnProperty.call(list, resolved)) {
            selectedCategory = resolved;
          }
        }

        setState({
          vaccines: list,
          categories,
          selectedCategory,
          loading: false,
        });
      } catch {
        setState({
          vaccines: {},
          categories: [],
          selectedCategory: "",
          loading: false,
        });
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [searchParams]);

  const setSelectedCategory = useCallback(
    (category) => setState((prev) => ({ ...prev, selectedCategory: category })),
    [],
  );

  return { ...state, setSelectedCategory };
}

// ─── Main content component ───────────────────────────────────────────────────

function VaccinesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { cart, grandTotal } = useCart();
  const [bookingLoading, setBookingLoading] = useState(false);

  const {
    vaccines,
    categories,
    selectedCategory,
    loading,
    setSelectedCategory,
  } = useVaccines(searchParams);

  const handleBooking = useCallback(async () => {
    if (!cart.length) return;
    setBookingLoading(true);
    try {
      const date = getTodayFormatted();
      const slotsResult = await fetchSlotsForDay(date);
      if (slotsResult?.success && slotsResult.data) {
        localStorage.setItem(
          "prefetchedSlots",
          JSON.stringify({
            date,
            slotsData: slotsResult.data,
            timestamp: Date.now(),
          }),
        );
      }
    } catch (err) {
      console.error("Failed to prefetch slots:", err);
    } finally {
      setBookingLoading(false);
      router.push("/booking");
    }
  }, [cart.length, router]);

  // Shared back-link element
  const backLink = (
    <Link
      href="/"
      className="text-gray-600 hover:text-[#0B5C64] flex items-center mb-4 transition-colors duration-200 font-instrument cursor-pointer"
    >
      <ChevronLeft className="w-4 h-4 mr-1" />
      Back to Home
    </Link>
  );

  if (loading) return <Spinner />;

  if (!categories.length) {
    return (
      <PageShell>
        {backLink}
        <SectionHeading
          title="Vaccines Currently Unavailable"
          subtitle="No vaccine categories are currently available. Please check back later or contact us for more information."
        />
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
          <p className="text-gray-500 text-lg font-instrument mb-2">
            No vaccines available at this time
          </p>
          <p className="text-gray-400 text-sm font-instrument">
            Our vaccine inventory is currently being updated.
          </p>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      {backLink}
      <SectionHeading
        title="List Provided"
        subtitle="Choose from our comprehensive range of vaccines and health services."
      />
      <VaccineTopBar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        cart={cart}
        grandTotal={grandTotal}
        bookingLoading={bookingLoading}
        onBooking={handleBooking}
      />
      <VaccineTable vaccines={vaccines} selectedCategory={selectedCategory} />
    </PageShell>
  );
}

// ─── Tiny presentational helpers ─────────────────────────────────────────────

const Spinner = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0B5C64]" />
  </div>
);

const PageShell = ({ children }) => (
  <div className="min-h-screen bg-white font-average">
    <div className="max-w-7xl mx-auto px-4 py-6 md:px-8 md:py-10">
      <div className="mb-6">{children}</div>
    </div>
  </div>
);

const SectionHeading = ({ title, subtitle }) => (
  <div className="text-center space-y-3 mb-6">
    <h1 className="text-2xl md:text-3xl font-bold text-[#0B5C64] font-instrument">
      {title}
    </h1>
    <p className="text-gray-600 text-sm max-w-xl mx-auto font-instrument leading-relaxed">
      {subtitle}
    </p>
  </div>
);

// ─── Page export ──────────────────────────────────────────────────────────────

export default function VaccinesPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <VaccinesContent />
    </Suspense>
  );
}
