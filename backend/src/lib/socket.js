// lib/socket.js
import { Server } from "socket.io";
import http from "http";

let io;
const userSocketMap = {}; // stores online users

export function initSocket(app) {
  // Create HTTP server using the existing Express app
  const server = http.createServer(app);

  io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:5173",
        "https://mern-stack-chat-app-rosy.vercel.app",
      ],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("🔌 New client connected:", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) {
      userSocketMap[userId] = socket.id;
      console.log(`✅ User ${userId} connected with socket ID ${socket.id}`);
    }

    // Send updated online users to all clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
      console.log("❌ Client disconnected:", socket.id);
      if (userId && userSocketMap[userId] === socket.id) {
        delete userSocketMap[userId];
      }
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });

    socket.on("connect_error", (err) => {
      console.error("⚠️ Socket connection error:", err.message);
    });
  });

  return server;
}

// helper function for emitting to a specific user
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

export { io };
