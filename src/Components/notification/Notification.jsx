import React from 'react'
import { ToastContainer } from 'react-toastify';

const Notification = () => {
    return (
        <div className='h-full relative'>
            <ToastContainer theme='dark' hideProgressBar />
        </div>
    )
}

export default Notification
