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
    <div className="h-[100dvh] pt-16 bg-slate-950 font-['Outfit'] relative overflow-hidden flex w-full">
      <Helmet>
        <title>Chatty | Active Chat</title>
      </Helmet>

      {/* Ambient background glow */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* WhatsApp-like Full Screen Split Container */}
      <div className="w-full h-full flex relative z-10 bg-transparent flex-1">

        {/* Sidebar Pane */}
        <div
          className={`w-full md:w-[320px] lg:w-[400px] xl:w-[450px] flex-shrink-0 bg-slate-950 ${selectedUser ? "hidden md:flex" : "flex"
            }`}
        >
          <Sidebar />
        </div>

        {/* Chat Pane */}
        <div
          className={`flex-1 flex flex-col bg-slate-950 overflow-hidden ${selectedUser ? "flex w-full" : "hidden md:flex"
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
  );
};
export default ChatPage;
