import React, { useEffect, useState } from 'react'
import PrimaryButton from '../Buttons/PrimaryButton'
import Swal from 'sweetalert2'
import { UpdateBookingStatus } from '@/app/apiClient/BookingData'
import { CloseOutlined, ReceiptLong } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const BookingReceiptModal = ({ 
    isShow,
    cancelModal,
    bookingDataInfo,
    timeItems,
    showConfirmButton
}) => {

  const [withoutLightDuration, setWithoutLightDuration] = useState(0);
  const [withLightDuration, setWithLightDuration] = useState(0);
  const [withoutLightComputation, setWithoutLightComputation] = useState(0);
  const [withLightComputation, setWithLightComputation] = useState(0);
  const [totalComputation, setTotalComputation] = useState(0);

  const [startIdx, setStartIdx] = useState(0);
  const [endIdx, setEndIdx] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);

  const [addOnsList, setAddOnsList] = useState([
    {
        label: 'Scoreboard & Shot Clock with Operators',
        price: 700,
        unit: '/hour',
        hours: bookingDataInfo.score_board_shot_clock_operator,
    },
    {
        label: 'Speaker and Mic',
        price: 150,
        unit: '/hour',
        hours: bookingDataInfo.bookingDataInfo,
    },
    {
        label: 'Ball',
        price: 50,
        unit: '/hour',
        hours: bookingDataInfo.ball,
    },
  ]);


  const confirmBooking = async () => {
    const bookingData = {
        id: bookingDataInfo.id,
        status: "upcoming",
        email: bookingDataInfo.email,
        booking_date: bookingDataInfo.booking_date,
        receipt_number: bookingDataInfo.receipt_number
    }

    const result = await Swal.fire({
        title: 'Confirm Submission',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Back',
        cancelButtonText: 'Done',
        customClass: {
        confirmButton: 'custom-back-button',
        cancelButton: 'custom-done-button',
        popup: 'custom-swal-popup',
        },
        buttonsStyling: false,
    });

    if (result.isConfirmed) {
        return;
    } else if (result.dismiss === Swal.DismissReason.cancel) {
        const bookingStatusChanged = await UpdateBookingStatus(bookingData);

        if (bookingStatusChanged) {
            Swal.fire({
                title: '',
                text: 'Booking status has been successfully changed. Please check it under the Upcoming tab.',
                icon: 'success',
                confirmButtonText: 'Ok',
                customClass: {
                confirmButton: 'custom-done-button',
                popup: 'custom-swal-popup',
                },
                buttonsStyling: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload()
                } 
            });
        } else {
            Swal.fire({
                title: '',
                text: 'An error occurred while changing the booking status. Please try again later. If the problem persists, contact the it administrator.',
                icon: 'error',
                confirmButtonText: 'Ok',
                customClass: {
                confirmButton: 'custom-done-button',
                popup: 'custom-swal-popup',
                },
                buttonsStyling: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload()
                } 
            });
        }
    }

  }

  useEffect(() => {
    if (bookingDataInfo){
        const timeIndex = bookingDataInfo.booking_time.split(","); 
        setStartIdx(timeIndex[0]);
        setEndIdx(timeIndex[1]);
        setStartTime(timeItems[timeIndex[0]].label);
        setEndTime(timeItems[timeIndex[1]].label);
        if (startIdx <= 6 && endIdx > 6 && bookingDataInfo.sports_center_settings == "Without Lights") {
            const duration1 = 7 - startIdx;
            const duration2 = endIdx - 7;
            const computation1 = duration1 * 1000;
            const computation2 = duration2 * 1400;
            const totalComputation = computation1 + computation2
            setWithoutLightDuration(duration1)
            setWithLightDuration(duration2)
            setWithoutLightComputation(computation1)
            setWithLightComputation(computation2)
            setTotalComputation(totalComputation)   
        }
    }
  }, [bookingDataInfo])

  return (
    <div className={`absolute top-0 left-0 w-full h-full bg-black/[.5] ${isShow ? "flex" : "hidden"} items-center justify-center z-10`}>

        <div className={`xl:w-[30%] lg:w-[50%] sm:w-[70%] w-[98%] h-[80%] bg-white rounded-[10px] px-6 py-4 mt-20 ${isShow ? "flex" : "hidden"} flex-col overflow-x-hidden overflow-y-auto`}>

            <div className="flex flex-row justify-between text-black">
                <div className="flex flex-row gap-[8px] items-center">
                    <ReceiptLong />
                    Booking Receipt
                </div>
                <div>
                    <IconButton
                        onClick={cancelModal}
                    >
                        <CloseOutlined />
                    </IconButton>
                </div>
            </div>

            <h2 className="text-[var(--text-dark-blue)] md:text-[30px] text-[20px] border-b border-[var(--border-gray)] mt-5">Reservation Summary</h2>

            <div className="flex flex-col gap-2 h-fit w-full mt-7">

                {bookingDataInfo.reference_number ? 
                    <p className="h-fit w-full flex justify-between">
                        <span className="text-[var(--text-gray)]">Reference Number</span>
                        <span className="text-[var(--text-blue)]"><b>{bookingDataInfo.reference_number}</b></span>
                    </p> : null
                }
                {bookingDataInfo.booking_type ? 
                    <p className="h-fit w-full flex justify-between">
                        <span className="text-[var(--text-gray)]">Type</span>
                        <span className="text-[var(--text-black)]">{bookingDataInfo.booking_type}</span>
                    </p> : null
                }
                {bookingDataInfo.booking_type && bookingDataInfo.booking_date ? 
                    <p className="h-fit w-full flex justify-between">
                        <span className="text-[var(--text-gray)]">Date</span>
                        <span className="text-[var(--text-black)]">{bookingDataInfo.booking_date}</span>
                    </p> : null
                }
                {startIdx <= 6 && endIdx > 6 && bookingDataInfo.sports_center_settings == "Without Lights" ?
                    <div className='flex flex-col w-full'>
                        {bookingDataInfo.booking_type && startTime != "0:00" ? 
                            <p className="flex-1 flex justify-between">
                                <span className="text-[var(--text-gray)]">Start Time</span>
                                <span className="text-[var(--text-black)]">{startTime}</span>
                            </p> : null
                        }
                        {bookingDataInfo.booking_type && endTime != "0:00" ? 
                            <p className="flex-1 flex justify-between">
                                <span className="text-[var(--text-gray)]">End Time</span>
                                <span className="text-[var(--text-black)]">3:00 pm</span>
                            </p> : null
                        }
                        {bookingDataInfo.booking_type && startTime && endTime ? 
                            <p className="flex-1 flex justify-between">
                                <span className="text-[var(--text-gray)]">Duration</span>
                                <span className="text-[var(--text-black)]">{withoutLightDuration} {withoutLightDuration > 1?  "hours" : "hour"}</span>
                            </p> : null
                        }
                        {bookingDataInfo.sports_center_settings ? 
                            <p className="flex-1 flex justify-between">
                                <span className="text-[var(--text-gray)]">Setup</span>
                                <span className="text-[var(--text-black)]">Without Lights (1,000 php/hr)</span>
                            </p> : null
                        }
                        {bookingDataInfo.sports_center_settings ? 
                            <p className="flex-1 flex justify-between pt-2 mt-4 mb-4 border-t border-[var(--border-gray)]">
                                <span className="text-[var(--text-black)]">Without Light Rate Computation</span>
                                <span className="text-[var(--text-blue)]">&#8369; {withoutLightComputation}</span>
                            </p> : null
                        }
                        
                        {bookingDataInfo.booking_type && startTime != "0:00" ? 
                            <p className="flex-1 flex justify-between">
                                <span className="text-[var(--text-gray)]">Start Time</span>
                                <span className="text-[var(--text-black)]">3:00 pm</span>
                            </p> : null
                        }
                        {bookingDataInfo.booking_type && endTime != "0:00" ? 
                            <p className="flex-1 flex justify-between">
                                <span className="text-[var(--text-gray)]">End Time</span>
                                <span className="text-[var(--text-black)]">{endTime}</span>
                            </p> : null
                        }
                        {bookingDataInfo.booking_type && startTime && endTime ? 
                            <p className="flex-1 flex justify-between">
                                <span className="text-[var(--text-gray)]">Duration</span>
                                <span className="text-[var(--text-black)]">{withLightDuration} {withLightDuration > 1?  "hours" : "hour"}</span>
                            </p> : null
                        }
                        {bookingDataInfo.sports_center_settings ? 
                            <p className="flex-1 flex justify-between">
                                <span className="text-[var(--text-gray)]">Setup</span>
                                <span className="text-[var(--text-black)]">With Lights (1,400 php/hr)</span>
                            </p> : null
                        }
                        {bookingDataInfo.sports_center_settings ? 
                            <p className="flex-1 flex justify-between pt-2 mt-4 border-t border-[var(--border-gray)]">
                                <span className="text-[var(--text-black)]">With Light Rate Computation</span>
                                <span className="text-[var(--text-blue)]">&#8369; {withLightComputation}</span>
                            </p> : null
                        }
                    </div>
                    :
                    <div className='flex flex-col w-full'>
                        {bookingDataInfo.booking_type && startTime != "0:00" ? 
                            <p className="flex-1 flex justify-between">
                                <span className="text-[var(--text-gray)]">Start Time</span>
                                <span className="text-[var(--text-black)]">{startTime}</span>
                            </p> : null
                        }
                        {bookingDataInfo.booking_type && endTime != "0:00" ? 
                            <p className="flex-1 flex justify-between">
                                <span className="text-[var(--text-gray)]">End Time</span>
                                <span className="text-[var(--text-black)]">{endTime}</span>
                            </p> : null
                        }
                        {bookingDataInfo.booking_type && startTime && endTime ? 
                            <p className="flex-1 flex justify-between">
                                <span className="text-[var(--text-gray)]">Duration</span>
                                <span className="text-[var(--text-black)]">{bookingDataInfo.booking_duration} {bookingDataInfo.booking_duration > 1?  "hours" : "hour"}</span>
                            </p> : null
                        }
                        {bookingDataInfo.sports_center_settings ? 
                            <p className="flex-1 flex justify-between">
                                <span className="text-[var(--text-gray)]">Setup</span>
                                <span className="text-[var(--text-black)]">{bookingDataInfo.sports_center_settings}</span>
                            </p> : null
                        }
                    </div>
                }
            </div>
            

            {totalComputation ?
                <p className="w-full h-fit flex justify-between py-5 mt-5 border-b border-[var(--border-gray)]">
                    <span className="text-[var(--text-black)]">Total Computation</span>
                    <span className="text-[var(--text-blue)]">&#8369; {totalComputation}</span>
                </p> : bookingDataInfo.total ?
                <p className="w-full h-fit flex justify-between py-5 mt-5 border-b border-[var(--border-gray)]">
                    <span className="text-[var(--text-black)]">Total Computation</span>
                    <span className="text-[var(--text-blue)]">&#8369; {bookingDataInfo.total}</span>
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
                    <span className="text-[var(--text-blue)]">&#8369; {bookingDataInfo.total2}</span>
                    </div>
                </div>
            )}



            {bookingDataInfo.total ? 

                <div className="h-fit w-full flex flex-col py-5 border-b border-[var(--border-gray)]">
                    <p className="text-[var(--text-dark-blue)] mb-5">Price Summary</p>

                    <div className="flex flex-col gap-2">
                        <p className="flex-1 flex justify-between">
                            <span className="text-[var(--text-black)]">Reservation</span>
                            <span className="text-[var(--text-blue)]">&#8369; {totalComputation ? totalComputation : bookingDataInfo.total}</span>
                        </p>

                        <p className="flex-1 flex justify-between">
                            <span className="text-[var(--text-black)]">Additional</span>
                            <span className="text-[var(--text-blue)]">&#8369; {bookingDataInfo.total2}</span>
                        </p>
                    </div>

                </div>
                : null
            }

            {bookingDataInfo.total ? 
                <p className="h-fit w-full flex justify-between py-5 text-[var(--text-green)] font-pBold text-[25px]">
                    <span>Total Price</span>
                    <span>&#8369; {totalComputation ? totalComputation + bookingDataInfo.total2 : bookingDataInfo.total + bookingDataInfo.total2}</span>
                </p> : null
            }

            {bookingDataInfo.downpayment ? 
                <p className="h-fit w-full flex justify-between py-5 text-[var(--text-dark-blue)] font-pBold text-[25px]">
                    <span>Down Payment</span>
                    <span>&#8369; {bookingDataInfo.downpayment}</span>
                </p> : null
            }

            {showConfirmButton ? 
                <div className='flex gap-5'>
                    <PrimaryButton
                        background={"transparent"} 
                        label={"Cancel"} 
                        color={"var(--text-blue)"} 
                        border={"1px solid var(--text-blue)"}
                        handleClick={cancelModal}
                    /> 
                    <PrimaryButton
                        background={"var(--text-blue)"} 
                        label={"Continue"} 
                        color={"var(--text-white)"} 
                        border={"1px solid var(--text-blue)"}
                        handleClick={confirmBooking}
                    />
                </div>
                : null

            }

        </div>

    </div>
  )
}

export default BookingReceiptModal
