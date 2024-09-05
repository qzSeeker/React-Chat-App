import { doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { auth, db } from '../../../lib/firebase';
import { toast } from 'react-toastify';
import upload from '../../../lib/upload';

function Signup() {

    const [loading, setLoading] = useState(false);
    const [avatar, setAvatar] = useState({
        file: null,
        url: "",
    });

    const handleAvatar = (e) => {
        setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);

        const { username, email, password } = Object.fromEntries(formData);

        try {
        const res = await createUserWithEmailAndPassword(auth, email, password);

        const imgUrl = await upload(avatar.file);
        await setDoc(doc(db, "users", res.user.uid), {
            username,
            email,
            avatar: imgUrl,
            id: res.user.uid,
            blocked: [],
        });

        await setDoc(doc(db, "userchats", res.user.uid), {
            chats: [],
        });

        toast.success("Account created! You can login now!");
        } catch (error) {
        console.log(error);
        toast.error(error.message);
        } finally {
        setLoading(false);
        }
    };
    return (
        <div className="h-screen w-full flex bg-[#04001E] justify-center items-center flex-col gap-6">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center text-white relative bottom-10">Create an Account</h1>
        <div className='grid grid-cols gap-4 w-max'>
                <div className="py-10 sm:px-10 flex flex-col justify-center items-center border border-gray-400 rounded-lg bg-gray-600">
                    <img className="h-16 w-max mb-12 rounded-full" src="src\assets\ifi-1.png" />
                    <form className="flex flex-col gap-4 sm:w-64" onSubmit={handleRegister}>
                    <label
                        className="flex items-center gap-4 text-white underline cursor-pointer"
                        htmlFor="file"
                    >
                    <img
                    className="h-12 w-12 rounded-full"
                    src={
                        avatar.url || "List Icons/user-image-with-black-background.png"
                        }
                    />
                    Upload an image
                    </label>
                    <input
                        type="file"
                        id="file"
                        className="hidden"
                        onChange={handleAvatar}
                    />
                    <input
                        className="bg-[#20232e] text-sm outline-none placeholder-gray-400 transition-all ease-in h-10 w-full px-2 rounded-md"
                        type="text"
                        placeholder="Username"
                        name="username"
                    />
                    <input
                        className="bg-[#20232e] text-sm outline-none placeholder-gray-400 transition-all ease-in h-10 w-full px-2 rounded-md"
                        type="email"
                        placeholder="Email"
                        name="email"
                    />
                    <input
                        className="bg-[#20232e] text-sm outline-none placeholder-gary-400 transition-all ease-in h-10 w-full px-2 rounded-md"
                        type="password"
                        placeholder="Password"
                        name="password"
                    />
                    <button
                        disabled={loading}
                        className="bg-[#0d0f18] text-sm text-white font-semibold py-2 px-4 mt-2 rounded-md hover:opacity-90 transition-all ease-in disabled:cursor-wait disabled:opacity-80"
                    >
                        {loading ? "Loading" : "Sign Up"}
                    </button>
                    </form>
                </div>
            <div className="text-white border border-gray-400 bg-gray-600 rounded-lg px-12 py-6 flex text-sm gap-2 justify-center">
                <h1>Have an account?</h1>
                <button className='font-semibold underline'><Link to="/login">LogIn</Link></button>
            </div>
        </div>
        </div> 
    )
}

export default Signup
