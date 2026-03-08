import Image from 'next/image'
import React from 'react'

const Loading = ({comingSoon = false}) => {
  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center bg-[var(--text-blue)]'>

        <div className='flex h-fit gap-6 font-moderniz mb-20'>
          <p 
            className="flex flex-col relative"
          >
              <span 
                className='text-[var(--text-white)] lg:text-[50px] md:text-[40px] text-[6.5vw]'
                style={{ letterSpacing: '0.2em' }}
              >
                UNCLE
              </span>
              <span 
                className='text-[var(--text-black)] lg:text-[29.5px] md:text-[23.5px] text-[3.8vw] absolute top-[80%] left-0'
                style={{ letterSpacing: '0.6em' }}
              >
                SPORTS
              </span>
          </p>
          <p 
            className="flex flex-col gap-1 relative"
          >
            <span 
              className='text-[var(--text-white)] lg:text-[50px] md:text-[40px] text-[6.5vw]'
              style={{ letterSpacing: '0.2em' }}
            >
              DREW
            </span>
            <span 
              className='text-[var(--text-black)] lg:text-[29.5px] md:text-[23.5px] text-[3.8vw] absolute top-[80%] left-0'
              style={{ letterSpacing: '0.54em' }}
            >
              CENTER
            </span>
          </p>
        </div>

        <div className='w-[40%] h-fit relative flex justify-center'>
            <Image
                src="/logo/uncle-drew-logo.png"
                alt="Admin Profile Picture"
                width={500}
                height={500}
                className="lg:w-[250px] lg:h-[250px] md:w-[200px] md:h-[200px] w-[140px] h-[140px] bounce"
            />
            <div className="bouncy-castle bg-white">
                <div className="ball-shadow"></div>
            </div>
        </div>

        {comingSoon &&(<h1 className='text-[var(--text-white)] font-pBold mt-20'>
          coming soon
          <span className="ml-1 animate-dots"></span>
        </h1>)}
    </main>
  )
}

export default Loading
