import { useEffect, useState } from "react";
import "./App.css";
import Chat from "./Components/chat/Chat";
import List from "./Components/list/List";
import Login from "./Components/login/Login";
import Notification from "./Components/notification/Notification";
import { auth } from "./lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import useUserStore from "./lib/userStore";
import { toast } from "react-toastify";
import useChatStore from "./lib/chatStore";
import {
  BrowserRouter,
  Navigate,
  Route,
  Router,
  Routes,
} from "react-router-dom";
import Signup from "./Components/login/Signup";
import Home from "./Components/Home/Home";
import MainLayout from "./Components/Layout/MainLayout";
import Details from "./Components/Details/Details";

function App() {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { chatId } = useChatStore();

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
        <h1 className="bg-black px-20 py-8 text-white text-xl rounded-xl">
          Loading...
        </h1>
      </div>
    );
  }
  return (
    <>
      {/* It's my birthday */}
      <BrowserRouter>
        <MainLayout>
          <Routes>
            {currentUser ? (
              <>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />}>
                  <Route path="list" element={<List />} />
                  <Route
                    path="/chat"
                    element={chatId ? <Chat /> : <Navigate to="/home" />}
                  />
                  <Route
                    path="/details"
                    element={chatId ? <Details /> : <Navigate to="/home" />}
                  />
                </Route>
              </>
            ) : (
              <>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Navigate to="/" />} />
              </>
            )}
          </Routes>
        </MainLayout>
        <Notification />
      </BrowserRouter>
    </>
  );
}

export default App;
