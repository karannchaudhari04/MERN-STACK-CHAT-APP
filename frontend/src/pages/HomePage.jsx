import { useChatStore } from "../store/useChatStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-gradient-to-br from-[#f8f9fa] to-[#e0e0e0] dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-6xl h-[calc(100vh-8rem)] backdrop-blur-lg bg-opacity-60 border border-gray-200 dark:border-gray-700">
          <div className="flex h-full rounded-2xl overflow-hidden">
            {/* Sidebar */}
            <div className="w-1/3 border-r border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 p-4">
              <Sidebar />
            </div>

            {/* Chat or Placeholder */}
            <div className="w-2/3 p-4 bg-white dark:bg-gray-900 transition-all duration-300">
              {!selectedUser ? (
                <div className="flex items-center justify-center h-full text-gray-500 text-lg font-medium animate-fadeIn">
                  <NoChatSelected />
                </div>
              ) : (
                <ChatContainer />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;