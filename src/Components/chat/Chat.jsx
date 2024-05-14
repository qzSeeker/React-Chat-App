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
        // const [img, setImg] = useState({
        //     file: null,
        //     url: "",
        // });
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
        }, []);


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

            // setImg({
            //     file: null,
            //     url: "",
            // });
            setSelectedImg(null);
            setText("");

            } catch (error) {
            console.log("Error sending message:", error);
            }
        };
    return (
        <div className="w-full flex flex-col justify-between text-white">
        {/* top */}
        <div className="flex justify-between items-center bg-black p-2 border-b border-black/25">
            <div className="flex gap-4 items-center">
            <img
                className="h-10 w-10 rounded-full border-2 border-gray-500"
                src={user?.avatar || "List Icons/user-image-with-black-background.png"}
            />
                <span>{isCurrentUserBlocked ? "username" : user.username}</span>
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
                className={`w-full relative flex ${message.senderId === currentUser?.id ? "justify-end" : "justify-start"}`}
                key={message?.createAt}
            >
                <div className="flex flex-col">
                    {message.img && (
                        <>
                        <img className="w-3/5 rounded-xl mb-8" src={message.img} alt="" />
                        </>
                    )}
                    <p className={`${message.senderId === currentUser?.id ? "bg-blue-500" : "bg-black/15"} p-3 rounded-md text-sm w-max relativ`}>
                        {message.text}
                    </p>
                    {/* <span className="text-xs">1 min ago</span> */}
                </div>
            </div>
            ))}
            {selectedImg &&
                <div className="w-3/5">
                    <img className="rounded-xl mb-8" src={URL.createObjectURL(selectedImg)} alt="" />
                </div>
            }
            <div ref={endRef}></div>
        </div>

        {/* bottom */}
        <div className="w-full flex justify-between items-center p-4 border-t border-white/15 bg-black">
            <div className="flex items-center gap-3">
                {text || selectedImg ? <span>Sending image...</span> : null}
                <label htmlFor="file">
                <img
                    className="h-5 transition-all ease-in cursor-pointer hover:opacity-70"
                    src="Chat Icons\image.png"
                />
                </label>
            <input type="file" id="file" className="hidden disabled:cursor-none" onChange={handleImg} disabled={isCurrentUserBlocked || isReceiverBlocked} />
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
                className="bg-white/10 hover:bg-white/15 transition-all disabled:cursor-not-allowed ease-in rounded-xl w-96 h-12 px-4 outline-0 hover:border border-white/15"
                type="text"
                placeholder={(isCurrentUserBlocked || isReceiverBlocked) ? "You can't send messages..." : "Type a message..."}
                onChange={(e) => setText(e.target.value)}
                disabled={isCurrentUserBlocked || isReceiverBlocked}
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
                className="h-5 transition-all ease-in cursor-pointer hover:opacity-70 disabled:opacity-70 disabled:cursor-not-allowed"
                onClick={handleSend}
                disabled={isCurrentUserBlocked || isReceiverBlocked}
            />
            </div>
        </div>
        </div>
    );
};

export default Chat;