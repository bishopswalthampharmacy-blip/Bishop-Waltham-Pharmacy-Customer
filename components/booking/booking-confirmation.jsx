"use client";

import { motion } from "framer-motion";
import { X, Check, Calendar, Clock } from "lucide-react";
import confetti from "canvas-confetti";
import { useEffect, useState, useRef } from "react";
import { useCart } from "@/src/contexts";
import { isFreeConsultancyType } from "@/lib/utils";

export default function BookingConfirmation({
  appointmentId,
  serviceName,
  selectedDate,
  selectedTime,
  onClose,
  bookingId,
  bookingDate,
  appointmentType,
  consultancyType,
  showPaymentActions,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const isNavigatingToPayment = useRef(false);
  const {
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    subtotal,
    tax,
    clearCart,
    grandTotal,
  } = useCart();

  const shouldShowPaymentActions =
    typeof showPaymentActions === "boolean"
      ? showPaymentActions
      : appointmentType !== "ear-microsuction" &&
        !(appointmentType === "consultation" && isFreeConsultancyType(consultancyType));

  useEffect(() => {
    setIsLoading(false);
    setPaymentError("");
    isNavigatingToPayment.current = false;

    if (typeof window !== "undefined") {
      const wasNavigatingToPayment = sessionStorage.getItem(
        "navigating_to_payment"
      );
      if (wasNavigatingToPayment) {
        sessionStorage.removeItem("navigating_to_payment");
        setIsLoading(false);
        setPaymentError("");
      }
    }

    const handlePageShow = (event) => {
      if (event.persisted || isNavigatingToPayment.current) {
        setIsLoading(false);
        setPaymentError("");
        isNavigatingToPayment.current = false;

        if (typeof window !== "undefined") {
          sessionStorage.removeItem("navigating_to_payment");
        }
      }
    };

    const handleVisibilityChange = () => {
      if (
        document.visibilityState === "visible" &&
        isNavigatingToPayment.current
      ) {
        setTimeout(() => {
          setIsLoading(false);
          setPaymentError("");
          isNavigatingToPayment.current = false;
          if (typeof window !== "undefined") {
            sessionStorage.removeItem("navigating_to_payment");
          }
        }, 100);
      }
    };

    const handleFocus = () => {
      if (isNavigatingToPayment.current) {
        setTimeout(() => {
          setIsLoading(false);
          setPaymentError("");
          isNavigatingToPayment.current = false;
          if (typeof window !== "undefined") {
            sessionStorage.removeItem("navigating_to_payment");
          }
        }, 100);
      }
    };

    window.addEventListener("pageshow", handlePageShow);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cartData = localStorage.getItem("vaccineCart");

      if (cartData && cartData !== "[]") {
        clearCart();

        localStorage.setItem("cart_cleared", "true");
      }
    }

    const handleBeforeUnload = (event) => {
      if (!sessionStorage.getItem("booking_success")) {
        const message =
          "Your booking is complete! Please click 'Done' to continue.";
        event.returnValue = message;
        return message;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    if (
      typeof window !== "undefined" &&
      !sessionStorage.getItem("showing_confirmation")
    ) {
      sessionStorage.setItem("showing_confirmation", "true");
      localStorage.setItem("booking_success", "true");
      sessionStorage.setItem("in_booking_process", "true");
    }

    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: randomInRange(0, 0.2) },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: randomInRange(0, 0.2) },
      });
    }, 250);

    return () => {
      clearInterval(interval);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleClose = (e) => {
    if (e) e.preventDefault();

    if (
      typeof window !== "undefined" &&
      !localStorage.getItem("cart_cleared")
    ) {
      clearCart();
      localStorage.setItem("cart_cleared", "true");
    }

    if (typeof window !== "undefined") {
      sessionStorage.setItem("booking_success", "true");
      sessionStorage.setItem("booking_completed", "true");
    }
    if (onClose) onClose();
  };

  const displayDate = selectedDate || "19 Apr, 2025";

  let displayTime = selectedTime || "10:15";
  if (selectedTime) {
    const timeParts = selectedTime.split(":");
    const hour = parseInt(timeParts[0], 10);
    const minute = timeParts[1];
    const period = hour >= 12 ? "" : "";
    const hour12 = hour % 12 || 12;
    displayTime = `${hour12}:${minute} ${period}`;
  } else {
    displayTime = "10:15 AM";
  }

  const handlePayment = async () => {
    setIsLoading(true);
    setPaymentError("");
    isNavigatingToPayment.current = true;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const response = await fetch(
        "https://7n0wver1gl.execute-api.eu-west-2.amazonaws.com/dev/checkout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bookingId: bookingId,
            bookingDate: bookingDate,
            returnUrl: window.location.href,
          }),
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(
          `Server error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      const { sessionUrl } = data;

      if (sessionUrl) {
        // Store that we're navigating to payment
        if (typeof window !== "undefined") {
          sessionStorage.setItem("navigating_to_payment", "true");
        }
        window.location.href = sessionUrl;
      } else {
        throw new Error("No checkout URL returned from server");
      }
    } catch (error) {
      console.error("Payment processing error:", error);
      setIsLoading(false);
      isNavigatingToPayment.current = false;

      let errorMessage = "Failed to initiate payment. Please try again.";

      if (error.name === "AbortError") {
        errorMessage =
          "Payment request timed out. Please check your connection and try again.";
      } else if (error.message.includes("Server error")) {
        errorMessage =
          "Server error occurred. Please try again or contact support.";
      } else if (error.message.includes("Failed to fetch")) {
        errorMessage = "Network error. Please check your internet connection.";
      } else if (error.message) {
        errorMessage = error.message;
      }

      setPaymentError(errorMessage);

      // Show alert as fallback
      alert(errorMessage);
    }
  };

  return (
    <div className="p-6 text-center w-full lg:w-1/2 xl:w-1/2 mx-auto">
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full p-1 transition-colors"
      >
        <X size={18} />
      </button>

      {/* Payment Error Message */}
      {paymentError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm"
        >
          <p className="font-medium">Payment Error</p>
          <p className="mt-1">{paymentError}</p>
        </motion.div>
      )}

      {/* Success animation */}
      <div className="relative w-24 h-24 mx-auto mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2,
          }}
          className="absolute inset-0 bg-gradient-to-r from-[#00ACC1] to-[#0097A7] rounded-full flex items-center justify-center shadow-lg"
        >
          <Check className="h-12 w-12 text-white" />
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute"
          style={{
            width: "150px",
            height: "150px",
            top: "-38px",
            left: "-38px",
          }}
        >
          {/* Yellow triangle */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="absolute top-0 left-1/2 w-4 h-4"
          >
            <div className="w-0 h-0 border-l-[8px] border-l-transparent border-b-[16px] border-b-yellow-400 border-r-[8px] border-r-transparent" />
          </motion.div>

          {/* Red circle */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="absolute top-1/2 left-0 w-3 h-3 bg-red-500 rounded-full"
          />

          {/* Blue circle */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute bottom-0 left-1/2 w-3 h-3 bg-blue-500 rounded-full"
          />

          {/* Orange square */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="absolute top-1/2 right-0 w-3 h-3 bg-orange-500 rounded-sm rotate-45"
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-[#E18180] font-medium text-lg mb-2">
          Booking Confirmed!
        </h3>

        <h2 className="text-xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          {serviceName}
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-gradient-to-r from-[#E8F5F7] to-[#F0F9FA] p-4 rounded-xl mb-6"
      >
        <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200">
          <div className="flex items-center text-gray-600">
            <Calendar size={16} className="mr-2 text-[#00ACC1]" />
            <span className="text-sm">Appointment Date</span>
          </div>
          <span className="text-sm font-medium">{displayDate}</span>
        </div>

        <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200">
          <div className="flex items-center text-gray-600">
            <Clock size={16} className="mr-2 text-[#00ACC1]" />
            <span className="text-sm">Appointment Time</span>
          </div>
          <span className="text-sm font-medium">{displayTime}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2 text-[#00ACC1]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
              />
            </svg>
            <span className="text-sm">Appointment ID</span>
          </div>
          <span className="text-sm font-medium">{appointmentId}</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center"
      >
        <p className="text-xs text-gray-500 mb-6">
          A confirmation has been sent to your mobile number. Please arrive 10
          minutes before your appointment time.
        </p>

        <div className="space-y-3">
          {shouldShowPaymentActions ? (
            <>
              <motion.button
                whileHover={!isLoading ? { scale: 1.02, y: -1 } : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
                disabled={isLoading}
                onClick={async (e) => {
                  setIsLoading(true);
                  try {
                    await handlePayment();
                  } catch (error) {
                    console.error(
                      "Error during payment or post-payment logic:",
                      error
                    );
                    setIsLoading(false);
                  }
                }}
                className={`w-full py-3 rounded-xl font-medium transition-all duration-300 shadow-md ${isLoading
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-gradient-to-r from-[#00ACC1] to-[#0097A7] hover:from-[#0097A7] hover:to-[#00ACC1] text-white hover:shadow-lg"
                  }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Pay Now"
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  if (typeof window !== "undefined") {
                    sessionStorage.setItem("booking_success", "true");
                    sessionStorage.setItem("booking_completed", "true");
                    sessionStorage.removeItem("in_booking_process");
                    localStorage.setItem("cart_cleared", "true");
                  }

                  handleClose(e);

                  setTimeout(() => {
                    window.location.href = "/vaccines";
                  }, 100);
                }}
                className="w-full py-3 bg-gradient-to-r from-[#00ACC1] to-[#0097A7] hover:from-[#0097A7] hover:to-[#00ACC1] text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-300"
              >
                Pay later
              </motion.button>
            </>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                if (typeof window !== "undefined") {
                  sessionStorage.setItem("booking_success", "true");
                  sessionStorage.setItem("booking_completed", "true");
                  sessionStorage.removeItem("in_booking_process");
                  localStorage.setItem("cart_cleared", "true");
                }

                handleClose(e);

                setTimeout(() => {
                  window.location.href = "/";
                }, 100);
              }}
              className="w-full py-3 bg-gradient-to-r from-[#00ACC1] to-[#0097A7] hover:from-[#0097A7] hover:to-[#00ACC1] text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-300"
            >
              Done
            </motion.button>
          )}

          <motion.button
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => {
              // Set the completion flag first
              if (typeof window !== "undefined") {
                sessionStorage.setItem("booking_success", "true");
                sessionStorage.setItem("booking_completed", "true");
                // Clear the booking process flag since we're done
                sessionStorage.removeItem("in_booking_process");
                // Also set cart_cleared to prevent multiple clearCart calls
                localStorage.setItem("cart_cleared", "true");
              }

              // Handle close without clearing cart again
              handleClose(e);

              // Redirect to vaccines page with short delay to ensure state updates
              setTimeout(() => {
                window.location.href = "/";
              }, 100);
            }}
            className="w-full py-3 border border-[#00ACC1] text-[#00ACC1] bg-white hover:bg-[#E8F5F7] rounded-xl font-medium transition-colors duration-300"
          >
            Book Another Appointment
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
