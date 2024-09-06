import { IconArrowNarrowLeft } from "@tabler/icons-react";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

function Layout() {
    const navigate = useNavigate();

    const backToHome = () => {
        navigate("/");
    };
    return (
    <div className="bg-[#04001E] h-screen w-full">
        <div className="absolute top-0 flex items-center justify-center p-3 gap-2 w-full bg-[#0440de]/20 backdrop-blur-sm border-b border-[#0440de]">
            <IconArrowNarrowLeft className="cursor-pointer" />
            <h1 onClick={backToHome} className="underline cursor-pointer">
            Back to Home Page
            </h1>
        </div>
        <Outlet />

        {/* Footer */}
        <div className="relative bottom-12 flex justify-center">
            <h1 className="sm:text-sm text-xs">
            Designed & Developed with ❤️ by @qzseeker
            </h1>
        </div>
    </div>
    );
}

export default Layout;
