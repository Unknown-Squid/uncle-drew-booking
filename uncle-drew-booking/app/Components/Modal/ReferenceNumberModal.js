import React from 'react'
import { CloseOutlined, ReceiptLong } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import InputField from '../Fields/InputField';
import PrimaryButton from '../Buttons/PrimaryButton';

const ReferenceNumberModal = ({ 
    isShow,
    cancelModal,
    referenceNumber,
    setReferenceNumber
}) => {

  return (
    <div className={`absolute top-0 left-0 w-full h-full bg-black/[.5] ${isShow ? "flex" : "hidden"} items-center justify-center z-10`}>

        <div className={`xl:w-[30%] lg:w-[50%] sm:w-[70%] w-[98%] h-fit bg-white rounded-[10px] px-6 py-4 ${isShow ? "flex" : "hidden"} flex-col overflow-x-hidden overflow-y-auto`}>

            <div className="flex flex-row justify-between text-black">
                <div className="flex flex-row gap-[8px] items-center">
                    <ReceiptLong />
                    Confirmation
                </div>
                <div>
                    <IconButton
                        onClick={cancelModal}
                    >
                        <CloseOutlined />
                    </IconButton>
                </div>
            </div>

            <h2 className="text-[var(--text-dark-blue)] md:text-[30px] text-[20px]  mt-5">Enter Your Reference Number</h2>
            <p className="text-[var(--text-dark-blue)] md:text-[18px] text-[16px]  mt-5 mb-5">
                Please enter the payment transaction reference number to verify the booking by the admin.
            </p>

            <InputField label={"Reference Number"} id={"reference-number"} placeholder={"Enter your reference number"} value={referenceNumber} handleInput={(e) => setReferenceNumber(e.target.value)}/>

            <div className="w-full h-fit flex gap-5 mt-10">
                <PrimaryButton background={"transparent"} label={"Cancel"} color={"var(--text-blue)"} border={"1px solid var(--text-blue)"} handleClick={cancelModal}/>
                <PrimaryButton disabled={!referenceNumber} background={"var(--text-blue)"} label={"Continue"} color={"var(--text-white)"} border={"1px solid var(--text-blue)"} handleClick={cancelModal}/>
            </div>
        </div>

    </div>
  )
}

export default ReferenceNumberModal
