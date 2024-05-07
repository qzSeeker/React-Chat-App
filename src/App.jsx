import { useEffect, useState } from "react";
import "./App.css";
import Chat from "./Components/chat/Chat";
import Details from "./Components/details/Details";
import List from "./Components/list/List";
import Login from "./Components/login/Login";
import Notification from "./Components/notification/Notification";
import { auth } from "./lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import useUserStore from "./lib/userStore";
import { toast } from "react-toastify";
import useChatStore from "./lib/chatStore";


function App() {
  
  const {currentUser, isLoading, fetchUserInfo} = useUserStore();
  const { chatId } = useChatStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      try {
        fetchUserInfo(user?.uid);
      } catch (err){
        toast.error(err.message);
      }
    });
    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  console.log('CurrentUser: ' + currentUser);

  // if (isLoading) return <div className="h-[10vh] w-[24vw] bg-white/10 flex justify-center items-center text-xl m-auto rounded-xl"><h1>Loading...</h1></div>

  return (
    <>
    {/* It's my birthday */}
      <div className="h-full w-[85vw] flex py-10">
        {isLoading ? <div className="h-[10vh] w-[24vw] bg-white/10 flex justify-center items-center text-xl m-auto rounded-xl"><h1>Loading...</h1></div> : currentUser ? (
          <>
            <List />
            {chatId &&<Chat />}
            {chatId && <Details />}
          </>
        ) : (
          <Login />
        )}
        <Notification />
      </div>
    </>
  );
}

export default App;
