'use client'
import { usePathname } from 'next/navigation'
import React from 'react'
import Link from 'next/link'

const ChannelHeader = ({_id}) => {
    const pathname = usePathname();
  return (
    <div className='w-full px-2 py-4'>
        <ul className='flex items-center justify-start gap-7'>
            <li>
                <Link href={`/channels/video/${_id}`} className={`text-xl text-gray-700 ${pathname.includes('/channels/video') ? 'pb-2 border-b-2 border-primary':''}`}>Videos</Link>
            </li>
            <li>
                <Link href={`/channels/pray-request/${_id}`} className={`text-xl text-gray-700 ${pathname.includes('/channels/pray-request') ? 'pb-2 border-b-2 border-primary':''}`}>Pray Request</Link>
            </li>
        </ul>
    </div>
  )
}

export default ChannelHeader
