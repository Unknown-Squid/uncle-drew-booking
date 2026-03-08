"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import InputField from '../Components/Fields/InputField';
import PrimaryButton from '../Components/Buttons/PrimaryButton';
import { GetAccountDataByKey } from '../apiClient/AdminAccountData';
import Swal from 'sweetalert2'
import Loading from '../Components/Page/Loading';

export default function Admin() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        if (password && username){
            const data = await GetAccountDataByKey(username, password);
            console.log(data)

            if (data.status == "success"){
                localStorage.setItem("token", data.data.token);
                Swal.fire({
                    title: data.status,
                    text: data.message,
                    icon: 'success',
                    confirmButtonText: 'Ok',
                    customClass: {
                    confirmButton: 'custom-done-button',
                    popup: 'custom-swal-popup',
                    },
                    buttonsStyling: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "/admin/booking"
                    } 
                });
            } else {
                Swal.fire({
                    title: data.status,
                    text: data.message,
                    icon: 'error',
                    confirmButtonText: 'Ok',
                    customClass: {
                    confirmButton: 'custom-done-button',
                    popup: 'custom-swal-popup',
                    },
                    buttonsStyling: false,
                })
            }

        }
    }

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            const token = localStorage.getItem("token");

            if (token){
                window.location.href = "/admin/booking"
            } else {
                document.fonts.ready.then(() => {
                    setLoading(false);
                });
            }
        }, 2000);
    
        return () => clearTimeout(timer);
    }, []); 

    if (loading){
        return <Loading/>
    }

    return (
        <main 
            className="flex flex-col h-screen w-screen relative bg-[var(--page-bg)] relative"
        >

            <div 
                className="w-screen h-screen bg-transparent z-10 flex items-start justify-center"
                style={{
                backgroundImage: "url('/background-image/hero-bg.png')",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                }}
            >
                <div className='flex flex-col gap-1 items-center mt-32'>
                    <Image
                        src={"/logo/uncle-drew-logo.png"}
                        alt='uncle-drew-navbar-logo'
                        width={500}
                        height={500}
                        className='w-[380px] h-[380px]'
                    />

                    <div className='flex h-fit gap-6 font-moderniz'>
                        <p 
                            className="flex flex-col relative"
                        >
                            <span 
                                className='text-[var(--text-white)] text-[50px]'
                                style={{ letterSpacing: '0.2em' }}
                            >
                                UNCLE
                            </span>
                            <span 
                                className='text-[var(--text-blue)] text-[29.5px] absolute top-[80%] left-0'
                                style={{ letterSpacing: '0.6em' }}
                            >
                                SPORTS
                            </span>
                        </p>
                        <p 
                            className="flex flex-col gap-1 relative"
                        >
                            <span 
                            className='text-[var(--text-white)] text-[50px]'
                            style={{ letterSpacing: '0.2em' }}
                            >
                            DREW
                            </span>
                            <span 
                            className='text-[var(--text-blue)] text-[29.5px] absolute top-[80%] left-0'
                            style={{ letterSpacing: '0.54em' }}
                            >
                            CENTER
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="absolute top-0 left-0 w-screen h-screen flex items-center justify-center bg-transparent backdrop-blur-sm z-10">

                <div className='w-[50%] h-[80%] bg-[var(--text-blue)]/[.6] rounded-[10px] flex justify-center items-start'>
                    <div className='w-[70%] h-fit flex flex-col gap-5 items-center mt-20'>

                        <h1 className='text-[var(--text-white)] font-psBold text-[35px] mb-20 flex flex-col'>
                            <div className='w-full h-fit relative flex justify-center'>
                                <Image
                                    src="/logo/uncle-drew-logo.png"
                                    alt="Admin Profile Picture"
                                    width={500}
                                    height={500}
                                    className="w-[80px] h-[80px] bounce"
                                />
                                <div className="bouncy-castle bg-white">
                                    <div className="ball-shadow"></div>
                                </div>
                            </div>
                            Admin Portal
                        </h1>
                        <InputField 
                            label={"Username"} 
                            id={"username"} 
                            placeholder={"Enter Username"} 
                            value={username} 
                            labelCustomStyle={"text-[var(--text-white)] mb-2"}
                            handleInput={(e) => setUsername(e.target.value)}
                        />
                        <InputField 
                            label={"Password"} 
                            id={"password"} 
                            placeholder={"Enter Password"} 
                            value={password} 
                            labelCustomStyle={"text-[var(--text-white)] mb-2"}
                            handleInput={(e) => setPassword(e.target.value)}
                        />

                        <PrimaryButton
                            background={"var(--text-blue)"} 
                            label={"Login"} 
                            color={"var(--text-white)"} 
                            border={"1px solid var(--text-blue)"}
                            customStyle={"px-12 w-fit"}
                            handleClick={handleLogin}
                            disabled={!(username && password)}
                        />
                    </div>
                </div>
            </div>
        </main>  
    );
}
  
