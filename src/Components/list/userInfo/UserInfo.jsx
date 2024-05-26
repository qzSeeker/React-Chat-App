import useUserStore from "../../../lib/userStore";

const UserInfo = () => {
    const { currentUser } = useUserStore();

    return (
        <div className="flex flex-col gap-4">
            <div className='flex justify-between items-center'>
                <h1 className="text-white">{currentUser.username}</h1>
                    <img className='h-4 rotate-90 transition-all ease-in cursor-pointer hover:opacity-70' src='List Icons\more.png' />
            </div>
            <div className='flex justify-between items-center'>
                <img className='h-20 w-20 rounded-full' src={currentUser.avatar || 'List Icons/user-image-with-black-background.png'} />
                    <div className="bg-white/25 p-3 hover:opacity-80 cursor-pointer text-xs rounded-md font-semibold text-white">
                        Edit profile
                    </div>
            </div>
        </div>
    )
}

export default UserInfo
