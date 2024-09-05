import React, { useEffect, useState } from "react";
import useUserStore from "../../../lib/userStore";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import AddUser from "../addUser/AddUser";
import useChatStore from "../../../lib/chatStore";
import { IconDotsVertical, IconMinus, IconPlus, IconSearch, IconTrash } from "@tabler/icons-react";

const ChatList = () => {
    const [add, setAdd] = useState(false);
    const [chats, setChats] = useState([]);
    const [input, setInput] = useState("");
    const { currentUser } = useUserStore();
    const { chatId, changeChat } = useChatStore();

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {
            const items = res.data().chats;

            if (!items) return;
            
            const promises = items.map(async (item) => {
                const userDocRef = doc(db, "users", item.receiverId);
                const userDocSnap = await getDoc(userDocRef);

                const user = userDocSnap.data();

                return { ...item, user };
            });

            const chatData = await Promise.all(promises);

            setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
        });

        return () => {
            unSub();
        };
    }, [currentUser.id]);

    const handleSelect = async (chat) => {
        const userChats = chats.map((item) => {
            const { user, ...rest } = item;
            return rest;
        });

        const chatIndex = userChats.findIndex(
            (item) => item.chatId === chat.chatId
        );

        userChats[chatIndex].isSeen = true;

        const userChatsRef = doc(db, "userchats", currentUser.id);

        try {
            
            await updateDoc(userChatsRef, {
                chats: userChats,
            });
            changeChat(chat.chatId, chat.user)
        } catch (error) {
            console.log(error);
        }
    };

    const filteredChats = chats.filter(c => c.user && c.user.username && c.user.username.toLowerCase().includes(input.toLowerCase()));

    return (
        <div className="transition-all ease-in duration-200 w-full">
            <div className="flex items-center justify-between mt-10 px-3 gap-4 rounded-md">
                <div className="flex items-center transition-all ease-in gap-3 overflow-hidden bg-[#20232e] p-2 rounded-md">
                    <IconSearch className="h-5 w-5 flex-shrink-0 dark:text-gray-400 dark:hover:text-gray-500 text-gray-600 hover:text-gray-500 transition-all ease-in duration-200 cursor-pointer" />
                    <input
                        className="bg-transparent border-none placeholder-gray-400 outline-0 text-sm"
                        type="text"
                        placeholder="Search"
                        onChange={(e) => setInput(e.target.value) }
                    />
                </div>
                <button className="bg-[#20232e] hover:opacity-90 flex items-center justify-center gap-1 transition-all ease-in p-2 rounded-md"
                onClick={() => setAdd((prev) => !prev)}
                >
                    {add ? 
                    <IconMinus className="h-5 w-5 flex-shrink-0 dark:text-gray-400 dark:hover:text-gray-500 text-gray-600 hover:text-gray-500 transition-all ease-in duration-200 cursor-pointer"/> 
                    : 
                    <IconPlus className="h-5 w-5 flex-shrink-0 dark:text-gray-400 dark:hover:text-gray-500 text-gray-600 hover:text-gray-500 transition-all ease-in duration-200 cursor-pointer"/>
                    }
                </button>
            </div>
            <div className="h-[1px] mt-8 w-full bg-gray-500"></div>
            {filteredChats.map((chat) => (
                chat && chat.user ? (
                <div className={`${chat?.isSeen ? "" : ""} p-2 hover:bg-[#0d0f18] grid gap-4 cursor-pointer overflow-hidden`} key={chat.chatId} onClick={() => handleSelect(chat)}>
                    <div className="flex items-center justify-between">
                        <div className={`flex gap-4 rounded-md p-2`}>
                            <img className="h-10 w-10 rounded-full border border-gray-500" src={chat.user.blocked.includes(currentUser.id) ? "List Icons/user-image-with-black-background.png" : chat.user.avatar || "List Icons/user-image-with-black-background.png"} />
                            <div className="">
                                <span className="text-sm">{chat.user.blocked.includes(currentUser.id) ? "username" : chat.user.username}</span>
                                <p className={`text-sm`} >{chat.user.blocked.includes(currentUser.id) ? "" : chat.lastMessage}</p>
                            </div>
                        </div>
                            <IconDotsVertical className="h-5 w-5 flex-shrink-0 dark:text-gray-400 dark:hover:text-gray-500 text-gray-600 hover:text-gray-500 transition-all ease-in duration-200 cursor-pointer"/>
                    </div>
                </div>
                ) : null
            ))}
            {add && <AddUser /> }
        </div>
    );
};

export default ChatList;
