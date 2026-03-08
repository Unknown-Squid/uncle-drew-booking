import React, { useEffect, useState } from 'react';

const TimeFieldModal = ({ isShow, timeItems, handleBookingTime, label, startIdx, bookingType}) => {
  
  const [skipStartTime, setSkipStartTime] = useState();
  const slotCount = bookingType === "Sport Activities" ? 2 : 4;

  useEffect(() => {
    if (bookingType) {
      setSkipStartTime(timeItems.length - slotCount);
    }
  }, [bookingType])
  return (
    <div className={`${isShow ? "grid" : "hidden"} grid-cols-3 absolute top-[110%] left-0 w-full rounded-[10px] bg-white p-4 shadow-lg flex-wrap gap-2 z-10`}>
      {timeItems.map(({ label: timeLabel, disabled }, idx) => {
        // Define skip logic
        const shouldSkip = label === "Start Time"
          ? idx >= skipStartTime
          : idx === 0 || idx === 1 || startIdx ? idx < startIdx + slotCount : null;

        if (shouldSkip) return null;

        return (
          <button
            key={idx}
            className={`font-pMedium 2xl:text-[13px] text-[15px] cursor-pointer text-[var(--text-black)] 2xl:px-4 px-2 py-2 rounded text-nowrap ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"}`}
            onClick={() => !disabled && handleBookingTime(idx, label)}
            disabled={disabled}
          >
            {timeLabel}
          </button>
        );
      })}
    </div>
  );
};

export default TimeFieldModal;
