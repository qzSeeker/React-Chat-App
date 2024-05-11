import React, { useEffect, useState } from "react";
import useUserStore from "../../../lib/userStore";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import AddUser from "../addUser/AddUser";
import useChatStore from "../../../lib/chatStore";

const ChatList = () => {
    const [add, setAdd] = useState(false);
    const [chats, setChats] = useState([]);
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

    return (
        <div className="">
            <div className="flex items-center justify-between mt-8 px-2 gap-4">
                <div className="flex items-center w-full p-2 transition-all ease-in bg-white/10 hover:bg-white/15 rounded-xl gap-3 overflow-hidden hover:border border-white/10">
                    <img className="h-5" src="List Icons\glass.png" />
                    <input
                        className="bg-transparent border-none outline-0 text-sm"
                        type="text"
                        placeholder="search"
                    />
                </div>
                <button className="bg-white/10 transition-all ease-in hover:bg-white/15 p-2 rounded-xl hover:border border-white/10">
                    <img
                        className="h-5"
                        src={add ? "List Icons/minus.png" : "List Icons/add.png"}
                        onClick={() => setAdd((prev) => !prev)}
                    />
                </button>
            </div>

            {chats.map((chat) => (
                <div className={`${chat?.isSeen ? "bg-transparent" : "bg-blue-400"} grid gap-4 p-3 mt-6 border border-white/15 rounded-md m-2 cursor-pointer overflow-hidden`} key={chat.chatId} onClick={() => handleSelect(chat)}>
                        <div className={`flex gap-4 rounded-md p-2`}>
                        <img className="h-10 w-10 rounded-full" src={chat.user.blocked.includes(currentUser.id) ? "List Icons/user-image-with-black-background.png" : chat.user.avatar || "List Icons/user-image-with-black-background.png"} />
                        <div className="">
                            <span>{chat.user.blocked.includes(currentUser.id) ? "username" : chat.user.username}</span>
                            <p className={` text-sm`} >{chat.user.blocked.includes(currentUser.id) ? "" : chat.lastMessage}</p>
                        </div>
                    </div>
                </div>
            ))}
            {add && <AddUser /> }
        </div>
    );
};

export default ChatList;
