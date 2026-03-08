"use client"
import Link from "next/link";
import Hero from "./Components/Page/Hero";
import Footer from "./Components/Page/Footer";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loading from "./Components/Page/Loading";
import dynamic from 'next/dynamic';

// Dynamically import the map with SSR disabled
const UncleDrewMap = dynamic(() => import('@/app/Components/Map/UncleDrewMap'), {
  ssr: false,
});

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const timer = setTimeout(() => {
         document.fonts.ready.then(() => {
            setLoading(false)
          });
      }, 2000);
  
      return () => clearTimeout(timer);
  }, []); 

  if (loading){
    return <Loading/>
  }
  

  return (
    <main 
      className="flex flex-col h-fit w-screen relative bg-[var(--page-bg)]"
    >

      {/* Hero 1 */}
      <Hero loading={loading} setLoading={setLoading}/>
        
      {/* Facilities Pictures */}
      <div className="flex flex-col items-center w-full h-fit z-[1] bg-transparent mb-32">

        <div className="flex flex-col w-full h-fit mt-32 justify-center items-center">

          <h1 className="text-[var(--text-blue)] font-psBold lg:text-[40px] sm:text-[30px] text-[5.2vw]">Our Facilities</h1>
          <p className="text-[var(--text-gray)] font-pMedium text-center lg:text-[20px] sm:text-[15px] text-[2.2vw]">Explore our premium facilities designed for sports, leisure, and unforgettable events.<br/> Perfectly equipped to meet all your needs!</p>


          <div className="grid grid-cols-2 w-[90%] gap-3 mt-32 mb-32">

              <div className="h-full w-full bg-black">
                <Image
                  src={"/facilities/usdc-facility-2.JPG"}
                  alt="facility 1"
                  width={2000}
                  height={2000}
                  className="w-full h-full "
                />

              </div>
              <div className="h-fit w-full grid grid-cols-2 gap-2">
                <div className="bg-black">
                  <Image
                    src={"/facilities/usdc-facility-7.JPG"}
                    alt="facility 7"
                    width={500}
                    height={500}
                    className="w-full h-full "
                  />
                </div>

                <div className="h-full w-full grid grid-cols-1 gap-2">

                  <div className="bg-black">
                    <Image
                      src={"/facilities/usdc-facility-8.JPG"}
                      alt="facility 8"
                      width={500}
                      height={500}
                      className="w-full h-full "
                    />
                  </div>
                  <div className="bg-black">
                    <Image
                      src={"/facilities/usdc-facility-10.JPG"}
                      alt="facility 8"
                      width={500}
                      height={500}
                      className="w-full h-full "
                    />

                  </div>

                </div>
              </div>
              <div className="h-fit w-full grid grid-cols-2 gap-2">
                <div className="bg-black">
                  <div className="bg-black h-full">
                    <Image
                        src={"/facilities/usdc-facility-11.JPG"}
                        alt="facility 8"
                        width={500}
                        height={500}
                        className="w-full h-full "
                      />

                    </div>

                </div>
                <div className="bg-black">

                    <Image
                        src={"/facilities/usdc-facility-12.JPG"}
                        alt="facility 8"
                        width={500}
                        height={500}
                        className="w-full h-full "
                      />

                </div>
                <div className="bg-black">
                    <Image
                        src={"/facilities/usdc-facility-5.JPG"}
                        alt="facility 8"
                        width={500}
                        height={500}
                        className="w-full h-full "
                      />

                </div>
                <div className="bg-black">
                      <Image
                        src={"/facilities/usdc-facility-13.JPG"}
                        alt="facility 8"
                        width={500}
                        height={500}
                        className="w-full h-full "
                      />

                </div>
                
              </div>
              <div className="h-full w-full bg-black">
                    <Image
                        src={"/facilities/usdc-facility-9.JPG"}
                        alt="facility 8"
                        width={2000}
                        height={2000}
                        className="w-full h-full "
                      />
                
              </div>

          </div>

        </div>

      </div>

      {/* Hero 2 */}
      <div
        className="w-full h-[800px] flex flex-col items-center justify-center"
        style={{
          backgroundImage: "url('/background-image/hero3-bg.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="bg-[var(--text-black)]/[0.5] w-full h-full flex flex-col justify-center items-center gap-10">
          <h1 className="font-moderniz lg:text-[60px] md:text-[45px] sm:text-[40px] text-[5.5vw] text-[var(--text-white)] w-full text-center">
            Top-class facility 
            <br/>
            for  your ultimate 
            <br/>
            experience.
          </h1>
          <Link href={"/booking/booking-form"} className='w-fit lg:px-18 lg:py-5 sm:px-14 sm:py-4 px-10 py-3 font-pBold lg:text-[20px] sm:text-[16px] text-[12px] text-[var(--text-white)] rounded-[10px] cursor-pointer bg-[var(--text-blue)]'>
            Book Now
          </Link>
        </div>
        
        
      </div>

      {/* Contact Details */}
      <div id="contact-us" className="w-full h-[1200px] flex flex-col justify-center items-center bg-transparent">

        <h1 className="text-[var(--text-blue)] font-psBold lg:text-[40px] sm:text-[30px] text-[5.2vw]">Contact Us</h1>
        <p className="text-[var(--text-gray)] font-pMedium text-center lg:text-[20px] sm:text-[15px] text-[2.2vw]">Have questions or need assistance? Contact us through the details below, and our <br/> team will be happy to help. We look forward to hearing from you!</p>


        <div className="flex md:flex-row flex-col gap-5 lg:[70%] md:w-[80%] w-[90%] h-fit mt-20">
          <div className="w-fit h-full flex flex-col justify-center gap-5">

            <div className="flex gap-5 w-full">

              <div className="w-fit h-fit p-2 flex items-center justify-center rounded-[10px] bg-[var(--text-blue)]/[.2]">
                <svg className="xl:w-[50px] xl:h-[50px] lg:w-[40px] lg:h-[40px] md:w-[30px] md:h-[30px] w-[28px] h-[28px]" viewBox="0 0 37 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M18.0773 0C10.3861 0 4.13281 6.30911 4.13281 14.0912C4.13281 16.7272 5.29382 19.9974 6.98369 23.2594C10.7043 30.4424 16.9018 37.677 16.9018 37.677C17.1952 38.0199 17.6249 38.2182 18.0773 38.2182C18.5297 38.2182 18.9594 38.0199 19.2528 37.677C19.2528 37.677 25.4503 30.4424 29.1709 23.2594C30.8608 19.9974 32.0218 16.7272 32.0218 14.0912C32.0218 6.30911 25.7685 0 18.0773 0ZM18.0773 8.2634C14.9413 8.2634 12.3962 10.8085 12.3962 13.9445C12.3962 17.0805 14.9413 19.6256 18.0773 19.6256C21.2133 19.6256 23.7584 17.0805 23.7584 13.9445C23.7584 10.8085 21.2133 8.2634 18.0773 8.2634Z" fill="#0D9CE6"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M27.9592 33.3161C29.6388 33.8202 31.0229 34.4441 31.9794 35.1754C32.5991 35.6464 33.0536 36.1071 33.0536 36.669C33.0536 36.9995 32.8656 37.2991 32.6012 37.5986C32.1632 38.0924 31.5125 38.5365 30.7068 38.9497C27.8601 40.4061 23.2573 41.3172 18.0762 41.3172C12.895 41.3172 8.29232 40.4061 5.44558 38.9497C4.6399 38.5365 3.98916 38.0924 3.5512 37.5986C3.28677 37.2991 3.09878 36.9995 3.09878 36.669C3.09878 36.1071 3.55326 35.6464 4.17302 35.1754C5.12951 34.4441 6.51363 33.8202 8.19316 33.3161C9.01124 33.0703 9.47606 32.2047 9.23022 31.3866C8.98438 30.5665 8.11879 30.1017 7.30072 30.3475C4.74319 31.1181 2.75584 32.1737 1.56178 33.3409C0.512331 34.3635 0 35.508 0 36.669C0 38.1192 0.820143 39.5653 2.48728 40.7718C5.41253 42.8872 11.2878 44.4159 18.0762 44.4159C24.8646 44.4159 30.7399 42.8872 33.6651 40.7718C35.3322 39.5653 36.1524 38.1192 36.1524 36.669C36.1524 35.508 35.6401 34.3635 34.5906 33.3409C33.3965 32.1737 31.4092 31.1181 28.8517 30.3475C28.0336 30.1017 27.168 30.5665 26.9222 31.3866C26.6763 32.2047 27.1411 33.0703 27.9592 33.3161Z" fill="#0D9CE6"/>
                </svg>
              </div>

              <div className="flex flex-col h-full justify-center md:text-[1.2vw] sm:text-[2.5vw] text-[3vw]">
                  <p className="text-[var(--text-blue)] font-psBold">Address</p>
                  <p className="text-[var(--text-black)] font-pRegular">Warehouse 20 Phase 5, Century Commercial Complex, Salawag, Dasmarinas City, Caviite</p>
              </div>

            </div>

            <div className="flex gap-5 w-full">

              <div className="w-fit h-fit p-2 flex items-center justify-center rounded-[10px] bg-[var(--text-blue)]/[.2]">
                <svg className="xl:w-[50px] xl:h-[50px] lg:w-[40px] lg:h-[40px] md:w-[30px] md:h-[30px] w-[28px] h-[28px]" viewBox="0 0 46 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.8453 0.247559C18.4451 0.247559 14.1438 1.55236 10.4852 3.99696C6.82657 6.44156 3.97503 9.91616 2.29116 13.9814C0.607296 18.0466 0.166719 22.5199 1.02515 26.8355C1.88358 31.1511 4.00246 35.1152 7.11384 38.2266C10.2252 41.338 14.1894 43.4569 18.505 44.3153C22.8206 45.1737 27.2939 44.7332 31.3591 43.0493C35.4243 41.3654 38.8989 38.5139 41.3435 34.8553C43.7881 31.1967 45.0929 26.8953 45.0929 22.4952C45.0859 16.5969 42.7398 10.9421 38.569 6.77142C34.3983 2.60069 28.7436 0.254517 22.8453 0.247559ZM30.3427 29.9926C29.9634 30.3718 29.4491 30.5848 28.9128 30.5848C28.3765 30.5848 27.8622 30.3718 27.4829 29.9926L21.4154 23.9251C21.036 23.5459 20.8229 23.0315 20.8228 22.4952V10.3601C20.8228 9.82371 21.0359 9.30927 21.4151 8.92998C21.7944 8.55069 22.3089 8.3376 22.8453 8.3376C23.3817 8.3376 23.8961 8.55069 24.2754 8.92998C24.6547 9.30927 24.8678 9.82371 24.8678 10.3601V21.6579L30.3427 27.1328C30.7219 27.5121 30.9349 28.0264 30.9349 28.5627C30.9349 29.099 30.7219 29.6133 30.3427 29.9926Z" fill="#0D9CE6"/>
                </svg>
              </div>

              <div className="flex flex-col h-full justify-center md:text-[1.2vw] sm:text-[2.5vw] text-[3vw]">
                  <p className="text-[var(--text-blue)] font-psBold">Open Hours</p>
                  <p className="text-[var(--text-black)] font-pRegular">Monday - Sunday : 8:00 am - 10:00 pm</p>
              </div>

            </div>

            <div className="flex gap-5 w-full">

              <div className="w-fit h-fit p-2 flex items-center justify-center rounded-[10px] bg-[var(--text-blue)]/[.2]">
                <svg className="xl:w-[50px] xl:h-[50px] lg:w-[40px] lg:h-[40px] md:w-[30px] md:h-[30px] w-[28px] h-[28px]" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M35.7734 31.3418C34.2361 29.8241 32.3169 29.8241 30.7894 31.3418C29.6243 32.4972 28.4591 33.6526 27.3134 34.8276C27.0001 35.1507 26.7357 35.2192 26.3539 35.0038C25.5999 34.5926 24.797 34.2597 24.0724 33.8092C20.6943 31.6845 17.8646 28.9526 15.3579 25.8781C14.1144 24.3506 13.0079 22.7154 12.2344 20.8746C12.0777 20.5025 12.1071 20.2577 12.4107 19.9542C13.5759 18.8281 14.7117 17.6727 15.8573 16.5173C17.4533 14.9115 17.4533 13.0315 15.8475 11.4159C14.9369 10.4955 14.0263 9.59468 13.1156 8.67427C12.1757 7.73428 11.2455 6.7845 10.2957 5.8543C8.7584 4.35618 6.83925 4.35618 5.31176 5.86409C4.13677 7.01949 3.01074 8.20427 1.81617 9.3401C0.709719 10.3878 0.151599 11.6705 0.0341004 13.1686C-0.15194 15.6067 0.445347 17.9077 1.28742 20.15C3.01074 24.7912 5.63488 28.9135 8.81715 32.693C13.1156 37.8042 18.2464 41.8481 24.2487 44.766C26.9512 46.0781 29.7515 47.0866 32.7967 47.2531C34.8921 47.3706 36.7134 46.8418 38.1723 45.2066C39.171 44.0904 40.2971 43.0721 41.3546 42.0048C42.9212 40.4186 42.931 38.4994 41.3741 36.9328C39.5137 35.0626 37.6436 33.2022 35.7734 31.3418Z" fill="#0D9CE6"/>
                  <path d="M33.9051 23.5379L37.5182 22.921C36.9503 19.6017 35.3836 16.5957 33.0043 14.2065C30.4878 11.6901 27.3056 10.1038 23.8002 9.61426L23.291 13.2469C26.0033 13.6288 28.4708 14.8528 30.4193 16.8013C32.2601 18.6421 33.4645 20.9725 33.9051 23.5379Z" fill="#0D9CE6"/>
                  <path d="M39.5516 7.8322C35.3804 3.66099 30.1027 1.02706 24.2767 0.214355L23.7676 3.84703C28.8004 4.55202 33.3633 6.83346 36.9666 10.427C40.3839 13.8442 42.6262 18.1623 43.4389 22.9112L47.0519 22.2944C46.1022 16.7915 43.5074 11.7978 39.5516 7.8322Z" fill="#0D9CE6"/>
                </svg>
              </div>

              <div className="flex flex-col h-full justify-center md:text-[1.2vw] sm:text-[2.5vw] text-[3vw]">
                  <p className="text-[var(--text-blue)] font-psBold">Viber Phone Number</p>
                  <p className="text-[var(--text-black)] font-pRegular">09171574208</p>
              </div>

            </div>

            <div className="flex gap-5 w-full">

              <div className="w-fit h-fit p-2 flex items-center justify-center rounded-[10px] bg-[var(--text-blue)]/[.2]">
                <svg className="xl:w-[50px] xl:h-[50px] lg:w-[40px] lg:h-[40px] md:w-[30px] md:h-[30px] w-[28px] h-[28px]" viewBox="0 0 23 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.9302 44.293V24.0903H21.7087L22.7256 16.2147H14.9302V11.1872C14.9302 8.90776 15.5606 7.35432 18.8331 7.35432L23 7.35261V0.308345C22.2794 0.2147 19.8058 0 16.9267 0C10.9149 0 6.79902 3.6696 6.79902 10.4072V16.2147H0V24.0903H6.79902V44.293H14.9302Z" fill="#0D9CE6"/>
                </svg>
              </div>

              <div className="flex flex-col h-full justify-center md:text-[1.2vw] sm:text-[2.5vw] text-[3vw]">
                  <p className="text-[var(--text-blue)] font-psBold">Facebook</p>
                  <p className="text-[var(--text-black)] font-pRegular">Uncle Drew Sports Center</p>
              </div>

            </div>

            <div className="flex gap-5 w-full text-[1vw]">

              <div className="w-fit h-fit p-2 flex items-center justify-center rounded-[10px] bg-[var(--text-blue)]/[.2]">
                <svg className="xl:w-[50px] xl:h-[50px] lg:w-[40px] lg:h-[40px] md:w-[30px] md:h-[30px] w-[28px] h-[28px]" viewBox="0 0 49 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M31.9158 19.5151L27.858 23.5866C26.2125 25.2379 23.3173 25.2735 21.6362 23.5866L17.5782 19.5151L3.00391 34.1368C3.54641 34.3876 4.14456 34.5373 4.78046 34.5373H44.7138C45.3497 34.5373 45.9476 34.3878 46.4899 34.1369L31.9158 19.5151Z" fill="#0D9CE6"/>
                  <path d="M44.7136 0.47168H4.78028C4.14437 0.47168 3.54622 0.621382 3.00391 0.872243L18.5776 16.4976C18.5786 16.4987 18.5799 16.4988 18.5809 16.4999C18.582 16.5009 18.5821 16.5023 18.5821 16.5023L23.646 21.583C24.1839 22.1208 25.3102 22.1208 25.848 21.583L30.9108 16.5032C30.9108 16.5032 30.9121 16.5009 30.9131 16.4999C30.9131 16.4999 30.9154 16.4987 30.9164 16.4976L46.4897 0.872148C45.9474 0.621193 45.3495 0.47168 44.7136 0.47168Z" fill="#0D9CE6"/>
                  <path d="M0.962658 2.85742C0.68199 3.425 0.509766 4.05504 0.509766 4.72993V30.2797C0.509766 30.9546 0.6818 31.5846 0.962564 32.1522L15.5622 17.5053L0.962658 2.85742Z" fill="#0D9CE6"/>
                  <path d="M48.5076 2.85742L33.9082 17.5055L48.5076 32.1526C48.7883 31.585 48.9605 30.9549 48.9605 30.2799V4.73012C48.9605 4.05504 48.7883 3.425 48.5076 2.85742Z" fill="#0D9CE6"/>
                </svg>

              </div>

              <div className="flex flex-col h-full justify-center md:text-[1.2vw] sm:text-[2.5vw] text-[3vw]">
                  <p className="text-[var(--text-blue)] font-psBold">Email</p>
                  <p className="text-[var(--text-black)] font-pRegular">UncleDrewSportsCenter@gmail.com</p>
              </div>

            </div>

          </div>

          <div className="xl:w-[600px] lg:w-[500px] md:w-[400px] w-full md:h-full h-[400px] bg-black flex-shrink-0">
            <UncleDrewMap/>
          </div>
        </div>

      </div>

      <Footer/>
    
    </main>
  );
}
