'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Footer = () => {
    const pathname = usePathname();
    const checkHideHeader = () => {
        const list = ['/live-dashboard','/stream/']
       
        let hide = false;
       for (const index in list) {
        if(pathname.includes(list[index])){
                hide = true;
                break;
        }else{
            hide = false;
        }
       }
       return hide
    }

    if(checkHideHeader()){
        return <></>
    }
  return (
    <footer className="text-gray-400 bg-black body-font pt-8 py-2">
        <div className="container">
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
                <div className='flex justify-center'>
                    <div className="lg:w-1/2 md:w-1/2 w-full px-4">
                        <h2 className="title-font font-medium text-white tracking-widest text-xl mb-3">About Us</h2>
                        <p className='text-lg text-[#D8D8D8] max-w-[15rem] w-[15rem]'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus vitae congue id ipsum sed neque et dui accumsan. Nibh semper magna facilisi ridiculus luctus amet. Aliquam 
                        </p>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                        <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">Contact Us</h2>
                        <nav className="list-none mb-10">
                        <li>
                            <a className="text-gray-400 hover:text-white">First Link</a>
                        </li>
                        <li>
                            <a className="text-gray-400 hover:text-white">Second Link</a>
                        </li>
                        <li>
                            <a className="text-gray-400 hover:text-white">Third Link</a>
                        </li>
                        <li>
                            <a className="text-gray-400 hover:text-white">Fourth Link</a>
                        </li>
                        </nav>
                    </div>
                </div>

                <div className='flex justify-center'>
                    <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                        <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">Customer Support</h2>
                        <nav className="list-none mb-10">
                        <li>
                            <a className="text-gray-400 hover:text-white">First Link</a>
                        </li>
                        <li>
                            <a className="text-gray-400 hover:text-white">Second Link</a>
                        </li>
                        <li>
                            <a className="text-gray-400 hover:text-white">Third Link</a>
                        </li>
                        <li>
                            <a className="text-gray-400 hover:text-white">Fourth Link</a>
                        </li>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
        <div className="bg-primary">
            <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
            <p className="text-gray-400 text-sm text-center sm:text-left">© 2023
                <a href="#" rel="noopener noreferrer" className="text-gray-500 ml-1" target="_blank">@livestream</a>
            </p>
            <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
                <a className="text-gray-400">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
                </a>
                <a className="ml-3 text-gray-400">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
                </a>
                <a className="ml-3 text-gray-400">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                </svg>
                </a>
                <a className="ml-3 text-gray-400">
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-5 h-5" viewBox="0 0 24 24">
                    <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                    <circle cx="4" cy="4" r="2" stroke="none"></circle>
                </svg>
                </a>
            </span>
            </div>
        </div>
    </footer>
  )
}

export default Footer