import { create } from "zustand";
import useUserStore from "./userStore";

const useChatStore = create((set) => ({
    chatId: null,
    user: null,
    isCurrentUserBlocked: false,
    isReceiverBlocked: false,
    changeChat: (chatId, user) => {
        const currentUser = useUserStore.getState().currentUser;

        if (user && currentUser) {
            const { id: currentUserId, blocked } = currentUser;
        // CHECK IF CURRENT USER IS BLOCKED
        if (blocked.includes(currentUserId)) {
            return set({
                chatId,
                user: null,
                isCurrentUserBlocked: true,
                isReceiverBlocked: false,
            });
        }

        // CHECK IF RECEIVER IS BLOCKED
        else if (blocked.includes(user.id)) {
            return set({
                chatId,
                user,
                isCurrentUserBlocked: false,
                isReceiverBlocked: true,
            });
        } else {
            return set({
                chatId,
                user,
                isCurrentUserBlocked: false,
                isReceiverBlocked: false,
            });
        }
        } else {
            throw new Error("User or current user data not loaded yet");
        }
    },
    changeBlock: () => {
        set((state) => ({
            ...state,
            isReceiverBlocked: !state.isReceiverBlocked,
        }));
    },
    
}));

export default useChatStore;
