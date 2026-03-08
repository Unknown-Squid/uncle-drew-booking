import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

const AdminNavbar = () => {

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/admin"
  }

  return (
    <div className='w-[18%] h-full bg-[var(--text-black)] flex flex-col justify-between flex-shrink-0'>
        <div className='w-full h-fit flex flex-col items-center gap-10'>
            <div className='w-[85%] h-fit py-10 flex justify-center'>
                <Image
                    src={"/logo/uncle-drew-logo.png"}
                    alt='Uncle Drew Sports Center Logo'
                    width={500}
                    height={500}
                    className='w-[150px] h-[150px]'
                />
            </div>
            <Link href="/" className='text-[var(--text-white)] w-[85%] gap-5 flex items-center text-[20px] font-psBold'>
                <svg width="25" height="25" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_76_5001)">
                        <path d="M5.83333 19.375C5.83333 19.72 5.53167 20 5.16 20H0.673333C0.301667 20 0 19.72 0 19.375C0 17.8792 1.30583 16.6667 2.91667 16.6667C4.5275 16.6667 5.83333 17.8792 5.83333 19.375ZM17.0833 16.6667C15.4725 16.6667 14.1667 17.8792 14.1667 19.375C14.1667 19.72 14.4683 20 14.84 20H19.3275C19.6992 20 20.0008 19.72 20.0008 19.375C20.0008 17.8792 18.6942 16.6667 17.0833 16.6667ZM10 16.6667C8.50417 16.6667 7.08333 17.8792 7.08333 19.375C7.08333 19.72 7.36333 20 7.70833 20H12.2917C12.6367 20 12.9167 19.72 12.9167 19.375C12.9167 17.8792 11.4958 16.6667 10 16.6667ZM17.0833 15.8333C18.2342 15.8333 19.1667 14.9008 19.1667 13.75C19.1667 12.5992 18.2342 11.6667 17.0833 11.6667C15.9325 11.6667 15 12.5992 15 13.75C15 14.9008 15.9325 15.8333 17.0833 15.8333ZM10 15.8333C11.1508 15.8333 12.0833 14.9008 12.0833 13.75C12.0833 12.5992 11.1508 11.6667 10 11.6667C8.84917 11.6667 7.91667 12.5992 7.91667 13.75C7.91667 14.9008 8.84917 15.8333 10 15.8333ZM2.91667 15.8333C4.0675 15.8333 5 14.9008 5 13.75C5 12.5992 4.0675 11.6667 2.91667 11.6667C1.76583 11.6667 0.833333 12.5992 0.833333 13.75C0.833333 14.9008 1.76583 15.8333 2.91667 15.8333ZM20 8.75V4.58333C20 2.05667 17.9442 0 15.4167 0H4.58333C2.05583 0 0 2.05667 0 4.58333V8.75C0 9.44 0.559167 10 1.25 10C1.94083 10 2.5 9.44 2.5 8.75V4.58333C2.5 3.43417 3.435 2.5 4.58333 2.5H15.4167C16.565 2.5 17.5 3.43417 17.5 4.58333V8.75C17.5 9.44 18.0592 10 18.75 10C19.4408 10 20 9.44 20 8.75Z" fill="white"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_76_5001">
                            <rect width="20" height="20" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
                Booking
            </Link>
        </div>

        <div className='border-t-2 border-[var(--border-dirty-white)] w-full flex justify-center py-10'>
            <div className='flex justify-between w-[85%] items-center'>
                <div className='flex gap-5 items-center'>
                    <Image
                        src={"/logo/uncle-drew-logo.png"}
                        alt='Admin Profile Picture'
                        width={500}
                        height={500}
                        className='w-[60px] h-[60px] rounded-[100%]'
                    />
                    <p className='text-[var(--text-blue)] font-iRegular text-[25px]'>Admin</p>
                </div>
                <button
                    type='button'
                    className='w-fit h-fit bg-transparent cursor-pointer'
                    onClick={handleLogout}
                >
                    <svg width="25" height="25" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M7.2611 8.20998C6.89651 8.20998 6.60824 8.49331 6.60824 8.85164C6.60824 9.20164 6.89651 9.49331 7.2611 9.49331H12.3483V13.4766C12.3483 15.5183 10.661 17.185 8.57529 17.185H4.44618C2.3689 17.185 0.681641 15.5266 0.681641 13.485V4.22664C0.681641 2.17664 2.37738 0.518311 4.45465 0.518311H8.59225C10.6611 0.518311 12.3483 2.17664 12.3483 4.21831V8.20998H7.2611ZM15.3746 5.96845L17.8079 8.39345C17.9329 8.51845 17.9996 8.67679 17.9996 8.85179C17.9996 9.01845 17.9329 9.18512 17.8079 9.30179L15.3746 11.7268C15.2496 11.8518 15.0829 11.9185 14.9246 11.9185C14.7579 11.9185 14.5913 11.8518 14.4663 11.7268C14.2163 11.4768 14.2163 11.0685 14.4663 10.8185L15.7996 9.49345H12.3496V8.21012H15.7996L14.4663 6.88512C14.2163 6.63512 14.2163 6.22679 14.4663 5.97679C14.7163 5.71845 15.1246 5.71845 15.3746 5.96845Z" fill="white"/>
                    </svg>
                </button>
            </div>

        </div>
      
    </div>
  )
}

export default AdminNavbar
