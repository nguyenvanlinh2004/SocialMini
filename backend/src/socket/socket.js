import jwt from "jsonwebtoken";
import { sendMessageService, markAsSeenService } from "../modules/message/message.service.js";
import { createConversationService } from "../modules/conversation/conversation.service.js";

let io;

/**
 * Init Socket.IO
 * @param {http.Server} server - HTTP server
 */
export const initSocket = async (server) => {
  const { Server } = await import("socket.io");
  io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] },
  });

  // Middleware JWT
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error("Not authenticated"));
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = decoded;
      next();
    } catch (err) {
      console.error("JWT verification failed:", err.message);
      next(new Error("Not authenticated"));
    }
  });

  io.on("connection", (socket) => {
    try {
      console.log(`User connected: ${socket.user.id}`);

      // Join user-specific room
      socket.join(socket.user.id);

      /**
       * Create conversation (group or 1-1)
       */
      socket.on("createConversation", async (data, callback) => {
        try {
          const conversation = await createConversationService(data);
          // Emit to all members
          conversation.members.forEach((memberId) => {
            io.to(memberId.toString()).emit("newConversation", conversation);
          });
          callback({ status: "ok", conversation });
        } catch (err) {
          console.error("createConversation error:", err.message);
          callback({ status: "error", error: err.message });
        }
      });

      /**
       * Send message
       */
      socket.on("sendMessage", async (data, callback) => {
        try {
          const senderId = socket.user.id;
          const message = await sendMessageService({ ...data, senderId });
          const conversationId = data.conversationId;

          // Emit to conversation room
          io.to(conversationId.toString()).emit("newMessage", message);
          callback({ status: "ok", message });
        } catch (err) {
          console.error("sendMessage error:", err.message);
          callback({ status: "error", error: err.message });
        }
      });

      /**
       * Mark messages as seen
       */
      socket.on("markAsSeen", async ({ conversationId }, callback) => {
        try {
          await markAsSeenService(conversationId, socket.user.id);
          // Emit to others in conversation (exclude sender)
          socket.to(conversationId.toString()).emit("messageSeen", {
            conversationId,
            userId: socket.user.id,
          });
          callback({ status: "ok" });
        } catch (err) {
          console.error("markAsSeen error:", err.message);
          callback({ status: "error", error: err.message });
        }
      });

      /**
       * Join conversation room manually (optional)
       */
      socket.on("joinConversation", ({ conversationId }) => {
        socket.join(conversationId);
        console.log(`User ${socket.user.id} joined conversation ${conversationId}`);
      });

      socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.user?.id || "unknown"}`);
      });
    } catch (err) {
      console.error("Socket connection error:", err.message);
    }
  });

  console.log("Socket.IO initialized");
};

// Export io instance for use in other modules
export const getIo = () => io;
s