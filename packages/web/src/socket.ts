import { io, Socket } from "socket.io-client";

export const socket: Socket = io({
  // path: "/app/socket/",
  transports: ["websocket", "polling", "flashsocket"],
});

export const joinChannel = (channel: string) => {
  socket.emit("joinChannel", channel);
};
