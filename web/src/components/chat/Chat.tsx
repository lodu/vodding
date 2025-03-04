import { useState, useEffect, useRef } from "react";
import { joinChannel, socket } from "../../socket";
import { motion } from "framer-motion";
import Message from "./Message";
import { VoddingTransmittedTwitchChatMessage } from "@common/common/chatTypes";

interface ChatProps {
  channelName: string;
}

function Chat({ channelName }: ChatProps) {
  const [messages, setMessages] = useState<
    VoddingTransmittedTwitchChatMessage[]
  >([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    joinChannel(channelName);

    socket.on(
      "TwitchChatMessage",
      (message: VoddingTransmittedTwitchChatMessage) => {
        console.log("Received chat message", message);
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    );

    return () => {
      socket.off("TwitchChatMessage");
    };
  }, [channelName]);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="p-4">
      <div
        className="space-y-4 overflow-auto max-v-vh max-w-vw"
        ref={chatContainerRef}
      >
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            ref={index === messages.length - 1 ? lastMessageRef : null}
          >
            <Message message={message} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Chat;
