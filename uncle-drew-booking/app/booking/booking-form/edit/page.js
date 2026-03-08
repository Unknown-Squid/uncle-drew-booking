"use client"
import { useEffect, useMemo, useState } from "react";

import Swal from 'sweetalert2';
import { useSearchParams } from 'next/navigation';
import Navbar from "@/app/Components/Page/Navbar";
import Footer from "@/app/Components/Page/Footer";
import Reservation from "@/app/Components/BookingForms/Reservation";
import BookingDetails from "@/app/Components/BookingForms/BookingDetails";
import Payment from "@/app/Components/BookingForms/Payment";
import { GetBookingByKey } from "@/app/apiClient/BookingData";
import FeedBackModal from "@/app/Components/Modal/FeedBackModal";


export default function EditBooking() {
  
  // ----------- VARIABLES -----------

  const searchParams = useSearchParams()
  const receipt_number = searchParams.get('receipt_number');
  const et = searchParams.get('et');
  
  // active form state
  const [activeForms, setActiveForms] = useState(1);
  const [ isFeedBack, setIsFeedBack ] = useState(false);

  const [loading, setLoading] = useState(false);

  // for reservation
  const [bookingStatus, setBookingStatus] = useState("");
  const [bookingType, setBookingType] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("0:00");
  const [endTime, setEndTime] = useState("0:00");
  const [startIdx, setStartIdx] = useState(null);
  const [endIdx, setEndIdx]     = useState(null);
  const [duration, setDuration] = useState(0);
  const [bookingSetup, setBookingSetup] = useState("");
  const [total, setTotal] = useState(0);
  const [total2, setTotal2] = useState(0);
  const [timeItems, setTimeItems] = useState([
    { label: "8:00 am",   disabled: false },
    { label: "9:00 am",   disabled: false },
    { label: "10:00 am",  disabled: false },
    { label: "11:00 am",  disabled: false },
    { label: "12:00 nn",  disabled: false },
    { label: "1:00 pm",   disabled: false },
    { label: "2:00 pm",   disabled: false },
    { label: "3:00 pm",   disabled: false },
    { label: "4:00 pm",   disabled: false },
    { label: "5:00 pm",   disabled: false },
    { label: "6:00 pm",   disabled: false },
    { label: "7:00 pm",   disabled: false },
    { label: "8:00 pm",   disabled: false },
    { label: "9:00 pm",   disabled: false },
    { label: "10:00 pm",  disabled: false },
  ]);


  const [withoutLightDuration, setWithoutLightDuration] = useState(0);
  const [withLightDuration, setWithLightDuration] = useState(0);
  const [withoutLightComputation, setWithoutLightComputation] = useState(0);
  const [withLightComputation, setWithLightComputation] = useState(0);
  const [totalComputation, setTotalComputation] = useState(0);

  const setupOptions = useMemo(() => [
    {
      label: 'Without Lights',
      price: '1,000',
    },
    {
      label: 'With Lights',
      price: '1,400',
    },
    {
      label: 'With Lights & A/C',
      price: '2,800',
    },
  ], []);
  
  const [addOnsList, setAddOnsList] = useState([
    {
        label: 'Scoreboard & Shot Clock with Operators',
        price: 700,
        unit: '/hour',
        hours: 0,
    },
    {
        label: 'Speaker and Mic',
        price: 150,
        unit: '/hour',
        hours: 0,
    },
    {
        label: 'Ball',
        price: 50,
        unit: '/hour',
        hours: 0,
    },
  ]);

  // for booking details
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [eventType, setEventType] = useState("");
  const [messageRequest, setMessageRequest] = useState("");

  // for payment
  const [paymentPreference, setPaymentPreference] = useState("Full Payment");
  const [paymentMethod, setPaymentMethod] = useState("gcash");
  const [creditCard, setCreditCard] = useState("");


  // ----------- FUNCTIONS -----------

  // for reservation
  const handleBookingType = (type) => {
    setBookingType(type);
    setStartTime("0:00");
    setEndTime("0:00");
    setStartIdx(null);
    setEndIdx(null);
  };

  const handleBookingTime = (idx, label) => {
    if (timeItems[idx].disabled) return;

    const slotCount = bookingType === "Sport Activities" ? 2 : 4;
    let start = 0;
    let end = 0;
    if (label == "Start Time") {
      start = idx
      end = idx + slotCount
      if (endIdx > timeItems.length){
        Swal.fire({
          icon: 'error',
          title: 'Invalid Booking Time',
          text: `The selected time range must cover ${slotCount} consecutive available hours. Please choose a different range.`,
          confirmButtonText: 'Ok',
          customClass: {
            confirmButton: 'custom-done-button',
            popup: 'custom-swal-popup',
          },
          buttonsStyling: false,
        });
        return;
      } else {
        let count = 0;
        for (let i = 0; i < slotCount; i++){
          count++;
          if (timeItems[idx + count].disabled){
            Swal.fire({
              icon: 'error',
              title: 'Invalid Booking Time',
              text: 'That range includes unavailable slots.',
              confirmButtonText: 'Ok',
              customClass: {
                confirmButton: 'custom-done-button',
                popup: 'custom-swal-popup',
              },
              buttonsStyling: false,
            });
            return;
          }
        } 
        setStartIdx(start);
        setEndIdx(end)
        setDuration(end - start);
        setStartTime(timeItems[start].label);
        setEndTime(timeItems[end].label);
        setBookingSetup("");
        setAddOnsList(prev =>
          prev.map((item, i) => {
            return {...item, hours: 0};
          })
        );
      }
    }

    if (label == "End Time") {
      for (let i = startIdx; i < timeItems.length - 1; i++ ) {
        if (timeItems[i].disabled){
          Swal.fire({
            icon: 'error',
            title: 'Invalid Booking Time',
            text: 'That range includes unavailable slots.',
            confirmButtonText: 'Ok',
            customClass: {
              confirmButton: 'custom-done-button',
              popup: 'custom-swal-popup',
            },
            buttonsStyling: false,
          });
          return;
        }
      }
      end = idx
      setEndIdx(end)
      setEndTime(timeItems[end].label);
      setDuration(end - startIdx);
      setBookingSetup("");
      setAddOnsList(prev =>
        prev.map((item, i) => {
          return {...item, hours: 0};
        })
      );
    }
  };

  const handleBookingSetup = (setup) => {
    setBookingSetup(setup);

    setupOptions.map(item => {
        if (item.label == setup){
            const firstTotalSummary = parseInt(item.price.replace(/,/g, ''), 10) * duration;
            setTotal(firstTotalSummary)
        }
    })
  };

  const handleAddOnsDuration = (index, type) => {
    setAddOnsList(prev =>
      prev.map((item, i) => {
        if (i === index) {
          const newHours =
            type === 'plus'
              ? Math.min(item.hours + 1, duration)
              : Math.max(item.hours - 1, 0);      

          return { ...item, hours: newHours };
        }
        return item;
      })
    );
  };


  // for payment
  const handlePaymentPreference = (preference) => {
    setPaymentPreference(preference);
  };
  const handlePaymentMethod = (method) => {
    setPaymentMethod(method);
    setCreditCard("");
  };
  const handleCreditCard = (card) => {
    setCreditCard(card);
  };
      


  useEffect(() => {
    let secondTotalSummary = 0;
 
    addOnsList.map(item => {
        secondTotalSummary += item.price * item.hours;
    })

    setTotal2(secondTotalSummary)
  }, [startIdx, endIdx, addOnsList, timeItems])

  useEffect(() => {
    setupOptions.map(item => {
        if (item.label == bookingSetup){
            const firstTotalSummary = parseInt(item.price.replace(/,/g, ''), 10) * duration;
            setTotal(firstTotalSummary)
        }
    })

  }, [duration, bookingSetup, setupOptions])


  useEffect(() => {
    if (startIdx && endIdx){
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
  }, [startIdx, endIdx])

  useEffect(() => {
    const fetchBookingData = async () => {
      const key = "booking_date";
      const value = bookingDate;

      // Reset all time items to enabled before fetching new data for the new date
      let refreshedTimeItems = timeItems.map(item => ({
        ...item,
        disabled: false,
      }));

      setTimeItems(refreshedTimeItems);


      const data = await GetBookingByKey(key, value);

      if (data && data.length > 0) { // Check if data exists and has bookings
        data.forEach(booking => {
          // Ensure booking_time is valid before processing
          if (booking.booking_time) {
            const timeParts = booking.booking_time.split(",");
            if (timeParts.length === 2) {
              const [startIndex, endIndex] = timeParts.map(Number);

              // Validate indices to prevent errors if data is malformed
              if (!isNaN(startIndex) && !isNaN(endIndex) && startIndex >= 0 && endIndex < refreshedTimeItems.length) {
                for (let i = startIndex; i <= endIndex; i++) {
                  refreshedTimeItems[i].disabled = true;
                }
              } else {
                console.warn(`Invalid booking_time indices for booking: ${booking.booking_time}`);
              }
            } else {
                console.warn(`Unexpected booking_time format: ${booking.booking_time}`);
            }
          }
        });

        setTimeItems(refreshedTimeItems);
      }
    };

    if (bookingDate) { // Only fetch if bookingDate is provided
      fetchBookingData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingDate]);

  useEffect(() => {
    const fetchUserBookingData = async () => {
      const key = "receipt_number";
      const value = receipt_number;

      const data = await GetBookingByKey(key, value);

      if (data && data.length > 0) { // Check if data exists and has bookings
        data.forEach(booking => {
          const timeIndex = booking.booking_time.split(",");
          setStartIdx(timeIndex[0]);
          setEndIdx(timeIndex[1]);
          setStartTime(timeItems[timeIndex[0]].label);
          setEndTime(timeItems[timeIndex[1]].label);
          setBookingType(booking.booking_type);
          setBookingDate(booking.booking_date);
          setBookingSetup(booking.sports_center_settings);
          setAddOnsList(prev =>
                prev.map((item, index) => {
                    if (index == 0){
                        return { ...item, hours: booking.score_board_shot_clock_operator };
                    } else if (index == 1){
                        return { ...item, hours: booking.speaker_mic };
                    } else {
                        return { ...item, hours: booking.ball };
                    }
                })
            );
            setTotal(booking.total);
            setTotal2(booking.total2);
            setDuration(booking.booking_duration);
            setName(booking.name);
            setEmail(booking.email);
            setPhoneNumber(booking.phone_number);
            setEventType(booking.event_type)
            setMessageRequest(booking.message_request);
            setPaymentPreference(booking.payment_preference);
            setPaymentMethod(booking.payment_method);
            setBookingStatus(booking.status)
        });
      }
    };

    if (receipt_number) { // Only fetch if bookingDate is provided
      fetchUserBookingData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receipt_number]);

  useEffect(() => {
    if (!et) {
      window.location.href = "/expired-link";
    }

    try {
      const decoded = JSON.parse(atob(et));
      const now = new Date();
      const exp = new Date(decoded.expires);

      if (now < exp){
        window.location.href = "/expired-link";
      }
    } catch (error) {
      window.location.href = "/expired-link";
    }
  }, [et]);


  return (
      <div
        className={`relative w-screen h-screen flex overflow-hidden`}
      >
        <div className="flex w-full h-full overflow-x-hidden overflow-y-auto">
          <main 
              className="flex flex-col h-fit w-screen relative justify-center items-center relative"
          >

              <Navbar loading={loading} setLoading={setLoading}/>

              <div 
                className="w-full md:h-[500px] h-[400px] absolute top-0 left-0 flex flex-col gap-2 items-center justify-end"
                style={{
                  backgroundImage: "url('/background-image/page-bg.png')",
                  backgroundSize: "cover",           
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center" 
                }}
              >
                  <h1 className="text-[var(--text-white)] lg:text-[70px] sm:text-[50px] text-[7.2vw] font-psBold">Book Now</h1>
                  <p className="text-[var(--text-gray)] font-pMdeium lg:text-[25px] sm:text-[20px] text-[2.5vw] mb-32">Ready to Book? Let’s Get Started!</p>
              </div>
              
              <div className="w-full md:h-[350px] h-[250px]"></div>

              <div className="flex flex-col justify-center items-center w-full h-fit bg-[var(--page-bg)] gap-10">

                  <div className="h-fit flex md:gap-12 gap-4 justify-center mt-20 bg-white rounded-[10px] p-6 w-fit">
                      <div className="flex md:gap-4 gap-1 items-center">
                          <p 
                              className={`${activeForms == 1 ? "bg-[var(--text-blue)]" : "bg-[var(--text-gray)]"} lg:text-[20px] md:text-[18px] text-[3vw] 
                              lg:h-[50px] lg:w-[50px] sm:h-[40px] sm:w-[40px] h-[30px] w-[30px] rounded-[100%] flex items-center justify-center font-pMedium`}
                          >
                          1
                          </p>
                          <p className={`text-[var(--text-black)] font-pMedium lg:text-[20px] md:text-[18px] text-[3vw]`}>Reservation</p>
                          <svg className="md:ml-5 ml-2 lg:w-[13px] lg:h-[24px] w-[9px] h-[20px]" viewBox="0 0 13 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path 
                                  d="M13 11.9999C13 12.4087 12.8439 12.8174 12.5325 13.129L2.72635 22.935C2.10256 23.5588 1.09119 23.5588 0.467654 22.935C-0.155885 22.3115 -0.155885 21.3003 0.467654 20.6764L9.14465 11.9999L0.467957 3.3234C-0.155582 2.69961 -0.155582 1.68855 0.467957 1.06506C1.0915 0.440966 2.10286 0.440966 2.72666 1.06506L12.5328 10.8709C12.8443 11.1827 13 11.5914 13 11.9999Z" 
                                  style={{
                                      fill : activeForms == 1 ? "var(--text-black)" : "var(--text-gray)"
                                  }}
                              />
                          </svg>
                      </div>

                      <div className="flex md:gap-4 gap-1 items-center">
                          <p 
                              className={`${activeForms == 2 ? "bg-[var(--text-blue)]" : "bg-[var(--text-gray)]"} md:text-[18px] text-[3vw]
                              lg:h-[50px] lg:w-[50px] sm:h-[40px] sm:w-[40px] h-[30px] w-[30px] rounded-[100%] flex items-center justify-center font-pMedium`}
                          >
                          2
                          </p>
                          <p className={`${activeForms == 2 ? "text-[var(--text-black)]" : "text-[var(--text-gray)]"} font-pMedium lg:text-[20px] md:text-[18px] text-[2.8vw]`}>Booking <br/> Details</p>
                          <svg className="md:ml-5 ml-2 lg:w-[13px] lg:h-[24px] w-[9px] h-[20px]" viewBox="0 0 13 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path 
                                  d="M13 11.9999C13 12.4087 12.8439 12.8174 12.5325 13.129L2.72635 22.935C2.10256 23.5588 1.09119 23.5588 0.467654 22.935C-0.155885 22.3115 -0.155885 21.3003 0.467654 20.6764L9.14465 11.9999L0.467957 3.3234C-0.155582 2.69961 -0.155582 1.68855 0.467957 1.06506C1.0915 0.440966 2.10286 0.440966 2.72666 1.06506L12.5328 10.8709C12.8443 11.1827 13 11.5914 13 11.9999Z" 
                                  style={{
                                      fill : activeForms == 2 ? "var(--text-black)" : "var(--text-gray)"
                                  }}
                              />
                          </svg>
                      </div>
                      
                      <div className="flex md:gap-4 gap-1 items-center">
                          <p 
                              className={`${activeForms == 3 ? "bg-[var(--text-blue)]" : "bg-[var(--text-gray)]"} md:text-[18px] text-[3vw]
                              lg:h-[50px] lg:w-[50px] sm:h-[40px] sm:w-[40px] h-[30px] w-[30px] rounded-[100%] flex items-center justify-center font-pMedium`}
                          >
                          3
                          </p>
                          <p className={`${activeForms == 3 ? "text-[var(--text-black)]" : "text-[var(--text-gray)]"} font-pMedium lg:text-[20px] md:text-[18px] text-[3vw]`}>Payment</p>
                      </div>
                  </div>


                  <Reservation
                      isActive={activeForms == 1}

                      bookingType={bookingType}
                      handleBookingType={handleBookingType}

                      bookingDate={bookingDate}
                      setBookingDate={setBookingDate}

                      timeItems={timeItems}
                      handleBookingTime={handleBookingTime}
                      startTime={startTime}
                      endTime={endTime}

                      startIdx={startIdx}
                      endIdx={endIdx}

                      bookingSetup={bookingSetup}
                      setupOptions={setupOptions}
                      handleBookingSetup={handleBookingSetup}

                      addOnsList={addOnsList}
                      duration={duration}
                      setActiveForms={setActiveForms}
                      handleAddOnsDuration={handleAddOnsDuration}

                      total={total}
                      total2={total2}

                      withoutLightDuration={withoutLightDuration}
                      withLightDuration={withLightDuration}
                      withoutLightComputation={withoutLightComputation}
                      withLightComputation={withLightComputation}
                      totalComputation={totalComputation}
                  
                  />

                  <BookingDetails
                      isActive={activeForms == 2}
                      
                      name={name}
                      setName={setName}

                      email={email}
                      setEmail={setEmail}

                      phoneNumber={phoneNumber}
                      setPhoneNumber={setPhoneNumber}

                      eventType={eventType}
                      setEventType={setEventType}

                      messageRequest={messageRequest}
                      setMessageRequest={setMessageRequest}

                      setActiveForms={setActiveForms}
                  />

                  <Payment
                      isActive={activeForms == 3}

                      paymentPreference={paymentPreference}
                      handlePaymentPreference={handlePaymentPreference}

                      paymentMethod={paymentMethod}
                      handlePaymentMethod={handlePaymentMethod}

                      creditCard={creditCard}
                      handleCreditCard={handleCreditCard}

                      bookingType={bookingType}
                      addOnsList={addOnsList}
                      bookingDate={bookingDate}
                      startIdx={startIdx}
                      endIdx={endIdx}
                      timeItems={timeItems}
                      bookingSetup={bookingSetup}
                      duration={duration}

                      booker_name={name}
                      booker_email={email}
                      booker_phone_number={phoneNumber}
                      booker_event_type={eventType}
                      booker_message_request={messageRequest}

                      setActiveForms={setActiveForms}
                      total={total}
                      total2={total2}

                      withoutLightDuration={withoutLightDuration}
                      withLightDuration={withLightDuration}
                      withoutLightComputation={withoutLightComputation}
                      withLightComputation={withLightComputation}
                      totalComputation={totalComputation}
                      setIsFeedBack={setIsFeedBack}
                      disabledPayment={true}
                      user_receipt_number={receipt_number}
                      bookingStatus={bookingStatus}
                  />

                  
                  <div className="w-full h-[200px] bg-transparent">

                  </div>
              </div>

              <Footer/>
          </main>
        </div>
        <FeedBackModal
          isShow={isFeedBack}
        />
      </div>
  );
}
