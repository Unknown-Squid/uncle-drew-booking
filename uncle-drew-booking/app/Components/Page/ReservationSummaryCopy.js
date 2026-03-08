import React, { useEffect, useState } from 'react'

const ReservationSummaryCopy = ({ 
    addOnsList, 
    bookingType, 
    bookingDate, 
    startIdx,
    endIdx, 
    startTime,
    endTime,
    bookingSetup,
    duration,
    total,
    total2,
    downPayment,

    withoutLightDuration,
    withLightDuration,
    withoutLightComputation,
    withLightComputation,
    totalComputation
}) => {
  return (
    <div className="w-[100%] h-fit bg-white rounded-[10px] px-6 py-4 mt-20">

        <h2 className="text-[var(--text-dark-blue)] text-[20px] border-b border-[var(--border-gray)] mt-5">Reservation Summary</h2>

        <div className="flex flex-col gap-2 h-fit w-full mt-7">

            {bookingType ? 
                <p className="h-fit w-full flex justify-between">
                    <span className="text-[var(--text-gray)]">Type</span>
                    <span className="text-[var(--text-black)]">{bookingType}</span>
                </p> : null
            }
            {bookingType && bookingDate ? 
                <p className="h-fit w-full flex justify-between">
                    <span className="text-[var(--text-gray)]">Date</span>
                    <span className="text-[var(--text-black)]">{bookingDate}</span>
                </p> : null
            }
            {startIdx <= 6 && endIdx > 6 && bookingSetup == "Without Lights" ?
                <div className='flex flex-col w-full'>
                    {bookingType && startTime != "0:00" ? 
                        <p className="flex-1 flex justify-between">
                            <span className="text-[var(--text-gray)]">Start Time</span>
                            <span className="text-[var(--text-black)]">{startTime}</span>
                        </p> : null
                    }
                    {bookingType && endTime != "0:00" ? 
                        <p className="flex-1 flex justify-between">
                            <span className="text-[var(--text-gray)]">End Time</span>
                            <span className="text-[var(--text-black)]">3:00 pm</span>
                        </p> : null
                    }
                    {bookingType && startTime && endTime ? 
                        <p className="flex-1 flex justify-between">
                            <span className="text-[var(--text-gray)]">Duration</span>
                            <span className="text-[var(--text-black)]">{withoutLightDuration} {withoutLightDuration > 1?  "hours" : "hour"}</span>
                        </p> : null
                    }
                    {bookingSetup ? 
                        <p className="flex-1 flex justify-between">
                            <span className="text-[var(--text-gray)]">Setup</span>
                            <span className="text-[var(--text-black)]">Without Lights (1,000 php/hr)</span>
                        </p> : null
                    }
                    {bookingSetup ? 
                        <p className="flex-1 flex justify-between pt-2 mt-4 mb-4 border-t border-[var(--border-gray)]">
                            <span className="text-[var(--text-black)]">Without Light Rate Computation</span>
                            <span className="text-[var(--text-blue)]">&#8369; {withoutLightComputation}</span>
                        </p> : null
                    }
                    
                    {bookingType && startTime != "0:00" ? 
                        <p className="flex-1 flex justify-between">
                            <span className="text-[var(--text-gray)]">Start Time</span>
                            <span className="text-[var(--text-black)]">3:00 pm</span>
                        </p> : null
                    }
                    {bookingType && endTime != "0:00" ? 
                        <p className="flex-1 flex justify-between">
                            <span className="text-[var(--text-gray)]">End Time</span>
                            <span className="text-[var(--text-black)]">{endTime}</span>
                        </p> : null
                    }
                    {bookingType && startTime && endTime ? 
                        <p className="flex-1 flex justify-between">
                            <span className="text-[var(--text-gray)]">Duration</span>
                            <span className="text-[var(--text-black)]">{withLightDuration} {withLightDuration > 1?  "hours" : "hour"}</span>
                        </p> : null
                    }
                    {bookingSetup ? 
                        <p className="flex-1 flex justify-between">
                            <span className="text-[var(--text-gray)]">Setup</span>
                            <span className="text-[var(--text-black)]">With Lights (1,400 php/hr)</span>
                        </p> : null
                    }
                    {bookingSetup ? 
                        <p className="flex-1 flex justify-between pt-2 mt-4 border-t border-[var(--border-gray)]">
                            <span className="text-[var(--text-black)]">With Light Rate Computation</span>
                            <span className="text-[var(--text-blue)]">&#8369; {withLightComputation}</span>
                        </p> : null
                    }
                </div>
                 :
                 <div className='flex flex-col w-full'>
                    {bookingType && startTime != "0:00" ? 
                        <p className="flex-1 flex justify-between">
                            <span className="text-[var(--text-gray)]">Start Time</span>
                            <span className="text-[var(--text-black)]">{startTime}</span>
                        </p> : null
                    }
                    {bookingType && endTime != "0:00" ? 
                        <p className="flex-1 flex justify-between">
                            <span className="text-[var(--text-gray)]">End Time</span>
                            <span className="text-[var(--text-black)]">{endTime}</span>
                        </p> : null
                    }
                    {bookingType && startTime && endTime ? 
                        <p className="flex-1 flex justify-between">
                            <span className="text-[var(--text-gray)]">Duration</span>
                            <span className="text-[var(--text-black)]">{duration} {duration > 1?  "hours" : "hour"}</span>
                        </p> : null
                    }
                    {bookingSetup ? 
                        <p className="flex-1 flex justify-between">
                            <span className="text-[var(--text-gray)]">Setup</span>
                            <span className="text-[var(--text-black)]">{bookingSetup}</span>
                        </p> : null
                    }
                </div>
            }
        </div>

        {totalComputation ?
            <p className="w-full h-fit flex justify-between py-5 mt-5 border-b border-[var(--border-gray)]">
                <span className="text-[var(--text-black)]">Total Computation</span>
                <span className="text-[var(--text-blue)]">&#8369; {totalComputation}</span>
            </p> : total ?
            <p className="w-full h-fit flex justify-between py-5 mt-5 border-b border-[var(--border-gray)]">
                <span className="text-[var(--text-black)]">Total Computation</span>
                <span className="text-[var(--text-blue)]">&#8369; {total}</span>
            </p> : null
        }
    

        {addOnsList && addOnsList.some(addOn => addOn.hours > 0) && (
            <div className="py-7 flex flex-col gap-3 border-b border-[var(--border-gray)]">
                <p className="text-[var(--text-dark-blue)] flex w-full justify-between">
                    <span>Additional</span>
                    <span>Duration</span>
                </p>

                {addOnsList
                .filter(addOn => addOn.hours > 0)
                .map((addOn, index) => (
                    <div key={index} className="flex justify-between gap-2">
                    <span className="text-[var(--text-gray)]">{addOn.label}</span>
                    <span className="text-[var(--text-black)]">
                        {addOn.hours} {addOn.hours > 1?  "hours" : "hour"}
                    </span>
                    </div>
                ))}

                <div className="flex justify-between mt-5">
                <span className="text-[var(--text-black)]">Total</span>
                <span className="text-[var(--text-blue)]">&#8369; {total2}</span>
                </div>
            </div>
        )}



        {total ? 

            <div className="flex flex-col py-5 border-b border-[var(--border-gray)]">
                <p className="text-[var(--text-dark-blue)] mb-5">Price Summary</p>

                <div className="flex flex-col gap-2">
                    <p className="flex-1 flex justify-between">
                        <span className="text-[var(--text-black)]">Reservation</span>
                        <span className="text-[var(--text-blue)]">&#8369; {totalComputation ? totalComputation : total}</span>
                    </p>

                    <p className="flex-1 flex justify-between">
                        <span className="text-[var(--text-black)]">Additional</span>
                        <span className="text-[var(--text-blue)]">&#8369; {total2}</span>
                    </p>
                </div>

            </div>
            : null
        }

        {total ? 
            <p className="flex-1 flex justify-between py-5 text-[var(--text-green)] font-pBold text-[25px]">
                <span>Total Price</span>
                <span>&#8369; {totalComputation ? totalComputation + total2 : total + total2}</span>
            </p> : null
        }
{/* 
        {bookingType ? 
            <PrimaryButton
                background={"var(--text-blue)"} 
                label={"Continue"} 
                color={"var(--text-white)"} 
                border={"1px solid var(--text-blue)"}
                handleClick={() => setActiveForms(2)}
            /> 
            : null

        } */}


        {downPayment ? 
            <p className="flex-1 flex justify-between py-5 text-[var(--text-dark-blue)] font-pBold text-[25px]">
                <span>Down Payment</span>
                <span>&#8369; {downPayment}</span>
            </p> : null
        }

    </div>
  )
}

export default ReservationSummaryCopy
