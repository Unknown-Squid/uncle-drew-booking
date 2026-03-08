import React from 'react'
import PrimaryButton from '../Buttons/PrimaryButton'
import { CloseOutlined, RateReview } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Image from 'next/image';

const FeedBackModal = ({ 
    isShow
}) => {

  return (
    <div className={`absolute top-0 left-0 w-full h-full bg-black/[.5] ${isShow ? "flex" : "hidden"} items-center justify-center z-10`}>

        <div className={`xl:w-[30%] lg:w-[50%] sm:w-[70%] w-[98%] h-[90%] bg-white rounded-[10px] px-6 py-4 ${isShow ? "flex" : "hidden"} flex-col justify-between overflow-x-hidden overflow-y-auto`}>

            <div className='flex flex-col w-full h-fit'>
                <div className="flex flex-row justify-between text-black">
                    <div className="flex flex-row gap-[8px] items-center">
                        <RateReview />
                        Feedback Review
                    </div>
                    <div>
                        <IconButton
                            onClick={() => window.location.reload()}
                        >
                            <CloseOutlined />
                        </IconButton>
                    </div>
                </div>

                <p className="text-[var(--text-dark-blue)] text-[18px] mt-5">
                    Would you like to leave a review in the uncle drew sports center? 
                </p>
            </div>

            <Image
                src={"/image/uncle-drew-sports-center-review.png"}
                width={500}
                height={500}
                alt='usdc review image'
                className='w-full h-[75%] rounded-[25px]'
            />

            <div className='flex gap-5'>
                <PrimaryButton
                    background={"transparent"} 
                    label={"Cancel"} 
                    color={"var(--text-blue)"} 
                    border={"1px solid var(--text-blue)"}
                    handleClick={() => window.location.reload()}
                /> 
                <PrimaryButton
                    background={"var(--text-blue)"}
                    label={"Continue"}
                    color={"var(--text-white)"}
                    border={"1px solid var(--text-blue)"}
                    handleClick={() => {
                        window.open(
                        "https://www.google.com/search?sxsrf=AE3TifNJpQVZ87EwHujxfzNMfYK82cUuxg:1748069099470&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E5VDQqw4C8RI0q3J5IALi0TeAymfFdTISnJQexdoKDti0f8ox0aEalsomU9KmITB_qrknUhXzYXd0pZOfpMpd-kX8FOU7N4Vea-Ma7yG4oW6rRdAO4QKgw_6HxqQxH3N-qgTpzA%3D&q=UNCLE+DREW+Sports+Center+salawag+Reviews",
                        "_blank"
                        );
                        window.location.reload();
                    }}
                />

            </div>

        </div>

    </div>
  )
}

export default FeedBackModal
