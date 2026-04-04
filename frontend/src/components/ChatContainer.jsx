import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const ChatContainer = ({ onBack }) => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto bg-transparent">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-transparent">
      <ChatHeader onBack={onBack} />

      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-800">
        <AnimatePresence>
          {messages.map((message) => {
            const isSentByMe = message.senderId === authUser._id;
            return (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                layout
                key={message._id}
                className={`flex gap-3 w-full ${isSentByMe ? "justify-end" : "justify-start"}`}
                ref={messageEndRef}
              >
                {!isSentByMe && (
                  <div className="flex-shrink-0 mt-auto">
                    <img
                      src={selectedUser.profilePic || "/avatar.png"}
                      alt="profile pic"
                      className="size-10 rounded-full border border-slate-700 shadow-sm object-cover"
                    />
                  </div>
                )}

                <div className={`flex flex-col ${isSentByMe ? "items-end" : "items-start"}`}>
                  <div
                    className={`px-5 py-3 rounded-2xl max-w-sm sm:max-w-md shadow-sm ${isSentByMe
                        ? "bg-indigo-600 text-white rounded-br-none shadow-indigo-600/20"
                        : "bg-slate-800 border border-slate-700 text-slate-100 rounded-bl-none"
                      }`}
                  >
                    {message.image && (
                      <img
                        src={message.image}
                        alt="Attachment"
                        className="sm:max-w-[240px] rounded-xl mb-2 object-cover border border-white/10"
                      />
                    )}
                    {message.text && <p className="font-light leading-relaxed">{message.text}</p>}
                  </div>
                  <time className="text-[11px] font-medium text-slate-500 mt-1.5 px-1">
                    {formatMessageTime(message.createdAt)}
                  </time>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <MessageInput />
    </div>
  );
};
export default ChatContainer;
