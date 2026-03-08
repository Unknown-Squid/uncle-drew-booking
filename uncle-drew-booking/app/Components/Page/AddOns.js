import React from 'react';


const AddOns = ({ addOnsList, handleAddOnsDuration }) => {
  return (
    <div className="w-[100%] h-fit flex flex-col gap-5 mt-7">
      <h2 className="text-[var(--text-dark-blue)] md:text-[25px] text-[3.5vw] font-psBold">Additional & Rentals</h2>

      <div className="flex flex-1 flex-col gap-5 mt-3">
        {addOnsList.map((item, index) => (
          <div
            key={index}
            className="flex flex-1 bg-white justify-between gap-5 rounded-[10px] p-4"
            style={{
              filter:
                'drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.04)) drop-shadow(0px 4px 16px rgba(0, 0, 0, 0.08))',
            }}
          >
            <div className="flex gap-4 items-center ml-4">
              <input type="checkbox" className='w-[15px] h-[15px] cursor-pointer'/>
              <p className="text-[var(--text-black)] font-isBold text-[15px]">{item.label}</p>
            </div>

            <div className="flex gap-8">
              <div className="flex flex-col">
                <p className="text-[var(--text-blue)] font-isBold text-[22px]">&#8369; {item.price}</p>
                <p className="text-[var(--text-gray)] font-isBold text-[14px] text-right">{item.unit}</p>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex py-1 rounded-[10px] border border-[var(--border-gray)] text-[var(--text-black)] font-isBold text-[18px]">
                    <button 
                        className='cursor-pointer w-[30px] flex items-center justify-center'    
                        onClick={() => handleAddOnsDuration(index, 'minus')}
                    >
                    <svg
                      width="6"
                      height="2"
                      viewBox="0 0 6 2"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.34659 0.306818V2H0.107955V0.306818H5.34659Z"
                        fill="#0D9CE6"
                      />
                    </svg>
                  </button>
                  {item.hours}
                  <button 
                    className='cursor-pointer w-[30px] flex items-center justify-center' 
                    onClick={() => handleAddOnsDuration(index, 'plus')}  
                   >
                    <svg
                      width="9"
                      height="9"
                      viewBox="0 0 9 9"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.48864 8.3125V0.448863H5.27273V8.3125H3.48864ZM0.448864 5.27273V3.48864H8.3125V5.27273H0.448864Z"
                        fill="#0D9CE6"
                      />
                    </svg>
                  </button>
                </div>
                <p className="text-[var(--text-gray)] text-center w-full">hour/s</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddOns;
