import React from 'react'

const BookingType = ({ bookingType, handleBookingType }) => {
  return (
    <div className="w-[100%] h-fit flex flex-col gap-5 mt-10">
        <h2 className="text-[var(--text-dark-blue)] md:text-[25px] text-[3.5vw] font-psBold">Choose how you want to use the place</h2>

        <div className="flex flex-1 gap-5 mt-3">

            <button
                type="button"
                className="flex h-fit w-full sm:p-8 p-4 justify-between items-center bg-white rounded-[10px] cursor-pointer"
                style={{
                    boxShadow: bookingType == "Sport Activities" ? "0px 0px 4px rgba(0, 0, 0, 0.04), 0px 8px 16px rgba(0, 0, 0, 0.08)" : ""
                }}
                onClick={() => handleBookingType("Sport Activities")}
            >
                <p className="text-[var(--text-black)] font-iBold md:text-[25px] text-[2.5vw]">Sport Activities</p>

                <input 
                    type="radio" 
                    value="Sport Activities" 
                    checked={bookingType == "Sport Activities"} 
                    className="cursor-pointer w-[25px] h-[25px]"
                    onChange={() => {}}
                />
            </button>

            <button
                type="button"
                className="flex h-fit w-full sm:p-8 p-4 justify-between items-center bg-white rounded-[10px] cursor-pointer"
                style={{
                    boxShadow: bookingType == "Event/Gatherings" ? "0px 0px 4px rgba(0, 0, 0, 0.04), 0px 8px 16px rgba(0, 0, 0, 0.08)" : ""
                }}
                onClick={() => handleBookingType("Event/Gatherings")} 
            >
                <p className="text-[var(--text-black)] font-iBold md:text-[25px] text-[2.5vw]">Event/Gatherings</p>

                <input 
                    type="radio" 
                    value="Event/Gatherings" 
                    checked={bookingType == "Event/Gatherings"} 
                    className="cursor-pointer w-[25px] h-[25px]"
                    onChange={() => {}}
                />
            </button>

        </div>
    </div>
  )
}

export default BookingType
