import React, { useState } from 'react';
import { db } from '../../lib/firebase';
import useUserStore from '../../lib/userStore';
import useChatStore from '../../lib/chatStore';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { IconLayoutSidebarRightCollapse } from '@tabler/icons-react';
import { motion } from 'framer-motion';

const Details = ({ details, handleDetails }) => {

    const [open, setOpen] = useState(false);
    
    const { user, isCurrentUserBlocked, changeBlock } = useChatStore();
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
        <motion.div className={`h-screen grid z-20 w-max absolute m-0 p-0 right-0 min-w-[15rem] border-l border-gray-500 bg-[#11131f] px-4`}
        initial={{ x: "30%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 0.3 }}
            >
            <div className='absolute'>
                <IconLayoutSidebarRightCollapse onClick={handleDetails} className='h-7 w-7 flex-shrink-0 dark:text-gray-400 dark:hover:text-gray-500 text-gray-600 hover:text-gray-500 transition-all ease-in duration-200 m-4 cursor-pointer'/>
            </div>
            <div className='flex gap-3 justify-evenly items-center border-b border-gray-500'>
                <img className='h-20 w-20 border-2 border-gray-500 rounded-full' src={user?.avatar || 'List Icons/user-image-with-black-background.png'} />
                <div className='flex flex-col gap-2'>
                    <h2 className='text-sm'>{isCurrentUserBlocked ? "username" : user.username}</h2>
                    <div className='w-max h-max px-4 bg-[#96e962] text-black rounded-full'>BFF</div>
                </div>
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
            <div className=''>
                <button onClick={handleBlock} className='bg-[#20232e] border-b hover:border border-gray-500 transition-all ease-in duration-200 py-2 px-4 w-full rounded-full'>{
                    isCurrentUserBlocked ? "You are blocked!" : isReceiverBlocked ? "Unblock" : "Block"
                }</button>
            </div>
        </motion.div>
        )
    )
}

export default Details
