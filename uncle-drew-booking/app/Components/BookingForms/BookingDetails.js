import React, { useState } from 'react'
import InputField from '../Fields/InputField'
import TextAreaField from '../Fields/TextAreaField'
import PrimaryButton from '../Buttons/PrimaryButton'

const BookingDetails = ({
    isActive,

    name,
    setName,

    email,
    setEmail,

    phoneNumber,
    setPhoneNumber,

    eventType,
    setEventType,

    messageRequest,
    setMessageRequest,

    setActiveForms

}) => {

  const [errorInput, setErrorInput] = useState(false);

  const handleEmailInput = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    const isValid = /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(emailValue);
    setErrorInput(!isValid);
  };

  return (
    <div className={`${isActive ? "flex" : "hidden"} h-fit w-full flex-col gap-5 items-center mt-7`}>

        <div className="w-[80%] flex flex-col items-center justify-center">

            <h1 className="text-[var(--text-black)] font-psBold sm:text-[32px] text-[6.5vw]">Booking Details</h1>
            <p className="text-[var(--text-gray)] font-pMdeium sm:text-[18px] text-[3.5vw] text-center">Provide the necessary information to confirm your reservation.</p>

        </div>

        <div className="lg:w-[50%] w-[90%] flex flex-col h-fit justify-center items-center gap-5">

            <InputField label={"Name"} id={"name"} placeholder={"Enter Full Name"} value={name} handleInput={(e) => setName(e.target.value)}/>
            
            <div className="flex sm:flex-row flex-col gap-5 w-full h-fit">
                <InputField label={"Email Address"} id={"email-address"} placeholder={"Enter Email"} value={email} handleInput={handleEmailInput} errorInput={errorInput}/>
                <InputField label={"Phone Number"} id={"phone-number"} placeholder={"Enter Phone Number"} value={phoneNumber} handleInput={(e) => setPhoneNumber(e.target.value)}/>
            </div>

            <InputField label={"Type of Event"} id={"event-type"} placeholder={"Enter Event"} value={eventType} handleInput={(e) => setEventType(e.target.value)}/>
            
            <TextAreaField label={"Message/Request"} id={"message-request"} placeholder={"Enter Request"} value={messageRequest} handleInput={(e) => setMessageRequest(e.target.value)}/>

            <div className="w-[60%] h-fit flex gap-5">
                <PrimaryButton background={"transparent"} label={"Back"} color={"var(--text-blue)"} border={"1px solid var(--text-blue)"} handleClick={() => setActiveForms(1)}/>
                <PrimaryButton disabled={!(name && (email && !errorInput) && phoneNumber && eventType)} background={"var(--text-blue)"} label={"Continue"} color={"var(--text-white)"} border={"1px solid var(--text-blue)"} handleClick={() => setActiveForms(3)}/>
            </div>
        </div>

    </div>
  )
}

export default BookingDetails
