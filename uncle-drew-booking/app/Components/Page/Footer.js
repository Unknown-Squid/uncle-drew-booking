import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='h-[300px] w-full bg-black flex flex-col justify-center items-center gap-5'>

        <div className='flex lg:flex-row flex-col w-[80%] justify-between items-center h-fit'>
            
            <div className='flex h-fit gap-1 items-center'>
                <Image
                    src={"/logo/uncle-drew-logo.png"}
                    alt='uncle-drew-navbar-logo'
                    width={500}
                    height={500}
                    className='sm:w-[120px] sm:h-[120px] w-[80px] h-[80px]'
                />

                <div className='flex h-fit gap-2 font-moderniz'>
                    <p 
                        className="flex flex-col"
                    >
                        <span 
                        className='text-[var(--text-white)] sm:text-[18px] text-[14px]'
                        style={{ letterSpacing: '0.2em' }}
                        >
                        UNCLE
                        </span>
                        <span 
                        className='text-[var(--text-blue)] sm:text-[10px] text-[8px]'
                        style={{ letterSpacing: '0.7em' }}
                        >
                        SPORTS
                        </span>
                    </p>
                    <p 
                        className="flex flex-col"
                    >
                    <span 
                        className='text-[var(--text-white)] sm:text-[18px] text-[14px]'
                        style={{ letterSpacing: '0.2em' }}
                    >
                        DREW
                    </span>
                    <span 
                        className='text-[var(--text-blue)] sm:text-[10px] text-[8px]'
                        style={{ letterSpacing: '0.65em' }}
                    >
                        CENTER
                    </span>
                    </p>
                </div>
            </div>

            <div className='flex lg:gap-24 lg:mt-0 gap-10 mt-5 justify-between'>
                <Link href="/" className='text-[var(--text-white)] sm:text-[20px] text-[15px] font-pMedium text-center'>Home</Link>
                <Link href="/#contact-us" className='text-[var(--text-white)] sm:text-[20px] text-[15px] font-pMedium text-center'>Contact Us</Link>
                <Link href="/booking/booking-form" className='text-[var(--text-white)] sm:text-[20px] text-[15px] font-pMedium text-center'>Book</Link>
            </div>
        </div>

        <div className='flex lg:flex-row flex-col w-[80%] justify-between items-center h-fit'>

            <p className='lg:text-left text-center text-[var(--text-white)] text-[14px] font-pMedium ml-5'>
                Warehouse 20 Phase 5, Century Commercial Complex, Salawag, Dasmarinas City, Caviite
            </p>


            <div className='flex lg:mt-0 mt-5 h-full w-fit items-center justify-center gap-8'>
                <Link 
                    href="https://www.facebook.com/profile.php?id=61564280814117"
                    aria-label="Visit our Facebook page"
                >
                    <svg width="13" height="25" viewBox="0 0 13 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.08988 24.5137V13.5669H11.7628L12.3138 9.29955H8.08988V6.57544C8.08988 5.34031 8.43146 4.49859 10.2046 4.49859L12.4625 4.49766V0.680748C12.072 0.630006 10.7317 0.513672 9.1717 0.513672C5.91418 0.513672 3.68402 2.50203 3.68402 6.15279V9.29955H0V13.5669H3.68402V24.5137H8.08988Z" fill="white"/>
                    </svg>
                </Link> 
                <Link 
                    href="https://www.google.com/search?sxsrf=AE3TifNJpQVZ87EwHujxfzNMfYK82cUuxg:1748069099470&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E5VDQqw4C8RI0q3J5IALi0TeAymfFdTISnJQexdoKDti0f8ox0aEalsomU9KmITB_qrknUhXzYXd0pZOfpMpd-kX8FOU7N4Vea-Ma7yG4oW6rRdAO4QKgw_6HxqQxH3N-qgTpzA%3D&q=UNCLE+DREW+Sports+Center+salawag+Reviews"
                    aria-label="Read our Google reviews"
                >
                    <svg width="17" height="23" viewBox="0 0 17 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.57135 0.513672C4.10032 0.513672 0.462891 4.1511 0.462891 8.62208C0.462891 14.1707 7.71916 22.3164 8.02811 22.6605C8.31829 22.9837 8.82493 22.9831 9.11458 22.6605C9.42353 22.3164 16.6798 14.1707 16.6798 8.62208C16.6797 4.1511 13.0423 0.513672 8.57135 0.513672ZM8.57135 12.7016C6.32186 12.7016 4.49182 10.8716 4.49182 8.62208C4.49182 6.3726 6.3219 4.54256 8.57135 4.54256C10.8208 4.54256 12.6508 6.37264 12.6508 8.62213C12.6508 10.8716 10.8208 12.7016 8.57135 12.7016Z" fill="white"/>
                    </svg>
                </Link>
            </div>
        </div>
      
    </div>
  )
}

export default Footer
