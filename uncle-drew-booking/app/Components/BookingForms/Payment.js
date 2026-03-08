import React, { useEffect } from 'react'
import PrimaryButton from '../Buttons/PrimaryButton'
import Image from 'next/image'
import ReservationSummaryCopy from '../Page/ReservationSummaryCopy'
import Swal from 'sweetalert2';
import { AddBooking, UpdateUserBookingData } from '@/app/apiClient/BookingData';


const Payment = ({
    isActive,

    paymentPreference,
    handlePaymentPreference,

    paymentMethod,
    handlePaymentMethod,

    creditCard,
    handleCreditCard,

    bookingType,
    addOnsList,
    bookingDate,
    startIdx,
    endIdx,
    timeItems,
    bookingSetup,
    duration,

    booker_name,
    booker_email,
    booker_phone_number,
    booker_event_type,
    booker_message_request,

    setActiveForms,
    total,
    total2,

    withoutLightDuration,
    withLightDuration,
    withoutLightComputation,
    withLightComputation,
    totalComputation,
    setIsFeedBack,
    disabledPayment = false,
    user_receipt_number,
    bookingStatus,
    referenceNumber,
    isReferenceNumber,
    setIsReferenceNumber

}) => {
    const showAlert = async () => {
        const receipt_number = generateReceiptNumber();
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
          const bookingSuccessful = await addBooking(receipt_number);
      
          if (bookingSuccessful) {
            Swal.fire({
              title: '',
              text: `Thank you! Your booking has been received and your payment is being verified. You’ll get an email once it’s confirmed. Please save your receipt number (${receipt_number}) to track your reservation.`,
              icon: 'success',
              confirmButtonText: 'Ok',
              customClass: {
                confirmButton: 'custom-done-button',
                popup: 'custom-swal-popup',
              },
              buttonsStyling: false,
            }).then((result) => {
                setIsFeedBack(true);
            });
          } else {
            Swal.fire({
              title: '',
              text: 'An error occurred while saving your booking. Please try again later. If the problem persists, contact the administrator.',
              icon: 'error',
              confirmButtonText: 'Ok',
              customClass: {
                confirmButton: 'custom-done-button',
                popup: 'custom-swal-popup',
              },
              buttonsStyling: false,
            }).then((result) => {
                window.location.reload()
            });
          }
        }
    };

    const showAlert2 = async () => {
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
          const bookingSuccessful = await editBooking(user_receipt_number);
      
          if (bookingSuccessful) {
            Swal.fire({
              title: '',
              text: `Thank you! Your booking has been successfully updated.`,
              icon: 'success',
              confirmButtonText: 'Ok',
              customClass: {
                confirmButton: 'custom-done-button',
                popup: 'custom-swal-popup',
              },
              buttonsStyling: false,
            }).then((result) => {
                window.location.reload()
            });
          } else {
            Swal.fire({
              title: '',
              text: 'An error occurred while saving your booking. Please try again later. If the problem persists, contact the administrator.',
              icon: 'error',
              confirmButtonText: 'Ok',
              customClass: {
                confirmButton: 'custom-done-button',
                popup: 'custom-swal-popup',
              },
              buttonsStyling: false,
            }).then((result) => {
                window.location.reload()
            });
          }
        }
    };
      
    const generateReceiptNumber = () => {
        const prefix = "USDC";

        // Get current date in YYYYMMDD format
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // month is zero-based
        const day = String(now.getDate()).padStart(2, '0');

        const datePart = `${year}${month}${day}`;

        // Generate a random 5-digit number
        const randomNum = Math.floor(10000 + Math.random() * 90000);

        // Combine all parts
        return `${prefix}-${datePart}-${randomNum}`;
    }

    const addBooking = async (receipt_number) => {
        const timeIndex = startIdx + "," + endIdx;
        const result = await AddBooking(
            receipt_number,
            referenceNumber,
            booker_name,
            booker_email,
            booker_phone_number,
            booker_event_type,
            booker_message_request,
            bookingType,
            bookingDate,
            timeIndex,
            duration,
            bookingSetup,
            addOnsList[0].hours,
            addOnsList[1].hours,
            addOnsList[2].hours,
            totalComputation ? totalComputation : total,
            total2,
            paymentPreference,
            paymentMethod,
            creditCard,
            paymentPreference == "50% Down Payment" ? (total2 + totalComputation ? totalComputation : total)/2 : (total2 + totalComputation ? totalComputation : total),
            "pending"
        )

        if (result){
            return true
        } else {
            return false
        }
    }

    const editBooking = async (receipt_number) => {
        const timeIndex = startIdx + "," + endIdx;
        const userBookingData = {
            receipt_number: receipt_number,
            name: booker_name,
            email: booker_email,
            phone_number: booker_phone_number,
            event_type: booker_event_type,
            message_request: booker_message_request,
            booking_type: bookingType,
            booking_date: bookingDate,
            booking_time: timeIndex,
            booking_duration: duration,
            sports_center_settings: bookingSetup,
            score_board_shot_clock_operator: addOnsList[0].hours,
            speaker_mic: addOnsList[1].hours,
            ball: addOnsList[2].hours,
            total: totalComputation ? totalComputation : total,
            total2: total2,
            payment_preference: paymentPreference,
            payment_method: paymentMethod,
            credit_card: creditCard,
            downpayment: paymentPreference == "50% Down Payment" ? (total2 + totalComputation ? totalComputation : total)/2 : (total2 + totalComputation ? totalComputation : total),
            status: bookingStatus
        }
        const result = await UpdateUserBookingData(userBookingData)

        if (result){
            return true
        } else {
            return false
        }
    }

    useEffect(() => {
        if (referenceNumber && !isReferenceNumber){
            showAlert();
        }

    }, [referenceNumber, isReferenceNumber])

  return (
    <div className={`${isActive ? "flex" : "hidden"} h-fit w-full flex-col gap-5 items-center mt-7`}>
        <div className="w-[80%] flex flex-col items-center justify-center">

            <h1 className="text-[var(--text-black)] font-psBold sm:text-[32px] text-[6.5vw]">Payment</h1>
            <p className="text-[var(--text-gray)] font-pMdeium sm:text-[18px] text-[3.5vw] text-center">Complete your payment to confirm your booking.</p>

        </div>

        <div className="xl:w-[60%] w-[90%] flex flex-col h-fit justify-center items-center gap-5">

            <div className="h-fit w-full flex items-center p-2 border border-[var(--border-blue)] rounded-[10px] md:gap-10 gap-5">
                <svg className="md:ml-10 ml-2" width="36" height="36" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                <p className="text-[var(--text-blue)] lg:text-[18px] md:text-[14px] text-[12px] w-[75%] font-pMedium">All reservation requires <span className="font-pBold">50% down payment</span>. Down payment is non-refundable and rebooking requires 1 week notice.</p>
            </div>

            <div className="flex lg:flex-row flex-col gap-10 h-fit w-full">

                <div className="w-full h-fit flex flex-col">
                    <h2 className="text-[var(--text-dark-blue)] text-[25px] font-psBold mb-5">Payment Preference</h2>

                    <div className={`flex sm:flex-row flex-col w-full gap-10 h-fit ${disabledPayment ? "opacity-[0.5]" : "opacity-[1]"}`}>
                        <button 
                            type="button"
                            className="w-full h-fit flex flex-col bg-white p-4 rounded-[10px] gap-2 cursor-pointer"
                            style={{
                                boxShadow: paymentPreference == "50% Down Payment" ? "0px 0px 4px rgba(0, 0, 0, 0.04), 0px 8px 16px rgba(0, 0, 0, 0.08)" : ""
                            }}
                            onClick={() => handlePaymentPreference("50% Down Payment")}
                            disabled={disabledPayment}
                        >
                            <div className="flex w-full justify-between items-center text-[var(--text-black)] font-isBold text-start">
                                50% Down payment
                                <input 
                                    type="radio" 
                                    className="w-[15px] h-[15px] cursor-pointer"
                                    checked={paymentPreference == "50% Down Payment"}
                                    onChange={() => {}}
                                />
                            </div>
                            <p className="text-[var(--text-blue)] font-isBold text-start">1,600 php</p>
                        </button>
                        <button 
                            type="button"
                            className="w-full h-fit flex flex-col bg-white p-4 rounded-[10px] gap-2 cursor-pointer"
                            style={{
                                boxShadow: paymentPreference == "Full Payment" ? "0px 0px 4px rgba(0, 0, 0, 0.04), 0px 8px 16px rgba(0, 0, 0, 0.08)" : ""
                            }}
                            onClick={() => handlePaymentPreference("Full Payment")}
                            disabled={disabledPayment}
                        >
                            <div className="flex w-full justify-between items-center text-[var(--text-black)] font-isBold text-start">
                                Full Payment
                                <input 
                                    type="radio" 
                                    className="w-[15px] h-[15px] cursor-pointer"
                                    checked={paymentPreference == "Full Payment"}
                                    onChange={() => {}}
                                />
                            </div>
                            <p className="text-[var(--text-blue)] font-isBold text-start">2,300 php</p>
                        </button>
                    </div>


                    <h2 className="text-[var(--text-dark-blue)] text-[25px] font-psBold mb-5 mt-5">Payment Method</h2>

                    <div className={`flex sm:flex-row flex-col w-full gap-10 h-fit ${disabledPayment ? "opacity-[0.5]" : "opacity-[1]"}`}>
                        <button 
                            type="button"
                            className={`w-full h-fit flex flex-col bg-white p-4 rounded-[10px] gap-2 cursor-pointer`}
                            style={{
                                boxShadow: paymentMethod == "gcash" ? "0px 0px 4px rgba(0, 0, 0, 0.04), 0px 8px 16px rgba(0, 0, 0, 0.08)" : ""
                            }}
                            onClick={() => handlePaymentMethod("gcash")}
                            disabled={disabledPayment}
                        >
                            <div className="flex w-full justify-between items-center">
                                <Image
                                    src={"/icons/gcash-icon.png"}
                                    alt="G-Cash Icon"
                                    width={500}
                                    height={500}
                                    className="w-[44px] h-[44px]"
                                />
                                <input 
                                    type="radio" 
                                    className="w-[15px] h-[15px] cursor-pointer"
                                    checked={paymentMethod == "gcash"}
                                    onChange={() => {}}
                                />
                            </div>
                            <p className="text-[var(--text-black)] font-pMedium text-start">Gcash</p>
                        </button>
                        <button 
                            type="button"
                            className={`w-full h-fit flex flex-col bg-white p-4 rounded-[10px] gap-2 cursor-pointer`}
                            style={{
                                boxShadow: paymentMethod == "credit card" ? "0px 0px 4px rgba(0, 0, 0, 0.04), 0px 8px 16px rgba(0, 0, 0, 0.08)" : ""
                            }}
                            onClick={() => handlePaymentMethod("credit card")}
                            disabled={disabledPayment}
                        >
                            <div className="flex w-full justify-between items-center">
                                <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_37_4427)">
                                        <path d="M11.916 29.3333C13.4348 29.3333 14.666 28.102 14.666 26.5833C14.666 25.0645 13.4348 23.8333 11.916 23.8333C10.3972 23.8333 9.16602 25.0645 9.16602 26.5833C9.16602 28.102 10.3972 29.3333 11.916 29.3333Z" fill="black"/>
                                        <path d="M33.9167 5.5H10.0833C7.40996 5.50291 4.84692 6.56619 2.95656 8.45656C1.06619 10.3469 0.00291164 12.91 0 15.5833L0 28.4167C0.00291164 31.09 1.06619 33.6531 2.95656 35.5434C4.84692 37.4338 7.40996 38.4971 10.0833 38.5H33.9167C36.59 38.4971 39.1531 37.4338 41.0434 35.5434C42.9338 33.6531 43.9971 31.09 44 28.4167V15.5833C43.9971 12.91 42.9338 10.3469 41.0434 8.45656C39.1531 6.56619 36.59 5.50291 33.9167 5.5ZM10.0833 11H33.9167C34.9729 11.0002 35.9967 11.3652 36.8149 12.0334C37.633 12.7015 38.1952 13.6317 38.4065 14.6667H5.5935C5.80476 13.6317 6.367 12.7015 7.18513 12.0334C8.00326 11.3652 9.02705 11.0002 10.0833 11ZM33.9167 33H10.0833C8.86776 33 7.70197 32.5171 6.84243 31.6576C5.98289 30.798 5.5 29.6322 5.5 28.4167V20.1667H38.5V28.4167C38.5 29.6322 38.0171 30.798 37.1576 31.6576C36.298 32.5171 35.1322 33 33.9167 33Z" fill="black"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_37_4427">
                                            <rect width="44" height="44" fill="white"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                                <input 
                                    type="radio" 
                                    className="w-[15px] h-[15px] cursor-pointer"
                                    checked={paymentMethod == "credit card"}
                                    onChange={() => {}}
                                />

                            </div>
                            <p className="text-[var(--text-black)] font-pMedium text-start">Credit Card</p>
                        </button>
                    </div>

                    <div className={`${paymentMethod == "gcash" ? "flex" : "hidden"} border rounded-[10px] w-full h-[500px] mt-10`}>

                    </div>

                    <div className={`${paymentMethod == "credit card" ? "flex" : "hidden"} flex-col gap-5`}>
                        <h2 className="text-[var(--text-dark-blue)] text-[25px] font-psBold mb-5 mt-10">Bank Accounts</h2>

                        <div className={`flex flex-col w-full gap-10 h-fit ${disabledPayment ? "opacity-[0.5]" : "opacity-[1]"}`}>
                            <button 
                                type="button"
                                className="w-full h-fit flex flex-col bg-white p-4 rounded-[10px] gap-2 cursor-pointer"
                                style={{
                                    boxShadow: creditCard == "bdo" ? "0px 0px 4px rgba(0, 0, 0, 0.04), 0px 8px 16px rgba(0, 0, 0, 0.08)" : ""
                                }}
                                onClick={() => handleCreditCard("bdo")}
                                disabled={disabledPayment}
                            >
                                <div className="flex w-full justify-between items-center">
                                    <div className="flex gap-5 w-fit h-fit items-center">
                                        <Image
                                            src={"/icons/bdo-icon.png"}
                                            alt="G-Cash Icon"
                                            width={500}
                                            height={500}
                                            className="w-[44px] h-[44px]"
                                        />
                                        <p className="text-[var(--text-black)] font-psBold">BDO</p>
                                    </div>
                                    <input 
                                        type="radio" 
                                        className="w-[15px] h-[15px] cursor-pointer"
                                        checked={creditCard == "bdo"}
                                        onChange={() => {}}
                                    />
                                </div>
                                <p className="text-[var(--text-black)] font-uMedium mt-5 text-start">Uncle Drew Sports Center</p>
                                <p className="text-[var(--text-black)] font-uMedium text-start">12345654321</p>
                            </button>
                            <button 
                                type="button"
                                className="w-full h-fit flex flex-col bg-white p-4 rounded-[10px] gap-2 cursor-pointer"
                                style={{
                                    boxShadow: creditCard == "bpi" ? "0px 0px 4px rgba(0, 0, 0, 0.04), 0px 8px 16px rgba(0, 0, 0, 0.08)" : ""
                                }}
                                onClick={() => handleCreditCard("bpi")}
                                disabled={disabledPayment}
                            >
                                <div className="flex w-full justify-between items-center">
                                    <div className="flex gap-5 w-fit h-fit items-center">
                                        <Image
                                            src={"/icons/bpi-icon.png"}
                                            alt="G-Cash Icon"
                                            width={500}
                                            height={500}
                                            className="w-[44px] h-[44px]"
                                        />
                                        <p className="text-[var(--text-black)] font-uMedium">BPI</p>
                                    </div>
                                    <input 
                                        type="radio" 
                                        className="w-[15px] h-[15px] cursor-pointer"
                                        checked={creditCard == "bpi"}
                                        onChange={() => {}}
                                    />

                                </div>
                                <p className="text-[var(--text-black)] font-uMedium mt-5 text-start">Uncle Drew Sports Center</p>
                                <p className="text-[var(--text-black)] font-uMedium text-start">12345654321</p>
                            </button>
                        </div>

                    </div>

                    <div className="lg:hidden flex h-full w-full">
                        <ReservationSummaryCopy
                            bookingType={bookingType} 
                            addOnsList={addOnsList}
                            bookingDate={bookingDate}
                            startIdx={startIdx}
                            endIdx={endIdx}
                            startTime={startIdx || startIdx == 0  ? timeItems[startIdx].label : null}
                            endTime={endIdx ? timeItems[endIdx].label : null}
                            bookingSetup={bookingSetup}
                            duration={duration}
                            total={total}
                            total2={total2}
                            downPayment={paymentPreference == "50% Down Payment" ? (total2 + totalComputation ? totalComputation : total)/2 : (total2 + totalComputation ? totalComputation : total)}

                            withoutLightDuration={withoutLightDuration}
                            withLightDuration={withLightDuration}
                            withoutLightComputation={withoutLightComputation}
                            withLightComputation={withLightComputation}
                            totalComputation={totalComputation}
                        />
                    </div>

                    <p className="text-[var(--text-gray)] font-pRegular text-[15px] mt-8 mb-5">After sending your payment, click &apos;Done.&apos; Our team will verify it and notify you via email once your booking is confirmed. Thank you.</p>
                    
                    <div className="flex gap-5 w-full h-fit">
                        <PrimaryButton background={"transparent"} label={"Back"} color={"var(--text-blue)"} border={"1px solid var(--text-blue)"} handleClick={() => setActiveForms(2)}/>
                        {disabledPayment ?  
                            <PrimaryButton background={"var(--text-blue)"} label={"Edit Booking"} color={"var(--text-white)"} border={"1px solid var(--text-blue)"} handleClick={showAlert2}/>
                            :
                            <PrimaryButton background={"var(--text-blue)"} label={"Continue"} color={"var(--text-white)"} border={"1px solid var(--text-blue)"} handleClick={() => setIsReferenceNumber(true)}/>
                        }
                    </div>

                </div>

                <div className="lg:flex hidden h-full w-[60%]">
                    <ReservationSummaryCopy
                        bookingType={bookingType} 
                        addOnsList={addOnsList}
                        bookingDate={bookingDate}
                        startIdx={startIdx}
                        endIdx={endIdx}
                        startTime={startIdx || startIdx == 0  ? timeItems[startIdx].label : null}
                        endTime={endIdx ? timeItems[endIdx].label : null}
                        bookingSetup={bookingSetup}
                        duration={duration}
                        total={total}
                        total2={total2}
                        downPayment={paymentPreference == "50% Down Payment" ? totalComputation ? (totalComputation + total2)/2 : (total + total2)/2 : totalComputation ? totalComputation + total2 : total + total2}

                        withoutLightDuration={withoutLightDuration}
                        withLightDuration={withLightDuration}
                        withoutLightComputation={withoutLightComputation}
                        withLightComputation={withLightComputation}
                        totalComputation={totalComputation}
                    />
                </div>

            </div>
        </div>
    </div>
  )
}

export default Payment
