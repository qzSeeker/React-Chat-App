import React from "react";
import { useNavigate } from "react-router-dom";

function IntractPage() {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <div className="h-full w-full relative bg-[#04001E]">
      <svg className="absolute" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" viewBox="0 0 800 450" opacity="0.25"><defs><filter id="bbblurry-filter" x="-100%" y="-100%" width="400%" height="400%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
      <feGaussianBlur stdDeviation="102" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" edgeMode="none" result="blur"></feGaussianBlur></filter></defs><g filter="url(#bbblurry-filter)"><ellipse rx="277.5" ry="277.5" cx="386.75580122900124" cy="-30.318833573311338" fill="#0440de"></ellipse></g></svg>
      {/* Header */}
      <div className="sm:flex grid grid:cols-2 items-center justify-center gap-4 h-max w-full md:justify-evenly md:items-center py-4 relative">
        <div className="font-extrabold text-3xl text-[#0440de]">
          chat<span className="text-white">if</span>i
        </div>

        <div className="bg-[#04001E] relative border border-[#0440de] shadow-md rounded-full gap-6 h-max w-max px-16 py-3 flex justify-center items-center">
            <div className="cursor-pointer hover:text-[#0440de] transition-all ease-in duration-100">Home</div>
            <div className="cursor-pointer hover:text-[#0440de] transition-all ease-in duration-100">How to</div>
            <div className="cursor-pointer hover:text-[#0440de] transition-all ease-in duration-100">Blog</div>
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

      {/* Hero Section */}
      <div className="w-full h-[70dvh] flex justify-center items-center px-10 md:p-0 z-20">
        <div className="flex flex-col items-center">
          <div className="sm:text-center">
            <h1 className="lg:text-6xl md:text-5xl text-4xl font-bold text-[#fff]">
              Connect Your Friends Instantly with Chat.if.i
            </h1>
            <p className="mt-4 md:text-2xl text-xl font-sans text-[#b3c7fa]">
              Helps to building your connection with your friends easily through
              chatifi
            </p>
            <p className="md:text-2xl text-xl font-sans text-[#b3c7fa]">
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

      <div className="w-full h-full relative sm:px-28 px-12 mb-36 flex items-center justify-center">
      <div className="absolute inset-0 h-full bg-[#0440de] transform scale-[0.65] rounded-full blur-3xl" />
        <div className="z-10 rounded-2xl">
          <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl  bg-gradient-to-r from-transparent via-[#fff] to-transparent" />
          <img className="h-full hidden md:flex rounded-2xl border border-[#0440de]" src="App-Screenshots/Screenshot 2024-08-14 143246.png"></img>
          <img className="h-full flex md:hidden z-10 rounded-2xl border border-[#0440de]" src="App-Screenshots/Screenshot 2024-08-14 143327.png"></img>
          <div className="absolute inset-x-0 h-px w-1/2 mx-auto -bottom-px shadow-2xl  bg-gradient-to-r from-transparent via-[#fff] to-transparent" />
        </div>
      </div>

      {/* key Features Section */}
      <div className="w-full h-full mt-16 mb-20 flex justify-center items-center gap-10 relative px-12">
      <div className="absolute inset-0 h-full bg-[#0440de] transform scale-[0.65] md:scale-[0.60] lg:scale-[0.65] rounded-full blur-3xl" />
      <div className="w-max h-max grid grid-cols-1 lg:grid-cols-2 gap-6 bg-[#04001e] p-6 border border-[#0440de] rounded-2xl z-10">
        <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl  bg-gradient-to-r from-transparent via-[#fff] to-transparent" />
          <div className="z-10 md:w-[30rem] p-8 flex flex-col gap-6 rounded-xl border border-[#0440de]">
            <h1 className="md:text-5xl text-3xl font-semibold">Why Choose Chat.if.i?</h1>
            <ul className="text-sm grid grid-cols gap-4">
              <li className="bg-[#0440de] h-max w-max px-2 py-1 rounded-xl drop-shadow-xl border-b">Real-time messaging</li>
              <li className="bg-[#0440de] h-max w-max px-2 py-1 rounded-xl drop-shadow-xl border-b">End-to-end encription</li>
              <li className="bg-[#0440de] h-max w-max px-2 py-1 rounded-xl drop-shadow-xl border-b">Multi-platform support</li>
              <li className="bg-[#0440de] h-max w-max px-2 py-1 rounded-xl drop-shadow-xl border-b">Because I made this!</li>
              <li className="bg-[#0440de] h-max w-max px-2 py-1 rounded-xl drop-shadow-xl border-b">And you'll like it for sure</li>
            </ul>
          </div>
          <div className=" z-10 md:w-[30rem] p-8 flex flex-col gap-6 rounded-xl border border-[#0440de]">
            <h1 className="md:text-5xl text-3xl font-semibold">Get Started in 3 Easy Steps</h1>
            <ul className="text-sm grid grid-cols gap-4">
              <li className="bg-[#0440de] h-max w-max px-2 py-1 rounded-xl drop-shadow-xl border-b">Sign up for an account</li>
              <li className="bg-[#0440de] h-max w-max px-2 py-1 rounded-xl drop-shadow-xl border-b">Add friends or join chat rooms</li>
              <li className="bg-[#0440de] h-max w-max px-2 py-1 rounded-xl drop-shadow-xl border-b">Start chatting instantly</li>
            </ul>
          </div>
        <div className="absolute inset-x-0 h-px w-1/2 mx-auto -bottom-px shadow-2xl  bg-gradient-to-r from-transparent via-[#fff] to-transparent" />
      </div>
      </div>

      {/* How It Works Section */}

      {/* Testimonials or User Rewiews */}
      {/* <div className="h-max py-20 w-full flex flex-col items-center gap-8 bg-[#09122b]">
        <h1 className="text-5xl">What are Users Say</h1>
        <div>
          <h1 className="text-xl">Ka Babaseer Bana Diye Ho Bey!</h1>
        </div>
      </div> */}

      {/* Call-to-action Section */}
      {/* <div className="h-max w-full flex flex-col items-center justify-center gap-8">
        <div className="flex flex-col gap-4 items-center">
          <h1 className="text-5xl font-semibold">Ready to Start Chatting</h1>
          <p className="text-xl">
            Join tens of users already connecting on Chat.if.i
          </p>
        </div>
        <div className="flex gap-5">
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
      </div> */}

      {/* Footer */}
      <div className="w-full h-max flex flex-col gap-10 items-center justify-evenly text-[#fff] mb-12 mt-36">
        {/* <div className="md:flex grid grid-cols-3 items-start text-sm">
          <p className="cursor-pointer">Privacy Policy</p>
          <p className="cursor-pointer">Terms of Service</p>
          <p className="cursor-pointer">Contact</p>
        </div> */}
        <div className="md:flex grid grid-cols-1 gap-2">
          <h1 className="sm:text-sm text-xs">Copyright @ All Right Reserved 2024.</h1>
          <h1 className="sm:text-sm text-xs">Designed & Developed by @qzseeker</h1>
        </div>
      </div>
    </div>
  );
}

export default IntractPage;
