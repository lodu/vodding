import { Server as SocketIOServer } from "socket.io";
import { Server as HttpServer } from "http";
import logger from "../utils/logger";

let io: SocketIOServer;

export const initializeSocket = (server: HttpServer) => {
  io = new SocketIOServer(server, {
    // path: "/app/socket/",
    addTrailingSlash: false,
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    logger.info(`New client connected: ${socket.id}`);

    socket.on("joinChannel", (channel) => {
      socket.join(channel);
      logger.info(`Client ${socket.id} joined channel ${channel}`);
    });

    socket.on("disconnect", () => {
      logger.info(`Client disconnected: ${socket.id}`);
    });
  });
};

export { io };
