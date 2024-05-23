import React, { useEffect, useState } from "react";
import useUserStore from "../../../lib/userStore";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import AddUser from "../addUser/AddUser";
import useChatStore from "../../../lib/chatStore";

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

    const filteredChats = chats.filter(c => c.user.username.toLowerCase().includes(input.toLowerCase()))

    return (
        <div className="text-white relative bottom-28">
            <div className="flex items-center justify-between mt-8 px-3 gap-4 bg-white/25 py-2 rounded-md">
                <div className="flex items-center transition-all ease-in gap-3 overflow-hidden">
                    <img className="h-5" src="List Icons\glass.png" />
                    <input
                        className="bg-transparent border-none p-1 placeholder-white outline-0 text-sm"
                        type="text"
                        placeholder="search"
                        onChange={(e) => setInput(e.target.value) }
                    />
                </div>
                <button className="bg-black flex items-center justify-center gap-1 transition-all ease-in p-3 rounded-md">
                    <img
                        className="h-4"
                        src={add ? "List Icons/minus.png" : "List Icons/add.png"}
                        onClick={() => setAdd((prev) => !prev)}
                    />
                    <p className="text-xs">Add User</p>
                </button>
            </div>

            {filteredChats.map((chat) => (
                <div className={`${chat?.isSeen ? "bg-white/10" : "bg-black"} backdrop-blur-sm grid gap-4 p-3 mt-6 border rounded-md cursor-pointer overflow-hidden`} key={chat.chatId} onClick={() => handleSelect(chat)}>
                        <div className={`flex gap-4 rounded-md p-2`}>
                        <img className="h-10 w-10 rounded-full" src={chat.user.blocked.includes(currentUser.id) ? "List Icons/user-image-with-black-background.png" : chat.user.avatar || "List Icons/user-image-with-black-background.png"} />
                        <div className="text-white">
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
