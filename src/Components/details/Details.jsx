import React, { useState } from 'react'
import { auth } from '../../lib/firebase';

const Details = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
        
    }
    const handleChange = () => {
        
    }
    return (
        <div className='h-full w-[40vw] border border-white/20'>
            <div className='flex flex-col justify-center items-center mt-6 border-b border-white/15'>
                <img className='h-18' src='List Icons\user-image-with-black-background.png' />
                <h2 className='text-xl mt-2'>Qz Seeker</h2>
                <p className='text-sm mb-6'>Lorem ipsum dolor sit amet consectetur</p>
            </div>

            <div className='flex flex-col gap-6 mt-8 px-10'>
                <div className=''>
                    <div className='flex justify-between items-center'>
                        <span>Chat Settings</span>
                        <img className='h-6 transition-all ease-in hover:bg-white/15 rounded-full cursor-pointer bg-white/10 p-2' src='Details\up-arrow.png' />
                    </div>
                </div>
                <div className=''>
                    <div className='flex justify-between items-center'>
                        <span>Privacy & help</span>
                        <img className='h-6 transition-all ease-in hover:bg-white/15 rounded-full cursor-pointer bg-white/10 p-2' src='Details\up-arrow.png' />
                    </div>
                </div>
                <div className='flex flex-col gap-4'>
                    <div className='flex justify-between items-center'>
                        <span>Shared photos</span>
                        <img className='h-6 transition-all ease-in hover:bg-white/15 rounded-full cursor-pointer bg-white/10 p-2' src={open ? 'Details/down-arrow.png' : 'Details/up-arrow.png'} onClick={handleOpen} />
                    </div>
                    <div onChange={handleChange} className='border border-white/15 rounded-md p-2 flex flex-col gap-6'>
                        <div className='flex justify-between gap-4'>
                            <img className='h-8 rounded-md' src='Details\joshua-reddekopp-SyYmXSDnJ54-unsplash.jpg' />
                            <p className='truncate'>laptop/Img.jpg</p>
                            <img className='h-6 transition-all ease-in hover:bg-white/15 rounded-full cursor-pointer bg-white/10 p-2 ' src='Details\download.png'/>
                        </div>
                        <div className='flex justify-between gap-4'>
                            <img className='h-8 rounded-md' src='Details\joshua-reddekopp-SyYmXSDnJ54-unsplash.jpg' />
                            <p className='truncate'>laptop/Img.jpg</p>
                            <img className='h-6 transition-all ease-in hover:bg-white/15 rounded-full cursor-pointer bg-white/10 p-2 ' src='Details\download.png'/>
                        </div>
                        <div className='flex justify-between gap-4'>
                            <img className='h-8 rounded-md' src='Details\joshua-reddekopp-SyYmXSDnJ54-unsplash.jpg' />
                            <p className='truncate'>laptop/Img.jpg</p>
                            <img className='h-6 transition-all ease-in hover:bg-white/15 rounded-full cursor-pointer bg-white/10 p-2 ' src='Details\download.png'/>
                        </div>
                        <div className='flex justify-between gap-4'>
                            <img className='h-8 rounded-md' src='Details\joshua-reddekopp-SyYmXSDnJ54-unsplash.jpg' />
                            <p className='truncate'>laptop/Img.jpg</p>
                            <img className='h-6 transition-all ease-in hover:bg-white/15 rounded-full cursor-pointer bg-white/10 p-2 ' src='Details\download.png'/>
                        </div>
                    </div>
                </div>
                <div className=''>
                    <div className='flex justify-between items-center'>
                        <span className=''>Shared files</span>
                        <img className='h-6 transition-all ease-in hover:bg-white/15 rounded-full cursor-pointer bg-white/10 p-2' src='Details\down-arrow.png' />
                    </div>
                </div>
                <div className='grid gap-3'>
                    <button className='bg-red-600 hover:opacity-90 transition-all ease-in py-2 px-4 mt-10 rounded-xl'>Block user</button>
                    <button onClick={() => auth.signOut()} className='bg-blue-500 hover:opacity-90 transition-all ease-in py-2 px-4 rounded-xl'>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default Details
