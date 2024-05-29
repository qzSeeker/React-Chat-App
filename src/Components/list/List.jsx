import React from 'react'
import UserInfo from './userInfo/UserInfo'
import ChatList from './chatlist/ChatList'
import { auth } from '../../lib/firebase';

const List = () => {
    
    return (
        <div className='h-full p-4 grid z-20 min-w-80 border bg-white/10 backdrop-blur-sm rounded-x-md'>
            <UserInfo />
            <ChatList/>
            <div className=''>
                <button onClick={() => auth.signOut()} className='bg-black text-white w-full hover:opacity-90 transition-all ease-in py-2 px-4 rounded-md'>Logout</button>
            </div>
        </div>
    )
};

export default List;
