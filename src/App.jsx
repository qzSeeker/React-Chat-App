import { useEffect, useState } from "react";
import "./App.css";
import Notification from "./Components/SignUpPage/notification/Notification";
import { onAuthStateChanged } from "firebase/auth";
import useUserStore from "./lib/userStore";
import { toast } from "react-toastify";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./Components/SignUpPage/login/Login";
import Signup from "./Components/SignUpPage/login/Signup";
import { auth } from "./lib/firebase";
import Layout from "./Components/SignUpPage/login/Layout";
import useChatStore from "./lib/chatStore";
import Chat from "./Components/chat/Chat";
import List from "./Components/list/List";
import Details from "./Components/Details/Details";


function App() {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { chatId } = useChatStore();
  const [details, setDetails] = useState(false);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      try {
        fetchUserInfo(user?.uid);
      } catch (err) {
        toast.error(err.message);
      }
    });
    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <h1 className="bg-white/10 backdrop-blur-sm border px-20 py-8 text-white text-xl rounded-xl">
          Loading...
        </h1>
      </div>
    );
  }

    const handleDetails = () => {
        setDetails(prevDetails => !prevDetails);
    };

  return (
    <>
      {/* It's my birthday */}
      <div className="h-full w-[95vw] flex py-10">
          {currentUser ? (
              <>
                <List />
                {chatId && <Chat handleDetails={handleDetails} />}
                {chatId && <Details details={details} />}
                <div className="text-white flex flex-col gap-4 text place-self-center fixed right-0 left-0 ml-40">
                  <p className="text-6xl font-semibold">Welcome to <span>Chat-Lee</span></p>
                  <p className="text-3xl font-semibold">Here you can add your friends and chat with them!</p>
                </div>
              </>
            ) : (
              <>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/login" element={<Navigate to="/" />} />
                </Routes>
                  <Layout />
                  </BrowserRouter>
              <Notification />
              </>
            )}
            </div>
    </>
  );
}

export default App;
