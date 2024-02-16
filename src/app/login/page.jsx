"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { login } from '@/lib/actions/user'
import { useDispatch } from 'react-redux'
import { redirect } from 'next/navigation'

const page = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email,password));
    setEmail('');
    setPassword('');
    redirect('/')
  }
  return (
    <section className='min-h-[100vh] flex items-center p-5'>
        <div className='container m-auto flex justify-center items-center'>
            <div className='w-[50rem] max-w-[50rem] border-[.2rem] border-primary rounded-[2.8rem] px-8 py-3'>
                <h2 className='text-center text-4xl text-black font-[600]'>Login</h2>
                <form className='p-1' onSubmit={submitHandler}>
                    <div className='input-group flex flex-col m-3 mb-6'>
                        <label htmlFor="email" className='text-lg mb-1'>Email</label>
                        <input type='text' name='email' id='email' placeholder='Enter Your Email' className='outline-none border-2 border-primary rounded-lg bg-transparent py-3 px-2' value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    </div>
                    <div className='input-group flex flex-col m-3'>
                        <label htmlFor="password" className='text-lg mb-1'>Password</label>
                        <input type='password' id='password' name='password' placeholder='Enter Your Password' className='outline-none border-2 border-primary rounded-lg bg-transparent py-3 px-2' value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    </div>
                    <div className='flex justify-between items-center  m-3'>
                        <Link href={'/forgot'} className='text-primary text-sm'>Forgot Username Or Password ?</Link>
                        <Link href={'/register'} className='text-primary text-sm'>Create Account</Link>
                    </div>
                    <div className='flex justify-center items-center  m-3'>
                        <button type='submit' className='bg-primary text-white text-lg py-2 px-6 rounded'>Login</button>
                    </div>

                </form>
            </div>
        </div>
    </section>
  )
}

export default page