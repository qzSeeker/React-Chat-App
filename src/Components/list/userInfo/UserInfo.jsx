import { IconDotsVertical } from "@tabler/icons-react";
import useUserStore from "../../../lib/userStore";

const UserInfo = () => {
    const { currentUser } = useUserStore();

    return (
        <div className="flex flex-col justify-between w-full">
            <div className='flex justify-between items-center'>
                <h1 className="text-white">{currentUser.username}</h1>
                <IconDotsVertical />
            </div>
            <div className='flex justify-between items-center'>
                <div className="bg-[#20232e] hover:opacity-80 transition-all ease-in duration-200 p-3 cursor-pointer rounded-md">
                    Edit profile
                </div>
            </div>
        </div>
    )
}

export default UserInfo
