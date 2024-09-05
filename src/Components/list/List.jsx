import React from "react";
import ChatList from "./chatlist/ChatList";
import { motion } from "framer-motion";

const List = ({ users }) => {
    return (
        users && (
        <motion.div
            className="h-screen min-h-[20rem] w-max bg-[#11131f] md:flex flex-col justify-between border-r absolute md:left-24 border-gray-500 z-30"
            initial={{ x: "-30%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 0.3 }}
        >
            <ChatList />
        </motion.div>
        )
    );
};

export default List;
