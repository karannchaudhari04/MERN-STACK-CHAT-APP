import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const ChatPage = () => {
  const { selectedUser, setSelectedUser } = useChatStore();

  // Handle back button on mobile - clear selected user to show contacts
  const handleBack = () => {
    setSelectedUser(null);
  };

  return (
    <div className="h-screen pt-16 bg-gray-900">
      <div className="h-full container mx-auto px-0 md:px-2">
        <div className="flex h-full md:rounded-xl overflow-hidden bg-gray-800 border border-gray-700 shadow-2xl">
          {/* Sidebar - Contacts List */}
          <div 
            className={`w-full md:w-80 flex-shrink-0 border-r border-gray-700 ${
              selectedUser ? "hidden md:flex" : "flex"
            }`}
          >
            <Sidebar />
          </div>

          {/* Chat Area */}
          <div 
            className={`flex-1 bg-gray-900 ${
              selectedUser ? "flex" : "hidden md:flex"
            }`}
          >
            {selectedUser ? (
              <ChatContainer onBack={handleBack} />
            ) : (
              <NoChatSelected />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

