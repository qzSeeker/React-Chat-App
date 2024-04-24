import React, { useState } from "react"
import EmojiPicker from "emoji-picker-react";

const Chat = () => {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");

    const handleEmoji = (e) => {
        setText((prev) => prev + e.emoji);
        setOpen(false);
    }
    return (
        <div className='h-full w-full border-x mx-2 border-white/15 relative'>
            <div className="flex justify-between items-center p-2 border-b border-white/15">
                <div className="flex gap-4 items-center">
                    <img className='h-10' src='List Icons\user-image-with-black-background.png' />
                    <div>
                        <span>Qz Seeker</span>
                        <p className="text-sm">Some text for example</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <img className='h-5 cursor-pointer hover:opacity-70' src='Chat Icons\phone-call.png' />
                    <img className='h-5 cursor-pointer hover:opacity-70' src='List Icons\video-camera.png' />
                    <img className='h-5 cursor-pointer hover:opacity-70' src='Chat Icons\info.png' />
                </div>
            </div>

            <div className="flex justify-between items-center p-2 border-t border-white/15 absolute bottom-0 left-0 right-0">
                <div className="flex items-center gap-3">
                    <img className="h-5 cursor-pointer hover:opacity-70" src="Chat Icons\image.png" />
                    <img className="h-5 cursor-pointer hover:opacity-70" src="Chat Icons\photo-camera.png" />
                    <img className="h-5 cursor-pointer hover:opacity-70" src="Chat Icons\mic .png" />
                </div>
                <div>
                    <input value={text} className="bg-white/10 rounded-xl w-96 h-12 px-4 outline-0 hover:border border-white/15" type="text" placeholder="Type a message..." onChange={(e) => setText(e.target.value)} />
                </div>
                <div className="flex items-center gap-3">
                    <div className="absolute right-4 bottom-20">
                        <EmojiPicker open={open} onEmojiClick={handleEmoji}/>
                    </div>
                    <img src="Chat Icons\laugh.png" className="h-5 cursor-pointer hover:opacity-70" onClick={() => setOpen(prev => !prev)} />
                    <img src="Chat Icons\send.png" className="h-5 cursor-pointer hover:opacity-70" />
                </div>
            </div>
        </div>
    )
}

export default Chat
