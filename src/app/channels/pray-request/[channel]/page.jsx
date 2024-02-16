import ChannelHeader from '@/components/ChannelHeader';
import PrayForm from '@/components/PrayForm';
import { getSingleChannels } from '@/lib/actions/user'
import React from 'react'




const page = async ({ params }) => {
  const { avatar, channelName, name } = await getSingleChannels(params.channel);

  return (
    <section className='min-h-[100vh] py-8 px-8'>
      <div className='container mx-auto'>
        <div className='mx-auto mt-10 max-w-[60rem] relative px-4'>
          <div className='w-full  flex items-center gap-4 relative p-4 border-b-2 border-gray-200'>
            <div className='grid place-items-start'>
              <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${avatar}`} className='w-28 h-28 rounded-full' />
            </div>

            <div className='flex flex-col gap-2'>
              <h1 className='text-2xl text-gray-700'>{channelName}</h1>

              <p className='text-lg text-gray-600'>{name}</p>
            </div>
          </div>

          <ChannelHeader _id={params.channel} />

          <div className='mt-10'>
            <div className='w-full grid items-center justify-center py-10'>
              <PrayForm _id={params.channel}/>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default page