"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

const CalendarHeader = ({ setBookingDate }) => {
  const now = new Date();
  const systemDay = now.getDate();
  const systemMonth = now.getMonth();
  const systemYear = now.getFullYear();

  // Track exactly one selected month+day
  const [selectedMonth, setSelectedMonth] = useState(systemMonth);
  const [selectedDay, setSelectedDay] = useState(systemDay);

  const [currentMonth, setCurrentMonth] = useState(systemMonth);
  const [currentYear] = useState(systemYear);
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const adjustedFirstDay = (firstDayOfMonth + 6) % 7; // Monday=0

  const monthNames = useMemo(() => [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ], []);

  const dayNames = ["Mo","Tu","We","Th","Fr","Sa","Su"];
  const pickerRef = useRef(null);

  useEffect(() => {
    setBookingDate(monthNames[currentMonth] + " " + selectedDay + ", " + currentYear)
  }, [selectedDay, currentMonth, currentYear, monthNames, setBookingDate])

  // Hide month picker on outside click
  useEffect(() => {
    const onClickOutside = e => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setShowMonthPicker(false);
      }
    };
    if (showMonthPicker) document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [showMonthPicker]);

  const handleDayClick = day => {
    setSelectedMonth(currentMonth);
    setSelectedDay(day);
  };

  const handlePrev = () => {
    if (currentMonth > systemMonth) {
      setCurrentMonth(m => m - 1);
    }
  };

  const handleNext = () => {
    if (currentMonth < 11) {
      setCurrentMonth(m => m + 1);
    }
  };


  const totalCells = 42;

  return (
    <div className="flex flex-col gap-5 items-center bg-white rounded-[10px] p-8">
      {/* Month Header */}
      <div className="w-[98%] relative border-b border-[var(--border-gray)] pb-3" ref={pickerRef}>
        <div className="flex justify-between items-center p-2">
          <button
            onClick={handlePrev}
            disabled={currentMonth <= systemMonth}
            className="p-2 rounded-[10px] text-[10px] text-[var(--text-gray)]"
            style={{
              boxShadow: "0 0 8px rgba(0,0,0,0.1)",
              opacity: currentMonth <= systemMonth ? 0.5 : 1,
              cursor: currentMonth <= systemMonth ? "not-allowed" : "pointer"
            }}
          >
            <KeyboardArrowLeft />
          </button>
          <div className="flex items-center gap-1 text-[var(--text-black)] font-pMedium">
            <button onClick={() => setShowMonthPicker(v => !v)} className="cursor-pointer">
              {monthNames[currentMonth]}
            </button>
            <span>{currentYear}</span>
          </div>
          <button
            onClick={handleNext}
            disabled={currentMonth >= 11}
            className="p-2 rounded-[10px] text-[10px] text-[var(--text-gray)] cursor-pointer"
            style={{ boxShadow: "0 0 8px rgba(0,0,0,0.1)" }}
          >
            <KeyboardArrowRight />
          </button>
        </div>

        {/* Month Picker */}
        {showMonthPicker && (
          <div className="absolute top-[110%] left-0 w-full flex justify-center">
            <div className="grid grid-cols-3 gap-2 p-2 bg-white border rounded shadow z-10 w-[98%] shadow-lg">
              {monthNames.map((m, i) => {
                const disabled = i < systemMonth;
                return (
                  <button
                    key={i}
                    onClick={() => {
                      if (!disabled) {
                        setCurrentMonth(i);
                        setShowMonthPicker(false);
                      }
                    }}
                    disabled={disabled}
                    className={`py-1 rounded font-pMedium ${
                      currentMonth === i
                        ? "bg-emerald-300 font-bold"
                        : disabled
                        ? "text-[var(--text-gray)]/[.5] cursor-not-allowed"
                        : "hover:bg-gray-100 cursor-pointer text-[var(--text-black)]"
                    }`}
                  >
                    {m}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Day Names */}
      <div className="grid grid-cols-7 w-[98%] p-2">
        {dayNames.map((d, i) => (
          <div key={i} className="text-center text-gray-500 font-pMedium">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 w-[98%] gap-2 p-2">
        {/* Previous Month */}
        {Array.from({ length: adjustedFirstDay }).map((_, i) => {
          const prevLast = new Date(currentYear, currentMonth, 0).getDate();
          const d = prevLast - adjustedFirstDay + i + 1;
          return (
            <div 
                key={`p${i}`} 
                className="text-center text-gray-400 font-pMedium"
                style={{
                    cursor: "not-allowed"
                }}
            >
              {d}
            </div>
          );
        })}

        {/* Current Month */}
        {Array.from({ length: daysInMonth }).map((_, idx) => {
          const day = idx + 1;
          const disabled =
            currentYear === systemYear &&
            currentMonth === systemMonth &&
            day < systemDay;
          const selected =
            currentMonth === selectedMonth && day === selectedDay;

          return (
            <div
              key={day}
              onClick={() => !disabled && handleDayClick(day)}
              className={`text-center py-1 rounded cursor-pointer font-pMedium ${
                disabled
                  ? "text-gray-400 cursor-not-allowed"
                  : selected
                  ? "bg-emerald-300/[0.5] text-blue-600 border border-emerald-300"
                  : "hover:bg-gray-100 text-black"
              }`}
              style={{
                cursor: disabled ? "not-allowed" : "pointer"
              }}
            >
              {day}
            </div>
          );
        })}

        {/* Next Month */}
        {Array.from({
          length: totalCells - (adjustedFirstDay + daysInMonth),
        }).map((_, i) => (
          <div 
            key={`n${i}`} 
            className="text-center text-gray-400 font-pMedium"
            style={{
                cursor: "not-allowed"
            }}
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarHeader;
