import React from 'react'
import PrimaryButton from '../Buttons/PrimaryButton'

const BookingViewCard = ({ 
    bookingDayText,
    bookingDayNumber,
    bookerName,
    bookingType,
    bookingStartTime,
    bookingEndTime,
    bookingSetUp,
    referenceNumber,
    activeTab,
    item,
    confirmBooking
}) => {
  
  return (
    <div className='rounded-[15px] w-full h-fit py-4 bg-[var(--text-white)] flex justify-between'>
        <div className='w-[10%] flex flex-col items-center border-r border-[var(--border-light-gray)]'>
            <p className='font-pRegular text-[var(--text-blue)] text-[18px]'>{bookingDayText}</p>
            <p className='font-psBold text-[var(--text-blue)] text-[35px]'>{bookingDayNumber}</p>
        </div>
        <div className='w-[30%] flex flex-col px-10'>
            <h3 className='text-[var(--text-black)] text-[30px] font-psBold'>{bookerName}</h3>
            <p className='text-[var(--text-dark-blue)] text-[18px] font-pRegular'>{bookingType}</p>
        </div>
        <div className='w-[30%] flex flex-col justify-center gap-1'>
            <div className='flex gap-4 items-center'>
                <svg width="25" height="25" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.75 0.25C7.01942 0.25 5.32769 0.763178 3.88876 1.72464C2.44983 2.6861 1.32832 4.05267 0.666058 5.65152C0.00379127 7.25037 -0.169488 9.0097 0.168133 10.707C0.505753 12.4044 1.33911 13.9635 2.56282 15.1872C3.78653 16.4109 5.34563 17.2442 7.04296 17.5819C8.7403 17.9195 10.4996 17.7462 12.0985 17.0839C13.6973 16.4217 15.0639 15.3002 16.0254 13.8612C16.9868 12.4223 17.5 10.7306 17.5 9C17.4973 6.68019 16.5745 4.45619 14.9342 2.81584C13.2938 1.17549 11.0698 0.252737 8.75 0.25ZM11.6988 11.9487C11.5496 12.0979 11.3473 12.1816 11.1364 12.1816C10.9254 12.1816 10.7231 12.0979 10.574 11.9487L8.18762 9.56238C8.03843 9.41324 7.95459 9.21095 7.95455 9V4.22727C7.95455 4.0163 8.03835 3.81398 8.18753 3.6648C8.33671 3.51562 8.53903 3.43182 8.75 3.43182C8.96097 3.43182 9.1633 3.51562 9.31247 3.6648C9.46165 3.81398 9.54546 4.0163 9.54546 4.22727V8.67068L11.6988 10.824C11.8479 10.9731 11.9317 11.1754 11.9317 11.3864C11.9317 11.5973 11.8479 11.7996 11.6988 11.9487Z" fill="black"/>
                </svg>
                <p className='font-pRegular text-[var(--text-black)] text-[20px]'>{bookingStartTime} - {bookingEndTime} <span className='text-[15px]'>({bookingSetUp})</span> </p>
            </div>
            <p className='font-pRegular text-[var(--text-black)] text-[18px]'>{referenceNumber}</p>
        </div>
        <div className='w-[25%] h-full flex gap-2 items-center justify-end'>
            {/* {activeTab == "pending" ?
                <PrimaryButton
                    background={"transparent"} 
                    label={"Reject Booking"} 
                    color={"var(--text-blue)"} 
                    border={"1px solid var(--text-blue)"}
                    customStyle={"px-4 w-fit"}
                /> : null
            } */}
            {activeTab == "pending" ?
                <PrimaryButton
                    background={"var(--text-blue)"} 
                    label={"Confirm Booking"} 
                    color={"var(--text-white)"} 
                    border={"1px solid var(--text-blue)"}
                    handleClick={() => confirmBooking(item, true)}
                    customStyle={"px-4 w-fit"}
                /> : 
                <PrimaryButton
                    background={"var(--text-blue)"} 
                    label={"View Details"} 
                    color={"var(--text-white)"} 
                    border={"1px solid var(--text-blue)"}
                    handleClick={() => confirmBooking(item, false)}
                    customStyle={"px-8 w-fit"}
                />
            }
        </div>
    </div>
  )
}

export default BookingViewCard
