import { io, Socket } from "socket.io-client";
const URL =
  process.env.NODE_ENV === "production"
    ? `${window.location}/socket/`
    : "http://localhost:3000";

export const socket: Socket = io(URL, {
  transports: ["websocket", "polling", "flashsocket"],
});

export const joinChannel = (channel: string) => {
  socket.emit("joinChannel", channel);
};
