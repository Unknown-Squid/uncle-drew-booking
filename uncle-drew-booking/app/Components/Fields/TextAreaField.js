import React from 'react'

const TextAreaField = ({ label, id, value, placeholder, handleInput }) => {
  return (
    <div className='flex flex-col gap-1 w-full h-fit'>
      <label htmlFor={id} className='text-[var(--text-black)] font-pMedium ml-3'>{label}</label>
        <textarea type="text" placeholder={placeholder} id={id} value={value} onChange={handleInput}
                className='text-[var(--text-black)] bg-[var(--text-white)] resize-none rounded-[10px] font-pMedium h-[200px] w-full p-4 border border-[var(--border-light-gray)]'
        />
    </div>
  )
}

export default TextAreaField
