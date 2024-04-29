import React from "react";

const AddUser = () => {
    return (
        <div className="absolute text-sm left-0 right-0 top-0 bottom-0 p-8 h-max w-max m-auto bg-black/60 z-20 rounded-xl flex flex-col gap-8">
            <form className="flex gap-3">
                <input className="bg-white rounded-xl px-2 py-3 outline-none" type="text" placeholder="Username" name="username" />
                <button className="bg-blue-500 rounded-xl px-2 hover:opacity-80">Search</button>
            </form>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                <img className="h-10" src="List Icons\user-image-with-black-background.png" />
                <h1>Qz Seeker</h1>
                </div>
                <button className="bg-blue-500 rounded-xl px-2 py-2 hover:opacity-80">Add User</button>
            </div>
        </div>
    );
};

export default AddUser;
