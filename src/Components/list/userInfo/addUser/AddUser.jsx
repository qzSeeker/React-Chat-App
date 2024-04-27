import React from 'react'

const AddUser = () => {
    return (
        <div className='relative h-full w-full'>
            <div className='absolute h-[30vh] w-[20vw] bg-white/15'>
                <div className='flex'>
                <input type='text' placeholder='Search' name='search' />
                <button>Add</button>
                </div>
                <div className='flex'>
                    <img src='List Icons\user-image-with-black-background.png' />
                    <h1>Qz Seeker</h1>
                </div>
            </div>
        </div>
    )
}

export default AddUser
