import React from 'react'
import Calendar from "../Page/Calendar";
import BookingTime from "../Page/BookingTime";
import AddOns from "../Page/AddOns";
import BookingSetup from "../Page/BookingSetup";
import BookingType from "../Page/BookingType";
import ReservationSummary from "../Page/ReservationSummary";
import TimeField from "../Fields/TimeField";

const Reservation = ({ 
    isActive, 
    bookingType,
    handleBookingType,

    bookingDate,
    setBookingDate,

    timeItems,
    handleBookingTime,
    startTime,
    endTime,
    startIdx,
    endIdx,

    bookingSetup,
    setupOptions,
    handleBookingSetup,

    addOnsList,
    duration,
    setActiveForms,
    handleAddOnsDuration,

    total,
    setTotal,
    total2,

    withoutLightDuration,
    withLightDuration,
    withoutLightComputation,
    withLightComputation,
    totalComputation

}) => {
  return (
    <div className={`${isActive ? "flex" : "hidden"} h-fit w-full flex-col gap-5 items-center mt-7`}>

        <div className="w-[80%] flex flex-col items-center justify-center">

            <h1 className="text-[var(--text-black)] font-psBold sm:text-[32px] text-[6.5vw]">Reservation</h1>
            <p className="text-[var(--text-gray)] font-pMdeium sm:text-[18px] text-[3.5vw] text-center">Secure the perfect time for your event or activity!</p>

        </div>

        <div className="xl:w-[90%] w-[100%] flex xl:flex-row flex-col  h-fit justify-center items-center gap-5">

            <div className="flex flex-col xl:w-[70%] lg:w-[80%] w-[90%] h-fit gap-10">

                <BookingType bookingType={bookingType} handleBookingType={handleBookingType}/>


                <div className={`w-[100%] h-fit ${bookingType ? "flex" : "hidden"} flex-col gap-5 mt-10`}>
                    <h2 className="text-[var(--text-dark-blue)] md:text-[25px] text-[3.5vw] font-psBold">Choose Date & Time</h2>

                    <div className="h-fit w-full flex md:flex-row flex-col gap-5 mt-3">

                        <div className="h-fit md:w-[40%] w-full flex flex-col gap-5">

                            <div className='flex flex-col gap-1 bg-white p-4 rounded-[10px]'>
                                <p className='text-[var(--text-black)] font-pMedium'>Date</p>
                                <p className='w-full h-fit p-4 border border-[var(--border-light-gray)] flex justify-between text-[var(--text-black)] rounded-[10px] font-pMedium'>
                                    {bookingDate}

                                    <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.8 1.5H13.3V3C13.3 3.3 13.05 3.5 12.8 3.5C12.55 3.5 12.3 3.3 12.3 3V1.5H4.3V3C4.3 3.3 4.05 3.5 3.8 3.5C3.55 3.5 3.3 3.3 3.3 3V1.5H1.8C1.05 1.5 0.5 2.15 0.5 3V4.8H16.5V3C16.5 2.15 15.6 1.5 14.8 1.5ZM0.5 5.85V15C0.5 15.9 1.05 16.5 1.85 16.5H14.85C15.65 16.5 16.55 15.85 16.55 15V5.85H0.5ZM4.95 14.25H3.75C3.55 14.25 3.35 14.1 3.35 13.85V12.6C3.35 12.4 3.5 12.2 3.75 12.2H5C5.2 12.2 5.4 12.35 5.4 12.6V13.85C5.35 14.1 5.2 14.25 4.95 14.25ZM4.95 9.75H3.75C3.55 9.75 3.35 9.6 3.35 9.35V8.1C3.35 7.9 3.5 7.7 3.75 7.7H5C5.2 7.7 5.4 7.85 5.4 8.1V9.35C5.35 9.6 5.2 9.75 4.95 9.75ZM8.95 14.25H7.7C7.5 14.25 7.3 14.1 7.3 13.85V12.6C7.3 12.4 7.45 12.2 7.7 12.2H8.95C9.15 12.2 9.35 12.35 9.35 12.6V13.85C9.35 14.1 9.2 14.25 8.95 14.25ZM8.95 9.75H7.7C7.5 9.75 7.3 9.6 7.3 9.35V8.1C7.3 7.9 7.45 7.7 7.7 7.7H8.95C9.15 7.7 9.35 7.85 9.35 8.1V9.35C9.35 9.6 9.2 9.75 8.95 9.75ZM12.95 14.25H11.7C11.5 14.25 11.3 14.1 11.3 13.85V12.6C11.3 12.4 11.45 12.2 11.7 12.2H12.95C13.15 12.2 13.35 12.35 13.35 12.6V13.85C13.35 14.1 13.2 14.25 12.95 14.25ZM12.95 9.75H11.7C11.5 9.75 11.3 9.6 11.3 9.35V8.1C11.3 7.9 11.45 7.7 11.7 7.7H12.95C13.15 7.7 13.35 7.85 13.35 8.1V9.35C13.35 9.6 13.2 9.75 12.95 9.75Z" fill="black"/>
                                    </svg>

                                </p>
                            </div>

                            <Calendar bookingDate={bookingDate} setBookingDate={setBookingDate}/>

                        </div>

                        <div className="flex-grow md:w-[60%] w-full bg-white flex flex-col gap-5 rounded-[10px] p-4">
                            
                            <div className="flex md:flex-row flex-col gap-5 flex-1">

                                <TimeField label={"Start Time"} timeItems={timeItems} handleBookingTime={handleBookingTime} timeFieldValue={startTime} bookingType={bookingType}/>

                                <TimeField label={"End Time"} timeItems={timeItems} handleBookingTime={handleBookingTime} timeFieldValue={endTime} startIdx={startIdx} bookingType={bookingType} disabled={startTime == "0:00"}/>

                            </div>

                            <BookingTime startIdx={startIdx} endIdx={endIdx} timeItems={timeItems} handleBookingTime={handleBookingTime}/>

                            <div className="h-fit w-full flex p-6 border border-[var(--border-blue)] rounded-[10px] ">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_35_2743)">
                                        <path d="M9 0C4.02571 0 0 4.02525 0 9C0 13.9742 4.02525 18 9 18C13.9743 18 18 13.9747 18 9C18 4.02578 13.9747 0 9 0ZM9 16.7442C4.72985 16.7442 1.25582 13.2702 1.25582 9C1.25582 4.72982 4.72985 1.25582 9 1.25582C13.2701 1.25582 16.7442 4.72982 16.7442 9C16.7442 13.2702 13.2701 16.7442 9 16.7442Z" fill="#0D9CE6"/>
                                        <path d="M9.00009 7.5022C8.46698 7.5022 8.08789 7.72734 8.08789 8.05904V12.5726C8.08789 12.857 8.46698 13.1412 9.00009 13.1412C9.5095 13.1412 9.9241 12.857 9.9241 12.5726V8.05897C9.9241 7.7273 9.5095 7.5022 9.00009 7.5022Z" fill="#0D9CE6"/>
                                        <path d="M9.0007 4.71826C8.45574 4.71826 8.0293 5.1092 8.0293 5.55938C8.0293 6.00959 8.45578 6.41237 9.0007 6.41237C9.53381 6.41237 9.96032 6.00959 9.96032 5.55938C9.96032 5.1092 9.53377 4.71826 9.0007 4.71826Z" fill="#0D9CE6"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_35_2743">
                                            <rect width="18" height="18" fill="white"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                                <p className="text-[var(--text-blue)] w-full text-center font-pMedium">Minimum reservation for sports activities is <span className="font-pBold">{bookingType == "Sport Activities" ? "2" : "4"} hours</span>.</p>
                            </div>

                        </div>

                    </div>

                </div>

                <BookingSetup isShow={startTime != "0:00" && endTime != "0:00"} bookingSetup={bookingSetup} handleBookingSetup={handleBookingSetup} setupOptions={setupOptions} startTimeIndex={startIdx}/>
                
                {startIdx <= 6 && endIdx > 6 && bookingSetup == "Without Lights" ? 
                    <div className="h-fit w-full flex p-6 border border-[var(--border-blue)] rounded-[10px] ">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_35_2743)">
                                <path d="M9 0C4.02571 0 0 4.02525 0 9C0 13.9742 4.02525 18 9 18C13.9743 18 18 13.9747 18 9C18 4.02578 13.9747 0 9 0ZM9 16.7442C4.72985 16.7442 1.25582 13.2702 1.25582 9C1.25582 4.72982 4.72985 1.25582 9 1.25582C13.2701 1.25582 16.7442 4.72982 16.7442 9C16.7442 13.2702 13.2701 16.7442 9 16.7442Z" fill="#0D9CE6"/>
                                <path d="M9.00009 7.5022C8.46698 7.5022 8.08789 7.72734 8.08789 8.05904V12.5726C8.08789 12.857 8.46698 13.1412 9.00009 13.1412C9.5095 13.1412 9.9241 12.857 9.9241 12.5726V8.05897C9.9241 7.7273 9.5095 7.5022 9.00009 7.5022Z" fill="#0D9CE6"/>
                                <path d="M9.0007 4.71826C8.45574 4.71826 8.0293 5.1092 8.0293 5.55938C8.0293 6.00959 8.45578 6.41237 9.0007 6.41237C9.53381 6.41237 9.96032 6.00959 9.96032 5.55938C9.96032 5.1092 9.53377 4.71826 9.0007 4.71826Z" fill="#0D9CE6"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_35_2743">
                                    <rect width="18" height="18" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>
                        <div className="text-[var(--text-blue)] w-full text-left font-pMedium flex flex-col pl-4">
                            You have selected a reservation that starts between 8:00 AM and 2:00 PM and ends after 3:00 PM.
                            Since you have chosen “without lights”, please be informed that:
                            <ul className='list-disc ml-8 mt-2 mb-2'>
                                <li>Lights will be ON starting from 3:00 PM onwards</li>
                                <li>Therefore, a different rate will apply for the time after 3:00 PM</li>
                            </ul>
                            Please make sure you are aware of the rate changes and plan your booking accordingly.  
                        </div>
                    </div> : null 
                }

                
            </div>

            <div className={`lg:w-[80%] w-[90%] h-fit xl:hidden ${bookingSetup ? "flex" : "hidden"} gap-5`}>
                <AddOns addOnsList={addOnsList} handleAddOnsDuration={handleAddOnsDuration}/>
            </div>

            <ReservationSummary 
                isShow={bookingSetup}
                bookingType={bookingType} 
                addOnsList={addOnsList}
                bookingDate={bookingDate}
                startIdx={startIdx}
                endIdx={endIdx}
                startTime={startIdx || startIdx == 0  ? timeItems[startIdx].label : null}
                endTime={endIdx ? timeItems[endIdx].label : null}
                bookingSetup={bookingSetup}
                duration={duration}
                setActiveForms={setActiveForms}
                total={total}
                setTotal={setTotal}
                total2={total2}

                withoutLightDuration={withoutLightDuration}
                withLightDuration={withLightDuration}
                withoutLightComputation={withoutLightComputation}
                withLightComputation={withLightComputation}
                totalComputation={totalComputation}
            />
        </div>

        <div className={`w-[90%] h-fit ${bookingSetup ? "xl:flex hidden" : "hidden"} gap-5`}>
            <AddOns addOnsList={addOnsList} handleAddOnsDuration={handleAddOnsDuration}/>

            <div className="w-[30%] h-full">

            </div>
        </div>

    </div>
  )
}

export default Reservation
