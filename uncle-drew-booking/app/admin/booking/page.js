"use client"
import { GetBooking, GetBookingByMonth, UpdateBookingStatus } from '@/app/apiClient/BookingData';
import AdminNavbar from '@/app/Components/AdminPage/AdminNavbar';
import BookingViewCard from '@/app/Components/Card/BookingViewCard';
import SelectMonthField from '@/app/Components/Fields/SelectMonthField';
import BookingReceiptModal from '@/app/Components/Modal/BookingReceiptModal';
import Loading from '@/app/Components/Page/Loading';
import React, { useEffect, useState } from 'react'

export default function AdminBookingView() {

    const [activeTab, setActiveTab] = useState("pending");
    const [monthFilter, setMonthFilter] = useState("");
    const [searchFilter, setSearchFilter] = useState("");
    const [bookingData, setBookingData] = useState([]);
    const [selected, setSelected] = useState(0);
    const [isShow, setIsShow] = useState(false);
    const [showConfirmButton, setShowConfirmButton] = useState(true);
    const [loading, setLoading] = useState(true);

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

    const handleMonthChange = async (e) => {
        setMonthFilter(e.target.value)
        const data = await GetBookingByMonth(e.target.value.toLowerCase());
        setBookingData(data);
    }

    const confirmBooking = (item, showButton) => {
        setSelected(item);
        setIsShow(true);
        setShowConfirmButton(showButton);
    }

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            window.location.href = "/admin";
        } else {
            const runAll = async () => {
                await fetchAllBookingData(); // wait for outdated statuses to update
                await fetchBookingData();    // then fetch the current month's bookings
            };

            const fetchBookingData = async () => {
                const currentMonth = new Date().toLocaleString('default', { month: 'long' });
                setMonthFilter(currentMonth);

                const data = await GetBookingByMonth(currentMonth.toLowerCase());

                if (data && data.length > 0) {
                    setBookingData(data);
                    document.fonts.ready.then(() => {
                        setLoading(false);
                    });
                }
            };

            const fetchAllBookingData = async () => {
                try {
                    const data = await GetBooking();

                    if (!data || data.length === 0) return;

                    const outdatedBookings = data.filter(item => {
                    const bookingDate = new Date(item.booking_date);
                    bookingDate.setHours(0, 0, 0, 0);

                    const today = new Date();
                    today.setHours(0, 0, 0, 0);

                    return bookingDate < today; // now only truly outdated dates will pass
                    });

                    const updatePromises = outdatedBookings.map(item => {
                    const bookingData = {
                        id: item.id,
                        status: 'done',
                    };
                    return UpdateBookingStatus(bookingData);
                    });

                    await Promise.all(updatePromises);

                } catch (error) {
                    console.error("Error updating outdated booking statuses:", error);
                }
            };

            runAll(); // Execute both in order
        }
    }, []);

    if (loading){
        return <Loading/>
    }

    const filteredData = bookingData.filter(item => {
        const matchesStatus = item.status === activeTab;
        const matchesSearch =
            item.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
            item.receipt_number.toLowerCase().includes(searchFilter.toLowerCase());

        return matchesStatus && matchesSearch;
    });

    return (
      <main 
        className="flex h-screen w-screen relative bg-[var(--page-bg)] relative"
      >
        <AdminNavbar/>

        <div className='w-[82%] h-full flex flex-col items-center bg-transparent flex-shrink-0 gap-5'>

            <div className='w-[90%] h-fit flex justify-between items-center mt-10 mb-5'>

                <div className='w-fit h-fit flex flex-col'>
                    <h1 className='text-[var(--text-dark-blue)] text-[35px] font-psBold'>Bookings</h1>
                    <p className='text-[var(--text-black)] text-[18px] font-pRegular'>Text</p>
                </div>

                <div className='flex items-center rounded-[10px] h-[50px] w-[300px] bg-[var(--text-white)] border border-[var(--border-light-gray)] px-4 py-2'>
                    <input type='text' value={searchFilter} onChange={(e) => setSearchFilter(e.target.value)} className='bg-transparent focus:border-[0px] focus:outline-[0px] border-[0px] w-full h-full text-[var(--text-black)]'/>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="#667085" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M13.9995 14L11.1328 11.1333" stroke="#667085" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>

            </div>

            <div className='w-[90%] h-fit bg-transparent mb-5'>
                <div className='flex justify-start bg-[var(--text-white)] gap-3 p-2 w-fit h-fit'>
                    <button
                        type='button' 
                        className={`py-4 px-6 text-[15px] ${activeTab == "pending"? "bg-[var(--text-blue)]/[.2] text-[var(--text-blue)]" : "bg-transparent text-[var(--text-gray)]"} font-psBold rounded-[10px] cursor-pointer`}
                        onClick={() => setActiveTab("pending")}
                    >
                        Pending
                    </button>
                    <button
                        type='button' 
                        className={`py-4 px-6 text-[15px] ${activeTab == "upcoming"? "bg-[var(--text-blue)]/[.2] text-[var(--text-blue)]" : "bg-transparent text-[var(--text-gray)]"} font-psBold rounded-[10px] cursor-pointer`}
                        onClick={() => setActiveTab("upcoming")}
                    >
                        Upcoming
                    </button>
                    <button
                        type='button' 
                        className={`py-4 px-6 text-[15px] ${activeTab == "done"? "bg-[var(--text-blue)]/[.2] text-[var(--text-blue)]" : "bg-transparent text-[var(--text-gray)]"} font-psBold rounded-[10px] cursor-pointer`}
                        onClick={() => setActiveTab("done")}
                    >
                        History
                    </button>

                </div>
            </div>

            <div className='w-[90%] h-fit flex gap-5 items-center mb-2'>
                <div className='text-[var(--text-black)]'>
                    Filter By:
                </div>
                <SelectMonthField monthFilter={monthFilter} handleMonthChange={handleMonthChange} label={activeTab}/>
            </div>

            <h2 className='w-[90%] text-[var(--text-dark-blue)] text-[20px] font-pMedium'>{monthFilter}</h2>

            <div className='h-full flex flex-col w-[90%] gap-2 overflow-x-hidden overflow-y-auto mb-5'>
            {filteredData.length > 0 ? (
                filteredData.map((item, index) => {
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
                        referenceNumber={item.reference_number}
                        activeTab={activeTab}
                        item={item}
                        confirmBooking={confirmBooking}
                    />
                    );
                })
                ) : (
                <p className='ml-10 text-[var(--text-blue)] text-[18px]'>
                    No Record For This Month...
                </p>
                )}
            </div>
        </div>
        <BookingReceiptModal
            isShow={isShow}
            cancelModal={() => setIsShow(false)}
            bookingDataInfo={selected}
            timeItems={timeItems}
            showConfirmButton={showConfirmButton}
        />
      </main>
    );
  }
  
