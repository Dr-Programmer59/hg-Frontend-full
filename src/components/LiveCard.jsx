import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

const LiveCard = ({banner,_id}) => {
  return (
    <Link href={`/stream/${_id}`}>
      <div className='min-h-[20rem] w-[23rem] relative my-6' >
          <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${banner}`} layout='fill' className='absolute top-0 left-0 bottom-0 right-0 -z-10 h-[19rem] w-[23rem]'/>
          <button type='button' className='m-4 bg-red-600 text-white py-1 px-3 rounded text-lg'>Live</button>
          <span className='line absolute bottom-0 right-0 left-0 h-[1rem] bg-primary'></span>
      </div>
    </Link>
  )
}

export default LiveCard