import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, User } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <Link to={authUser ? "/chat" : "/home"} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-indigo-400" />
            </div>
            <span className="text-xl font-bold text-slate-100 tracking-tight">Chatty</span>
          </Link>

          {authUser && (
            <div className="flex items-center gap-3">
              <Link to="/profile" className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-slate-800 border border-transparent hover:border-slate-700 transition-all text-slate-300 hover:text-white">
                <User className="w-5 h-5 text-indigo-400" />
                <span className="text-sm font-medium hidden sm:inline">Profile</span>
              </Link>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all text-slate-300 hover:text-red-400"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-sm font-medium hidden sm:inline">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
