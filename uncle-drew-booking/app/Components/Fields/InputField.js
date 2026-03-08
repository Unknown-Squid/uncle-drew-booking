import React, { useEffect, useRef } from 'react';

const InputField = ({ label, id, value, placeholder, handleInput, errorInput, labelCustomStyle }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (id.toLowerCase() === 'phone-number' && inputRef.current) {
      const phoneNumberField = inputRef.current;

      phoneNumberField.setAttribute('maxLength', '10');
      const handlePhoneInput = (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
        handleInput(e);
      };

      phoneNumberField.addEventListener('input', handlePhoneInput);

      return () => {
        phoneNumberField.removeEventListener('input', handlePhoneInput);
      };
    }
  }, [id, handleInput]);

  const inputProps = {
    id,
    placeholder,
    value,
    ref: inputRef,
    className: 'text-[var(--text-black)] rounded-[10px] font-pMedium h-[50px] w-full p-4',
    type: id.toLowerCase() === 'email-address' ? 'email' : id.toLowerCase() === 'password' ? 'password' : 'text',
    onChange: handleInput
  };

  return (
    <div className='flex flex-col gap-1 w-full h-fit'>
      <label htmlFor={id} className={`${labelCustomStyle ? labelCustomStyle : "text-[var(--text-black)]"} font-pMedium ml-3`}>{label}</label>
      <div className='flex bg-[var(--text-white)] h-fit w-full rounded-[10px] border border-[var(--border-light-gray)]'>
        {id.toLowerCase() === 'phone-number' && (
          <p className='p-4 px-6 bg-transparent text-[var(--text-black)] font-pMedium'>+63</p>
        )}
        <input {...inputProps} />
      </div>
      {errorInput ?
         <p className='text-[var(--text-red)] ml-2 mt-1 font-pRegular text-[15px]'>Invalid Email (ex. test@gmail.com)</p> : null 
      }
    </div>
  );
};

export default InputField;
