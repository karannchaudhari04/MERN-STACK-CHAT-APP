import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCheck } from "lucide-react";

// Helper function to format the WhatsApp style inline date
const formatDateBadge = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Unknown Date";

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  } else if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  } else {
    return date.toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  }
};

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
      <div className="flex-1 flex flex-col overflow-auto bg-slate-900 border-l border-slate-800">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 relative border-l border-slate-800/80">

      <ChatHeader onBack={onBack} />

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-3 scrollbar-thin scrollbar-thumb-slate-800 relative z-10 w-full overflow-x-hidden">
        <AnimatePresence>
          {messages.map((message, index) => {
            const isSentByMe = message.senderId === authUser._id;

            // Calculate if we need a new date separator badge
            const currentMessageDate = new Date(message.createdAt).toDateString();
            const previousMessageDate = index > 0 ? new Date(messages[index - 1].createdAt).toDateString() : null;
            const showDateBadge = currentMessageDate !== previousMessageDate;

            return (
              <div key={message._id} className="flex flex-col w-full min-w-0">
                {showDateBadge && (
                  <div className="flex justify-center w-full my-4">
                    <div className="bg-slate-800/80 backdrop-blur-md rounded-lg px-4 py-1.5 text-[11px] font-medium text-slate-300 shadow-md shadow-black/20 uppercase tracking-widest z-10 mx-auto">
                      {formatDateBadge(message.createdAt)}
                    </div>
                  </div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  layout
                  className={`flex w-full min-w-0 mb-1 ${isSentByMe ? "justify-end" : "justify-start"}`}
                  ref={index === messages.length - 1 ? messageEndRef : null}
                >
                  <div
                    className={`relative px-3 pt-2 pb-1.5 max-w-[85%] sm:max-w-md xl:max-w-xl shadow-sm min-w-[120px] ${isSentByMe
                        ? "bg-indigo-600 text-white rounded-lg rounded-tr-none shadow-indigo-600/20"
                        : "bg-slate-800 border border-slate-700/50 text-slate-100 rounded-lg rounded-tl-none"
                      }`}
                  >
                    {/* Image Attachment (if exists) */}
                    {message.image && (
                      <img
                        src={message.image}
                        alt="Attachment"
                        className="sm:max-w-[280px] rounded-md mb-1.5 object-cover"
                      />
                    )}

                    {/* Message Text and Timestamp clustering like WhatsApp */}
                    <div className="flex items-end flex-wrap gap-2 min-w-0">
                      {message.text && (
                        <span className="font-light leading-relaxed whitespace-pre-wrap flex-1 mr-6 text-[15px] break-words">
                          {message.text}
                        </span>
                      )}

                      {/* Time & Delivery ticks anchored bottom right */}
                      <div className={`flex items-center gap-1 shrink-0 ml-auto mt-auto mb-[-2px] ${isSentByMe ? "text-indigo-200" : "text-slate-400"}`}>
                        <span className="text-[10px] uppercase font-medium tracking-wide whitespace-nowrap">
                          {formatMessageTime(message.createdAt)}
                        </span>
                        {isSentByMe && (
                          <CheckCheck className="w-3.5 h-3.5 text-blue-400 opacity-90" />
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </AnimatePresence>
      </div>

      <MessageInput />
    </div>
  );
};
export default ChatContainer;
