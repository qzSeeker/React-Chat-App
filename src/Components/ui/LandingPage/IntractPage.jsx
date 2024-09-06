import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-scroll";

function Home() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
  });

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <div className="h-full w-full relative bg-[#04001E]">
      <svg
        className="absolute"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        xmlns:svgjs="http://svgjs.dev/svgjs"
        viewBox="0 0 800 450"
        opacity="0.25"
      >
        <defs>
          <filter
            id="bbblurry-filter"
            x="-100%"
            y="-100%"
            width="400%"
            height="400%"
            filterUnits="objectBoundingBox"
            primitiveUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur
              stdDeviation="102"
              x="0%"
              y="0%"
              width="100%"
              height="100%"
              in="SourceGraphic"
              edgeMode="none"
              result="blur"
            ></feGaussianBlur>
          </filter>
        </defs>
        <g filter="url(#bbblurry-filter)">
          <ellipse
            rx="277.5"
            ry="277.5"
            cx="386.75580122900124"
            cy="-30.318833573311338"
            fill="#0440de"
          ></ellipse>
        </g>
      </svg>
      {/* Header */}
      <div className="w-full flex justify-center fixed z-50 py-6 md:px-14 px-4">
        <div
          className={`${
            isScrolled ? "bg-[#04001e]/20  backdrop-blur-sm" : "bg-transparent"
          } relative border border-[#0440de] shadow-md rounded-full flex justify-between items-center w-full p-4`}
        >
          <div className="">
            <h1 className="font-extrabold md:text-3xl sm:text-2xl text-xl text-[#0440de]">
              chat<span className="text-white">if</span>i
            </h1>
          </div>
          <div className="flex items-center justify-center gap-4 w-full text-sm sm:text-md">
            <div className="cursor-pointer hover:text-[#0440de] transition-all ease-in duration-100">
              <Link
                to="hero"
                spy={true}
                smooth={true}
                offset={-150}
                duration={500}
              >
                Home
              </Link>
            </div>
            <div className="cursor-pointer hover:text-[#0440de] transition-all ease-in duration-100">
              <Link
                to="interface"
                spy={true}
                smooth={true}
                offset={-130}
                duration={500}
              >
                Interface
              </Link>
            </div>
            <div className="cursor-pointer hover:text-[#0440de] transition-all ease-in duration-100">
              <Link
                to="howTo"
                spy={true}
                smooth={true}
                offset={-80}
                duration={500}
              >
                How To
              </Link>
            </div>
          </div>

          <div className="md:flex items-center gap-5 relative hidden">
            <button
              onClick={handleSignup}
              className="px-8 py-2 rounded-full relative bg-[#0440de] border border-[#0440de] hover:bg-[#0442decb] text-white text-sm transition-all ease-in duration-150"
            >
              <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl  bg-gradient-to-r from-transparent via-white to-transparent" />
              <span className="relative z-20">SignUp</span>
            </button>
            <button
              onClick={handleLogin}
              className="px-8 py-2 rounded-full relative bg-[#04001E] hover:bg-[#0440de] border border-[#0440de] text-white text-sm transition-all ease-in duration-150"
            >
              <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl  bg-gradient-to-r from-transparent via-white to-transparent" />
              <span className="relative z-20">LogIn</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div
        className="w-full h-[70dvh] flex justify-center items-center mt-36 px-10 md:p-0 z-20"
        id="hero"
      >
        <div className="flex flex-col items-center">
          <div className="sm:text-center">
            <h1 className="lg:text-6xl md:text-5xl text-4xl font-bold text-[#c9caff]">
              Connect Your Friends Instantly with Chat.if.i
            </h1>
            <p className=" md:text-2xl text-lg font-sans text-[#c9caff] mt-6">
              Helps to building your connection with your friends easily through
              chatifi
            </p>
            <p className="md:text-2xl text-lg font-sans text-[#c9caff]">
              Real-time chat made simple and secure.
            </p>
          </div>
          <div className="flex gap-4 mt-10">
            <button
              onClick={handleSignup}
              className="px-8 py-2 rounded-full relative bg-[#0440de] border border-[#0440de] hover:bg-[#0442decb] text-white text-sm transition-all ease-in duration-150"
            >
              <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl  bg-gradient-to-r from-transparent via-white to-transparent" />
              <span className="relative z-20">SignUp</span>
            </button>
            <button
              onClick={handleLogin}
              className="px-8 py-2 rounded-full relative bg-transparent hover:bg-[#0440de] border border-[#0440de] text-white text-sm transition-all ease-in duration-150"
            >
              <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl  bg-gradient-to-r from-transparent via-white to-transparent" />
              <span className="relative z-20">LogIn</span>
            </button>
          </div>
        </div>
      </div>

      <div
        className="w-full h-full relative sm:px-24 px-8 flex items-center justify-center mt-20"
        id="interface"
      >
        <div className="absolute inset-0 h-full bg-[#0440de] transform scale-[0.65] rounded-full blur-3xl" />
        <div className="z-10 rounded-2xl">
          <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl  bg-gradient-to-r from-transparent via-[#fff] to-transparent" />
          <img
            className="h-full hidden md:flex rounded-2xl border border-[#0440de]"
            src="App-Screenshots/Screenshot 2024-08-14 143246.png"
          ></img>
          <img
            className="h-full flex md:hidden z-10 rounded-2xl border border-[#0440de]"
            src="App-Screenshots/Screenshot 2024-08-14 143327.png"
          ></img>
          <div className="absolute inset-x-0 h-px w-1/2 mx-auto -bottom-px shadow-2xl  bg-gradient-to-r from-transparent via-[#fff] to-transparent" />
        </div>
      </div>

      
      <div className="flex justify-center h-max mt-20 items-center gap-5 relative w-full">
            <button
              onClick={handleSignup}
              className="px-8 py-2 rounded-full relative bg-[#0440de] border border-[#0440de] hover:bg-[#0442decb] text-white text-sm transition-all ease-in duration-150"
            >
              <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl  bg-gradient-to-r from-transparent via-white to-transparent" />
              <span className="relative z-20">SignUp</span>
            </button>
            <button
              onClick={handleLogin}
              className="px-8 py-2 rounded-full relative bg-[#04001E] hover:bg-[#0440de] border border-[#0440de] text-white text-sm transition-all ease-in duration-150"
            >
              <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl  bg-gradient-to-r from-transparent via-white to-transparent" />
              <span className="relative z-20">LogIn</span>
            </button>
          </div>

      {/* key Features Section */}
      <div
        className="w-full h-full mt-36 flex justify-center items-center relative md:px-28 px-8"
        id="howTo"
      >
        
        <div className="absolute inset-0 h-full bg-[#0440de] transform scale-[0.65] md:scale-[0.60] lg:scale-[0.65] rounded-full blur-3xl" />
        <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-8 bg-[#04001e] p-8 border border-[#0440de] rounded-2xl z-10">
          <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl  bg-gradient-to-r from-transparent via-[#fff] to-transparent" />
          <div className="flex flex-col gap-6">
            <h1 className="md:text-4xl text-3xl font-semibold">
              Why Choose Chat.if.i?
            </h1>
            <ul className="text-sm md:text-lg grid grid-cols gap-4">
              <li className="">
                Real-time messaging
              </li>
              <li className="">
                End-to-end encription
              </li>
              <li className="">
                Multi-platform support
              </li>
              <li className="">
                Because I made this!
              </li>
              <li className="">
                And you'll like it for sure
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-6">
            <h1 className="md:text-4xl text-3xl font-semibold">
              Get Started in 3 Easy Steps
            </h1>
            <ul className="text-sm md:text-lg grid grid-cols gap-4">
              <li className="">
                Sign up for an account
              </li>
              <li className="">
                Add friends or join chat rooms
              </li>
              <li className="">
                Start chatting instantly
              </li>
            </ul>
          </div>
          <div className="absolute inset-x-0 h-px w-1/2 mx-auto -bottom-px shadow-2xl  bg-gradient-to-r from-transparent via-[#fff] to-transparent" />
      </div>
      </div>

      {/* Footer */}
      <div className="w-full h-max flex flex-col gap-10 items-center justify-evenly text-[#fff] mb-12 mt-36">
        <div className="md:flex grid grid-cols-1 gap-2">
          <h1 className="sm:text-sm text-xs">Designed & Developed with ❤️ by @qzseeker</h1>
        </div>
      </div>
    </div>
  );
}

export default Home;
