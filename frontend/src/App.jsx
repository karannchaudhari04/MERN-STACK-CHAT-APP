
import Navbar from "./components/Navbar";
import { lazy, Suspense, useEffect, useState } from "react";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const ChatPage = lazy(() => import("./pages/ChatPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";


import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

import { initSocket, getSocket } from "./socket";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, setOnlineUsers } = useAuthStore();

  const [socketInitialized, setSocketInitialized] = useState(false);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (authUser && !socketInitialized) {
      const socket = initSocket(authUser._id);

      socket.on("connect", () => {
        console.log("✅ Socket connected:", socket.id);
      });

      socket.on("getOnlineUsers", (onlineUsers) => {
        console.log("🟢 Online users:", onlineUsers);
        setOnlineUsers(onlineUsers); // this must be a setter from your authStore
      });

      socket.on("disconnect", () => {
        console.log("❌ Socket disconnected");
      });

      setSocketInitialized(true);
    }
  }, [authUser, socketInitialized, setOnlineUsers]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }


  return (
    <div data-theme="coffee">
      <Navbar />

      <Suspense fallback={<div className="flex items-center justify-center h-screen"><Loader className="size-10 animate-spin text-primary" /></div>}>
        <Routes>
          <Route path="/home" element={<LandingPage />} />
          <Route path="/chat" element={authUser ? <ChatPage /> : <Navigate to="/login" />} />
          <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/chat" />} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/chat" />} />
          <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to="/home" />} />
        </Routes>
      </Suspense>
      <Toaster />
    </div>
  );
};

export default App;
