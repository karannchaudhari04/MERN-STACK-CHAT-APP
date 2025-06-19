import { io } from "socket.io-client";

let socket;

export const initSocket = (userId) => {
  socket = io("https://mern-stack-chat-app-9dph.onrender.com/", {
    withCredentials: true,
    transports: ["websocket"], // <--- force websocket if needed
    query: { userId },
  });

  return socket;
};

export const getSocket = () => socket;
