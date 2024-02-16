"use client"
import React,{useEffect, useState} from 'react'
import { MdOutlineSearch } from "react-icons/md";
import ChannelCard from './ChannelCard';
import { useRouter } from 'next/navigation';

const ChannelsComponents = ({channels}) => {

    const [query, setQuery] = useState('');
    console.warn(channels)
    const router = useRouter();

    useEffect(() => {
        const timeoutRef = setTimeout(() => {
            if(query){
                router.push(`/channels?channelName=${query}`)
            }else{
                router.push(`/channels`)
            }
        },1000)

        return () => {
            clearTimeout(timeoutRef);
        }
    },[query])
    
    return (
        <div className='container mx-auto'>

            {/* search box  */}
            <div className="w-full border-2 rounded-3xl border-gray-500 mx-auto max-w-[40rem] h-12 flex items-center justify-start p-2 px-4 shadow-sm">
                <input placeholder="search by channel name" className="outline-none border-none bg-none w-[98%]" value={query} onChange={(e) => setQuery(e.target.value)}/>
                <button><MdOutlineSearch size={25} /></button>
            </div>

            <div className='mx-auto mt-10 max-w-[50rem] relative px-4'>
                {
                    channels && channels.map(data => (<ChannelCard {...data}/>))
                }
            </div>
        </div>
    )
}

export default ChannelsComponents