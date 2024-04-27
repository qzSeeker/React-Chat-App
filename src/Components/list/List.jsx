import React from 'react'
import UserInfo from './userInfo/UserInfo'
import ChatList from './userInfo/ChatList'

const List = () => {
    return (
        <div className='h-full w-[35vw] border border-white/20'>
            <UserInfo />
            <ChatList/>
        </div>
    )
}

export default List
