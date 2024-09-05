import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../lib/firebase";
import { IconArrowBack, IconArrowNarrowLeft } from "@tabler/icons-react";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        const { email, password } = Object.fromEntries(formData);

        try {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Logged In!");
        navigate('/app');
        } catch (error) {
        console.log(error);
        toast.error(error.message);
        } finally {
        setLoading(false);
        }
    };

    const backToHome = () => {
        navigate('/');
    }

    return (
        <div className="h-screen w-full bg-[#04001E] flex flex-col justify-center items-center gap-6">
        {/* login */}
        <div className="absolute top-0 flex items-center justify-center p-3 gap-2 w-full bg-[#0440de] border-b border-white">
            <IconArrowNarrowLeft className="cursor-pointer" /><h1 onClick={backToHome} className="underline cursor-pointer">Back to Home Page</h1>
        </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl text-center font-semibold relative bottom-10">Welcome back - buddy!!</h1>
        <div className="grid grid-cols gap-4 w-max ">
            <div className="py-10 sm:px-10 flex flex-col justify-center items-center border border-gray-400 rounded-lg bg-gray-600">
                <img className="h-16 rounded-full mb-12" src="src\assets\ifi-1.png" />
                <form onSubmit={handleLogin} className="flex flex-col gap-4 sm:w-64">
                    <input
                    className="bg-[#20232e] outline-none placeholder-gray-400 text-sm transition-all ease-in h-10 w-full px-2 rounded-md"
                    type="email"
                    placeholder="Email"
                    name="email"
                    />
                    <input
                    className="bg-[#20232e] outline-none placeholder-gray-400 text-sm transition-all ease-in h-10 w-full px-2 rounded-md"
                    type="password"
                    placeholder="Password"
                    name="password"
                    />
                    <button
                    disabled={loading}
                    className="bg-[#0d0f18] text-white text-sm font-semibold py-2 px-4 mt-2 rounded-md disabled:cursor-wait disabled:opacity-80"
                    >
                    {loading ? "Loading" : "Log In"}
                    </button>
                </form>
            </div>
            <div className="border border-gray-400 bg-gray-600 rounded-lg p-6 flex gap-2 text-sm justify-center">
                <h1>Don't have an account?</h1>
                <button className="font-semibold underline"><Link to="/signup">Sign up</Link></button>
                </div>
            </div>
        </div>
    );
};

export default Login;
