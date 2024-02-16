'use client'
import { PrayingRequest } from '@/lib/actions/user';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const PrayForm = ({_id}) => {
    const [subject,setSubject] = useState('');
    const [message,setMessage] = useState('');

    const { isAuth, user } = useSelector(store => store.userReducer);
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        if(isAuth === false){
            return toast.info('Please Login First');
        }
        const formData = new FormData();
        formData.append('message',message);
        formData.append('subject',subject);
        formData.append('reciverId',_id);
        dispatch(PrayingRequest(formData))
    }
    return (
        <div className='w-[50rem] max-w-[50rem] border-[.2rem] border-primary rounded-[2.8rem] px-8 p-6'>
            <h2 className='text-center text-4xl text-black font-[600]'>Request For Pray</h2>
            <form className='p-1' onSubmit={submitHandler}>
                <div className='input-group flex flex-col m-3 mb-6'>
                    <label htmlFor="subject" className='text-lg mb-1'>Suject</label>
                    <input type='text' name='subject' id='subject' placeholder='Enter Your subject' className='outline-none border-2 border-primary rounded-lg bg-transparent py-3 px-2' value={subject} onChange={(e) => setSubject(e.target.value)} required />
                </div>
                <div className='input-group flex flex-col m-3'>
                    <label htmlFor="Message" className='text-lg mb-1'>Message</label>
                    <textarea type='text' id='Message' name='Message' placeholder='Enter Your Message' className='outline-none border-2 border-primary rounded-lg bg-transparent py-3 px-2 h-80' value={message} onChange={(e) => setMessage(e.target.value)} autoComplete required />
                </div>
                
                <div className='flex justify-center items-center  m-3 mt-8'>
                    <button type='submit' className='bg-primary text-white text-lg py-2 px-6 rounded'>Submit</button>
                </div>

            </form>
        </div>
    )
}

export default PrayForm