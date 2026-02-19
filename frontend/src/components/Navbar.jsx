
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <Link to={authUser ? "/chat" : "/home"} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            <span className="text-lg font-bold text-white">Chatty</span>
          </Link>

          {authUser && (
            <div className="flex items-center gap-3">
              <Link to="/profile" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                <User className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-300 hidden sm:inline">Profile</span>
              </Link>
              <button 
                onClick={logout} 
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <LogOut className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-300 hidden sm:inline">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

