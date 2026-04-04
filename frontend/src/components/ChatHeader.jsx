import { X, ArrowLeft } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = ({ onBack }) => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-5 border-b border-slate-800/80 bg-slate-900/40 backdrop-blur-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Back button for mobile */}
          {onBack && (
            <button
              onClick={onBack}
              className="md:hidden p-2 -ml-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          )}

          <div className="relative border-2 border-slate-800 rounded-full shadow-sm">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
              className="size-12 rounded-full object-cover"
            />
            {onlineUsers.includes(selectedUser._id) && (
              <span className="absolute bottom-0 right-0 size-3 bg-emerald-500 rounded-full ring-2 ring-slate-900" />
            )}
          </div>

          <div>
            <h3 className="font-bold text-slate-100 text-lg tracking-tight">{selectedUser.fullName}</h3>
            <p className="text-sm font-light text-slate-400">
              {onlineUsers.includes(selectedUser._id) ? <span className="text-emerald-400">Active Now</span> : "Offline"}
            </p>
          </div>
        </div>

        <button
          onClick={() => setSelectedUser(null)}
          className="p-2.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-xl transition-colors shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
