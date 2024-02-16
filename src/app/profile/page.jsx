"use client"
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { updateUser } from '@/lib/actions/user'
import { useDispatch, useSelector } from 'react-redux'
import { MdModeEditOutline } from "react-icons/md";

const page = () => {
    const [name,setName] = useState('');
    const [email, setEmail] = useState('');
    const [channelName, setChannelName] = useState('');
    const [file,setFile] = useState(null);
    const [filePreview,setFilePreview] = useState('');
    const {user} = useSelector(store => store.userReducer);

    const fileRef = useRef();

    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name',name);
        formData.append('email',email);
        if(channelName) formData.append('channelName',channelName);
        if(file) formData.append('file',file);
        dispatch(updateUser(formData));
    }


    const fileChangeHandler = (e) => {
        e.preventDefault();
        const [file] = e.target.files; 
        const reader = new FileReader();

        reader.onload = (e) => {
            if(reader.readyState === 2){
                setFile(file);
                setFilePreview(reader.result);
            }
        }

        reader.readAsDataURL(file);
    }


    useEffect(() => {
        if(user){
            setName(user?.name);
            setEmail(user?.email);
            setChannelName(user?.channelName);
            setFilePreview(`${process.env.NEXT_PUBLIC_BACKEND_URL}${user?.avatar}`);
        }
    },[user])
    return (
        <section className='min-h-[100vh] flex items-center p-5'>
            <div className='container m-auto flex justify-center items-center'>
                <div className='w-[50rem] max-w-[50rem] border-[.2rem] border-primary rounded-[2.8rem] px-8 py-3'>
                    <h2 className='text-center text-4xl text-black font-[600]'>Profile</h2>
                    <form className='p-1' onSubmit={submitHandler}>
                        <div className='flex justify-center items-center'>
                            <div className='relative mt-4'>
                                <img src={filePreview || `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload/images/default.jpg`} className='rounded-full w-28 h-28'/>
                                <button type='button' className='absolute bottom-2 rotate-20 right-2 text-green-500 p-1 rounded-full hover:text-white hover:bg-green-500 transition-all' onClick={() => fileRef.current.click()}>
                                    <MdModeEditOutline size={20}/>
                                </button>
                            </div>
                        </div>
                        <input type='file' id='file' ref={fileRef} className='hidden' onChange={fileChangeHandler}/>
                        <div className='input-group flex flex-col m-3 mb-6'>
                            <label htmlFor="name" className='text-lg mb-1'>Name</label>
                            <input type='text' name='name' id='name' placeholder='Enter Your name' className='outline-none border-2 border-primary rounded-lg bg-transparent py-3 px-2' value={name} onChange={(e) => setName(e.target.value)} required/>
                        </div>
                        <div className='input-group flex flex-col m-3 mb-6'>
                            <label htmlFor="email" className='text-lg mb-1'>Email</label>
                            <input type='email' name='email' id='email' placeholder='Enter Your Email' className='outline-none border-2 border-primary rounded-lg bg-transparent py-3 px-2' value={email} onChange={(e) => setEmail(e.target.value)} required/>
                        </div>

                        {
                            user?.role === 'streamer' &&
                            <>
                                <div className='input-group flex flex-col m-3'>
                                    <label htmlFor="channel-name" className='text-lg mb-1'>Channel Name</label>
                                    <input type='text' id='channel-name' name='channel-name' placeholder='Enter Your Channel Name' className='outline-none border-2 border-primary rounded-lg bg-transparent py-3 px-2' value={channelName} onChange={(e) => setChannelName(e.target.value)} />
                                </div>
                            </>
                        }
                        <div className='flex justify-center items-center  m-3'>
                            <button type='submit' className='bg-primary text-white text-lg py-2 px-6 rounded'>Update</button>
                        </div>

                    </form>
                </div>
            </div>
        </section>
    )
}

export default page