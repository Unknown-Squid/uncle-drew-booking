"use client"
import React, { useState, useRef, useEffect } from 'react'
import TimeFieldModal from '../Modal/TimeFieldModal'

const TimeField = ({ label, timeItems, timeFieldValue, handleBookingTime, startIdx, bookingType, disabled}) => {
  const [showTimeFieldModal, setShowTimeFieldModal] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowTimeFieldModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`w-full h-fit flex flex-col relative ${disabled  ? "cursor-not-allowed  " : "cursor-pointer"}`}
      onClick={disabled ? null : () => setShowTimeFieldModal(prev => !prev)}
    >
      <p className="text-[var(--text-black)] font-pMedium">{label}</p>
      <p className={`h-fit px-6 py-4 flex justify-between ${disabled ? "text-gray-400" : "bg-white/[.5]"} rounded-[10px] 
        border border-[var(--border-light-gray)] text-[var(--text-black)] font-pMedium`}>
        {timeFieldValue}
        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_41_8)">
            <path d="M13.6519 11.6858L10.8824 9.60867V5.37748C10.8824 4.95204 10.5385 4.60815 10.1131 4.60815C9.68764 4.60815 9.34375 4.95204 9.34375 5.37748V9.99337C9.34375 10.2357 9.45762 10.4642 9.65148 10.6088L12.7287 12.9168C12.8672 13.0206 13.0288 13.0706 13.1895 13.0706C13.4242 13.0706 13.655 12.9652 13.8058 12.7621C14.0612 12.4228 13.992 11.9405 13.6519 11.6858Z" fill="black"/>
            <path d="M10.1135 0C4.63672 0 0.181641 4.45508 0.181641 9.93182C0.181641 15.4086 4.63672 19.8636 10.1135 19.8636C15.5902 19.8636 20.0453 15.4086 20.0453 9.93182C20.0453 4.45508 15.5902 0 10.1135 0ZM10.1135 18.325C5.48605 18.325 1.72026 14.5592 1.72026 9.93182C1.72026 5.30441 5.48605 1.53862 10.1135 1.53862C14.7416 1.53862 18.5067 5.30441 18.5067 9.93182C18.5067 14.5592 14.7409 18.325 10.1135 18.325Z" fill="black"/>
          </g>
          <defs>
            <clipPath id="clip0_41_8">
              <rect width="19.8636" height="19.8636" fill="white" transform="translate(0.181641)"/>
            </clipPath>
          </defs>
        </svg>
      </p>

      <TimeFieldModal
        isShow={showTimeFieldModal}
        timeItems={timeItems}
        handleBookingTime={handleBookingTime}
        label={label}
        startIdx={startIdx}
        bookingType={bookingType}
      />
    </div>
  );
};

export default TimeField;
