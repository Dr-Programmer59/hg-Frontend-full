'use client'

import Messages from '@/components/Messages';
import SuperChat from '@/components/SuperChat';
import axios from 'axios';
import React, { useEffect, useState,useRef,useCallback } from 'react'
import { IoMdClose, IoMdSend } from 'react-icons/io';
import { RiCoinsFill } from "react-icons/ri";
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux';

import { useRouter } from 'next/navigation';
import { PrayingRequest, loadme } from '@/lib/actions/user';
import PrayForm from '@/components/PrayForm';
import webrtcMediaSoup_client from '@/mediasoup/webrtc_mediasoup_client';
import { useSocket } from '@/Context/socketProvider';
import Dialog from '@/components/Dialog';
import { IoIosCall } from "react-icons/io";


const page = ({ params }) => {

  const [open, setOpen] = useState(false);
  const [callOpen,setCallOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [coins, setCoins] = useState(0);
  const [streamDetails, setStreamDetails] = useState({});
  const { user } = useSelector(store => store.userReducer);
  const dispatch = useDispatch();
  const routrer = useRouter();
  console.log(params)
  const socket = useSocket()
  let webrtc_client = new webrtcMediaSoup_client(socket)
  const [otherStream, setotherStream] = useState([])
  const [messages, setMessages] = useState([])
  const oldTracks = useRef([])
  const [subject,setSubject] = useState('');
  const [pmessage,setpMessage] = useState('');
  const [Popen, setPOpen] = useState(false);



  const addNewHosts = () => {
    let alltracks = webrtc_client.mainTracks
    for (var i = 0; i < alltracks.length; i = i + 2) {
      var combinedStream = new MediaStream();
      // Add audio track to the combined stream
      alltracks[i].getAudioTracks().forEach(track => {
        combinedStream.addTrack(track);
      });
      // Add video track to the combined stream
      alltracks[i + 1].getVideoTracks().forEach(track => {
        combinedStream.addTrack(track);
      });
      if (!(oldTracks.current.includes(alltracks[i])) && !(oldTracks.current.includes(alltracks[i + 1]))) {
        setotherStream((prev) => [...prev, combinedStream])
        oldTracks.current.push(alltracks[i])
        oldTracks.current.push(alltracks[i + 1])
        console.log("this is stream check", oldTracks)
      }
    }
  };


  const handleNewProducer = (producerId) => {
    webrtc_client.signalNewConsumerTransport(producerId)
  }

  const handleStreamData = (streamdata) => {
  
    Object.entries(streamdata).forEach(([socketID, producerId]) => {
      handleNewProducer(producerId[0])
      handleNewProducer(producerId[1])


    })
    setTimeout(() => {
      addNewHosts()
    }, 3000); // 5000 milliseconds (5 seconds) - Adjust the time interval as needed

  }

  const handleSendMessageEvent = ( data ) => {
    if(data.superchat){
      setSuperChatMessages((prev)=>[...prev,{coins:data.coins,message:data.message}])
  }
  else{
      console.log("got message ", message)
      setMessages((prev) => [...prev, data.message])
  }

  
  }

  const handleSendMessage = () => {
    console.log("sending message", message)
    socket.emit("send-message", ({ roomName: params.streamId, message: message,coins:0,superchat:false }))
    setMessages((prev) => [...prev, message]);
    setMessage('');
  }
  const handleInputChange = useCallback((value) => {
    message.current=value
  }, []);
  const hanldeCreateDevice = () => {
    webrtc_client.roomName = params.streamId;
    webrtc_client.joinRoom()
    setTimeout(() => {
      addNewHosts()
    }, 3000); // 5000 milliseconds (5 seconds) - Adjust the time interval as needed

  }

  useEffect(() => {
    socket.emit("start-streaming",({connected:true}))
  
    
  }, [])
  
  

  useEffect(() => {
    
    socket.on('connection-success', hanldeCreateDevice)
    socket.on("recive-message", handleSendMessageEvent) 
    return () => {
      socket.off('connection-success', hanldeCreateDevice)
      socket.off('recive-message', handleSendMessageEvent)

    }

  }, [socket,handleSendMessageEvent]);
  const handleMainBox = (targetClass) => {
    const videoBoxs = document.querySelectorAll('.video-box');
    videoBoxs.forEach(ele => {
      ele.classList.remove('main');
    })
    // console.log(targetClass)
    document.querySelector(targetClass).classList.add('main');

  }






  const handleSendCoins = async () => {
    console.log(coins)
    if (isNaN(coins)) {

      toast.error('Please enter amount in message');
      return
    }

    const amount = Number(coins);
    if (amount <= 0) {
      toast.error('amount should be more then 0');
      return
    }

    try {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/send-coins`, { reciveId: streamDetails?.owner?._id, senderId: user._id, amount }, {
        withCredentials: true
      });
      toast.success(data.message);
      dispatch(loadme())
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }

  }


  // get strea details 
  useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/streams/${params.streamId}`, {
          withCredentials: true
        });
        setStreamDetails(data.stream);
      } catch (error) {
        routrer.push('/')
      }
    })()
  }, [])

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('message',pmessage);
    formData.append('subject',subject);
    formData.append('reciverId',streamDetails?.owner?._id);
    dispatch(PrayingRequest(formData))
}


const handleCalling = () => {
  setCallOpen(true);
}

  return (
    <>
    <section className='bg-gray-800'>
      <div className='w-[100%] relative'>
        <div className='w-full h-[52rem] overflow-y-auto gap-4 stream-container'>
          {
            otherStream.map((stream, i) => (
              <div className={`relative video-box cursor-pointer video-box-${i} ${i === 0 ? 'main' : ''}`} onClick={(e) => handleMainBox(`.video-box-${i}`)}>
                <video className='absolute top-0 bottom-0 w-[100%] h-[100%] object-cover' ref={(videoRef) => {
            if (videoRef) {
                videoRef.srcObject = stream;
            }}} controls autoPlay >
                </video>
              </div>
            ))
          }
        </div>
        
      </div>
      <div className='m-auto py-4 px-2 relative mt-5'>
        <div className='flex flex-col gap-5 md:flex-row'>

          {/* channels details  */}
          <div className='channels-details w-[100%] md:w-[50%]'>
            <div className='flex gap-3'>
              <img src='/images/image-1.jpg' alt='channel logo' className='w-64 h-64 rounded-md' />
              <div className=' '>
                <h2 className='text-xl text-white'>Sloan Lake Community Church</h2>
                <h2 className='text-sm text-white/70 mt-6'>Sloan Lake Community Church Streaming from China Grove , NC</h2>
                <button className='bg-primary rounded-md text-white text-lg py-2 px-4 mt-6'>Subscribe</button>
                <button className='bg-primary rounded-md text-white text-lg py-2 px-4 mt-6 ml-5' onClick={() => setPOpen(true)}>Pray Request</button>
              </div>
            </div>
          </div>
          {/* live chat  */}
          <div className='live-chat w-[100%] md:w-[50%]'>
            <div className='bg-gray-900 h-[35rem] rounded-md relative'>
              <div className='h-[4rem] absolute top-0 left-0 right-0 p-1 overflow-x-auto flex items-center super-chat-box'>
                <SuperChat avatar={'/images/image-1.jpg'} amount={1000.00} />
              </div>


              {/* coins dialog  */}
              {
                open &&
                <div className='absolute top-[30%] left-7 right-7 bg-gray-700 rounded-md h-[15rem] px-2 shadow-md'>
                  
                  <div className='w-full h-[15rem] relative flex justify-center items-center gap-2'>
                    <div className='absolute right-2 top-2'>
                      <button className='text-2xl text-white' onClick={() => setOpen(false)}>
                        <IoMdClose size={35}/>
                      </button>
                    </div>
                    <input type='number' className='flex-1 p-2 rounded-3xl bg-gray-600 outline-none text-white' placeholder='coins amount' min={0} max={user?.coins} value={coins} onChange={(e) => setCoins(e.target.value)} />
                    <button className='text-white p-2 rounded-full bg-gray-600 transition-all
                              ' onClick={handleSendCoins}><IoMdSend size={23} /></button>
                    
                            
                  </div>

                </div>
              }


              {/* calling dialog  */}
              {
                callOpen &&
                <div className='absolute top-[30%] left-7 right-7 bg-gray-600 rounded-md h-[15rem] px-2 shadow-md'>
                  
                  <div className='w-full h-[15rem] relative flex justify-center items-center gap-2 flex-col'>
                    <div className='absolute right-2 top-2'>
                      <button className='text-xl text-white' onClick={() => setCallOpen(false)}>
                        <IoMdClose size={35}/>
                      </button>
                    </div>

                    <h2 className='text-white text-2xl mt-6'>
                      {streamDetails.owner.name}
                    </h2>
                    <p className='text-lg mt-6 text-white/60'>00:20</p>
                    <button className='bg-red-600 p-2 rounded-full text-white transition-all
                              ' onClick={handleCalling}><IoIosCall size={23} /></button>        
                  </div>

                </div>
              }

              <div className='h-[32rem] overflow-y-auto p-2'>
              {
                        messages.map((msg,i)=>(
                            <Messages name={'someone'} message={msg} admin={false} />

                        )

                        )
                    }
              </div>
              <div className='h-[3rem] flex items-center px-2 gap-2'>
                <input type='text' className='flex-1 p-2 rounded-3xl bg-gray-600 outline-none text-white' placeholder='message...' value={message} onChange={(e) => setMessage(e.target.value)} />
                <button className='text-white p-2 rounded-full bg-gray-600 transition-all
                            ' onClick={handleSendMessage}><IoMdSend size={23} /></button>
                <button className=' p-2 rounded-full bg-gray-600 transition-all text-yellow-500
                            ' onClick={() => setOpen(true)}><RiCoinsFill size={23} /></button>
                <button className='text-green-600 p-2 rounded-full bg-gray-600 transition-all
                              ' onClick={handleCalling}><IoIosCall size={23} /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Dialog open={Popen} onClose={() => setPOpen(false)}>
        <form className='p-1' onSubmit={submitHandler}>
          <div className='input-group flex flex-col m-3 mb-6'>
            <label htmlFor="subject" className='text-lg mb-1'>Suject</label>
            <input type='text' name='subject' id='subject' placeholder='Enter Your subject' className='outline-none border-2 border-primary rounded-lg bg-transparent py-3 px-2' value={subject} onChange={(e) => setSubject(e.target.value)} required />
          </div>
          <div className='input-group flex flex-col m-3'>
            <label htmlFor="Message" className='text-lg mb-1'>Message</label>
            <textarea type='text' id='Message' name='Message' placeholder='Enter Your Message' className='outline-none border-2 border-primary rounded-lg bg-transparent py-3 px-2 h-80' value={pmessage} onChange={(e) => setpMessage(e.target.value)} autoComplete required />
          </div>

          <div className='flex justify-center items-center  m-3 mt-8'>
            <button type='submit' className='bg-primary text-white text-lg py-2 px-6 rounded'>Submit</button>
          </div>

        </form>
      </Dialog>
    </>
  )
}

export default page