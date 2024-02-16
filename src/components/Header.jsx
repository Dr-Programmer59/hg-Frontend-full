"use client"
import { logout } from '@/lib/actions/user'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { RxHamburgerMenu } from "react-icons/rx";
import Dialog from './Dialog'
import { usePathname, useRouter } from 'next/navigation'
import axios from 'axios'
import { RiCoinsFill } from 'react-icons/ri'

const Header = () => {
    const [open, setOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [title, setTitle] = useState('')
    const [file,setFile] = useState({});
    const [filePrev,setFilePrev] = useState();
    const { isAuth, user } = useSelector(store => store.userReducer);
    const [navactice, setNavactive] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
    }

    const onLiveSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            //create a stream on database pending
            const {data} = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/stream-create`,{title,file},{
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            console.log(data)
            router.push(`/live-dashboard?rooms=${data.roomId}`);
            setDialogOpen(false)
        } catch (error) {
            console.log(error)
        }
    }

    


    const onFileChange = (e) => {
        const [file] = e.target.files;

        const reader = new FileReader();

        reader.onload = () => {
            if(reader.readyState == 2){
                setFilePrev(reader.result);
                setFile(file);
            }
        }

        reader.readAsDataURL(file);
    }

    const checkHideHeader = () => {
        const list = ['/live-dashboard']

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
        <>
            <div className='bg-primary py-4 px-4'>
                <div className='container m-auto'>
                    <div className='flex justify-between items-center'>
                        <div className='logo w-32'>
                            <Link href={'/'}><h2 className='text-[#D8D8D8] text-2xl cursor-pointer
                    '>HG LIVE</h2></Link>
                        </div>

                        <div className={`main-nav absolute top-0 ${navactice ? 'left-0' : '-left-[100%]'} md:left-0 w-full h-full bg-white md:relative md:bg-transparent z-10 grid place-items-center  transition-all`}>
                            <ul className='flex justify-center items-center nav-items flex-col md:flex-row mt-20 md:mt-0 gap-7 md:gap-0 w-full md:justify-end'>
                                <li><Link href={'/channels'} className='text-primary md:text-white  text-xl md:text-lg  hover:text-[#D8DD8D8] transition-all mx-6'>Channels</Link></li>
                                {/* <li><Link href={'/live-dashboard'} className='text-primary md:text-white  text-xl md:text-lg  hover:text-[#D8DD8D8] transition-all mx-6'>Go Live</Link></li> */}
                                <li><button onClick={() => setDialogOpen(true)} className='text-primary md:text-white  text-xl md:text-lg  hover:text-[#D8DD8D8] transition-all mx-6'>Go Live</button></li>
                                <li><Link href={'/'} className='text-primary md:text-white  text-xl md:text-lg  hover:text-[#D8DD8D8] transition-all mx-6'>About us</Link></li>
                                <li><Link href={'/'} className='text-primary md:text-white  text-xl md:text-lg  hover:text-[#D8DD8D8] transition-all mx-6'>Contact</Link></li>
                                <li>
                                    <form className='flex justify-center items-center bg-[#FFF3F3] rounded-2xl px-2 py-1 mx-6'>
                                        <input type='text' placeholder='Search Something' className='bg-transparent text-sm placeholder:text-[#8E8B8B] text-black outline-none border-none' />
                                        <span className='text-black/30'>
                                            <FaSearch size={15} />
                                        </span>
                                    </form>
                                </li>
                                <li className='hidden md:block'>
                                    {
                                        isAuth
                                            ? (
                                                <div className='relative justify-center items-center flex-col hidden md:flex'>
                                                    <button onMouseMove={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
                                                        <img className='w-10 h-10 rounded-full' src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${user?.avatar}`} />
                                                    </button>

                                                    {
                                                        open &&
                                                        <div className={`absolute top-12 -left-16 w-36 h-44 bg-white shadow-md before:contect-[] before:absolute before:-top-[10.4%] before:left-[calc(62%-5px)] before:border-[10px] before:border-white before:border-x-transparent before:border-t-transparent rounded-md hidden md:block`} onMouseMove={() => setOpen(true)} onMouseLeave={() => {
                                                            setTimeout(() => setOpen(false), 500);
                                                        }}>
                                                            <ul className='p-4 flex flex-col gap-2'>
                                                                <li className='text-xl md:text-lg  text-black/90'><Link href={'/profile'}>Profile</Link></li>
                                                                <li className='text-xl md:text-lg  text-black/90'><button onClick={handleLogout} >Logout</button></li>
                                                                <li className='text-xl md:text-lg  text-black/90'><button className='flex items-center gap-2'>
                                                                    <span className='text-yellow-500'><RiCoinsFill size={25}/></span>
                                                                    <span>{`${user.coins}.00`}</span>
                                                                </button></li>
                                                            </ul>
                                                        </div>
                                                    }
                                                </div>
                                            )
                                            : (
                                                <>
                                                    <Link href={'/login'} className='text-primary md:text-white  text-xl md:text-lg  hover:text-[#D8DD8D8] transition-all ml-6 pr-3 border-r-2 md:border-white border-primary'>Login</Link>
                                                    <Link href={'/register'} className='text-primary md:text-white  text-xl md:text-lg  hover:text-[#D8DD8D8] transition-all mr-6 pl-3'>Sign Up</Link>
                                                </>
                                            )
                                    }

                                </li>

                                {
                                    isAuth ? <>
                                        <li><Link href={'/profile'} className='text-primary md:hidden md:text-white  text-xl md:text-lg  hover:text-[#D8DD8D8] transition-all mx-6'>Profile</Link></li>
                                        <li><button onClick={handleLogout} className='text-primary md:hidden md:text-white  text-xl md:text-lg  hover:text-[#D8DD8D8] transition-all mx-6'>Logout</button></li>
                                    </>
                                        : <>
                                            <li className='md:hidden'>
                                                <Link href={'/login'} className='text-primary md:text-white  text-xl md:text-lg  hover:text-[#D8DD8D8] transition-all ml-6 pr-3 border-r-2 md:border-white border-primary'>Login</Link>
                                                <Link href={'/register'} className='text-primary md:text-white  text-xl md:text-lg  hover:text-[#D8DD8D8] transition-all mr-6 pl-3'>Sign Up</Link>
                                            </li>
                                        </>
                                }
                            </ul>
                        </div>

                        <div className='burger-menu md:hidden relative z-20 mr-5 cursor-pointer text-black/95 transition-all' onClick={() => setNavactive(prev => (!prev))}>
                            <RxHamburgerMenu size={40} />
                        </div>
                    </div>
                </div>
            </div>
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <form className='p-1 w-full h-full flex flex-col justify-center
                ' onSubmit={onLiveSubmitHandler}>
                    <h2 className='text-gray-800 text-2xl text-center mb-5'>Stream Details</h2>
                    <div className='input-group flex flex-col m-3 mb-6'>
                    <label htmlFor="email" className='text-lg mb-1'>Title</label>
                        <input type='text' placeholder='Enter Your Title' className='w-full outline-none border-2 border-primary rounded-lg bg-transparent py-3 px-2' value={title}  required onChange={(e) => setTitle(e.target.value)}/>
                    </div>
                     <div className='input-group flex flex-col m-3 mb-6'>
                    <label htmlFor="email" className='text-lg mb-1'>Banner</label>
                        <input type='file' name='file' id='file' className='w-full outline-none border-2 border-primary rounded-lg bg-transparent py-3 px-2' onChange={onFileChange} required />
                    </div>

                    {
                        filePrev && 
                        <div className='flex justify-center items-center'>
                            <img src={filePrev} className='w-28 h-20'/>
                        </div>
                    } 
                         
                    <div className='flex justify-center items-center  m-3'>
                        <button type='submit' className='bg-primary text-white text-lg py-2 px-6 rounded'>Go Live</button>
                    </div>

                </form>
            </Dialog>
        </>
    )
}

export default Header