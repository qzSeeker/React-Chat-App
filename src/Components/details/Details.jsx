import React, { useState } from 'react'
import { auth, db } from '../../lib/firebase';
import useUserStore from '../../lib/userStore';
import useChatStore from '../../lib/chatStore';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';

const Details = () => {
    const [open, setOpen] = useState(false);
    
    const { chatId, user, isCurrentUserBlocked, isReceiverId, isReceiverBlocked, changeBlock } = useChatStore();
    const { currentUser } = useUserStore();

    const handleOpen = () => {
        setOpen(!open);
        
    }
    const handleChange = () => {
        
    }

    const handleBlock = async () => {
        if (!user) return;

        const userDocRef = doc(db, "users", currentUser.id);

        try {
            
            await updateDoc(userDocRef, {
                blocked: isRecieverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
            });
            changeBlock();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='h-full w-[40vw] border border-white/20'>
            <div className='flex flex-col justify-center items-center mt-6 border-b border-white/15'>
                <img className='h-16 w-16 rounded-full' src={user?.avatar || 'List Icons/user-image-with-black-background.png'} />
                <h2 className='text-xl mt-2'>{user?.username}</h2>
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
                    <button onClick={handleBlock} className='bg-red-600 hover:opacity-90 transition-all ease-in py-2 px-4 mt-10 rounded-xl'>{
                        isCurrentUserBlocked ? "You are blocked!" : isReceiverBlocked ? "User blocked!" : "Block user"
                    }</button>
                    <button onClick={() => auth.signOut()} className='bg-blue-500 hover:opacity-90 transition-all ease-in py-2 px-4 rounded-xl'>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default Details
