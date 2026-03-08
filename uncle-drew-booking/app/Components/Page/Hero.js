import Image from 'next/image'
import React from 'react'
import Navbar from './Navbar'
import Link from 'next/link'

const Hero = ({ loading, setLoading }) => {
  return (
    <div 
        className="w-screen h-screen bg-transparent z-10 flex flex-col items-center"
        style={{
          backgroundImage: "url('/background-image/hero-bg.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
    >
      <Navbar loading={loading} setLoading={setLoading}/>
      <div className='flex flex-col gap-1 items-center mt-10'>
        <Image
            src={"/logo/uncle-drew-logo.png"}
            alt='uncle-drew-navbar-logo'
            width={500}
            height={500}
            className='lg:w-[380px] lg:h-[380px] sm:w-[250px] sm:h-[250px] w-[200px] h-[200px]'
        />

        <div className='flex h-fit lg:gap-6 sm:gap-4 gap-2 font-moderniz'>
          <p 
            className="flex flex-col relative"
          >
              <span 
                className='text-[var(--text-white)] lg:text-[50px] sm:text-[30px] text-[20px]'
                style={{ letterSpacing: '0.2em' }}
              >
                UNCLE
              </span>
              <span 
                className='text-[var(--text-blue)] lg:text-[29.5px] sm:text-[17.5px] text-[11.5px] absolute top-[80%] left-0'
                style={{ letterSpacing: '0.6em' }}
              >
                SPORTS
              </span>
          </p>
          <p 
            className="flex flex-col gap-1 relative"
          >
            <span 
              className='text-[var(--text-white)] lg:text-[50px] sm:text-[30px] text-[20px]'
              style={{ letterSpacing: '0.2em' }}
            >
              DREW
            </span>
            <span 
              className='text-[var(--text-blue)] lg:text-[29.5px] sm:text-[17.5px] text-[11.5px] absolute top-[80%] left-0'
              style={{ letterSpacing: '0.54em' }}
            >
              CENTER
            </span>
          </p>
        </div>
      </div>

      <Link href={"/booking/booking-form"} className='w-fit mt-[56px] lg:px-18 lg:py-5 px-14 py-4 font-pBold lg:text-[20px] text-[16px] text-[var(--text-white)] rounded-[10px] cursor-pointer bg-[var(--text-blue)]'>
          Book Now
      </Link>
    </div>
  )
}

export default Hero
