import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function Home() {
    return (
            <>
                <div className="h-screen flex justify-between items-center p-4 absolute right-0 left-0 bottom-0 m-4 bg-[#121212] rounded-xl">
                    <div className='flex'>
                    </div>
                    <Link to="/">
                        <img className="h-6 cursor-pointer" src="Home-Icons/home.png" />
                    </Link>
                    <Link to="/list">
                        <img
                        className="h-6 cursor-pointer"
                        src="/Home-Icons/search-interface-symbol.png"
                        />
                    </Link>
                    <Link to="/chat">
                        <img className="h-6 cursor-pointer" src="Home-Icons/chat.png" />
                    </Link>
                    <Link to="/details">
                        <img className="h-6 cursor-pointer" src="Home-Icons/user.png" />
                    </Link>
                </div>
            </>
    )
}

export default Home
