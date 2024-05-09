import useUserStore from "../../../lib/userStore";

const UserInfo = () => {
    const { currentUser } = useUserStore();

    return (
        <div>
            <div className='flex justify-between items-center p-3'>
                    <img className='h-10 w-10 rounded-full' src={currentUser.avatar || 'List Icons/user-image-with-black-background.png'} />
                <div className='flex gap-4'>
                    <img className='h-5 transition-all ease-in cursor-pointer hover:opacity-70' src='List Icons\more.png' />
                    <img className='h-5 transition-all ease-in cursor-pointer hover:opacity-70' src='List Icons\video-camera.png' />
                    <img className='h-5 transition-all ease-in cursor-pointer hover:opacity-70' src='List Icons\edit.png' />
                </div>
            </div>
            <div className='px-3'>
                <h1 className="text-sm">{currentUser.username}</h1>
            </div>
        </div>
    )
}

export default UserInfo
