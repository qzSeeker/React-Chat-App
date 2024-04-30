import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../lib/firebase";
import { db } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import upload from "../../lib/upload";

const Login = () => {
    const [avatar, setAvatar] = useState({
        file: null,
        url: "",
    });

    const [loading, setLoading] = useState(false);

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

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        const { email, password } = Object.fromEntries(formData);

        try {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Logged In!");
        } catch (error) {
        console.log(error);
        toast.error(error.message);
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="h-full w-full flex justify-around items-center">
        {/* login */}
        <div className="w-80">
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <h1 className="text-2xl">Welcome back - Buddy!</h1>
            <input
                className="bg-white/15 outline-none hover:border border-white/10 transition-all ease-in h-10 w-full px-2 rounded-xl"
                type="email"
                placeholder="Email"
                name="email"
            />
            <input
                className="bg-white/15 outline-none hover:border border-white/10 transition-all ease-in h-10 w-full px-2 rounded-xl"
                type="password"
                placeholder="Password"
                name="password"
            />
            <button
                disabled={loading}
                className="bg-blue-500 py-2 px-4 rounded-xl hover:opacity-80 transition-all ease-in disabled:cursor-wait disabled:opacity-80"
            >
                {loading ? "Loading" : "Sign In"}
            </button>
            </form>
        </div>
        {/* seperator */}
        <div className="h-full w-1 bg-white/15"></div>
        {/* signin */}
        <div className="w-80">
            <form className="flex flex-col gap-4" onSubmit={handleRegister}>
            <h1 className="text-2xl">Create an Account</h1>
            <label
                className="flex items-center gap-4 underline cursor-pointer"
                htmlFor="file"
            >
                <img
                className="h-14 rounded-md w-14"
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
                className="bg-white/15 outline-none hover:border border-white/10 transition-all ease-in h-10 w-full px-2 rounded-xl"
                type="text"
                placeholder="Username"
                name="username"
            />
            <input
                className="bg-white/15 outline-none hover:border border-white/10 transition-all ease-in h-10 w-full px-2 rounded-xl"
                type="email"
                placeholder="Email"
                name="email"
            />
            <input
                className="bg-white/15 outline-none hover:border border-white/10 transition-all ease-in h-10 w-full px-2 rounded-xl"
                type="password"
                placeholder="Password"
                name="password"
            />
            <button
                disabled={loading}
                className="bg-blue-500 py-2 px-4 rounded-xl hover:opacity-80 transition-all ease-in disabled:cursor-wait disabled:opacity-80"
            >
                {loading ? "Loading" : "Sign Up"}
            </button>
            </form>
        </div>
        </div>
    );
};

export default Login;
