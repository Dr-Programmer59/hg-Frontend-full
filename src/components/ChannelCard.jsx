import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const channelCard = ({avatar,_id,channelName,name}) => {
  return (
    <Link href={`/channels/video/${_id}`} className='w-full my-4 bg-gray-50 flex items-center gap-4 relative p-4 rounded-md shadow-sm'>
        <div className='grid place-items-start'>
            <img  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${avatar}`} className='w-28 h-28 rounded-full'/>
        </div>

        <div className='flex flex-col gap-2'>
          <h1 className='text-2xl text-gray-700'>{channelName}</h1>

          <p className='text-lg text-gray-600'>{name}</p>
        </div>

    </Link>
  )
}

export default channelCard