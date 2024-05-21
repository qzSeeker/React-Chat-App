import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { auth } from "../../../lib/firebase";

const Login = () => {
    const [loading, setLoading] = useState(false);

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
        <div className="h-full w-full flex justify-center items-center flex-col gap-6">
        {/* login */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl text-center text-white font-semibold relative bottom-10">Welcome back - buddy!!</h1>
        <div className="grid grid-cols gap-4 w-max">
            <div className="py-10 bg-white/15 sm:px-10 flex flex-col justify-center items-center border-2 rounded-md">
                <img className="h-16 w-max mb-12" src="src\assets\App-Logo.png" />
                <form onSubmit={handleLogin} className="flex flex-col gap-4 sm:w-64">
                    <input
                    className="bg-black/10 outline-none hover:border text-white border-black/25 transition-all ease-in h-10 w-full px-2 rounded-md"
                    type="email"
                    placeholder="Email"
                    name="email"
                    />
                    <input
                    className="bg-black/10 text-black outline-none hover:border border-black/25 transition-all ease-in h-10 w-full px-2 rounded-md"
                    type="password"
                    placeholder="Password"
                    name="password"
                    />
                    <button
                    disabled={loading}
                    className="bg-black text-white font-semibold py-2 px-4 mt-2 rounded-md hover:opacity-80 transition-all ease-in disabled:cursor-wait disabled:opacity-80"
                    >
                    {loading ? "Loading" : "Log In"}
                    </button>
                </form>
            </div>
            <div className="text-white border-2 bg-white/15 backdrop-blur-sm rounded-md p-6 flex gap-2 text-sm justify-center">
                <h1>Don't have an account?</h1>
                <button className="text-black font-semibold underline"><Link to="/signup">Sign up</Link></button>
            </div>
        </div>
        </div>
    );
};

export default Login;
