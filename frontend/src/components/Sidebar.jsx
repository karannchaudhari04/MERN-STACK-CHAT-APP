import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { authUser, onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-full lg:w-96 flex flex-col bg-transparent">
      {/* Header */}
      <div className="border-b border-slate-800/80 p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-slate-100 tracking-wide">Contacts</h2>
          <label className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer hover:text-slate-300 transition-colors">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm checkbox-primary rounded bg-slate-900 border-slate-700"
            />
            Online Only
          </label>
        </div>
      </div>

      {/* User List */}
      <div className="overflow-y-auto flex-1 py-3 px-3 space-y-1 scrollbar-thin scrollbar-thumb-slate-800">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full p-4 flex items-center gap-4 rounded-2xl transition-all duration-200 border border-transparent ${selectedUser?._id === user._id
                ? "bg-slate-800/80 border-slate-700 shadow-md"
                : "hover:bg-slate-800/40 hover:border-slate-700/50"
              }`}
          >
            <div className="relative">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="size-12 object-cover rounded-full border-2 border-slate-800 shadow-sm"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3.5 bg-emerald-500 rounded-full ring-2 ring-slate-900" />
              )}
            </div>
            <div className="text-left min-w-0">
              <div className="font-semibold text-slate-100 truncate">{user.fullName}</div>
              <div className="text-sm font-light text-slate-400 mt-0.5">
                {onlineUsers.includes(user._id) ? <span className="text-emerald-400">Online</span> : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-slate-500 py-10 font-light">No users found based on filters.</div>
        )}
      </div>

      {/* Footer - User Profile */}
      <Footer />
    </aside>
  );
};

// Footer Component
const Footer = () => {
  const { authUser } = useAuthStore();

  return (
    <div className="border-t border-slate-800/80 p-4 bg-slate-950/40 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <img
          src={authUser?.profilePic || "/avatar.png"}
          alt={authUser?.fullName}
          className="size-12 rounded-full border-2 border-slate-800 shadow-sm"
        />
        <div className="min-w-0">
          <div className="font-semibold text-slate-100 truncate">{authUser?.fullName}</div>
          <div className="text-xs font-medium text-indigo-400 mt-0.5">Your Account</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
