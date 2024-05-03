import { arrayUnion, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../../../lib/firebase";
import useUserStore from "../../../../lib/userStore";

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
        const chatRef = collection(db, "chats");
        const userChatsRef = collection(db, "chats");

        try {
            const newChatRef = doc(chatRef);

            await setDoc(newChatRef, {
                createdAt: serverTimestamp(),
                messages: [],
            });

            console.log(newChatRef.id);

            const currentUserDoc = await getDoc(doc(userChatsRef, currentUser.id));
            if (!currentUserDoc.exists) {
                await setDoc(doc(userChatsRef, currentUser.id), {chats: [] });
            }

            if (user) {
                const searchedUserDoc = await getDoc(doc(userChatsRef, user.id));
                if (!searchedUserDoc.exists) {
                    await setDoc(doc(userChatsRef, user.id), { chats: [] });
                }
            }
            await updateDoc(doc(userChatsRef, currentUser.id), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: "",
                    receiverId: user.id,
                    updatedAt: Date.now(),
                })
            });

            if (user) {
            await updateDoc(doc(userChatsRef, user.id), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: "",
                    receiverId: currentUser.id,
                    updatedAt: Date.now(),
                }),
            });
        }
            console.log("Chat created and user chats update successfully!");
        } catch (error) {
            console.log(error);
        };
    };

    return (
        <div className="absolute text-sm left-0 right-0 top-0 bottom-0 p-8 h-max w-max m-auto bg-black/60 z-20 rounded-xl flex flex-col gap-8">
            <form className="flex gap-3" onSubmit={handleSearch}>
                <input className="bg-white text-black rounded-xl px-2 py-3 outline-none" type="text" placeholder="Username" name="username" />
                <button className="bg-blue-500 rounded-xl px-2 hover:opacity-80">Search</button>
            </form>
            {user && (
                <div className={"flex items-center justify-between"}>
                    <div className="flex items-center gap-3">
                        <img className="h-10 w-10 rounded-full" src={user.avatar || "List Icons/user-image-with-black-background.png"} />
                        <h1>{user.username}</h1>
                    </div>
                <button onClick={handleAdd} className="bg-blue-500 rounded-xl px-2 py-2 hover:opacity-80">Add User</button>
            </div>
        )}
        </div>
    );
};

export default AddUser;
