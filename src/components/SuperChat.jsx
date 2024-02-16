import React, { memo } from 'react'
import { RiCoinsFill } from "react-icons/ri";


const gendomColor = () => {
    const colors = ['#FF8911','#74E291','#FF8080','#FF8080','#D63484','#BB2525'];
    const random = Math.floor(Math.random() * colors.length);
    return colors[random]
}

const SuperChat = ({avatar,amount}) => {
  return (
    <div className='flex items-center gap-3 rounded-3xl p-1 min-w-[10rem] mx-3' style={{background: gendomColor()}}>
        <img src={avatar} alt='avatar' className="w-8 h-8 rounded-full"/>
        <h2 className='text-white text-xl flex items-center gap-1'>
            <span className='text-yellow-500'><RiCoinsFill size={20}/></span>
            <span>{`${amount}.00`}</span>
        </h2>
    </div>
  )
}

export default memo(SuperChat);