import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { authUser, onlineUsers } = useAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-full flex flex-col bg-transparent">
      {/* Header Profile Area (Like WhatsApp's top-left user bar) */}
      <div className="border-b border-slate-800/60 p-4 bg-slate-900/80 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={authUser?.profilePic || "/avatar.png"}
            alt={authUser?.fullName}
            className="size-10 rounded-full border border-slate-700 object-cover"
          />
          <h2 className="font-semibold text-slate-100 hidden sm:block tracking-wide">Chats</h2>
        </div>
      </div>

      {/* High Density User List */}
      <div className="overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-slate-800/50 hover:scrollbar-thumb-slate-700 pb-2 bg-slate-950">
        {users.map((user) => {
          const isSelected = selectedUser?._id === user._id;
          return (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`w-full p-3 md:px-4 flex items-center gap-3 transition-colors ${isSelected
                  ? "bg-slate-800/80 hover:bg-slate-800 border-l-4 border-l-indigo-500"
                  : "hover:bg-slate-800/40 border-l-4 border-l-transparent"
                }`}
            >
              <div className="relative shrink-0">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.name}
                  className="size-12 object-cover rounded-full border border-slate-800/50"
                />
                {onlineUsers.includes(user._id) && (
                  <span className="absolute bottom-0 right-0 size-3 bg-emerald-500 rounded-full ring-2 ring-slate-950" />
                )}
              </div>
              <div className="text-left w-full border-b border-slate-800/30 pb-3 mt-3 flex flex-col pt-1">
                <div className="flex justify-between items-center w-full">
                  <span className="font-medium text-slate-100 truncate text-[15px]">{user.fullName}</span>
                </div>
                <div className={`text-sm truncate mt-0.5 font-light ${onlineUsers.includes(user._id) ? "text-emerald-400/80" : "text-slate-500"
                  }`}>
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </div>
              </div>
            </button>
          )
        })}

        {users.length === 0 && (
          <div className="text-center text-slate-500 py-10 font-light text-sm">No contacts found.</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
