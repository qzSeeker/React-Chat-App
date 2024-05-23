import React, { useState } from 'react'
import { auth, db } from '../../lib/firebase';
import useUserStore from '../../lib/userStore';
import useChatStore from '../../lib/chatStore';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';

const Details = ({ details }) => {
    // if (!details) return null;

    const [open, setOpen] = useState(false);
    
    const { chatId, user, isCurrentUserBlocked, isReceiverId, changeBlock } = useChatStore();
    let { isReceiverBlocked } = useChatStore();
    const { currentUser } = useUserStore();

    const handleOpen = () => {
        setOpen(!open);
        
    }

    const handleBlock = async () => {
        if (!user) return;

        const userDocRef = doc(db, "users", currentUser.id);

        try {
            
            const updatedBlockedStatus = isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id);
            await updateDoc(userDocRef, {
                blocked: updatedBlockedStatus
            });

            isReceiverBlocked = !isReceiverBlocked;

            changeBlock();
        } catch (error) {
            console.log(error);
        }
    }


    return (
        details && (
        <div className={`h-full grid z-20 w-[40vw] border bg-white/10 backdrop-blur-sm text-white rounded-x-md p-4`}>
            <div className='flex flex-col gap-3 justify-center items-center border-b border-white/15'>
                <img className='h-20 w-20 border-2 rounded-full' src={user?.avatar || 'List Icons/user-image-with-black-background.png'} />
                <h2 className='text-xl'>{isCurrentUserBlocked ? "username" : user.username}</h2>
                <p className='text-sm'>Lorem ipsum dolor sit amet consectetur</p>
            </div>

            <div className='flex flex-col gap-6 mt-4'>
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
                </div>
                <div className=''>
                    <div className='flex justify-between items-center'>
                        <span className=''>Shared files</span>
                        <img className='h-6 transition-all ease-in hover:bg-white/15 rounded-full cursor-pointer bg-white/10 p-2' src='Details\down-arrow.png' />
                    </div>
                </div>
            </div>
                    {/* <div className='border border-white/15 rounded-md p-2 flex flex-col gap-6'>
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
                    </div> */}
            <div className=''>
                <button onClick={handleBlock} className='bg-black hover:opacity-90 transition-all ease-in py-2 px-4 w-full rounded-md'>{
                    isCurrentUserBlocked ? "You are blocked!" : isReceiverBlocked ? "Unblock" : "Block"
                }</button>
            </div>
        </div>
        )
    )
}

export default Details
