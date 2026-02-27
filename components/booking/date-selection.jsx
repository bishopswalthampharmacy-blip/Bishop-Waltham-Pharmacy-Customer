"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"

export default function DateSelection({ onDateSelect, loading = false }) {
  // Normalize today
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Current month (default: today’s month)
  const [currentMonth, setCurrentMonth] = useState(new Date(today))

  // ✅ Selected date (default: today)
  const [selectedDate, setSelectedDate] = useState(new Date(today))

  // Generate calendar data
  const generateCalendarData = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()

    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)

    const firstDayOfWeek = firstDay.getDay()
    const daysFromPrevMonth = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1

    const calendarDays = []

    // Previous month days
    const prevMonth = new Date(year, month, 0)
    const prevMonthDays = prevMonth.getDate()

    for (let i = prevMonthDays - daysFromPrevMonth + 1; i <= prevMonthDays; i++) {
      calendarDays.push({
        date: new Date(year, month - 1, i),
        isCurrentMonth: false,
      })
    }

    // Current month days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      calendarDays.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      })
    }

    // Next month days
    const remainingDays = 42 - calendarDays.length
    for (let i = 1; i <= remainingDays; i++) {
      calendarDays.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      })
    }

    return calendarDays
  }

  const calendarDays = generateCalendarData(currentMonth)

  const monthYearFormat = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  })

  const goToPrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const isSelectable = (date) => date >= today

  const handleDateClick = (date) => {
    if (!isSelectable(date)) return
    setSelectedDate(date)
    onDateSelect?.(date)
  }

  return (
    <div className="p-6 pt-2">
      <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100 max-w-[360px] mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={goToPrevMonth}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronLeft size={20} />
          </button>

          <h4 className="text-base font-semibold flex items-center">
            <Calendar size={18} className="mr-2 text-[#00ACC1]" />
            {monthYearFormat.format(currentMonth)}
          </h4>

          <button
            onClick={goToNextMonth}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Weekdays */}
        <div className="grid grid-cols-7 text-center text-xs font-medium text-gray-500 mb-2">
          <div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div><div>S</div>
        </div>

        {/* Calendar */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => {
            const isToday = day.date.getTime() === today.getTime()
            const isSelected = day.date.getTime() === selectedDate.getTime()

            return (
              <motion.button
                key={index}
                whileHover={isSelectable(day.date) ? { scale: 1.08 } : {}}
                whileTap={isSelectable(day.date) ? { scale: 0.95 } : {}}
                onClick={() => handleDateClick(day.date)}
                disabled={!isSelectable(day.date)}
                className={`
                  h-10 w-10 rounded-full flex items-center justify-center text-sm
                  ${!day.isCurrentMonth ? "text-gray-300" : "text-gray-700"}
                  ${!isSelectable(day.date) ? "opacity-40 cursor-not-allowed" : ""}
                  ${isSelected ? "bg-[#00ACC1] text-white font-semibold" : ""}
                  ${isToday && !isSelected ? "border-2 border-[#00ACC1] text-[#00ACC1]" : ""}
                  ${
                    day.isCurrentMonth && isSelectable(day.date) && !isSelected
                      ? "hover:bg-[#00ACC1] hover:text-white"
                      : ""
                  }
                  transition-all
                `}
              >
                {day.date.getDate()}
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Select Button */}
      <div className="mt-6 max-w-[380px] mx-auto">
        <motion.button
          whileHover={{ scale: loading ? 1 : 1.03 }}
          whileTap={{ scale: loading ? 1 : 0.97 }}
          onClick={() => handleDateClick(selectedDate)}
          disabled={loading}
          className="w-full bg-gradient-to-r from-[#00ACC1] to-[#0097A7] text-white py-3 rounded-lg font-semibold flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading Slots...
            </>
          ) : (
            <>
              Select Time Slot <ChevronRight size={16} className="ml-2" />
            </>
          )}
        </motion.button>
      </div>
    </div>
  )
}
