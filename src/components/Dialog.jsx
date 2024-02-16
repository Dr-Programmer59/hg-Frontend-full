import React from 'react'
import { IoMdClose } from "react-icons/io";

const Dialog = ({open,onClose,children}) => {
  return (
    <div className={`absolute top-0 left-0 right-0 bottom-0 ${open ? '': 'hidden'}`}>
        <div className='absolute top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%] w-full px-5'>
            <div className='bg-white max-w-[40rem] min-h-[40rem] mx-auto rounded-md shadow-md'>
                <div className='header flex justify-end items-center px-3 py-3'>
                    <button className='text-gray-800' onClick={onClose}>
                        <IoMdClose size={35}/>
                    </button>
                </div>
                <div className='body px-4 h-[37rem] overflow-y-auto relative'>
                    {children}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dialog