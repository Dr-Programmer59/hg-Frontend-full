"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { reset } from '@/lib/actions/user'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

const page = ({ params }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        if (confirmPassword !== password) {
            toast.error('Cofirm password does not match')
            return
        }

        dispatch(reset(params.token,{ password }));
    }
    return (
        <section className='min-h-[100vh] flex items-center'>
            <div className='container m-auto flex justify-center items-center'>
                <div className='w-[50rem] max-w-[50rem] border-[.2rem] border-primary rounded-[2.8rem] px-8 py-3'>
                    <h2 className='text-center text-4xl text-black font-[600]'>Login</h2>
                    <form className='p-1' onSubmit={submitHandler}>
                        <div className='input-group flex flex-col m-3'>
                            <label htmlFor="password" className='text-lg mb-1'>Password</label>
                            <input type='password' id='password' name='password' placeholder='Enter Your Password' className='outline-none border-2 border-primary rounded-lg bg-transparent py-3 px-2' value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div className='input-group flex flex-col m-3'>
                            <label htmlFor="confirm password" className='text-lg mb-1'>Confirm Password</label>
                            <input type='password' id='confirm password' name='confirm password' placeholder='Enter Your Confirm Password' className='outline-none border-2 border-primary rounded-lg bg-transparent py-3 px-2' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                        </div>

                        <div className='flex justify-center items-center  m-3'>
                            <button type='submit' className='bg-primary text-white text-lg py-2 px-6 rounded'>Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default page