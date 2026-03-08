"use client"
import { GetBookingByKey } from "@/app/apiClient/BookingData";
import BookingViewCard from "@/app/Components/Card/BookingViewCard";
import BookingReceiptModal from "@/app/Components/Modal/BookingReceiptModal";
import Footer from "@/app/Components/Page/Footer";
import Navbar from "@/app/Components/Page/Navbar";
import { useEffect, useMemo, useState } from "react";

export default function SearchBooking() {
  
  // ----------- VARIABLES -----------
  const [searchFilter, setSearchFilter] = useState("");
  const [activeTab, setActiveTab] = useState("search");
  const [bookingData, setBookingData] = useState([]);
  const [selected, setSelected] = useState(0);
  const [isShow, setIsShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConfirmButton, setShowConfirmButton] = useState(true);

  const [timeItems, setTimeItems] = useState([
    { label: "8:00 am" },
    { label: "9:00 am" },
    { label: "10:00 am"},
    { label: "11:00 am"},
    { label: "12:00 nn"},
    { label: "1:00 pm"},
    { label: "2:00 pm"},
    { label: "3:00 pm"},
    { label: "4:00 pm"},
    { label: "5:00 pm"},
    { label: "6:00 pm"},
    { label: "7:00 pm"},
    { label: "8:00 pm"},
    { label: "9:00 pm"},
    { label: "10:00 pm"},
  ]);

  const confirmBooking = (item, showButton) => {
      setSelected(item);
      setIsShow(true);
      setShowConfirmButton(showButton);
  }

  const handleSearchBooking = async (e) => {
    if (e.key === 'Enter') {
        if (searchFilter) {
            const data = await GetBookingByKey("receipt_number", searchFilter);
            if (data && data.length > 0) {
                setBookingData(data);
            }
        }
    }
  }



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
                <div className="w-full h-[200px] flex flex-col gap-2 items-center">
                    <h1 className="text-[var(--text-white)] lg:text-[70px] sm:text-[50px] text-[7.2vw] font-psBold">Search Booking</h1>
                    <p className="text-[var(--text-gray)] font-pMdeium lg:text-[25px] sm:text-[20px] text-[2.5vw]">Use your <b>Receipt Number</b> to view your booking</p>
                </div>
            </div>

            <div className="w-full md:h-[350px] h-[250px]"></div>

            <div className="flex flex-col justify-center items-center w-full h-[500px] bg-[var(--page-bg)] gap-10">

                <div className='flex items-center rounded-[10px] h-[80px] lg:w-[60%] w-[90%] bg-[var(--text-white)] border border-[var(--border-light-gray)] px-4 py-2 mt-10'>
                    <input 
                        type='text' value={searchFilter} 
                        onChange={(e) => setSearchFilter(e.target.value)} 
                        onKeyDown={handleSearchBooking}
                        className='bg-transparent focus:border-[0px] focus:outline-[0px] border-[0px] w-full h-full text-[var(--text-black)]'
                    />
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="#667085" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M13.9995 14L11.1328 11.1333" stroke="#667085" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>

                <div className='h-full flex flex-col w-[90%] gap-2 overflow-x-hidden overflow-y-auto mb-5'>
                {bookingData.length > 0 ? (
                    bookingData.map((item, index) => {
                        const bookingTime = item.booking_time.split(",");
                        const startTimeIndex = bookingTime[0];
                        const endTimeIndex = bookingTime[1];

                        const date = new Date(item.booking_date);
                        const dayText = date.toLocaleDateString('en-US', { weekday: 'short' });
                        const dayNumber = date.getDate();

                        return (
                        <BookingViewCard
                            key={index}
                            bookingDayText={dayText}
                            bookingDayNumber={dayNumber}
                            bookerName={item.name}
                            bookingType={item.booking_type}
                            bookingStartTime={timeItems[startTimeIndex].label}
                            bookingEndTime={timeItems[endTimeIndex].label}
                            bookingSetUp={item.sports_center_settings}
                            activeTab={activeTab}
                            item={item}
                            confirmBooking={confirmBooking}
                        />
                        );
                    })
                    ) : (
                    <p className='ml-10 text-[var(--text-blue)] md:text-[18px] text-[3.5vw]'>
                        No Record For This Month...
                    </p>
                    )}
                </div>
              </div>

              <Footer/>
          </main>
      </div>
      <BookingReceiptModal
            isShow={isShow}
            cancelModal={() => setIsShow(false)}
            bookingDataInfo={selected}
            timeItems={timeItems}
            showConfirmButton={showConfirmButton}
        />
    </div>
  );
}
