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
        <div className="h-screen w-full flex flex-col justify-center items-center">
        {/* login */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl text-center font-semibold relative bottom-10">Welcome back - buddy!!</h1>
        <div className="grid grid-cols gap-4 w-max ">
            <div className="py-10 sm:px-10 flex flex-col justify-center items-center border border-[#0440de] rounded-lg bg-[#0440de]/20">
                <form onSubmit={handleLogin} className="flex flex-col gap-4 sm:w-64">
                    <input
                    className="bg-[#04001e] outline-none text-sm transition-all ease-in h-10 w-full px-2 rounded-md"
                    type="email"
                    placeholder="Email"
                    name="email"
                    />
                    <input
                    className="bg-[#04001e] outline-none text-sm transition-all ease-in h-10 w-full px-2 rounded-md"
                    type="password"
                    placeholder="Password"
                    name="password"
                    />
                    <button
                    disabled={loading}
                    className="bg-[#04001e] hover:bg-[#04001e]/10 transition-all ease-in duration-150 border-2 border-[#0440de] text-white text-sm font-semibold py-2 px-4 mt-2 rounded-md disabled:cursor-wait disabled:opacity-80"
                    >
                    {loading ? "Loading" : "Log In"}
                    </button>
                </form>
            </div>
            <div className="border border-[#0440de] bg-[#0440de]/20 rounded-lg p-6 flex gap-2 text-sm justify-center">
                <h1>Don't have an account?</h1>
                <button className="font-semibold underline"><Link to="/signup">Sign up</Link></button>
                </div>
            </div>
        </div>
    );
};

export default Login;
