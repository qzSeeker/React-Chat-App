import { useEffect, useState } from "react";
import "./App.css";
import List from "./Components/list/List";
import Notification from "./Components/SignUpPage/notification/Notification";
import { onAuthStateChanged } from "firebase/auth";
import useUserStore from "./lib/userStore";
import { toast } from "react-toastify";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./Components/SignUpPage/login/Login";
import Signup from "./Components/SignUpPage/login/Signup";
import { auth } from "./lib/firebase";
import Layout from "./Components/SignUpPage/login/Layout";
import useChatStore from "./lib/chatStore";
import Chat from "./Components/chat/Chat";
import Details from "./Components/Details/Details.jsx";
import SideBar from "./Components/ui/SideBar";
import IntractPage from "./Components/ui/LandingPage/IntractPage";

function App() {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { chatId } = useChatStore();
  const [details, setDetails] = useState(false);
  const [users, setUsers] = useState(false);

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
      <div className="flex justify-center items-center h-screen w-full">
        <h1 className="bg-white/15 backdrop-blur-sm border px-20 py-8 text-xl rounded-xl">
          Loading...
        </h1>
      </div>
    );
  }

  const handleDetails = () => {
    setDetails((prevDetails) => !prevDetails);
  };

  const handleUsers = () => {
    setUsers((prevUsers) => !prevUsers);
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<IntractPage />} />
            <Route path="/" element={<Layout />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          </Route>
          <Route
            path="/app"
            element={
              currentUser ? (
                <div className="main-app-content">
                  <SideBar handleUsers={handleUsers}/>
                  <List users={users} />
                  {chatId && <Chat handleDetails={handleDetails} details={details} />}
                  {chatId && <Details handleDetails={handleDetails} details={details} />}
                </div>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Notification />
      </div>
    </BrowserRouter>
  );
}
export default App;
