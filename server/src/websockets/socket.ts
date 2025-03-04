import {type Server as HttpServer} from 'node:http';
import {Server as SocketIOServer} from 'socket.io';
import logger from '@/utils/logger.js';

let io: SocketIOServer | undefined;

export const initializeSocket = (server: HttpServer) => {
  const ioInstance = new SocketIOServer(server, {
    // Path: "/app/socket/",
    addTrailingSlash: false,
    cors: {
      origin: '*',
    },
  });

  ioInstance.on('connection', (socket) => {
    logger.info(`New client connected: ${socket.id}`);

    socket.on('joinChannel', (channel: string | string[]) => {
      void socket.join(channel);
      logger.info(
        `Client ${socket.id} joined channel ${Array.isArray(channel) ? channel.join(', ') : channel}`,
      );
    });

    socket.on('disconnect', () => {
      logger.info(`Client disconnected: ${socket.id}`);
    });
  });
  io = ioInstance;
};

export const getIo = (): SocketIOServer => {
  if (!io) {
    logger.error('Socket.io is not initialized');
    throw new Error('Socket.io is not initialized');
  }

  return io;
};
