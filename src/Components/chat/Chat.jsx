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
import { IconCamera, IconListDetails, IconMicrophone, IconMoodSing, IconPhone, IconPhoto, IconSend, IconVideo } from "@tabler/icons-react";

const Chat = ({ handleDetails }) => {
        const [chat, setChat] = useState();
        const [open, setOpen] = useState(false);
        const [text, setText] = useState("");
        const [img, setImg] = useState({
            file: null,
            url: "",
        });
        const [viewingImage, setViewingImage] = useState(false);
        const [selectedImg, setSelectedImg] = useState(null);

        const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } = useChatStore();
        const { currentUser } = useUserStore();

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
        }, [text]);


        const handleEmoji = (e) => {
            setText((prev) => prev + e.emoji);
            setOpen(false);
        };

        const handleImg = (e) => {
            if (e.target.files[0]) { // Check if a file is selected
                setSelectedImg(e.target.files[0]);
                setViewingImage(true);
            } else {
                console.error("No image selected");
            }
        };

        const handleSend = async () => {
            if (!text && !selectedImg) return;

            if (viewingImage) {
                setViewingImage(false);
                return;
            }

            try {
                let imgUrl = null;
                
                if (selectedImg) {
                    imgUrl = await upload(selectedImg);
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

            setImg({
                file: null,
                url: "",
            });
            setSelectedImg(null);
            setText("");

            } catch (error) {
            console.log("Error sending message:", error);
            }
        };

    return (
        <div className="bg-[#151726] h-screen w-full relative">
            {/* top */}
            <div className="flex justify-between items-center p-5 border-b border-gray-500">
                <div className="flex gap-4 items-center">
                <img
                    className="h-10 w-10 rounded-full"
                    src={user?.avatar || "List Icons/user-image-with-black-background.png"}
                />
                    <span>{isCurrentUserBlocked ? "username" : user.username}</span>
                </div>
                <div className="flex gap-4">
                <IconPhone
                    className="h-6 w-6 flex-shrink-0 dark:text-gray-400 dark:hover:text-gray-500 text-gray-600 hover:text-gray-500 transition-all ease-in duration-200 cursor-pointer"
                />
                <IconVideo
                    className="h-6 w-6 flex-shrink-0 dark:text-gray-400 dark:hover:text-gray-500 text-gray-600 hover:text-gray-500 transition-all ease-in duration-200 cursor-pointer"
                />
                <IconListDetails
                    className="h-6 w-6 flex-shrink-0 dark:text-gray-400 dark:hover:text-gray-500 text-gray-600 hover:text-gray-500 transition-all ease-in duration-200 cursor-pointer"
                    onClick={handleDetails}
                />
                </div>
            </div>

            {/* center */}
            <div className="overflow-y-auto h-[calc(100%-8rem)]">
                {chat?.messages?.map((message) => (
                <div
                    className={`flex ${message.senderId === currentUser?.id ? "justify-end" : "justify-start"}`}
                    key={message?.createAt}
                >
                    <div className="flex flex-col">
                        {message.img && (
                            <>
                            <img className="w-[20rem] rounded-xl m-4" src={message.img} alt="" />
                            </>
                        )}
                        <p className={`${message.senderId === currentUser?.id ? "bg-gray-600 text-white" : "bg-[#20232e]"} p-3 mx-6 my-4 rounded-md text-sm w-max max-w-48 relative text-balance whitespace-normal`}>
                            {message.text}
                        </p>
                        {/* <span className="text-xs">1 min ago</span> */}
                    </div>
                    {/* {selectedImg &&
                            <img className={`${message.senderId === currentUser?.id ? "" : "" } rounded-xl mb-8 h-18 w-18`} src={URL.createObjectURL(selectedImg)} alt="" />
                    } */}
                </div>
                ))}
                {/* <div className="h-32 w-max bg-transparent"></div> */}
                <div ref={endRef} className="h-32 scroll-smooth"></div>
            </div>

            {/* bottom */}
            {/* <div className="absolute"> */}
                <div className="flex flex-col justify-between items-center gap-3 p-5 border-t border-gray-500 absolute md:bottom-0 bottom-16 w-full bg-[#151726] z-20 ">
                    {/* {(text || selectedImg) && <span className="text-white">Sending image...</span>} */}
                    <div className="flex gap-2">
                        <label htmlFor="file" className="flex items-center gap-3">
                            <IconPhoto className="h-6 w-6 flex-shrink-0 dark:text-gray-400 dark:hover:text-gray-500 text-gray-600 hover:text-gray-500 transition-all ease-in duration-200 cursor-pointer"/>
                            <input type="file" id="file" className="hidden disabled:cursor-none" onChange={handleImg} disabled={isCurrentUserBlocked || isReceiverBlocked} />
                        </label>
                        <IconCamera className="h-6 w-6 flex-shrink-0 dark:text-gray-400 dark:hover:text-gray-500 text-gray-600 hover:text-gray-500 transition-all ease-in duration-200 cursor-pointer"/>
                        <IconMicrophone className="h-6 w-6 flex-shrink-0 dark:text-gray-400 dark:hover:text-gray-500 text-gray-600 hover:text-gray-500 transition-all ease-in duration-200 cursor-pointer"/>
                    </div>
                    <div className="flex flex-1 bg-[#20232e] placeholder-white hover:opacity-90 w-max h-max px-6 py-4 rounded-full gap-4">
                        <input
                        value={text}
                        className="bg-transparent placeholder-gray-400 placeholder-opacity-80 transition-all disabled:cursor-not-allowed ease-in outline-0 text-white flex-1"
                        type="text"
                        placeholder={(isCurrentUserBlocked || isReceiverBlocked) ? "You can't send messages..." : "Start a message"}
                        onChange={(e) => setText(e.target.value)}
                        disabled={isCurrentUserBlocked || isReceiverBlocked}
                        />
                        <div className="flex items-center gap-3">
                        <IconMoodSing
                            className="h-6 w-6 flex-shrink-0 dark:text-gray-400 dark:hover:text-gray-500 text-gray-600 hover:text-gray-500 transition-all ease-in duration-200 cursor-pointer"
                            onClick={() => setOpen((prev) => !prev)}
                        />
                        <IconSend
                            className="disabled:opacity-70 disabled:cursor-not-allowed h-6 w-6 flex-shrink-0 dark:text-gray-400 dark:hover:text-gray-500 text-gray-600 hover:text-gray-500 transition-all ease-in duration-200 cursor-pointer"
                            onClick={handleSend}
                            disabled={isCurrentUserBlocked || isReceiverBlocked}
                        />
                        </div>
                    </div>
                </div>
            {/* </div> */}
            {open && (
                <div className="absolute right-4 bottom-20">
                <EmojiPicker onEmojiClick={handleEmoji} />
                </div>
            )}
        </div>
    );
};

export default Chat;