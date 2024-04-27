
const UserInfo = () => {

    const username = "Qz Seeker";

    return (
        <div>
            <div className='flex justify-between items-center p-3'>
                    <img className='h-10' src='List Icons\user-image-with-black-background.png' />
                <div className='flex gap-4'>
                    <img className='h-5 transition-all ease-in cursor-pointer hover:opacity-70' src='List Icons\more.png' />
                    <img className='h-5 transition-all ease-in cursor-pointer hover:opacity-70' src='List Icons\video-camera.png' />
                    <img className='h-5 transition-all ease-in cursor-pointer hover:opacity-70' src='List Icons\edit.png' />
                </div>
            </div>
            <div className='p-3'>
                <h1 className="text-xl">{username}</h1>
            </div>
        </div>
    )
}

export default UserInfo
