import { MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

const NoChatSelected = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-transparent">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="text-center space-y-6"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-24 h-24 rounded-[2rem] bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-6 shadow-inner"
        >
          <MessageSquare className="w-12 h-12 text-indigo-400" />
        </motion.div>
        <h2 className="text-3xl font-extrabold text-slate-100 tracking-tight">Welcome to Chatty!</h2>
        <p className="text-slate-400 max-w-sm font-light leading-relaxed">
          Select a conversation from the sidebar to jump right into the action.
        </p>
      </motion.div>
    </div>
  );
};

export default NoChatSelected;
