import React from 'react'
import UserInfo from './userInfo/UserInfo'
import ChatList from './chatlist/ChatList'

const List = () => {
    return (
        <div className='h-full w-[35vw] border border-black/25 bg-black'>
            <UserInfo />
            <ChatList/>
        </div>
    )
}

export default List
