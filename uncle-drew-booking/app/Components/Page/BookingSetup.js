import React from 'react';

const BookingSetup = ({ startTimeIndex, bookingSetup, handleBookingSetup, setupOptions, isShow }) => {
  return (
    <div className={`w-[100%] h-fit ${isShow ? "flex" : "hidden"} flex-col gap-5 mt-8`}>
      <h2 className="text-[var(--text-dark-blue)] md:text-[25px] text-[3.5vw] font-psBold">Choose Setup</h2>

      <div className="flex md:flex-row flex-col h-fit w-full gap-5 mt-3">
        {setupOptions.map((option, index) => {
          let isDisabled = index == 0 && startTimeIndex > 6

          return (
            <button
              key={index}
              type="button"
              className={`flex flex-1 px-8 py-4 justify-between items-center bg-white rounded-[10px] ${
                isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              }`}
              style={{
                boxShadow: bookingSetup === option.label &&  !isDisabled? 
                  '0px 0px 4px rgba(0, 0, 0, 0.04), 0px 8px 16px rgba(0, 0, 0, 0.08)' : null,
              }}
              onClick={() => {
                if (!isDisabled) handleBookingSetup(option.label);
              }}
              disabled={isDisabled}
            >
              <div className="flex flex-col items-start">
                <p className="text-[var(--text-black)] font-iBold text-[18px]">{option.label}</p>
                <p className="text-[var(--text-blue)] font-iRegular text-[14px]">{option.price} php/hour</p>
              </div>

              <input
                type="radio"
                value={option.label}
                checked={bookingSetup === option.label}
                disabled={isDisabled}
                className={`w-[15px] h-[15px] ${
                    isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                  }`}
                onChange={() => {}}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BookingSetup;
