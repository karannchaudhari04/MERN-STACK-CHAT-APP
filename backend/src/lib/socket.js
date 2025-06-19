import { Server } from "socket.io";
import http from "http";
import express from "express";
import cors from "cors";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://mern-stack-chat-app-rosy.vercel.app",
    ],
    credentials: true,
  },
});

// Used to store online users: { userId: socketId }
const userSocketMap = {};

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

  // Optional: handle unexpected errors
  socket.on("connect_error", (err) => {
    console.error("⚠️ Socket connection error:", err.message);
  });
});

// Helper function to get socket ID of a user
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

export { io, app, server };
