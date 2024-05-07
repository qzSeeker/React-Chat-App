import React, { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import useUserStore from "../../lib/userStore";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../lib/firebase";
import useChatStore from "../../lib/chatStore";

const Chat = () => {
    const [chats, setChats] = useState();
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");
    const {isLoading, currentUser} = useUserStore();
    const { chatId } = useChatStore();

    if (isLoading) return <div>Loading chat...</div>

    const endRef = useRef(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({behavior: "smooth"});
    },[]);

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
            setChats(res.data());
        })

        return () => {
            unSub();
        }
    }, [chatId]);

    const handleEmoji = (e) => {
        setText((prev) => prev + e.emoji);
        setOpen(false);
    };

    const time = new Date().toLocaleString();
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
            <div className="flex gap-4 w-3/5">
                <img className="h-7" src="List Icons\user-image-with-black-background.png"/>
                <div className="">
                    <p className="bg-white/10 p-2 rounded-xl text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
                    suscipit iusto error beatae voluptate ratione consectetur et
                    tempore.
                    </p>
                <span className="text-xs">1 min ago</span>
                </div>
            </div>
            <div className="w-full relative flex justify-end">
            <div className="w-3/5">
                <p className="bg-blue-500 p-2 rounded-xl text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
                suscipit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum earum culpa porro quaerat, quo maiores?
                </p>
                <span className="text-xs">1 min ago</span>
            </div>
            </div>
            <div className="flex gap-4 w-3/5">
                <img className="h-7" src="List Icons\user-image-with-black-background.png"/>
                <div className="">
                    <p className="bg-white/10 p-2 rounded-xl text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
                    suscipit iusto error beatae voluptate ratione consectetur et
                    tempore.
                    </p>
                <span className="text-xs">1 min ago</span>
                </div>
            </div>
            <div className="w-full relative flex justify-end">
            <div className="w-3/5">
                <p className="bg-blue-500 p-2 rounded-xl text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
                suscipit iusto error beatae voluptate ratione consectetur.
                </p>
                <span className="text-xs">1 min ago</span>
            </div>
            </div>
            <div className="flex gap-4 w-3/5">
                <img className="h-7" src="List Icons\user-image-with-black-background.png"/>
                <div className="">
                    <p className="bg-white/10 p-2 rounded-xl text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
                    suscipit iusto error beatae volup. Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae numquam exercitationem aliquid dolorum voluptate sequi est totam eos quas ducimus.
                    </p>
                <span className="text-xs">1 min ago</span>
                </div>
            </div>
            <div className="w-full relative flex justify-end">
            <div className="w-3/5">
                <img className="rounded-xl mb-8" src="Details\joshua-reddekopp-SyYmXSDnJ54-unsplash.jpg" />
                <p className="bg-blue-500 p-2 rounded-xl text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
                suscipit iusto error beatae voluptate ratione consectetur et
                tempore, tempora nobi.
                </p>
                <span className="text-xs">1 min ago</span>
            </div>
            </div>
            <div ref={endRef}></div>
        </div>

            {/* bottom */}
            <div className="w-full flex justify-between items-center p-4 border-t border-white/15">
            <div className="flex items-center gap-3">
                <img
                className="h-5 transition-all ease-in cursor-pointer hover:opacity-70"
                src="Chat Icons\image.png"
                />
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
                />
            </div>
            </div>
        </div>
    );
};

export default Chat;
