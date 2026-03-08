import Image from 'next/image'
import React from 'react'

const ExpiredLinkPage = () => {
  return (
    <div className='flex font-pMedium text-black text-[20px] pt-20 pl-20 bg-black w-screen h-screen text-white'>
        <p className='mt-10'>Sorry, this link is no longer accepting responses ...</p>
        <div className='h-fit relative flex justify-center'>
            <Image
                src="/logo/uncle-drew-logo.png"
                alt="Admin Profile Picture"
                width={500}
                height={500}
                className=" w-[140px] h-[140px] bounce"
            />
            <div className="bouncy-castle bg-white">
                <div className="ball-shadow"></div>
            </div>
        </div>
    </div>
  )
}

export default ExpiredLinkPage
