"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { forgot } from '@/lib/actions/user'
import { useDispatch } from 'react-redux'

const page = () => {
  const [email,setEmail] = useState('');

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgot({email}));
    setEmail('');
  }
  return (
    <section className='min-h-[100vh] flex items-center'>
        <div className='container m-auto flex justify-center items-center'>
            <div className='w-[50rem] max-w-[50rem] border-[.2rem] border-primary rounded-[2.8rem] px-8 py-3'>
                <h2 className='text-center text-4xl text-black font-[600]'>Login</h2>
                <form className='p-1' onSubmit={submitHandler}>
                    <div className='input-group flex flex-col m-3 mb-6'>
                        <label htmlFor="email" className='text-lg mb-1'>Email</label>
                        <input type='text' name='email' id='email' placeholder='Enter Your Email' className='outline-none border-2 border-primary rounded-lg bg-transparent py-3 px-2' value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    </div>
                    
                    <div className='flex justify-center items-center  m-3'>
                        <button type='submit' className='bg-primary text-white text-lg py-2 px-6 rounded'>Forgot</button>
                    </div>
                </form>
            </div>
        </div>
    </section>
  )
}

export default page