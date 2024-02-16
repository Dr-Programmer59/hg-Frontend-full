import React from 'react'
import LiveCard from './LiveCard'
import axios from 'axios'

const getLives = async () => {
    try {
        const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/streams`);
        return data.streams
    } catch (error) {
        return []
    }
}

const LiveStreams = async () => {
    const streams = await getLives();
  return (
    <section className='section-lives section p-5'>
        <div className='container m-auto'>
            <div className='group-1'>
                <h2 className='main-heading'>Live Services And Events</h2>
                <div className='p-3 mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 place-items-center'>
                    {
                        streams.map((data) => (
                            <LiveCard {...data}/>
                        ))
                    }
                </div>
            </div>
        </div>
    </section>
  )
}

export default LiveStreams