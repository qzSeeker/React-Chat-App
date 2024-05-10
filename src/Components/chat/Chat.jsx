import React, { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import {
    arrayUnion,
    doc,
    getDoc,
    onSnapshot,
    updateDoc,
    } from "firebase/firestore";
    import { db } from "../../lib/firebase";
    import useChatStore from "../../lib/chatStore";
import useUserStore from "../../lib/userStore";
import upload from "../../lib/upload";

const Chat = () => {
        const [chat, setChat] = useState();
        const [open, setOpen] = useState(false);
        const [text, setText] = useState("");
        const [img, setImg] = useState({
            file: null,
            url: "",
        });

        const { chatId, user } = useChatStore();
        const { currentUser } = useUserStore();

        const time = new Date().toLocaleString();
        const endRef = useRef(null);

        useEffect(() => {
            const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
            setChat(res.data());
            });

            return () => {
            unSub();
            };
        }, [chatId]);

        useEffect(() => {
            endRef.current?.scrollIntoView({ behavior: "smooth" });
        }, []);


        const handleEmoji = (e) => {
            setText((prev) => prev + e.emoji);
            setOpen(false);
        };

        const handleImg = (e) => {
            setImg({
            file: e.target.files[0],
            url: URL.createObjectURL(e.target.files[0]),
            });
        };

        const handleSend = async () => {
            if (!text === "") return;

            let imgUrl = null;

            try {
                if (img.file) {
                    imgUrl = await upload(img.file);
                }

                const newMessage = {
                    senderId: currentUser.id,
                    text,
                    createAt: new Date(),
                };

                if (imgUrl) {
                    newMessage.img = imgUrl;
                }

            await updateDoc(doc(db, "chats", chatId), {
                messages: arrayUnion(newMessage),
            });

            const userIDs = [currentUser.id, user.id];

            userIDs.forEach(async (id) => {
                const userChatsRef = doc(db, "userchats", currentUser.id);
                const userChatsSnapshot = await getDoc(userChatsRef);

                if (userChatsSnapshot.exists()) {
                const userChatsData = userChatsSnapshot.data();

                const chatIndex = userChatsData.chats.findIndex(
                    (c) => c.chatId === chatId
                );

                userChatsData.chats[chatIndex].lastMessage = text;
                userChatsData.chats[chatIndex].isSeen = id === currentUser.id ? true : false;
                userChatsData.chats[chatIndex].updateAt = Date.now();

                await updateDoc(userChatsRef, {
                    chats: userChatsData.chats,
                });
                }
            });
            } catch (error) {
            console.log(error);
            }

            setImg({
                file: null,
                url: "",
            });
            setText("");
        };
    return (
        <div className="w-full flex flex-col justify-between">
        {/* top */}
        <div className="flex justify-between items-center bg-white/10 p-2 border-b border-white/15">
            <div className="flex gap-4 items-center">
            <img
                className="h-10"
                src="List Icons\user-image-with-black-background.png"
            />
            <div>
                <span>Qz Seeker</span>
                <p className="text-sm">Last active {time}</p>
            </div>
            </div>
            <div className="flex gap-4">
            <img
                className="h-5 transition-all ease-in cursor-pointer hover:opacity-70"
                src="Chat Icons\phone-call.png"
            />
            <img
                className="h-5 transition-all ease-in cursor-pointer hover:opacity-70"
                src="List Icons\video-camera.png"
            />
            <img
                className="h-5 transition-all ease-in cursor-pointer hover:opacity-70"
                src="Chat Icons\info.png"
            />
            </div>
        </div>

        {/* center */}
        <div className="h-max overflow-y-auto will-change-scroll scroll-smooth p-6 flex flex-col gap-10 relative">
            {chat?.messages?.map((message) => (
            <div
                className="w-full relative flex justify-end"
                key={message?.createAt}
            >
                <div className="w-3/5">
                {message.img && (
                    <img className="rounded-xl mb-8" src={message.img} alt="" />
                )}
                <p className="bg-blue-500 p-3 rounded-md text-sm w-max text-right">
                    {message.text}
                </p>
                {/* <span className="text-xs">1 min ago</span> */}
                </div>
            </div>
            ))}
            {img.url &&
            <div>
                <div>
                    <img src={img.url} alt="" />
                </div>
            </div>
            }
            <div ref={endRef}></div>
        </div>

        {/* bottom */}
        <div className="w-full flex justify-between items-center p-4 border-t border-white/15">
            <div className="flex items-center gap-3">
                <label htmlFor="file">
            <img
                className="h-5 transition-all ease-in cursor-pointer hover:opacity-70"
                src="Chat Icons\image.png"
            />
            </label>
            <input type="file" id="file" className="hidden" onChange={handleImg}/>
            <img
                className="h-5 transition-all ease-in cursor-pointer hover:opacity-70"
                src="Chat Icons\photo-camera.png"
            />
            <img
                className="h-5 transition-all ease-in cursor-pointer hover:opacity-70"
                src="Chat Icons\mic .png"
            />
            </div>
            <div>
            <input
                value={text}
                className="bg-white/10 hover:bg-white/15 transition-all ease-in rounded-xl w-96 h-12 px-4 outline-0 hover:border border-white/15"
                type="text"
                placeholder="Type a message..."
                onChange={(e) => setText(e.target.value)}
            />
            </div>
            <div className="flex items-center gap-3">
            <div className="absolute right-4 bottom-20">
                <EmojiPicker open={open} onEmojiClick={handleEmoji} />
            </div>
            <img
                src="Chat Icons\laugh.png"
                className="h-5 transition-all ease-in cursor-pointer hover:opacity-70"
                onClick={() => setOpen((prev) => !prev)}
            />
            <img
                src="Chat Icons\send.png"
                className="h-5 transition-all ease-in cursor-pointer hover:opacity-70"
                onClick={handleSend}
            />
            </div>
        </div>
        </div>
    );
};

export default Chat;
