import React from "react";
import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <div className="">
        <div className="text-white text-xs md:text-sm absolute bottom-20 left-0 right-0 text-center">
            <h1>Chattify © 2024 - Developed by Arpit</h1>
        </div>
        <Outlet />
        </div>
    );
}

export default Layout;
