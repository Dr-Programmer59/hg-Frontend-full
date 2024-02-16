import React from 'react'

function StreamVideos({otherStream}) {
  return (
    <div className='w-full h-[52rem] overflow-auto gap-4 stream-container'>
    {
        otherStream.map((stream,i) => (
            <div className={`relative video-box cursor-pointer video-box-${i} ${i === 0 ? 'main' : ''}`} onClick={(e) => handleMainBox(`.video-box-${i}`)}>
        <video className='absolute top-0 bottom-0 w-[100%] h-[100%] object-cover' ref={(videoRef) => {
            if (videoRef) {
                videoRef.srcObject = stream;
            }
        }} controls autoPlay>
        </video>
    </div>
        ))
    } 
</div>
  )
}

export default StreamVideos