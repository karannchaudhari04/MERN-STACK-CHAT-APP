
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
    <aside className="h-full w-full lg:w-80 border-r border-gray-800 flex flex-col bg-gray-900">
      {/* Header */}
      <div className="border-b border-gray-800 p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-white">Contacts</h2>
          <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm checkbox-primary"
            />
            Online
          </label>
        </div>
      </div>

      {/* User List */}
      <div className="overflow-y-auto flex-1 py-2">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full p-3 flex items-center gap-3 hover:bg-gray-800 transition-colors ${
              selectedUser?._id === user._id ? "bg-gray-800" : ""
            }`}
          >
            <div className="relative">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="size-10 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-gray-900" />
              )}
            </div>
            <div className="text-left min-w-0">
              <div className="font-medium text-white truncate">{user.fullName}</div>
              <div className="text-xs text-gray-500">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-gray-500 py-8">No users found</div>
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
    <div className="border-t border-gray-800 p-3 bg-gray-800/50">
      <div className="flex items-center gap-3">
        <img
          src={authUser?.profilePic || "/avatar.png"}
          alt={authUser?.fullName}
          className="size-10 rounded-full"
        />
        <div className="min-w-0">
          <div className="font-medium text-white text-sm truncate">{authUser?.fullName}</div>
          <div className="text-xs text-green-400">Online</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

