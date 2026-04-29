"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronDown, Stethoscope, Syringe, ArrowRight, Pill, Ear } from "lucide-react"

export default function AppointmentTypeSelector({
  value = "consultation",
  onChange,
  consultancyValue = "Travel Clinic",
  onConsultancyChange,
  earMicrosuctionValue = "",
  onEarMicrosuctionChange,
  onSelectionComplete,
  consultancyTypes = [
    { value: 'Travel Clinic', label: 'Travel Clinic' },
    { value: 'Ear Microsuction', label: 'Ear Microsuction' },
    { value: 'Weight Loss', label: 'Weight Loss' }
  ],
  earMicrosuctionTypes = [
    { value: 'One Ear', label: 'One Ear', price: 40 },
    { value: 'Both Ears', label: 'Both Ears', price: 50 }
  ],
  showConsultancy = false,
  hideVaccinationOption = false,
  loading = false
}) {
  const [focused, setFocused] = useState(false)
  const [consultancyFocused, setConsultancyFocused] = useState(false)
  const [error, setError] = useState("")
  const [consultancyError, setConsultancyError] = useState("")
  const [earMicrosuctionError, setEarMicrosuctionError] = useState("")
  const [isConsultancyOpen, setIsConsultancyOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const appointmentOptions = [
    { value: "consultation", label: "Consultation", icon: <Stethoscope size={16} className="mr-2" /> },
    { value: "vaccination", label: "Vaccination", icon: <Syringe size={16} className="mr-2" /> },
    { value: "weight-loss", label: "Weight Loss", icon: <Pill size={16} className="mr-2" /> },
    { value: "ear-microsuction", label: "Ear Microsuction", icon: <Ear size={16} className="mr-2" /> },
  ]

  useEffect(() => {
    if (consultancyTypes.length > 0 && !consultancyValue) {
      onConsultancyChange('Travel Clinic')
    }
  }, [])

  useEffect(() => {
    if (value === "consultation" && consultancyTypes.length > 0 && !consultancyValue) {
      onConsultancyChange(consultancyTypes[0].value)
    }
  }, [value, consultancyTypes])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isConsultancyOpen && !event.target.closest('.dropdown-container')) {
        setIsConsultancyOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isConsultancyOpen])

  const handleChange = (selectedValue) => {
    onChange(selectedValue)
    if (error) setError("")
    if (selectedValue !== "consultation") {
      onConsultancyChange("")
      setConsultancyError("")
    }
    if (selectedValue !== "ear-microsuction") {
      onEarMicrosuctionChange("")
      setEarMicrosuctionError("")
    }
  }

  const handleConsultancyChange = (selectedValue) => {
    onConsultancyChange(selectedValue)
    if (consultancyError) setConsultancyError("")
    setIsConsultancyOpen(false)
  }

  const handleEarMicrosuctionChange = (selectedValue) => {
    onEarMicrosuctionChange(selectedValue)
    if (earMicrosuctionError) setEarMicrosuctionError("")
  }

  const validate = () => {
    let isValid = true

    if (!value) {
      setError("Please select an appointment type")
      isValid = false
    } else {
      setError("")
    }

    if (submitted && value === "consultation" && !consultancyValue) {
      setConsultancyError("Please select a consultancy type")
      isValid = false
    } else {
      setConsultancyError("")
    }

    if (submitted && value === "ear-microsuction" && !earMicrosuctionValue) {
      setEarMicrosuctionError("Please select an ear microsuction option")
      isValid = false
    } else {
      setEarMicrosuctionError("")
    }

    return isValid
  }

  const handleSubmit = () => {
    setSubmitted(true)
    if (validate()) {
      if (value === "consultation") {
        onSelectionComplete("consultation", consultancyValue)
      } else if (value === "ear-microsuction") {
        // Pass selected option with price so booking-page can build a cart item
        const selectedOption = earMicrosuctionTypes.find(opt => opt.value === earMicrosuctionValue)
        onSelectionComplete("ear-microsuction", earMicrosuctionValue, selectedOption)
      } else {
        onSelectionComplete(value, "")
      }
    }
  }

  const selectedConsultancy = consultancyTypes.find(opt => opt.value === consultancyValue) ||
    { value: "Travel Clinic", label: "Travel Clinic" }

  const gridColumns = 'grid-cols-1 sm:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 xl:grid-cols-2'

  return (
    <div className="space-y-6 w-full">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
            <Stethoscope size={14} className="mr-1 text-gray-500" />
            Appointment Type*
          </label>

          <motion.div
            animate={{
              boxShadow: focused ? '0 0 0 2px rgba(0, 172, 193, 0.2)' : 'none',
            }}
            className={`rounded-lg overflow-hidden border-transparent`}
          >
            <div className={`grid ${gridColumns} gap-1 p-1 bg-gray-50 rounded-lg border border-gray-100`}>
              {appointmentOptions.map((option) => (
                <motion.button
                  key={option.value}
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleChange(option.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => {
                    setFocused(false)
                    validate()
                  }}
                  disabled={loading}
                  className={`flex items-center justify-center py-3 px-4 rounded-md cursor-pointer transition-colors whitespace-nowrap text-sm ${value === option.value
                      ? 'bg-[#00ACC1] text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  {option.icon}
                  {option.label}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-xs text-red-500 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {error}
            </motion.p>
          )}
        </div>

        {/* Consultancy Type Dropdown */}
        {(value === "consultation" || showConsultancy) && (
          <div className="space-y-2 dropdown-container">
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
              <Stethoscope size={14} className="mr-1 text-gray-500" />
              Consultancy Type*
            </label>

            <div className="relative">
              <motion.button
                type="button"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsConsultancyOpen(!isConsultancyOpen)}
                onFocus={() => setConsultancyFocused(true)}
                onBlur={() => {
                  setConsultancyFocused(false)
                  validate()
                }}
                className={`w-full flex items-center justify-between py-3 px-4 rounded-md border ${consultancyValue ? 'bg-white border-gray-300' : 'bg-gray-50 border-gray-200'
                  } text-left`}
                disabled={loading}
              >
                <div className="flex items-center">
                  <Stethoscope size={16} className="mr-2 text-gray-500" />
                  {selectedConsultancy.label}
                </div>
                <ChevronDown
                  size={16}
                  className={`text-gray-500 transition-transform ${isConsultancyOpen ? 'rotate-180' : ''}`}
                />
              </motion.button>

              {isConsultancyOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute z-50 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200"
                  style={{ maxHeight: '300px', overflowY: 'auto' }}
                >
                  <ul className="py-1">
                    {consultancyTypes.map((option) => (
                      <li key={option.value}>
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleConsultancyChange(option.value)}
                          className={`w-full text-left px-4 py-3 text-sm flex items-center ${consultancyValue === option.value
                              ? 'bg-[#00ACC1] text-white'
                              : 'hover:bg-gray-100 text-gray-700'
                            }`}
                        >
                          {option.label}
                        </motion.button>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>

            {submitted && consultancyError && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 text-xs text-red-500 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                {consultancyError}
              </motion.p>
            )}
          </div>
        )}

        {/* Ear Microsuction — 2 card options with price */}
        {value === "ear-microsuction" && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
              <Ear size={14} className="mr-1 text-gray-500" />
              Select Ear Microsuction Option*
            </label>

            <div className="grid grid-cols-2 gap-3">
              {earMicrosuctionTypes.map((option) => (
                <motion.button
                  key={option.value}
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleEarMicrosuctionChange(option.value)}
                  disabled={loading}
                  className={`flex flex-col items-center justify-center py-5 px-3 rounded-xl border-2 transition-all ${earMicrosuctionValue === option.value
                      ? 'bg-[#00ACC1] border-[#00ACC1] text-white shadow-md'
                      : 'bg-white border-gray-200 text-gray-700 hover:border-[#00ACC1] hover:bg-cyan-50'
                    }`}
                >
                  <Ear size={22} className={`mb-2 ${earMicrosuctionValue === option.value ? 'text-white' : 'text-gray-400'}`} />
                  <span className="text-sm font-semibold">{option.label}</span>
                  <span className={`text-xl font-bold mt-1 ${earMicrosuctionValue === option.value ? 'text-white' : 'text-[#00ACC1]'}`}>
                    £{option.price}
                  </span>
                </motion.button>
              ))}
            </div>

            {submitted && earMicrosuctionError && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 text-xs text-red-500 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                {earMicrosuctionError}
              </motion.p>
            )}
          </div>
        )}
      </div>

      <motion.button
        type="button"
        onClick={handleSubmit}
        whileHover={{ scale: loading ? 1 : 1.01 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
        disabled={loading}
        className={`w-full flex items-center justify-center py-3 px-6 rounded-lg text-white font-medium ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#00ACC1] hover:bg-[#0097A7]'
          } shadow-md transition-colors`}
      >
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading...
          </>
        ) : (
          <>
            Continue
            <ArrowRight size={18} className="ml-2" />
          </>
        )}
      </motion.button>
    </div>
  )
}