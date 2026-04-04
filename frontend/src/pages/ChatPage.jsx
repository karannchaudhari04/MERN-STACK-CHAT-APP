import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import { Helmet } from "react-helmet-async";

const ChatPage = () => {
  const { selectedUser, setSelectedUser } = useChatStore();

  const handleBack = () => {
    setSelectedUser(null);
  };

  return (
    <div className="h-screen pt-20 bg-slate-950 font-['Outfit'] relative overflow-hidden">
      <Helmet>
        <title>Chatty | Active Chat</title>
      </Helmet>

      {/* Ambient background glow */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="h-full container mx-auto px-4 md:px-6 relative z-10 pb-6">
        <div className="flex h-full md:rounded-[2rem] overflow-hidden bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
          {/* Sidebar - Contacts List */}
          <div
            className={`w-full md:w-96 flex-shrink-0 border-r border-slate-800/80 ${selectedUser ? "hidden md:flex" : "flex"
              }`}
          >
            <Sidebar />
          </div>

          {/* Chat Area */}
          <div
            className={`flex-1 bg-transparent ${selectedUser ? "flex" : "hidden md:flex"
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
