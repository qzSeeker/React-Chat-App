import React, { useState } from "react";

const ChatList = () => {
    const [add, setAdd] = useState(false);
    return (
        <div className="">
            <div className="flex items-center justify-evenly gap-1 mt-8">
                <div className="flex items-center p-2 bg-white/10 hover:bg-white/15 rounded-2xl gap-3 overflow-hidden hover:border border-white/10">
                    <img className="h-5" src="List Icons\glass.png" />
                    <input
                        className="bg-transparent border-none outline-0 text-sm"
                        type="text"
                        placeholder="search"
                    />
                </div>
                <button className="bg-white/10 hover:bg-white/15 p-2 rounded-full hover:border border-white/10">
                    <img
                        className="h-5"
                        src={add ? "List Icons/minus.png" : "List Icons/add.png"}
                        onClick={() => setAdd((prev) => !prev)}
                    />
                </button>
            </div>

            <div className="grid gap-4 p-3 mt-6 border border-white/15 rounded-md m-2">
                <div className="flex gap-4">
                    <img className="h-10" src="List Icons\user-image-with-black-background.png" />
                    <div>
                        <span>Qz Seeker</span>
                        <p className="text-sm">Hey there</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <img className="h-10" src="List Icons\user-image-with-black-background.png" />
                    <div>
                        <span>Qz Seeker</span>
                        <p className="text-sm">Hey there</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <img className="h-10" src="List Icons\user-image-with-black-background.png" />
                    <div>
                        <span>Qz Seeker</span>
                        <p className="text-sm">Hey there</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <img className="h-10" src="List Icons\user-image-with-black-background.png" />
                    <div>
                        <span>Qz Seeker</span>
                        <p className="text-sm">Hey there</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <img className="h-10" src="List Icons\user-image-with-black-background.png" />
                    <div>
                        <span>Qz Seeker</span>
                        <p className="text-sm">Hey there</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <img className="h-10" src="List Icons\user-image-with-black-background.png" />
                    <div>
                        <span>Qz Seeker</span>
                        <p className="text-sm">Hey there</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatList;
