import React from 'react'


const ConfirmBox = ({message,handleClick,open}) => {

  return (
    <div className={`absolute top-20 -translate-x-[50%] left-[50%] right-5 w-96 h-48 rounded-md bg-gray-800 ${open ? '' : 'hidden'}`}>
        <div className='relative w-96 h-48 pb-16'>
            <div className='flex justify-center items-center w-full h-full'>
                <h2 className='text-white text-xl'>{message}</h2>
            </div>
            <div className='flex justify-between items-center absolute bottom-3 right-5 left-5'>
                <button className='py-2 px-4 rounded-md text-white bg-red-600' onClick={(e) => handleClick(e,false)}>Cancel</button>
                <button className='py-2 px-4 rounded-md text-white bg-green-600' onClick={(e) => handleClick(e,true)}>Accept</button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmBox