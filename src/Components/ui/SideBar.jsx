import { IconFlag3, IconLogout, IconMail, IconMessages, IconSettings2, IconUsers } from '@tabler/icons-react'
import React from 'react'
import useUserStore from '../../lib/userStore'
import { auth } from '../../lib/firebase'

function SideBar({handleUsers}) {
    const { currentUser } = useUserStore()
    return (
        <>
        {/* Desktop */}
        <div className={`bg-white dark:bg-[#0d0f18] h-screen border-r border-gray-500 min:w-[6rem] w-[6rem] hidden md:flex flex-col items-center pt-10 z-40`}>
            <div className="flex items-center justify-center">
            <img className='h-10 w-10 border-2 border-gray-500 rounded-full' src={currentUser.avatar || 'List Icons/user-image-with-black-background.png'} />
            </div>
            <div className="flex flex-col gap-12 mt-16">
                <IconUsers onClick={handleUsers} className="h-6 w-6 flex-shrink-0 dark:text-gray-400 dark:hover:text-gray-500 text-gray-600 hover:text-gray-500 transition-all ease-in duration-200 cursor-pointer" />
                {/* <IconMail className="h-6 w-6 flex-shrink-0 dark:text-gray-400 dark:hover:text-gray-500 text-gray-600 hover:text-gray-500 transition-all ease-in duration-200 cursor-pointer" /> */}
                <IconMessages className="h-7 w-7 flex-shrink-0 dark:text-gray-400 dark:hover:text-gray-500 text-gray-600 hover:text-gray-500 transition-all ease-in duration-200 cursor-pointer" />
                <IconFlag3 className="h-7 w-7 flex-shrink-0 dark:text-gray-400 dark:hover:text-gray-500 text-gray-600 hover:text-gray-500 transition-all ease-in duration-200 cursor-pointer" />
                <IconSettings2 className="h-6 w-6 absolute bottom-20 flex-shrink-0 dark:text-gray-400 dark:hover:text-gray-500 text-gray-600 hover:text-gray-500 transition-all ease-in duration-200 cursor-pointer" />
                <IconLogout onClick={() => auth.signOut()} className="h-7 w-7 absolute bottom-6 flex-shrink-0 dark:text-gray-400 dark:hover:text-gray-500 text-gray-600 hover:text-gray-500 transition-all ease-in duration-200 cursor-pointer"></IconLogout>
            </div>
        </div>

        {/* Mobile */}
        <div className='bg-white dark:bg-[#0d0f18] h-[4rem] w-full md:hidden flex items-center justify-evenly border-t border-gray-500 absolute bottom-0 z-40'>
            {/* <div className='flex items-center justify-betwee'> */}
                <IconUsers onClick={handleUsers} className="h-6 w-6 flex-shrink-0 dark:text-gray-400 dark:hover:text-gray-500 text-gray-600 hover:text-gray-500 transition-all ease-in duration-200 cursor-pointer" />
                <IconMessages className="h-7 w-7 flex-shrink-0 dark:text-gray-400 dark:hover:text-gray-500 text-gray-600 hover:text-gray-500 transition-all ease-in duration-200 cursor-pointer" />
                {/* <IconMail className="h-6 w-6 flex-shrink-0 dark:text-gray-400 dark:hover:text-gray-500 text-gray-600 hover:text-gray-500 transition-all ease-in duration-200 cursor-pointer" /> */}
                <IconLogout onClick={() => auth.signOut()} className="h-7 w-7 flex-shrink-0 dark:text-gray-400 dark:hover:text-gray-500 text-gray-600 hover:text-gray-500 transition-all ease-in duration-200 cursor-pointer"></IconLogout>
            {/* </div> */}
        </div>
        </>
    )
}

export default SideBar