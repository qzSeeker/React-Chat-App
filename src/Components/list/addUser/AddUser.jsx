import { arrayUnion, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../../lib/firebase";
import useUserStore from "../../../lib/userStore";

const AddUser = () => {
    const [user, setUser] = useState(null);
    const { currentUser } = useUserStore();

    const handleSearch = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get("username");

        try {
            const userRef = collection(db, "users");
            const q = query(userRef, where("username", "==", username));

            const querySnapShot = await getDocs(q);

            if (!querySnapShot.empty) {
                setUser(querySnapShot.docs[0].data());
            } else {
                console.log("User not found!")
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleAdd = async () => {
        if (!user) {
            console.log("No user selected to add to chat.");
            return;
        }

        const chatRef = collection(db, "chats");
        const userChatsRef = collection(db, "userchats");

        try {
            const newChatRef = doc(chatRef);

            console.log("New chat reference ID:", newChatRef.id);

            await setDoc(newChatRef, {
                createdAt: serverTimestamp(),
                messages: [],
            });

            console.log("New chat created with ID:", newChatRef.id);

            const currentUserChatsDoc = await getDoc(doc(userChatsRef, currentUser.id));
            if (!currentUserChatsDoc.exists) {
                await setDoc(doc(userChatsRef, currentUser.id), {chats: [] });
            }

            console.log("Updating current user's chats...");
            await updateDoc(doc(userChatsRef, currentUser.id), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: "",
                    receiverId: user.id,
                    updatedAt: Date.now(),
                })
            });

            console.log("Current user's chats updates successfully.");

            console.log("Updating selected user's chats...");
            await updateDoc(doc(userChatsRef, user.id), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: "",
                    receiverId: currentUser.id,
                    updatedAt: Date.now(),
                }),
            });

            console.log("Selected user's chats updated successfully.");
            console.log("Chat created and user chats update successfully!");
        } catch (error) {
            console.log("Error adding user to chat:", error);
        };
    };

    return (
        <div className="absolute text-sm left-0 right-0 top-0 bottom-0 p-8 h-max w-max m-auto shadow-md shadow-[#0d0f18] bg-[#20232e] border border-gray-500 z-20 rounded-xl flex flex-col gap-8">
            <form className="flex gap-3" onSubmit={handleSearch}>
                <input className="bg-transparent border border-gray-500 backdrop-blur-sm text-white rounded-lg px-2 py-3 outline-none placeholder-white placeholder-opacity-80" type="text" placeholder="Username" name="username" />
                <button className="bg-[#0d0f18] rounded-md p-3 hover:opacity-80">Search</button>
            </form>
            {user && (
                <div className={"flex items-center justify-between bg-[#0d0f18] p-2 rounded-lg border border-gray-500"}>
                    <div className="flex items-center gap-3">
                        <img className="h-10 w-10 rounded-full border border-gray-500" src={user.avatar || "List Icons/user-image-with-black-background.png"} />
                        <h1>{user.username}</h1>
                    </div>
                <button onClick={handleAdd} className="bg-[#20232e] rounded-md p-2 hover:opacity-80 transition-all ease-in duration-150">Add User</button>
            </div>
        )}
        </div>
    );
};

export default AddUser;
