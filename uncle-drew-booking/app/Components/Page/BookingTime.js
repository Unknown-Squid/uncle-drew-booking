import React from 'react'

const BookingTime = ({ startIdx, endIdx, timeItems, handleBookingTime }) => {
  return (
    <div className="grid grid-cols-4 gap-5 flex-1 mb-7 font-pMedium">
        {timeItems.map(({ label, disabled }, idx) => {
            // is this inside your selected [startIdx..endIdx]?
            const isSelected =
            startIdx !== null &&
            endIdx   !== null &&
            idx >= startIdx &&
            idx <= endIdx;

            // base styling
            let classes =
            "px-4 py-4 rounded-[10px] text-center transition ";

            if (disabled) {
            classes += "bg-gray-200 text-gray-400 cursor-not-allowed";
            } else if (isSelected) {
            classes += "bg-[var(--text-blue)] text-white cursor-text";
            } else {
            classes +=
                "bg-[var(--text-blue)]/[0.2] text-[var(--text-blue)] cursor-text";
            }

            return (
            <button
                key={label}
                disabled={true}
                className={classes}
                onClick={() => handleBookingTime(idx)}
            >
                {label}
            </button>
            );
        })}
    </div>
  )
}

export default BookingTime
