import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { joinChannel, socket } from "../../socket";
import { TransmittedChatMessage } from "@vodding/common/chatTypes";
import { motion } from "framer-motion";
import Message from "../../components/chat/Message";

function Chat() {
  const { channelName } = useParams<{ channelName: string }>();
  const [messages, setMessages] = useState<TransmittedChatMessage[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (channelName) {
      joinChannel(channelName);
    }

    socket.on("chatMessage", (message: TransmittedChatMessage) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("chatMessage");
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
