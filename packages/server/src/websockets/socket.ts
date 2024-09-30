import { Server as SocketIOServer } from "socket.io";
import { Server as HttpServer } from "http";
import logger from "../utils/logger";

let io: SocketIOServer;

export const initializeSocket = (server: HttpServer) => {
  io = new SocketIOServer(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    logger.info(`New client connected: ${socket.id}`);

    socket.on("disconnect", () => {
      logger.info(`Client disconnected: ${socket.id}`);
    });

    // Add more event handlers as needed
  });
};

export { io };
