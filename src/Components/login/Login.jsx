import React, { useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [avatar, setAvatar] = useState({
        file: null,
        url: ""
    });

    const handleAvatar = (e) => {
        setAvatar ({
            file:e.target.files[0],
            url: URL.createObjectURL(e.target.files[0])
        })
    }

    const handleLogin = (e) => {
        e.preventDefault()
    }
    return (
        <div className="h-full w-full flex justify-around items-center">
        {/* login */}
        <div className="w-80">
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <h1 className="text-2xl">Welcome back - Buddy!</h1>
            <input className="bg-white/15 outline-none hover:border border-white/10 transition-all ease-in h-10 w-full px-2 rounded-xl" type="Email" placeholder="Email" name="Email" />
            <input className="bg-white/15 outline-none hover:border border-white/10 transition-all ease-in h-10 w-full px-2 rounded-xl" type="Password" placeholder="Password" name="Password" />
            <button className="bg-blue-500 py-2 px-4 rounded-xl hover:opacity-80 transition-all ease-in">Log In</button>
            </form>
        </div>
        {/* seperator */}
        <div className="h-full w-1 bg-white/15"></div>
        {/* signin */}
        <div className="w-80">
            <form className="flex flex-col gap-4">
            <h1 className="text-2xl">Create an Account</h1>
            <label className="flex items-center gap-2" htmlFor="file">
                <img className="h-14 rounded-md w-14" src={avatar.url || "List Icons/user-image-with-black-background.png" } />
                Upload an image</label>
            <input type="file" id="file" className="hidden" onChange={handleAvatar} />
            <input className="bg-white/15 outline-none hover:border border-white/10 transition-all ease-in h-10 w-full px-2 rounded-xl" type="text" placeholder="Username" name="Username" />
            <input className="bg-white/15 outline-none hover:border border-white/10 transition-all ease-in h-10 w-full px-2 rounded-xl" type="Email" placeholder="Email" name="Email" />
            <input className="bg-white/15 outline-none hover:border border-white/10 transition-all ease-in h-10 w-full px-2 rounded-xl" type="Password" placeholder="Password" name="Password" />
            <button className="bg-blue-500 py-2 px-4 rounded-xl hover:opacity-80 transition-all ease-in">Sign In</button>
            </form>
        </div>
        </div>
    );
};

export default Login;
