import { IconArrowNarrowLeft } from "@tabler/icons-react";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

function Layout() {
    const navigate = useNavigate();

    const backToHome = () => {
        navigate('/');
    }
    return (
        <div className="">
            <div className="absolute top-0 flex items-center justify-center p-3 gap-2 w-full bg-[#0440de] border-b border-white">
            <IconArrowNarrowLeft className="cursor-pointer" /><h1 onClick={backToHome} className="underline cursor-pointer">Back to Home Page</h1>
        </div>
            <Outlet />
        </div>
    );
}

export default Layout;
