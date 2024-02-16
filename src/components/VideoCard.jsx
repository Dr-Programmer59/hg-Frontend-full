import React from 'react'
import Link from 'next/link'

const VideoCard = () => {
    return (
        <Link href={''} className='w-full my-4 shadow-sm rounded-md bg-gray-50 flex items-center justify-start gap-4'>
            <div className='grid place-items-start'>
                <img src={`/images/hero-bg.jpg`} className='w-52 h-48 rounded-md' />
            </div>
            <div className='flex flex-col gap-2'>
                <h1 className='text-2xl text-gray-700'>Learn React in One Video</h1>

                <p className='text-lg text-gray-600'>code with harry</p>
            </div>
        </Link>
    )
}

export default VideoCard