import React from 'react'
import { FaStar } from "react-icons/fa6";

const Messages = ({name,message,admin}) => {
  return (
    <div className='p-2 rounded-md bg-gray-800 flex flex-col gap-1 my-3'>
        <h1 className='text-white/40 flex items-center'>
            {
                admin && <span className='mr-2 text-yellow-400'>
                    <FaStar size={15}/>
                </span>
            }
            <span>{name}</span>
        </h1>
        <p className='text-white/90'>{message}</p>
    </div>
  )
}

export default Messages