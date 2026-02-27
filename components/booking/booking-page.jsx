"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { color, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Clock, Calendar, User, AlertCircle } from "lucide-react";
import DateSelection from "@/components/booking/date-selection";
import TimeSelection from "@/components/booking/time-selection";
import UserDetailsForm from "@/components/booking/user-details-form";
import PhoneVerification from "@/components/booking/phone-verification";
import BookingConfirmation from "@/components/booking/booking-confirmation";
import AppointmentTypeSelector from "@/components/booking/appointment-select";
import {
  bookSlotForDay,
  sendOTP,
  verifyOTP,
  createUser,
  fetchSlotsForDay,
} from "@/lib/utils";
import { useAuth, useCart } from "@/src/contexts";
import { useSearchParams } from "next/navigation";
import Logo from "../../public/Blogo3.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../Footer";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { CheckCircle2, XCircle, Home } from "lucide-react";
import { Button } from "@mui/material";

const steps = {
  APPOINTMENT_TYPE: "appointment_type",
  DETAILS: "details",
  VERIFICATION: "verification",
  DATE: "date",
  TIME: "time",
  CONFIRMATION: "confirmation",
};

const consultancyTypes = [
  { value: "Travel Clinic", label: "Travel Clinic" },
  { value: "Ear Microsuction", label: "Ear Microsuction" },
  { value: "Weight Loss", label: "Weight Loss" },
];

export default function BookingPage({ cartItems = [] }) {
  const [currentStep, setCurrentStep] = useState(steps.APPOINTMENT_TYPE);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [appointmentType, setAppointmentType] = useState("consultation");
  const [consultancyType, setConsultancyType] = useState("Travel Clinic");
  const { width, height } = useWindowSize();
  const [userDetails, setUserDetails] = useState({
    name: "",
    mobile: "",
    payment: "",
  });
  const [appointmentId, setAppointmentId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [appointmentTypeLoading, setAppointmentTypeLoading] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [verificationId, setVerificationId] = useState("");
  const [clientID, setClientID] = useState("");
  const [userID, setUserID] = useState("");
  const [prefetchedSlots, setPrefetchedSlots] = useState(null);
  const [bookingId, setbookingId] = useState(null);
  const [bookingDate, setbookingDate] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [current, setCurrent] = useState(2);
  const [paymentStatus, setPaymentStatus] = useState(null);

  useEffect(() => {
    const st = searchParams.get("st");
    setCurrent(st ? parseInt(st) : 2);

    if (cartItems && cartItems.length > 0) {
      setAppointmentType("vaccination");
      setCurrentStep(steps.DATE);
    }

    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [searchParams, cartItems]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [currentStep]);

  const handleGoHome = () => {
    setPaymentStatus(null);
    window.location.href = "/";
  };

  useEffect(() => {
    const status = searchParams.get("status");
    const newUrl = window.location.origin + window.location.pathname;
    window.history.replaceState({}, "", newUrl);

    if (status === "success") {
      setShowSuccess(true);
      setPaymentStatus("success");
    }
    if (status === "failure") {
      setPaymentStatus("failed");
      setShowFailure(true);
    }
  }, [searchParams]);

  const { user, isAuthenticated } = useAuth();
  const { clearCart } = useCart();

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("in_booking_process", "true");
    }

    return () => {
      if (typeof window !== "undefined" && currentStep !== steps.CONFIRMATION) {
        sessionStorage.removeItem("in_booking_process");
      }
    };
  }, [currentStep]);

  useEffect(() => {
    if (currentStep === steps.CONFIRMATION) {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("showing_confirmation", "true");
        localStorage.setItem("booking_success", "true");
      }
    }
  }, [currentStep]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedUser = localStorage.getItem("pharmacy_user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          if (
            parsedUser &&
            parsedUser.id &&
            parsedUser.name &&
            !isAuthenticated
          ) {
            window.dispatchEvent(new Event("storage"));
          }
        }
      } catch (error) {
        console.error("Error checking user data in localStorage:", error);
      }
    }

    if (isAuthenticated && user) {
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        name: user.name || prevDetails.name,
        mobile: user.mobile || prevDetails.mobile,
      }));

      if (user.id) {
        setUserID(user.id);
      }

      if (user.clientID) {
        setClientID(user.clientID);
      }
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (currentStep === steps.CONFIRMATION && !appointmentId) {
      setAppointmentId(Math.floor(Math.random() * 900000000) + 100000000);
    }
  }, [currentStep, appointmentId]);

  const handleDateSelect = async (date) => {
    setSelectedDate(date);
    setLoading(true);
    setError("");

    try {
      const formattedDate =
        typeof date === "string"
          ? date
          : `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
            2,
            "0"
          )}-${String(date.getDate()).padStart(2, "0")}`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const result = await fetchSlotsForDay(formattedDate, controller.signal);

      clearTimeout(timeoutId);

      if (result.success) {
        setPrefetchedSlots(result.data);
      } else {
        setError(result.message || "Failed to fetch available slots");
        toast.error(result.message || "Failed to fetch available slots");
      }
    } catch (err) {
      console.error("Error fetching slots:", err);
      let errorMessage = "Failed to fetch available slots. Please try again.";

      if (err.name === "AbortError") {
        errorMessage =
          "Request timed out. Please check your connection and try again.";
      } else if (err.message && err.message.includes("network")) {
        errorMessage = "Network error. Please check your internet connection.";
      }

      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
      setCurrentStep(steps.TIME);
    }
  };

  const handleTimeSelect = async (time) => {
    setSelectedTime(time);

    if (isAuthenticated) {
      await proceedToBooking(time);
    } else {
      setCurrentStep(steps.DETAILS);
    }
  };

  const handleAppointmentTypeSelected = async (type, specificType = "") => {
    setAppointmentType(type);
    setAppointmentTypeLoading(true);

    // Simulate a brief loading for better UX
    await new Promise(resolve => setTimeout(resolve, 500));

    if (type === "consultation") {
      setConsultancyType(specificType);
      if (!specificType) {
        setAppointmentTypeLoading(false);
        return;
      }

      setCurrentStep(steps.DATE);
      setAppointmentTypeLoading(false);
      return;
    }

    if (type === "vaccination") {
      if (!cartItems || cartItems.length === 0) {
        setAppointmentTypeLoading(false);
        router.push("/vaccines");
        return;
      }
      setCurrentStep(steps.DATE);
      setAppointmentTypeLoading(false);
    }
  };

  const proceedToBooking = async (time) => {
    setLoading(true);
    setError("");

    try {
      let currentUser = user;
      let currentUserID = userID;
      let currentClientID = clientID;

      if (!currentUser && typeof window !== "undefined") {
        try {
          const storedUserJson = localStorage.getItem("pharmacy_user");
          if (storedUserJson) {
            const storedUser = JSON.parse(storedUserJson);
            if (storedUser && storedUser.id) {
              currentUser = storedUser;
              currentUserID = storedUser.id || storedUser.userID;
              currentClientID = storedUser.clientID;

              setUserID(currentUserID);
              setClientID(currentClientID);
              setUserDetails((prev) => ({
                ...prev,
                name: storedUser.name,
                mobile: storedUser.mobile,
              }));
            }
          }
        } catch (error) {
          console.error("Error checking user in localStorage:", error);
        }
      }

      const bookingData = {
        selectedDate,
        selectedTime: time || selectedTime,
        appointmentType,
        consultancyType:
          appointmentType === "consultation" ? consultancyType : null,
        userDetails: {
          ...userDetails,
          clientID: currentUser?.clientID || currentClientID || clientID,
          userID: currentUser?.id || currentUserID || userID,
        },
        cartItems,
        vaccineNames:
          appointmentType === "vaccination"
            ? cartItems.map((item) => ({
              vaccineName: item.name.trim(),
              quantity: item.quantity,
            }))
            : [],
      };

      if (appointmentType === "consultation") {
        const result = await bookSlotForDay(bookingData);

        if (result.success) {
          clearCart();
          setBookingDetails({
            ...result.data,
            consultancyType: consultancyType,
          });
          setAppointmentId(
            result.data.appointmentNo ||
            Math.floor(Math.random() * 900000000) + 100000000
          );
          setbookingId(result.data.bookingId);
          setbookingDate(result.data.bookingDate);
          setCurrentStep(steps.CONFIRMATION);
          toast.success("Booking confirmed successfully!");
        } else {
          if (result.slotUnavailable) {
            const errorMsg =
              result.message ||
              "The selected time slot is not available. Please choose another time.";
            setError(errorMsg);
            toast.error(errorMsg);
            setCurrentStep(steps.TIME);
          } else {
            const errorMsg =
              result.message ||
              "Failed to book consultation. Please try again.";
            setError(errorMsg);
            toast.error(errorMsg);
          }
        }
        return;
      }

      if (appointmentType === "vaccination") {
        if (cartItems && cartItems.length > 0) {
          const result = await bookSlotForDay(bookingData);

          if (result.success) {
            clearCart();
            setBookingDetails(result.data);
            setAppointmentId(
              result.data.appointmentNo ||
              Math.floor(Math.random() * 900000000) + 100000000
            );
            setbookingId(result.data.bookingId);
            setbookingDate(result.data.bookingDate);
            setCurrentStep(steps.CONFIRMATION);
            toast.success("Booking confirmed successfully!");
          } else {
            if (result.slotUnavailable) {
              const errorMsg =
                result.message ||
                "The selected time slot is not available. Please choose another time.";
              setError(errorMsg);
              toast.error(errorMsg);
              setCurrentStep(steps.TIME);
            } else {
              const errorMsg =
                result.message ||
                "Failed to book appointment. Please try again.";
              setError(errorMsg);
              toast.error(errorMsg);
            }
          }
        } else {
          router.push("/vaccines");
        }
        return;
      }
    } catch (err) {
      console.error("Error in booking process:", err);
      const errorMsg = "An unexpected error occurred. Please try again.";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };
  const handleDetailsSubmit = async (details) => {
    setUserDetails(details);
    setLoading(true);
    setError("");

    try {
      const userResult = await createUser(details);

      if (userResult.success) {
        setClientID(userResult.clientID);
        setUserID(userResult.userID);
        setCurrentStep(steps.VERIFICATION);
        toast.success("Verification code sent to your mobile!");
      } else {
        const errorMsg =
          userResult.message || "Failed to create user. Please try again.";
        setError(errorMsg);
        toast.error(errorMsg);
      }
    } catch (err) {
      console.error("Error creating user:", err);
      const errorMsg = "Failed to create user. Please try again.";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleVerificationComplete = async (otp) => {
    setLoading(true);
    setError("");

    try {
      const verifyResult = await verifyOTP(userDetails.mobile, otp, clientID);

      if (!verifyResult.success) {
        const errorMsg =
          verifyResult.message ||
          "Invalid verification code. Please try again.";
        setError(errorMsg);
        toast.error(errorMsg);
        setLoading(false);
        return;
      }

      if (verifyResult.data?.userID) {
        setUserID(verifyResult.data.userID);
      }

      const enhancedUserDetails = {
        ...userDetails,
        clientID: clientID,
        userID: verifyResult.data?.userID || userID,
      };

      const userData = {
        id: verifyResult.data?.userID || userID,
        name: userDetails.name,
        mobile: userDetails.mobile,
        clientID: clientID,
        userID: verifyResult.data?.userID || userID,
        createdAt: new Date().toISOString(),
      };

      if (typeof window !== "undefined") {
        localStorage.setItem("pharmacy_user", JSON.stringify(userData));
        window.dispatchEvent(new Event("storage"));
      }

      toast.success("Verification successful!");
      await proceedToBooking(selectedTime);
    } catch (err) {
      console.error("Error in verification process:", err);
      const errorMsg = "An unexpected error occurred. Please try again.";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await sendOTP(userDetails.mobile);

      if (!result.success) {
        const errorMsg =
          result.message ||
          "Failed to resend verification code. Please try again.";
        setError(errorMsg);
        toast.error(errorMsg);
      } else {
        toast.success("Verification code resent successfully!");
      }
    } catch (err) {
      console.error("Error resending OTP:", err);
      const errorMsg = "Failed to resend verification code. Please try again.";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToDate = () => {
    setCurrentStep(steps.DATE);
  };

  const handleBackToTime = () => {
    setCurrentStep(steps.TIME);
  };

  const handleBackToDetails = () => {
    setCurrentStep(steps.DETAILS);
  };

  const getServiceName = () => {
    if (appointmentType === "consultancy") {
      return consultancyType === "Travel Clinic"
        ? "Travel Clinic"
        : consultancyType === "Ear Microsuction"
          ? "Ear Microsuction"
          : consultancyType === "Weight Loss"
            ? "Weight Loss"
            : "Doctor Consultation";
    }

    if (cartItems && cartItems.length === 1) {
      return `${cartItems[0].name} ${cartItems[0].subText || ""}`;
    } else if (cartItems && cartItems.length > 1) {
      return "Vaccine Appointment";
    }
    return "Appointment";
  };

  const getCurrentStepNumber = () => {
    if (cartItems && cartItems.length > 0) {
      switch (currentStep) {
        case steps.DATE:
          return 1;
        case steps.TIME:
          return 2;
        case steps.DETAILS:
          return 3;
        case steps.VERIFICATION:
          return 4;
        case steps.CONFIRMATION:
          return isAuthenticated ? 4 : 5;
        default:
          return 1;
      }
    }

    switch (currentStep) {
      case steps.APPOINTMENT_TYPE:
        return 1;
      case steps.DATE:
        return 2;
      case steps.TIME:
        return 3;
      case steps.DETAILS:
        return 4;
      case steps.VERIFICATION:
        return 5;
      case steps.CONFIRMATION:
        return 6;
      default:
        return 1;
    }
  };

  const getTotalSteps = () => {
    if (cartItems && cartItems.length > 0) {
      return isAuthenticated ? 4 : 5;
    }
    return 6;
  };

  const StepComponent = function (props = {}) {
    const { label, currentStep, steps } = props;
    return (
      <div className="mt-6">
        {currentStep === steps.DATE && (
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-bold text-[#016472] mb-4">
              Select {label || "Appointment"} Date
            </h3>
          </div>
        )}
      </div>
    );
  };

  const getStepLabel = (st) => {
    switch (st) {
      case 1:
        return "Appointment";
      case 2:
        return "Vaccination Appointment";
      default:
        return `St ${st}`;
    }
  };

  const formatDisplayDate = (date) => {
    if (!date) return "";

    if (typeof date === "string") {
      const parsedDate = new Date(date);
      return parsedDate.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }

    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <>
      <Dialog
        open={!!paymentStatus}
        onOpenChange={() => setPaymentStatus(null)}
      >
        {paymentStatus && (
          <DialogContent className="sm:max-w-md bg-gradient-to-br from-white via-slate-50 to-sky-50 shadow-2xl rounded-3xl p-8 border border-slate-200">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col items-center space-y-5 text-center"
            >
              {paymentStatus === "success" ? (
                <motion.div
                  initial={{ rotate: -15, scale: 0.9 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ duration: 0.6, type: "spring" }}
                >
                  <CheckCircle2 className="text-green-500 w-20 h-20 drop-shadow-lg" />
                </motion.div>
              ) : (
                <XCircle className="text-red-500 w-20 h-20 drop-shadow-lg" />
              )}

              <DialogTitle className="text-2xl font-semibold tracking-tight text-gray-800">
                {paymentStatus === "success"
                  ? "Payment Successful! 🎉"
                  : "Payment Failed"}
              </DialogTitle>

              <DialogDescription className="text-gray-600 text-base leading-relaxed max-w-sm">
                {paymentStatus === "success"
                  ? "Your booking at Bishop Pharmacy has been confirmed. Thank you for choosing us!"
                  : "Something went wrong while processing your payment. Please try again or contact support."}
              </DialogDescription>

              {paymentStatus === "success" && (
                <div className="bg-blue-50 text-blue-700 px-4 py-3 rounded-xl text-sm font-medium border border-blue-100 w-full max-w-sm">
                  Please arrive at least{" "}
                  <span className="font-semibold">10 minutes before</span> your
                  booking slot.
                </div>
              )}
              <Button
                onClick={handleGoHome}
                className="bg-[#0B5C64] hover:bg-[#09494e] text-white font-medium px-10 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 mt-2"
              >
                OK
              </Button>
            </motion.div>
          </DialogContent>
        )}
      </Dialog>

      <div className="relative w-full h-48 sm:h-64 md:h-72 overflow-hidden">
        <Image
          src="/assets/dd2.jpg"
          alt="Booking Background"
          fill
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide drop-shadow-lg">
            Book Now
          </h1>
        </div>
      </div>

      <div className="relative min-h-screen w-full flex  bg-gray-50 font-instrument">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/assets/booknow.webp"
            alt="Mountain landscape"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/60" />
        </div>

        <div className="relative z-10 bg-white shadow-2xl w-full border border-white/20 backdrop-blur-sm overflow-hidden px-4 sm:px-8 md:px-16 py-8 md:py-0">
          <div className="absolute top-4 left-4 z-20">
            {currentStep === steps.CONFIRMATION ? (
              <div className="text-gray-400 flex items-center text-sm font-medium cursor-not-allowed opacity-50">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Home Page
              </div>
            ) : (
              <Link
                href="/"
                onClick={() => {
                  if (currentStep === steps.CONFIRMATION) {
                    clearCart();
                    if (typeof window !== "undefined") {
                      localStorage.removeItem("vaccineCart");
                    }
                  }
                }}
                className="text-gray-500 hover:text-[#0D73A2] flex items-center text-sm font-medium transition-colors"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Home Page
              </Link>
            )}
          </div>

          {currentStep !== steps.CONFIRMATION && (
            <div className="absolute top-4 right-4 z-20 flex items-center">
              <div className="flex space-x-1">
                {Array.from({ length: getTotalSteps() }).map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 rounded-full ${index + 1 <= getCurrentStepNumber()
                      ? "bg-gradient-to-r from-[#00ACC1] to-[#0097A7] w-6"
                      : "bg-gray-200 w-4"
                      } transition-all duration-300`}
                  />
                ))}
              </div>
              <span className="ml-2 text-xs text-gray-500 font-medium">
                {getCurrentStepNumber()}/{getTotalSteps()}
              </span>
            </div>
          )}

          {currentStep !== steps.CONFIRMATION && (
            <div className="pt-12">
              <div className="mt-6">
                <StepComponent
                  label={getStepLabel(current)}
                  currentStep={currentStep}
                  steps={steps}
                />

                {currentStep === steps.TIME && (
                  <h3 className="text-center text-xl md:text-2xl font-bold text-[#016472] my-4">
                    Select Time Slot
                  </h3>
                )}
                {currentStep === steps.APPOINTMENT_TYPE && (
                  <h3 className="text-center text-xl md:text-2xl font-bold text-[#016472] my-4">
                    Select Appointment Type
                  </h3>
                )}
                {currentStep === steps.DETAILS && (
                  <h3 className="text-center text-xl md:text-2xl font-bold text-[#016472] my-4">
                    Please Enter Your Basic Details
                  </h3>
                )}
              </div>
            </div>
          )}

          {error && (
            <div className="absolute top-16 inset-x-0 z-20 px-4">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 text-red-500 px-4 py-2 rounded-lg flex items-center text-sm shadow-md"
              >
                <AlertCircle size={16} className="mr-2 flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            </div>
          )}

          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mt-4"
          >
            {currentStep === steps.APPOINTMENT_TYPE &&
              !(cartItems && cartItems.length > 0) && (
                <div className="w-full md:w-1/2 bg-white rounded-xl p-6 shadow-sm border border-gray-100 mx-auto">
                  <div className="flex justify-center">
                    <AppointmentTypeSelector
                      value={appointmentType}
                      onChange={(type) => {
                        setAppointmentType(type);
                        if (type !== "consultancy") {
                          setConsultancyType("");
                        }
                      }}
                      consultancyValue={consultancyType}
                      onConsultancyChange={(type) => setConsultancyType(type)}
                      onSelectionComplete={handleAppointmentTypeSelected}
                      consultancyTypes={consultancyTypes}
                      showConsultancy={appointmentType === "consultation"}
                      hideVaccinationOption={cartItems && cartItems.length > 0}
                      loading={appointmentTypeLoading}
                    />
                  </div>
                </div>
              )}

            {currentStep === steps.DATE && (
              <DateSelection onDateSelect={handleDateSelect} loading={loading} />
            )}

            {currentStep === steps.TIME && (
              <TimeSelection
                onTimeSelect={handleTimeSelect}
                onBack={handleBackToDate}
                selectedDate={selectedDate}
                preloadedSlots={prefetchedSlots}
              />
            )}

            {currentStep === steps.DETAILS && (
              <UserDetailsForm
                onSubmit={handleDetailsSubmit}
                onBack={isAuthenticated ? null : handleBackToTime}
                loading={loading}
              />
            )}

            {currentStep === steps.VERIFICATION && (
              <PhoneVerification
                mobile={userDetails.mobile}
                onVerificationComplete={handleVerificationComplete}
                onBack={handleBackToDetails}
                loading={loading}
                onResendOTP={handleResendOTP}
              />
            )}

            {currentStep === steps.CONFIRMATION && (
              <BookingConfirmation
                appointmentId={appointmentId}
                serviceName={getServiceName()}
                selectedDate={formatDisplayDate(selectedDate)}
                selectedTime={selectedTime}
                bookingId={bookingId}
                bookingDate={bookingDate}
                onClose={() => {
                  clearCart();
                  if (typeof window !== "undefined") {
                    localStorage.setItem("booking_success", "true");
                  }
                }}
              />
            )}
            <div className="bg-[#00ACC1] py-10 px-6 sm:px-10 mt-16 rounded-xl shadow-xl max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white">
                <div className="border border-dashed border-white rounded-lg p-6 flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h1.6a1 1 0 01.92.608L9.7 7.27a1 1 0 01-.217 1.09l-1.2 1.2a16 16 0 006.57 6.57l1.2-1.2a1 1 0 011.09-.217l3.662 1.88a1 1 0 01.608.92V19a2 2 0 01-2 2h-1C9.163 21 3 14.837 3 7V5z"
                      />
                    </svg>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-1">
                      Have a Question?
                    </h3>
                    <p className="text-sm">Call Now:</p>
                    <p className="text-2xl font-bold mt-1">01489892499</p>
                  </div>
                </div>

                <div className="border border-dashed border-white rounded-lg p-6 flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3M5 11h14M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-1">Visit Us</h3>
                    <p className="text-sm">Opening Hours</p>
                    <p className="font-bold mt-1">
                      Mon - Fri: 08:30 - 18:00 <br />
                      Sat: 08:30 - 17:00
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </div>
    </>
  );
}
